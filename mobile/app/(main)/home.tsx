/**
 * Home Screen — shown after authentication.
 */

import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW, BUTTON } from '../../constants/theme';

export default function Home() {
    const router = useRouter();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        router.replace('/(auth)/login');
    };

    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Welcome header */}
            <View style={styles.headerCard}>
                <Text style={styles.greeting}>{greeting()} 👋</Text>
                <Text style={styles.userName}>{user?.name || 'there'}!</Text>
                <Text style={styles.headerSubtitle}>Let's grow your business today</Text>
            </View>

            {/* Quick Action Cards */}
            <Text style={styles.sectionTitle}>Quick Actions</Text>

            <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
                <View style={styles.actionIconCircle}>
                    <Text style={styles.actionEmoji}>📍</Text>
                </View>
                <View style={styles.actionTextContainer}>
                    <Text style={styles.actionTitle}>Connect Google Business</Text>
                    <Text style={styles.actionSubtitle}>Link your profile to get AI insights</Text>
                </View>
                <Text style={styles.actionArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
                <View style={[styles.actionIconCircle, { backgroundColor: COLORS.accent + '15' }]}>
                    <Text style={styles.actionEmoji}>⭐</Text>
                </View>
                <View style={styles.actionTextContainer}>
                    <Text style={styles.actionTitle}>Review Dashboard</Text>
                    <Text style={styles.actionSubtitle}>Manage and respond to reviews</Text>
                </View>
                <Text style={styles.actionArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
                <View style={[styles.actionIconCircle, { backgroundColor: COLORS.success + '15' }]}>
                    <Text style={styles.actionEmoji}>📊</Text>
                </View>
                <View style={styles.actionTextContainer}>
                    <Text style={styles.actionTitle}>AI Analytics</Text>
                    <Text style={styles.actionSubtitle}>View smart business insights</Text>
                </View>
                <Text style={styles.actionArrow}>→</Text>
            </TouchableOpacity>

            {/* Coming Soon banner */}
            <View style={styles.comingSoon}>
                <Text style={styles.comingSoonEmoji}>🚧</Text>
                <Text style={styles.comingSoonText}>
                    More features coming in Phase 2!{'\n'}AI-powered marketing, social posts, and more.
                </Text>
            </View>

            {/* Logout */}
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
                activeOpacity={0.8}
            >
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        paddingHorizontal: SPACING.lg,
        paddingTop: 70,
        paddingBottom: SPACING.xxl,
    },
    headerCard: {
        backgroundColor: COLORS.primary,
        borderRadius: RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.xl,
        ...SHADOW.lg,
    },
    greeting: {
        fontFamily: 'Inter_500Medium',
        fontSize: FONT_SIZE.md,
        color: 'rgba(255,255,255,0.8)',
    },
    userName: {
        fontFamily: 'Inter_700Bold',
        fontSize: FONT_SIZE.xxl,
        color: COLORS.textOnPrimary,
        marginTop: 2,
    },
    headerSubtitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: FONT_SIZE.sm,
        color: 'rgba(255,255,255,0.65)',
        marginTop: SPACING.xs,
    },
    sectionTitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: FONT_SIZE.lg,
        color: COLORS.textPrimary,
        marginBottom: SPACING.md,
    },
    actionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.md,
        padding: SPACING.md,
        marginBottom: SPACING.sm,
        ...SHADOW.sm,
    },
    actionIconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.primary + '15',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    actionEmoji: {
        fontSize: 22,
    },
    actionTextContainer: {
        flex: 1,
    },
    actionTitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: FONT_SIZE.md,
        color: COLORS.textPrimary,
    },
    actionSubtitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: FONT_SIZE.xs,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    actionArrow: {
        fontFamily: 'Inter_500Medium',
        fontSize: FONT_SIZE.xl,
        color: COLORS.textMuted,
    },
    comingSoon: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.accent + '10',
        borderRadius: RADIUS.md,
        padding: SPACING.md,
        marginTop: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.accent + '30',
    },
    comingSoonEmoji: {
        fontSize: 28,
        marginRight: SPACING.md,
    },
    comingSoonText: {
        flex: 1,
        fontFamily: 'Inter_400Regular',
        fontSize: FONT_SIZE.sm,
        color: COLORS.textSecondary,
        lineHeight: 20,
    },
    logoutButton: {
        height: BUTTON.height,
        borderRadius: BUTTON.borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: COLORS.error,
        marginTop: SPACING.xl,
    },
    logoutText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: FONT_SIZE.md,
        color: COLORS.error,
    },
});
