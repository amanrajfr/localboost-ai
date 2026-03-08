/**
 * Sign Up Screen — Modern Glassmorphism Design
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

export default function SignUp() {
    const router = useRouter();
    const { register } = useAuth();
    const { width } = useWindowDimensions();
    const isDesktop = width >= 768;

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
                            <Text style={styles.title}>Create your account</Text>
                            <Text style={styles.subtitle}>Join 10,000+ Indian businesses growing with AI</Text>
                        </View>

                        {/* Form */}
                        <View style={styles.form}>
                            {/* Name */}
                            <View style={styles.fieldGroup}>
                                <Text style={styles.label}>Full Name</Text>
                                <View style={[styles.inputWrapper, errors.name && styles.inputError]}>
                                    <Text style={styles.inputIcon}>👤</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Rahul Sharma"
                                        placeholderTextColor={COLORS.textMuted}
                                        value={name}
                                        onChangeText={setName}
                                        autoCapitalize="words"
                                    />
                                </View>
                                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                            </View>

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

                            {/* Phone */}
                            <View style={styles.fieldGroup}>
                                <Text style={styles.label}>Phone Number</Text>
                                <View style={[styles.inputWrapper, errors.phone && styles.inputError]}>
                                    <Text style={styles.inputIcon}>📱</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="9876543210"
                                        placeholderTextColor={COLORS.textMuted}
                                        value={phone}
                                        onChangeText={setPhone}
                                        keyboardType="number-pad"
                                        maxLength={10}
                                    />
                                </View>
                                {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
                            </View>

                            {/* Password */}
                            <View style={styles.fieldGroup}>
                                <Text style={styles.label}>Password</Text>
                                <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
                                    <Text style={styles.inputIcon}>🔒</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Min. 8 characters"
                                        placeholderTextColor={COLORS.textMuted}
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={true}
                                    />
                                </View>
                                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                            </View>

                            {/* Sign Up Button */}
                            <TouchableOpacity
                                style={[styles.primaryButton, loading && styles.buttonDisabled]}
                                onPress={handleSignUp}
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
                                        <Text style={styles.primaryButtonText}>Create Account</Text>
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
