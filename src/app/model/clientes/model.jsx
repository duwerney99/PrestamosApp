export class Cliente {
    constructor(cedula, nombre, direccion, telefono, nombreReferencia, codigoRuta, 
        telefonoReferencia, direccionReferencia) {
        this.cedula = cedula;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.nombreReferencia = nombreReferencia;
        this.codigoRuta = codigoRuta;
        this.telefonoReferencia = telefonoReferencia;
        this.direccionReferencia = direccionReferencia;
        // this.estado = estado;
    }

    static validateCliente(cliente) {
        const requiredFields  = ['cedula', 'nombre', 'direccion', 'telefono', 'nombre_referencia', 'codigoRuta', 'telefono_referencia', 'direccion_referencia'];
        const missingFields = requiredFields.filter(field => !cliente[field]);
        return {
            valid: missingFields.length === 0,
            missingFields
        };
}

    static fromFirestore(doc) {
        const data = doc.data();
        return new Cliente(
            doc.id,
            data.cedula,
            data.nombre,
            data.direccion,
            data.telefono,
            data.nombreReferencia,
            data.codigoRuta,
            data.telefonoReferencia,
            data.direccionReferencia,
            // data.estado,
        );
    }
}