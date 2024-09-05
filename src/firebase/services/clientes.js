import { collection, doc, getDoc, runTransaction , query, getDocs, getFirestore, setDoc, deleteDoc, where} from "firebase/firestore";



// CLIENTES

export async function obtenerSiguienteCodigoYActualizar() {
  const db = getFirestore();
  const contadorDocRef = doc(db, 'ContadoresCliente', 'cliente');
  try {
    const nuevoCodigo = await runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(contadorDocRef);

      let nuevoCodigo;
      if (docSnap.exists()) {
        const contadorActual = docSnap.data().valor;
        nuevoCodigo = contadorActual + 1;
        transaction.update(contadorDocRef, { valor: nuevoCodigo });
      } else {
        nuevoCodigo = 1;
        transaction.set(contadorDocRef, { valor: nuevoCodigo });
      }

      return nuevoCodigo;
    });

    return nuevoCodigo;
  } catch (error) {
    console.error("Error al obtener el siguiente código y actualizar el contador: ", error);
    throw error;
  }
}

export const consultarClientesID = async (reference, codigoCliente = null) => {
  const result = { statusResponse: false, data: null, error: null };
  try {
      const db = getFirestore();
      const collectionRef = collection(db, reference);
      const data = await getDocs(collectionRef);
      if (!data || data.empty) {
          result.error = `No hay datos disponibles en la colección ${reference}.`;
          return result;
      }

      const clientes = [];
      data.forEach((doc) => {
          const clienteData = doc.data();
          if (clienteData.codigo === codigoCliente) {
              clientes.push({ id: doc.id, ...clienteData });
          }
      });

      if (clientes.length > 0) {
          result.statusResponse = true;
          result.data = clientes;
      } else {
          result.error = `No se encontró un cliente con el código ${codigoCliente}.`;
      }
  } catch (error) {
      console.error("Error en getCollections:", error);
      result.error = `Error al obtener datos de la colección ${reference}: ${error.message}`;
  }
  return result;
};



export async function agregarCliente(reference, id, info, nuevoCodigo) {
  const db = getFirestore();
  try {
    const clienteConCodigo = { ...info, codigo: nuevoCodigo };
    await setDoc(doc(collection(db, reference)), clienteConCodigo);
    return { success: true, message: "Cliente agregado correctamente" };
  } catch (error) {
    console.error("Error al agregar el cliente: ", error);
    throw error;
  }

  
}


export async function eliminarCliente(reference, codigo) {
  const db = getFirestore();
  try {
    const q = query(collection(db, reference), where("codigo", "==", codigo));
    const querySnapshot = await getDocs(q);

    // Verificar si se encontró el documento
    if (querySnapshot.empty) {
      return { success: false, message: "No se encontró ningún cliente con ese código" };
    }

    // Eliminar el documento encontrado
    let docId = "";
    querySnapshot.forEach((docSnap) => {
      docId = docSnap.id;
    });

    // Si se encontró el documento, eliminarlo
    await deleteDoc(doc(db, reference, docId));
    return { success: true, message: "Cliente eliminado correctamente" };
  } catch (error) {
    console.error("Error al eliminar el cliente: ", error);
    throw error;
  }
}


export const consultarClientes = async (reference) => {
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








