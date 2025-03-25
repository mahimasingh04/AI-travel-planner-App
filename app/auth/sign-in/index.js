import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation , useRouter} from 'expo-router';
import {React , useEffect}from 'react'
import {Colors} from './../../../constants/Colors'

export default function SignIn() {

    
    const navigation = useNavigation();
    const router = useRouter();
    useEffect(() => {
        navigation.setOptions({
            headerShown : false
        })
    }, [])
     return (
        <View style={{
            padding : 25,
            paddingTop:80,
            backgroundColor: Colors.WHITE,
            marginTop:2,
            height: '100%'
        }}>
            <Text style={{
                fontFamily : 'outfit-bold',
                fontSize:30

            }}>Let's Sign You In</Text>

<Text style={{
                fontFamily : 'outfit',
                fontSize:30,
                 color : Colors.GRAY,
                 marginTop : 20
            }}>Welcome Back</Text>

<Text style={{
                fontFamily : 'outfit-bold',
                fontSize:30,
                color : Colors.GRAY,
                marginTop : 10
            }}>You've been missed</Text>

            <View style={{
                marginTop:50
            }}>
                <Text style={{
                    fontFamily: 'outfit'
                }}>
                    Email
                </Text>
                <TextInput style={styles.input} placeholder='Enter Email'/>
            </View>

            <View style={{
                marginTop:20
            }}>
                <Text style={{
                    fontFamily: 'outfit'
                }}>
                    Password
                </Text>
                <TextInput secureTextEntry={true} style={styles.input} placeholder='Enter Password'/>
            </View>

            {/*Sign In Button*/}

            <View style={{
                padding: 20,
                backgroundColor: Colors.PRIMARY,
                borderRadius:15,
                marginTop : 50,

            }}>

                <Text style={{
                    color: Colors.WHITE,
                    textAlign: 'center',
                     
                }}>Sign In</Text>
            </View>

          {/*create Button*/}

            <TouchableOpacity 
        onPress={() => router.replace('')}
                style = {{
                    padding: 20,
                    backgroundColor: Colors.WHITE,
                    borderRadius:15,
                    marginTop : 20,
                    borderWidth: 1
                }}>

                <Text style={{
                    color: Colors.PRIMARY,
                    textAlign: 'center',
                    fontFamily : 'outfit-medium'
                     
                }}>Create Account</Text>
            </TouchableOpacity>
        </View>
     )
}

const styles = StyleSheet.create({
    input: {
        padding:15,
        borderWidth:1,
        borderRadius: 15,
        borderColor:Colors.GRAY,
        fontFamily: 'outfit'
    }
}) 