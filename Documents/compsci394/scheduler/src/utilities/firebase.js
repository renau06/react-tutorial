import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import React, { useState, useEffect } from 'react';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBb1SjCsl-wEGM1zZIgAmAhbX_CGW1igig",
    authDomain: "react-tutorial-d813a.firebaseapp.com",
    databaseURL: "https://react-tutorial-d813a-default-rtdb.firebaseio.com",
    projectId: "react-tutorial-d813a",
    storageBucket: "react-tutorial-d813a.appspot.com",
    messagingSenderId: "375306093618",
    appId: "1:375306093618:web:133734c0cc4ba4b3f9e82b",
    measurementId: "G-LKPK079QFB"
  };

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };