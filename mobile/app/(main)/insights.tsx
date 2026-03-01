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
        <View style={[styles.gauge, { borderColor: color + '30', backgroundColor: color + '08' }]}>
            <Text style={[styles.gaugeScore, { color }]}>{score}</Text>
            <Text style={styles.gaugeLabel}>/ 100</Text>
            <Text style={styles.gaugeTitle}>Visibility Score</Text>
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
                <View style={styles.statsCol}>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{'★'.repeat(Math.round(data.avg_rating))}</Text>
                        <Text style={styles.statSub}>{data.avg_rating.toFixed(1)} avg rating</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{data.total_reviews}</Text>
                        <Text style={styles.statSub}>total reviews</Text>
                    </View>
                    <View style={[styles.statCard, { backgroundColor: trend.color + '10' }]}>
                        <Text style={styles.statValue}>{trend.emoji}</Text>
                        <Text style={[styles.statSub, { color: trend.color }]}>{trend.label}</Text>
                    </View>
                </View>
            </View>

            {/* AI Suggestion */}
            <View style={styles.aiCard}>
                <View style={styles.aiCardHeader}>
                    <Text style={styles.aiCardEmoji}>🤖</Text>
                    <Text style={styles.aiCardTitle}>AI Recommendation</Text>
                </View>
                <Text style={styles.aiCardText}>{data.ai_suggestion}</Text>
            </View>

            {/* Top Keywords */}
            {data.top_keywords.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>💬 What Customers Say</Text>
                    <View style={styles.keywordsWrap}>
                        {data.top_keywords.map((kw, i) => (
                            <View key={i} style={[styles.keyword, { backgroundColor: COLORS.primary + (i % 2 === 0 ? '12' : '20') }]}>
                                <Text style={styles.keywordText}>{kw}</Text>
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
    topRow: { flexDirection: 'row', gap: SPACING.md, marginBottom: SPACING.xl },
    gauge: {
        flex: 1.2, borderRadius: RADIUS.lg, padding: SPACING.lg,
        alignItems: 'center', justifyContent: 'center', borderWidth: 2, ...SHADOW.sm,
    },
    gaugeScore: { fontFamily: 'Inter_700Bold', fontSize: 48, lineHeight: 56 },
    gaugeLabel: { fontFamily: 'Inter_400Regular', fontSize: FONT_SIZE.md, color: COLORS.textSecondary },
    gaugeTitle: { fontFamily: 'Inter_500Medium', fontSize: FONT_SIZE.xs, color: COLORS.textMuted, marginTop: 4 },
    statsCol: { flex: 1, gap: SPACING.sm },
    statCard: {
        flex: 1, backgroundColor: COLORS.surface, borderRadius: RADIUS.md,
        padding: SPACING.sm, alignItems: 'center', ...SHADOW.sm,
    },
    statValue: { fontFamily: 'Inter_700Bold', fontSize: FONT_SIZE.lg, color: COLORS.textPrimary },
    statSub: { fontFamily: 'Inter_400Regular', fontSize: FONT_SIZE.xs, color: COLORS.textSecondary },
    aiCard: {
        backgroundColor: COLORS.primary, borderRadius: RADIUS.lg, padding: SPACING.lg,
        marginBottom: SPACING.xl, ...SHADOW.md,
    },
    aiCardHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.md },
    aiCardEmoji: { fontSize: 24 },
    aiCardTitle: { fontFamily: 'Inter_700Bold', fontSize: FONT_SIZE.lg, color: '#FFFFFF' },
    aiCardText: { fontFamily: 'Inter_400Regular', fontSize: FONT_SIZE.sm, color: 'rgba(255,255,255,0.9)', lineHeight: 22 },
    section: { marginBottom: SPACING.xl },
    sectionTitle: { fontFamily: 'Inter_700Bold', fontSize: FONT_SIZE.lg, color: COLORS.textPrimary, marginBottom: SPACING.md },
    keywordsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
    keyword: { paddingHorizontal: SPACING.md, paddingVertical: 6, borderRadius: RADIUS.full },
    keywordText: { fontFamily: 'Inter_600SemiBold', fontSize: FONT_SIZE.sm, color: COLORS.primary },
    tip: { fontFamily: 'Inter_400Regular', fontSize: FONT_SIZE.sm, color: COLORS.textSecondary, marginBottom: 8, lineHeight: 20 },
});
