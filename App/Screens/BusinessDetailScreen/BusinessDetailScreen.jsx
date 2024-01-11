import { View, Text, Image, StyleSheet, ScrollView, Modal, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../Utils/Colors";
import BusinessPhotos from "./BusinessPhotos";
import BusinessAboutMe from "./BusinessAboutMe";
import BookingModel from "./BookingModel";

export default function BusinessDetailScreen() {
  const param = useRoute().params;
  const [business, setBusiness] = useState(param.business);
  const navigation = useNavigation();
  const [isReadMore, setIsReadMore] = useState(false);
  const [showModel, setShowModel] = useState(false);

  // useEffect(()=>{
  //     // console.log(param?.business)
  // },[])

  const onMessageBtnClock=()=>{
    Linking.openURL('mailto:'+business?.email+"?subject=Service Request");
  }

  return (
    business && (
      <View>
        <ScrollView style={{ height: "90%" }}>
          <View>
            <View style={styles.backBottomContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-outline" size={30} color="white" />
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: business?.images[0]?.url }}
              style={{ width: "100%", height: 300 }}
            />
            <View style={styles.infocontainer}>
              <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
                {business?.name}
              </Text>
              <View style={styles.subContainer}>
                <Text
                  style={{
                    fontFamily: "outfit-regular",
                    fontSize: 20,
                    color: Colors.PRIMARY,
                  }}
                >
                  {business?.contactPerson} ⭐
                </Text>
                <Text
                  style={{
                    fontFamily: "outfit-regular",
                    fontColor: Colors.PRIMARY,
                    backgroundColor: Colors.PRIMARY_LIGHT,
                    padding: 3,
                    borderRadius: 5,
                    fontSize: 14,
                  }}
                >
                  {business?.category.name}
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "outfit-regular",
                  fontColor:Colors.GRAY,
                  fontSize: 17,
                }}
              >
                <Ionicons
                  name="location-sharp"
                  size={25}
                  color={Colors.PRIMARY}
                />
                {business.address}
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Colors.GRAY,
                  marginBottom: 20,
                  marginTop: 20,
                }}
              ></View>
              <BusinessAboutMe business={business} />
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Colors.GRAY,
                  marginBottom: 20,
                  marginTop: 20,
                }}
              ></View>

              <BusinessPhotos business={business} />
            </View>
          </View>
        </ScrollView>
        <View
          style={{ display: "flex", flexDirection: "row", gap: 8, margin: 8 }}
        >
          <View style={styles.messagebtn}>
            <TouchableOpacity onPress={()=>onMessageBtnClock()} >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "outfit-medium",
                  color: Colors.PRIMARY,
                  fontSize: 18,
                }}
              >
                Message
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bookingbtn}>
            <TouchableOpacity onPress={()=>setShowModel(true)} >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "outfit-medium",
                  color: Colors.WHITE,
                  fontSize: 18,
                }}
              >
                Book Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Booking Screen Modal */}
        <Modal animationType="slide" visible={showModel}>
          <BookingModel businessId={business.id} hideModal={()=>setShowModel(false)} />
        </Modal>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  backBottomContainer: {
    position: "absolute",
    zIndex: 100,
    padding: 20,
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  infocontainer: {
    display: "flex",
    padding: 20,
    gap: 7,
  },
  messagebtn: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    flex: 1,
  },
  bookingbtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderWidth: 1,
    borderColor: Colors.WHITE,
    borderRadius: 99,
    flex: 1,
  },
});
