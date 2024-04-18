import { ChildProcess, execFile, spawn, exec } from 'child_process';
import paths from '../src/configs/paths';
import { EventEmitter } from 'events';

const soxEmmiter = new EventEmitter();

let process: null | ChildProcess = null;

soxEmmiter.on('record', async () => {
  console.log('recording sox...');

  process = exec(
    `${paths.ffmpeg}/ffmpeg.exe -y -f dshow -i audio="virtual-audio-capturer" -c:a pcm_s16le -ar 44100 -ac 2 ${paths.transcribeAudio}`,
    (err, stdin, stderr) => {
      console.log('err', err.message);
      console.log('stdin', stdin);
      console.log('stderr', stderr);
    },
  );
});

soxEmmiter.on('stop', () => {
  console.log('stopping sox...');
  if (process) {
    exec('taskkill /F /T /PID ' + process.pid);
  }
  process = null;
});

const sox = {
  stop: () => soxEmmiter.emit('stop'),
  record: () => soxEmmiter.emit('record'),
  isRecording: () => !!process,
};

export default sox;
