import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import PageHeading from "../../Components/PageHeading";
import { Ionicons } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import Colors from "../../Utils/Colors";
import Heading from "../../Components/Heading";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import GlobalApi from "../../Utils/GlobalApi";
import { useUser } from "@clerk/clerk-expo";

export default function BookingModel({ businessId, hideModal }) {
  const [selectedTime, setSelectedTime] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [note, setnote] = useState();
  const {user}=useUser();

  const [timeList, setTimeList] = useState();
  useEffect(() => {
    getTime();
  }, []);
  const getTime = () => {
    const timeList = [];
    for (let i = 8; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 7; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }
    setTimeList(timeList);
  };

//   Create Booking Method

const createNewBooking=()=>{
    if(!selectedTime||!selectedDate){
        ToastAndroid.show('Please Select Date and Time', ToastAndroid.LONG)

        return;
    }
    const data={
        userName:user?.fullName,
        userEmail:user?.primaryEmailAddress.emailAddress,
        time: selectedTime,
        date: selectedDate,
        businessId:businessId
    }
    GlobalApi.createBooking(data).then(resp=>{
        console.log("Resp", resp)
        ToastAndroid.show('Booking Create Successfully', ToastAndroid.LONG)
        hideModal()
    })
}

  return (
    <ScrollView>
    <KeyboardAvoidingView style={{ padding: 40 }}>
      <View>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginBottom: 20,
          }}
          onPress={() => hideModal()}
        >
          <Ionicons name="arrow-back-outline" size={30} color="black" />
          <Text style={{ fontSize: 25, fontFamily: "outfit-regular" }}>
            Booking
          </Text>
        </TouchableOpacity>
      </View>
      {/* Calendar */}
      <Heading text={"Select Date"} />
      <View style={styles.calendarContainer}>
        <CalendarPicker
          onDateChange={setSelectedDate}
          width={340}
          minDate={Date.now()}
          todayBackgroundColor={Colors.BLACK}
          todayTextStyle={{ color: Colors.WHITE }}
          selectedDayColor={Colors.PRIMARY}
          selectedDayTextColor={Colors.WHITE}
        />
      </View>
      {/* Time Select */}
      <View style={{ marginTop: 20 }}>
        <Heading text={"Select Time SLot"} />
        <FlatList
          data={timeList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => setSelectedTime(item.time)}
            >
              <Text
                style={[
                  selectedTime == item.time
                    ? styles.selectedTime
                    : styles.unselectedTime,
                ]}
              >
                {item.time}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* Note */}
      <View style={{ padding: 20 }}>
        <Heading text={"Note to vendor"} />
        <TextInput
          placeholder="Note"
          numberOfLines={6}
          multiline={true}
          style={styles.noteTextArea}
          onChange={(text) => setnote(text)}
        />
      </View>

      {/* Confirmation button */}
      <TouchableOpacity style={styles.confirmButtonContainer} onPress={()=>createNewBooking()} >
  <Text style={styles.confirmbtn}>Confirm & Book</Text>
</TouchableOpacity>
    </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    padding: 20,
    borderRadius: 15,
  },
  selectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 20,
    paddingHorizontal: 18,
    color: Colors.WHITE,
    backgroundColor: Colors.PRIMARY,
  },
  unselectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 20,
    paddingHorizontal: 18,
    color: Colors.PRIMARY,
  },
  noteTextArea: {
    borderWidth: 1,
    borderRadius: 15,
    textAlignVertical: "top",
    fontSize: 16,
    padding: 20,
    fontFamily: "outfit-regular",
    borderColor:Colors.PRIMARY
  },
  confirmButtonContainer: {
    marginTop: 15,
    borderRadius: 99, 
    elevation: 2,    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  confirmbtn: {
    fontSize: 17,
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    padding: 13,
  },
});
