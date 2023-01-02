import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MedicosComponent } from '../medicos.component';
import { MedicosService } from '../medicos.service';
import { FakeMedicosService } from './fake-medicos.service';

describe('PU Componentes con dependencias - FORMA 2', () => {

    let fixture: ComponentFixture<MedicosComponent>;
    let component: MedicosComponent;
    let medicoService: MedicosService; //* El tipo de dato siempre debe ser la clase original y no la clase Fake

    /*
     * * **********************************************************
     * * FORMA 2 - Pruebas unitarias a componentes con dependencias
     * * **********************************************************
     * * - En la primera forma usábamos en el imports: [HttpClientTestingModule,], aquí no usaremos eso, el resto de la primera configuración sí.
     * *
     * * - Lo que haremos será crear una clase similar al del servicio (MedicoService) del que el componente que estamos 
     * *   probando (MedicosComponent) depende y configurarlo en el providers, diciéndole que como provider usaremos el MedicoService, 
     * *   pero que en su lugar use la clase FakeMedicosService que creamos.
     * *
     * * - En la clase FakeMedicosService, definimos el mismo método y tipo de retorno que necesitamos que nos devuelva ese servicio, es decir
     * *   el método que necesitamos para hacer la prueba, en nuestro caso sería este:  getMedicos(): Observable<Medico[]> {...}
     * *
     * * - Finalmente vemos que en ningún momento nos pide que importemos el HttpClient o el HttpClientTestingModule porque ya no lo necesitamos,
     * *   puesto que ahora ya no usamos el MedicosService sino el FakeMedicosService.
     * *
     * * 
     * * Normalmente los servicios inyectados en los componentes son del tipo private, por eso es que en nuestro componente MedicosComponent,
     * * definimos la dependencia private _medicoService: MedicosService (como privada). 
     * * 
     * * **********************************************************************
     * * Ahora, ¿Cómo dispondremos de las dependencias servicios tipo privadas?
     * * **********************************************************************
     * *
     * * - Primero, veamos que configuramos para que se use nuestra clase FakeMedicosService en vez de la clase real.
     * * 
     * * - Definimos una variable para nuestro servicio Real: let medicosService: MedicosService.
     * *
     * * - En el método beforeEach, usamos el método inject(...) de la clase TestBed para capturar la dependencia MedicosService 
     * *   de nuestro módulo TestBed.configureTestingModule({...}). Hasta este punto, recordar que buscará nuestra clase MedicosService
     * *   pero como en el providers le decimos que no use eso sino su reemplazo es que siempre usará la clase FakeMedicosService.
     * *  
     * * - Luego, en el spyOn(medicosService, 'getMedicos').and.callThrough(); le decimos que use nuestra variable medicosService.
     * *
     * * De esa manera, estamos usando la instancia inyectada en el componente MedicosComponent, es decir esta instancia:
     * *        medicoService = TestBed.inject(MedicosService); 
     * * para hacer uso de él en estas pruebas.
     * */

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                MedicosComponent,
            ],
            providers: [
                { provide: MedicosService, useClass: FakeMedicosService },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MedicosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        medicoService = TestBed.inject(MedicosService);
    });

    it('el componente se debe instanciar', () => {
        expect(component).toBeDefined();
        expect(component).toBeInstanceOf(MedicosComponent);
    });

    it('el metodo load debe inicializar el atributo medicos', () => {
        /**
         * * callThrough()
         * * **************
         * * Como hasta este punto ya estamos usando una clase Fake (FakeMedicosService), 
         * * podemos usar el .callThrough(); para decirle que se ejecute como normalmente se ejecutaría el servicio real, es decir,
         * * como ahora en vez de usar la clase MedicosService estamos usando la clase FakeMedicosService; con 
         * * .callThrough() ejecutaremos el método getMedicos(...) y este devolverá lo que esté definido en dicho método de la
         * * clase FakeMedicosService.
         * * 
         * * NOTA: Si quisiéramos sobreescribir dicho método para hacer alguna prueba en específico, no habría problemas y
         * * lo sobreescribimos haciendo como hacíamos normalmente: 
         * * - llamar al spyOn(...).and.callFake(() => ....)
         * * - Otra forma sería llamar al returnValue: spyOn(...).and.returnValue(....)
         * *  
         * * La diferencia con returnValue es que se pasa defrente la respuesta y no usa un arrow function
        */
        const espia = spyOn(medicoService, 'getMedicos').and.callThrough();

        component.load();

        expect(espia).toHaveBeenCalled();
        expect(espia).toHaveBeenCalledOnceWith();

        expect(component.medicos.length).withContext('debe inicializar con médicos').toBe(4);
    });

});