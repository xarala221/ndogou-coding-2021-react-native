import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AppNavigation from "./navigations/AppNavigation";
import * as firebase from "firebase";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAat5UOb_cTvj5n86hBDskGlkRaccwacyA",
  authDomain: "webinarreactnative.firebaseapp.com",
  projectId: "webinarreactnative",
  storageBucket: "webinarreactnative.appspot.com",
  messagingSenderId: "444951242890",
  appId: "1:444951242890:web:38b3c1d931d580da04a573",
  measurementId: "G-TXCWGQ8MRM",
};
export default function App() {
  firebase.initializeApp(firebaseConfig);
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}
