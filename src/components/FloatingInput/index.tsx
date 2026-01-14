import { Text } from '@/components';
import { Colors } from '@/constants/Colors';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    StyleSheet,
    TextInput,
    View,
    type ViewStyle,
} from 'react-native';

type Props = {
    id: string;
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
    disabled?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric';
    secureTextEntry?: boolean;
    style?: ViewStyle;
};

export function FloatingInput({
    label,
    value,
    onChangeText,
    error,
    disabled = false,
    keyboardType = 'default',
    secureTextEntry = false,
    style,
}: Props) {
    const [focused, setFocused] = useState(false);
    const animated = useRef(new Animated.Value(value ? 1 : 0)).current;

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        Animated.timing(animated, {
            toValue: focused || value ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [focused, value]);

    const labelStyle = {
        top: animated.interpolate({
            inputRange: [0, 1],
            outputRange: [18, 6],
        }),
        fontSize: animated.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 11],
        }),
        color: error
            ? '#F12534'
            : focused
                ? '#002D7C'
                : '#9EA3B1',
    };

    return (
        <View style={[styles.container, style]}>
            <Animated.Text style={[styles.label, labelStyle]}>
                {label}
            </Animated.Text>

            <TextInput
                value={value}
                onChangeText={onChangeText}
                editable={!disabled}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                style={[
                    styles.input,
                    error ? styles.inputError : {},
                    disabled ? styles.disabled : {},
                ]}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholderTextColor="#9EA3B1"
            />

            {!!error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderRadius: 24,
        borderColor: Colors.light.inputBorder,
        padding: 8,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.background
    },
    homeBackground: {
        backgroundColor: '#FFFFFF33',
    },
    titleBackStyle: {
        marginBottom: 2,
        paddingHorizontal: 4
    },
    container: {
        width: '100%',
        marginBottom: 16,
    },
    input: {
        height: 56,
        borderWidth: 1,
        borderColor: '#9EA3B1',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingTop: 22,
        fontSize: 16,
        fontWeight: '600',
        color: '#111',
        backgroundColor: 'transparent',
    },
    inputError: {
        borderColor: '#F12534',
    },
    label: {
        position: 'absolute',
        left: 16,
        zIndex: 10,
        paddingHorizontal: 4,
        fontWeight: '500',
    },
    disabled: {
        opacity: 0.6,
    },
    error: {
        marginTop: 6,
        fontSize: 12,
        color: '#F12534',
        fontWeight: '500',
    },

});

