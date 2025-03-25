import{View, Text, Image, TouchableOpacity}  from 'react-native';
import {StyleSheet} from 'react-native'; 
import { Colors } from '@/constants/Colors';
import {React} from 'react';
import { useRouter } from 'expo-router';

export default function Login() {
    const router = useRouter();
     
    return (
        <View>
           <Image source={require('./../assets/images/login.jpg')}
           style = {{
            width: '100%',
            height: 500    
           }}
           />

           <View style={styles.container}>
            <Text style={{
                fontSize : 25,
                fontFamily :'outfit-bold',
                textAlign: 'center',
                marginTop : 10
            }}>
                AI Travel Planner
            </Text>
            <Text style={{
                fontFamily:'outfit',
                fontSize: 17,
                textAlign: 'center',
                color: Colors.GRAY ,
                marginTop: 20
            }}>Discover your next adventure effortlessly at your fingertips.Travel smarter with AI-driven insights</Text>

            < TouchableOpacity View style = {styles.button}
            onPress={() => router.push('../auth/sign-in')}>
                <Text style={{
                    color: Colors.WHITE,
                    textAlign : 'center',
                    fontFamily: 'outfit-bold'
                }}>Get Started</Text>
            </TouchableOpacity>
           </View>
           
        </View>
    )
}

const styles =  StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        marginTop:-20,
        borderTopLeftRadius: 30,
        borderTopRightRadius:30,
        height: '100%',
        padding:25
    },

    button : {
      padding: 15,
      backgroundColor : Colors.PRIMARY,
      borderRadius : 100,
      marginTop : '20%'
    }
}) 