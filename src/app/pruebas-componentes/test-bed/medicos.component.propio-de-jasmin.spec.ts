import { MedicosComponent } from './medicos.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { MedicosService, Medico } from './medicos.service';

//* Aquí ya no usamos una clase Fake.


//* NOTA: Según el instructor del tutorial recomienda usar las dos últimas formas, es decir
//* - La creación de la clase Fake (porque podríamos reutilizar las clases fakes)
//* - La forma propia de Jasmin: jasmine.createSpyObj<MedicosService>....

describe('[Integración intermedio 2 - Propio de Jasmin] MedicosComponent', () => {

    let fixture: ComponentFixture<MedicosComponent>;
    let component: MedicosComponent;
    let medicosServiceSpy: jasmine.SpyObj<MedicosService>; //* Le decimos que nos espíe la clase MedicosService

    beforeEach(waitForAsync(() => {

        medicosServiceSpy = jasmine.createSpyObj<MedicosService>('MedicosService', ['getMedicos', 'agregarMedico', 'borrarMedico']); //* Todos los métodos que quisiéramos probar

        TestBed.configureTestingModule({
            declarations: [
                MedicosComponent,
            ],
            providers: [
                { provide: MedicosService, useValue: medicosServiceSpy },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MedicosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Retorna lista de médicos', () => {
        //* Arrange
        const medicos: Medico[] = [
            { id: 1, name: 'Dr. Pedro', specialty: 'Pediatría' },
            { id: 2, name: 'Dr. Carillo', specialty: 'General Medicine' },
            { id: 3, name: 'Dr. Dávila', specialty: 'General Medicine' },
        ];
        medicosServiceSpy.getMedicos.and.returnValue(of(medicos));

        //* Act
        component.load();

        //* Assert
        expect(component.medicos.length).toBe(3);
    });


});
