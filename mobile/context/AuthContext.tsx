/**
 * LocalBoost AI — Auth Context
 * Manages user session: login, register, logout, token persistence.
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import { registerUser, loginUser, getMe, type RegisterPayload, type LoginPayload, type UserResponse } from '../services/api';

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
                const storedToken = await SecureStore.getItemAsync('auth_token');
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
                await SecureStore.deleteItemAsync('auth_token');
                setState({ user: null, token: null, isLoading: false, isAuthenticated: false });
            }
        })();
    }, []);

    const login = useCallback(async (data: LoginPayload) => {
        const res = await loginUser(data);
        await SecureStore.setItemAsync('auth_token', res.access_token);
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
        await SecureStore.setItemAsync('auth_token', res.access_token);
        const user = await getMe();
        setState({
            user,
            token: res.access_token,
            isLoading: false,
            isAuthenticated: true,
        });
    }, []);

    const logout = useCallback(async () => {
        await SecureStore.deleteItemAsync('auth_token');
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
