import { useSession } from '@/app/ctx';
import { Checkbox, InputController, NavigationHeader, ScrollView, Text } from '@/components';
import { Button } from '@/components/Button';
import { Container, TextStyle } from '@/shared';
import { useToggle } from '@/shared/hooks/use-toggle';
import { Link, router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Dimensions, Image, View } from 'react-native';
import styles from './styles';

export function SignIn() {
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
                            <InputController
                                name="email"
                                placeholder="Email Address"
                                control={control}
                                errorInput={false}
                            />
                            <InputController
                                name="password"
                                placeholder="Password"
                                control={control}
                                password
                            />
                            <View style={styles.checkboxSection}>
                                <View style={styles.checkboxContainer}>
                                    <Checkbox value={checkboxToggle.toggle} onValueChange={checkboxToggle.handleToggle} />
                                    <Text style={textStyle.input}>Remember Me</Text>
                                </View>
                                <Link href="/forgot-password">
                                    <Text font="plusJakarta" style={textStyle.link}>
                                        Forgot Password?
                                    </Text>
                                </Link>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 20 }}>
                        <Button
                            title="Login"
                            variant="primary"
                            onPress={handleSignIn}
                            isSubmitting={false}
                            disabled={false}
                        />
                        <View style={{ marginTop: 16, alignItems: 'center' }}>
                            <Text style={textStyle.input}>
                                Don’t have an account?{'  '}
                                <Link href="/sign-up">
                                    <Text style={textStyle.link}>Request a demo</Text>
                                </Link>
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Container>
    );
}
