/**
 * Sign Up Screen
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

export default function SignUp() {
    const router = useRouter();
    const { register } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const validate = (): boolean => {
        const errs: Record<string, string> = {};
        if (!name.trim()) errs.name = 'Name is required';
        if (!email.trim()) errs.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Enter a valid email';
        if (!phone.trim()) errs.phone = 'Phone is required';
        else if (!/^\d{10}$/.test(phone)) errs.phone = 'Phone must be 10 digits';
        if (!password) errs.password = 'Password is required';
        else if (password.length < 8) errs.password = 'Minimum 8 characters';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSignUp = async () => {
        if (!validate()) return;
        setLoading(true);
        try {
            await register({ name: name.trim(), email: email.trim().toLowerCase(), phone, password });
            router.replace('/(main)/home');
        } catch (err: any) {
            const msg = err?.response?.data?.detail || 'Something went wrong. Please try again.';
            Alert.alert('Sign Up Failed', msg);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = () => {
        Alert.alert(
            'Google Sign-Up',
            'Google OAuth is not configured yet. Please sign up with email and password for now.\n\nTo enable, add your Google Client ID in the backend .env file.',
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
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Start boosting your business today</Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    {/* Name */}
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            style={[styles.input, errors.name && styles.inputError]}
                            placeholder="Aman Raj"
                            placeholderTextColor={COLORS.textMuted}
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="words"
                        />
                        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                    </View>

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

                    {/* Phone */}
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Phone Number</Text>
                        <TextInput
                            style={[styles.input, errors.phone && styles.inputError]}
                            placeholder="9876543210"
                            placeholderTextColor={COLORS.textMuted}
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="number-pad"
                            maxLength={10}
                        />
                        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
                    </View>

                    {/* Password */}
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={[styles.input, errors.password && styles.inputError]}
                            placeholder="Minimum 8 characters"
                            placeholderTextColor={COLORS.textMuted}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                    </View>

                    {/* Sign Up Button */}
                    <TouchableOpacity
                        style={[styles.primaryButton, loading && styles.buttonDisabled]}
                        onPress={handleSignUp}
                        activeOpacity={0.8}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color={COLORS.textOnPrimary} />
                        ) : (
                            <Text style={styles.primaryButtonText}>Sign Up</Text>
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
                        onPress={handleGoogleSignUp}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.googleIcon}>G</Text>
                        <Text style={styles.googleButtonText}>Sign up with Google</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer link */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <Link href="/(auth)/login" asChild>
                        <TouchableOpacity>
                            <Text style={styles.footerLink}>Log In</Text>
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
        paddingTop: 80,
        paddingBottom: SPACING.xl,
    },
    header: {
        marginBottom: SPACING.xl,
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
