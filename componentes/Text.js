import React from 'react'
import { Text } from 'react-native'

export default function MyText({children, style}) {
  return (
    <Text style={style}>
      {children}
    </Text>
  )
}