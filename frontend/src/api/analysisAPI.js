import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const analyzeResume = async (data) => {
  const response = await axios.post(`${API_URL}/analysis`, data);
  return response.data;
};