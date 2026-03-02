import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Image } from 'react-native';
import { COLORS, RADIUS } from '../../constants/theme';
import FadeInSection from '../FadeInSection';

const SERVICES = [
    {
        title: 'Local SEO & Maps Ranking',
        description: 'Dominate the Google Local Pack in your city. We optimize your visibility so when locals search for your services, you appear #1.',
        icon: '📍',
    },
    {
        title: 'Automated Google Reviews',
        description: 'Stop chasing customers for feedback. Our AI platform automates review requests via SMS/WhatsApp, building trust rapidly.',
        icon: '⭐',
    },
    {
        title: 'High-Converting Local Ads',
        description: 'Stop wasting budget. We run hyper-targeted Google and Facebook ads built for Indian markets to drive high-intent local leads.',
        icon: '🚀',
    },
];

export default function ServicesSection() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return (
        <View style={styles.container}>
            <FadeInSection delay={200} style={[styles.content, isMobile && styles.contentMobile]}>

                <View style={[styles.splitLayout, isMobile && styles.splitLayoutMobile]}>
                    <View style={styles.leftCol}>
                        <Text style={styles.badge}>WHAT WE DO</Text>
                        <Text style={styles.title}>Data-Driven Local Marketing</Text>
                        <Text style={styles.subtitle}>
                            We combine advanced local SEO, review automation, and targeted ads to make your business the obvious choice in your locality.
                        </Text>

                        <View style={styles.serviceList}>
                            {SERVICES.map((s, i) => (
                                <View key={i} style={styles.serviceItem}>
                                    <View style={styles.serviceIcon}><Text style={{ fontSize: 24 }}>{s.icon}</Text></View>
                                    <View style={styles.serviceTextGroup}>
                                        <Text style={styles.serviceTitle}>{s.title}</Text>
                                        <Text style={styles.serviceDesc}>{s.description}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.rightCol}>
                        {/* Glassmorphism visual element placeholder */}
                        <View style={styles.imagePlaceholder}>
                            <View style={styles.glassCard}>
                                <Text style={styles.glassTitle}>Google Business Profile</Text>
                                <View style={styles.glassStat}>
                                    <View style={styles.starRow}>
                                        <Text>⭐⭐⭐⭐⭐</Text>
                                        <Text style={styles.boldText}>4.9</Text>
                                    </View>
                                    <Text style={styles.subtext}>(1,284 reviews)</Text>
                                </View>
                                <View style={styles.glassGraph}>
                                    <Text style={{ color: COLORS.success, fontWeight: 'bold' }}>+142% Profile Views This Month</Text>
                                </View>
                            </View>
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
        backgroundColor: '#FFFFFF', // Clean white background to contrast with airy hero
        paddingVertical: 100,
    },
    content: {
        maxWidth: 1200,
        marginHorizontal: 'auto',
        paddingHorizontal: 24,
    },
    contentMobile: {
        paddingVertical: 60,
        paddingHorizontal: 20,
    },
    splitLayout: {
        flexDirection: 'row',
        gap: 80,
        alignItems: 'center',
    },
    splitLayoutMobile: {
        flexDirection: 'column',
        gap: 60,
    },
    leftCol: {
        flex: 1,
    },
    rightCol: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
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
        marginBottom: 24,
        letterSpacing: -1,
        lineHeight: 56,
    },
    subtitle: {
        fontSize: 20,
        fontFamily: 'Inter_400Regular',
        color: COLORS.textSecondary,
        lineHeight: 32,
        marginBottom: 48,
    },
    serviceList: {
        gap: 40,
    },
    serviceItem: {
        flexDirection: 'row',
        gap: 24,
    },
    serviceIcon: {
        width: 64,
        height: 64,
        borderRadius: RADIUS.full, // Fully circular icon backgrounds
        backgroundColor: COLORS.primaryTranslucent,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(79, 70, 229, 0.1)',
    },
    serviceTextGroup: {
        flex: 1,
    },
    serviceTitle: {
        fontSize: 20,
        fontFamily: 'Inter_700Bold',
        color: COLORS.textPrimary,
        marginBottom: 8,
    },
    serviceDesc: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        color: COLORS.textSecondary,
        lineHeight: 26,
    },
    imagePlaceholder: {
        backgroundColor: COLORS.background,
        borderRadius: RADIUS.xl,
        height: 500,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    glassCard: {
        backgroundColor: COLORS.surfaceTranslucent,
        padding: 32,
        borderRadius: RADIUS.lg,
        shadowColor: COLORS.primaryDark,
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.1,
        shadowRadius: 40,
        elevation: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
        width: '80%',
        alignItems: 'center',
        // @ts-ignore - Valid React Native Web property
        backdropFilter: 'blur(10px)', // Web glassmorphism
    },
    glassTitle: {
        fontSize: 24,
        fontFamily: 'Inter_700Bold',
        color: COLORS.textPrimary,
        marginBottom: 16,
        textAlign: 'center',
    },
    glassStat: {
        alignItems: 'center',
        marginBottom: 24,
    },
    starRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    boldText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 20,
        color: COLORS.textPrimary,
    },
    subtext: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    glassGraph: {
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: RADIUS.full,
    }
});
