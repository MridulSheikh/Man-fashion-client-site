import axios from "axios";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseInitialize from "../Firebase/firebase.init";

firebaseInitialize()

const useFirebase = () =>{

const [user, setUser] = useState({});
const [error, setError] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [loacluser, setLocaluser] = useState({});

//google probider
const Googleprovider = new GoogleAuthProvider();

//auth creator
const auth = getAuth();

const singinWithGoogle = () => {
    signInWithPopup(auth, Googleprovider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const data = result.user;
        const isReg = getUser(data.email)
        if(isReg == null){
          saveUser(data.displayName, data.email, null, data.photoURL)
        }
        getUser(data.email)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        setError(error.code)
        // ...
      });
}

const logout = () => {
  signOut(auth).then(() => {
    setLocaluser({});
  }).catch((error) => {
    // An error happened.
  });
}

useEffect(()=>{
  onAuthStateChanged(auth, user =>{
      if (user) {
          getUser(user.email)
        } 
  })
},[])

//password authentication
const singUpwithpass = async (email, password, name, address, img) =>{
  setError(false)
  setIsLoading(true)
  createUserWithEmailAndPassword(auth, email, password)
  .then( async (userCredential) => {
    // Signed in 
    if(userCredential.user){
      saveUser(name, email, address, img)
    }
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setError(errorMessage)
  })
  .finally(()=>setIsLoading(false))
}

const singInwitpass = (email, password) =>{
  setError(false)
  setIsLoading(true)
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    getUser(user.email)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setError(errorCode)
    // ..
  })
  .finally(()=>setIsLoading(false))
}

//save user inforamation
const saveUser = (name, email, address, photo) =>{
  const imgbbkey = "e09f83c95842d0cbd98bf818d814146f";
  const formData = new FormData();
    formData.append('image', photo);
  const uri = `https://api.imgbb.com/1/upload?key=${imgbbkey}`
  fetch(uri, {
    method : "POST",
    body : formData
  })
  .then(res => res.json())
  .then(result => {
    const url = "http://localhost:5000/api/v1/user"
    axios.post(url, {
      displayName : name,
      email : email,
      address : address,
      imgUrl : result.data.url,
    })
    .then(function (response) {
      getUser(email)
    })
    .catch(function (error) {
      console.log(error);
    });
  })
}

//get user
  const getUser = (email) => {
    axios.get(`http://localhost:5000/api/v1/user/${email}`)
    .then(function (response) {
      // handle success
      setLocaluser(response.data);
    })
    .catch(function (error) {
      // handle error
      setError(error.message);
    })
  }
  



// //set userimg
// const uploadimg = (photo) => {
//   const imgbbkey = "e09f83c95842d0cbd98bf818d814146f";
//   const formData = new FormData();
//     formData.append('image', photo);
//   const uri = `https://api.imgbb.com/1/upload?key=${imgbbkey}`
//   fetch(uri, {
//     method : "POST",
//     body : formData
//   })
//   .then(res => res.json())
//   .then(result => {
//         setPhoto(result.data.url)
//   })
// }


return{
    singinWithGoogle,
    user,
    logout,
    singUpwithpass,
    singInwitpass,
    error,
    isLoading,
    loacluser
}
}

export default useFirebase;