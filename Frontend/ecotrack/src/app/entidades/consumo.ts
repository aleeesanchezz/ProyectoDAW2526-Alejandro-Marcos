import { OnInit } from "@angular/core";
import { Categoria } from "./categoria";
import { Unidad } from "./unidad";
import { Usuario } from "./usuario";

export class Consumo{

    constructor(
         public id: number,
         public usuarioId: number,
         public categoria: Categoria,
         public cantidad: number,
         public unidad: Unidad,  
         public fecha: string,
         public co2: number,
         public notas?: string,
        
    ){}

    
}