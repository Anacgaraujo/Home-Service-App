import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Heading from "../../Components/Heading";
import Colors from "../../Utils/Colors";

export default function BusinessAboutMe({ business }) {
    const [isReadMore, setIsReadMore] = useState(false);

    return business && (
        <View>
            <Heading text={"About"} />
            <Text
                style={{
                    fontFamily: "outfit-regular",
                    color: Colors.GRAY,
                    fontSize: 17,
                    lineHeight: 28,
                }}
                numberOfLines={isReadMore ? 20 : 5}
            >
                {business.about}
            </Text>
            <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)}>
                <Text
                    style={{
                        fontFamily: "outfit-regular",
                        color: Colors.PRIMARY,
                        fontSize: 17,
                    }}
                >
                    {isReadMore ? 'Read Less' : 'Read More'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
