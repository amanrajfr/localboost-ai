/**
 * LocalBoost AI — API Service Layer
 */

import axios from 'axios';
import { Platform } from 'react-native';

// Pick the correct base URL
const BASE_URL = Platform.select({
    android: 'http://10.0.2.2:8000',
    default: 'http://localhost:8000',
});

// Platform-aware storage wrapper
const Storage = {
    async getItemAsync(key: string): Promise<string | null> {
        if (Platform.OS === 'web') {
            try { return localStorage.getItem(key); } catch (e) { return null; }
        }
        const SecureStore = require('expo-secure-store');
        return await SecureStore.getItemAsync(key);
    }
};

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: { 'Content-Type': 'application/json' },
});

// Attach JWT to every request
api.interceptors.request.use(async (config) => {
    const token = await Storage.getItemAsync('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ── Auth ─────────────────────────────────────────────────

export interface RegisterPayload { name: string; email: string; phone: string; password: string; }
export interface LoginPayload { email: string; password: string; }
export interface TokenResponse { access_token: string; token_type: string; }
export interface UserResponse { id: string; name: string | null; email: string; phone: string | null; created_at: string; }

export async function registerUser(data: RegisterPayload): Promise<TokenResponse> {
    const res = await api.post<TokenResponse>('/api/v1/auth/register', data);
    return res.data;
}
export async function loginUser(data: LoginPayload): Promise<TokenResponse> {
    const res = await api.post<TokenResponse>('/api/v1/auth/login', data);
    return res.data;
}
export async function googleOAuth(idToken: string): Promise<TokenResponse> {
    const res = await api.post<TokenResponse>('/api/v1/auth/google-oauth', { id_token: idToken });
    return res.data;
}
export async function getMe(): Promise<UserResponse> {
    const res = await api.get<UserResponse>('/api/v1/auth/me');
    return res.data;
}

// ── Business ─────────────────────────────────────────────

export interface BusinessPayload {
    name: string;
    category?: string;
    address?: string;
    city?: string;
    phone?: string;
    website?: string;
    description?: string;
}

export interface BusinessResponse {
    id: string;
    user_id: string;
    name: string;
    category: string | null;
    address: string | null;
    city: string | null;
    phone: string | null;
    website: string | null;
    description: string | null;
    created_at: string;
}

export async function getMyBusiness(): Promise<BusinessResponse> {
    const res = await api.get<BusinessResponse>('/api/v1/business/me');
    return res.data;
}
export async function createBusiness(data: BusinessPayload): Promise<BusinessResponse> {
    const res = await api.post<BusinessResponse>('/api/v1/business', data);
    return res.data;
}
export async function updateBusiness(data: Partial<BusinessPayload>): Promise<BusinessResponse> {
    const res = await api.put<BusinessResponse>('/api/v1/business/me', data);
    return res.data;
}

// ── Reviews ──────────────────────────────────────────────

export interface Review {
    id: string;
    business_id: string;
    author: string;
    rating: number;
    text: string;
    date: string | null;
    ai_response: string | null;
    created_at: string;
}

export async function listReviews(): Promise<Review[]> {
    const res = await api.get<Review[]>('/api/v1/reviews');
    return res.data;
}
export async function respondToReview(reviewId: string, customContext?: string): Promise<Review> {
    const res = await api.post<Review>(`/api/v1/reviews/${reviewId}/respond`, {
        custom_context: customContext ?? null,
    });
    return res.data;
}

// ── Insights ─────────────────────────────────────────────

export interface InsightsResponse {
    overall_score: number;
    review_trend: string;
    avg_rating: number;
    total_reviews: number;
    top_keywords: string[];
    ai_suggestion: string;
}

export async function getInsights(): Promise<InsightsResponse> {
    const res = await api.get<InsightsResponse>('/api/v1/insights');
    return res.data;
}

export default api;
