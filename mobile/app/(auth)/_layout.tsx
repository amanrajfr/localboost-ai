/**
 * Auth group layout — screens for login / signup.
 */

import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />
    );
}
