import React from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONT_SIZE } from '../../constants/theme';

export default function TopNav() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return (
        <View style={styles.container}>
            <View style={[styles.content, isMobile && styles.contentMobile]}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <Text style={styles.iconEmoji}>🚀</Text>
                    <Text style={styles.appName}>LocalBoost</Text>
                    <Text style={styles.appNameAccent}>AI</Text>
                </View>

                {/* Right Actions */}
                <View style={styles.actions}>
                    <Pressable
                        style={styles.loginBtn}
                        onPress={() => router.push('/(auth)/login')}
                        //@ts-ignore - web only hover effect
                        onHoverIn={(e) => e.target.style.opacity = 0.8}
                        onHoverOut={(e) => e.target.style.opacity = 1}
                    >
                        <Text style={styles.loginText}>Login</Text>
                    </Pressable>
                    <Pressable
                        style={styles.ctaBtn}
                        onPress={() => router.push('/(auth)/signup')}
                        //@ts-ignore
                        onHoverIn={(e) => e.target.style.opacity = 0.9}
                        onHoverOut={(e) => e.target.style.opacity = 1}
                    >
                        <Text style={styles.ctaText}>Get Started</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        ...Platform.select({
            web: {
                position: 'sticky',
                top: 0,
                zIndex: 1000,
            },
            default: {}
        }),
    },
    content: {
        maxWidth: 1200,
        marginHorizontal: 'auto',
        width: '100%',
        paddingHorizontal: 24,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contentMobile: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconEmoji: {
        fontSize: 24,
        marginRight: 8,
    },
    appName: {
        fontSize: FONT_SIZE.lg,
        fontFamily: 'Inter_700Bold',
        color: COLORS.textPrimary,
        letterSpacing: -0.5,
    },
    appNameAccent: {
        fontSize: FONT_SIZE.lg,
        fontFamily: 'Inter_700Bold',
        color: COLORS.primary,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    loginBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    loginText: {
        fontSize: 15,
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.textSecondary,
    },
    ctaBtn: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        ...Platform.select({
            web: {
                transition: 'all 0.2s ease',
            },
            default: {}
        }),
    },
    ctaText: {
        fontSize: 15,
        fontFamily: 'Inter_600SemiBold',
        color: '#FFFFFF',
    },
});
