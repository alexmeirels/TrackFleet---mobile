import { TouchableOpacity, View } from "react-native"
import styled from "styled-components"

export const UserHeader = styled(View)`
  background-color: #29292E;
  height: 128px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`

export const LogoutButton = styled(TouchableOpacity)`
  height: 32px;
  width: 32px;
  justify-content: center;
  align-items: center;
  padding-right: 32px;
`

export const Perfil = styled(View)`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const ColumnText = styled(View)`
  flex-direction: column;
  padding-left: 12px;
`
