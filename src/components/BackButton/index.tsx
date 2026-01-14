// Expo
import AntDesign from '@expo/vector-icons/AntDesign';
import { Pressable, StyleSheet } from 'react-native';
import { Text } from '../Text';

// Style
import { Colors } from '@/constants/Colors';

// Assets
import { HomeIcon } from '@/assets/icons';

type Props = {
  home?: boolean;
  secondary?: boolean;
  onPress: () => void;
};

export function BackButton({ home, secondary, onPress }: Props) {
  return (
    <Pressable style={[styles.button, secondary ? styles.homeBackground : null]} onPress={onPress}>
      {home ? (
        <HomeIcon fill={Colors.light.white} width={15} height={15} />
      ) : (
        <AntDesign name="arrowleft" size={15} color={secondary ? 'white' : 'black'} />
      )}
      <Text style={styles.titleBackStyle} font='plusJakartaBold'>Back</Text>
    </Pressable>
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
  }
});
