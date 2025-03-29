import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react';
import HotelCard from './HotelCard';

const HotelList = ({ hotelList }) => {


  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏨 Hotel Recommendation</Text>
      <FlatList style={styles.hotelItem}
        data={hotelList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <HotelCard item ={item}/>
        )}
      />
    </View>
  )
}

export default HotelList

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

