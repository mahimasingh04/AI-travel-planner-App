import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { useRouter } from 'expo-router';
import { Colors } from './../../constants/Colors';

const UserTripCard = ({ trip }) => {
  const [placeImage, setPlaceImage] = useState(null);
  const router = useRouter();

  const formatData = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error parsing tripData:', error);
      return null;
    }
  };

  const tripData = formatData(trip?.tripData);
  const placeName = tripData?.locationInfo?.name || "Famous Place";

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(placeName)}&client_id=kf7zsIHZ3HjK9ZYmDJnemoThO_URLMLer_deTCmi3cE`
        );
        const data = await response.json();

        if (data && data.results && data.results.length > 0) {
          setPlaceImage(data.results[0].urls.small);
        } else {
          console.warn(`No images found for: ${placeName}`);
        }
      } catch (error) {
        console.error("Error fetching place image:", error);
      }
    };

    fetchImage();
  }, [placeName]);

  return (
    <TouchableOpacity 
      style={styles.flexContainer} 
      onPress={() => router.push({ pathname: '../trip-details', params: { trip: JSON.stringify(trip) } })}
    >
      <Image
        source={placeImage ? { uri: placeImage } : require('./../../assets/images/travel.jpg')}
        style={styles.image}
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.paragraph}>{placeName}</Text>
        <Text style={styles.smallPara}>
          {tripData?.startDate ? moment(tripData.startDate).format("DD MMM YYYY") : "No Date"}
        </Text>
        <Text style={styles.smallPara}>
          Travelling: {tripData?.traveler?.title || "N/A"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserTripCard;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  paragraph: {
    fontFamily: 'Outfit-Medium',
    fontSize: 18,
  },
  smallPara: {
    fontFamily: 'Outfit',
    fontSize: 14,
    color: Colors.GRAY,
  },
});
