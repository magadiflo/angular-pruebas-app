import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

/*** 
 * * ALGO DE TEORÍA SOBRE QUÉ ES EL @Injectable()
 * * *********************************************
 * * @Injectable(), este decorador indica que esta clase puede ser inyectada
 * * dinámicamente a quién la demande.
 * *
 * * Para definir una clase como un servicio en Angular, usa el decorador @Injectable () 
 * * para proporcionar los metadatos que le permitan a Angular inyectarlo en un componente 
 * * como una dependencia .
 * *
 * * Declarar y decorar la clase no es suficiente para poder reclamarla. Se 
 * * necesita registrarla como un proveedor en algún módulo.
 * *
 * * Desde Angular 6, los servicios se auto-proveen en el módulo raíz
 * * mediante la configuración providedIn: 'root' de su decorador. Esto significa,
 * * que si dejamos el decorador con esta configuración de providedIn: 'root', este
 * * servicio estará disponible para toda la aplicación, puesto que estará 
 * * auto-proveeido implícitamente dentro del módulo raíz, es decir
 * * dentro del AppModule.ts
 * *
 * * Se crea un singleton por cada módulo en el que se provea un servicio. 
 * * Normalmente si el servicio es para un sólo módulo funcional se provee en este y 
 * * nada más. Si va a ser compartido gana la opción de auto proveerlo en el raíz, 
 * * garantizando así su disponibilidad en cualquier otro módulo de la aplicación.
 * *
 * * En un módulo cualquiera, siempre podríamos agregar un servicio a su array de providers.
 * *
 * * @NgModule({
 * *    declarations: [...],
 * *      imports: [...],
 * *      providers: [ ValueServiceService ]
 * * })
 * * 
 * * Pero siempre será una instancia única por módulo. Si un singleton no es lo adecuado, 
 * * entonces puedes proveer el mismo servicio en distintos módulos. De esa forma se creará una 
 * * instancia distinta para cada uno. Si se provee la misma clase en dos o más módulos se 
 * * genera una instancia en cada uno de ellos. Los componentes recibirán la instancia del módulo 
 * * jerárquicamente más cercano.
 * *
 * * Fuente:
 * * https://academia-binaria.com/servicios-inyectables-en-Angular/
 * */
@Injectable()
export class ValueService {

  value: string = 'real value';

  getValue() {
    return this.value;
  }

  setValue(value: string) {
    this.value = value;
  }

  getObservableValue(): Observable<string> {
    return of('observable value');
  }

  getPromiseValue(): Promise<string> {
    return Promise.resolve('promise value');
  }
}
