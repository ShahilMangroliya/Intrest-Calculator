import React,{Component} from 'react'
import {View,TextInput,Text,Dimensions,Keyboard,KeyboardAvoidingView,TouchableWithoutFeedback,ImageBackground,Image,TouchableOpacity,ActivityIndicator,Alert, ScrollView, Modal} from 'react-native'
const {width,height} = Dimensions.get('screen')
import * as firebase from 'firebase'
// import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'


var x;

export default class Signup extends Component{


    state={
        name: '',
        email: '', 
        pass: '',
        rpass:'',
        isLoading: false,
    }

    registerUser = async () => {
        if(this.state.email == '' || this.state.pass == '' || this.state.name == '' || this.state.rpass ==''  ) {
          Alert.alert('Enter proper details to signup!')
        } 
        else if(this.state.pass!=this.state.rpass){
          alert('Password did not match')
        }
        else {
          this.setState({
            isLoading: true,
          })
         await firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.pass)
          .then(() => {
          x = firebase.auth().currentUser.uid
          console.log(x)

        //   firebase.database().ref("user/"+x+"/").set({
        //     name:this.state.name,
        //     email:this.state.email,
        // })
        firebase.firestore().collection('user/'+x+'/data')
        .add({
          name:this.state.name,
          email:this.state.email,
        })
            
            this.props.navigation.replace('HOME')
          })
          .catch((error) => {
            console.log('error portion')
            switch (error.code) {
                case 'auth/invalid-email':
                    Alert.alert('Enter Valid Email')
                    this.setState({isLoading:false})
                    break;
                case 'auth/user-not-found':
                    Alert.alert('user id and password not found')
                    this.setState({isLoading:false})
                    break;
                case 'auth/wrong-password':
                    Alert.alert('Enter Correct Password')
                    this.setState({isLoading:false})
                    break;
                case 'auth/weak-password':
                    Alert.alert('weak-password')
                    this.setState({isLoading:false})
                    break;
                case 'auth/too-many-requests':
                    Alert.alert('Please Try After Few Moment')
                    this.setState({isLoading:false})
                    break;
                default:
                    console.log(error.code)
                    this.setState({isLoading:false})
            }
        })   
        }
      }
    render(){
        return(
            <KeyboardAvoidingView style={{height:height}} 
            behavior={Platform.OS == "ios" ? "padding" : "height"}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{height:height}}>
                  <ScrollView style={{maxHeight:height,minHeight:height}}>
                    <Image
                    source={require('../images/log1.png')}
                    style={{flex:1,opacity:1,marginTop:-10,height:height/2.1,width:width+50,resizeMode: 'cover',position:'absolute'}}
                    />
                    {/* <View style={{height:height/3.1,backgroundColor:'#434852',}}/>
                    <View style={{height:height/2.4,borderTopStartRadius:40,elevation:1,borderTopEndRadius:40,borderBottomEndRadius:40,borderBottomStartRadius:40,marginTop:-100,backgroundColor:'#ffffff',}}/>
                    <View style={{height:height/2.5,marginTop:-50,backgroundColor:'#56bde6',}}/>
                     */}
                    
                    
                    <Text style={{color:'white',position:'absolute',marginTop:210,fontSize:45,paddingRight:150,alignSelf:'center'}}>Register</Text>
                    <View style={{alignContent:'center',marginTop:180,justifyContent:'center',height:height-100}}>
                        

                    <View style={{marginTop:50}}>
                        {/* <FontAwesome name='user' style={{color:'#7B7B7B',margin:20,position:'absolute',elevation:1,marginLeft:20,marginTop:15}} size={22} /> */}

                        <TextInput style={{marginLeft:30,fontSize:17,width:width-60,height:40,elevation:0}}
                            placeholder='Enter Name'
                            keyboardType='default'
                            // secureTextEntry={true}
                            // returnKeyLabel = {"next"}
                            // value={this.state.email}
                            onChangeText={(text) => this.setState({name:text})}
                            // onChangeText={(text)=>console.log(text)}
                            />
                        </View>
                        
                        <View style={{width:width-60,borderBottomWidth:1,elevation:0,marginLeft:30,borderBottomColor:'grey',opacity:0.5}} />
                        <View style={{marginTop:20}}>
                        {/* <FontAwesome name='user' style={{color:'#7B7B7B',margin:20,position:'absolute',elevation:1,marginLeft:20,marginTop:15}} size={22} /> */}

                        <TextInput style={{marginLeft:30,fontSize:17,width:width-60,height:40,elevation:0}}
                            placeholder='Enter Email'
                            keyboardType='email-address'
                            // secureTextEntry={true}
                            // returnKeyLabel = {"next"}
                            // value={this.state.email}
                            onChangeText={(text) => this.setState({email:text})}
                            // onChangeText={(text)=>console.log(text)}
                            />
                        </View>
                        
                        <View style={{width:width-60,borderBottomWidth:1,elevation:0,marginLeft:30,borderBottomColor:'grey',opacity:0.5}} />
                        <View style={{marginTop:20}}>
                        {/* <FontAwesome name='user' style={{color:'#7B7B7B',margin:20,position:'absolute',elevation:1,marginLeft:20,marginTop:15}} size={22} /> */}

                        <TextInput style={{marginLeft:30,fontSize:17,width:width-60,height:40,elevation:0}}
                            placeholder='Enter Password'
                            keyboardType='ascii-capable'
                            secureTextEntry={true}
                            // returnKeyLabel = {"next"}
                            // value={this.state.email}
                            onChangeText={(text) => this.setState({pass:text})}
                            // onChangeText={(text)=>console.log(text)}
                            />
                        </View>
                        
                        <View style={{width:width-60,borderBottomWidth:1,elevation:0,marginLeft:30,borderBottomColor:'grey',opacity:0.5}} />
                        <View style={{marginTop:20}}>
                        {/* <FontAwesome name='user' style={{color:'#7B7B7B',margin:20,position:'absolute',elevation:1,marginLeft:20,marginTop:15}} size={22} /> */}

                        <TextInput style={{marginLeft:30,fontSize:17,width:width-60,height:40,elevation:0}}
                            placeholder='Retype Password'
                            keyboardType='ascii-capable'
                            secureTextEntry={true}
                            // returnKeyLabel = {"next"}
                            // value={this.state.email}
                            onChangeText={(text) => this.setState({rpass:text})}
                            // onChangeText={(text)=>console.log(text)}
                            />
                        </View>
                        
                        <View style={{width:width-60,borderBottomWidth:1,elevation:0,marginLeft:30,borderBottomColor:'grey',opacity:0.5}} />

                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        {/* <Text style={{fontSize:17,color:'white'}}>Already Have Account? </Text> */}
                        {/* <Text style={{fontSize:23,fontWeight:'bold',marginLeft:50,marginTop:10,fontFamily:'',color:'#434852'}}>Sign up</Text> */}
                        <TouchableOpacity onPress={()=>{this.registerUser()}}>

                        <View style={{height:70,borderRadius:35,width:70,marginTop:20,alignItems:'center',justifyContent:'center',backgroundColor:'#434852'}}>
                        <AntDesign name='arrowright' style={{color:'white'}} size={25} />
                        </View>
                        </TouchableOpacity>

                        </View>
                        <View style={{flexDirection:'row',marginTop:40,alignItems:'center',justifyContent:'center'}}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.replace('Login')}}>
                        <Text style={{fontSize:17,fontWeight:'bold',fontFamily:'',color:'#434852',borderBottomColor:'#434852',borderBottomWidth:1,width:65,}}>Sign in</Text>
                        </TouchableOpacity>

                        </View>



                    </View>
                    </ScrollView>
                    <Modal animationType='fade' transparent={true} visible={this.state.isLoading} onRequestClose={() => {}}>
                      <View >
                      <View style={{height:height*2,width:width,opacity:1,opacity:0.8,backgroundColor: 'rgba(52, 52, 52, 0.8)',position:'absolute'}}/>
                        <View style={{alignItems:'center',justifyContent:'center',height:height,width:width}}>
                        <ActivityIndicator size='large' color="#ffffff" />
                        </View>
                      </View>
                    </Modal>
                </View>
               </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }
}