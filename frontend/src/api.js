
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api', // Backend base URL
});

export const fetchData = async (endpoint) => {
  try {
    const response = await API.get(`/${endpoint}`); // Append the route (e.g., /exchange)
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};


