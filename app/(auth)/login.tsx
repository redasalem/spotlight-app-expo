import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useOAuth } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.replace('/(tabs)');
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };

  return (
    <View className="flex-1 bg-[#000000]">
      {/* BRAND SECTION */}
      <View className="mt-10 items-center">
        <View className="mb-5 h-[60px] w-[60px] items-center justify-center rounded-[18px] bg-[#4ADE80]/15">
          <Ionicons name="leaf" size={32} color="#4ADE80" />
        </View>
        <Text className="mb-2 font-['JetBrainsMono-Medium'] text-[42px] font-bold tracking-[0.5px] text-[#4ADE80]">
          spotlight
        </Text>
        <Text className="text-base tracking-[1px] text-[#9CA3AF] lowercase">
          don't miss anything
        </Text>
      </View>

      {/* ILLUSTRATION */}
      <View className="flex-1 items-center justify-center px-10">
        {/* Placeholder image source since verifying assets requires checking file system */}
        <Image
          source={require('../../assets/images/auth-bg-2.png')}
          className="aspect-square max-h-[220px] w-[65%]"
          resizeMode="cover"
        />
      </View>

      {/* LOGIN SECTION */}
      <View className="w-full items-center px-6 pb-10">
        <TouchableOpacity
          className="mb-5 w-full max-w-[300px] flex-row items-center justify-center rounded-[14px] bg-white px-6 py-4 shadow-md"
          onPress={handleGoogleSignIn}
          activeOpacity={0.9}>
          <View className="mr-3 h-6 w-6 items-center justify-center">
            <Ionicons name="logo-google" size={20} color="#1A1A1A" />
          </View>
          <Text className="text-base font-semibold text-[#1A1A1A]">Continue with Google</Text>
        </TouchableOpacity>

        <Text className="max-w-[280px] text-center text-xs text-[#9CA3AF]">
          By continuing, you agree to our Terms and Privacy Policy
        </Text>
      </View>
    </View>
  );
}
