/**
 * Login Screen
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
} from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { COLORS, SPACING, FONT_SIZE, RADIUS, BUTTON, SHADOW } from '../../constants/theme';

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();

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
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Log in to continue growing your business</Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    {/* Email */}
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={[styles.input, errors.email && styles.inputError]}
                            placeholder="you@example.com"
                            placeholderTextColor={COLORS.textMuted}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    </View>

                    {/* Password */}
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={[styles.input, errors.password && styles.inputError]}
                            placeholder="Enter your password"
                            placeholderTextColor={COLORS.textMuted}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
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
                        activeOpacity={0.8}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color={COLORS.textOnPrimary} />
                        ) : (
                            <Text style={styles.primaryButtonText}>Log In</Text>
                        )}
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>or</Text>
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1, backgroundColor: COLORS.background },
    container: {
        flexGrow: 1,
        paddingHorizontal: SPACING.lg,
        paddingTop: 100,
        paddingBottom: SPACING.xl,
    },
    header: {
        marginBottom: SPACING.xl + SPACING.md,
    },
    title: {
        fontFamily: 'Inter_700Bold',
        fontSize: FONT_SIZE.hero,
        color: COLORS.textPrimary,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: FONT_SIZE.md,
        color: COLORS.textSecondary,
        marginTop: SPACING.xs,
    },
    form: {
        gap: SPACING.md,
    },
    fieldGroup: {
        gap: SPACING.xs,
    },
    label: {
        fontFamily: 'Inter_500Medium',
        fontSize: FONT_SIZE.sm,
        color: COLORS.textPrimary,
    },
    input: {
        height: 50,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        borderRadius: RADIUS.md,
        paddingHorizontal: SPACING.md,
        fontFamily: 'Inter_400Regular',
        fontSize: FONT_SIZE.md,
        color: COLORS.textPrimary,
        backgroundColor: COLORS.surface,
    },
    inputError: {
        borderColor: COLORS.error,
    },
    errorText: {
        fontFamily: 'Inter_400Regular',
        fontSize: FONT_SIZE.xs,
        color: COLORS.error,
    },
    forgotButton: {
        alignSelf: 'flex-end',
    },
    forgotText: {
        fontFamily: 'Inter_500Medium',
        fontSize: FONT_SIZE.sm,
        color: COLORS.primary,
    },
    primaryButton: {
        backgroundColor: COLORS.primary,
        height: BUTTON.height,
        borderRadius: BUTTON.borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SPACING.sm,
        ...SHADOW.md,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    primaryButtonText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: FONT_SIZE.lg,
        color: COLORS.textOnPrimary,
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
        fontSize: FONT_SIZE.sm,
        color: COLORS.textMuted,
        marginHorizontal: SPACING.md,
    },
    googleButton: {
        flexDirection: 'row',
        height: BUTTON.height,
        borderRadius: BUTTON.borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.google,
        borderWidth: 1.5,
        borderColor: COLORS.googleBorder,
        gap: SPACING.sm,
    },
    googleIcon: {
        fontFamily: 'Inter_700Bold',
        fontSize: FONT_SIZE.xl,
        color: '#4285F4',
    },
    googleButtonText: {
        fontFamily: 'Inter_500Medium',
        fontSize: FONT_SIZE.md,
        color: COLORS.googleText,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SPACING.xl,
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
