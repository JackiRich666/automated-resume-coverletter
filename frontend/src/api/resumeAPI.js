import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchResumes = async () => {
  const response = await axios.get(`${API_URL}/resumes`);
  return response.data;
};

export const createResume = async (data) => {
  const response = await axios.post(`${API_URL}/resumes`, data);
  return response.data;
};

export const updateResume = async (id, data) => {
  const response = await axios.put(`${API_URL}/resumes/${id}`, data);
  return response.data;
};

export const deleteResume = async (id) => {
  const response = await axios.delete(`${API_URL}/resumes/${id}`);
  return response.data;
};

export const generateResume = async (data) => {
  const response = await axios.post(`${API_URL}/resumes/generate`, data);
  return response.data;
};