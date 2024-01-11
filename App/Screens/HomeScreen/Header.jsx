import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Colors from '../../Utils/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function Header() {
    const {user, isloading} = useUser();
  return user&&(
    <View style={styles.container}>
        {/* Profile Section */}
        <View style={styles.profilemainconatiner}>
      <View style={styles.profileContainer}>
        <Image source={{uri:user?.imageUrl}} style={styles.userImage} />
        <View>
            <Text style={{color:Colors.WHITE, fontFamily:'outfit-regular'}} >Welcome</Text>
            <Text style={{color:Colors.WHITE, fontSize:20, fontFamily:'outfit-medium'}}>{user?.fullName}</Text>
        </View>

        </View>
        <FontAwesome name="bookmark-o" size={24} color="white"/>
        </View>
        {/* SearchBar Section */}
        <View style={styles.searchBarContainer}>
            <TextInput placeholder='Search' style={styles.textInput} />
            <FontAwesome name="search" size={24} color={Colors.PRIMARY} style={styles.searchbtn}/>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding: 20,
        paddingTop: 40,
        backgroundColor:Colors.PRIMARY,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
    userImage:{
        width: 45,
        height: 45,
        borderRadius: 99
    },
    profilemainconatiner:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: "space-between"
    },
    profileContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    textInput:{
        padding: 7,
        paddingHorizontal: 16,
        backgroundColor:Colors.WHITE,
        width: '85%',
        borderRadius: 8,
        fontSize: 16,
        fontFamily:'outfit-regular'
    },
    searchBarContainer:{
       marginTop: 15,
       display: 'flex',
       flexDirection: 'row',
       gap: 10,
       marginBottom: 10
    },
    searchbtn:{
        backgroundColor: Colors.WHITE,
        padding: 10,
        borderRadius: 8
    }
})