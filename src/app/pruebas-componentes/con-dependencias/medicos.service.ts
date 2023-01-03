import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Medico } from './medico.model';

@Injectable()
export class MedicosService {

    //* No nos interesa si la url funciona o no, porque lo que haremos
    //* será probar la clase de MedicosComponent y no este servicio, 
    //* pero este servicio es usado (inyectado) en MedicosComponent,
    //* entonces, de alguna manera necesitamos usarlo pero no para hacer
    //* llamadas reales al endpoint, sino más bien para hacer simulaciones
    //* de sus respuestas.
    readonly END_POINT = '...';

    constructor(private _http: HttpClient) { }

    getMedicos(): Observable<Medico[]> {
        return this._http.get<Medico[]>(this.END_POINT);
    }

    agregarMedico(medico: Medico): Observable<Medico> {
        return this._http.post<Medico>(this.END_POINT, medico);
    }

    actualizarMedico(id: number, medico: Medico): Observable<Medico> {
        return this._http.put<Medico>(`${this.END_POINT}/${id}`, medico);
    }

    borrarMedico(id: number): Observable<unknown> {
        return this._http.delete<unknown>(`${this.END_POINT}/${id}`);
    }

}
