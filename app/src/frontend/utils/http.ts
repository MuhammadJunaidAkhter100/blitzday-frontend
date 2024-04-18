import axios from 'axios';
import { CONSTANTS } from './constants';

const BASE_URL = CONSTANTS.SERVER_BASE_URL;

export const getInstance = (
  Authorization: any,
  contentType: any,
  responseType: any,
) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': contentType,
      ...(Authorization ? { Authorization } : {}),
    },
    ...(responseType ? { responseType } : {}),
  });
};

const handleResponse = ({ data }: any) => {
  if (data) {
    return { code: 200, data: data?.data, message: data.message };
  }
};

const handleErrorResponse = ({ request, response, message }: any) => {
  if (response) {
    return {
      code: response.status,
      error:
        response.data?.error?.message ||
        response.statusText ||
        response.message,
    };
  } else if (request) {
    return { code: 500, error: 'Unable to send request. Try again later!' };
  } else {
    return { code: 500, error: message };
  }
};

const sendPostRequest = async (
  url: string,
  data: any,
  contentType?: string,
  token?: string,
) => {
  try {
    const res = await getInstance(
      token || localStorage.getItem('token'),
      contentType,
      null,
    ).post(url, data);
    return handleResponse(res);
  } catch (error) {
    return handleErrorResponse(error);
  }
};

const sendGetRequest = async (url: string, contentType?: string) => {
  try {
    const res = await getInstance(
      localStorage.getItem('token'),
      contentType,
      null,
    ).get(url);
    return handleResponse(res);
  } catch (error) {
    return handleErrorResponse(error);
  }
};

export const uploadSingleVectorPdf = async (data: any) => {
  return await sendPostRequest(
    '/langchain/uploadeSinglePdfToVectorDb',
    data,
    'multipart/form-data',
  );
};

export const uploadMeetingDetails = async (data: any) => {
  return await sendPostRequest('/meeting/saveMeeting', data);
};

export const updateMeetingDetails = async (data: any) => {
  return await sendPostRequest('/meeting/updateMeeting', data);
};

export const getAllUploadedDocuments = async () => {
  return await sendGetRequest('/langchain/getAllDocuments');
};

export const getAllMeetings = async () => {
  return await sendGetRequest('/meeting/getAllMeetings');
};

export const getSingleMeeting = async (id: string) => {
  return await sendGetRequest(`/meeting/getSingleMeeting/${id}`);
};

export const signUpHandler = async (data: any) => {
  return await sendPostRequest('/users/signup', data);
};

export const loginHandler = async (data: any) => {
  return await sendPostRequest('/users/login', data);
};

export const getCurrentUser = async () => {
  return await sendGetRequest('/users/getCurrentUser');
};

export const updateCurrentUser = async (data: any) => {
  return await sendPostRequest('/users/updateCurrentUser', data);
};

export const updateCurrentUserPassword = async (data: any) => {
  return await sendPostRequest('/users/updatePassword', data);
};

export const deleteSingleDocument = async (data: any) => {
  return await sendPostRequest('/langchain/deleteDocument', data);
};

export const inviteTeamMember = async (data: any) => {
  return await sendPostRequest('/users/inviteTeamMember', data);
};

export const getTeamMembers = async () => {
  return await sendGetRequest('/users/getTeamMembers');
};

export const removeTeamMembers = async (data: any) => {
  return await sendPostRequest('/users/removeTeamMember', data);
};

export const getAssemblyToken = async () => {
  return await sendGetRequest('/users/assemblyToken');
};

export const generatePasswordResetToken = async (data: any) => {
  return await sendPostRequest('/users/generatePasswordResetToken', data);
};

export const verifyPasswordResetToken = async (data: any) => {
  return await sendPostRequest('/users/verifyPasswordResetToken', data);
};

export const getQuestionsFromGivenPhrase = async (phrase: string) => {
  return await sendGetRequest(`/langchain/getQuestionsFromPhrase/${phrase}`);
};

export const updateForgettedPassword = async (data: any, token: string) => {
  return await sendPostRequest(
    '/users/updateForgettedPassword',
    data,
    undefined,
    token,
  );
};
