/**
 * Reviews Dashboard Screen — view and AI-reply to customer reviews.
 */
import React, { useEffect, useState, useCallback } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, ScrollView,
    ActivityIndicator, Alert, RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { listReviews, respondToReview, Review } from '../../services/api';
import { COLORS, FONT_SIZE, SPACING, RADIUS, SHADOW } from '../../constants/theme';

function StarRow({ rating }: { rating: number }) {
    return (
        <View style={{ flexDirection: 'row', gap: 2 }}>
            {[1, 2, 3, 4, 5].map(i => (
                <Text key={i} style={{ fontSize: 14, color: i <= rating ? '#F59E0B' : '#D1D5DB' }}>★</Text>
            ))}
        </View>
    );
}

function ReviewCard({ review, onReply }: { review: Review; onReply: (id: string) => void }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <View style={styles.reviewCard}>
            <View style={styles.cardHeader}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{review.author.charAt(0).toUpperCase()}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.authorName}>{review.author}</Text>
                    <StarRow rating={review.rating} />
                </View>
                {review.date && <Text style={styles.date}>{review.date}</Text>}
            </View>

            <Text style={styles.reviewText}>{review.text}</Text>

            {review.ai_response ? (
                <TouchableOpacity onPress={() => setExpanded(e => !e)}>
                    <View style={styles.aiResponseContainer}>
                        <Text style={styles.aiBadgeText}>🤖 AI Reply {expanded ? '▲' : '▼'}</Text>
                        {expanded && <Text style={styles.aiResponseText}>{review.ai_response}</Text>}
                    </View>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.replyBtn} onPress={() => onReply(review.id)} activeOpacity={0.8}>
                    <Text style={styles.replyBtnText}>✨ Generate AI Reply</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

export default function ReviewsScreen() {
    const router = useRouter();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [replying, setReplying] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const load = useCallback(async () => {
        try {
            const data = await listReviews();
            setReviews(data);
        } catch (err: any) {
            const msg = err?.response?.data?.detail ?? 'Failed to load reviews.';
            Alert.alert('Error', msg);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    const handleReply = async (reviewId: string) => {
        setReplying(reviewId);
        try {
            const updated = await respondToReview(reviewId);
            setReviews(prev => prev.map(r => r.id === reviewId ? updated : r));
        } catch {
            Alert.alert('Error', 'Could not generate a reply. Please try again.');
        } finally {
            setReplying(null);
        }
    };

    const avgRating = reviews.length > 0
        ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
        : '—';

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

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
                <Text style={styles.title}>Review Dashboard</Text>
                <Text style={styles.subtitle}>Manage and reply to your customer reviews</Text>
            </View>

            {/* Summary Stats */}
            <View style={styles.statsRow}>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>{avgRating}</Text>
                    <Text style={styles.statLabel}>Avg Rating</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>{reviews.length}</Text>
                    <Text style={styles.statLabel}>Total Reviews</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>{reviews.filter(r => r.ai_response).length}</Text>
                    <Text style={styles.statLabel}>Replied</Text>
                </View>
            </View>

            {/* Review list */}
            {reviews.length === 0 ? (
                <View style={styles.empty}>
                    <Text style={styles.emptyEmoji}>⭐</Text>
                    <Text style={styles.emptyText}>No reviews yet.{'\n'}Create a business profile to get started.</Text>
                </View>
            ) : (
                reviews.map(review => (
                    <View key={review.id} style={{ position: 'relative' }}>
                        {replying === review.id && (
                            <View style={styles.replyingOverlay}>
                                <ActivityIndicator color={COLORS.primary} />
                                <Text style={styles.replyingText}>Generating AI reply…</Text>
                            </View>
                        )}
                        <ReviewCard review={review} onReply={handleReply} />
                    </View>
                ))
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
    container: { flex: 1, backgroundColor: COLORS.background },
    content: { paddingHorizontal: SPACING.lg, paddingTop: 60, paddingBottom: SPACING.xxl },
    header: { marginBottom: SPACING.xl },
    backBtn: { marginBottom: SPACING.md },
    backText: { color: COLORS.primary, fontFamily: 'Inter_600SemiBold', fontSize: FONT_SIZE.md },
    title: { fontFamily: 'Inter_700Bold', fontSize: FONT_SIZE.xxl, color: COLORS.textPrimary, marginBottom: SPACING.xs },
    subtitle: { fontFamily: 'Inter_400Regular', fontSize: FONT_SIZE.sm, color: COLORS.textSecondary },
    statsRow: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.xl },
    statCard: {
        flex: 1, backgroundColor: COLORS.surface, borderRadius: RADIUS.md, padding: SPACING.md,
        alignItems: 'center', ...SHADOW.sm,
    },
    statValue: { fontFamily: 'Inter_700Bold', fontSize: FONT_SIZE.xl, color: COLORS.primary },
    statLabel: { fontFamily: 'Inter_400Regular', fontSize: FONT_SIZE.xs, color: COLORS.textSecondary, marginTop: 2 },
    reviewCard: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.lg,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: COLORS.primaryDark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 2,
    },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm, gap: SPACING.sm },
    avatar: {
        width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary + '20',
        justifyContent: 'center', alignItems: 'center',
    },
    avatarText: { fontFamily: 'Inter_700Bold', fontSize: FONT_SIZE.md, color: COLORS.primary },
    authorName: { fontFamily: 'Inter_600SemiBold', fontSize: FONT_SIZE.sm, color: COLORS.textPrimary },
    date: { fontFamily: 'Inter_400Regular', fontSize: FONT_SIZE.xs, color: COLORS.textMuted },
    reviewText: { fontFamily: 'Inter_400Regular', fontSize: FONT_SIZE.sm, color: COLORS.textPrimary, lineHeight: 20 },

    aiResponseContainer: {
        marginTop: SPACING.md,
        backgroundColor: COLORS.primaryTranslucent,
        padding: SPACING.md,
        borderRadius: RADIUS.md,
        borderWidth: 1,
        borderColor: 'rgba(79, 70, 229, 0.1)',
    },
    aiResponseBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: SPACING.xs },
    aiBadgeText: { fontFamily: 'Inter_700Bold', fontSize: FONT_SIZE.xs, color: COLORS.primary },
    aiResponseText: { fontFamily: 'Inter_400Regular', fontSize: FONT_SIZE.sm, color: COLORS.primaryDark, lineHeight: 20 },

    replyBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.sm,
        marginTop: SPACING.md,
        paddingVertical: 12,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    replyBtnText: { fontFamily: 'Inter_600SemiBold', fontSize: FONT_SIZE.sm, color: COLORS.primary },
    replyingOverlay: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.75)', borderRadius: RADIUS.md,
        zIndex: 10, justifyContent: 'center', alignItems: 'center', gap: 8,
    },
    replyingText: { fontFamily: 'Inter_500Medium', fontSize: FONT_SIZE.sm, color: COLORS.primary },
    empty: { alignItems: 'center', paddingTop: 60, gap: SPACING.md },
    emptyEmoji: { fontSize: 48 },
    emptyText: { fontFamily: 'Inter_400Regular', fontSize: FONT_SIZE.md, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 24 },
});
