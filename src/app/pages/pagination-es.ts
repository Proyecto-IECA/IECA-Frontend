import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";


@Injectable()
export class CustomMatPaginatiorItnl extends MatPaginatorIntl {
    constructor() {
        super();
    }
    
    
    
    itemsPerPageLabel = this.getLabel();
    nextPageLabel = 'Siguiente';
    previousPageLabel = 'Atras';
    firstPageLabel = 'Primera página';
    lastPageLabel = 'Última página'

    getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
            return `0 de ${length}`;
        }

        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length): startIndex + pageSize;
       
        return `${startIndex + 1} - ${endIndex} de ${length}`;
    }

    getLabel() {
        const tipo_usuario = localStorage.getItem("tipo_usuario") || "";
        let label = '';

        if (tipo_usuario == "Postulante") {
            label = "Vacantes por página";
        }
        if (tipo_usuario == "Empresa") {
            label = "Postulaciones por página";
        }

        return label;
    }

}