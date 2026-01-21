import { Estado } from "./Estado";

export class ObjetivoReduccion{
    
    constructor(
        public id: number,
        public id_usuario: number,
        public meta_co2: number,
        public fechaInicio: string,
        public estado: Estado,
        public descripcion?: string
    ){}

}