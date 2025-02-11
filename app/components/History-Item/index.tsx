import React from 'react'
import { Text, View } from 'react-native'
import { FormatText, Wrapper } from './styles'
import Icon from '../Icon'

const HistoryItem: React.FC<HitoryItemType> = ({
  plate,
  date,
  iconName,
  style
}) => {
  return <View>
    <Wrapper style={{ ...style }}>
      <FormatText>
        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>
          {plate}
        </Text>
        <Text style={{ color: '#C4C4CC', fontSize: 12, fontWeight: 'regular', paddingTop: 6 }}>
          {date}
        </Text>
      </FormatText>
      <Icon
        size={24}
        name={iconName}
      />
    </Wrapper>
  </View>
}

export default HistoryItem