import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MedicosComponent } from './intermedio/espias/medicos.component';
import { MedicoComponent } from './intermedio-2/medico/medico.component';
import { HospitalComponent } from './intermedio-2/hospital/hospital.component';
import { IncrementadorComponent } from './intermedio-2/incrementador/incrementador.component';

//* No importa si no funcionan las rutas, únicamente estamos probando la integración
import { RUTAS } from './avanzado/rutas/app.routes';
import { NavbarComponent } from './avanzado/navbar/navbar.component';
import { RouterMedicoComponent } from './avanzado/router-medico/router-medico.component';


@NgModule({
  declarations: [
    AppComponent,
    MedicosComponent,
    MedicoComponent,
    HospitalComponent,
    IncrementadorComponent,
    NavbarComponent,
    RouterMedicoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(RUTAS),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
