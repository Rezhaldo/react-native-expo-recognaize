import { Dimensions, StyleSheet, View } from 'react-native';

// Expo
import Constants from 'expo-constants';
import { router } from 'expo-router';

// Components
import { BackButton } from '../BackButton';
import { Text } from '../Text';

// Shared
import { TextStyle } from '@/shared';

type Props = {
  title?: string;
  hideBackButton?: boolean;
};

const { width: WINDOW_WIDTH } = Dimensions.get('window');

export function NavigationHeader({ hideBackButton, title }: Props) {
  // #region function
  const goBack = () => {
    if (router.canGoBack()) {
      router?.back();
    }
  };
  // #endregion

  // #region textStyle
  const textStyle = TextStyle();
  // #endregion

  return (
    <View style={styles.container}>
      {!hideBackButton && (
        <View style={styles.buttonContainer}>
          <BackButton onPress={goBack} />
        </View>
      )}
      {title && (
        <Text font="loraBold" style={[textStyle.headerTitle]}>
          {title}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Constants.statusBarHeight + 60,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
  },
});
