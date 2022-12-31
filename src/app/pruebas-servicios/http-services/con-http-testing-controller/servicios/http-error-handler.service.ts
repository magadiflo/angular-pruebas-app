import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';


//* Tipo de la función handleError devuelta por HttpErrorHandler.createHandleError
export type HandleError = <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;


//* Maneja los errores de HttpClient
@Injectable()
export class HttpErrorHandler {

    constructor(private _messageService: MessageService) { }

    //* Crea la función handleError que ya conoce el nombre del servicio
    //*
    //* La función de abajo es lo mismo que el que está en una línea (ver [A])
    //* createHandleError(serviceName = '') {
    //*     return <T>(operation = 'operation', result = {} as T) => {
    //*         return this.handleError(serviceName, operation, result);
    //*     };
    //* }
    //*
    //* [A]
    createHandleError = (serviceName = '') => <T>(operation = 'operation', result = {} as T) => this.handleError(serviceName, operation, result);

    /**
     * * Devuelve una función que maneja las fallas de operación http.
     * * Este controlador de errores permite que la aplicaión continúe
     * * ejecutándose como si no hubiera ocurrido ningún error.
     * *    @param serviceName, nombre del servicio de datos que intentó la operación
     * *    @param operation, nombre de la operación que falló
     * *    @param result, valor opcional para devolver como resultado observable
     */
    handleError<T>(serviceName = '', operation = 'operation', result = {} as T) {
        return (error: HttpErrorResponse): Observable<T> => {
            console.error(error);

            const message = (error.error instanceof ErrorEvent) ? error.error.message : `server returned code ${error.status} with body ${error.error}`;

            this._messageService.add(`${serviceName}: ${operation} failed: ${message}`);

            //* Deje que la aplicación siga funcionando devolviendo un resultado seguro
            return of(result);
        }
    }

}