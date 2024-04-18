import IUserPreferences from './userPreferences';

export {};

declare global {
  interface Window {
    electron: {
      request: (uploadStatus: string) => void;
      response: (callback: any) => void;
      recordDesktopAudio: () => void;
      stopRecording: () => Promise<number>;
      transcribe: (time: number) => Promise<string>;
      recordDesktopAudioShortCut: (callback) => void;
      stopRecordingShortCut: (callback) => void;
      checkFirstTime: () => Promise<boolean>;
      userPreferences: () => Promise<IUserPreferences>;
      setLanguage: (language: string) => void;
    };
  }
}
