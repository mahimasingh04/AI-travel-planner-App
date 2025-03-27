const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
//   const fs = require("node:fs");
//   const mime = require("mime-types");
  
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [
    ],
    responseMimeType: "application/json",
  };
  

   export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
        role: "user",
        parts: [
          {text: "Generate a travel plan for the location: New York,NY, USA  for 3 Days and 2 Night for Couple with a Moderate budget. The travel plan should include flight details with options, prices, and booking URLs. Provide hotel options with the hotel name, address, image URL, geo-coordinates, rating, and description. Include places to visit nearby with the place name, details, image URL, geo-coordinates, ticket pricing, and the time required to travel to each location. Create a daily itinerary with a plan for each day and the best times to visit each location. Provide the travel plan in JSON format."},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"tripDetails\": {\n    \"location\": \"New York, NY, USA\",\n    \"duration\": \"3 Days, 2 Nights\",\n    \"budget\": \"Moderate\",\n    \"travelers\": \"Couple\"\n  },\n  \"flights\": [\n    {\n      \"option\": 1,\n      \"departureAirport\": \"Your Departure Airport\",\n      \"arrivalAirport\": \"JFK (John F. Kennedy International Airport)\",\n      \"airline\": \"Example: Delta Airlines\",\n      \"priceEstimate\": \"$300 - $500 (round trip per person)\",\n      \"bookingUrl\": \"https://www.google.com/flights\",\n      \"notes\": \"Prices vary significantly depending on departure city and time of year. Check Google Flights, Kayak, or Expedia for best deals.\"\n    },\n    {\n      \"option\": 2,\n      \"departureAirport\": \"Your Departure Airport\",\n      \"arrivalAirport\": \"LGA (LaGuardia Airport)\",\n      \"airline\": \"Example: American Airlines\",\n      \"priceEstimate\": \"$320 - $520 (round trip per person)\",\n      \"bookingUrl\": \"https://www.google.com/flights\",\n      \"notes\": \"LaGuardia is closer to some parts of Manhattan, but check for convenient flight times and prices.\"\n    },\n        {\n      \"option\": 3,\n      \"departureAirport\": \"Your Departure Airport\",\n      \"arrivalAirport\": \"EWR (Newark Liberty International Airport)\",\n      \"airline\": \"Example: United Airlines\",\n      \"priceEstimate\": \"$280 - $480 (round trip per person)\",\n      \"bookingUrl\": \"https://www.google.com/flights\",\n      \"notes\": \"Newark is in New Jersey, factor in travel time to Manhattan.\"\n    }\n  ],\n  \"hotels\": [\n    {\n      \"name\": \"The Jane Hotel\",\n      \"address\": \"113 Jane Street, New York, NY 10014\",\n      \"imageURL\": \"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/f6/a8/2a/the-jane-hotel.jpg?w=700&h=-1&s=1\",\n      \"geoCoordinates\": {\n        \"latitude\": 40.7360,\n        \"longitude\": -74.0091\n      },\n      \"rating\": 4.0,\n      \"description\": \"Quirky, historic hotel in Greenwich Village with cabin-like rooms. Offers a unique and affordable stay. Close to the High Line and many restaurants.\",\n      \"priceEstimate\": \"$150 - $250 per night\",\n      \"bookingUrl\": \"https://www.thejanenyc.com/\"\n    },\n    {\n      \"name\": \"Hotel Boutique at Grand Central\",\n      \"address\": \"127 E 31st St, New York, NY 10016\",\n      \"imageURL\": \"https://pix6.agoda.net/hotelImages/143/143551/143551_16061618140044159196.jpg?ca=6&ce=1&s=1024x768\",\n      \"geoCoordinates\": {\n        \"latitude\": 40.7452,\n        \"longitude\": -73.9818\n      },\n      \"rating\": 4.2,\n      \"description\": \"Located near Grand Central Terminal, this boutique hotel offers comfortable rooms and a convenient location for exploring Midtown Manhattan.\",\n      \"priceEstimate\": \"$180 - $300 per night\",\n      \"bookingUrl\": \"https://www.hotelboutiquenyc.com/\"\n    },\n        {\n      \"name\": \"The Gallivant Times Square\",\n      \"address\": \"123 West 46th Street, New York, NY 10036\",\n      \"imageURL\": \"https://media-cdn.tripadvisor.com/media/photo-s/1c/d1/0d/18/the-gallivant-times-square.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 40.7584,\n        \"longitude\": -73.9857\n      },\n      \"rating\": 4.3,\n      \"description\": \"A stylish hotel in the heart of Times Square. Offers comfortable accommodation and easy access to Broadway shows and other attractions.\",\n      \"priceEstimate\": \"$200 - $350 per night\",\n      \"bookingUrl\": \"https://www.thegallivantnyc.com/\"\n    }\n  ],\n  \"nearbyAttractions\": [\n    {\n      \"name\": \"Statue of Liberty\",\n      \"details\": \"Iconic statue on Liberty Island. Requires a ferry ride.\",\n      \"imageURL\": \"https://www.nps.gov/stli/planyourvisit/images/SL_Exterior_From_Ground.jpg?maxwidth=1300&maxheight=1300&autorotate=false\",\n      \"geoCoordinates\": {\n        \"latitude\": 40.6892,\n        \"longitude\": -74.0445\n      },\n      \"ticketPricing\": \"$24.50 per person (ferry and pedestal access)\",\n      \"travelTimeFromHotel\": \"45-60 minutes (depending on hotel location and transportation)\",\n      \"website\": \"https://www.nps.gov/stli/index.htm\"\n    },\n    {\n      \"name\": \"Ellis Island\",\n      \"details\": \"Former immigration station. Located near the Statue of Liberty.\",\n      \"imageURL\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Ellis_Island_Immigration_Museum.jpg/1280px-Ellis_Island_Immigration_Museum.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 40.6986,\n        \"longitude\": -74.0397\n      },\n      \"ticketPricing\": \"Included with Statue of Liberty ferry ticket\",\n      \"travelTimeFromHotel\": \"45-60 minutes (depending on hotel location and transportation)\",\n       \"website\": \"https://www.nps.gov/elis/index.htm\"\n    },\n    {\n      \"name\": \"Central Park\",\n      \"details\": \"Large urban park in Manhattan. Great for walking, biking, and relaxing.\",\n      \"imageURL\": \"https://www.centralparknyc.org/assets/0/164/225/300/cpc_hero2.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 40.7850,\n        \"longitude\": -73.9683\n      },\n      \"ticketPricing\": \"Free\",\n      \"travelTimeFromHotel\": \"Varies depending on hotel location. Easily accessible by subway.\",\n       \"website\": \"https://www.centralparknyc.org/\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"title\": \"Arrival and Midtown Exploration\",\n      \"morning\": {\n        \"time\": \"9:00 AM\",\n        \"activity\": \"Arrive at airport, transfer to hotel, and check in.\",\n        \"notes\": \"Use a taxi, subway, or ride-sharing service to get to your hotel.\"\n      },\n      \"afternoon\": {\n        \"time\": \"12:00 PM\",\n        \"activity\": \"Lunch near Times Square.\",\n        \"notes\": \"Many affordable options are available around Times Square. Be aware of tourist traps.\"\n      },\n      \"afternoon2\": {\n        \"time\": \"1:30 PM\",\n        \"activity\": \"Visit Times Square and Rockefeller Center\",\n        \"notes\": \"Take photos, explore the area. Consider going to the Top of the Rock for views. Buy tickets in advance to save time: https://www.topoftherocknyc.com/ \"\n      },\n      \"evening\": {\n        \"time\": \"6:00 PM\",\n        \"activity\": \"Dinner in Midtown.\",\n        \"notes\": \"Explore options near your hotel or Rockefeller Center.\"\n      },\n      \"night\": {\n        \"time\": \"8:00 PM\",\n        \"activity\": \"See a Broadway show.\",\n        \"notes\": \"Book tickets in advance for best prices and availability: https://www.broadway.com/.\"\n      }\n    },\n    \"day2\": {\n      \"title\": \"Downtown History and Views\",\n      \"morning\": {\n        \"time\": \"9:00 AM\",\n        \"activity\": \"Take the subway to Battery Park.\",\n        \"notes\": \"Purchase a MetroCard for easy transportation.\"\n      },\n      \"morning2\": {\n        \"time\": \"9:30 AM\",\n        \"activity\": \"Take the ferry to the Statue of Liberty and Ellis Island.\",\n        \"notes\": \"Book tickets online in advance to avoid long lines. Arrive early.\"\n      },\n      \"afternoon\": {\n        \"time\": \"1:00 PM\",\n        \"activity\": \"Lunch near Battery Park.\",\n        \"notes\": \"Grab a quick and affordable bite before exploring further.\"\n      },\n      \"afternoon2\": {\n        \"time\": \"2:30 PM\",\n        \"activity\": \"Explore the Financial District and visit the 9/11 Memorial & Museum.\",\n        \"notes\": \"Allow ample time for the museum. Tickets recommended in advance: https://www.911memorial.org/\"\n      },\n      \"evening\": {\n        \"time\": \"6:00 PM\",\n        \"activity\": \"Dinner in the Financial District or Lower Manhattan.\",\n        \"notes\": \"Many restaurants cater to the business crowd, offering a variety of options.\"\n      },\n      \"night\": {\n        \"time\": \"8:00 PM\",\n        \"activity\": \"Walk across the Brooklyn Bridge.\",\n        \"notes\": \"Enjoy stunning city views at night. Start from the Manhattan side.\"\n      }\n    },\n    \"day3\": {\n      \"title\": \"Central Park and Departure\",\n      \"morning\": {\n        \"time\": \"9:00 AM\",\n        \"activity\": \"Explore Central Park.\",\n        \"notes\": \"Rent bikes, take a walk, or visit Strawberry Fields. \"\n      },\n      \"afternoon\": {\n        \"time\": \"12:00 PM\",\n        \"activity\": \"Lunch near Central Park.\",\n        \"notes\": \"Many cafes and restaurants are located around the park's perimeter.\"\n      },\n      \"afternoon2\": {\n        \"time\": \"1:30 PM\",\n        \"activity\": \"Visit a museum of your choice (e.g., Metropolitan Museum of Art, American Museum of Natural History).\",\n        \"notes\": \"Choose a museum that interests you both. Allocate at least 2-3 hours.\"\n      },\n      \"evening\": {\n        \"time\": \"4:00 PM\",\n        \"activity\": \"Head to the airport for your departure.\",\n        \"notes\": \"Allow ample time for travel and security checks.\"\n      }\n    }\n  },\n  \"notes\": \"This is a sample itinerary and can be customized to your interests and preferences. Purchase a MetroCard for easy and affordable transportation. Book flights, hotels, and popular attractions in advance, especially during peak season. Be aware of your surroundings and take necessary safety precautions.\"\n}\n```"},
        ],
      },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // // TODO: Following code needs to be updated for client-side apps.
    // const candidates = result.response.candidates;
    // for(let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
    //   for(let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
    //     const part = candidates[candidate_index].content.parts[part_index];
    //     if(part.inlineData) {
    //       try {
    //         const filename = `output_${candidate_index}_${part_index}.${mime.extension(part.inlineData.mimeType)}`;
    //         fs.writeFileSync(filename, Buffer.from(part.inlineData.data, 'base64'));
    //         console.log(`Output written to: ${filename}`);
    //       } catch (err) {
    //         console.error(err);
    //       }
    //     }
    //   }
    // }
    // console.log(result.response.text());
 