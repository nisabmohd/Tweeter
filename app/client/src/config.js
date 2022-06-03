import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCDiz7JDpoLNkhe_dR_zmo0Xi_ZsbQF4YI",
  authDomain: "tweeter-85528.firebaseapp.com",
  projectId: "tweeter-85528",
  storageBucket: "tweeter-85528.appspot.com",
  messagingSenderId: "282019377137",
  appId: "1:282019377137:web:3d4fef67f491f97ef89e50"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);