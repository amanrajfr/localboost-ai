import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { COLORS } from '../../constants/theme';

export default function Footer() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return (
        <View style={styles.container}>
            <View style={[styles.content, isMobile && styles.contentMobile]}>
                <View style={styles.topRow}>
                    <View style={styles.brandCol}>
                        <View style={styles.logoContainer}>
                            <Text style={styles.iconEmoji}>🚀</Text>
                            <Text style={styles.appName}>LocalBoost</Text>
                            <Text style={styles.appNameAccent}>AI</Text>
                        </View>
                        <Text style={styles.description}>
                            The smartest way to grow your local presence. Turn searches into customers with AI-powered SEO and reputation management.
                        </Text>
                    </View>

                    <View style={styles.linksCol}>
                        <Text style={styles.linkHeader}>Services</Text>
                        <Text style={styles.linkItem}>Local SEO</Text>
                        <Text style={styles.linkItem}>Google Ads</Text>
                        <Text style={styles.linkItem}>Profile Optimization</Text>
                    </View>

                    <View style={styles.linksCol}>
                        <Text style={styles.linkHeader}>Company</Text>
                        <Text style={styles.linkItem}>About</Text>
                        <Text style={styles.linkItem}>Blog</Text>
                        <Text style={styles.linkItem}>Contact</Text>
                    </View>
                </View>

                <View style={styles.bottomRow}>
                    <Text style={styles.copyright}>© {new Date().getFullYear()} LocalBoost AI. All rights reserved.</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#0F172A',
        paddingTop: 60,
    },
    content: {
        maxWidth: 1200,
        marginHorizontal: 'auto',
        paddingHorizontal: 24,
    },
    contentMobile: {
        paddingHorizontal: 20,
    },
    topRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 60,
        marginBottom: 60,
    },
    brandCol: {
        flex: 2,
        minWidth: 280,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconEmoji: {
        fontSize: 24,
        marginRight: 8,
    },
    appName: {
        fontSize: 20,
        fontFamily: 'Inter_700Bold',
        color: '#FFFFFF',
    },
    appNameAccent: {
        fontSize: 20,
        fontFamily: 'Inter_700Bold',
        color: COLORS.primaryLight,
    },
    description: {
        fontSize: 15,
        fontFamily: 'Inter_400Regular',
        color: '#94A3B8',
        lineHeight: 24,
        maxWidth: 400,
    },
    linksCol: {
        flex: 1,
        minWidth: 140,
    },
    linkHeader: {
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    linkItem: {
        fontSize: 15,
        fontFamily: 'Inter_400Regular',
        color: '#94A3B8',
        marginBottom: 12,
    },
    bottomRow: {
        borderTopWidth: 1,
        borderTopColor: '#1E293B',
        paddingVertical: 24,
        alignItems: 'center',
    },
    copyright: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        color: '#64748B',
    }
});
