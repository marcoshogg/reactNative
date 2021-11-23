import React, {Component} from 'react';
import {Text, TouchableOpacity, View, TextInput, StyleSheet, Modal, Image, FlatList, ActivityIndicator } from 'react-native';
import {auth} from '../firebase/config'
import { db } from '../firebase/config';
import firebase from 'firebase'
import {Ionicons} from '@expo/vector-icons'


class Post extends Component {
  constructor(props){
    super(props),
    this.state={
      likes: this.props.likes.length,
      liked: this.props.likes.includes(auth.currentUser.email),
      comentarios: this.props.comentarios,
      comentario:'',
      showModal: false,
      showLikes: false,
      likesArray: this.props.likes
      
    } }
 
  
like(){
 console.log(this.props.item.photo)
 console.log(auth.currentUser.email);
 console.log(this.props.likes);
 console.log(this.props.likes.length);
db.collection("Posts").doc(this.props.id).update({
  'likes': firebase.firestore.FieldValue.arrayUnion(auth.currentUser.displayName)
})
.then(() => {
  console.log("Document successfully updated!");
  console.log(this.props.likes);
  let like = this.props.likes.includes(auth.currentUser.displayName)
  this.setState({
  likes: this.props.likes.length,
  liked: like,
  likesArray : this.props.likes
})
});
}


unLike(){
  db.collection("Posts").doc(this.props.id).update({
    'likes': firebase.firestore.FieldValue.arrayRemove(auth.currentUser.displayName)
  })
  .then(() => {
    let like = this.props.likes.includes(auth.currentUser.displayName)
    console.log("Document successfully updated!");
    this.setState({
    likes: this.props.likes.length,
    liked: like,
    likesArray : this.props.likes
  })
  });
}


verLikes(){
  console.log(this.state.likesArray);
  this.state.showLikes ? 
  this.setState({
    showLikes: false
  })
  :
  this.setState({
    showLikes : true
  })
}


agregarComentario(){
  let miComentario = {
    author: auth.currentUser.displayName,
    createdAt: Date.now(),
    textoComentado: this.state.comentario
  }

  console.log(this.state.comentario);
  db.collection("Posts").doc(this.props.id).update({
    'comentarios': firebase.firestore.FieldValue.arrayUnion(miComentario)
  })
  
  .then(() => {
    console.log("Document successfully updated!");
    console.log(this.props.comentarios);
    this.setState({
      comentario: '',
      comentarios: this.props.comentarios
    })
    
  });
}


showModal(){
  console.log(this.props.comentarios);
  console.log(this.state.comentarios.length);
  this.state.showModal ? 
  this.setState({
    showModal: false
  })
  :
  this.setState({
    showModal : true
  })
}

eliminar(){
  db.collection("Posts").doc(this.props.id).delete().then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});
}



 render(){
   console.log(this.props.item.data.photo);
   console.log(this.state.likesArray);
   return(
     
      
    <View style={styles.container}>
      <View style={styles.post}> 
      <View style={styles.headerPost}>
        <View style={styles.headerUser}>
          {/* <Ionicons style={styles.avatar} name='person-circle-outline' size='28px' /> */}
          <Image style={styles.imageAvatar}
          
          source={{uri:this.props.item.data.userPhoto
          }}
          resizeMode={'contain'}/>
          <Text style={styles.usuario}>{this.props.ownerName}</Text> 
        </View>
      
                      
                      {this.props.ownerEmail == auth.currentUser.email ? 
                      <TouchableOpacity onPress={()=>this.eliminar()}>
                      {/* <Text style={styles.eliminar}>X</Text> */}
                      <Ionicons name='trash' size='16px'/>
                    </TouchableOpacity>
                    :
                    null
                    }
      </View>
          
          {/* Imagen */}
          <Image style={styles.image}
          
          source={{uri:  this.props.item.data.photo
          }}
          resizeMode={'contain'}/>

          <View style={styles.likesYComments}>
            <View style={styles.likes} >

                {/* LIKES */}

        {this.state.liked ?
            <TouchableOpacity onPress={()=>this.unLike()}>
              {/* <Text style={styles.liked}>MG</Text> */}
              <Ionicons name='heart' size='30px' color='red' />
            </TouchableOpacity>
        :
            <TouchableOpacity onPress={()=>this.like()}>
              {/* <Text style={styles.texto}>MG</Text> */}
              <Ionicons name='heart-outline' size='30px'  />

            </TouchableOpacity>
        }

           
            </View>
            <View style={styles.comments} >
              <Ionicons onPress={()=> this.showModal()} name='chatbubble-outline' size='30px' color='gray' />
              {/* <Text onPress={()=> this.showModal()}>{this.state.comentarios.length }</Text> */}
              
            </View>
              </View>
            <TouchableOpacity onPress={()=>this.verLikes()} > 
              <Text>{this.state.likes} Likes</Text>
            </TouchableOpacity>

        {this.state.showLikes ?
              <Modal visible={this.state.showLikes} animationType="fade" transparent={false}>
                <FlatList data={this.state.likesArray} keyExtractor={user=> user} renderItem={({item})=>
                  <Text>{item}</Text>}>
                  </FlatList>
                              
              </Modal>
        :
              <Text></Text>
        }


          
          
          <View>
          <Text style={styles.usuario} > {this.props.ownerName} : {this.props.textoPost}</Text>
          </View>
          
           {/* COMENTARIOS */} 
           <TouchableOpacity onPress={()=> this.showModal()} >
        {this.state.showModal?
              <Text> Ocultar Comentarios </Text>
        :
        this.state.comentarios.length == 0 ? 
          <Text> Sé el primero en opinar</Text>
          :

         <Text> Ver {this.state.comentarios.length } Comentarios</Text>
       

              
        } 
            </TouchableOpacity>

          {this.state.showModal ? 
              <Modal style={styles.comentarios} visible={this.state.showModal}
                    animationType="fade"
                    transparent={false}>
                  <View>
                                {/* <Text>{this.state.comentarios}</Text> */}
                                {/* {this.state.comentarios.map((comentario, idx)=> <Text key={idx}>{comentario.textoComentado}</Text>)}  */}
                     
                       <FlatList data={this.state.comentarios} keyExtractor={comentario=> comentario.createdAt.toString()} renderItem={({item})=>
                              <Text>{item.author} : {item.textoComentado}</Text> }>
                      </FlatList>

                        <TextInput
                              //  style={styles.input} 
                              keyboardType='default'
                              value= {this.state.comentario}
                              placeholder= 'escriba su comentario'
                              onChangeText={ text => this.setState({comentario:text})}
                              multiline
                               //  onSubmit={ text => this.agregarComentario(text)}
                        />
                         <TouchableOpacity disabled={this.state.comentario == ''}  onPress={()=> this.agregarComentario()}>
                            <Text style={this.state.comentario == ''? styles.comentarioDisabled: styles.comentario}>Comentar</Text> 
                        </TouchableOpacity>
                  </View>
              </Modal>
          :
                <Text></Text>
          }


         

      
        
        <Text style={styles.date} >{this.props.item.data.createdDate}</Text>
        {/* {Date(this.props.item.data.createdAt) } */}
    </View>
    </View>
    
   
  )}
}
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
  
  },
  post: {
    backgroundColor: '#fff',
    padding: '10px',
    margin: '10px',
    borderRadius: 10
  },
  headerPost: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerUser: {
    flexDirection: 'row',
    
  },
  usuario: {
    fontWeight: 'bold',
    marginTop: '5px',
    // textTransform: 'uppercase'
    // marginLeft:'5px'
    
  },
  
  avatar: {
   marginRight:'5px',
   marginBottom: '6px'
    
  },
  eliminar: {
    // fontWeight: 'bold',
    fontSize: '12px',
    color: 'red'
    
  },
  
    image:{
      height:"300px",
      width:"300px",
      margin:'auto'
  },

  
    imageAvatar:{
      height:"25px",
      width:'25px',
      margin:'auto',
      marginRight:'5px',
   marginBottom: '6px',
   borderRadius: '50%',
   borderColor:'grey',
   borderWidth: '1px'
  },
  likesYComments : {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginVertical: '3px',
    // marginLeft:'8px'
  },
  likes:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '15%'

  
  },
  comments:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginLeft:'5px'
    },
  texto:{
    width:'fitcontent',
    justifyContent: 'center',
    fontStyle: 'bold',
  
  },
  liked:{
    color: 'red'
  },
  comentarios:{
    width: '75%',
    marginVertical:'5px'

  },
  comentarioDisabled:{
    color: 'grey'

  },
  comentario:{
    color: 'black'

  },
  date:{
    fontSize:'12px',
    color: 'grey'
  }
});

export default Post; 
