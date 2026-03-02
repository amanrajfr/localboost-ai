import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Image } from 'react-native';
import { COLORS, RADIUS } from '../../constants/theme';
import FadeInSection from '../FadeInSection';

export default function TestimonialSection() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return (
        <View style={styles.container}>
            <FadeInSection delay={300} style={[styles.content, isMobile && styles.contentMobile]}>
                <View style={styles.header}>
                    <Text style={styles.badge}>CLIENT SUCCESS</Text>
                    <Text style={styles.title}>Real Results Across India</Text>
                    <Text style={styles.subtitle}>
                        From clinics in NCR to salons in Bangalore, our clients dominate their local service areas and see measurable ROI.
                    </Text>
                </View>

                {/* Main Glassmorphism Testimonial Card */}
                <View style={[styles.card, isMobile && styles.cardMobile]}>
                    <Text style={styles.quote}>
                        "LocalBoost AI transformed our clinic's visibility. We jumped from position 12 to #1 in South Delhi within 60 days. Walk-in appointments increased by 45% and the automated WhatsApp reviews are a game-changer!"
                    </Text>

                    <View style={styles.authorRow}>
                        <View style={styles.avatar}>
                            <Text style={{ fontSize: 24 }}>👨🏽‍⚕️</Text>
                        </View>
                        <View>
                            <Text style={styles.authorName}>Dr. Rajesh Sharma</Text>
                            <Text style={styles.authorRole}>Founder, Sharma Dental Care (Delhi)</Text>
                        </View>
                        <View style={styles.statsBadge}>
                            <Text style={styles.statsText}>📈 +45% Appointments</Text>
                        </View>
                    </View>
                </View>

                <View style={{ height: 32 }} />

                {/* Secondary Testimonial Card */}
                <View style={[styles.card, isMobile && styles.cardMobile]}>
                    <Text style={styles.quote}>
                        "Managing Google Ads used to drain our budget with no ROI. The targeted local campaigns built by the platform brought us high-intent leads from across Mumbai. Our revenue grew 3x this quarter."
                    </Text>

                    <View style={styles.authorRow}>
                        <View style={styles.avatar}>
                            <Text style={{ fontSize: 24 }}>💇🏽‍♀️</Text>
                        </View>
                        <View>
                            <Text style={styles.authorName}>Priya Desai</Text>
                            <Text style={styles.authorRole}>Owner, Glamour Aesthetics (Mumbai)</Text>
                        </View>
                        <View style={styles.statsBadge}>
                            <Text style={styles.statsText}>💰 3x Revenue Growth</Text>
                        </View>
                    </View>
                </View>

            </FadeInSection>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#F4F7FC', // Soft airy blue/gray background
        paddingVertical: 100,
    },
    content: {
        maxWidth: 1000,
        marginHorizontal: 'auto',
        paddingHorizontal: 24,
    },
    contentMobile: {
        paddingVertical: 60,
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 64,
    },
    badge: {
        color: COLORS.primary,
        fontSize: 14,
        fontFamily: 'Inter_700Bold',
        letterSpacing: 1.5,
        marginBottom: 16,
    },
    title: {
        fontSize: 48,
        fontFamily: 'Inter_700Bold',
        color: COLORS.textPrimary,
        textAlign: 'center',
        marginBottom: 24,
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 20,
        fontFamily: 'Inter_400Regular',
        color: COLORS.textSecondary,
        textAlign: 'center',
        lineHeight: 32,
        maxWidth: 800,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.xl,
        padding: 48,
        shadowColor: COLORS.primaryDark,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.05,
        shadowRadius: 32,
        elevation: 4,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    cardMobile: {
        padding: 32,
    },
    quote: {
        fontSize: 24,
        fontFamily: 'Inter_500Medium',
        color: COLORS.textPrimary,
        lineHeight: 38,
        marginBottom: 40,
        fontStyle: 'italic',
    },
    authorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 20,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: RADIUS.full, // Circular avatars
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    authorName: {
        fontSize: 18,
        fontFamily: 'Inter_700Bold',
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    authorRole: {
        fontSize: 15,
        fontFamily: 'Inter_400Regular',
        color: COLORS.textSecondary,
    },
    statsBadge: {
        marginLeft: 'auto',
        backgroundColor: 'rgba(16, 185, 129, 0.1)', // Light emerald background
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: RADIUS.full, // Pill shape
        borderWidth: 1,
        borderColor: 'rgba(16, 185, 129, 0.2)',
    },
    statsText: {
        color: COLORS.success,
        fontSize: 15,
        fontFamily: 'Inter_600SemiBold',
    }
});
