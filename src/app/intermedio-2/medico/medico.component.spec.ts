import { MedicoComponent } from './medico.component';
import { TestBed, ComponentFixture } from "@angular/core/testing";

describe('Médico Component [Prueba de integración]', () => {

    let component: MedicoComponent;
    let fixture: ComponentFixture<MedicoComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MedicoComponent]
        });

        fixture = TestBed.createComponent(MedicoComponent);
        component = fixture.componentInstance;
    });

    it('Debe de crear un componente', () => {
        expect(component).toBeTruthy();
    });

    it('El saludo retornado debe contener el nombre del médico enviado', () => {
        const nombre = 'Martín';
        const saludo = component.saludarMedico(nombre);

        expect(saludo).toContain(nombre);
    });

});