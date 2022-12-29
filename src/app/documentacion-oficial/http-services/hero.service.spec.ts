import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { defer } from 'rxjs';

import { Hero } from '../interfaces/models.interface';
import { HeroService } from './hero.service';

/**
 * * **********************
 * * Testing HTTP Services
 * * **********************
 * * Los servicios de datos que realizan llamadas HTTP a servidores remotos
 * * normalmente inyectan y delegan en el servicio HttpClient de Angular 
 * * para llamadas XHR.
 * *
 * * Puede probar un servicio de datos con un espía HttpClient inyectado
 * * como probaría cualquier servicio con una dependencia.
 */

describe('HeroService (Testing HTTP Services - con espías)', () => {

    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let heroService: HeroService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
        heroService = new HeroService(httpClientSpy);
    });

    it('debería devolver los héroes esperados (HttpClient llamado una vez)', (done: DoneFn) => {
        //* Arrange
        const expectedHeroes: Hero[] = [
            { id: 1, name: 'A' },
            { id: 2, name: 'B' },
        ];
        httpClientSpy.get.and.returnValue(asyncData(expectedHeroes));

        //* Act
        heroService.getHeroes()
            .subscribe({
                next: heroes => {

                    //* Assert
                    expect(heroes).withContext('expected heroes').toEqual(expectedHeroes);
                    done();
                },
                error: done.fail
            });

        //* Assert
        expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
    });

    it('debería devolver un error cuando el servidor devuelve 404', (done: DoneFn) => {
        const errorResponse = new HttpErrorResponse({
            error: 'test 404 error',
            status: 404,
            statusText: 'Not Found',
        });

        httpClientSpy.get.and.returnValue(asyncError(errorResponse));

        heroService.getHeroes()
            .subscribe({
                next: heroes => done.fail('esperaba un error, no héroes'),
                error: error => {
                    expect(error.message).toContain('test 404 error');
                    done();
                }
            });

    });
});



//* asyncData(), creará un un observable asíncrono que emita una vez y se complete después de un giro del motor JS
/**
 * * defer(...), defer le permite crear un Observable solo cuando el Observador se suscribe. 
 * * Espera hasta que un Observador se suscriba, llama a la función de fábrica dada para obtener un Observable, 
 * * donde una función de fábrica generalmente genera un nuevo Observable, y suscribe el Observador a este Observable. 
 * * En caso de que la función de fábrica devuelva un valor falso, entonces EMPTY se usa como Observable en su lugar. 
 * * Por último, pero no menos importante, una excepción durante la llamada a la función de fábrica se transfiere al 
 * * observador mediante un error de llamada.
 * *
 * * Otra explicación defer(...)
 * * ***************************
 * *
 * * los Observables pueden encapsular muchos tipos diferentes de fuentes y esas fuentes no necesariamente tienen que 
 * * obedecer a esa interfaz. Algunos como Promises siempre intentan competir con entusiasmo.
 * *
 * * Considerar:
 * * var promesa = $.get('https://www.google.com');
 * *
 * * La promesa en este caso ya se está ejecutando antes de que se haya conectado ningún controlador. 
 * * Si queremos que esto actúe más como un Observable, entonces necesitamos alguna forma de diferir 
 * * la creación de la promesa hasta que haya una suscripción.
 * *
 * * Por lo tanto, usamos defer para crear un bloque que solo se ejecuta cuando se suscribe al Observable resultante.
 * *
 * * Observable.defer(() => $.get('https://www.google.com'));
 * *
 * * Lo anterior no creará la Promesa hasta que el Observable se suscriba y, por lo tanto, se comportará mucho 
 * * más en línea con la interfaz estándar del Observable.
 * /
 */
function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
}

//* Crea un error asyncrono observable
function asyncError<T>(errorObject: any) {
    return defer(() => Promise.reject(errorObject));
}