import axios from 'axios'
import type { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers:{
        "Content-Type": "application/json"
        },
        withCredentials : true
  });
  export default instance;