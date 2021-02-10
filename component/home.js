import React,{Component} from 'react'
import {View,Text,TextInput,Dimensions,StatusBar,TouchableOpacity} from 'react-native'
import firebase from 'firebase'
import AntDesign from 'react-native-vector-icons/AntDesign'
const {width,height} = Dimensions.get('screen')
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Pending from './pending';
import Complete from './complete';
// import { View } from 'react-native';

const Tab = createMaterialTopTabNavigator();

export default class Home extends Component{
    state={
        name:'',
        email:'',
    }
    signout=()=>{
        firebase.auth().signOut().then(()=> {
            // Sign-out successful.
            this.props.navigation.replace('Login')
          }).catch(function(error) {
            // An error happened.
          });
    }
    async componentDidMount(){
        // console.log('///////////////////////////////////////////////home');
       var x = await firebase.auth().currentUser.uid
       await firebase.firestore()
       .collection('user/'+x+'/data')
       .get()
       .then(snapshot => {
           snapshot.forEach(doc=>{
            //    console.log(doc.data());
               this.setState({name:doc.data().name,email:doc.data().email})
            //    for(var i in doc.data()[0])
            //    console.log(i);

           })
       })
    //    console.log('///////////////////////////////////////////////homeend',this.state.name,this.state.email);
    }
    render(){
        return(
        <View style={{flex:1}}>
            <StatusBar networkActivityIndicatorVisible animated />
            <View style={{height:100,flexDirection:'row',alignItems:'center',backgroundColor:'#434852',width:width}}>
                <View style={{justifyContent:'flex-start',width:width-70}}>
                <Text style={{fontSize:20,fontWeight:'bold',color:'white',fontFamily:'sans-serif-light',marginLeft:10}}>{this.state.name}</Text>
                {/* <Text style={{fontSize:15,opacity:0.5,color:'white',fontFamily:'',marginLeft:10}}>{this.state.email}</Text> */}
                </View>
                <View style={{justifyContent:'flex-end',}}>
                <TouchableOpacity onPress={()=>this.signout()}>
                <AntDesign name='logout' style={{color:'white',margin:10,}} size={25} />
                </TouchableOpacity>
                </View>
                {/* <Text style={{fontSize:20,fontWeight:'bold',fontFamily:'',margin:10,}}>Home</Text> */}
            </View>
            <View style={{backgroundColor:'#434852',width:width,marginTop:100,height:50,position:'absolute'}}/>
            <Tab.Navigator
            tabBarOptions={{
                // timingConfig=(2),
                labelStyle: { fontSize: 12,fontWeight:'bold',fontFamily:'',color:'#434852' },
                tabStyle: { width: width/2 },
                style: {elevation:1, backgroundColor: '#dcf3fb',borderTopStartRadius:50,borderTopEndRadius:50 },
              }}
            >
                <Tab.Screen name="Pending" component={Pending} />
                <Tab.Screen name="Complete" component={Complete} />
            </Tab.Navigator>
        </View>
        )
    }
}