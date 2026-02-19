/**
 * Onboarding — 3 swipeable slides introducing the app.
 */

import { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SPACING, FONT_SIZE, RADIUS, BUTTON } from '../constants/theme';

const { width } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        emoji: '📊',
        title: 'AI-Powered Insights',
        subtitle: 'Get smart analytics and actionable recommendations to grow your local business online.',
    },
    {
        id: '2',
        emoji: '⭐',
        title: 'Review Management',
        subtitle: 'AI helps you respond to reviews, manage your reputation, and attract more customers.',
    },
    {
        id: '3',
        emoji: '🎯',
        title: 'Smart Marketing',
        subtitle: 'Automate your social media, ads, and email campaigns with AI that understands your business.',
    },
];

export default function Onboarding() {
    const router = useRouter();
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = async () => {
        if (currentIndex < SLIDES.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
        } else {
            await AsyncStorage.setItem('has_onboarded', 'true');
            router.replace('/(auth)/signup');
        }
    };

    const handleSkip = async () => {
        await AsyncStorage.setItem('has_onboarded', 'true');
        router.replace('/(auth)/signup');
    };

    return (
        <View style={styles.container}>
            {/* Skip button */}
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            {/* Slides */}
            <FlatList
                ref={flatListRef}
                data={SLIDES}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                onMomentumScrollEnd={(e) => {
                    const index = Math.round(e.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(index);
                }}
                renderItem={({ item }) => (
                    <View style={styles.slide}>
                        <View style={styles.emojiCircle}>
                            <Text style={styles.emoji}>{item.emoji}</Text>
                        </View>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.subtitle}>{item.subtitle}</Text>
                    </View>
                )}
            />

            {/* Dot indicators */}
            <View style={styles.dotRow}>
                {SLIDES.map((_, i) => (
                    <View
                        key={i}
                        style={[styles.dot, i === currentIndex && styles.dotActive]}
                    />
                ))}
            </View>

            {/* Next / Get Started button */}
            <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.8}>
                <Text style={styles.nextText}>
                    {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingBottom: SPACING.xl,
    },
    skipButton: {
        position: 'absolute',
        top: 60,
        right: SPACING.lg,
        zIndex: 10,
        padding: SPACING.sm,
    },
    skipText: {
        fontFamily: 'Inter_500Medium',
        fontSize: FONT_SIZE.md,
        color: COLORS.textSecondary,
    },
    slide: {
        width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.xl,
    },
    emojiCircle: {
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: COLORS.primary + '15',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    emoji: {
        fontSize: 64,
    },
    title: {
        fontFamily: 'Inter_700Bold',
        fontSize: FONT_SIZE.xxl,
        color: COLORS.textPrimary,
        textAlign: 'center',
        marginBottom: SPACING.md,
    },
    subtitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: FONT_SIZE.md,
        color: COLORS.textSecondary,
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: SPACING.md,
    },
    dotRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.border,
        marginHorizontal: 4,
    },
    dotActive: {
        width: 28,
        backgroundColor: COLORS.primary,
    },
    nextButton: {
        backgroundColor: COLORS.primary,
        height: BUTTON.height,
        borderRadius: BUTTON.borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: SPACING.lg,
    },
    nextText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: FONT_SIZE.lg,
        color: COLORS.textOnPrimary,
    },
});
