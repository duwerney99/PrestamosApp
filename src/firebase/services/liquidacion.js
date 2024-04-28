import { collection, doc, getDoc, query, where, updateDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { Timestamp } from 'firebase/firestore';

export async function obtenerSiguienteCodigoYActualizar() {
  const db = getFirestore();
  const contadorDocRef = doc(db, 'ContadoresLiquidacion', 'liquidacion');
  try {
      const docSnap = await getDoc(contadorDocRef);
      let nuevoCodigo;
      
      // Obtener la fecha actual
      const fechaActual = new Date();
      const year = fechaActual.getFullYear();
      let month = fechaActual.getMonth() + 1;
      let day = fechaActual.getDate();

      // Formatear la fecha en un formato específico, por ejemplo, YYYYMMDD
      const fechaFormateada = `${year}${month < 10 ? '0' + month : month}${day < 10 ? '0' + day : day}`;
      
      if (docSnap.exists()) {
          // Si el documento del contador existe, obtenemos el valor actual del contador y lo incrementamos en 1
          await setDoc(contadorDocRef, { valor: fechaFormateada}, { merge: true });
      } else {
          // Si el documento del contador no existe (primera vez), inicializamos el contador con un valor inicial de 1
          nuevoCodigo = `${fechaFormateada}-1`;
          await setDoc(contadorDocRef, { valor: fechaFormateada });
      }
      return fechaFormateada;
  } catch (error) {
      console.error("Error al obtener el siguiente código y actualizar el contador: ", error);
      throw error;
  }
}


  

// Actualizar saldo en collection prestamo
export async function updateSaldo(codigo, nuevoSaldo) {
  const db = getFirestore();
  
  // Crear una consulta para encontrar el documento con el código especificado
  const prestamosQuery = query(
    collection(db, 'prestamos'),
    where('codigo', '==', codigo)
  );

  try {
    // Obtener los documentos que coinciden con la consulta
    const prestamosDocsSnapshot = await getDocs(prestamosQuery);

    // Verificar si se encontró algún documento
    if (!prestamosDocsSnapshot.empty) {
      // Obtener la referencia al primer documento encontrado (asumiendo que solo hay uno con ese código)
      const prestamoDocRef = prestamosDocsSnapshot.docs[0].ref;

      // Actualizar el saldo actual en el documento del préstamo
      await updateDoc(prestamoDocRef, { valorAPagar: nuevoSaldo });

      console.log('Saldo actualizado con éxito para el préstamo con código:', codigo);
    } else {
      console.error('No se encontró ningún préstamo con el código especificado:', codigo);
    }
  } catch (error) {
    console.error('Error al actualizar el saldo:', error);
    throw error;
  }
}


export async function updateLiquidacion(codigo, nuevoSaldo, fecha, abono) {
  const db = getFirestore();
  
  const liquidacionQuery = query(
    collection(db, 'liquidacion'),
    where('codigoCliente', '==', codigo)
  );

  try {
    // Obtener los documentos que coinciden con la consulta
    const liquidacionDocsSnapshot = await getDocs(liquidacionQuery);
    
    // Verificar si se encontró algún documento
    if (!liquidacionDocsSnapshot.empty) {
      // Obtener la referencia al primer documento encontrado (asumiendo que solo hay uno con ese código)
      const liquidacionDocRef = liquidacionDocsSnapshot.docs[0].ref;
      console.log("Documentos ", liquidacionDocsSnapshot.docs[0].ref)
      // Actualizar el saldo actual en el documento del préstamo
      await updateDoc(liquidacionDocRef, { saldoObtener: nuevoSaldo, fechaLiquidacion: fecha, valorAbono: abono });

      console.log('Saldo actualizado con éxito para el préstamo con código:', codigo);
    } else {
      console.error('No se encontró ningún préstamo con el código especificado:', codigo);
    }
  } catch (error) {
    console.error('Error al actualizar el saldo:', error);
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



export async function agregarLiquidacion(reference, id, info, fechaFormateada) {
  const db = getFirestore();
  try {
    const clienteConCodigo = { ...info, codigo: fechaFormateada };
    await setDoc(doc(collection(db, reference)), clienteConCodigo);
    return { success: true, message: "Liquidacion agregado correctamente" };
  } catch (error) {
    console.error("Error al agregar la liquidacion: ", error);
    throw error;
  }

  
}



export async function savePayTrazabilidad(clientID, saldoActualMenos, date) {
  const db = getFirestore();
  const pagosDocRef = doc(db, 'trazaLiqui', clientID);
  try {
      const pagosDocSnapshot = await getDoc(pagosDocRef);
      let pagosData = [];

      if (pagosDocSnapshot.exists()) {
          // Obtener los datos de los abonos existentes
          pagosData = pagosDocSnapshot.data().pagos || [];
          console.log("Datos de los abonos existentes:", pagosData);
      }

      // Agregar el nuevo abono al historial
      const nuevoAbono = { valor: saldoActualMenos, date: date };
      pagosData.push(nuevoAbono);

      // Guardar o actualizar el documento con los datos actualizados
      await setDoc(pagosDocRef, { pagos: pagosData }, { merge: true });

      console.log("Se ha agregado un nuevo abono para el cliente con ID", clientID);
      return pagosData; // Retornar el abono agregado para referencia
  } catch (error) {
      console.error("Error al guardar el abono para el cliente con ID", clientID, ":", error);
      throw error;
  }
}


export async function consultarPagosExistenes(clientID) {
  const db = getFirestore();
  const pagosDocRef = doc(db, 'trazaLiqui', clientID);
  try {
      const pagosDocSnapshot = await getDoc(pagosDocRef);
      if (pagosDocSnapshot.exists()) {
          const pagosData = pagosDocSnapshot.data().pagos || [];
          console.log("Datos de los abonos existentes para el cliente con ID", clientID, ":", pagosData);
          return pagosData;
      } else {
          console.log("No existen datos de abonos para el cliente con ID", clientID);
          return [];
      }
  } catch (error) {
      console.error("Error al consultar los abonos para el cliente con ID", clientID, ":", error);
      throw error;
  }
}


