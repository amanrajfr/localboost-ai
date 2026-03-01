import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { COLORS } from '../../constants/theme';

const FEATURES = [
    {
        icon: '🎯',
        title: 'Tailored Strategies',
        description: 'Unlock the full potential of your business with our expert Local SEO and Google Ads services tailored just for you.',
    },
    {
        icon: '💰',
        title: 'Affordable Solutions',
        description: 'Our cost-effective packages are designed to provide maximum value without straining your budget, making top-notch marketing accessible to local businesses.',
    },
    {
        icon: '📈',
        title: 'Proven Results',
        description: 'With a track record of success, our strategies deliver measurable growth, enabling businesses like yours to thrive in the competitive digital landscape.',
    },
];

export default function FeatureSection() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return (
        <View style={styles.container} id="features">
            <View style={[styles.content, isMobile && styles.contentMobile]}>
                <View style={styles.header}>
                    <Text style={styles.badge}>WHY CHOOSE US</Text>
                    <Text style={styles.title}>Why Choose Our Local SEO Agency?</Text>
                    <Text style={styles.subtitle}>
                        When it comes to ranking locally, experience and execution matter. Our agency brings proven strategies, deep local market knowledge, and a results-first mindset.
                    </Text>
                </View>

                <View style={[styles.grid, isMobile && styles.gridMobile]}>
                    {FEATURES.map((feature, idx) => (
                        <View key={idx} style={styles.card}>
                            <View style={styles.iconContainer}>
                                <Text style={styles.icon}>{feature.icon}</Text>
                            </View>
                            <Text style={styles.cardTitle}>{feature.title}</Text>
                            <Text style={styles.cardDesc}>{feature.description}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        paddingVertical: 80,
    },
    content: {
        maxWidth: 1200,
        marginHorizontal: 'auto',
        paddingHorizontal: 24,
    },
    contentMobile: {
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 60,
    },
    badge: {
        color: COLORS.primary,
        fontSize: 14,
        fontFamily: 'Inter_700Bold',
        letterSpacing: 1.5,
        marginBottom: 16,
    },
    title: {
        fontSize: 40,
        fontFamily: 'Inter_700Bold',
        color: COLORS.textPrimary,
        textAlign: 'center',
        marginBottom: 20,
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 18,
        fontFamily: 'Inter_400Regular',
        color: COLORS.textSecondary,
        textAlign: 'center',
        maxWidth: 700,
        lineHeight: 28,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 32,
        justifyContent: 'center',
    },
    gridMobile: {
        flexDirection: 'column',
        gap: 24,
    },
    card: {
        flex: 1,
        minWidth: 300,
        backgroundColor: '#F8FAFC',
        padding: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: 'rgba(0,0,0,0.05)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 2,
    },
    icon: {
        fontSize: 24,
    },
    cardTitle: {
        fontSize: 20,
        fontFamily: 'Inter_700Bold',
        color: COLORS.textPrimary,
        marginBottom: 12,
    },
    cardDesc: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        color: COLORS.textSecondary,
        lineHeight: 24,
    },
});
