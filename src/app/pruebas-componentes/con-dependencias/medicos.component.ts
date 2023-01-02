import { Component, OnInit } from '@angular/core';

import { MedicosService } from './medicos.service';
import { Medico } from './medico.model';

@Component({
    selector: 'app-medicos',
    template: `
    <p>
      medicos works!
    </p>
  `,
    styles: []
})
export class MedicosComponent implements OnInit {

    public medicos: Medico[] = [];
    public mensajeError: string = '';

    constructor(private _medicoService: MedicosService) { }

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this._medicoService.getMedicos()
            .subscribe(medicos => this.medicos = medicos);
    }

    agregarMedico(medico: Medico): void {
        this._medicoService.agregarMedico(medico)
            .subscribe({
                next: medicoDB => this.medicos.push(medicoDB),
                error: err => this.mensajeError = err,
            });
    }

    actualizarMedico(medico: Medico): void {
        this._medicoService.actualizarMedico(medico.id!, medico)
            .subscribe({
                next: medicoDB => {
                    const index = this.medicos.findIndex(medico => medico.id === medicoDB.id);
                    this.medicos[index] = medicoDB;
                },
                error: err => this.mensajeError = err,
            });
    }

    borrarMedico(id: number): void {
        const confirmar = confirm('Estas seguro que desea borrar este médico');

        if (confirmar) {
            this._medicoService.borrarMedico(id)
                .subscribe(() => {
                    const index = this.medicos.findIndex(medico => medico.id === id);
                    this.medicos.splice(index, 1);
                });
        }

    }

}
