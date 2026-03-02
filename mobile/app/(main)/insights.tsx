/**
 * AI Insights Screen — business analytics and AI recommendations.
 */
import React, { useEffect, useState, useCallback } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, ScrollView,
    ActivityIndicator, Alert, RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { getInsights, InsightsResponse } from '../../services/api';
import { COLORS, FONT_SIZE, SPACING, RADIUS, SHADOW } from '../../constants/theme';

const TREND_CONFIG = {
    improving: { emoji: '📈', label: 'Improving', color: COLORS.success },
    declining: { emoji: '📉', label: 'Declining', color: COLORS.error },
    stable: { emoji: '➡️', label: 'Stable', color: '#F59E0B' },
};

function ScoreGauge({ score }: { score: number }) {
    const color = score >= 75 ? COLORS.success : score >= 50 ? '#F59E0B' : COLORS.error;
    return (
        <View style={styles.scoreCard}>
            <Text style={styles.scoreLabel}>Visibility Score</Text>
            <View style={[styles.scoreCircle, { borderColor: color, backgroundColor: color + '15' }]}>
                <Text style={[styles.scoreValue, { color }]}>{score}</Text>
            </View>
            <Text style={styles.scoreLabel}>/ 100</Text>
        </View>
    );
}

export default function InsightsScreen() {
    const router = useRouter();
    const [data, setData] = useState<InsightsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const load = useCallback(async () => {
        try {
            const insights = await getInsights();
            setData(insights);
        } catch (err: any) {
            const msg = err?.response?.data?.detail ?? 'Failed to load insights.';
            Alert.alert('Error', msg);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Analyzing your business…</Text>
            </View>
        );
    }

    if (!data) return null;

    const trend = TREND_CONFIG[data.review_trend as keyof typeof TREND_CONFIG] ?? TREND_CONFIG.stable;

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} />}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.title}>AI Insights</Text>
                <Text style={styles.subtitle}>Smart analytics powered by AI</Text>
            </View>

            {/* Score + Stats row */}
            <View style={styles.topRow}>
                <ScoreGauge score={data.overall_score} />
                <View style={styles.rightMetrics}>
                    <View style={styles.metricCard}>
                        <Text style={styles.metricValue}>{'★'.repeat(Math.round(data.avg_rating))}</Text>
                        <Text style={styles.metricLabel}>{data.avg_rating.toFixed(1)} avg rating</Text>
                    </View>
                    <View style={styles.metricCard}>
                        <Text style={styles.metricValue}>{data.total_reviews}</Text>
                        <Text style={styles.metricLabel}>total reviews</Text>
                    </View>
                    <View style={[styles.metricCard, { backgroundColor: trend.color + '10' }]}>
                        <Text style={styles.metricValue}>{trend.emoji}</Text>
                        <Text style={[styles.metricLabel, { color: trend.color }]}>{trend.label}</Text>
                    </View>
                </View>
            </View>

            {/* AI Suggestion */}
            <View style={styles.insightCard}>
                <View style={styles.insightHeader}>
                    <Text style={{ fontSize: 24 }}>🤖</Text>
                    <Text style={styles.insightTitle}>AI Recommendation</Text>
                </View>
                <Text style={styles.insightText}>{data.ai_suggestion}</Text>
            </View>

            {/* Top Keywords */}
            {data.top_keywords.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>💬 What Customers Say</Text>
                    <View style={styles.traitsContainer}>
                        {data.top_keywords.map((kw, i) => (
                            <View key={i} style={[styles.traitBadge, { backgroundColor: COLORS.primary + (i % 2 === 0 ? '12' : '20') }]}>
                                <Text style={styles.traitText}>{kw}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {/* Tips */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>📋 Quick Wins</Text>
                {[
                    '✅ Respond to all reviews within 24 hours',
                    '✅ Ask satisfied customers to leave a Google review',
                    '✅ Keep your Business Profile photos fresh',
                    '✅ Post weekly updates on Google Business',
                ].map((tip, i) => (
                    <Text key={i} style={styles.tip}>{tip}</Text>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
    loadingText: { marginTop: SPACING.md, fontFamily: 'Inter_500Medium', color: COLORS.textSecondary },
    container: { flex: 1, backgroundColor: COLORS.background },
    content: { paddingHorizontal: SPACING.lg, paddingTop: 60, paddingBottom: SPACING.xxl },
    header: { marginBottom: SPACING.xl },
    backBtn: { marginBottom: SPACING.md },
    backText: { color: COLORS.primary, fontFamily: 'Inter_600SemiBold', fontSize: FONT_SIZE.md },
    title: { fontFamily: 'Inter_700Bold', fontSize: FONT_SIZE.xxl, color: COLORS.textPrimary, marginBottom: SPACING.xs },
    subtitle: { fontFamily: 'Inter_400Regular', fontSize: FONT_SIZE.sm, color: COLORS.textSecondary },
    topRow: { flexDirection: 'row', gap: SPACING.md, marginBottom: SPACING.lg },
    scoreCard: {
        flex: 1,
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.lg,
        padding: SPACING.lg,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: COLORS.primaryDark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 2,
    },
    scoreLabel: { fontFamily: 'Inter_500Medium', fontSize: FONT_SIZE.sm, color: COLORS.textSecondary, marginBottom: SPACING.sm },
    scoreCircle: {
        width: 80, height: 80, borderRadius: RADIUS.full,
        justifyContent: 'center', alignItems: 'center',
        backgroundColor: COLORS.primaryTranslucent,
        borderWidth: 2,
        borderColor: COLORS.primaryLight,
        marginBottom: SPACING.sm,
    },
    scoreValue: { fontFamily: 'Inter_700Bold', fontSize: FONT_SIZE.hero, color: COLORS.primaryDark },
    trendBox: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: RADIUS.full },
    trendText: { fontFamily: 'Inter_600SemiBold', fontSize: FONT_SIZE.xs, color: '#fff' },

    rightMetrics: { flex: 1, gap: SPACING.md },
    metricCard: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.lg,
        padding: SPACING.md,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    metricValue: { fontFamily: 'Inter_700Bold', fontSize: FONT_SIZE.xl, color: COLORS.textPrimary, marginVertical: 4 },
    metricLabel: { fontFamily: 'Inter_400Regular', fontSize: FONT_SIZE.xs, color: COLORS.textSecondary },

    insightCard: {
        backgroundColor: COLORS.primaryTranslucent,
        borderRadius: RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.lg,
        borderWidth: 1,
        borderColor: 'rgba(79, 70, 229, 0.2)',
    },
    insightHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: SPACING.xs },
    insightTitle: { fontFamily: 'Inter_700Bold', fontSize: FONT_SIZE.md, color: COLORS.primary },
    insightText: { fontFamily: 'Inter_400Regular', fontSize: FONT_SIZE.sm, color: COLORS.primaryDark, lineHeight: 22, marginTop: SPACING.sm },

    section: { marginBottom: SPACING.xl },
    sectionTitle: { fontFamily: 'Inter_600SemiBold', fontSize: FONT_SIZE.md, color: COLORS.textPrimary, marginBottom: SPACING.sm },
    traitsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginBottom: SPACING.lg },
    traitBadge: {
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: RADIUS.full,
    },
    traitText: { fontFamily: 'Inter_500Medium', fontSize: FONT_SIZE.sm, color: COLORS.textPrimary },
    tip: { fontFamily: 'Inter_400Regular', fontSize: FONT_SIZE.sm, color: COLORS.textSecondary, marginBottom: 8, lineHeight: 20 },
});
