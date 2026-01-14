import { Text as RNText, StyleSheet, type TextProps, type TextStyle } from 'react-native';

interface Props extends TextProps {
  font?:
    | 'lora'
    | 'loraMedium'
    | 'loraSemi'
    | 'loraBold'
    | 'plusJakarta'
    | 'plusJakartaMedium'
    | 'plusJakartaSemi'
    | 'plusJakartaBold';
}

export function Text({ font = 'plusJakarta', children, ...other }: Props) {
  return (
    <RNText {...other} style={[other.style, FontFamily[font]]}>
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  lora: {
    fontFamily: 'Lora',
  },
  loraMedium: {
    fontFamily: 'Lora-Medium',
  },
  loraSemi: {
    fontFamily: 'Lora-SemiBold',
  },
  loraBold: {
    fontFamily: 'Lora-Bold',
  },
  plusJakarta: {
    fontFamily: 'PlusJakartaSans',
  },
  plusJakartaMedium: {
    fontFamily: 'PlusJakartaSans-Medium',
  },
  plusJakartaSemi: {
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  plusJakartaBold: {
    fontFamily: 'PlusJakartaSans-Bold',
  },
});

const FontFamily: {
  lora: TextStyle;
  loraMedium: TextStyle;
  loraSemi: TextStyle;
  loraBold: TextStyle;
  plusJakarta: TextStyle;
  plusJakartaMedium: TextStyle;
  plusJakartaSemi: TextStyle;
  plusJakartaBold: TextStyle;
} = {
  lora: styles.lora,
  loraMedium: styles.loraMedium,
  loraSemi: styles.loraSemi,
  loraBold: styles.loraBold,
  plusJakarta: styles.plusJakarta,
  plusJakartaMedium: styles.plusJakartaMedium,
  plusJakartaSemi: styles.plusJakartaSemi,
  plusJakartaBold: styles.plusJakartaBold,
};
