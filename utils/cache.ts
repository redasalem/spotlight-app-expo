import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const createTokenCache = () => {
    return {
        getToken: async (key: string) => {
            try {
                const item = await SecureStore.getItemAsync(key);
                if (item) {
                    console.log(`${key} was used 🔐 \n`);
                } else {
                    console.log('No values stored under key: ' + key);
                }
                return item;
            } catch (error) {
                console.error('secure store get item error: ', error);
                await SecureStore.deleteItemAsync(key);
                return null;
            }
        },
        saveToken: async (key: string, value: string) => {
            try {
                return SecureStore.setItemAsync(key, value);
            } catch (err) {
                console.error('secure store set item error: ', err);
                return;
            }
        },
    };
};

export const tokenCache = Platform.OS !== 'web' ? createTokenCache() : undefined;
