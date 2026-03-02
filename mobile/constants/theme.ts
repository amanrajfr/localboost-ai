/**
 * LocalBoost AI — Design Tokens
 */

export const COLORS = {
    // Primary (Vibrant Indigo)
    primary: '#4F46E5',
    primaryLight: '#818CF8',
    primaryDark: '#3730A3',
    primaryTranslucent: 'rgba(79, 70, 229, 0.1)',

    // Secondary / Accent (Warm Coral)
    accent: '#FF6B6B',
    accentLight: '#FF8787',
    accentTranslucent: 'rgba(255, 107, 107, 0.1)',

    // Backgrounds (Airy & Light)
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    surfaceTranslucent: 'rgba(255, 255, 255, 0.85)',

    // Text
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textOnPrimary: '#FFFFFF',
    textMuted: '#94A3B8',

    // Semantic
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',

    // Borders
    border: '#E2E8F0',
    borderFocus: '#4F46E5',

    // Google button
    google: '#FFFFFF',
    googleText: '#1F2937',
    googleBorder: '#E2E8F0',
};

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    section: 80,
};

export const RADIUS = {
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    full: 9999, // Pill-shaped/circular
};

export const FONT_SIZE = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
    hero: 36,
};

export const BUTTON = {
    height: 52,
    borderRadius: RADIUS.md,
};

export const SHADOW = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 6,
    },
};
