/**
 * Splash / Entry — checks auth state and routes accordingly.
 */

import { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import { COLORS, FONT_SIZE } from '../constants/theme';

export default function SplashEntry() {
    const router = useRouter();
    const { isLoading, isAuthenticated } = useAuth();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    useEffect(() => {
        if (isLoading) return;

        const timer = setTimeout(async () => {
            if (isAuthenticated) {
                router.replace('/(main)/home');
            } else {
                const hasOnboarded = await AsyncStorage.getItem('has_onboarded');
                if (hasOnboarded) {
                    router.replace('/(auth)/login');
                } else {
                    router.replace('/onboarding');
                }
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [isLoading, isAuthenticated]);

    return (
        <LinearGradient
            colors={[COLORS.primary, COLORS.primaryDark]}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <Animated.View
                style={[
                    styles.logoContainer,
                    { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
                ]}
            >
                <View style={styles.iconCircle}>
                    <Text style={styles.iconEmoji}>🚀</Text>
                </View>
                <Text style={styles.appName}>LocalBoost</Text>
                <Text style={styles.appNameAccent}>AI</Text>
                <Text style={styles.tagline}>Grow your local business with AI</Text>
            </Animated.View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    iconEmoji: {
        fontSize: 48,
    },
    appName: {
        fontSize: FONT_SIZE.hero,
        fontFamily: 'Inter_700Bold',
        color: COLORS.textOnPrimary,
        letterSpacing: -1,
    },
    appNameAccent: {
        fontSize: FONT_SIZE.xxl,
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.accentLight,
        marginTop: -4,
    },
    tagline: {
        fontSize: FONT_SIZE.md,
        fontFamily: 'Inter_400Regular',
        color: 'rgba(255,255,255,0.7)',
        marginTop: 12,
    },
});
