import { Dimensions, TouchableOpacity } from "react-native"
import styled from "styled-components"

const HEIGHT = Dimensions.get('window').height

const LoginButton = styled(TouchableOpacity)`
  position: absolute;
  bottom: ${HEIGHT / 2}px;
  height: 56px;
  right: 0;
  left: 0;
  marginHorizontal: 40px;
  backgroundColor: #00B37E;
  borderRadius: 10px;
  alignItems: center;
  justifyContent: center;
`
export default LoginButton