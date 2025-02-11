import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Icon from '../Icon'
import { Wrapper } from './styles'
import { useNavigation } from '@react-navigation/native'


const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigation()
  return (
    <View>
      <Wrapper>
        <TouchableOpacity
          onPress={() => navigate.goBack()}
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center'
          }} >
          <Icon
            name='back'
            size={24}
          />
        </TouchableOpacity>
        <Text style={{ color: '#E1E1E6', fontSize: 20, fontWeight: 'bold' }}>
          {title}
        </Text>
      </Wrapper>
    </View>
  )
}

export default Header