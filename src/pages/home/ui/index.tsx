import { useSession } from '@/app/ctx';
import { NavigationHeader, ScrollView, Text } from '@/components';
import { HomeButton } from '@/components/HomeButton';
import { Container, TextStyle } from '@/shared';
import { useNavigation } from '@/shared/hooks/use-navigation';
import { useToggle } from '@/shared/hooks/use-toggle';
import { router } from 'expo-router';
import { Dimensions, Image, View } from 'react-native';
import styles from './styles';


export function Home() {
    const { width } = Dimensions.get('window');
    // #region Icons
    const BrainUrl = require('@/assets/icons/bxs-brain.svg');
    const AddProfileUrl = require('@/assets/icons/addprofile.svg');
    const TableReportUrl = require('@/assets/icons/table-report.svg');
    const UiwSettingUrl = require('@/assets/icons/settings.svg');
    // #endregion

    // responsive logo sizes
    const logoStyles = {
        width: width >= 1024 ? 104 : 88,
        height: width >= 1024 ? 88 : 72,
    };

    // #region Hooks
    const checkboxToggle = useToggle();
    const textStyle = TextStyle();
    const { session, signIn, signOut } = useSession();
    const navigation = useNavigation();
    // #endregion

    // #region Handlers
    const handleNewAssessmentPress = () => {
        router.navigate('new-assessment');
    };
    const handleCreatePatient = () => {
        router.navigate('create-patient');
    };
    const handlePatientReport = () => {
        router.navigate('patient-report');
    }
    const handleSettingsPress = () => {
        // router.navigate('airplane-game');
        // router.navigate('trail-making');
        // router.navigate('grocery-shopping');
        router.navigate('cashier-shop');


    }
    // #endregion


    return (
        <Container>
            <NavigationHeader hideBackButton />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 40, paddingTop: 8 }}>
                    {/* Logo Section */}
                    <View style={[styles.container, { alignItems: 'center' }]}>
                        <Image
                            source={require('@/assets/logo/app-icon.png')}
                            resizeMode="contain"
                            style={[styles.logo, logoStyles]}
                        />

                        <View style={styles.textGroup}>
                            <Text style={[styles.title, { textAlign: 'center' }]}>
                                Re
                                <Text style={styles.blue}>COG</Text>
                                n
                                <Text style={styles.blue}>AI</Text>
                                ze
                            </Text>
                        </View>
                    </View>

                    {/* Title + Form Section */}
                    <View style={styles.homeContainer}>
                        <HomeButton title="New assessment" icon={BrainUrl} onPress={handleNewAssessmentPress} />
                        <HomeButton title="Create patient" icon={AddProfileUrl} onPress={handleCreatePatient} />
                        <HomeButton title="Patient report" icon={TableReportUrl} onPress={handlePatientReport} />
                        <HomeButton title="Settings" icon={UiwSettingUrl} onPress={handleSettingsPress} />
                    </View>

                </View>
            </ScrollView>
        </Container>
    );
}
