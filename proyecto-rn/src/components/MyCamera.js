import React , {Component} from 'react'
import {Text, ReactFragment, TouchableOpacity, View, ActivityIndicator, StyleSheet, Modal, Image, FlatList } from 'react-native';
import {Camera} from 'expo-camera'
import {db, storage} from '../firebase/config'
import {Ionicons} from '@expo/vector-icons'

class MyCamera extends Component {
  constructor(props){
    super(props),
    this.state={
      permission: false,
      photo:'',
      mounted: false,
      done: false
     
    } 
  this.camera
  }

  componentDidMount(){
    // this.setState({
    //   mounted: true
    // })
    Camera.requestCameraPermissionsAsync()
    .then(()=>{
      this.setState({
        permission : true,
        mounted: true
        
      }
      )
    })
    .catch(error => console.log(error))
  }

  takePicture(){
    console.log('saca foto');
    this.camera.takePictureAsync()
    .then(photo => {
      this.setState({
        photo: photo.uri
      })
    })
  }

  rechazar(){
    this.setState({
      photo: ''
    })
  }

  savePhoto(){
    fetch(this.state.photo)
    .then( res => res.blob())
    .then( image => {
      const ref = storage.ref(`photos/${Date.now()}.jpg`)
      ref.put(image)
      .then(()=> {
        ref.getDownloadURL()
        .then(url => {
          this.props.onImageUpload(url)
          this.setState({
            photo : '',
            done: true
          })
        }
        )
        .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
      // Guardar imagen en el storage
      // Darle un nombre a la imagen ya que estaba guardada con url temporal
      // Subirla al sotrage
      // tomar url publica y pasarla al form de carga de posteo
    })
    .catch(error => console.log(error))


  }

    render(){
      return(
        <React.Fragment>

          {
            this.state.mounted? 

            this.state.permission ?

            this.state.photo ?
            // this.state.done ?
            // <ActivityIndicator size="large"/>
            // :

            
             <React.Fragment>
               <Image
               style={styles.preview}
               source = {{uri : this.state.photo}} 
               />
               <View style={styles.actionArea} >
               <TouchableOpacity style={styles.botonAceptar} onPress={()=>this.savePhoto()}>
          
            <Text style={styles.texto}>Aceptar</Text>
           
          
                 
               </TouchableOpacity>
               <TouchableOpacity style={styles.botonRechazar} onPress={()=> this.rechazar()} >
                 <Text style={styles.texto}>Rechazar</Text>
               </TouchableOpacity>
               
               </View>
             </React.Fragment> 
            :

            <React.Fragment>
            <Camera 
            style={styles.cameraBody}
            type={Camera.Constants.Type.back}
            ref={reference => this.camera = reference}
            />
            <TouchableOpacity
            style={styles.button} onPress={()=>this.takePicture()}>
              <Ionicons name='camera' size='50px' style={styles.camera}/>
            </TouchableOpacity>
          
            </React.Fragment>
            :
            <Text>no hay permiso para usar la camara</Text>
          
            :
            <ActivityIndicator size="large"/>
           } 
          
        </React.Fragment>
        
        
      )
    }





  }

  const styles = StyleSheet.create({

    cameraBody:{
      flex: 7
    },
    button:{
      flex:1
    },
    preview:{
      flex: 7
    },
    actionArea:{
      flex:1,
      flexDirection:'row',
      justifyContent: 'space-around'
    },
    camera:{
      justifyContent:'center',
      margin:'auto'
    },
    botonAceptar:{
        backgroundColor:'#28a745',
        margin: 'auto',
        textAlign: 'center',
        borderRadius:4, 
        width: '30%',
        height: '70%'
    },
    botonRechazar:{
      backgroundColor:'red',
      margin: 'auto',
      textAlign: 'center',
      borderRadius:4, 
      width: '30%',
      height: '70%'
  },
    texto:{
      margin: 'auto'
    }
  })
  export default MyCamera