import React from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONT_SIZE } from '../../constants/theme';

export default function HeroSection() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    return (
        <LinearGradient
            colors={['#F4F7FC', '#FFFFFF']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <View style={[styles.content, isMobile && styles.contentMobile]}>

                {/* Badge */}
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>🚀 Top Local Marketing Software</Text>
                </View>

                {/* Headline */}
                <Text style={[styles.headline, isMobile && styles.headlineMobile, isTablet && styles.headlineTablet]}>
                    Local SEO Agency That Grows Your Business — One City at a Time
                </Text>

                {/* Subheadline */}
                <Text style={[styles.subhead, isMobile && styles.subheadMobile]}>
                    Struggling to get found in your city? Our local AI platform helps small and medium-sized businesses rank higher on Google Maps and local search — turning clicks into real customers.
                </Text>

                {/* CTAs */}
                <View style={[styles.ctaContainer, isMobile && styles.ctaContainerMobile]}>
                    <Pressable
                        style={styles.primaryCta}
                        onPress={() => router.push('/(auth)/signup')}
                    >
                        <Text style={styles.primaryCtaText}>Get More Traffic Now</Text>
                    </Pressable>
                    <Pressable
                        style={styles.secondaryCta}
                        onPress={() => {
                            // Scroll to features or learn more
                            const featuresSection = document.getElementById('features');
                            if (featuresSection) featuresSection.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <Text style={styles.secondaryCtaText}>See How It Works</Text>
                    </Pressable>
                </View>

                {/* Trust indicators */}
                <View style={styles.trustIndicators}>
                    <Text style={styles.trustText}>✓ No Credit Card Required   ✓ 14-Day Free Trial   ✓ Cancel Anytime</Text>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 80,
    },
    content: {
        maxWidth: 1000,
        marginHorizontal: 'auto',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    contentMobile: {
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    badge: {
        backgroundColor: '#E8F0FF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginBottom: 24,
    },
    badgeText: {
        color: COLORS.primaryDark,
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
    },
    headline: {
        fontSize: 64,
        fontFamily: 'Inter_700Bold',
        color: COLORS.textPrimary,
        textAlign: 'center',
        lineHeight: 76,
        letterSpacing: -1.5,
        marginBottom: 24,
    },
    headlineTablet: {
        fontSize: 52,
        lineHeight: 62,
    },
    headlineMobile: {
        fontSize: 40,
        lineHeight: 48,
        letterSpacing: -1,
    },
    subhead: {
        fontSize: 20,
        fontFamily: 'Inter_400Regular',
        color: COLORS.textSecondary,
        textAlign: 'center',
        lineHeight: 32,
        maxWidth: 800,
        marginBottom: 40,
    },
    subheadMobile: {
        fontSize: 18,
        lineHeight: 28,
        marginBottom: 32,
    },
    ctaContainer: {
        flexDirection: 'row',
        gap: 16,
        justifyContent: 'center',
        width: '100%',
    },
    ctaContainerMobile: {
        flexDirection: 'column',
    },
    primaryCta: {
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    primaryCtaText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
    },
    secondaryCta: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryCtaText: {
        color: COLORS.textPrimary,
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
    },
    trustIndicators: {
        marginTop: 40,
    },
    trustText: {
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
        color: '#64748B',
    },
});
