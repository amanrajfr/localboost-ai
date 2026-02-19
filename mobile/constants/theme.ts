/**
 * LocalBoost AI — Design Tokens
 */

export const COLORS = {
    // Primary
    primary: '#0057D9',
    primaryLight: '#3B82F6',
    primaryDark: '#003DA5',

    // Secondary / Accent
    accent: '#FF6B2C',
    accentLight: '#FF8F5E',

    // Backgrounds
    background: '#F0F4FA',
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',

    // Text
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    textOnPrimary: '#FFFFFF',
    textMuted: '#94A3B8',

    // Semantic
    error: '#EF4444',
    success: '#22C55E',
    warning: '#F59E0B',

    // Borders
    border: '#E2E8F0',
    borderFocus: '#0057D9',

    // Google button
    google: '#FFFFFF',
    googleText: '#1F2937',
    googleBorder: '#D1D5DB',
};

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const RADIUS = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
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
