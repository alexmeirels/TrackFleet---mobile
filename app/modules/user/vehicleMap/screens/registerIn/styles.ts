import { View } from "react-native";
import styled from "styled-components"

export const BoxIcon = styled(View)`
  height: 46px;
  width: 46px;
  justify-content: center;
  align-items: center;
  margin-left: 32px;
  border-radius: 6px;
  background-color: #29292E;
`

export const VerticalLine = styled(View)`
  height: 60px;
  width: 0px;
  border-width: 1px;
  margin-left: 55px;
  border-color: #7C7C8A;
`
export const FormatText = styled(View)`
  flex-direction: row;
  padding-left: 12px;
  padding-right: 22px;
  flex-wrap: wrap;
  flex: 1;
`

export const InfoVehicle = styled(View)`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const FormatTextColumn = styled(View)`
  flex-direction: column;
  padding-left: 32px;
  padding-top: 24px;
`