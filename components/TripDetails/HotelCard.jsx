import { StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";

export default function HotelCard({ item }) {
  // const [photoRef,setPhotoRef]=useState();
  // useEffect(()=>{
  //     GetGooglePhotoRef();
  // },[])

  // const GetGooglePhotoRef=async()=>{
  //     const result =await GetGooglePhotoRef(item.hotelName);
  //     setPhotoRef(result);
  //   }

  const [placeImage, setPlaceImage] = useState(null);

  const formatData = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Error parsing tripData:", error);
      return null;
    }
  };

  const tripData = formatData(item?.tripData);
  const placeName = tripData?.locationInfo?.name || "Famous Place";

  useEffect(() => {
    const UNSPLASH_ACCESS_KEY = "kf7zsIHZ3HjK9ZYmDJnemoThO_URLMLer_deTCmi3cE"; // Replace with your API key

    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            item.name + " hotel"
          )}&client_id=${UNSPLASH_ACCESS_KEY}`
        );
        const data = await response.json();

        if (data.results.length > 0) {
          setPlaceImage(data.results[0].urls.small);
        } else {
          console.warn(`No images found for: ${item.name}`);
        }
      } catch (error) {
        console.error("Error fetching place image:", error);
      }
    };

    fetchImage();
  }, [placeName]);

  return (
    <View style={{ marginRight: 20, width: 180 }}>
      <Image
        source={
          placeImage
            ? { uri: placeImage }
            : require("../../assets/images/travel.jpg")
        }
        style={styles.image}
      />

      <View>
        <Text style={styles.hotelName}>{item.name}</Text>
        <View style={styles.flexContainer}>
          <Text style={{ fontFamily: "Outfit" }}>🌟 {item.rating}</Text>
          <Text style={{ fontFamily: "Outfit" }}>💰 {item.priceEstimate || item.price}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontFamily: "Outfit-Bold",
    fontSize: 20,
    marginBottom: 10,
  },
  hotelItem: {
    marginTop: 8,
  },
  hotelName: {
    fontFamily: "Outfit-Medium",
    fontSize: 17,
  },
  hotelAddress: {
    fontFamily: "Outfit-Light",
    fontSize: 14,
    color: "#777",
  },
  image: {
    width: 180,
    height: 120,
    borderRadius: 15,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 5,
  },
});
