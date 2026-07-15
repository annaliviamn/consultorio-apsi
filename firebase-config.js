const firebaseConfig = {
  apiKey: "AIzaSyBKX-Q9C1q-fS6Og6UZLgs0Sh5nbepnc6M",
  authDomain: "consultorio-apsi.firebaseapp.com",
  projectId: "consultorio-apsi",
  storageBucket: "consultorio-apsi.firebasestorage.app",
  messagingSenderId: "345195911566",
  appId: "1:345195911566:web:bebd0adcf5e5ce32642cdf"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();