import { app } from 'electron';

const baseAppPath = process.env.DEV
  ? `${app.getAppPath()}`
  : `${app.getAppPath()}/..`;

const paths = {
  scripts: `${baseAppPath}/scripts`,
  whisper: `${baseAppPath}/whisper`,
  sox: `${baseAppPath}/sox`,
  ffmpeg: `${baseAppPath}/ffmpeg`,
  transcribeAudio: `${baseAppPath}/temp/teste.wav`,
  temp: `${baseAppPath}/temp`,
};

export default paths;
