import { useEffect, useReducer, useState, useRef } from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import { Box, Typography } from "@mui/material"

import Header from "../../components/MainLayout/Header";
import Footer from "../../components/MainLayout/Footer";
// Cards
// import LiveCallCard from "./comps/LiveCallCard";
import LiveCallListView from "./comps/LiveCallListView";
import nlp from 'compromise';
import { CONSTANTS, FORMATTER, TOASTCONFIGURATION } from '../../utils/constants';
import { getAssemblyToken, getQuestionsFromGivenPhrase, updateMeetingDetails, uploadMeetingDetails } from '../../utils/http';

import RecordRTC from 'recordrtc';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

interface ANSWERS {
    title: string;
    message: string;
    time: string;
    answer: string
}

let answers: ANSWERS[] = [];
let isCallRunning: boolean = false;
let socket: any = null;
let recorder: any = null;
let heartbeatInterval: any;

const LiveCall = () => {
    const scrollbarsRef = useRef(null);

    const meetingTime = useRef(`00:00:00`);
    const [isCallInProgress, setIsCallInProgress] = useState(false);
    const [isPause, setIsPause] = useState(false);
    const [isSummarizing, setIsSummarizing] = useState(false);
    const [startClock, setStartClock] = useState<boolean>(false);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        answers = [];
        isCallRunning = false;
        onStartHandler();

        return () => {
            isCallRunning = false;
            setIsCallInProgress(false);
            setStartClock(false);
            answers = [];
            socket?.close();
            recorder?.stopRecording();
            if(heartbeatInterval) clearInterval(heartbeatInterval)
        }
    }, [])

    const onStartHandler = async () => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(async (stream: any) => {
            isCallRunning = true;
            setStartClock(true);

            const { data } = await getAssemblyToken() as { data: { token: string } };

            if (!data?.token) {
                toast.error('No Assembly Token is Generated', TOASTCONFIGURATION);
                return;
            }

            socket = new WebSocket(
                `wss://${CONSTANTS.ASSEMBLY_BASE_URL}/realtime/ws?sample_rate=16000&token=${data.token}&word_boost=${['Does']}`,
            );

            socket.onmessage = (message: any) => {
                const res = JSON.parse(message.data);

                if (res?.message_type === 'FinalTranscript') {
                    const stringWithoutQuestionMark = res?.text?.replace(/\?/g, '');
                    transcriptionHandler(stringWithoutQuestionMark);
                }
            };

            socket.onerror = () => {
                socket.close();
            }

            socket.onclose = () => {
                socket = null;
            }

            socket.onopen = () => {
                setIsCallInProgress(true);

                heartbeatInterval = setInterval(() => {
                    if (socket?.readyState === WebSocket.OPEN) {
                        socket?.send(JSON.stringify({audio_data: ''}));
                    }
                }, 30000);

                socket.send(JSON.stringify({ end_utterance_silence_threshold: 2000 }));
                recorder = new RecordRTC(stream, {
                    type: 'audio',
                    mimeType: 'audio/webm;codecs=pcm',
                    recorderType: RecordRTC.StereoAudioRecorder,
                    timeSlice: 250,
                    desiredSampRate: 16000,
                    numberOfAudioChannels: 1,
                    bufferSize: 16384,
                    audioBitsPerSecond: 128000,
                    ondataavailable: (blob: any) => {
                        const reader = new FileReader();
                        reader.onload = () => {
                            const base64data: any = reader.result;
                            if (socket) {
                                socket.send(JSON.stringify({ audio_data: base64data.split('base64,')[1] }));
                            }
                        };
                        reader.readAsDataURL(blob);
                    },
                });
                recorder.startRecording();
            }
        })
    }

    const onStopHandler = async () => {
        if (!isSummarizing) {
            socket?.close();
            isCallRunning = false;
            setIsCallInProgress(false);
            setStartClock(false);
            setIsSummarizing(true);

            if(heartbeatInterval) clearInterval(heartbeatInterval)

            const meeting: any = await uploadMeetingDetails({
                name: 'Recording 1',
                time: new Date().toString()
            })

            recorder.stopRecording(async () => {
                window.electron.request("true");
                const blob = recorder.getBlob();

                const response = await fetch(`https://${CONSTANTS.ASSEMBLY_BASE_URL}/upload`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/octet-stream",
                        "Authorization": CONSTANTS.ASSEMBLY_API_KEY
                    },
                    body: blob
                })

                const data: any = await response.json();
                if (data?.upload_url) {
                    const transcriptReadStream = await fetch(`https://${CONSTANTS.ASSEMBLY_BASE_URL}/transcript`, {
                        method: "POST",
                        headers: {
                            "Authorization": CONSTANTS.ASSEMBLY_API_KEY
                        },
                        body: JSON.stringify({
                            audio_url: data?.upload_url,
                            speaker_labels: true
                        })
                    })

                    const transcript: any = await transcriptReadStream.json();

                    await updateMeetingDetails({
                        id: meeting?.data?.meeting?._id,
                        meetingId: transcript?.id
                    })

                    window.electron.request("false");
                } else {
                    window.electron.request("false");
                    toast.error("Error in file uploading", TOASTCONFIGURATION);
                }
            });

            setIsSummarizing(false);
        }
    }

    const pauseRTCRecorder = () => {
        if (isCallInProgress) {
            setIsPause(true);
            recorder?.pauseRecording();
        }
    }

    const resumeRTCRecording = () => {
        if (isCallInProgress) {
            setIsPause(false);
            recorder?.resumeRecording();
        }
    }

    const transcriptionHandler = async (msg: string) => {
        const { data } = await getQuestionsFromGivenPhrase(msg) as unknown as { data: { answer: string } };
        if (data) {
            let questions = nlp(data?.answer)?.sentences()?.isQuestion()?.out('array')?.map((question: string) => question.replace("-", ""))

            for (const question of questions) {
                if (question) {
                    answers.push({
                        title: 'Question',
                        message: question,
                        time: meetingTime.current,
                        answer: 'Processing ...'
                    });
                    forceUpdate();

                    const response = await fetch(`${CONSTANTS.SERVER_BASE_URL}/langchain/getOpenAIResponse/${question}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": localStorage.getItem("token")
                        },
                    })

                    const serResponse: any = await response.json();
                    answers.map(item => {
                        if (item.message === question && item.answer === 'Processing ...') {
                            item.answer = serResponse?.data?.answer
                        }
                    })

                    forceUpdate();
                }
            }

            forceUpdate();
        }
    }

    useEffect(() => {
        if (scrollbarsRef?.current) {
            scrollbarsRef?.current?.scrollToBottom();
        }
    }, [answers, answers?.length]);


    return (
        <>
            <ToastContainer />
            <Header
                pageTitle={'Live Call'}
                hideRecorder
                hideRecordingButton
                stopCall={(isCallInProgress || isSummarizing) ? onStopHandler : null}
                stopRecordingText={isSummarizing ? 'Summarizing Call' : 'Stop Recording'}
            />

            {(isCallInProgress || isCallRunning) && <Typography
                variant="body1"
                fontSize={20}
                fontWeight={600}
                marginTop={2}
                textAlign={"center"}
                sx={{
                    color: "#FFFFFF"
                }}
            >
                {isPause ? "Call Paused ..." : isCallInProgress ? "Listening ..." : isCallRunning ? "Initializing ..." : ""}
            </Typography>}
            <Box
                sx={{
                    flex: 1,
                    py: 6,
                    pl: {
                        sm: 6,
                        md: 8,
                        lg: 12
                    },
                    pr: {
                        sm: 5,
                        md: 7,
                        lg: 11
                    },
                    display: 'flex',
                }}
            >
                <Box
                    component={Scrollbar}
                    ref={scrollbarsRef}
                    sx={{
                        height: 'unset !important',
                        flexGrow: 1,
                        ".ScrollbarsCustom-Thumb": {
                            backgroundColor: '#1E2330 !important',
                        },
                        ".ScrollbarsCustom-Content": {
                            display: 'flex'
                        }
                    }}
                >
                    <Box
                        display={'flex'}
                        gap={3}
                        flexDirection={'column'}
                        sx={{
                            pr: 1,
                            flexGrow: 1,
                            width: 'fit-content',
                        }}
                    >
                        {/* {answers?.map((obj, i) => (
                            <Box
                                key={i}
                                width={'100%'}
                                sx={{
                                    minWidth: 460,
                                    maxWidth: 460,
                                }}
                            >
                                <LiveCallCard data={obj} index={i} />
                            </Box>
                        ))} */}
                        {answers?.map((obj, i) => (
                            <Box
                                key={i}
                                width={'100%'}
                            >
                                <LiveCallListView data={obj} index={i} />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
            <Footer
                startTimer={startClock}
                meetingTime={meetingTime}
                isPaused={isPause}
                pauseResumeHandler={isPause ? resumeRTCRecording : pauseRTCRecorder}
                stopCallHandler={(isCallInProgress || isSummarizing) ? onStopHandler : null}
            />
        </>
    )
}

export default LiveCall
