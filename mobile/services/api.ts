/**
 * LocalBoost AI — API Service Layer
 */

import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Android emulator uses 10.0.2.2 to reach host localhost
const BASE_URL = Platform.select({
    android: 'http://10.0.2.2:8000',
    default: 'http://localhost:8000',
});

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

// Attach JWT to every request
api.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ── Auth API calls ───────────────────────────────────────

export interface RegisterPayload {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface TokenResponse {
    access_token: string;
    token_type: string;
}

export interface UserResponse {
    id: string;
    name: string | null;
    email: string;
    phone: string | null;
    created_at: string;
}

export async function registerUser(data: RegisterPayload): Promise<TokenResponse> {
    const res = await api.post<TokenResponse>('/api/v1/auth/register', data);
    return res.data;
}

export async function loginUser(data: LoginPayload): Promise<TokenResponse> {
    const res = await api.post<TokenResponse>('/api/v1/auth/login', data);
    return res.data;
}

export async function googleOAuth(idToken: string): Promise<TokenResponse> {
    const res = await api.post<TokenResponse>('/api/v1/auth/google-oauth', {
        id_token: idToken,
    });
    return res.data;
}

export async function getMe(): Promise<UserResponse> {
    const res = await api.get<UserResponse>('/api/v1/auth/me');
    return res.data;
}

export default api;
