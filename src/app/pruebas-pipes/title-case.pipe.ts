import { Pipe, PipeTransform } from '@angular/core';

//* Transformar a mayúsculas y minúsculas: 
//* mayúscula la primera letra de las palabras en una cadena.

/**
 * * Expresiones Regulares
 * * *********************
 * * 
 * * Clases de caracteres
 * * ----------------------
 * * \w, busca cualquier caracter alfanumérico del alfabeto latino básico,
 * * incluido el caracter de subrayado. Equivalente a [A-Za-z0-9_]. 
 * * Por ejemplo, /\w/ coincide con "m" en "manzana", "5" en "$5.28", "3" en "3D" y "m" en "Émanuel".
 * *
 * * \S, busca un solo caracter que no sea un espacio en blanco. Equivalente a [^ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]. 
 * */
 //* Por ejemplo, /\S\w*/ encuentra "foo" en "foo bar".

 //* La "g" después de la expresión regular es una opción o indicador que realiza una búsqueda global, buscando en toda la cadena y devolviendo todas las coincidencias.

 //* Fuente: https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions


 /**
  * * slice(...)
  * * **********
  * * Devuelve una sección de una cadena.
  * * @param start: el índice al comienzo de la parte especificada de stringObj.
  * * @param fin: el índice hasta el final de la parte especificada de stringObj. 
  * *             La subcadena incluye los caracteres hasta el carácter indicado por el final, pero sin incluirlo. 
  * *             Si no se especifica este valor, la subcadena continúa hasta el final de stringObj.
  */

@Pipe({
  name: 'titleCase',
})
export class TitleCasePipe implements PipeTransform {
  transform(value: string): string {
    return value.length === 0 ? '' : value.replace(/\w\S*/g, txt => txt[0].toUpperCase() + txt.slice(1).toLowerCase());
  }
}
