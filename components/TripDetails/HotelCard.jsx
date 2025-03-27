import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

export default function HotelCard({item}) {

    const [photoRef,setPhotoRef]=useState();
    useEffect(()=>{
        GetGooglePhotoRef();
    },[])

    const GetGooglePhotoRef=async()=>{
        const result =await GetGooglePhotoRef(item.hotelName);
        setPhotoRef(result);
      }

  return (
    <View style={{marginRight:20,width:180}}>
                <Image 
                source={{uri:'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='
                +photoRef
                +'&key='+ process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY}} 
                style={styles.image} 
                />
                <View>
                    <Text style={styles.hotelName}>{item.name}</Text>
                    <View style={styles.flexContainer}>
                        <Text style={{fontFamily:'Outfit'}}>🌟 {item.rating}</Text>
                        <Text style={{fontFamily:'Outfit'}}>💰 {item.price}</Text>
                    </View> 
                </View>
              </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
    marginBottom: 10,
  },
  hotelItem: {
    marginTop:8
  },
  hotelName: {
    fontFamily: 'Outfit-Medium',
    fontSize: 17,
  },
  hotelAddress: {
    fontFamily: 'Outfit-Light',
    fontSize: 14,
    color: '#777',
  },
  image:{
    width:180,
    height:120,
    borderRadius:15
  },
  flexContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    gap:5
  }
})

