import React from 'react'
import { Image } from 'react-native'
import { IconProps, iconType } from './types'

const Icon: React.FC<IconProps> = ({ name, size, style }) => {
  return (
    <Image
      style={{ width: size, height: size, resizeMode: 'cover', ...style }}
      source={iconType[name] || require('@/app/assets/images/icons/men.png')}
    />
  )
}

export default Icon
