import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Image } from 'react-native';
import { COLORS } from '../../constants/theme';

const SERVICES = [
    {
        title: 'Local SEO',
        description: 'We specialize in optimizing your online presence to rank higher in local searches, attracting more customers to your business.',
        icon: '📍',
    },
    {
        title: 'Google Ads Management',
        description: 'Our team effectively manages your Google Ads campaigns, ensuring maximum exposure and return on investment for your advertising budget.',
        icon: '💳',
    },
    {
        title: 'Google Business Profile Optimization',
        description: 'We enhance your Google Business Profile to improve visibility, engage potential customers, and drive more traffic to your location.',
        icon: '🌟',
    },
];

export default function ServicesSection() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return (
        <View style={styles.container}>
            <View style={[styles.content, isMobile && styles.contentMobile]}>

                <View style={[styles.splitLayout, isMobile && styles.splitLayoutMobile]}>
                    <View style={styles.leftCol}>
                        <Text style={styles.badge}>WHAT WE DO</Text>
                        <Text style={styles.title}>Local SEO Services That Drive Results</Text>
                        <Text style={styles.subtitle}>
                            Explore our tailored local SEO and Google Ads strategies designed to enhance your online visibility and drive local engagement, and leads in your area.
                        </Text>

                        <View style={styles.serviceList}>
                            {SERVICES.map((s, i) => (
                                <View key={i} style={styles.serviceItem}>
                                    <View style={styles.serviceIcon}><Text>{s.icon}</Text></View>
                                    <View style={styles.serviceTextGroup}>
                                        <Text style={styles.serviceTitle}>{s.title}</Text>
                                        <Text style={styles.serviceDesc}>{s.description}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.rightCol}>
                        <View style={styles.imagePlaceholder}>
                            <Text style={styles.imagePlaceholderText}>[ Marketing Illustration ]</Text>
                            <Text style={{ fontSize: 80, marginTop: 20 }}>📊</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#F8FAFC',
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
    splitLayout: {
        flexDirection: 'row',
        gap: 60,
        alignItems: 'center',
    },
    splitLayoutMobile: {
        flexDirection: 'column',
    },
    leftCol: {
        flex: 1,
    },
    rightCol: {
        flex: 1,
        width: '100%',
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
        marginBottom: 20,
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 18,
        fontFamily: 'Inter_400Regular',
        color: COLORS.textSecondary,
        lineHeight: 28,
        marginBottom: 40,
    },
    serviceList: {
        gap: 32,
    },
    serviceItem: {
        flexDirection: 'row',
        gap: 20,
    },
    serviceIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E8F0FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    serviceTextGroup: {
        flex: 1,
    },
    serviceTitle: {
        fontSize: 18,
        fontFamily: 'Inter_700Bold',
        color: COLORS.textPrimary,
        marginBottom: 8,
    },
    serviceDesc: {
        fontSize: 15,
        fontFamily: 'Inter_400Regular',
        color: COLORS.textSecondary,
        lineHeight: 24,
    },
    imagePlaceholder: {
        backgroundColor: '#E2E8F0',
        borderRadius: 24,
        height: 500,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    imagePlaceholderText: {
        color: '#64748B',
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
    }
});
