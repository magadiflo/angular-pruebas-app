import { Component, OnInit } from '@angular/core';
import { MedicoService } from './medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  medicos: any[] = [];

  constructor(private medicoService: MedicoService) { }

  ngOnInit(): void {
  }

  saludarMedico(nombre: string): string {
    return `Hola ${nombre}`;
  }

  obtenerMedicos() {
    this.medicoService.getMedicos()
      .subscribe((resp: any[]) => this.medicos = resp);
  }

}
