import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Medico {
  id?: number;
  name: string;
  specialty: string;
}

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  constructor(public http: HttpClient) { }

  getMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>('...');
  }

  agregarMedico(medico: Medico): Observable<Medico> {
    return this.http.post<Medico>('...', medico);
  }

  borrarMedico(id: number): Observable<void> {
    return this.http.delete<void>('...');
  }

}
