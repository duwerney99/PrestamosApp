import { initializeApp, getApps } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDHtnzfgJX6fVAl4wLPGfvZSyLeiGb7pDo",
  authDomain: "versatil-inventario-dev.firebaseapp.com",
  projectId: "versatil-inventario-dev",
  storageBucket: "versatil-inventario-dev.appspot.com",
  messagingSenderId: "878113718137",
  appId: "1:878113718137:web:cdcc6a8f98e9b022ff39a8",
  measurementId: "G-0PBM8Y0ET5"
};

export default function firebase () {
    const apps = getApps()
    if (!apps.length) initializeApp(firebaseConfig)
}
