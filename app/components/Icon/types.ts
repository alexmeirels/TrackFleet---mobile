import { ImageSourcePropType } from "react-native";

export const iconType: Record<string, ImageSourcePropType> = {
  men: require('@/app/assets/images/icons/men.png'),
  woman: require('@/app/assets/images/icons/woman.png'),
  logout: require('@/app/assets/images/icons/logout.png'),
  car: require('@/app/assets/images/icons/car.png'),
  key: require('@/app/assets/images/icons/key.png'),
  history: require('@/app/assets/images/icons/history.png'),
  check: require('@/app/assets/images/icons/check.png'),
  back: require('@/app/assets/images/icons/back.png'),
  arrival: require('@/app/assets/images/icons/arrival.png')
}

export interface IconProps {
  name: keyof typeof iconType
  size: number,
  style?: object
}