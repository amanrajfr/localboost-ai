/**
 * Business Profile Screen — create or edit business details.
 */
import React, { useEffect, useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    ScrollView, ActivityIndicator, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { getMyBusiness, createBusiness, updateBusiness, BusinessPayload, BusinessResponse } from '../../services/api';
import { COLORS, FONT_SIZE, SPACING, RADIUS, BUTTON, SHADOW } from '../../constants/theme';

const CATEGORIES = ['Restaurant', 'Retail', 'Health & Wellness', 'Home Services', 'Professional Services', 'Beauty & Salon', 'Automotive', 'Education', 'Other'];

export default function BusinessScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [existing, setExisting] = useState<BusinessResponse | null>(null);
    const [form, setForm] = useState<BusinessPayload>({
        name: '', category: '', address: '', city: '', phone: '', website: '', description: '',
    });

    useEffect(() => {
        (async () => {
            try {
                const biz = await getMyBusiness();
                setExisting(biz);
                setForm({
                    name: biz.name ?? '',
                    category: biz.category ?? '',
                    address: biz.address ?? '',
                    city: biz.city ?? '',
                    phone: biz.phone ?? '',
                    website: biz.website ?? '',
                    description: biz.description ?? '',
                });
            } catch { /* No business yet */ }
            setLoading(false);
        })();
    }, []);

    const set = (key: keyof BusinessPayload) => (val: string) =>
        setForm(prev => ({ ...prev, [key]: val }));

    const handleSave = async () => {
        if (!form.name.trim()) { Alert.alert('Error', 'Business name is required'); return; }
        setSaving(true);
        try {
            if (existing) {
                await updateBusiness(form);
            } else {
                await createBusiness(form);
            }
            Alert.alert('Saved!', 'Your business profile has been saved.', [
                { text: 'OK', onPress: () => router.back() }
            ]);
        } catch (err: any) {
            Alert.alert('Error', err?.response?.data?.detail ?? 'Failed to save. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Text style={styles.backText}>← Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>{existing ? 'Edit Business' : 'Setup Business'}</Text>
                    <Text style={styles.subtitle}>
                        {existing ? 'Update your local business details.' : 'Register your local business to get started.'}
                    </Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <Field label="Business Name *" value={form.name} onChangeText={set('name')} placeholder="e.g. The Coffee House" />
                    <Field label="Category" value={form.category ?? ''} onChangeText={set('category')} placeholder="e.g. Restaurant, Retail…" />
                    <Field label="Address" value={form.address ?? ''} onChangeText={set('address')} placeholder="Street address" />
                    <Field label="City" value={form.city ?? ''} onChangeText={set('city')} placeholder="City" />
                    <Field label="Phone" value={form.phone ?? ''} onChangeText={set('phone')} placeholder="+91 98765 43210" keyboardType="phone-pad" />
                    <Field label="Website" value={form.website ?? ''} onChangeText={set('website')} placeholder="https://yourbusiness.com" keyboardType="url" />
                    <Field label="Description" value={form.description ?? ''} onChangeText={set('description')} placeholder="Brief description of your business…" multiline numberOfLines={3} />
                </View>

                {/* Save Button */}
                <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85} disabled={saving}>
                    {saving
                        ? <ActivityIndicator color="#fff" />
                        : <Text style={styles.saveBtnText}>{existing ? 'Update Profile' : 'Create Profile'}</Text>
                    }
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

function Field({ label, ...props }: { label: string } & React.ComponentProps<typeof TextInput>) {
    return (
        <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>{label}</Text>
            <TextInput style={[styles.input, props.multiline && styles.inputMultiline]} placeholderTextColor={COLORS.textMuted} {...props} />
        </View>
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
    form: { gap: SPACING.md, marginBottom: SPACING.xl },
    fieldGroup: { gap: 6 },
    fieldLabel: { fontFamily: 'Inter_600SemiBold', fontSize: FONT_SIZE.sm, color: COLORS.textPrimary },
    input: {
        backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border,
        borderRadius: RADIUS.sm, paddingHorizontal: SPACING.md, paddingVertical: 12,
        fontFamily: 'Inter_400Regular', fontSize: FONT_SIZE.md, color: COLORS.textPrimary,
    },
    inputMultiline: { height: 90, textAlignVertical: 'top', paddingTop: 12 },
    saveBtn: {
        height: BUTTON.height, borderRadius: BUTTON.borderRadius, backgroundColor: COLORS.primary,
        justifyContent: 'center', alignItems: 'center', ...SHADOW.md,
    },
    saveBtnText: { fontFamily: 'Inter_700Bold', fontSize: FONT_SIZE.md, color: '#FFFFFF' },
});
