import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from './../../constants/Colors';
import { useRouter } from "expo-router";


export default function StartNewTripCard() {

    const router= useRouter();
  return (
    <View style={{
        padding:20,
        marginTop:50,
        display:'flex',
        alignItems:'center',
        gap:25
    }}>
      <Ionicons name="location-sharp" size={30} color="black" />
      <Text style={{
        fontSize:25,
        fontFamily:'outfit-medium'
      }}>
        No trip planned yet
      </Text>
      <Text style={{
        fontSize:20,
        fontFamily:'outfit',
        textAlign:'center',
        color:Colors.GRAY
      }}>
        Looks like its time to plan a new travel experinece! Get Started below
      </Text>
      <TouchableOpacity
      onPress={()=>router.push('../create-trip/search-place')}
      style={{
        padding:10,
        backgroundColor:Colors.PRIMARY,
        borderRadius:15,
        paddingHorizontal:30
      }}>
        <Text
        style={{
            fontFamily:'outfit-medium',
            color:Colors.WHITE,
            fontSize:17
        }}>Start a new trip</Text>
      </TouchableOpacity>
    </View>
  )
}