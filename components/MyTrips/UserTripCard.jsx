import { StyleSheet, Text, View, Image } from 'react-native';
import moment from 'moment';
import { Colors } from './../../constants/Colors';

const UserTripCard = ({ trip }) => {
  const formatData = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error parsing data:', error);
      return null;
    }
  };

 
  const tripData = formatData(trip?.tripData);
  const lat = latestTrip?.locationInfo?.coordinate?.lat;
  const lon = latestTrip?.locationInfo?.coordinate?.lon;
  
  const imageUrl = lat && lon 
    ? `https://static-maps.yandex.ru/1.x/?ll=${lon},${lat}&size=450,450&z=12&l=map`
    : null;

  return (
    <View style={styles.flexContainer}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <Image 
          source={require('./../../assets/images/travel.jpg')} 
          style={styles.image} 
        />
      )}
      <View style={{marginLeft:10}}>
        <Text style={styles.paragraph}>
          {trip?.tripPlan?.travel_plan?.destination}
        </Text>
        <Text style={styles.smallPara}>
          {moment(tripData?.startDate).format("DD MMM YYYY")}
        </Text>
        <Text style={styles.smallPara}>
          Travelling: {tripData?.traveler?.title}
        </Text>
      </View>
    </View>
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
