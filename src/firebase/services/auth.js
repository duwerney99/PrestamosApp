import firebase from '@firebase/config'
import { firebaseException } from '@firebase/config/Exceptions'
import { getAuth, signInWithEmailAndPassword, signOut as signOutFirebase } from 'firebase/auth'

firebase()

export const signInWithEmail = async (email, password) => {
    try {
        const auth = getAuth()
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        return user
    } catch (error) {
        throw new Error(firebaseException[error.code] || error.message)
    }
}

export const signOut = async () => {
    try {
        const auth = getAuth()
        await signOutFirebase(auth)
    } catch (error) {
        throw new Error(firebaseException[error.code] || error.message)
    }
}

export const onAuthStateChanged = (callback) => {
    const auth = getAuth()
    return auth.onAuthStateChanged(callback)
}
