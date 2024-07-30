import { initializeApp, getApps } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyCQ4iYmaf0WSIC-iWzxg0RQonDSZCbpXqk",
  authDomain: "prestamos-e49fc.firebaseapp.com",
  projectId: "prestamos-e49fc",
  storageBucket: "prestamos-e49fc.appspot.com",
  messagingSenderId: "637966109100",
  appId: "1:637966109100:web:19c90101657b6b2d145209",
  measurementId: "G-FFK7GSVGH7"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBtdrHzV6CuG5AzPniocKKk-nzSN4AXIac",
//   authDomain: "prestamosbeta-80c50.firebaseapp.com",
//   projectId: "prestamosbeta-80c50",
//   storageBucket: "prestamosbeta-80c50.appspot.com",
//   messagingSenderId: "908465413157",
//   appId: "1:908465413157:web:2bd562871f07c9a54473cc",
//   measurementId: "G-B3ST2JC9N5"
// };


export default function firebase () {
    const apps = getApps()
    if (!apps.length) initializeApp(firebaseConfig)
}
