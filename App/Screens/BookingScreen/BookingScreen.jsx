import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageHeading from '../../Components/Heading'
import GlobalApi from '../../Utils/GlobalApi'
import {useUser} from '@clerk/clerk-expo'
import { FlatList } from 'react-native-gesture-handler'
import BusinessListItem from '../BusinessListByCategoryScreen/BusinessListItem'
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function BookingScreen() {

  const [bookingList, setBookingList] = useState([])
  const [loading, setLoading] = useState(false)

  const {user}=useUser();

  useEffect(() => {
    user&&getUserBookings()
  },[user])

  const getUserBookings=()=>{
    setLoading(true)
    GlobalApi.getUserBookings(user.primaryEmailAddress.emailAddress).then(resp =>{
      console.log(resp)
      setBookingList(resp.bookings)
      setLoading(false)

    })
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={{padding:30}}>
      <Text style={{fontFamily: 'outfit-medium', fontSize:26}} >My Bookings</Text>
      <View>
        <FlatList
        onRefresh={()=>getUserBookings()}
        refreshing={ loading}
        data={bookingList}
        renderItem={({item,index})=>(
          <BusinessListItem booking={item} business={item?.businessList} />
        )}
        />

      </View>
    </View>
    </GestureHandlerRootView>
  )
}