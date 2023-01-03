import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MedicosComponent } from '../medicos.component';
import { MedicosService } from '../medicos.service';
import { Medico } from '../medico.model';


describe('PU Componentes con dependencias - FORMA 3', () => {

    let fixture: ComponentFixture<MedicosComponent>;
    let component: MedicosComponent;
    let medicosServiceSpy: jasmine.SpyObj<MedicosService>; //* Le decimos que espíe la clase MedicosService

    /*
     * * **********************************************************
     * * FORMA 3 - Pruebas unitarias a componentes con dependencias
     * * **********************************************************
     * * - Aquí ya no usamos la clase Fake
     * * 
     * * NOTA: 
     * * Según el instructor del tutorial recomienda usar las dos últimas formas, es decir:
     * * - Forma 2: La creación de la clase Fake (porque podríamos reutilizar las clases fakes o llamadas también Mocks)
     * * - Forma 3: La forma propia de Jasmin: jasmine.createSpyObj<MedicosService>....
     * */

    beforeEach(waitForAsync(() => {
        //* En el arreglo ['getMedicos'...] colocamos todos los métodos que queremos espiar de la clase MedicosService
        medicosServiceSpy = jasmine.createSpyObj<MedicosService>('MedicosService', ['getMedicos', 'agregarMedico', 'borrarMedico']);

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

        //* fixture.detectChanges(), es el que ejecuta el ciclo de detección de cambios, si lo dejamos aquí no arrojará un error:
        //* **** TypeError: Cannot read properties of undefined (reading 'subscribe') ****
        //* y eso es porque según vi, al colocar ese detectChanges(), se ejecuta el ngOnInit() y este llama al load() y como hasta
        //* este momento aún no definimos ningún espía es que nos sale ese error. Por eso preferí colocar el fixture.detectChanges();
        //* dentro de la misma prueba, luego de haber definido el valor de retorno del espía
        //*
        //* >>>>>> fixture.detectChanges();
    });

    it('debería inicializar el atributo médicos', () => {
        /**
         * * Como la variable medicoServiceSpy, ya es un espía en sí, ya no es necesario
         * * usar el método spyOn(medicoService....), sino usar directamente el espía creado,
         * * tal como se muestra a continuación:
         */
        const medicos: Medico[] = [
            { id: 1, name: 'Dr. Pedro', specialty: 'Pediatría' },
            { id: 2, name: 'Dr. Carillo', specialty: 'General Medicine' },
            { id: 3, name: 'Dr. Dávila', specialty: 'General Medicine' },
        ];
        medicosServiceSpy.getMedicos.and.returnValue(of(medicos));

        //* Activando el ciclo de detección de cambios. Con esto ya se ejecuta el ngOnInit, y dentro de él
        //* se llama al método load() y este trae la lista de médicos para agregarlos al arreglo
        fixture.detectChanges();

        expect(component.medicos.length).withContext('debe inicializar con médicos').toBe(3);
    });

});