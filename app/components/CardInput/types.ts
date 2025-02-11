import { StyleProp, TextInputProps, TextStyle, ViewStyle } from "react-native";

export interface CardInputProps extends TextInputProps {
  title: string,
  styleCard?: ViewStyle;
}