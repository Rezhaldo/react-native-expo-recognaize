import { Colors } from "@/constants/Colors";
import { PixelRatio, StyleSheet } from "react-native";

const fontPixelRatio = PixelRatio.getFontScale();

export function TextStyle() {
  const colorScheme = "light";

  return StyleSheet.create({
    regular: {
      fontSize: 18 / fontPixelRatio,
      lineHeight: 26 / fontPixelRatio,
      color: Colors[colorScheme].text,
    },
    regularBold: {
      fontSize: 18 / fontPixelRatio,
      lineHeight: 26 / fontPixelRatio,
      color: Colors[colorScheme].text,
    },
    medium: {
      fontSize: 16 / fontPixelRatio,
      lineHeight: 24 / fontPixelRatio,
      color: Colors[colorScheme].text,
    },
    mediumBold: {
      fontSize: 16 / fontPixelRatio,
      lineHeight: 24 / fontPixelRatio,
      color: Colors[colorScheme].text,
    },
    small: {
      fontSize: 14 / fontPixelRatio,
      lineHeight: 22 / fontPixelRatio,
      color: Colors[colorScheme].text,
    },
    smallBold: {
      fontSize: 14 / fontPixelRatio,
      lineHeight: 22 / fontPixelRatio,
      color: Colors[colorScheme].titleText,
    },
    xs: {
      fontSize: 12 / fontPixelRatio,
      lineHeight: 20 / fontPixelRatio,
      color: Colors[colorScheme].text,
    },
    xSmall: {
      fontSize: 10 / fontPixelRatio,
      lineHeight: 18 / fontPixelRatio,
      color: Colors[colorScheme].text,
    },
    h1: {
      fontSize: 34 / fontPixelRatio,
      lineHeight: 42 / fontPixelRatio,
      color: Colors[colorScheme].titleText,
    },
    headerTitle: {
      fontSize: 20 / fontPixelRatio,
      lineHeight: 28 / fontPixelRatio,
      color: Colors[colorScheme].titleText,
      fontFamily: "Lora-Bold",
    },
    title: {
      fontSize: 20 / fontPixelRatio,
      lineHeight: 28 / fontPixelRatio,
      color: Colors[colorScheme].titleText,
    },
    input: {
      fontSize: 14 / fontPixelRatio,
      lineHeight: 22 / fontPixelRatio,
      color: Colors[colorScheme].text,
    },
    inputBold: {
      fontSize: 14 / fontPixelRatio,
      lineHeight: 22 / fontPixelRatio,
      color: Colors[colorScheme].text,
    },
    inputError: {
      fontSize: 14 / fontPixelRatio,
      lineHeight: 22 / fontPixelRatio,
      color: Colors[colorScheme].inputError,
    },
    link: {
      fontSize: 14 / fontPixelRatio,
      lineHeight: 22 / fontPixelRatio,
      color: Colors[colorScheme].linkText,
    },
    tabLabel: {
      fontSize: 14 / fontPixelRatio,
      lineHeight: 22 / fontPixelRatio,
      fontFamily: "PlusJakartaSans",
    },
    summaryTitle: {
      fontSize: 26 / fontPixelRatio,
      lineHeight: 32 / fontPixelRatio,
      textAlign: "center",
      color: Colors[colorScheme].titleText,
    },
  });
}
