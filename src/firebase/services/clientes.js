import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";



// CLIENTES
export const consultarClientes = async (reference) => {
    const result = { statusResponse: false, data: null, error: null };
    try {
        const collectionRef = collection(getFirestore(), reference);
        const data = await getDocs(collectionRef);
        if (!data || data.empty) {
            result.error = `No hay datos disponibles en la colección ${reference}.`;
            return result;
        }

        const arrayData = data.docs.map((doc) => ({
            id: doc.id,
            ...doc.exists && doc.data(),
        }));

        if (arrayData.length > 0) {
            result.statusResponse = true;
            result.data = arrayData;
        } else {
            result.error = `No hay datos disponibles en la colección ${reference}.`;
        }
    } catch (error) {
        console.error("Error en getCollections:", error);
        result.error = `Error al obtener datos de la colección ${reference}: ${error.message}`;
    }
    return result;
};



export async function agregarCliente(reference, id, info) {
  const db = getFirestore();
  try {
    const docRef = doc(db, reference, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await setDoc(docRef, { ...info }, { merge: true });
    } else {
      await setDoc(docRef, { ...info });
    }
  } catch (e) {
    console.error("Error agregando el documento: ", e);
  }

  
}


//PRESTAMOS

export const consultarPrestamos = async (reference) => {
  const result = { statusResponse: false, data: null, error: null};
  try {
    const collectionRef = collection(getFirestore(), reference);
    const data = await getDocs(collectionRef);
    if (!data || data.empty ) {
      result.error = `No hay datos disponibles en la colección ${reference}.`;
      return result;
    }

    const arrayData = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.exists && doc.data(),
    }));

    if (arrayData.length > 0) {
      result.statusResponse = true;
      result.data = arrayData;
    } else {
      result.error = `No hay datos disponibles en la colección ${reference}.`;
    }
  } catch (error) {
    console.error("Error en getCollections:", error);
    result.error = `Error al obtener datos de la colección ${reference}: ${error.message}`;
  }
  return result;
};



export async function agregarPrestamo(reference, id, info) {
  const db = getFirestore();
  try {
    const docRef = doc(db, reference, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await setDoc(docRef, { ...info }, { merge: true });
    } else {
      await setDoc(docRef, { ...info });
    }
  } catch (e) {
    console.error("Error agregando el prestamo: ", e);
  }

  
}


//RUTAS

export const consultarRutas = async (reference) => {
  const result = { statusResponse: false, data: null, error: null};
  try {
    const collectionRef = collection(getFirestore(), reference);
    const data = await getDocs(collectionRef);
    if (!data || data.empty ) {
      result.error = `No hay datos disponibles en la colección ${reference}.`;
      return result;
    }

    const arrayData = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.exists && doc.data(),
    }));

    if (arrayData.length > 0) {
      result.statusResponse = true;
      result.data = arrayData;
    } else {
      result.error = `No hay datos disponibles en la colección ${reference}.`;
    }
  } catch (error) {
    console.error("Error en getCollections:", error);
    result.error = `Error al obtener datos de la colección ${reference}: ${error.message}`;
  }
  return result;
};

export async function agregarRutas(reference, id, info) {
  const db = getFirestore();
  try {
    const docRef = doc(db, reference, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await setDoc(docRef, { ...info }, { merge: true });
    } else {
      await setDoc(docRef, { ...info });
    }
  } catch (e) {
    console.error("Error agregando el prestamo: ", e);
  }

  
}





