import { collection, doc, getDoc, getDocs, query, where, updateDoc, getFirestore, setDoc } from "firebase/firestore";


//PRESTAMOS
export async function obtenerSiguienteCodigoYActualizar() {
    const db = getFirestore();
    const contadorDocRef = doc(db, 'ContadoresPrestamo', 'prestamo');
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

  export const consultarPrestamosID = async (reference, codigoPrestamo = null) => {
    const result = { statusResponse: false, data: null, error: null };
    try {
        const db = getFirestore();
        const collectionRef = collection(db, reference);
        const data = await getDocs(collectionRef);
        if (!data || data.empty) {
            result.error = `No hay datos disponibles en la colección ${reference}.`;
            return result;
        }

       
  
        const prestamos = [];
        data.forEach((doc) => {
            const prestamoData = doc.data();
            if (prestamoData.codigo === codigoPrestamo) {
                prestamos.push({ id: doc.id, ...prestamoData });
            }
        });
  
        if (prestamos.length > 0) {
            result.statusResponse = true;
            result.data = prestamos;
        } else {
            result.error = `No se encontró un cliente con el código ${codigoPrestamo}.`;
        }
    } catch (error) {
        console.error("Error en getCollections:", error);
        result.error = `Error al obtener datos de la colección ${reference}: ${error.message}`;
    }
    return result;
  };
  



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


  // EDITAR Prestamo POR ID
  export const editPrestamoByID = async (reference, clienteID, nuevosDatos) => {
    const result = { statusResponse: false, error: null, mensaje: null };
    const db = getFirestore();
  
  // Crear una consulta para encontrar el documento con el código especificado
    const prestamosQuery = query(
      collection(db, 'prestamos'),
      where('codigo', '==', clienteID)
    );

  try {
    // Obtener los documentos que coinciden con la consulta
    const prestamosDocsSnapshot = await getDocs(prestamosQuery);

    // Verificar si se encontró algún documento
    if (!prestamosDocsSnapshot.empty) {
      // Obtener la referencia al primer documento encontrado (asumiendo que solo hay uno con ese código)
      const prestamoDocRef = prestamosDocsSnapshot.docs[0].ref;

      
      result.mensaje = await updateDoc(prestamoDocRef, nuevosDatos);

      console.log('Saldo actualizado con éxito para el préstamo con código:', clienteID);
    } else {
      console.error('No se encontró ningún préstamo con el código especificado:', clienteID);
    }
  } catch (error) {
    console.error('Error al actualizar el saldo:', error);
    throw error;
  }
    
    return result;
};
    
  
  
  export async function agregarPrestamo(reference, id, info) {
    const db = getFirestore();
    console.log("Prestamo a guardar ", info )
    try {
        const prestamoConCodigo = { ...info, codigo: id };
        await setDoc(doc(collection(db, reference)), prestamoConCodigo);
        return { success: true, message: "Préstamo agregado correctamente"};
      } catch (error) {
        console.error("Error al agregar el préstamo: ", error);
        throw error;
      }
  
    
  }