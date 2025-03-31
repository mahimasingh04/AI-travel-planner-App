import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const categories = [
  { id: '1', name: 'Beaches', icon: 'umbrella-outline' },
  { id: '2', name: 'Mountains', icon: 'leaf-outline' },
  { id: '3', name: 'Cities', icon: 'business-outline' },
  { id: '4', name: 'Historical', icon: 'time-outline' },
];

const destinations = [
  { id: '1', name: 'Bali, Indonesia', image: 'https://source.unsplash.com/400x300/?bali', location: 'Asia' },
  { id: '2', name: 'Swiss Alps, Switzerland', image: 'https://source.unsplash.com/400x300/?switzerland', location: 'Europe' },
  { id: '3', name: 'Paris, France', image: 'https://source.unsplash.com/400x300/?paris', location: 'Europe' },
  { id: '4', name: 'Great Wall, China', image: 'https://source.unsplash.com/400x300/?china', location: 'Asia' },
  { id: '5', name: 'Manali, India', image: 'https://source.unsplash.com/400x300/?manali', location: 'Asia' },
  { id: '6', name: 'New York, USA', image: 'https://source.unsplash.com/400x300/?newyork', location: 'North America' },
  { id: '7', name: 'Los Angeles, USA', image: 'https://source.unsplash.com/400x300/?losangeles', location: 'North America' },
  { id: '8', name: 'Shimla, India', image: 'https://source.unsplash.com/400x300/?shimla', location: 'Asia' },
];

export default function Discover() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState('');
  const [recommendedPlaces, setRecommendedPlaces] = useState([]);

  const filteredDestinations = destinations.filter((destination) =>
    destination.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchRecommendedPlaces();
  }, []);

  const fetchRecommendedPlaces = async () => {
    try {
      const response = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          query: 'travel',
          count: 8,
          client_id: 'kf7zsIHZ3HjK9ZYmDJnemoThO_URLMLer_deTCmi3cE',
        },
      });
      setRecommendedPlaces(response.data);
    } catch (error) {
      console.error('Error fetching recommended places:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={24} color="gray" />
        <TextInput
          placeholder="Search destinations..."
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Category Selection */}
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === item.name && styles.categoryButtonSelected,
            ]}
            onPress={() => setSelectedCategory(item.name)}
          >
            <Ionicons name={item.icon} size={24} color={selectedCategory === item.name ? '#fff' : 'black'} />
            <Text style={[styles.categoryText, selectedCategory === item.name && styles.categoryTextSelected]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Search Results */}
      {search.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Search Results</Text>
          {filteredDestinations.length > 0 ? (
            <FlatList
              data={filteredDestinations}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.destinationList}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.destinationCard}>
                  <Image source={{ uri: item.image }} style={styles.destinationImage} />
                  <Text style={styles.destinationText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text style={styles.noResults}>No results found</Text>
          )}
        </>
      )}

      {/* Recommended Places - Vertical List */}
      <Text style={styles.sectionTitle}>Recommended for You</Text>
      <FlatList
        data={recommendedPlaces}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.verticalList}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.destinationCardVertical}>
            <Image source={{ uri: item.urls?.small }} style={styles.destinationImageVertical} />
            <Text style={styles.destinationText}>{item.alt_description || 'Beautiful Place'}</Text>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f0f0f0', 
    borderRadius: 10, 
    paddingHorizontal: 15, 
    paddingVertical: 10, 
    marginBottom: 20 
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryButtonSelected: {
    backgroundColor: 'blue',
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryTextSelected: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  destinationList: {
    paddingBottom: 20,
  },
  verticalList: {
    paddingBottom: 20,
  },
  destinationCardVertical: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
  },
  destinationImageVertical: {
    width: '100%',
    height: 200,
  },
  destinationText: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
});
