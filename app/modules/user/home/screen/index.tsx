import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { ColumnText, LogoutButton, Perfil, UserHeader } from './styles'
import Icon from '@/app/components/Icon'
import Card from '@/app/components/Card'
import HistoryItem from '@/app/components/History-Item'
import { HomeScreenProps } from '../types'
import formattedDate from '@/app/utils/formattedData'

const HomeScreen: React.FC<HomeScreenProps> = ({ navigateToRegisterOut, navigateToRegisterIn, user, logout, listRecords }) => (
  <View style={{ flex: 1, backgroundColor: '#202024' }}>
    <UserHeader>
      <Perfil>
        <Icon
          size={54}
          name='men'
          style={{ borderRadius: 8, marginLeft: 32 }}
        />
        <ColumnText>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '400' }}>
            {`Olá,`}
          </Text>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', paddingTop: 4 }}>
            {user?.name}
          </Text>
        </ColumnText>
      </Perfil>
      <LogoutButton onPress={() => logout()}>
        <Icon
          size={32}
          name='logout'
          style={{ marginRight: 32 }}
        />
      </LogoutButton>
    </UserHeader>
    <TouchableOpacity onPress={() => listRecords?.length === 0 || listRecords?.[listRecords?.length - 1].arrival ? navigateToRegisterOut() : navigateToRegisterIn(listRecords?.[listRecords?.length - 1]?.vehicle?.id)}>
      <Card
        iconName={'car'}
        description={listRecords?.length === 0 || listRecords?.[listRecords?.length - 1].arrival ? 'Nenhum veículo em uso. ' :
          `Veículo ${listRecords?.[listRecords?.length - 1]?.vehicle?.plate} em uso.`

        }
        descriptionStyle={{ color: 'white', fontSize: 14, fontWeight: 'regular' }}
        link='Clique aqui para registrar a chegada'
        linkStyle={{ color: '#00B37E', fontSize: 14, fontWeight: 'bold' }}
        style={{ paddingHorizontal: 32, paddingTop: 32 }}
      />
    </TouchableOpacity>
    <Text style={{ color: '#E1E1E6', fontSize: 16, fontWeight: 'bold', paddingLeft: 32, paddingTop: 26, paddingBottom: 24 }}>
      {`Histórico`}
    </Text>
    {listRecords?.length === 0 ?
      (<View style={{ flex: 1, alignItems: 'center', paddingTop: 32 }}>
        <Text style={{ color: '#C4C4CC', fontSize: 16, fontWeight: '400' }}>
          {`Não possue Histórico`}
        </Text>
      </View>) :
      <FlatList
        data={listRecords}
        style={{ paddingHorizontal: 32 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return <TouchableOpacity onPress={() => {
            navigateToRegisterIn(item.vehicle.id, item?.arrival)
          }}>
            <HistoryItem
              plate={item?.vehicle.plate}
              date={formattedDate(item?.timestamp)}
              iconName={item?.arrival == null ? 'history' : 'check'}
              style={{ marginBottom: 16 }}
            />
          </TouchableOpacity>
        }}
      />
    }
  </View >
)

export default HomeScreen