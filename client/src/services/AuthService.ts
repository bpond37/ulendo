import axios from 'axios';
import { ApiResponse } from './types';

export type LoginResponseDto = {
  token: string;
  data: AuthDTO;
};

export type AuthDTO = {
  id: number;
  email: string;
  createdAt: number;
  updatedAt?: number;
};

export type LoginSignupRequestDto = {
  email: string;
  password: string;
};

export type AuthResponseDto = {
  id: string;
  email: string;
  password: string;
};

// 빌드시 변경
// const API_HOST = process.env.API_HOST || 'http://localhost:4000/api';
const API_HOST = '/api'

// const client = axios.create({withCredentials: true});

class AuthService {
  async login(
    body: LoginSignupRequestDto,
  ): Promise<ApiResponse<LoginResponseDto>> {
    console.log(API_HOST);
    return axios.post(`${API_HOST}/auth/login`, body);
  }

  async register(
    body: LoginSignupRequestDto,
  ): Promise<ApiResponse<AuthResponseDto>> {
    return axios.post(`${API_HOST}/auth/register`, body);
  }

  async checkLogin(): Promise<ApiResponse<any>> {
    return axios.get(`${API_HOST}/auth/check`);
  }

  // async logout():Promise<ApiResponse<any>>{
  //   return axios.post(`${API_HOST}/auth/logout`)
  // }
}

export default AuthService;
