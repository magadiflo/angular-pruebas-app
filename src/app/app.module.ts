import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MedicosComponent } from './unitarias-intermedio/espias/medicos.component';
import { MedicoComponent } from './integracion-intermedio-2/medico/medico.component';
import { HospitalComponent } from './integracion-intermedio-2/hospital/hospital.component';
import { IncrementadorComponent } from './integracion-intermedio-2/incrementador/incrementador.component';

//* No importa si no funcionan las rutas, únicamente estamos probando la integración
import { RUTAS } from './integracion-avanzado/rutas/app.routes';
import { NavbarComponent } from './integracion-avanzado/navbar/navbar.component';
import { RouterMedicoComponent } from './integracion-avanzado/router-medico/router-medico.component';
import { TitleCasePipe } from './pruebas-pipes/title-case.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MedicosComponent,
    MedicoComponent,
    HospitalComponent,
    IncrementadorComponent,
    NavbarComponent,
    RouterMedicoComponent,
    TitleCasePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(RUTAS),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
