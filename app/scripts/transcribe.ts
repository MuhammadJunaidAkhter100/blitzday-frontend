#!/bin/sh

import { exec } from 'child_process';
import store from '../src/configs/settings';
import paths from '../src/configs/paths';
import IUserPreferences from '../src/types/userPreferences';
import fs from 'fs';

export default function transcribe(time: number): Promise<string> {
  console.log('time', time);
  const { language } = store.get('userPreferences', {
    language: 'auto',
  }) as IUserPreferences;

  return new Promise((resolve, reject) => {
    try {
      // Parse audio to 16Hz, because when recording Whisper cannot transcribe when audio parsed when
      exec(
        `${paths.ffmpeg}/ffmpeg.exe -y -i "${paths.transcribeAudio}" -ss ${time} -t 10 "${paths.temp}/cut.wav"`,
        () => {
          exec(
            `"${paths.sox}/sox.exe" "${paths.temp}/cut.wav" -r 16k "${paths.temp}/parsed.wav"`,
            () => {
              exec(
                `"${paths.whisper}/main.exe" -m "${paths.whisper}/ggml-small.en.bin" -f "${paths.temp}/parsed.wav" -nt -l ${language}`,
                (error, stdout) => {
                  if (error) {
                    console.log(`error in transcriber: ${error.message}`);
                    reject();
                  }
                  resolve(stdout);
                },
              );
            },
          );
        },
      );
    } catch (error) {
      console.log(`CATCH: error in transcriber: ${error.message}`);
    }
  });
}
