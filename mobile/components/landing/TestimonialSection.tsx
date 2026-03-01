import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Image } from 'react-native';
import { COLORS } from '../../constants/theme';

export default function TestimonialSection() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return (
        <View style={styles.container}>
            <View style={[styles.content, isMobile && styles.contentMobile]}>
                <View style={styles.header}>
                    <Text style={styles.badge}>SUCCESS STORIES</Text>
                    <Text style={styles.title}>Real Results from Our Local SEO Clients</Text>
                    <Text style={styles.subtitle}>
                        From home services to healthcare and B2B companies, our clients consistently outrank competitors and dominate their service areas.
                    </Text>
                </View>

                <View style={[styles.card, isMobile && styles.cardMobile]}>
                    <Text style={styles.quote}>
                        "LocalBoost AI transformed our online presence. A pest control company in Phoenix jumped from position 8 to #1 in 90 days — with a 54% increase in calls. The results speak for themselves."
                    </Text>

                    <View style={styles.authorRow}>
                        <View style={styles.avatar}>
                            <Text>👤</Text>
                        </View>
                        <View>
                            <Text style={styles.authorName}>Sarah Jenkins</Text>
                            <Text style={styles.authorRole}>Owner, Desert Pest Control</Text>
                        </View>
                        <View style={styles.statsBadge}>
                            <Text style={styles.statsText}>📈 +54% Inbound Calls</Text>
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
        backgroundColor: '#FFFFFF',
        paddingVertical: 80,
    },
    content: {
        maxWidth: 1000,
        marginHorizontal: 'auto',
        paddingHorizontal: 24,
    },
    contentMobile: {
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 48,
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
        lineHeight: 28,
        maxWidth: 700,
    },
    card: {
        backgroundColor: '#F8FAFC',
        borderRadius: 24,
        padding: 48,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    cardMobile: {
        padding: 24,
    },
    quote: {
        fontSize: 24,
        fontFamily: 'Inter_500Medium',
        color: COLORS.textPrimary,
        lineHeight: 36,
        marginBottom: 32,
        fontStyle: 'italic',
    },
    authorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E2E8F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    authorName: {
        fontSize: 16,
        fontFamily: 'Inter_700Bold',
        color: COLORS.textPrimary,
    },
    authorRole: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        color: COLORS.textSecondary,
    },
    statsBadge: {
        marginLeft: 'auto',
        backgroundColor: '#E8F0FF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    statsText: {
        color: COLORS.primaryDark,
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
    }
});
