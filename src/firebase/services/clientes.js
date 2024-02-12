import { collection, getDocs, getFirestore } from "firebase/firestore";

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
