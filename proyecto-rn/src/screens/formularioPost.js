import { NavigationContainer } from '@react-navigation/native';
import React, {Component} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, FlatList, ActivityIndicator, TextInput } from 'react-native';
import {auth} from '../firebase/config'
import { db } from '../firebase/config';
import MyCamera from '../components/MyCamera'





class formularioPost extends Component {
  constructor(props){
    super(props),
    this.state={
      email:'',
      textoPost: '',
      userName: '',
      likes: {},
      comments: {},
      showCamera: true,
      url: ''
    } }
 

onSubmit(){
      console.log('posteando');
      var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();


      db.collection('Posts').add({
          ownerEmail:auth.currentUser.email,
          ownerName: auth.currentUser.displayName,
        createdAt: Date.now(),
        createdDate:day + '-' + month + '-' + year ,
        textoPost: this.state.textoPost,
        likes: [],
        comentarios: [],
        photo : this.state.url,
        userPhoto: auth.currentUser.photoURL

      })
      .then(()=>{
        console.log('posteado ok');
        this.setState({
          textoPost:'',
          showCamera: true
        })
      //redirect
      this.props.drawerProps.navigation.navigate('Home')
      })
      .catch( error => console.log(error))

}

onImageUpload(url){
this.setState({
  showCamera: false,
  url : url
})
}

cancelar(){
  this.setState({
    showCamera: true
  })
}

componentWillUnmount(){
  console.log('me desmonte');
}
 render(){
   return(
     <React.Fragment>
       {
         this.state.showCamera ? 
         <MyCamera  onImageUpload = {(url) => this.onImageUpload(url)}/>
         :

         <View style={styles.formContainer}>

          <Image style={styles.image}
          
          source={{uri: this.state.url
          }}
          resizeMode={'contain'}/>
    <Text>Crea un nuevo post</Text>
  
     <TextInput
     style={styles.input} 
     keyboardType='default'
     placeholder='Escriba aqui'
     secureTextEntry={true}
     onChangeText={ text => this.setState({textoPost:text}) }
     multiline
     value= {this.state.textoPost}/> 
    
     
     <TouchableOpacity disabled={this.state.textoPost == ''} style={this.state.textoPost == ''? styles.buttonDisabled : styles.button} onPress={() => this.onSubmit()}>
         <Text> Postear </Text> 
     </TouchableOpacity> 
     <TouchableOpacity style={styles.button} onPress={() => this.cancelar()}>
         <Text> cancelar </Text> 
     </TouchableOpacity> 

    
     
</View>
       }
    
</React.Fragment>
   
  )}
}
 

const styles = StyleSheet.create({
  formContainer:{
      paddingHorizontal:10,
      marginTop: 20,
  },
  input:{
      
      paddingVertical:15,
      paddingHorizontal: 10,
      borderWidth:1,
      borderColor: '#ccc',
      borderStyle: 'solid',
      borderRadius: 6,
      marginVertical:10,
  },
  button:{
      backgroundColor:'#28a745',
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: 'center',
      borderRadius:4, 
      borderWidth:1,
      borderStyle: 'solid',
      borderColor: '#28a745'
  },
  buttonDisabled:{
      backgroundColor:'grey',
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: 'center',
      borderRadius:4, 
      borderWidth:1,
      borderStyle: 'solid',
      borderColor: '#28a745'
  },
  textButton:{
      color: '#fff'
  },
  alerta:{
    color: 'red'
  },
  image:{
    height:"300px",
    width:"300px",
    margin:'auto'
}

})

export default formularioPost; 