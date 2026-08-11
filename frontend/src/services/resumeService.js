import API from './api';

export const createResume = async (resumeData) => {
  const response = await API.post('/resume/create', resumeData);
  return response.data;
};

export const getResumes = async () => {
  const response = await API.get('/resume/all');
  return response.data;
};

export const getResumeById = async (id) => {
  const response = await API.get(`/resume/${id}`);
  return response.data;
};

export const updateResume = async (id, data) => {
  const response = await API.put(`/resume/${id}`, data);
  return response.data;
};

export const deleteResume = async (id) => {
  const response = await API.delete(`/resume/${id}`);
  return response.data;
};