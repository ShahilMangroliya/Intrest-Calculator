import React ,{Component} from 'react'
// import { Text ,View,TouchableOpacity,Keyboard,Alert,Dimensions,ScrollView,ActivityIndicator,KeyboardAvoidingView,TouchableWithoutFeedback,Image,ImageBackground,TextInput} from 'react-native'
const {width,height} = Dimensions.get('screen')
import {View,TextInput,Text,Dimensions,Keyboard,KeyboardAvoidingView,TouchableWithoutFeedback,ImageBackground,Image,TouchableOpacity,ActivityIndicator,Alert, ScrollView, Modal, StatusBar} from 'react-native'

import firebase from 'firebase'
import AntDesign from 'react-native-vector-icons/AntDesign'


export default class Login extends Component{
    state = { 
      email: '', 
      pass: '',
      isLoading: false,
      uid:'',
      modal:false,
      femail:'',
    }
    async userLogin () {
        if(this.state.email === '' && this.state.pass === '') {
          Alert.alert('Enter details to login!')
        } else {
          this.setState({isLoading:true})
          await firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.pass)
          .then((res) => {
            // console.log(res)
            // this.setState({uid:res.uid})
            console.log('User logged-in successfully!')
            this.setState({
              isLoading: false,
              email: '', 
              password: ''
            })
            // console.log(this.state.uid);
            this.setState({uid: firebase.auth().currentUser.uid})
            console.log(this.state.uid);
            this.setState({isLoading:false})
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


    forgotPassword=()=>{
      this.setState({modal:true})
      // firebase.auth().sendPasswordResetEmail(this.state.email)
    }
    resetPassword=()=>{
      if(this.state.femail==''){
        Alert.alert('Enter Email For Password Reset')
      }
      else{
        // try{
            firebase.auth().sendPasswordResetEmail(this.state.femail)
            .then(
            this.setState({modal:false,femail:''})
            )
            .then(
                Alert.alert('Reset link Sent To your email successfully.')

            )
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode == 'auth/weak-password') {
              // this.setState({isLoading:false})
                alert('The password is too weak.');
            // this.te()
            // this.setState({isLoading:false})
  
            }
               else {
                Alert.alert(errorMessage);
            }
              console.log(error);
            })
          // }
          // catch(error){
          //   console.log(error);
          //   this.setState({modal:false,femail:''})
          // }


      }
    }

componentDidMount(){
    console.log('///////////////////////////////////////////////////////login');

}
    render(){
        return(

          <KeyboardAvoidingView style={{height:height}} 
            behavior={Platform.OS == "ios" ? "padding" : "height"}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{height:height}}>
            {/* <StatusBar networkActivityIndicatorVisible animated /> */}

                  <ScrollView style={{maxHeight:height,minHeight:height}}>
                    <Image
                    source={require('../images/log1.png')}
                    style={{flex:1,opacity:1,marginTop:-10,height:height/2.1,width:width+50,resizeMode: 'cover',position:'absolute'}}
                    />

                    
                    
                    <Text style={{color:'white',position:'absolute',marginTop:190,fontSize:45,paddingRight:150,marginLeft:20,alignSelf:'center'}}>Welcome Back</Text>
                    <View style={{alignContent:'center',marginTop:180,justifyContent:'center',height:height-100}}>
                        

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
                        
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        {/* <Text style={{fontSize:17,color:'white'}}>Already Have Account? </Text> */}
                        {/* <Text style={{fontSize:23,fontWeight:'bold',marginLeft:50,marginTop:10,fontFamily:'',color:'#434852'}}>Sign up</Text> */}
                        <TouchableOpacity onPress={()=>{this.userLogin()}}>

                        <View style={{height:70,borderRadius:35,width:70,marginTop:20,alignItems:'center',justifyContent:'center',backgroundColor:'#434852'}}>
                        <AntDesign name='arrowright' style={{color:'white'}} size={25} />
                        </View>
                        </TouchableOpacity>

                        </View>
                        <View style={{flexDirection:'row',marginTop:70,alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.replace('Signup')}}>
                        <Text style={{fontSize:16,marginLeft:30,fontWeight:'bold',fontFamily:'',color:'#434852',borderBottomColor:'#434852',borderBottomWidth:1,width:65,}}>Sign up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.forgotPassword()}}>
                        <Text style={{fontSize:16,fontWeight:'bold',marginLeft:width/2.8,fontFamily:'',color:'#434852',borderBottomColor:'#434852',borderBottomWidth:1,width:142,}}>Forgot Password</Text>
                        </TouchableOpacity>
                        </View>



                    </View>
                    </ScrollView>

                    <Modal animationType='fade' transparent={true} visible={this.state.modal} onRequestClose={() => this.setState({modal:false})}>
                              <View style={{height:height*2,width:width,opacity:1,opacity:0.8,backgroundColor: 'rgba(52, 52, 52, 0.8)',position:'absolute'}}/>
                              <View style={{ flex: 1,justifyContent: "center",alignItems: "center"}}>
                                <View style={{    margin: 20,width:width-20,backgroundColor: "white",borderRadius: 20,padding: 35,alignItems: "center",shadowColor: "#000",}}>

                                <View style={{marginTop:20}}>
                        {/* <FontAwesome name='user' style={{color:'#7B7B7B',margin:20,position:'absolute',elevation:1,marginLeft:20,marginTop:15}} size={22} /> */}

                        <TextInput style={{marginLeft:30,fontSize:17,width:width-60,height:40,elevation:0}}
                            placeholder='Enter Email'
                            keyboardType='email-address'
                            onChangeText={(text) => this.setState({femail:text})}
                            />
                        </View>
                        
                        <View style={{width:width-60,borderBottomWidth:1,elevation:0,marginLeft:30,borderBottomColor:'grey',opacity:0.5}} />
                        
                              <View style={{flexDirection:'row'}}>
                              <TouchableOpacity onPress={() => {this.setState({modal:false})}}>
                                    
                                <View style={{margin:10,marginTop:10,borderRadius:30,backgroundColor:'#434852',alignItems:'center',justifyContent:'center',width:width/3,height:60}}>
                                    <Text style={{color: "white",fontWeight: "bold",fontFamily:'',fontSize:18,textAlign: "center"}}>Cancel</Text>
                                </View>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => {this.resetPassword()}}>
                                    
                                    <View style={{margin:10,marginTop:10,borderRadius:30,backgroundColor:'#434852',alignItems:'center',justifyContent:'center',width:width/3,height:60}}>
                                        <Text style={{color: "white",fontWeight: "bold",fontFamily:'',fontSize:18,textAlign: "center"}}>Reset</Text>
                                    </View>
                                  </TouchableOpacity>
                                  </View>
                                </View>
                              </View>
                            </Modal>

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

        );
    }
}