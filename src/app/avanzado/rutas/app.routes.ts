import { Routes } from '@angular/router';

import { MedicosComponent } from '../../intermedio/espias/medicos.component';
import { HospitalComponent } from '../../intermedio-2/hospital/hospital.component';
import { IncrementadorComponent } from '../../intermedio-2/incrementador/incrementador.component';

export const RUTAS: Routes = [
    { path: 'hospital', component: HospitalComponent },
    { path: 'medico/:id', component: MedicosComponent },
    { path: '**', component: IncrementadorComponent }
];