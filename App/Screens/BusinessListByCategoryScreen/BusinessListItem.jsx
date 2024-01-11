import { View, Text, Image,StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function BusinessListItem({business, booking}) {
  const navigation=useNavigation()
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.push('business-detail', { business: business })}
    >
      <Image source={{uri:business?.images[0]?.url}} style={styles.image} />
      <View style={styles.subcontainer}>
        <Text style={{fontFamily: 'outfit-regular', color:Colors.GRAY, fontSize: 15}}>{business.contactPerson}</Text>
        <Text  style={{fontFamily: 'outfit-medium', fontSize: 18}}>{business.name}</Text>
        <Text style={{fontFamily: 'outfit-regular', color:Colors.GRAY, fontSize:16}}>
        <Ionicons name="location-sharp" size={20} color={Colors.PRIMARY} /> {business.address}
        </Text>

        {booking?<Text>{business.bookingStatus}</Text>:null}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    subcontainer:{
        display: 'flex',
        gap: 8
    },
    image:{
        width: 100,
        height:100,
        borderRadius: 15
    }

})