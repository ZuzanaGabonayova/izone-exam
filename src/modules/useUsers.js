import { ref } from 'vue'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const useUsers = () => {
    const auth = getAuth();
    const email = ref('');
    const password = ref('');
    const user = ref(null);

    const logIn = () => {
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            user.value = userCredential.user;
            console.log("userInfo", user.value.email);
            localStorage.setItem("UserLoginInfoFirebase", user.value.email);
            console.log(localStorage.getItem("UserLoginInfoFirebase"));
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode === 'auth/wrong-password'){
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
        });
    }

    const logOut = () => {
        signOut(auth).then(() => {
            user.value = null;
        }).catch((error) => {
            console.log(error);
        });
    }

const isLoggedin = ref(false)

const isLoggedInTest = () => {
    const auth = getAuth();

    user.value = auth.currentUser
    onAuthStateChanged(auth, (user) => {
      if(user) {
        isLoggedin.value = true
      }
      else {
        isLoggedin.value = false
      }
    })
}


    return{
        email,
        password,
        user,
        auth,
        logIn,
        logOut,
        isLoggedin,
        isLoggedInTest
    }
}

export default useUsers