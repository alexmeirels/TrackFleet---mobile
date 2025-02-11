import React from 'react'
import { Text, View, TextInput } from 'react-native'
import { CardInputProps } from './types'

const CardInput: React.FC<CardInputProps> = ({ title, styleCard, ...props }) => {
  return (
    <View style={{
      ...styleCard,
      borderRadius: 6,
      paddingHorizontal: 16

    }}>
      <Text style={{ fontSize: 14, color: '#8D8D99', paddingVertical: 16 }}>
        {title}
      </Text>

      <TextInput
        {...props}
      />
    </View>
  )
}

export default CardInput
