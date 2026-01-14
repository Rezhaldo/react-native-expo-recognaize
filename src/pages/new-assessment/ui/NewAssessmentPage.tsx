import { useSession } from '@/app/ctx';
import { NavigationHeader, ScrollView, Text } from '@/components';
import { HomeButton } from '@/components/HomeButton';
import { Container, TextStyle } from '@/shared';
import { useToggle } from '@/shared/hooks/use-toggle';
import { router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dimensions, View } from 'react-native';
import styles from './styles';

export function NewAssessmentPage() {
    const { width } = Dimensions.get('window');

    // responsive logo sizes
    const logoStyles = {
        width: width >= 1024 ? 104 : 88,
        height: width >= 1024 ? 88 : 72,
    };

    const BrainUrl = require('@/assets/icons/bxs-brain.svg');
    const AddProfileUrl = require('@/assets/icons/addprofile.svg');

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

    const handleNewPatient = () => {
        router.navigate('create-patient');
    };

    return (
        <Container>
            <NavigationHeader hideBackButton />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', marginBottom: 32 }}>
                    {/* Title + Form Section */}
                    <View style={{ paddingHorizontal: 20 }}>
                        <Text style={[styles.title, { textAlign: 'center', }]}>
                            New assessment
                        </Text>
                        <Text style={[styles.subtitle, { textAlign: 'center', marginBottom: 20 }]}>
                            Start assessment for which patient ?
                        </Text>
                        <View style={styles.homeContainer}>
                            <HomeButton title="New patient" icon={BrainUrl} onPress={handleNewPatient} />
                            <HomeButton title="Existing patient" icon={AddProfileUrl} onPress={handleNewPatient} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Container>
    );
}
