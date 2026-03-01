/**
 * Web-only Marketing Landing Page
 * This file (index.web.tsx) replaces index.tsx ONLY on the web platform.
 */
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import TopNav from '../components/landing/TopNav';
import HeroSection from '../components/landing/HeroSection';
import FeatureSection from '../components/landing/FeatureSection';
import ServicesSection from '../components/landing/ServicesSection';
import TestimonialSection from '../components/landing/TestimonialSection';
import Footer from '../components/landing/Footer';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

export default function WebLandingPage() {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    // If user is already logged in, redirect them to the dashboard
    React.useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.replace('/(main)/home');
        }
    }, [isLoading, isAuthenticated]);

    if (isLoading || isAuthenticated) {
        return null; // hide landing page while checking auth or redirecting
    }

    return (
        <View style={styles.container}>
            <TopNav />
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <HeroSection />
                <FeatureSection />
                <ServicesSection />
                <TestimonialSection />
                <Footer />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
});
