import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";
import firebase from "../../app/config/firebase";
import { APP_LOADED } from "../../app/async/asyncReducer";
import {
  dataFromSnapshot,
  getUserProfile,
} from "../../app/firestore/firestoreService";
import listenToCurrentUSerProfile from "../profiles/profileActions";

export function signInUser(user) {
  return {
    type: SIGN_IN_USER,
    payload: user,
  };
}

export function verifyAuth() {
  return function (dispatch) {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(signInUser(user));
        const profileRef = getUserProfile(user.uid);
        profileRef.onSnapshot((onSnapshot) => {
          dispatch(listenToCurrentUSerProfile(dataFromSnapshot(onSnapshot)));
          dispatch({ type: APP_LOADED });
        });
      } else {
        dispatch(signOutUser());
        dispatch({ type: APP_LOADED });
      }
    });
  };
}

export function signOutUser() {
  return {
    type: SIGN_OUT_USER,
  };
}
