import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "search",
})
export class SearchPipe implements PipeTransform {
  transform(array: any[], searchValue): any[] {
    if (!searchValue) return array;

    return array.filter(
      (vacante) =>
        vacante.puesto.toUpperCase().includes(searchValue.toUpperCase()) ||
        vacante.modalidad.toUpperCase().includes(searchValue.toUpperCase()) ||
        vacante.nivel.toUpperCase().includes(searchValue.toUpperCase()) ||
        vacante.Usuario.nombre.toUpperCase().includes(searchValue.toUpperCase()) 
    );
  }
}
