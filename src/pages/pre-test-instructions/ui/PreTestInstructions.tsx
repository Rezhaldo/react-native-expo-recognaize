import { useSession } from '@/app/ctx';
import { NavigationHeader, ScrollView, Text } from '@/components';
import { Button } from '@/components/Button';
import { Container, TextStyle } from '@/shared';
import { useToggle } from '@/shared/hooks/use-toggle';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Dimensions, Image, View } from 'react-native';
import styles from './styles';

export function PreTestInstructions() {
    const { width } = Dimensions.get('window');

    // responsive logo sizes
    const logoStyles = {
        width: width >= 1024 ? 104 : 88,
        height: width >= 1024 ? 88 : 72,
    };

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

    const handleProceed = async () => {
        router.push('health-questionnaire');
    }

    return (
        <Container>
            <NavigationHeader hideBackButton />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 40, paddingTop: 20 }}>
                    {/* Logo Section */}
                    <View style={[styles.container, { alignItems: 'center' }]}>
                        <Image
                            source={require('@/assets/logo/app-icon.png')}
                            resizeMode="contain"
                            style={[styles.logo, logoStyles]}
                        />
                        <View style={styles.textGroup}>
                            <Text font="plusJakartaBold" style={[styles.nameLine, { fontSize: nameFontSize }]}>
                                Gray Matter
                            </Text>
                            <Text style={[styles.nameLine, { fontSize: nameFontSize }]}>
                                Solutions
                            </Text>
                            <Text style={styles.subtitle}>A spin-off from NTU, Singapore.</Text>
                        </View>
                    </View>

                    {/* Title + Form Section */}
                    <View style={{ paddingHorizontal: 20 }}>
                        <Text style={[styles.title, { textAlign: 'center', marginBottom: 20 }]}>
                            Re
                            <Text style={styles.blue}>COG</Text>
                            n
                            <Text style={styles.blue}>AI</Text>
                            ze
                        </Text>

                        <View style={styles.formContainer}>
                            <Text style={[styles.subtitle, { textAlign: 'center' }]}>This is a quick digital assessment that helps test your brain performance.
                            </Text>
                            <Text style={[styles.subtitle, { textAlign: 'center' }]}>Before you begin, please let your doctor know if you have any vision or hearing difficulties, as this may
                                affect how you complete the test.
                            </Text>
                        </View>
                        <Text style={[styles.subtitle, { color: "#002D7C", fontWeight: '800', opacity: 1, textAlign: 'center', marginVertical: 16 }]}>As seen on</Text>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', gap: 16 }}>
                            <Image
                                source={require('@/assets/logo/st-trademark.png')}
                                resizeMode="contain"
                                style={[{ width: 56, height: 56 }]}
                            />
                            <Image
                                source={require('@/assets/logo/st-logo.png')}
                                resizeMode="contain"
                                style={[{ width: 56, height: 56 }]}
                            />
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 20 }}>
                        <Button
                            title="Proceed"
                            variant="primary"
                            onPress={handleProceed}
                            isSubmitting={false}
                            disabled={false}
                        />
                    </View>
                </View>
            </ScrollView>
        </Container>
    );
}
