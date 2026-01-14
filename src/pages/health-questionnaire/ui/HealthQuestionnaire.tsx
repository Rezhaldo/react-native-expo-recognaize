import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Pressable, View } from 'react-native';

import { Checkbox, NavigationHeader, ScrollView, Text } from '@/components';
import { Button } from '@/components/Button';
import { Container, TextStyle } from '@/shared';
import { useToggle } from '@/shared/hooks/use-toggle';
import styles from './styles';

const currYear = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) => currYear - i).reverse();

const OPTIONS = [
    'High blood pressure',
    'High cholesterol',
    'Diabetes',
    'Smoking',
    'Obesity',
];

export function HealthQuestionnaire() {
    const { width } = Dimensions.get('window');
    const textStyle = TextStyle();
    const checkboxToggle = useToggle();

    const [year, setYear] = useState<number | null>(null);
    const [answers, setAnswers] = useState<number[]>([]);

    const NONE_INDEX = OPTIONS.length;

    const toggleAnswer = (idx: number) => {
        if (idx === NONE_INDEX) {
            setAnswers([NONE_INDEX]);
            return;
        }

        setAnswers((prev) => {
            const filtered = prev.filter((x) => x !== NONE_INDEX);
            return filtered.includes(idx)
                ? filtered.filter((x) => x !== idx)
                : [...filtered, idx];
        });
    };

    const isValid =
        year !== null &&
        answers.length > 0 &&
        checkboxToggle.toggle;

    const handleSubmit = () => {
        if (!isValid) return;

        const payload = {
            year,
            conditions: answers
                .map((a) => OPTIONS[a] ?? 'None')
                .join(', '),
        };

        console.log('Submitted:', payload);

        router.navigate('matching-symbol');
    };

    return (
        <Container>
            <NavigationHeader hideBackButton />

            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Question 1 */}
                <View style={{ marginBottom: 24 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text style={[textStyle.medium, { flex: 1, marginRight: 12 }]}>
                            1. What year were you born?
                        </Text>

                        <View
                            style={[
                                styles.pickerWrapper,
                                {
                                    width: '32%',
                                },

                            ]}
                        >
                            <Picker
                                selectedValue={year}
                                onValueChange={(value) => setYear(value)}
                                style={{ textAlign: 'center', borderWidth: 1 }}
                            >
                                <Picker.Item label="YYYY" value={null} />
                                {YEARS.map((y) => (
                                    <Picker.Item key={y} label={String(y)} value={y} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </View>

                {/* Question 2 */}
                <View style={{ marginBottom: 24 }}>
                    <Text style={textStyle.medium}>
                        2. Have you been diagnosed by a doctor or taking medication for any
                        of the vascular health conditions in the past 1 year?
                        {'\n'}Select all that apply.
                    </Text>

                    <View style={{ marginTop: 12 }}>
                        {OPTIONS.map((option, idx) => {
                            const active = answers.includes(idx);
                            return (
                                <Pressable
                                    key={String(idx)}
                                    onPress={() => toggleAnswer(idx)}
                                    style={[
                                        styles.optionButton,
                                        active && styles.optionActive,
                                    ]}
                                >
                                    <Text style={active ? styles.optionTextActive : styles.optionText}>
                                        {option}
                                    </Text>
                                </Pressable>
                            );
                        })}

                        <Pressable
                            onPress={() => toggleAnswer(NONE_INDEX)}
                            style={[
                                styles.optionButton,
                                answers.includes(NONE_INDEX) && styles.optionActive,
                            ]}
                        >
                            <Text
                                style={
                                    answers.includes(NONE_INDEX)
                                        ? styles.optionTextActive
                                        : styles.optionText
                                }
                            >
                                None of the above
                            </Text>
                        </Pressable>
                    </View>
                </View>

                {/* Confirmation */}
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        value={checkboxToggle.toggle}
                        onValueChange={checkboxToggle.handleToggle}
                        style={{ alignSelf: 'flex-start', marginTop: 6 }}
                    />
                    <Text style={[textStyle.small, { marginLeft: 12 }]}>
                        I hereby declare that the information given above is correct.
                    </Text>
                </View>

                {/* Submit */}
                <View style={{ marginTop: 32 }}>
                    <Button
                        title="Submit"
                        variant="primary"
                        onPress={handleSubmit}
                        disabled={!isValid}
                    />
                </View>
            </ScrollView>
        </Container>
    );
}
