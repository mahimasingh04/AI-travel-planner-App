import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { Colors } from './../../constants/Colors';
import UserTripCard from './UserTripCard';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';

const UserTripList = ({ userTrips }) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(null);

  if (!userTrips || userTrips.length === 0) {
    return <Text style={styles.noTrips}>No trips available.</Text>;
  }

  // Parse the latest trip data
  let latestTrip;
  try {
    latestTrip = JSON.parse(userTrips[0].tripData);
  } catch (error) {
    console.error("Error parsing tripData:", error);
    return <Text style={styles.noTrips}>Error loading trip data.</Text>;
  }

  const placeName = latestTrip?.locationInfo?.name || "Famous Place";

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

  return (
    <View>
      <View style={{ marginTop: 20 }}>
        <Image 
          source={imageUrl ? { uri: imageUrl } : require('./../../assets/images/travel.jpg')}
          style={styles.image} 
        />
        <View style={{ marginTop: 10 }}>
          <Text style={styles.paragraph}>{placeName}</Text>
          <View style={styles.flexContainer}>
            <Text style={styles.smallPara}>
              {latestTrip?.startDate ? moment(latestTrip.startDate).format("DD MMM YYYY") : "No Date"}
            </Text>
            <Text style={styles.smallPara}> 🚌 {latestTrip.traveler?.title || "N/A"}</Text>
          </View>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.push({ pathname: '../trip-details', params: { trip: JSON.stringify(userTrips[0]) } })}
          >
            <Text style={styles.buttonText}>See Your Plan</Text>
          </TouchableOpacity>
        </View>
        {userTrips.map((trip, index) => <UserTripCard trip={trip} key={index} />)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  paragraph: {
    fontFamily: 'Outfit-Medium',
    fontSize: 20,
  },
  smallPara: {
    fontFamily: 'Outfit',
    fontSize: 17,
    color: Colors.GRAY,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginTop: 15,
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.WHITE,
    fontFamily: 'Outfit-Medium',
    fontSize: 15,
  },
  noTrips: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.GRAY,
    marginTop: 20,
  },
});

export default UserTripList;
