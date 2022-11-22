import { ref } from 'vue'
import { db } from '../firebase.js'
import { collection, onSnapshot, /* getDocs, */ deleteDoc, doc, addDoc, updateDoc  } from 'firebase/firestore'
import { uploadBytesResumable, getDownloadURL, ref as firebaseRef } from "firebase/storage";
import { auth, storage } from '../firebase'
const useDevices = () => {

    const devices = ref([])
    const deviceDataRef = collection(db, "devices");
    const AddItemData = ref({})

    let snackbarAdd = ref(false)
    let snackbarEdit = ref(false)
    let snackbarDelete = ref(false)

    //grab data from firebase
    const getDevicesData = () => {
        onSnapshot(deviceDataRef, (snapshot) => {
            devices.value = snapshot.docs.map(doc =>{
            return {
                ...doc.data(),
                id: doc.id
            }
            })
        })
    }

    const uploadImage = async (e) => {
    
        if (auth.currentUser) {  
            const file = e.target.files[0];
            const storageRef = firebaseRef(storage, 'mapImages/' + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            /* const imgURL = ref('') */
      
            uploadTask.on('state_changed',
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                  case 'paused':
                    console.log('Upload is paused');
                    break;
                  case 'running':
                    console.log('Upload is running');
                    break;
                }
              },
              (error) => {
                console.log(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log('File available at', downloadURL);
                  AddItemData.value.imgURL = downloadURL
                  /* imgURL == downloadURL
                  return{
                    imgURL
                  } */
                });
              }
            );
          }
        }

    //add data to firebase
    const firebaseAddSingleItem = async() => {
        await addDoc(collection(db, "devices"), {

            title: AddItemData.value.title,
            description: AddItemData.value.description,
            price: AddItemData.value.price,
            onstock: AddItemData.value.onstock,
            imgURL: AddItemData.value.imgURL
        }).then(() => {
            AddItemData.value = ref([])
            snackbarAdd.value = true
        })
    }

    //edit data in firebase
    const firebaseEditSingleItem = async(id) => {
        await updateDoc(doc(deviceDataRef, id), {
            imgURL: devices.value.find(device => device.id === id).imgURL === AddItemData.value.imgURL ? devices.value.find(device => device.id === id).imgURL : AddItemData.value.imgURL,
            title: devices.value.find(device => device.id === id).title,
            description: devices.value.find(device => device.id === id).description,
            price: devices.value.find(device => device.id === id).price,
            onstock: devices.value.find(device => device.id === id).onstock
        }).then(() =>{
            snackbarEdit.value = true
        })
    }

    //delete data from firebase
    const firebaseDeleteSingleItem = async (id) => {
        await deleteDoc(doc(db, "devices", id)).then(() => {
            snackbarDelete.value = true
        });
    }

    return{
        uploadImage,
        snackbarAdd,
        snackbarEdit,
        snackbarDelete,
        devices,
        AddItemData,
        getDevicesData,
        firebaseAddSingleItem,
        firebaseEditSingleItem,
        firebaseDeleteSingleItem
    }
}
export default useDevices 