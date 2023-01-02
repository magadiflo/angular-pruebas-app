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
        //* Importante colocar aquí el espía, ya que el ngOnInit() del MedicoComponent se ejecuta luego de creado
        //* el componente MedicoComponent según el ciclo de vida del componente. Además, en el OnInit().. 
        //* estamos llamando al método load() y este a su vez al servicio MedicosService (this._medicoService.getMedicos()),
        //* el que debería respondernos un observable. Si colocamos este espía, nos arrojaría un error:
        //*
        //* **** TypeError: Cannot read properties of undefined (reading 'subscribe') ****
        medicosServiceSpy.getMedicos.and.returnValue(of([]));

        
        fixture = TestBed.createComponent(MedicosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('el metodo load debe inicializar el atributo medicos', () => {
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
        component.load();
        expect(component.medicos.length).withContext('debe inicializar con médicos').toBe(3);
    });

});