import React from 'react'
import { ActivityIndicator, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

interface FullPageLoaderProps {
  size?: number | "small" | 'large'
  animating: boolean
  customStyles?: StyleProp<ViewStyle>
  color?: string
}

const FullPageLoader = ({
  size= 'large',
  animating,
  customStyles,
  color,
}: FullPageLoaderProps) => {
  return (
    <View style={[styles.loaderStyle, customStyles]}>
      <ActivityIndicator
        size={size}
        animating={animating}
        color={color}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  loaderStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export {FullPageLoader}