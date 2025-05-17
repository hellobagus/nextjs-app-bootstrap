import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

interface CustomButtonProps {
  mode?: 'contained' | 'outlined' | 'text';
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  style?: any;
  textColor?: string;
  icon?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  mode = 'contained',
  onPress,
  loading = false,
  disabled = false,
  children,
  style,
  textColor,
  icon,
}) => {
  const theme = useTheme();

  return (
    <Button
      mode={mode}
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      style={[
        styles.button,
        mode === 'contained' && styles.containedButton,
        mode === 'outlined' && styles.outlinedButton,
        style,
      ]}
      textColor={textColor}
      icon={icon}
    >
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 6,
  },
  containedButton: {
    elevation: 2,
  },
  outlinedButton: {
    borderWidth: 1.5,
  },
});

export default CustomButton;
