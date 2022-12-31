import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

import { HandleError, HttpErrorHandler } from './servicios/http-error-handler.service';

export interface Hero {
  id: number;
  name: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  })
}

@Injectable()
export class HeroesService {

  heroesUrl: string = 'api/heroes'; //* URL a la API web
  private handleError: HandleError;

  constructor(private _http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
  }

  //* (GET) Obtiene héroes del servidor
  getHeroes(): Observable<Hero[]> {
    return this._http.get<Hero[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError('getHeroes', []))
      );
  }

  //* (GET) Obtiene héroes cuyo nombre contenga el término de búsqueda
  searchHeroes(term: string): Observable<Hero[]> {
    term = term.trim();

    //* Agrega un parámetro de búsqueda seguro y codificado en URL si hay un término de búsqueda
    const options = term ? { params: new HttpParams().set('name', term) } : {};

    return this._http.get<Hero[]>(this.heroesUrl, options)
      .pipe(
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  //* (POST) Agrega un nuevo héroe a la base de datos
  addHero(hero: Hero) {
    return this._http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        catchError(this.handleError('addHero', hero))
      );
  }

  //* (DELETE) Elimina el héroe del servidor
  /**
   * * unknown, nos permite trabajr con valores desconocidos con la seguridad de tipos.
   * *  Dos características de unknown:
   * * - No permite que una variable definida como unknown pueda ser asignada a otra,
   * *   evitando así la propagación de datos inconsistentes
   * * - No permite realizar operaciones con el valor de hasta definir un tipo específico.
   * * 
   * * Si recibimos objetos que no sabemos su tipo, lo definimos como unknown y haciendo uso de
   * * una interface o type podemos castear esa variable de tipo unknown para delimitar los
   * * atributos que queremos usar.
   * * 
   */
  deleteHero(id: number): Observable<unknown> {
    return this._http.delete(`${this.heroesUrl}/${id}`, httpOptions)
      .pipe(
        catchError(this.handleError('deleteHero'))
      );
  }

  //* (PUT) Actualiza al héroe en el servidor. Devuelve el héroe actualizado en caso de éxito
  updateHero(hero: Hero): Observable<Hero> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
    return this._http.put<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        catchError(this.handleError('updateHero', hero))
      );
  }

}
