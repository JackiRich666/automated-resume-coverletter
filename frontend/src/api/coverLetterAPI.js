import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchCoverLetters = async () => {
  const response = await axios.get(`${API_URL}/coverletters`);
  return response.data;
};

export const generateCoverLetter = async (data) => {
  const response = await axios.post(`${API_URL}/coverletters/generate`, data);
  return response.data;
};

export const deleteCoverLetter = async (id) => {
  const response = await axios.delete(`${API_URL}/coverletters/${id}`);
  return response.data;
};