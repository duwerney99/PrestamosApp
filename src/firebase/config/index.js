import { initializeApp, getApps } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyBrqGWoLI4U90EiV3EvHPuYzyD1-4eCEPE",
  authDomain: "inventario-vuce.firebaseapp.com",
  projectId: "inventario-vuce",
  storageBucket: "inventario-vuce.appspot.com",
  messagingSenderId: "1005992870476",
  appId: "1:1005992870476:web:b7b2dfcf14b53c46d62ae9",
  measurementId: "G-QXQFYGETSR"
};

export default function firebase () {
    const apps = getApps()
    if (!apps.length) initializeApp(firebaseConfig)
}
