import React,{Component} from 'react';
import { StyleSheet, Text, View,Image,Dimensions,SafeAreaView,ScrollView,StatusBar } from 'react-native';
import {DefaultTheme, NavigationContainer, StackRouter} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import * as firebase from 'firebase'
import Signup from './component/signup';
import Login from './component/login';
import Home from './component/home';

const {width,height} = Dimensions.get('screen')

const firebaseConfig = {
  apiKey: ,
  authDomain: ,
  databaseURL: ,
  projectId: ,
  storageBucket: ,
  messagingSenderId: ,
  appId: ,
  measurementId: 
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator()


export default class App extends Component{
  state={
    authenticated:false,
    loading:false
  }
 async componentDidMount(){
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
      firebase.firestore();
      console.log('Initializing Firebase');
    }
    else{
      console.log('Initialized Firebase');
    }
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loading: false, authenticated: true });
      } else {
        this.setState({ loading: false, authenticated: false });
      }
    });
    console.log(this.state.authenticated)
  }
  render(){
    return(
      <View style={{flex:1}}>
                {
          this.state.authenticated?
          <NavigationContainer >
            <Stack.Navigator>
            <Stack.Screen name='HOME' options={{headerShown:false}}  component={Home}  /> 
            {/* <Stack.Screen name='Signup' options={{headerShown:false}} component={Signup}  />  */}
            <Stack.Screen name='Login' options={{headerShown:false}}  component={Login}  /> 
          </Stack.Navigator>
          </NavigationContainer>
          
          
          :
          <NavigationContainer >
        
            <Stack.Navigator>
              <Stack.Screen name='Signup' options={{headerShown:false}} component={Signup}  /> 
              <Stack.Screen name='Login' options={{headerShown:false}}  component={Login}  /> 
              <Stack.Screen name='HOME'   component={Home}  /> 
            </Stack.Navigator>
          </NavigationContainer>
  } 
       </View>
    );
  }
}