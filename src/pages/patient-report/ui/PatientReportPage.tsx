import { useSession } from '@/app/ctx';
import { FloatingInput, NavigationHeader, ScrollView, Text } from '@/components';
import { Button } from '@/components/Button';
import { Container, TextStyle } from '@/shared';
import { useToggle } from '@/shared/hooks/use-toggle';
import { router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dimensions, View } from 'react-native';
import styles from './styles';

export function PatientReportPage() {
    const { width } = Dimensions.get('window');

    // responsive logo sizes
    const logoStyles = {
        width: width >= 1024 ? 104 : 88,
        height: width >= 1024 ? 88 : 72,
    };

    const [value, setValue] = useState<string>('')

    // responsive font sizes
    const nameFontSize = width >= 1024 ? 20 : width >= 768 ? 18 : 20;

    const { control } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // #region Hooks
    const checkboxToggle = useToggle();
    const textStyle = TextStyle();
    const { session, signIn, signOut } = useSession();

    // #endregion

    const handleSignIn = async () => {
        console.log('Signing in...');
        signIn('dummy-token');
        router.replace('/(tabs)');
    }

    return (
        <Container>
            <NavigationHeader hideBackButton />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 40, paddingTop: 20 }}>
                    <View />
                    {/* Title + Form Section */}
                    <View style={{ paddingHorizontal: 20 }}>
                        <Text style={[styles.title, { textAlign: 'center', }]}>
                            Patient report
                        </Text>
                        <Text style={[styles.subtitle, { textAlign: 'center', marginBottom: 20 }]}>
                            Enter Patient ID
                        </Text>

                        <View style={styles.formContainer}>
                            <FloatingInput
                                label="Patient ID"
                                value={value}
                                onChangeText={(val) => { setValue(val) }}
                                error={''} id={'Patient ID'} />
                        </View>
                    </View>
                    <Button
                        title="Download report"
                        variant="primary"
                        onPress={handleSignIn}
                        isSubmitting={false}
                        disabled={false}
                    />
                </View>
            </ScrollView>
        </Container>
    );
}
