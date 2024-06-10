import { collection, doc, getDoc, getDocs, query, where, updateDoc, getFirestore, setDoc } from "firebase/firestore";



export async function agregarCuadre(reference, info) {
    const db = getFirestore();
    console.log("Cuadre a guardar ", info )
    try {
        const cuadreRequest = { ...info};
        await setDoc(doc(collection(db, reference)), cuadreRequest);
        return { success: true, message: "Cuadre agregado correctamente"};
      } catch (error) {
        console.error("Error al agregar el cuadre: ", error);
        throw error;
      }
  
    
  }


  export const  consultarCuadres = async (reference) => {
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