import React, { useEffect, useRef, useState } from 'react';
import { Animated, Platform, View, ViewProps, StyleSheet } from 'react-native';

interface FadeInSectionProps extends ViewProps {
    children: React.ReactNode;
    delay?: number;
}

export default function FadeInSection({ children, delay = 0, style, ...props }: FadeInSectionProps) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(40)).current;

    // On native, we just animate on mount since scrolling isn't easily observed without Reanimated
    // On web, we use IntersectionObserver
    const [isVisible, setIsVisible] = useState(Platform.OS !== 'web');
    const viewRef = useRef<View>(null);

    useEffect(() => {
        if (Platform.OS === 'web') {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                },
                { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
            );

            // Access underlying DOM node securely
            const node = viewRef.current as unknown as Element;
            if (node) observer.observe(node);

            return () => observer.disconnect();
        }
    }, []);

    useEffect(() => {
        if (isVisible) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 800,
                    delay,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 800,
                    delay,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [isVisible, delay, fadeAnim, translateY]);

    return (
        <Animated.View
            ref={viewRef}
            style={[style, { opacity: fadeAnim, transform: [{ translateY }] }]}
            {...props}
        >
            {children}
        </Animated.View>
    );
}
