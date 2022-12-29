import { MasterService } from './master.service';
import { ValueService } from '../sin-dependencias/value.service';

//* Varias formas de probar
//* ***********************
//* Estas técnicas de prueba estándar son excelentes para los 
//* servicios de prueba unitaria de forma aislada.


class FakeValueService extends ValueService {
  override value: string = 'faked service value';
}

describe('MasterService without Angular testing support', () => {

  let masterService: MasterService;

  //* Se crear un ValueService con new y se lo pasa al 
  //* constructor de MasterService. Este tipo de prueba rara vez funciona bien, 
  //* ya qu la mayoría de servicios dependientes son difíciles de crear y controlar
  it('#getValue, should return real value from the real service', () => {
    masterService = new MasterService(new ValueService());
    expect(masterService.getValue()).toBe('real value');
  });

  //* Simulando la dependencia creando una clase FakeValueService
  it('#getValue, should return faked value from a fakeService', () => {
    masterService = new MasterService(new FakeValueService());
    expect(masterService.getValue()).toBe('faked service value');
  });

  //* Creando un valor ficticio
  it('#getValue, should return faked value from a fake object', () => {
    const fake = { getValue: () => 'fake value' };
    masterService = new MasterService(fake as ValueService);
    expect(masterService.getValue()).toBe('fake value');
  });

  //* **********************************************************************************
  //* Se prefiere los espías, ya que suelen ser la mejor manera de simular los servicios
  //* **********************************************************************************
  //* Creando un espía del servicio del que se depende
  it('#getValue, should return stubbed value from a spy', () => {
    //* Crear el 'getValue' espiar en un objeto que representa el ValueService.
    //* El método createSpyObj, tiene un genérico: jasmine.createSpyObj<ValueService>
    //* donde le pasamos el Servicio que queremos espiar. En este ejemplo no lo usamos,
    //* pero en el ejemplo de medicos.component.propio-de-jasmin.spec.ts sí lo usamos
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);

    //* Establecer el valor que se devolverá cuando se llame al espía 'getValue'
    const stubValue = 'stub value';
    valueServiceSpy.getValue.and.returnValue(stubValue);

    masterService = new MasterService(valueServiceSpy);

    /**
     * * withContext(<mensaje>), se agrega algo de contexto para una expectativa. 
     * * El mensaje agregado será el contexto adicional que se mostrará cuando falla el comparador
     */
    expect(masterService.getValue()).withContext('valor del stub devuelto por el servicio').toBe(stubValue);

    expect(valueServiceSpy.getValue.calls.count()).withContext('El método de espía (spy) fue llamado una vez').toBe(1);

    expect(valueServiceSpy.getValue.calls.mostRecent().returnValue).toBe(stubValue);
  });

});
