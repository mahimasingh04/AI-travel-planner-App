import { StyleSheet, Text, View,TouchableOpacity, ToastAndroid } from 'react-native'
import { useNavigation,useRouter} from 'expo-router';
import CalendarPicker from "react-native-calendar-picker";
import { Colors } from './../../constants/Colors';
import { useEffect,useState,useContext } from "react";
import moment from 'moment'
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectDates() {
  const navigation = useNavigation();
  const router = useRouter();

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);


  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, [navigation]);

  const onDateSelectionContinue=()=>{
    if(!startDate&&!endDate){
      ToastAndroid.show('Please Select Start and End Date',ToastAndroid.LONG)
      return
    }
    const totalNumOfDays = endDate.diff(startDate,'days')
    console.log('totalNumOfDays',totalNumOfDays)
    setTripData({
      ...tripData,
      startDate:startDate,
      endDate:endDate,
      totalNumOfDays:totalNumOfDays+1
    })
    router.push('./select-budget')
  }

  const onDateChange=(date,type)=>{
    console.log(date,type)
    if(type=='START_DATE'){setStartDate(moment(date))}
    if(type=='END_DATE'){setEndDate(moment(date))}
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Travel Date </Text>
      <View style={{marginTop:30}}>
        <CalendarPicker onDateChange={onDateChange} 
        allowRangeSelection={true}
        minDate={new Date()}
        maxRangeDuration={5}
        selectedRangeStyle={{
          backgroundColor:Colors.PRIMARY
        }}
        selectedDayTextStyle={{
          color:Colors.WHITE
        }}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={onDateSelectionContinue}>
              <Text style={{color:Colors.WHITE,textAlign:'center',fontFamily: 'Outfit-Medium',fontSize:20}}>Contiue</Text>
      </TouchableOpacity>
      

    </View>
  )
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
  button: {
    backgroundColor:Colors.PRIMARY,
    padding: 15,
    borderRadius:15,
    marginTop:35,
    padding:15
  },
})