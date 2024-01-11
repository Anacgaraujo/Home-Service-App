import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';


import React from 'react'

export default function PageHeading({title}) {
    const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center'}}
        onPress={()=>navigation.goBack()}
        >
      <Ionicons name="arrow-back-outline" size={30} color="black" />
      <Text style={{fontSize:25, fontFamily:'outfit-regular'}} >{title}</Text>
      </TouchableOpacity>
    </View>
  )
}