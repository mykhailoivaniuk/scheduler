import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import React,{ useState,useEffect } from 'react';

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKzfc65uyKfF9CYkILMQ4LdepkeqloF_4",
  authDomain: "scheduler-bcc1f.firebaseapp.com",
  databaseURL: "https://scheduler-bcc1f-default-rtdb.firebaseio.com",
  projectId: "scheduler-bcc1f",
  storageBucket: "scheduler-bcc1f.appspot.com",
  messagingSenderId: "54464224944",
  appId: "1:54464224944:web:03ea1aa848dbd5c9916575"
};

// Initialize Firebase
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