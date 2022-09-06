import axios from "axios";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import firebaseInitialize from "../Firebase/firebase.init";

firebaseInitialize()

const useFirebase = () =>{

const [user, setUser] = useState({});
const [error, setError] = useState("");
const [isLoading, setIsLoading] = useState(false);

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
        //set user on userstate
        console.log(result)
        setUser(data);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        setError(error.code)
        // ...
      });
}

const logout = () => {
  signOut(auth).then(() => {
    setUser({});
  }).catch((error) => {
    // An error happened.
  });
}

useEffect(()=>{
  onAuthStateChanged(auth, user =>{
      if (user) {
          setUser(user)
        } 
  })
},[])

//password authentication
const singUpwithpass = (email, password, name, address) =>{
  setError(false)
  setIsLoading(true)
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    if(userCredential.user){
      saveUser(name, email, address)
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
    setUser(user)
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
const saveUser = (name, email, address) =>{
  const url = "http://localhost:5000/api/v1/user"
  axios.post(url, {
    displayName : name,
    email : email,
    address : address,
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}



return{
    singinWithGoogle,
    user,
    logout,
    singUpwithpass,
    singInwitpass,
    error,
    isLoading
}
}

export default useFirebase;