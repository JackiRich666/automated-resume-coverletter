import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchTemplates = async () => {
  const response = await axios.get(`${API_URL}/templates`);
  return response.data;
};