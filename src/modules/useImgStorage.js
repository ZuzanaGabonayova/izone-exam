import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { auth, storage } from '../firebase'
import useDevices from "./useDevices";

const useImgStorage = () => {
  const { AddItemData } = useDevices()

  const uploadImage = async (e) => {
    
  if (auth.currentUser) {  
      const file = e.target.files[0];
      const storageRef = ref(storage, 'mapImages/' + file.name);
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

  const deleteImage = async (memoryImage) => {
    const fileRef = ref(storage, memoryImage.url);
    deleteObject(fileRef).then(() => {
      console.log('File deleted successfully');
    }).catch(() => {
      console.log("No file to delete");
    });
  }

  return {
    uploadImage,
    deleteImage/* ,
    imgURL */
  }
}
export default useImgStorage