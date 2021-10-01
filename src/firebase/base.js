import * as firebase from 'firebase/app';
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB5n7agBx1gsHhWvJLvm0fUrRAYqcKLyMw",
  authDomain: "design-dump.firebaseapp.com",
  projectId: "design-dump",
  storageBucket: "design-dump.appspot.com",
  messagingSenderId: "166440525400",
  appId: "1:166440525400:web:bb7d018d422f3101c6342d",
  measurementId: "G-VPVXWHDG3H"
};

export const app = firebase.initializeApp(firebaseConfig);
