/**
 * LocalBoost AI — Auth Context
 * Manages user session: login, register, logout, token persistence.
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Platform } from 'react-native';
import { registerUser, loginUser, getMe, type RegisterPayload, type LoginPayload, type UserResponse } from '../services/api';
// Platform-aware storage wrapper
const Storage = {
    async getItemAsync(key: string): Promise<string | null> {
        if (Platform.OS === 'web') {
            try { return localStorage.getItem(key); } catch (e) { return null; }
        }
        const SecureStore = require('expo-secure-store');
        return await SecureStore.getItemAsync(key);
    },
    async setItemAsync(key: string, value: string): Promise<void> {
        if (Platform.OS === 'web') {
            try { localStorage.setItem(key, value); } catch (e) { }
            return;
        }
        const SecureStore = require('expo-secure-store');
        await SecureStore.setItemAsync(key, value);
    },
    async deleteItemAsync(key: string): Promise<void> {
        if (Platform.OS === 'web') {
            try { localStorage.removeItem(key); } catch (e) { }
            return;
        }
        const SecureStore = require('expo-secure-store');
        await SecureStore.deleteItemAsync(key);
    }
};

interface AuthState {
    user: UserResponse | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
    login: (data: LoginPayload) => Promise<void>;
    register: (data: RegisterPayload) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AuthState>({
        user: null,
        token: null,
        isLoading: true,
        isAuthenticated: false,
    });

    // On mount: check for existing token & load user
    useEffect(() => {
        (async () => {
            try {
                const storedToken = await Storage.getItemAsync('auth_token');
                if (storedToken) {
                    const user = await getMe();
                    setState({
                        user,
                        token: storedToken,
                        isLoading: false,
                        isAuthenticated: true,
                    });
                } else {
                    setState((prev) => ({ ...prev, isLoading: false }));
                }
            } catch {
                // Token expired or invalid — clear it
                await Storage.deleteItemAsync('auth_token');
                setState({ user: null, token: null, isLoading: false, isAuthenticated: false });
            }
        })();
    }, []);

    const login = useCallback(async (data: LoginPayload) => {
        const res = await loginUser(data);
        await Storage.setItemAsync('auth_token', res.access_token);
        const user = await getMe();
        setState({
            user,
            token: res.access_token,
            isLoading: false,
            isAuthenticated: true,
        });
    }, []);

    const register = useCallback(async (data: RegisterPayload) => {
        const res = await registerUser(data);
        await Storage.setItemAsync('auth_token', res.access_token);
        const user = await getMe();
        setState({
            user,
            token: res.access_token,
            isLoading: false,
            isAuthenticated: true,
        });
    }, []);

    const logout = useCallback(async () => {
        await Storage.deleteItemAsync('auth_token');
        setState({ user: null, token: null, isLoading: false, isAuthenticated: false });
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
