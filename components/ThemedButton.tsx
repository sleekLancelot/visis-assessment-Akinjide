import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react'
import {Pressable, StyleSheet, type PressableProps,} from 'react-native';
import { ThemedText } from './ThemedText';

export type CustomButtonProps = PressableProps & {
  title: string;
  lightColor?: string;
  darkColor?: string;
};

const ThemedButton = ({
    title,
    style,
    lightColor,
    darkColor,
   ...rest
}: CustomButtonProps) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const color = useThemeColor({ light: '#fff', dark: '#000' }, 'text');

  return (
    <Pressable
      style={[
        { backgroundColor },
        styles.btn,
        style,
      ]}
      {...rest}
    >
      <ThemedText style={[styles.text, {
        color,
      }]}>{title}</ThemedText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    padding: 5,
    // height: 60,
    borderRadius: 12,
  },
  text: {
    textAlign: 'center',
  }
})

export {ThemedButton}