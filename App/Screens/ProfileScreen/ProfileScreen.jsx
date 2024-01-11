import { View, Text, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import Colors from "../../Utils/Colors";
import { FlatList } from "react-native-gesture-handler";

export default function ProfileScreen() {
  const { user } = useUser();

  const profileMenu = [
    { id: 1, name: "Home", icon: "home" },
    { id: 2, name: "My Booking", icon: "bookmark-sharp" },
    { id: 3, name: "Logout", icon: "log-out" },
  ];
  return (
    <View style={{ margin: 20, marginTop: 30 }}>
      <View style={{ backgroundColor: Colors.PRIMARY }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
            color: Colors.WHITE,
            padding: 10,
          }}
        >
          Profile
        </Text>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Image
            source={{ uri: user.imageUrl }}
            style={{ width: 70, height: 70, borderRadius: 99 }}
          />
          <Text
            style={{
              fontSize: 26,
              marginHorizontal: 8,
              fontFamily: "outfit-medium",
              color: Colors.WHITE,
            }}
          >
            {user.fullName}
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginHorizontal: 8,
              fontFamily: "outfit-medium",
              color: Colors.WHITE,
            }}
          >
            {user.primaryEmailAddress.emailAddress}
          </Text>
        </View>
        <View></View>
      </View>
      <View style={{ backgroundColor: Colors.WHITE }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <Ionicons name="home" size={24} color={Colors.PRIMARY} />
          <Text style={{ color: Colors.PRIMARY }}>Home</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <Ionicons
            name="alert-circle-outline"
            size={24}
            color={Colors.PRIMARY}
          />
          <Text style={{ color: Colors.PRIMARY }}>Logout</Text>
        </View>
      </View>
    </View>
  );
}
