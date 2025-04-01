import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';

// Define how each activity should be rendered
const renderActivity = ({ item }) => (
  <View style={styles.activity}>
    <Text style={styles.activityTitle}>{item.activity}</Text>
    <Text>⏰ Time: {item.time}</Text>
    <Text>ℹ️ Notes: {item.notes || "No additional details available"}</Text>
  </View>
);

const PlannedTrip = ({ details }) => {
  console.log("Details from plan trip", details);

  // Sort the days numerically (e.g., 'Day 1', 'Day 2', 'Day 3')
  const sortedDays = Object.entries(details).sort((a, b) => {
    const dayA = parseInt(a[0].split(' ')[1]); // Extracts the number from 'Day X'
    const dayB = parseInt(b[0].split(' ')[1]);
    return dayA - dayB;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏕️ Plan Details</Text>

      {/* Iterate over the sorted days */}
      {sortedDays.map(([day, dayDetails], index) => (
        <View key={index} style={styles.dayContainer}>
          <Text style={styles.dayTitle}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>

          {/* Sort and iterate over each time slot in the day */}
          {Object.entries(dayDetails)
            .filter(([timeSlot]) => timeSlot !== 'title') // Skip 'title' if present
            .sort(([timeSlotA], [timeSlotB]) => {
              const times = ['morning', 'afternoon', 'evening', 'night'];
              return times.indexOf(timeSlotA) - times.indexOf(timeSlotB); // Sorting based on the times
            })
            .map(([timeSlot, activityDetails], timeIndex) => (
              <FlatList
                key={timeIndex}
                data={[activityDetails]}  // Pass the current time slot's activities
                renderItem={renderActivity}
                keyExtractor={(item, idx) => `${day}-${timeSlot}-${idx}`}
              />
            ))}
        </View>
      ))}
    </View>
  );
};

export default PlannedTrip;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  dayContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  activity: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#eaeaea',
    borderRadius: 8,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
});
