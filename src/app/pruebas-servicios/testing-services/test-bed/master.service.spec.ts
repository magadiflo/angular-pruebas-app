import { TestBed } from '@angular/core/testing';
import { MasterService } from '../con-dependencias/master.service';
import { ValueService } from '../sin-dependencias/value.service';
/**
 * * **********************************************
 * * Probando un servicio que SÍ TIENE DEPENDENCIAS
 * * **********************************************
 */

describe('MasterService (con TestBed)', () => {

    let masterService: MasterService;

    //* Le decimos que nos espíe la clase ValueService, ya que el servicio 
    //* que vamos a probar MasterService depende de ese otro servicio ValueService
    let valueServiceSpy: jasmine.SpyObj<ValueService>;

    beforeEach(() => {
        //* Es importante definir dentro del arreglo lo métodos del servicio del que se depende,
        //* aquellos métodos que se usarán en las pruebas
        const spy = jasmine.createSpyObj('ValueService', ['getValue']);

        TestBed.configureTestingModule({
            //* Proporcione tanto el servicio a probar (MasterService) como su dependencia (spy)
            providers: [
                MasterService,
                { provide: ValueService, useValue: spy } //* le decimos provee el ValueService y en su lugar usa el valor de spy
            ]
        });

        //* Inyectar tanto el servicio a prueba (MasterService) como su dependencia (spy)
        masterService = TestBed.inject(MasterService);
        valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
    });

    //* La prueba consume el espía de la misma forma cómo se hizo en 
    //* /con-dependencias/master.service.spec.ts
    it('#getValue should return stubbed value from a spy', () => {
        const stubValue = 'stub value';
        valueServiceSpy.getValue.and.returnValue(stubValue);

        expect(masterService.getValue()).withContext('Valor del stub devuelto por el servicio').toBe(stubValue);
        expect(valueServiceSpy.getValue.calls.count()).withContext('El método spy fue llamado una vez').toBe(1);
        expect(valueServiceSpy.getValue.calls.mostRecent().returnValue).toBe(stubValue);
    });

});