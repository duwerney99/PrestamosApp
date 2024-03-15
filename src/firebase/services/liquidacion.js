import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";


export async function obtenerSiguienteCodigoYActualizar() {
    const db = getFirestore();
    const contadorDocRef = doc(db, 'ContadoresLiquidacion', 'liquidacion');
    try {
      const docSnap = await getDoc(contadorDocRef);
      let nuevoCodigo;
      if (docSnap.exists()) {
        // Si el documento del contador existe, obtenemos el valor actual del contador y lo incrementamos en 1
        const contadorActual = docSnap.data().valor;
        nuevoCodigo = contadorActual + 1;
        await setDoc(contadorDocRef, { valor: nuevoCodigo }, { merge: true });
      } else {
        // Si el documento del contador no existe (primera vez), inicializamos el contador con un valor inicial de 1
        nuevoCodigo = 1;
        await setDoc(contadorDocRef, { valor: nuevoCodigo });
      }
      return nuevoCodigo;
    } catch (error) {
      console.error("Error al obtener el siguiente código y actualizar el contador: ", error);
      throw error;
    }
  }


export const consultarLiquidacion = async (reference) => {
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



export async function agregarLiquidacion(reference, id, info, nuevoCodigo) {
  const db = getFirestore();
  try {
    const clienteConCodigo = { ...info, codigo: nuevoCodigo };
    await setDoc(doc(collection(db, reference)), clienteConCodigo);
    return { success: true, message: "Liquidacion agregado correctamente" };
  } catch (error) {
    console.error("Error al agregar el cliente: ", error);
    throw error;
  }

  
}


