export class Cliente {
    constructor(codigo, cedula, nombre, direccion, telefono, nombreReferencia, nombreRuta, 
        telefonoReferencia, direccionReferencia, estado) {
        this.codigo = codigo;
        this.cedula = cedula;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.nombreReferencia = nombreReferencia;
        this.nombreRuta = nombreRuta;
        this.telefonoReferencia = telefonoReferencia;
        this.direccionReferencia = direccionReferencia;
        // this.estado = estado;
    }

    static validateCliente(cliente) {
        const requiredFields  = ['codigo', 'cedula', 'nombre', 'direccion', 'telefono', 'nombre_referencia', 'nombre_ruta', 'telefono_referencia', 'direccion_referencia'];
        const missingFields = requiredFields.filter(field => !cliente[field]);
        return {
            valid: missingFields.length === 0,
            missingFields
        };
}

    static fromFirestore(doc) {
        const data = doc.data();
        return new Prestamo(
            doc.id,
            data.cedula,
            data.nombre,
            data.direccion,
            data.telefono,
            data.nombreReferencia,
            data.nombreRuta,
            data.telefonoReferencia,
            data.direccionReferencia,
            // data.estado,
        );
    }
}