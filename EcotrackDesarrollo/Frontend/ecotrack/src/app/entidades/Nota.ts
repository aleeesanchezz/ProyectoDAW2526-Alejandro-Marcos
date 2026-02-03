export class Nota{

    constructor(
        public id: any,
        public id_usuario: any,
        public titulo: string,
        public contenido: string,
        public fecha: string,
        public color: string,
        public fechaOriginal?: string
    ){}
}