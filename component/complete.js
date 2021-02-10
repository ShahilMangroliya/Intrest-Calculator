import React,{Component} from 'react'
import {View,Text,TextInput,Alert,Dimensions,Modal,FlatList,TouchableOpacity,ScrollView,ActivityIndicator} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import firebase from 'firebase'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const {width,height} = Dimensions.get('screen')
// import NumberFormat from 'react-number-format';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import {Picker} from '@react-native-picker/picker';
// import DateTimePicker from '@react-native-community/datetimepicker';

// import DatePicker from 'react-native-datepicker'
// var from
// var to
var today = new Date();
// var date = new Date().getDate()
var date=(today.getDate()-1)+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
var date1=(today.getDate()-2)+'-'+(today.getMonth()+1)+'-'+today.getFullYear()

var x;
// var obj
var array=[]
// var num=[]


export default class Complete extends Component{


    state={
      temp:false,
      isFetching:false,
      isLoading:false,
        plus:false,
        name:'',
        amt:0,
        intrest:1,
        date:'',
        date1:'',
        mode:'',
        intamt:0,
        n:1,
        data:[],
        touch:false,
        obj:'',
        diff:0,
        currDiff:0,
        curint:0,
        indata:[],
        inname:''

    }

    async componentDidMount(){

            x = await firebase.auth().currentUser.uid
            //  console.log(datediff(parseDate(first.value), parseDate(second.value)));
      this.setState({date:date1})
      this.fetchData()
        console.log('///////////////////start')

    }
    ob(){
      // obj=item
      this.setState({touch:true})
      // console.log(item);
    
    }

    async fetchData(){
      this.setState({isFetching:true})
      // var dname=''
      // x = await firebase.auth().currentUser.uid
      // this.setState({currentuser:x})
      console.log(x)
      console.log('///////////////////////////////////////////////fetchdata');
      // console.log(x+'///////////////////')
        this.setState({data:[]})
         await firebase.firestore()
          .collection('user/'+x+'/amountData')
          .get()
          .then(snapshot => {
              snapshot.forEach(doc=>{
                  // console.log(doc.id, ' => ', doc.data());
    
                  // var timeOver=false
    
    
                  for (var i in doc.data()){
                    // console.log(doc.data()[i][0]);
                    // var t=0
                    var j=0
                    var tamount=0
                    for ( var k in doc.data()[i]){
                      // console.log(parseInt(k)+1);
                      // if(this.process(date)<=this.process(doc.data()[i][k].toDate)){
                      if(doc.data()[i][k].isComplete){
    
                        j+=1
                        tamount+=parseInt(doc.data()[i][k].pAmount)
                        // if(this.process(cdate)>this.process(doc.data()[i][k].toDate)){
                        //   timeOver=true
                        // }
                      }
    
                  }
                  // console.log(j);
                  for (var k in doc.data()[i]){
                    // console.log(parseInt(j)+1);
                    if(doc.data()[i][k].isComplete){
    
    
                  // num.push(parseInt(j)+1)
    
                    // this.state.data.push(doc.data()[i][0])
                    this.state.data.push({
                      "total":   parseInt(j), 
                      "name" : doc.data()[i][0].name,
                      "tAmount" : tamount,
                      // "timeOver":  timeOver
                  })
    
                  
    
                }
                  
                }
                  this.setState({temp:true})
                  }
              }
              
              )
          })
          // console.log('this.state.data,this.state.data',this.state.data);
    
          var arr=this.state.data
          var temp=[];
          // var arr=
          arr=arr.filter((x, i)=> {
            if (temp.indexOf(x.name) < 0) {
              temp.push(x.name);
              return true;
            }
            return false;
          })
          // console.log(arr);
          this.setState({data:arr})
      this.setState({isFetching:false})
    
      console.log(this.state.data);
    
    
    }
    
    
    
    
    async inData(name){
    
      this.setState({indata:[],inname:'',isLoading:true})
      array=[]
      await firebase.firestore()
      .collection('user/'+x+'/amountData')
      .doc(name)
      .get()
      .then(doc => {
        if (doc.exists) {
          // console.log(doc.exists);
              for( var i in doc.data()){
              // console.log(doc.data()[i][0]);
              if(doc.data()[i][0].name==name){
                for (var j in doc.data()[i]){
                  console.log(doc.data()[i][j]);
                  array.push(doc.data()[i][j])
                  
                  if(doc.data()[i][j].isComplete){
                    var tem=this.currentIntrest(doc.data()[i][j].fromDate,doc.data()[i][j].toDate,doc.data()[i][j].pAmount,doc.data()[i][j].intrest)
                    this.state.indata.push({
                      "id"        : parseInt(j)+1,
                      // "total"     : parseInt(j)+1, 
                      "name"      : doc.data()[i][j].name,
                      "fromDate"  : doc.data()[i][j].fromDate,
                      "intrest"   : doc.data()[i][j].intrest,
                      "pAmount"   : doc.data()[i][j].pAmount,
                      "toDate"    : doc.data()[i][j].toDate,
                      "daysDiff"  :this.days(doc.data()[i][j].fromDate,doc.data()[i][j].toDate),
                      "curInt"    :tem,
                      "totalAmount":parseFloat(doc.data()[i][j].pAmount)+parseFloat(tem)
                    })
                  }
                }
            }
          }
        }
        else
        this.setState({touch:false})
     
      })
      .finally(()=>{
        try{
        var intrest=0
        for (var i in this.state.indata){
          intrest+=this.state.indata[i].curInt
        }
        this.setState({intamt:intrest})
        this.setState({inname:this.state.indata[0].name})
      }
      catch(error){
        if(array.length==0)
        this.setState({touch:false})

      }
      }
      )

    
    this.setState({isLoading:false})
    }



days(from,to){
  var startDate = Date.parse(from.split("-").reverse().join("-"));
  var endDate = Date.parse(to.split("-").reverse().join("-"));
  var timeDiff = endDate - startDate;
  var daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return daysDiff
}

currentIntrest(from,to,amt,intrest){
  this.setState({date:date})
  // console.log('//////////////',this.state.date,from);
  var startDate = Date.parse(from.split("-").reverse().join("-"));
  var endDate = Date.parse(to.split("-").reverse().join("-"));
  // var endDate = today.getTime()
  console.log('////////////////////',startDate,endDate);
  var timeDiff = endDate - startDate;
  var daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
return amt*intrest*12*daysDiff/100/365

}


 process(date){
  var parts = date.split("-");
  return new Date(parts[2], parts[1] - 1, parts[0]);
}


refresh(){
  this.setState({isFetching:true})
  this.fetchData()
  this.setState({isFetching:false})

}





    render(){
        return(
            <View style={{height:height,width:width,backgroundColor:'#dcf3fb'}}>
            {/* <View > */}
                  <FlatList
                  data={this.state.data}
                  onRefresh={()=>{this.refresh()}}
                  refreshing={this.state.isFetching}
                  style={{height:height}}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=>{this.inData(item.name),this.ob()}}>
                      <View style={{borderRadius:35,backgroundColor:'#3787a5',marginHorizontal:10,elevation:5,flexDirection:'row',alignItems:'center',marginVertical:5,width:width-20,height:70}}>
                      {/* <View style={{backgroundColor:'white',marginHorizontal:10,flexDirection:'row',alignItems:'center',marginVertical:5,width:width-20,height:70}}> */}
                          <FontAwesome name='user-circle' style={{color:'white',opacity:0.5,marginLeft:10}} size={50} />
                          <View style={{marginLeft:10,flexDirection:'row',width:width-100}}> 
                          <View style={{}}> 
                              <Text style={{alignSelf:'flex-start',color:'white',fontWeight:'bold',fontFamily:'sans-serif-light'}}>{item.name}</Text>
                              <Text style={{alignSelf:'flex-start',fontSize:13,color:'white',fontWeight:'100',fontFamily:'monospace'}}>{item.total} TRANSECTION</Text>
                            </View>
                            {/* <Text style={{alignSelf:'center'}}>  {item.toDate}</Text> */}
                            <View style={{justifyContent:'flex-end',position:'absolute',marginTop:10,width:width-105}}>
                            <Text style={{color:'white',alignSelf:'flex-end'}}>₹{item.tAmount}</Text>
                          </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                  )}
                />
                <Modal animationType='slide' transparent={true} visible={this.state.touch} onRequestClose={() => {this.setState({touch:false})}}>
                <View style={{height:height,width:width,backgroundColor: '#434852',position:'absolute'}}/>
                    {/* <View style={{width:width,height:150,backgroundColor:'#434852',position:'absolute'}} /> */}
                    {/* <View style={{width:width,height:150,backgroundColor:'#dcf3fb',marginTop:100,borderRadius:50,position:'absolute'}} /> */}

                    <View style={{flexDirection:'row',marginTop:30,alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>{console.log('X'),this.setState({touch:false})}}>
                            <Feather name='x' style={{color:'white',marginLeft:10}} size={30} />
                            </TouchableOpacity>
                            
                            {/* <Text style={{alignSelf:'center',marginLeft:width/3,fontWeight:'bold',fontFamily:'',fontSize:18}}>ALL</Text> */}
                            <Text style={{alignSelf:'center',color:'white',marginLeft:width/4,fontWeight:'bold',fontFamily:'',fontSize:18}}>{this.state.inname}</Text>
                            

                        </View>
                        {/* <View style={{width:width,borderBottomWidth:0.1,borderBottomColor:'white',elevation:2,alignSelf:'center',marginTop:-10}}/> */}
                        {/* <Text style={{alignSelf:'center',color:'#4EC1EC',fontWeight:'bold',fontFamily:'',fontSize:17,margin:10}}></Text> */}

                        {/* ///////////////////////// */}

                        <View style={{marginBottom:20}} />
                        <FlatList
                            data={this.state.indata}
                            keyExtractor={item => item.id}
                            
                            renderItem={({ item }) => (
                              <View>
                                <View style={{width:width,height:220,backgroundColor:'#dcf3fb',borderRadius:40,position:'absolute'}} />
                        <View style={{marginBottom:20}} />
                        <View style={{flexDirection:'row',marginLeft:width/15,elevation:5}}>
                              <View>
                                <View style={{flexDirection:'row',marginBottom:10,alignItems:'center'}}>
                                  <FontAwesome name='rupee' style={{color:'black',}} size={25} />
                                  <View style={{marginLeft:20,justifyContent:'center',width:width/3}}>
                                    <Text style={{color:'grey'}}>Amount</Text>
                                    <ScrollView horizontal>
                                    <Text>{parseFloat(item.pAmount.toString()).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                    </ScrollView>
                                  </View>
                                </View>
                                {/* //////////////////// */}
                                <View style={{flexDirection:'row',marginBottom:10,alignItems:'center'}}>
                                  <FontAwesome name='calendar' style={{color:'black',}} size={25} />
                                  <View style={{marginLeft:20,justifyContent:'center'}}>
                                    <Text style={{color:'grey'}}>Given Date</Text>
                                    <Text>{item.fromDate}</Text>
                                  </View>
                                </View>
                                {/* ////////////////////// */}
                                <View style={{flexDirection:'row',marginBottom:10,alignItems:'center'}}>
                                <FontAwesome name='rupee' style={{color:'black',}} size={25} />
                                  <View style={{marginLeft:20,justifyContent:'center',width:width/3}}>
                                    <Text style={{color:'grey'}}>Current Intrest</Text>
                                    <ScrollView horizontal>
                                    <Text>{parseFloat(item.curInt.toString()).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                    </ScrollView>
                                  </View>
                                </View>
                                {/* ////////////////// */}
                              </View>


                              <View style={{position:'absolute',marginLeft:width/2.5,backgroundColor:'#dcf3fb'}}>
                                {/* ////////////// */}
                                <View style={{flexDirection:'row',marginBottom:10,alignItems:'center'}}>
                                  <FontAwesome5 name='percentage' style={{color:'black',marginLeft:30}} size={25} />
                                  <View style={{marginLeft:20,justifyContent:'center'}}>
                                    <Text style={{color:'grey'}}>Rate</Text>
                                    <Text>{item.intrest}</Text>
                                  </View>
                                </View>
                                {/* //////////////////// */}
                                <View style={{flexDirection:'row',marginBottom:10,alignItems:'center'}}>
                                  <FontAwesome name='calendar' style={{color:'black',marginLeft:30}} size={25} />
                                  <View style={{marginLeft:20,justifyContent:'center'}}>
                                    <Text style={{color:'grey'}}>Last Date</Text>
                                    <Text>{item.toDate}</Text>
                                  </View>
                                </View>
                                {/* ////////////////////// */}
                                <View style={{flexDirection:'row',marginBottom:10,alignItems:'center'}}>
                                  <MaterialIcons name='access-alarm' style={{color:'black',marginLeft:30}} size={25} />
                                  <View style={{marginLeft:20,justifyContent:'center'}}>
                                    <Text style={{color:'grey'}}>Total Days</Text>
                                    <Text>{item.daysDiff}</Text>
                                  </View>
                                </View>
                                {/* ////////////////// */}
                                
                              </View>
                            </View>
                            <View style={{width:width-20,alignSelf:'center',borderBottomWidth:1,borderBottomColor:'grey',elevation:1}} />
                            <View style={{justifyContent:'flex-end',alignItems:'center',position:'relative',marginBottom:10,width:width-10,elevation:1}}>
                            <Text style={{alignSelf:'flex-end'}}>Total ₹{parseFloat(item.totalAmount.toString()).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                          </View>
                            <View style={{marginBottom:25,}} />

                            </View>
                            )}
                          />
{/* /////////////////////////////////////////// */}
                        
                  </Modal>
{/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                  <Modal animationType='fade' transparent={true} visible={this.state.isLoading} onRequestClose={() => {}}>
                      <View >
                      <View style={{height:height*2,elevation:7,width:width,opacity:1,opacity:0.8,backgroundColor: 'rgba(52, 52, 52, 0.8)',position:'absolute'}}/>
                        <View style={{alignItems:'center',elevation:7,justifyContent:'center',height:height,width:width}}>
                        <ActivityIndicator size='large' color="#ffffff" />
                        </View>
                      </View>
                    </Modal>
                  </View>

        )
    }
}

