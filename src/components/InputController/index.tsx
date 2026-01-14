import { StyleSheet, View, type KeyboardTypeOptions } from 'react-native';

// Hook Form
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';

// Components
import { Input } from '../Input';
import { Text } from '../Text';

// Shared
import { TextStyle } from '@/shared';

interface Props<T extends FieldValues> {
  name: Path<T>;
  placeholder?: string;
  errorMessage?: string;
  control: Control<T>;
  password?: boolean;
  errorInput?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

export function InputController<T extends FieldValues>({
  name,
  placeholder,
  control,
  errorMessage,
  password,
  errorInput,
  keyboardType,
}: Props<T>) {
  const textStyle = TextStyle();

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder={placeholder}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            secureTextEntry={password}
            isError={!!errorMessage || errorInput}
            isPassword={password}
            keyboardType={
              name?.toLowerCase()?.includes('email')
                ? 'email-address'
                : keyboardType
                  ? keyboardType
                  : undefined
            }
          />
        )}
        name={name}
      />
      {errorMessage && (
        <Text font="plusJakartaSemi" style={textStyle.inputError}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 5,
  },
});
