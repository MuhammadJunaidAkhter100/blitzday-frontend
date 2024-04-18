const SERVER_BASE_URL = 'http://localhost:8080/api';
const ASSEMBLY_BASE_URL ='api.assemblyai.com/v2';
const ASSEMBLY_API_KEY = '140480051468488c9c73c35568b8df26'

export const CONSTANTS = {
  SERVER_BASE_URL: SERVER_BASE_URL,
  ASSEMBLY_BASE_URL: ASSEMBLY_BASE_URL,
  ASSEMBLY_API_KEY: ASSEMBLY_API_KEY
};

export const FORMATTER = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

export const TOASTCONFIGURATION: any = {
  position: 'bottom-right',
  autoClose: 4000,
  theme: 'colored',
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
