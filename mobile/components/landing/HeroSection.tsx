import React from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONT_SIZE, RADIUS } from '../../constants/theme';
import FadeInSection from '../FadeInSection';

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
            <FadeInSection delay={100} style={[styles.content, isMobile && styles.contentMobile]}>

                {/* Badge */}
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>🚀 India's #1 Local SEO Platform</Text>
                </View>

                {/* Headline */}
                <Text style={[styles.headline, isMobile && styles.headlineMobile, isTablet && styles.headlineTablet]}>
                    Rank Higher on Google Maps. Get More Walk-ins Locally.
                </Text>

                {/* Subheadline */}
                <Text style={[styles.subhead, isMobile && styles.subheadMobile]}>
                    From clinics in Delhi to cafes in Mumbai, our AI-powered platform helps local Indian businesses dominate search results, automate Google reviews, and turn clicks into real customers.
                </Text>

                {/* CTAs */}
                <View style={[styles.ctaContainer, isMobile && styles.ctaContainerMobile]}>
                    <Pressable
                        style={({ pressed }) => [styles.primaryCta, pressed && { opacity: 0.9 }]}
                        onPress={() => router.push('/(auth)/signup')}
                    >
                        <Text style={styles.primaryCtaText}>Start Growing Now</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [styles.secondaryCta, pressed && { backgroundColor: COLORS.primaryTranslucent }]}
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
                    <Text style={styles.trustText}>✓ Trusted by 10,000+ businesses   ✓ 14-Day Free Trial   ✓ No Setup Fee</Text>
                </View>
            </FadeInSection>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 100,
    },
    content: {
        maxWidth: 1000,
        marginHorizontal: 'auto',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    contentMobile: {
        paddingVertical: 60,
        paddingHorizontal: 20,
    },
    badge: {
        backgroundColor: COLORS.primaryTranslucent,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: RADIUS.full,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: 'rgba(79, 70, 229, 0.2)',
    },
    badgeText: {
        color: COLORS.primary,
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
        paddingVertical: 18,
        paddingHorizontal: 36,
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 6,
    },
    primaryCtaText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
    },
    secondaryCta: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.primary,
        paddingVertical: 18,
        paddingHorizontal: 36,
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryCtaText: {
        color: COLORS.primary,
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
    },
    trustIndicators: {
        marginTop: 40,
    },
    trustText: {
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
        color: COLORS.textSecondary,
    },
});
