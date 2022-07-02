import {initializeApp} from 'firebase/app';
import {getFirestore,collection} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBI07YzMPB4YWgCa1572f4TlUHHWxjEEIw",
    authDomain: "table-excel.firebaseapp.com",
    projectId: "table-excel",
    storageBucket: "table-excel.appspot.com",
    messagingSenderId: "715482419532",
    appId: "1:715482419532:web:79ca9bb10e3e38bd057fe9"
  };

initializeApp(firebaseConfig);

const db=getFirestore();

const colRef=collection(db,'tableData');

export {db,colRef}