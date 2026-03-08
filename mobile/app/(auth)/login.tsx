/**
 * Login Screen — Modern Glassmorphism Design
 */

import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    ActivityIndicator,
    useWindowDimensions,
} from 'react-native';
import { useRouter, Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '../../constants/theme';

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();
    const { width } = useWindowDimensions();
    const isDesktop = width >= 768;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const validate = (): boolean => {
        const errs: Record<string, string> = {};
        if (!email.trim()) errs.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Enter a valid email';
        if (!password) errs.password = 'Password is required';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleLogin = async () => {
        if (!validate()) return;
        setLoading(true);
        try {
            await login({ email: email.trim().toLowerCase(), password });
            router.replace('/(main)/home');
        } catch (err: any) {
            const msg = err?.response?.data?.detail || 'Invalid email or password.';
            Alert.alert('Login Failed', msg);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        Alert.alert(
            'Google Login',
            'Google OAuth is not configured yet. Please log in with email and password for now.\n\nTo enable, add your Google Client ID in the backend .env file.',
        );
    };

    const handleForgotPassword = () => {
        Alert.alert(
            'Forgot Password',
            'Password reset will be available in a future update. For now, please contact support.',
        );
    };

    return (
        <LinearGradient
            colors={['#EEF2FF', '#E0E7FF', '#F8FAFC']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    contentContainerStyle={[
                        styles.container,
                        isDesktop && styles.containerDesktop,
                    ]}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Glass Card */}
                    <View style={[styles.card, isDesktop && styles.cardDesktop]}>
                        {/* Logo / Brand */}
                        <View style={styles.brandRow}>
                            <Text style={styles.brandEmoji}>🚀</Text>
                            <Text style={styles.brandName}>LocalBoost<Text style={styles.brandAI}>AI</Text></Text>
                        </View>

                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={styles.title}>Welcome back</Text>
                            <Text style={styles.subtitle}>Log in to continue growing your business</Text>
                        </View>

                        {/* Form */}
                        <View style={styles.form}>
                            {/* Email */}
                            <View style={styles.fieldGroup}>
                                <Text style={styles.label}>Email Address</Text>
                                <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                                    <Text style={styles.inputIcon}>✉️</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="you@example.com"
                                        placeholderTextColor={COLORS.textMuted}
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>
                                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                            </View>

                            {/* Password */}
                            <View style={styles.fieldGroup}>
                                <Text style={styles.label}>Password</Text>
                                <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
                                    <Text style={styles.inputIcon}>🔒</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your password"
                                        placeholderTextColor={COLORS.textMuted}
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={true}
                                    />
                                </View>
                                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                            </View>

                            {/* Forgot password */}
                            <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotButton}>
                                <Text style={styles.forgotText}>Forgot Password?</Text>
                            </TouchableOpacity>

                            {/* Login Button */}
                            <TouchableOpacity
                                style={[styles.primaryButton, loading && styles.buttonDisabled]}
                                onPress={handleLogin}
                                activeOpacity={0.85}
                                disabled={loading}
                            >
                                <LinearGradient
                                    colors={['#4F46E5', '#6366F1']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.buttonGradient}
                                >
                                    {loading ? (
                                        <ActivityIndicator color="#FFF" />
                                    ) : (
                                        <Text style={styles.primaryButtonText}>Log In</Text>
                                    )}
                                </LinearGradient>
                            </TouchableOpacity>

                            {/* Divider */}
                            <View style={styles.divider}>
                                <View style={styles.dividerLine} />
                                <Text style={styles.dividerText}>or continue with</Text>
                                <View style={styles.dividerLine} />
                            </View>

                            {/* Google Button */}
                            <TouchableOpacity
                                style={styles.googleButton}
                                onPress={handleGoogleLogin}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.googleIcon}>G</Text>
                                <Text style={styles.googleButtonText}>Log in with Google</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Footer link */}
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Don't have an account? </Text>
                            <Link href="/(auth)/signup" asChild>
                                <TouchableOpacity>
                                    <Text style={styles.footerLink}>Sign Up</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    flex: { flex: 1 },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: 40,
    },
    containerDesktop: {
        paddingVertical: 60,
    },
    card: {
        width: '100%',
        maxWidth: 460,
        backgroundColor: 'rgba(255, 255, 255, 0.88)',
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.lg,
        paddingVertical: 36,
        ...SHADOW.lg,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.6)',
    },
    cardDesktop: {
        paddingHorizontal: 40,
        paddingVertical: 44,
        borderRadius: 28,
    },
    brandRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginBottom: SPACING.lg,
    },
    brandEmoji: {
        fontSize: 28,
    },
    brandName: {
        fontFamily: 'Inter_700Bold',
        fontSize: 22,
        color: COLORS.textPrimary,
    },
    brandAI: {
        color: COLORS.primary,
    },
    header: {
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    title: {
        fontFamily: 'Inter_700Bold',
        fontSize: 26,
        color: COLORS.textPrimary,
        letterSpacing: -0.5,
        textAlign: 'center',
    },
    subtitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: FONT_SIZE.sm,
        color: COLORS.textSecondary,
        marginTop: SPACING.xs,
        textAlign: 'center',
    },
    form: {
        gap: SPACING.md,
    },
    fieldGroup: {
        gap: 6,
    },
    label: {
        fontFamily: 'Inter_500Medium',
        fontSize: FONT_SIZE.sm,
        color: COLORS.textSecondary,
        marginLeft: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        borderRadius: RADIUS.full,
        paddingHorizontal: SPACING.md,
        backgroundColor: 'rgba(248, 250, 252, 0.7)',
        gap: 10,
    },
    inputIcon: {
        fontSize: 16,
    },
    input: {
        flex: 1,
        fontFamily: 'Inter_400Regular',
        fontSize: FONT_SIZE.md,
        color: COLORS.textPrimary,
        height: '100%',
    },
    inputError: {
        borderColor: COLORS.error,
        borderWidth: 2,
        backgroundColor: 'rgba(239, 68, 68, 0.04)',
    },
    errorText: {
        fontFamily: 'Inter_400Regular',
        fontSize: FONT_SIZE.xs,
        color: COLORS.error,
        marginLeft: SPACING.md,
    },
    forgotButton: {
        alignSelf: 'flex-end',
        marginRight: 4,
    },
    forgotText: {
        fontFamily: 'Inter_500Medium',
        fontSize: FONT_SIZE.sm,
        color: COLORS.primary,
    },
    primaryButton: {
        marginTop: SPACING.sm,
        borderRadius: RADIUS.full,
        overflow: 'hidden',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 6,
    },
    buttonGradient: {
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: RADIUS.full,
    },
    buttonDisabled: {
        opacity: 0.6,
        shadowOpacity: 0,
        elevation: 0,
    },
    primaryButtonText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: FONT_SIZE.lg,
        color: '#FFFFFF',
        letterSpacing: 0.3,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: SPACING.xs,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.border,
    },
    dividerText: {
        fontFamily: 'Inter_400Regular',
        fontSize: FONT_SIZE.xs,
        color: COLORS.textMuted,
        marginHorizontal: SPACING.md,
    },
    googleButton: {
        flexDirection: 'row',
        height: 50,
        borderRadius: RADIUS.full,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: COLORS.border,
        gap: SPACING.sm,
    },
    googleIcon: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: '#4285F4',
    },
    googleButtonText: {
        fontFamily: 'Inter_500Medium',
        fontSize: FONT_SIZE.md,
        color: COLORS.textPrimary,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SPACING.lg,
    },
    footerText: {
        fontFamily: 'Inter_400Regular',
        fontSize: FONT_SIZE.sm,
        color: COLORS.textSecondary,
    },
    footerLink: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: FONT_SIZE.sm,
        color: COLORS.primary,
    },
});
