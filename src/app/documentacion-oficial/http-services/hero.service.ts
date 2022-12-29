import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError, throwError, map } from 'rxjs';

import { Hero } from '../interfaces/models.interface';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
}

@Injectable()
export class HeroService {

  readonly heroesUrl: string = 'api/heroes'; //* URL a la api web

  constructor(private _http: HttpClient) { }

  //* GET heroes del servidor
  getHeroes(): Observable<Hero[]> {
    return this._http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log('fetched heroes')),
        catchError(err => this.handleError(err, 'getHeroes'))
      );
  }

  //* GET hero by id. Retorna 'undefined' cuando no se encuentra la identificación
  getHero(id: number | string): Observable<Hero> {
    if (typeof id === 'string') {
      //* 10 es la base a la que se convertirá el enterno, es decir base 10.
      //* Un valor entre 2 y 36 que especifica la base del número en la cadena. 
      //* Si no se proporciona este argumento, las cadenas con el prefijo '0x' 
      //* se consideran hexadecimales. Todas las demás cadenas se consideran decimales.
      id = parseInt(id, 10);
    }

    return this._http.get<Hero[]>(`${this.heroesUrl}/?id=${id}`)
      .pipe(
        map(heroes => heroes[0]), //* Retorna un héroe del arreglo
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} hero id = ${id}`);
        }),
        catchError(err => this.handleError(err, `getHero id=${id}`))
      );

  }

  //* POST: Agrega un nuevo héroe en el servidor
  addHero(hero: Hero): Observable<Hero> {
    return this._http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(addedHero => this.log(`added hero with id=${addedHero.id}`)),
        catchError(err => this.handleError(err, 'addHero'))
      );
  }

  //* PUT: Actualiza el hérore en el servidor
  updateHero(hero: Hero): Observable<any> {
    return this._http.put(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap((_) => this.log(`updated hero with id = ${hero.id}`)),
        catchError(err => this.handleError(err, 'updateHero')),
      );
  }

  //* DELETE: Elimina al héroe en el servidor
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    return this._http.delete<Hero>(`${this.heroesUrl}/${id}`, httpOptions)
      .pipe(
        tap((_) => this.log(`delete hero id=${id}`)),
        catchError(err => this.handleError(err, 'deleteHero'))
      );
  }

  /**
   * * Devuelve un throwError que maneja los errores de operación de HTTP.
   * * Este controlador de errores permite que la aplicación continúe
   * * ejecutándose como si no hubiera ocurrido ningún error.
   * @param operation
   * * nombre de la operación que falló
   */
  private handleError(error: HttpErrorResponse, operation: string = 'operation') {
    return throwError(() => {
      console.error(error);

      //* Si se detecta un error nativo, no lo transforme. Solo queremos
      //* transformar los errores de respuesta que no están envueltos
      //* en un 'Error'
      if (error.error instanceof Event) {
        throw error.error;
      }

      const message = `server returned code ${error.status} with body "${error.error}"`;
      throw new Error(`${operation} failed: ${message}`);
    });
  }

  private log(message: string) {
    console.log(`HeroService: ${message}`);
  }

}