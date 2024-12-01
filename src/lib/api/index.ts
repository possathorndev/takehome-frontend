import axios, {AxiosInstance} from 'axios';

export const publicAPI: AxiosInstance = axios.create({baseURL: process.env.NEXT_PUBLIC_BACKEND_URL});
