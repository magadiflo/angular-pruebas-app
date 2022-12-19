import { Routes } from '@angular/router';

import { MedicoComponent } from '../../integracion-intermedio-2/medico/medico.component';
import { HospitalComponent } from '../../integracion-intermedio-2/hospital/hospital.component';
import { IncrementadorComponent } from '../../integracion-intermedio-2/incrementador/incrementador.component';

export const RUTAS: Routes = [
    { path: 'hospital', component: HospitalComponent },
    { path: 'medico/:id', component: MedicoComponent },
    { path: '**', component: IncrementadorComponent }
];