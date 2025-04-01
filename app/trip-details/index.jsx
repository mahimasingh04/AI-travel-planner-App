import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { useEffect, useState, useMemo } from "react";
import { Colors } from '../../constants/Colors';
import moment from 'moment';
import FlightInfo from '../../components/TripDetails/FlightInfo';
import HotelList from '../../components/TripDetails/HotelList';
import PlannedTrip from '../../components/TripDetails/PlannedTrip';

const Index = () => {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();
  
  // Ensure trip is parsed once using useMemo
  const tripDetails = useMemo(() => {
    if (!trip) return null;
    try {
      return JSON.parse(trip);
    } catch (error) {
      console.error('Error parsing trip data:', error);
      return null;
    }
  }, [trip]);

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, [navigation]);

  if (!tripDetails) return null;

  const tripData = useMemo(() => {
    try {
      return tripDetails?.tripData ? JSON.parse(tripDetails.tripData) : {};
    } catch (error) {
      console.error('Error parsing tripData:', error);
      return {};
    }
  }, [tripDetails]);

  const placeName = tripData?.locationInfo?.name || "Famous Place";

  // Fetch place image from Unsplash
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(placeName)}&client_id=kf7zsIHZ3HjK9ZYmDJnemoThO_URLMLer_deTCmi3cE`
        );
        const data = await response.json();
        if (data.results.length > 0) {
          setImageUrl(data.results[0].urls.small);
        }
      } catch (error) {
        console.error("Error fetching place image:", error);
      }
    };

    fetchImage();
  }, [placeName]);

  const flights = tripDetails?.tripPlan?.trip?.flights || [];
  const hotels = tripDetails?.tripPlan?.trip?.hotels || [];
  const tripDailyPlan = tripDetails?.tripPlan?.trip?.itinerary || [];

  return (
    <ScrollView>
      <Image 
        source={imageUrl ? { uri: imageUrl } : require('./../../assets/images/travel.jpg')}
        style={styles.image} 
      />
      <View style={styles.container}>
        <Text style={styles.title}>
          {tripData?.locationInfo?.name || "Unknown Destination"}
        </Text>
        <View style={styles.flexBox}>
          <Text style={styles.smallPara}>
            {tripData?.startDate ? moment(tripData.startDate).format("DD MMM YYYY") : "Start Date"}
          </Text>
          <Text style={styles.smallPara}>
            - {tripData?.endDate ? moment(tripData.endDate).format("DD MMM YYYY") : "End Date"}
          </Text>
        </View>
        <Text style={styles.smallPara}>
          🚌 {tripData?.traveler?.title || "Traveler Info"}
        </Text>

        {/* Flight Info */}
        <FlightInfo flightData={tripDetails?.tripPlan?.flights} />
        {/* Hotel List */}
        <HotelList hotelList={tripDetails?.tripPlan?.hotels} />
        {/* Trip Daily Plan */}
        <PlannedTrip details={tripDetails?.tripPlan?.itinerary} />
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 330,
  },
  container: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    height: '100%',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 25,
  },
  smallPara: {
    fontFamily: 'Outfit',
    fontSize: 18,
    color: Colors.gray,
  },
  flexBox: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 5,
  },
});
