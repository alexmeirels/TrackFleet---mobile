import React from 'react'
import { Image, Text, View } from 'react-native'
import Icon from '../Icon'
import { BoxIcon, FormatText, Wrapper } from './styles'

const Card: React.FC<CardType> = ({
  iconName,
  description,
  descriptionStyle,
  link,
  linkStyle,
  style
}) => {
  return <View style={{...style}}>
    <Wrapper>
      <BoxIcon>
        <Icon
          size={54}
          name={iconName}
        />
      </BoxIcon>
      <FormatText>
        <Text style={{ ...descriptionStyle, flexWrap: 'wrap' }}>
          {description}
        </Text>
        <Text style={{ ...linkStyle, flexWrap: 'wrap' }}>
          {link}
        </Text>
      </FormatText>
    </Wrapper>
  </View>
}

export default Card