import { StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { useEffect, useContext, useState } from 'react';
import { Colors } from './../../constants/Colors';
import { CreateTripContext } from './../../context/CreateTripContext';

export default function SearchPlace() {
  const navigation = useNavigation();
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Search',
    });
  }, [navigation]);

  useEffect(() => {
    console.log("tripData", tripData);
  }, [tripData]);

  // Fetch location suggestions from OpenStreetMap (Nominatim API)
  let debounceTimeout;

const fetchSuggestions = async (query) => {
  if (!query || query.trim().length < 3) {
    setSuggestions([]);
    return;
  }

  // Debounce API calls (clears previous timeout)
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching location suggestions:', error.message);
    }
  }, 500); // Waits 500ms before making the API request
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Your Destination</Text>

      {/* Location Search Input */}
      <TextInput
        style={styles.input}
        placeholder="Search Place"
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          fetchSuggestions(text);
        }}
      />

      {/* Display Search Suggestions */}
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.place_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => {
                setTripData({
                  ...tripData,
                  locationInfo: {
                    name: item.display_name,
                    coordinate: {
                      lat: item.lat,
                      lon: item.lon,
                    },
                    photoRef: null, // No images available in Nominatim API
                    url: `https://www.openstreetmap.org/?mlat=${item.lat}&mlon=${item.lon}&zoom=12`
                  },
                });
                router.push('./select-traveler');
              }}
            >
              <Text>{item.display_name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    paddingTop: 85,
    padding: 25,
    height: '100%',
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    fontSize: 16,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
