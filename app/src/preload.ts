import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

type ICallbackEvent = (event: IpcRendererEvent, ...args: any[]) => void;

contextBridge.exposeInMainWorld('electron', {
  request: (uploadStatus: string) => {
    ipcRenderer.send('sendUploadStatus', uploadStatus);
  },
  response: async (callback: any) => {
    ipcRenderer.on('getUploadStatus', () => callback());
  },
  recordDesktopAudio: async () => ipcRenderer.invoke('record'),
  stopRecording: async () => ipcRenderer.invoke('stop-recording'),
  transcribe: async (time: number) => ipcRenderer.invoke('transcribe', time),
  recordDesktopAudioShortCut: async (callback: ICallbackEvent) =>
    ipcRenderer.on('record:shortcut', callback),
  stopRecordingShortCut: async (callback: ICallbackEvent) =>
    ipcRenderer.on('stop-recording:shortcut', callback),
  checkFirstTime: () => ipcRenderer.invoke('checkFirstTime'),
  userPreferences: () => ipcRenderer.invoke('userPreferences'),
  setLanguage: (language: string) =>
    ipcRenderer.invoke('setLanguage', language),
});
