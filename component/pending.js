import React,{Component} from 'react'
import {View,Text,TextInput,Alert,Dimensions,Modal,FlatList,TouchableOpacity,ActivityIndicator, ScrollView} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import firebase from 'firebase'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const {width,height} = Dimensions.get('screen')
// import NumberFormat from 'react-number-format';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Picker} from '@react-native-picker/picker';
// import DateTimePicker from '@react-native-community/datetimepicker';

import DatePicker from 'react-native-datepicker'
// var from
// var to
var today = new Date();
// var date = new Date().getDate()
var cdate=(today.getDate())+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
var date=(today.getDate()-1)+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
var date1=(today.getDate()-2)+'-'+(today.getMonth()+1)+'-'+today.getFullYear()

var x;
// var obj
var array=[]
// var num=[]
var tempAmount;
var tItem;

export default class Pending extends Component{

    state={
      isLoading:false,
      d1:'',
      i:'',
      temp:false,
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
        inname:'',
        isFetching:false,
        edit:false,
        paidIntrest:0,
        paidAmount:0,
        remainingAmount:0,
        geting:false,
        getintrest:false,
        getamount:false,
        tempAmount:0,
        tempPaidAmount:'',
        tempPaidIntrest:'',
        loading:false,
        month:0,
        paidIntrestDate:'',
        tempDate:'',
        tempDate1:'',
        remainingAmountAtPaid:'',
        paidAmountDate:'',
        paidAmountDate:'',

        
    }
    async componentDidMount(){

      x = await firebase.auth().currentUser.uid
      this.setState({date:date1})
      this.fetchData()
        console.log('///////////////////start')

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

              var timeOver=false


              for (var i in doc.data()){
                // console.log(doc.data()[i][0]);
                // var t=0
                var j=0
                var tamount=0
                for ( var k in doc.data()[i]){
                  // console.log(parseInt(k)+1);
                  // if(this.process(date)<=this.process(doc.data()[i][k].toDate)){
                  if(doc.data()[i][k].isComplete==false){

                    j+=1
                    tamount+=parseInt(doc.data()[i][k].pAmount)
                    if(this.process(cdate)>this.process(doc.data()[i][k].toDate)){
                      timeOver=true
                    }
                  }

              }
              // console.log(j);
              for (var k in doc.data()[i]){
                // console.log(parseInt(j)+1);
                if(doc.data()[i][k].isComplete==false){


              // num.push(parseInt(j)+1)

                // this.state.data.push(doc.data()[i][0])
                this.state.data.push({
                  "total":   parseInt(j), 
                  "name" : doc.data()[i][0].name,
                  "tAmount" : tamount,
                  "timeOver":  timeOver
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

  // console.log(this.state.data);


}




 async inData(name){
  this.setState({isLoading:true})
  this.setState({indata:[],inname:''})
  array=[]
  await firebase.firestore()
  .collection('user/'+x+'/amountData')
  .doc(name)
  .get()
  .then(doc => {
    if (doc.exists) {
      // console.log(doc.exists);
          for( var i in doc.data()){
            var istimeOver= false
            
          // console.log(doc.data()[i][0]);
          if(doc.data()[i][0].name==name){
            for (var j in doc.data()[i]){
              console.log(doc.data()[i][j]);
              array.push(doc.data()[i][j])
                try{
                if(doc.data()[i][j].isComplete==false){
                  // if(this.process(date)<=this.process(doc.data()[i][j].toDate)){
                    // for ( var k in doc.data()[i]){
                      // if(doc.data()[i][k].isComplete==false){
                        if(this.process(cdate)>this.process(doc.data()[i][j].toDate)){
                          istimeOver=true
                        }
                        else{
                          istimeOver=false
                        }
                      // }
            
                  // }
                  var tempTnt=parseFloat(this.currentIntrest(doc.data()[i][j].paidAmountDate,doc.data()[i][j].remainingAmount,doc.data()[i][j].intrest))+parseFloat(doc.data()[i][j].intrestAtAmountPaid)
                this.state.indata.push({
                  "id"              : parseInt(j)+1,
                  "name"            : doc.data()[i][j].name,
                  "fromDate"        : doc.data()[i][j].fromDate,
                  "intrest"         : doc.data()[i][j].intrest,
                  "pAmount"         : doc.data()[i][j].pAmount,
                  "toDate"          : doc.data()[i][j].toDate,
                  "daysDiff"        :this.days(doc.data()[i][j].fromDate,cdate),
                  "curInt"          :tempTnt,
                  "paidAmount"      :doc.data()[i][j].paidAmount,
                  "paidIntrest"     :doc.data()[i][j].paidIntrest,
                  "remainingAmount" :parseFloat(doc.data()[i][j].pAmount)-parseFloat(doc.data()[i][j].paidAmount),
                  "remainingIntrest":parseFloat(tempTnt)-parseFloat(doc.data()[i][j].paidIntrest),
                  "total"           :parseFloat(doc.data()[i][j].pAmount)+parseFloat(tempTnt)-parseFloat(doc.data()[i][j].paidAmount)-parseFloat(doc.data()[i][j].paidIntrest),
                  "paidIntrestDate" :doc.data()[i][j].paidIntrestDate,
                  "dAmount"         :doc.data()[i][j].remainingAmount,
                  "paidAmountDate"  :doc.data()[i][j].paidAmountDate,
                  "dIntrest"        :doc.data()[i][j].intrestAtAmountPaid,
                  "timeOver"        :istimeOver
                })
              }
            }
            catch(error){
              console.log(error);
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
    // console.log('klkkl');
    // console.log('ddddoooooonnnnneeeeeee',array.length);
  }
  }
  )
  // console.log('errrroooorrrrrr');

  this.setState({isLoading:false})
  // console.log(this.state.data);

}

days(from,to){
  var startDate = Date.parse(from.split("-").reverse().join("-"));
  var endDate = Date.parse(to.split("-").reverse().join("-"));
  var timeDiff = endDate - startDate;
  var daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return daysDiff
}


addMonth(d,m){
  // console.log('d,m',d,m);
  var strDate = d.split('-').reverse()
  // console.log(parseInt(strDate[0]),parseInt(strDate[1]),parseInt(strDate[2]));
  var newDate = new Date(parseInt(strDate[0]), parseInt(strDate[1])-1+parseInt(m), parseInt(strDate[2]));
  // console.log('newDate',newDate);
  newDate=(newDate.getDate())+'-'+(newDate.getMonth()+1)+'-'+newDate.getFullYear()
this.setState({paidIntrestDate:newDate})
  // console.log('newDate',newDate);
  return newDate
}

totalDays(from,to){
  var strDate = from.split('-').reverse()
  var endDate = to.split('-').reverse()
  // month1 = 3,
  var f = new Date(parseInt(strDate[0]), parseInt(strDate[1])-1, parseInt(strDate[2]));
  var t = new Date(parseInt(endDate[0]), parseInt(endDate[1])-1, parseInt(endDate[2]));
  // console.log(f,t);
  // this.setState({paidIntrestDate:t})
  return (t-f)/(1000*60*60*24)
}

customIntrest(from,to,amt,intrest){
  // this.setState({date:date})

  var daysDiff = this.totalDays(from,to)
return amt*intrest*12*daysDiff/100/365

}

currentIntrest(from,amt,intrest){
  this.setState({date:date})
  // console.log('//////////////',this.state.date,from);
  var startDate = Date.parse(from.split("-").reverse().join("-"));
  var endDate = today.getTime()
  console.log('////////////////////',startDate,endDate);
  var timeDiff = endDate - startDate;
  var daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
return amt*intrest*12*daysDiff/100/365

}


 process(date){
  var parts = date.split("-");
  return new Date(parts[2], parts[1] - 1, parts[0]);
}


async save(){
        // if(this.sta){}
        if(this.state.name==''){
          Alert.alert('Enter Name')
        }
        else if(this.state.amt=='',parseFloat(this.state.amt)<=0 ){
          Alert.alert('Enter Proper Amount')

        }
        else if(this.process(this.state.date)>this.process(this.state.date1)||this.state.date1==''||this.state.date==''){
          Alert.alert('Enter Proper Date')
        }
        else if(this.process(this.state.date)==this.process(this.state.date1)){
          Alert.alert('Date can not be same')
        }


        
        else{
          // const usersRef = db.collection('users').doc('id')
          this.setState({isLoading:true})

         await firebase.firestore().collection('user/'+x+'/amountData')
          .doc(this.state.name)
          .get()
            .then((docSnapshot) => {
              if (docSnapshot.exists) { 
                  firebase.firestore().collection('user/'+x+'/amountData')
                  .doc(this.state.name)
                  .update({
                    array: firebase.firestore.FieldValue.arrayUnion({
                      name:this.state.name,
                      pAmount:this.state.amt,
                      intrest:this.state.intrest,
                      fromDate:this.state.date,
                      toDate:this.state.date1,
                      paidAmount:0,
                      paidIntrest:0,
                      paidIntrestDate:this.state.date,
                      remainingAmount:this.state.amt,
                      paidAmountDate:this.state.date,
                      intrestAtAmountPaid:0,
                      isComplete:false


                        })
                }).then(this.setState({plus:false}))
            .finally(this.fetchData())

              }
              else{
                 firebase.firestore().collection('user/'+x+'/amountData')
                .doc(this.state.name)
                .set({
                    array:[{
                  name:this.state.name,
                  pAmount:this.state.amt,
                  intrest:this.state.intrest,
                  fromDate:this.state.date,
                  toDate:this.state.date1,
                  paidAmount:0,
                  paidIntrest:0,
                  paidIntrestDate:this.state.date,
                  remainingAmount:this.state.amt,
                  paidAmountDate:this.state.date,
                  intrestAtAmountPaid:0,
                  isComplete:false


                }]
            })
            .then(this.setState({plus:false}),            
            )
            .finally(this.fetchData())
              }

          })
        }
        this.setState({isLoading:false})

 }





   async removeData(item){
        console.log(item.id);
        //  console.log(array);
        
        //  console.log(array.filter(array => array.pAmount !== item.pAmount));
       await firebase.firestore().collection('user/'+x+'/amountData')
        .doc(item.name)
      .update({
        array: array.filter(array => array.pAmount !== item.pAmount)
      })
      
      .then(
        array=array.filter(array => array.pAmount !== item.pAmount),
        // console.log(array)
        // if(array===null)
        // console.log('ddoo');
        // {if(array==)}
      )
      .then(
    this.setState({touch:false}),
    // this.inData(item.name)
      )
      setTimeout(function(){
      }, 3000);
      this.fetchData()
    // .then(this.fetchData())
    console.log('remove');
    }



    editData(item){
      this.setState({edit:true})
      this.setState({name:item.name,remainingAmountAtPaid:item.dAmount,paidAmountDate:item.paidAmountDate,intrestAtAmountPaid:item.dIntrest,paidIntrestDate:item.paidIntrestDate,amt:item.pAmount,intrest:item.intrest,date:item.fromDate,date1:item.toDate,paidAmount:item.paidAmount,paidIntrest:item.paidIntrest})
      tempAmount=item.pAmount
      // console.log('edit',item);

      // firebase.firestore().collection('user/'+x+'/amountData')
      // .doc(item.name)
      }



     async editAndUploadData(){
        if(this.process(this.state.date)>this.process(this.state.date1)){
          Alert.alert('Enter Proper Date')
        }
        else if(this.process(this.state.date)==this.process(this.state.date1)){
          Alert.alert('Date can not be same')
        }
        else if(this.state.amt.includes(',')  || this.state.amt.includes('-') || this.state.amt.includes(' ') || this.state.amt=='' ){
          Alert.alert('Enter Proper Amount')
        }
        else{
          this.setState({isLoading:true})
         await firebase.firestore().collection('user/'+x+'/amountData')
          .doc(this.state.name)
          .update({
            array: array.filter(array => array.pAmount !== tempAmount)
          })
          console.log(array);

         await firebase.firestore().collection('user/'+x+'/amountData')
          .doc(this.state.name)
          .update({
            array: firebase.firestore.FieldValue.arrayUnion({
              name:this.state.name,
              pAmount:this.state.amt,
              intrest:this.state.intrest,
              fromDate:this.state.date,
              toDate:this.state.date1,
              isComplete:false,
              paidAmount:this.state.paidAmount,
              paidIntrest:this.state.paidIntrest,
              paidIntrestDate:this.state.paidIntrestDate,
              remainingAmount:this.state.remainingAmountAtPaid,
              paidAmountDate:this.state.paidAmountDate,
              intrestAtAmountPaid:this.state.intrestAtAmountPaid
                })
        })
        .then(this.setState({edit:false}))
        // .then(this.inData(this.state.name))

      this.inData(this.state.name)
      this.setState({isLoading:false})

      }

  }

  async getAmount(){
    if(parseInt(tItem.remainingIntrest)>0)
    alert('Pay Intrest First for Pay Amount.')
    else if(this.state.tempPaidAmount=='' || parseFloat(this.state.tempPaidAmount)>parseFloat(tItem.remainingAmount) || parseFloat(this.state.tempPaidAmount)<=0)
      alert('Enter valid Amount.')
    else{
      this.setState({isLoading:true})
      await this.setState({name:tItem.name,intrestAtAmountPaid:tItem.curInt,paidIntrestDate:tItem.paidIntrestDate,amt:tItem.pAmount,intrest:tItem.intrest,date:tItem.fromDate,date1:tItem.toDate,paidIntrest:tItem.paidIntrest})
      tempAmount=tItem.pAmount
      await firebase.firestore().collection('user/'+x+'/amountData')
          .doc(this.state.name)
          .update({
            array: array.filter(array => array.pAmount !== tempAmount)
          })
          console.log(array);
          var p=parseFloat(this.state.tempPaidAmount)+parseFloat(tItem.paidAmount)

         await firebase.firestore().collection('user/'+x+'/amountData')
          .doc(this.state.name)
          .update({
            array: firebase.firestore.FieldValue.arrayUnion({
              name:this.state.name,
              pAmount:this.state.amt,
              intrest:this.state.intrest,
              fromDate:this.state.date,
              toDate:this.state.date1,
              isComplete:false,
               paidAmount:p,
              paidIntrest:this.state.paidIntrest,
              paidIntrestDate:this.state.paidIntrestDate,
              remainingAmount:parseFloat(this.state.amt)-parseFloat(p),
              paidAmountDate:cdate,
              intrestAtAmountPaid:this.state.intrestAtAmountPaid
                })
        })
        .then(this.setState({getamount:false,geting:false}))
        // .then(this.inData(this.state.name))

      this.inData(this.state.name)

    

      console.log('payyamount', tItem.pAmount, this.state.tempPaidAmount);
    this.setState({getamount:false})
      }
      this.setState({isLoading:false})

  }


 getTempInt(){
  if(this.state.month==7){
    this.setState({paidIntrestDate:this.state.tempDate1})
    return  this.customIntrest(this.state.tempDate,this.state.tempDate1,this.state.amt,this.state.intrest)
  }
  else{
    this.setState({paidIntrestDate:this.state.tempDate1})
    return  this.customIntrest(this.state.tempDate,this.addMonth(this.state.paidIntrestDate,this.state.month),this.state.amt,this.state.intrest)
    

  }

}
async getIndata(item){
  await this.setState({d1:item.toDate,remainingAmountAtPaid:item.dAmount,paidAmountDate:item.paidAmountDate,intrestAtAmountPaid:item.dIntrest,tempDate:item.paidIntrestDate,name:item.name,amt:item.pAmount,paidIntrestDate:item.paidIntrestDate,intrest:item.intrest,date:item.fromDate,date1:item.toDate,paidAmount:item.paidAmount,paidIntrest:item.paidIntrest})
  tempAmount=item.pAmount






}
  async getIntrest(){
    this.setState({isLoading:true})

    console.log('getinterere');
    var cint=await this.getTempInt()

    // if(this.state.tempPaidIntrest=='' || parseFloat(this.state.tempPaidIntrest)>parseFloat(tItem.remainingIntrest) || parseFloat(this.state.tempPaidIntrest)<=0)
    if(parseFloat(tItem.remainingIntrest)<parseFloat(cint))
    alert('You Are Paying Intrest Amount higher than Current Intrest.')
    else if(this.process(this.state.tempDate)>=this.process(this.state.tempDate1) )
    alert('Enter valid Date.')
    else {
      this.setState({isLoading:true})
    
  // else{
    console.log(cint);
    console.log('kljkjl',this.state.tempDate,this.state.tempDate1);
    console.log('kljasaskjl',this.state.date,this.state.date1,this.state.d1);
    console.log('this.state.paidIntrestDate',this.state.paidIntrestDate);
  //   // await this.setState({name:tItem.name,amt:tItem.pAmount,intrest:tItem.intrest,date:tItem.fromDate,date1:tItem.toDate,paidAmount:tItem.paidAmount})
    tempAmount=tItem.pAmount
    await firebase.firestore().collection('user/'+x+'/amountData')
        .doc(this.state.name)
        .update({
          array: array.filter(array => array.pAmount !== tempAmount)
        })
  //       console.log(array);
        var i=parseFloat(cint)+parseFloat(tItem.paidIntrest)
        this.setState({i:i})
       await firebase.firestore().collection('user/'+x+'/amountData')
        .doc(this.state.name)
        .update({
          array: firebase.firestore.FieldValue.arrayUnion({
            name:this.state.name,
            pAmount:this.state.amt,
            intrest:this.state.intrest,
            fromDate:this.state.date,
            toDate:this.state.d1,
            paidAmount:this.state.paidAmount,
             paidIntrest:i,
            paidIntrestDate:this.state.paidIntrestDate,
            isComplete:false,

            remainingAmount:this.state.remainingAmountAtPaid,
            paidAmountDate:this.state.paidAmountDate,
            intrestAtAmountPaid:this.state.intrestAtAmountPaid
            })
      })
      .then(this.setState({getintrest:false,geting:false}))
      // .then(alert('You Paid Total',this.state.i,'Intrest'))
  //     // .then(this.inData(this.state.name))

    this.inData(this.state.name)

  

    console.log('payyamount', tItem.pAmount, this.state.tempPaidAmount);
  this.setState({getintrest:false})
  this.setState({isLoading:false})

    }
  }
   async complete(item){
    console.log(item);
    await firebase.firestore().collection('user/'+x+'/amountData')
    .doc(item.name)
    .update({
      array: array.filter(array => array.pAmount !== item.pAmount)
    })
    await firebase.firestore().collection('user/'+x+'/amountData')
    .doc(item.name)
    .update({
      array: firebase.firestore.FieldValue.arrayUnion({
        name:item.name,
        pAmount:item.pAmount,
        intrest:item.intrest,
        fromDate:item.fromDate,
        toDate:item.toDate,
        paidAmount:item.paidAmount,
        paidIntrest:item.paidIntrest,
        paidIntrestDate:item.paidIntrestDate,
        remainingAmount:item.dAmount,
        paidAmountDate:item.paidAmountDate,
        intrestAtAmountPaid:item.dIntrest,
        isComplete:true
          })
  }).then(this.setState({touch:false}),
  this.fetchData())
  }



    render(){
       
        return(
            <View style={{height:height,width:width,backgroundColor:'#dcf3fb'}}>
                <FlatList
                  data={this.state.data}
                  onRefresh={()=>{this.fetchData()}}
                  refreshing={this.state.isFetching}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=>{this.inData(item.name),this.setState({touch:true})}}>
                      <View style={{borderRadius:35,backgroundColor:'#3787a5',marginHorizontal:10,elevation:5,flexDirection:'row',alignItems:'center',marginVertical:5,width:width-20,height:70}}>
                          <FontAwesome name='user-circle' style={{color:'white',opacity:0.5,marginLeft:10}} size={50} />
                          <View style={{marginLeft:10,flexDirection:'row',width:width-100}}> 
                            <View style={{}}> 
                              <Text style={{alignSelf:'flex-start',color:'white',fontWeight:'bold',fontFamily:'sans-serif-light'}}>{item.name}</Text>
                              <Text style={{alignSelf:'flex-start',fontSize:13,color:'white',fontWeight:'100',fontFamily:'monospace'}}>{item.total} TRANSECTION</Text>
                            </View>
                            {item.timeOver&&
                            // <Text style={{alignSelf:'center',position:'absolute'}}>done</Text>
                            <Feather name='check-circle' style={{color:'white',opacity:0.5,marginLeft:10}} size={50} />

                            }
                            <View style={{justifyContent:'flex-end',paddingTop:50,position:'absolute',marginTop:10,width:width-105}}>
                            <Text style={{color:'white',alignSelf:'flex-end',fontWeight:'normal',fontFamily:'sans-serif-light'}}>₹{item.tAmount}</Text>
                          </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                  )}
                />
                <View style={{position:'absolute',marginLeft:width-65,marginTop:height-280}}>
                    <TouchableOpacity onPress={()=>{console.log('+'),console.log(this.state.data),this.setState({plus:true,amt:0})}}>
                        <AntDesign name='pluscircle' style={{color:'#434852'}} size={50} />
                    </TouchableOpacity>
                </View>
                
                <Modal animationType='slide' transparent={true} visible={this.state.touch} onRequestClose={() => {this.setState({touch:false})}}>
                    <View style={{height:height,width:width,backgroundColor: '#434852',position:'absolute'}}/>

                        <View style={{flexDirection:'row',marginTop:30,alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>{console.log('X'),this.setState({touch:false})}}>
                            <Feather name='x' style={{color:'white',marginLeft:10}} size={30} />
                            </TouchableOpacity>
                            <View style={{alignItems:'center',justifyContent:'center',width:width,position:'absolute'}}>
                            <Text style={{color:'white',fontWeight:'bold',fontFamily:'',fontSize:18}}>{this.state.inname}</Text>
                            </View>

                        </View>
                        {/* <View style={{width:width,borderBottomWidth:0.1,borderBottomColor:'white',elevation:2,alignSelf:'center',marginTop:10}}/> */}
                        {/* <Text style={{alignSelf:'center',color:'#4EC1EC',fontWeight:'bold',fontFamily:'',fontSize:17,margin:10}}>Total intrest is {parseFloat(this.state.intamt.toString()).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text> */}

                        <View style={{marginBottom:5}} />

                        <FlatList
                            data={this.state.indata}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                              <View>
                                {/* <View style={{width:width,height:150,backgroundColor:'#434852',position:'absolute'}} /> */}
                                <View style={{width:width,height:370,backgroundColor:'#dcf3fb',borderRadius:40,elevation:5,position:'absolute'}} />

                                 <View style={{flexDirection:'row',marginBottom:10,marginTop:10,marginLeft:50,elevation:5}}>
                                 <TouchableOpacity onPress={()=>
                                 Alert.alert(
                                  "Complete Transection",
                                  "Are you sure you want to Complete Transection?",
                                  [
                                    
                                    {
                                      text: "Cancel",
                                      onPress: () => console.log("Cancel Pressed"),
                                      style: "cancel"
                                    },
                                    { text: "complete", 
                                    onPress: () => {console.log("OK Pressed"),this.complete(item)} }
                                  ],
                                  { cancelable: false }
                                )}>
                                    <Text style={{fontSize:18,fontWeight:'bold',fontFamily:'',color:'red'}}>Complete</Text>
                                    </TouchableOpacity>
                                    <View style={{marginLeft:30}}/>
                                 <TouchableOpacity onPress={()=>{tItem=item,this.setState({geting:true,tempAmount:item.remainingAmount,intamt:item.remainingIntrest}),this.getIndata(item)}}>
                                  <View style={{flexDirection:'row',marginRight:0}}>
                                    <Text style={{fontSize:18,fontWeight:'bold',fontFamily:'',color:'green'}}>Get </Text>
                                  <FontAwesome name='rupee' style={{marginTop:8,color:'green',}} size={18} />

                                  </View>
                                </TouchableOpacity>
                                <View style={{marginLeft:width/6}}/>

                                   <TouchableOpacity onPress={()=>{this.editData(item)}}>
                                      <FontAwesome name='pencil' style={{color:'black',}} size={30} />
                                    </TouchableOpacity>

                                  <View style={{marginLeft:25}} >
                                    <TouchableOpacity onPress={()=>{
                                      Alert.alert(
                                        "Delete",
                                        "Are you sure you want to delete?",
                                        [
                                          
                                          {
                                            text: "Cancel",
                                            onPress: () => console.log("Cancel Pressed"),
                                            style: "cancel"
                                          },
                                          { text: "Delete", 
                                          onPress: () => {console.log("OK Pressed"),this.removeData(item)} }
                                        ],
                                        { cancelable: false }
                                      );}}>
                                      <MaterialIcons name='delete' style={{color:'red',}} size={30} />
                                     </TouchableOpacity>
                                   </View>

                                </View>
                                {/* ////////////////////////////// */}
                                {item.timeOver&&
                            // <Text style={{alignSelf:'center',position:'absolute'}}>done</Text>
                            <View style={{justifyContent:'flex-start',alignItems:'center'}}>
                            <Feather name='check-circle' style={{color:'black',opacity:0.2,elevation:6,position:'absolute',marginLeft:10}} size={width/2} />
                                  </View>
                            }
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

                                <View style={{flexDirection:'row',marginBottom:10,alignItems:'center'}}>
                                  <FontAwesome name='rupee' style={{color:'black',}} size={25} />
                                  <View style={{marginLeft:20,justifyContent:'center',width:width/3}}>
                                    <Text style={{color:'grey'}}>Paid Intrest</Text>
                                    <ScrollView horizontal>
                                    <Text>{parseFloat(item.paidIntrest.toString()).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                    </ScrollView>
                                  </View>
                                </View>
                                {/* ///////////////////////////////// */}
                                <View style={{flexDirection:'row',marginBottom:10,alignItems:'center'}}>
                                  <FontAwesome name='rupee' style={{color:'black',}} size={25} />
                                  <View style={{marginLeft:20,justifyContent:'center',width:width/3}}>
                                    <Text style={{color:'grey'}}>Paid Amount</Text>
                                    <ScrollView horizontal>
                                    <Text>{parseFloat(item.paidAmount.toString()).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                    </ScrollView>
                                  </View>
                                </View>
                                {/* ///////////////////////////////// */}
                                
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
                                <View style={{flexDirection:'row',marginBottom:10,alignItems:'center'}}>
                                  <FontAwesome name='rupee' style={{color:'black',marginLeft:30}} size={25} />
                                  <View style={{marginLeft:20,justifyContent:'center'}}>
                                    <Text style={{color:'grey'}}>Remaining Intrest</Text>
                                    <View style={{width:width/3}}>
                                    <ScrollView horizontal>
                                    <Text>{parseFloat(item.remainingIntrest.toString()).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                    </ScrollView>
                                    </View>
                                  </View>
                                </View>
                                {/* //////////////////////////// */}
                                <View style={{flexDirection:'row',marginBottom:10,alignItems:'center'}}>
                                  <FontAwesome name='rupee' style={{color:'black',marginLeft:30}} size={25} />
                                  <View style={{marginLeft:20,justifyContent:'center'}}>
                                    <Text style={{color:'grey'}}>Remaining Amount</Text>
                                    <View style={{width:width/3}}>
                                    <ScrollView horizontal>
                                    <Text>{parseFloat(item.remainingAmount.toString()).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                    </ScrollView>
                                    </View>
                                  </View>
                                </View>
                                {/* /////////////////////////// */}
                                
                              </View>
                            </View>
                            <View style={{width:width-20,alignSelf:'center',borderBottomWidth:1,borderBottomColor:'grey',elevation:5}} />
                            <View style={{justifyContent:'flex-end',alignItems:'center',position:'relative',marginBottom:10,width:width-10,elevation:5}}>
                            <Text style={{alignSelf:'flex-end'}}>Total ₹{parseFloat(item.total.toString()).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                          </View>
                            <View style={{marginBottom:25,}} />

                            </View>
                            )}
                          />
{/* /////////////////////////////////////////// */}
                        
                  </Modal>





                <Modal animationType='slide' transparent={true} visible={this.state.plus} onRequestClose={() => {this.setState({plus:false})}}>
                    <View style={{height:height,width:width,backgroundColor: '#dcf3fb',position:'absolute'}}/>
                    <View style={{width:width,height:150,backgroundColor:'#434852',position:'absolute'}} />
                    <View style={{width:width,height:150,backgroundColor:'#dcf3fb',marginTop:100,borderRadius:50,position:'absolute'}} />

                    {/* <View style={{height:height,width:width,backgroundColor: 'white',position:'absolute'}}/> */}
                        <View style={{flexDirection:'row',marginTop:30,alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>{console.log('X'),this.setState({plus:false})}}>
                            <Feather name='x' style={{color:'white',marginLeft:10}} size={30} />
                            </TouchableOpacity>
                            
                            <Text style={{marginLeft:30,fontWeight:'bold',fontFamily:'',color:'white',fontSize:18}}>ADD</Text>
                            
                            <View style={{marginLeft:width-185}}>
                            <TouchableOpacity onPress={()=>{console.log('save');this.save()}}>
                            <Text style={{fontSize:17,color:'white'}}>SAVE</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{marginBottom:40}} />
                        <View style={{flexDirection:'row',marginTop:25}}>
                            <Ionicons name='ios-people' style={{color:'black',marginLeft:20}} size={25} />
                            <View style={{width:width-75,marginLeft:10,paddingLeft:10,borderBottomColor:'black',borderBottomWidth:1}}>
                            <TextInput style={{fontSize:15,width:width-75,color:'black'}}
                                    placeholder='Enter Name'
                                    keyboardType='ascii-capable'
                                    value={this.state.name}
                                    placeholderTextColor="#5F6368"
                                    onChangeText={(text) => this.setState({name:text})}
                            />
                            </View>
                        </View>
                        <View style={{flexDirection:'row',marginTop:25}}>
                            <FontAwesome name='rupee' style={{color:'black',marginLeft:20}} size={25} />
                            <View style={{width:width-75,marginLeft:20,paddingLeft:10,borderBottomColor:'black',borderBottomWidth:1}}>
                            <TextInput style={{fontSize:15,width:width-75,color:'black'}}
                                    placeholder='Enter Amount'
                                    keyboardType='number-pad'
                                    // value={this.state.amt}
                                    placeholderTextColor="#5F6368"
                                    onChangeText={(text) => {this.setState({amt:text})}}
                            />
                            </View>
                        </View>
                        {/* <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'₹'} value={123456789}/> */}
                        <Text style={{marginLeft:50}}>₹{parseFloat(this.state.amt.toString()).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                        
                        
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:10,}}>
                        <FontAwesome5 name='percentage' style={{color:'black',marginLeft:20}} size={25} />
                        <View style={{borderBottomColor:'black',marginLeft:10,borderBottomWidth:1}}>
                        <Picker
                            // style={{borderBottomColor:'black',borderBottomWidth:1}}
                            selectedValue={this.state.intrest}
                            style={{height: 50, width: width-70}}
                            onValueChange={(value) =>
                                {this.setState({intrest: value}),console.log(this.state.intrest);}
                            }>
                            {/* <Picker.Item label="0.5" value='0.5' /> */}
                            <Picker.Item label="1%" value="1" />
                            <Picker.Item label="1.25%" value="1.25" />
                            <Picker.Item label="1.5%" value="1.5" />
                            <Picker.Item label="1.75%" value="1.75" />
                            <Picker.Item label="2%" value="2" />
                            <Picker.Item label="2.25%" value="2.25" />
                            <Picker.Item label="2.5%" value="2.5" />
                            <Picker.Item label="2.75%" value="2.75" />
                            <Picker.Item label="3%" value="3" />
                            <Picker.Item label="3.25%" value="3.25" />
                            <Picker.Item label="3.5%" value="3.5" />
                            <Picker.Item label="3.75%" value="3.75" />
                            <Picker.Item label="4%" value="4" />
                        </Picker>
                        </View>
                        </View>




                        <View style={{flexDirection:'row'}}>
                        <Text style={{position:'absolute',marginTop:30,marginLeft:60}}>From</Text>
               
                        <DatePicker
                          style={{width: width-40,marginTop:20,marginLeft:20}}
                          date={this.state.date}
                          mode="date"   
                          placeholder="FROM"
                          format="DD-MM-YYYY"
                          minDate="01-01-1900"
                          maxDate={date}
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          customStyles={{
                            dateIcon: {
                              position: 'absolute',
                              left: 0,
                              top: 4,
                              marginLeft: -5
                            },
                            dateInput: {
                              marginLeft: 30,
                              borderWidth:0,
                              borderBottomWidth:1,
                              borderBottomColor:'black'
                            }
                            // ... You can check the source to find the other keys.
                          }}
                          onDateChange={(date) => {this.setState({date: date})}}
                        />
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{position:'absolute',marginTop:30,marginLeft:60}}>To</Text>
                        {this.state.date1===''&&
                        <Text style={{position:'absolute',elevation:2,color:'grey',marginTop:29,marginLeft:width/2-12,}}>To Date</Text>
                        }
                        <DatePicker
                        
                          style={{width: width-40,marginTop:20,marginLeft:20}}
                          date={this.state.date1}
                          mode="date"   
                          placeholder=" "
                          placeholderTextColor='black'
                          format="DD-MM-YYYY"
                          minDate={this.state.date}
                          maxDate="01-01-2100"
                          // confirmBtnText="Confirm"
                          // cancelBtnText="Cancel"
                          customStyles={{
                            dateIcon: {
                              position: 'absolute',
                              left: 0,
                              top: 4,
                              marginLeft: -5
                            },
                            dateInput: {
                              marginLeft: 30,
                              borderWidth:0,
                              borderBottomWidth:1,
                              borderBottomColor:'black'
                            }
                            // ... You can check the source to find the other keys.
                          }}
                          onDateChange={(date) => {this.setState({date1: date})}}
                        />               
                        </View>         
                </Modal>

{/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                <Modal animationType='slide' transparent={true} visible={this.state.edit} onRequestClose={() => {this.setState({edit:false})}}>
                    <View style={{height:height,width:width,backgroundColor: '#dcf3fb',position:'absolute'}}/>
                    <View style={{width:width,height:150,backgroundColor:'#434852',position:'absolute'}} />
                    <View style={{width:width,height:150,backgroundColor:'#dcf3fb',marginTop:100,borderRadius:50,position:'absolute'}} />

                    {/* <View style={{height:height,width:width,backgroundColor: 'white',position:'absolute'}}/> */}
                        <View style={{flexDirection:'row',marginTop:30,alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>{console.log('X'),this.setState({edit:false})}}>
                            <Feather name='x' style={{color:'white',marginLeft:10}} size={30} />
                            </TouchableOpacity>
                            
                            <Text style={{marginLeft:30,fontWeight:'bold',fontFamily:'',color:'white',fontSize:18}}>EDIT DATA</Text>
                            
                            <View style={{marginLeft:width-240}}>
                            <TouchableOpacity onPress={()=>{console.log('save');this.editAndUploadData()}}>
                            <Text style={{fontSize:17,color:'white'}}>SAVE</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{marginBottom:40}} />

                        <View style={{flexDirection:'row',marginTop:25}}>
                            <FontAwesome name='rupee' style={{color:'black',marginLeft:20}} size={25} />
                            <View style={{width:width-75,marginLeft:20,paddingLeft:10,borderBottomColor:'black',borderBottomWidth:1}}>
                            <TextInput style={{fontSize:15,width:width-75,color:'black'}}
                                    placeholder='Enter Amount'
                                    keyboardType='number-pad'
                                    value={this.state.amt}
                                    placeholderTextColor="#5F6368"
                                    onChangeText={(text) => {this.setState({amt:text})}}
                            />
                            </View>
                        </View>
                        {/* <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'₹'} value={123456789}/> */}
                        <Text style={{marginLeft:50}}>₹{parseFloat(this.state.amt.toString()).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                        
                        
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:10,}}>
                        <FontAwesome5 name='percentage' style={{color:'black',marginLeft:20}} size={25} />
                        <View style={{borderBottomColor:'black',marginLeft:10,borderBottomWidth:1}}>
                        <Picker
                            // style={{borderBottomColor:'black',borderBottomWidth:1}}
                            selectedValue={this.state.intrest}
                            style={{height: 50, width: width-70}}
                            onValueChange={(value) =>
                                {this.setState({intrest: value}),console.log(this.state.intrest);}
                            }>
                            {/* <Picker.Item label="0.5" value='0.5' /> */}
                            <Picker.Item label="1%" value="1" />
                            <Picker.Item label="1.25%" value="1.25" />
                            <Picker.Item label="1.5%" value="1.5" />
                            <Picker.Item label="1.75%" value="1.75" />
                            <Picker.Item label="2%" value="2" />
                            <Picker.Item label="2.25%" value="2.25" />
                            <Picker.Item label="2.5%" value="2.5" />
                            <Picker.Item label="2.75%" value="2.75" />
                            <Picker.Item label="3%" value="3" />
                            <Picker.Item label="3.25%" value="3.25" />
                            <Picker.Item label="3.5%" value="3.5" />
                            <Picker.Item label="3.75%" value="3.75" />
                            <Picker.Item label="4%" value="4" />
                        </Picker>
                        </View>
                        </View>




                        <View style={{flexDirection:'row'}}>
                        <Text style={{position:'absolute',marginTop:30,marginLeft:60}}>From</Text>
               
                        <DatePicker
                          style={{width: width-40,marginTop:20,marginLeft:20}}
                          date={this.state.date}
                          mode="date"   
                          placeholder="FROM"
                          format="DD-MM-YYYY"
                          minDate="01-01-1900"
                          maxDate={date}
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          customStyles={{
                            dateIcon: {
                              position: 'absolute',
                              left: 0,
                              top: 4,
                              marginLeft: -5
                            },
                            dateInput: {
                              marginLeft: 30,
                              borderWidth:0,
                              borderBottomWidth:1,
                              borderBottomColor:'black'
                            }
                            // ... You can check the source to find the other keys.
                          }}
                          onDateChange={(date) => {this.setState({date: date})}}
                        />
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{position:'absolute',marginTop:30,marginLeft:60}}>To</Text>
                        {this.state.date1===''&&
                        <Text style={{position:'absolute',elevation:2,color:'grey',marginTop:29,marginLeft:width/2-12,}}>To Date</Text>
                        }
                        <DatePicker
                        
                          style={{width: width-40,marginTop:20,marginLeft:20}}
                          date={this.state.date1}
                          mode="date"   
                          placeholder=" "
                          placeholderTextColor='black'
                          format="DD-MM-YYYY"
                          minDate={this.state.date}
                          maxDate="01-01-2100"
                          // confirmBtnText="Confirm"
                          // cancelBtnText="Cancel"
                          customStyles={{
                            dateIcon: {
                              position: 'absolute',
                              left: 0,
                              top: 4,
                              marginLeft: -5
                            },
                            dateInput: {
                              marginLeft: 30,
                              borderWidth:0,
                              borderBottomWidth:1,
                              borderBottomColor:'black'
                            }
                            // ... You can check the source to find the other keys.
                          }}
                          onDateChange={(date) => {this.setState({date1: date})}}
                        />               
                        </View>         
                </Modal>
{/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                  <Modal animationType='slide' transparent={true} visible={this.state.geting} onRequestClose={() => {this.setState({geting:false})}}>
                    <View style={{height:height,width:width,backgroundColor: '#dcf3fb',position:'absolute'}}/>
                    

                    {/* <View style={{height:height,width:width,backgroundColor: 'white',position:'absolute'}}/> */}
                        <View style={{flexDirection:'row',marginTop:30,alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>{console.log('X'),this.setState({geting:false})}}>
                            <Feather name='x' style={{color:'black',marginLeft:10}} size={30} />
                            </TouchableOpacity>
                            
                            <Text style={{marginLeft:30,fontWeight:'bold',fontFamily:'',color:'black',fontSize:18}}>GETTING MONEY</Text>
                            
                        </View>
                        <View style={{marginBottom:40}} />
                        <TouchableOpacity onPress={()=>{this.setState({getintrest:true})}}>
                        <View style={{backgroundColor:'#434852',alignSelf:'center',alignItems:'center',justifyContent:'center',width:width-10,height:50,borderRadius:25}}>
                            <Text style={{color:'white',fontSize:18}}>Get Intrest</Text>
                        </View>
                        </TouchableOpacity>
                        <View style={{marginBottom:20}} />

                        <TouchableOpacity onPress={()=>{this.setState({getamount:true})}}>
                        <View style={{backgroundColor:'#434852',alignSelf:'center',alignItems:'center',justifyContent:'center',width:width-10,height:50,borderRadius:25}}>
                            <Text style={{color:'white',fontSize:18}}>Get Amount</Text>
                        </View>
                        </TouchableOpacity>

    

                </Modal>
                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                <Modal animationType='none' transparent={true} visible={this.state.getintrest} onRequestClose={() => {this.setState({getintrest:false})}}>
                    <View style={{height:height,width:width,backgroundColor: '#dcf3fb',position:'absolute'}}/>
                    

                    {/* <View style={{height:height,width:width,backgroundColor: 'white',position:'absolute'}}/> */}
                        <View style={{flexDirection:'row',marginTop:30,alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>{console.log('X'),this.setState({getintrest:false})}}>
                            <Ionicons name='arrow-back' style={{color:'black',marginLeft:10}} size={30} />
                            </TouchableOpacity>
                            
                            <Text style={{marginLeft:30,fontWeight:'bold',fontFamily:'',color:'black',fontSize:18}}>GETTING INTREST</Text>
                            <View style={{marginLeft:width-330}}>
                            <TouchableOpacity onPress={()=>{console.log('save');this.getIntrest()}}>
                            <Text style={{fontSize:17,color:'black'}}>SAVE</Text>
                            </TouchableOpacity>
                            </View>
                            
                        </View>
                        <View style={{marginBottom:40}} />



                          <View style={{flexDirection:'row',alignItems:'center',marginTop:10,}}>
                        <FontAwesome name='calendar' style={{color:'black',marginLeft:20}} size={25} />
                        <View style={{borderBottomColor:'black',marginLeft:10,borderBottomWidth:1}}>
                        <Picker
                            // style={{borderBottomColor:'black',borderBottomWidth:1}}
                            selectedValue={this.state.month}
                            style={{height: 50, width: width-70}}
                            onValueChange={(value) =>
                                {this.setState({month: value,date1:''}),console.log(this.state.month);}
                            }>
                            {/* <Picker.Item label="0 " value='0.5' /> */}
                            <Picker.Item label="1 Month" value="1" />
                            <Picker.Item label="2 Month" value="2" />
                            <Picker.Item label="3 Month" value="3" />
                            <Picker.Item label="4 Month" value="4" />
                            <Picker.Item label="5 Month" value="5" />
                            <Picker.Item label="6 Month" value="6" />
                            <Picker.Item label="Custom" value="7" />
                        </Picker>
                        </View>
                        </View>
                        {this.state.month==7&&
                        <View>
                          <View style={{flexDirection:'row'}}>
                        <Text style={{position:'absolute',marginTop:30,marginLeft:60}}>From</Text>
               
                        <DatePicker
                          style={{width: width-40,marginTop:20,marginLeft:20}}
                          date={this.state.tempDate}
                          mode="date"   
                          placeholder="FROM"
                          format="DD-MM-YYYY"
                          minDate={this.state.tempDate}
                          maxDate={date}
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          customStyles={{
                            dateIcon: {
                              position: 'absolute',
                              left: 0,
                              top: 4,
                              marginLeft: -5
                            },
                            dateInput: {
                              marginLeft: 30,
                              borderWidth:0,
                              borderBottomWidth:1,
                              borderBottomColor:'black'
                            }
                            // ... You can check the source to find the other keys.
                          }}
                          onDateChange={(date) => {console.log(this.state.tempDate);}}
                        />
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{position:'absolute',marginTop:30,marginLeft:60}}>To</Text>
                        {this.state.tempDate1===''&&
                        <Text style={{position:'absolute',elevation:2,color:'grey',marginTop:29,marginLeft:width/2-12,}}>To Date</Text>
                        }
                        <DatePicker
                        
                          style={{width: width-40,marginTop:20,marginLeft:20}}
                          date={this.state.tempDate1}
                          mode="date"   
                          placeholder=" "
                          placeholderTextColor='black'
                          format="DD-MM-YYYY"
                          minDate={this.state.tempDate}
                          maxDate={cdate}
                          // confirmBtnText="Confirm"
                          // cancelBtnText="Cancel"
                          customStyles={{
                            dateIcon: {
                              position: 'absolute',
                              left: 0,
                              top: 4,
                              marginLeft: -5
                            },
                            dateInput: {
                              marginLeft: 30,
                              borderWidth:0,
                              borderBottomWidth:1,
                              borderBottomColor:'black'
                            }
                            // ... You can check the source to find the other keys.
                          }}
                          onDateChange={(date) => {this.setState({tempDate1: date})}}
                        />               
                        </View>    
                        </View>
                        }
                        <Text style={{marginLeft:50,marginTop:10}}>Remaining Intrest: ₹{parseFloat(this.state.intamt.toString()).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                        
    

                </Modal>
   {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                  <Modal animationType='none' transparent={true} visible={this.state.getamount} onRequestClose={() => {this.setState({getamount:false})}}>
                    <View style={{height:height,width:width,backgroundColor: '#dcf3fb',position:'absolute'}}/>
                    

                    {/* <View style={{height:height,width:width,backgroundColor: 'white',position:'absolute'}}/> */}
                        <View style={{flexDirection:'row',marginTop:30,alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>{console.log('X'),this.setState({getamount:false})}}>
                            <Ionicons name='arrow-back' style={{color:'black',marginLeft:10}} size={30} />
                            </TouchableOpacity>
                            
                            <Text style={{marginLeft:30,fontWeight:'bold',fontFamily:'',color:'black',fontSize:18}}>GETTING AMOUNT</Text>
                            <View style={{marginLeft:width-330}}>
                            <TouchableOpacity onPress={()=>{console.log('save');this.getAmount()}}>
                            <Text style={{fontSize:17,color:'black'}}>SAVE</Text>
                            </TouchableOpacity>
                            </View>
                            
                        </View>
                        <View style={{marginBottom:40}} />
                        <View style={{flexDirection:'row',marginTop:25}}>
                            <FontAwesome name='rupee' style={{color:'black',marginLeft:20}} size={25} />
                            <View style={{width:width-75,marginLeft:20,paddingLeft:10,borderBottomColor:'black',borderBottomWidth:1}}>
                            <TextInput style={{fontSize:15,width:width-75,color:'black'}}
                                    placeholder='Enter Amount'
                                    keyboardType='number-pad'
                                    // value={this.state.tempPaidAmount}
                                    placeholderTextColor="#5F6368"
                                    onChangeText={(text) => {this.setState({tempPaidAmount:text})}}
                            />
                            </View>
                        </View>
                        <Text style={{marginLeft:50}}>₹{parseFloat(this.state.tempPaidAmount.toString()).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>


                        <Text style={{marginLeft:50,marginTop:10}}>Remaining Amount: ₹{parseFloat(this.state.tempAmount.toString()).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                        {/* <View style={{backgroundColor:'#434852',marginTop:20,alignSelf:'center',alignItems:'center',justifyContent:'center',width:width-10,height:50,borderRadius:25}}>
                            <Text style={{color:'white',fontSize:18}}>Get Amount</Text>
                        </View> */}

    

                </Modal>
{/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
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