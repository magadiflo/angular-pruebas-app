import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { ValueService } from '../sin-dependencias/value.service';

class NotProvided extends ValueService {

}
/***
 * * Angular TestBed
 * * ***************
 * * TestBed es la más importante de las utilidades de prueba de Angular.
 * * TestBed crea un módulo para pruebas de Angular construido
 * * dinámicamente que emula un @NgModule de Angular.
 * *
 * * El método TestBed.configureTestingModule() toma un objeto de
 * * metadatos que puede tener la mayoría de las propiedades de 
 * * un @NgModule.
 * *
 */
describe('ValueService (con TestBed)', () => {

  let service: ValueService;
  /**
   * * 1° paso: Para probar un servicio, configura la propiedad de metadatos del
   * *          providers con un arreglo de los servicios que probará o simulará.
   * * 2° paso: Luego inyéctelo detro de una prueba llamando a TestBed.inject(),
   * *          con la clase de servicio como argumento, o dentro de beforeEach()
   * *          si prefiere inyectar el servicio como parte de su configuración.
   * */
  beforeEach(() => {
    //* 1° paso
    TestBed.configureTestingModule({
      providers: [ValueService]
    });

    //* 2° paso
    service = TestBed.inject(ValueService);
  });

  it('should use ValueService', () => {
    expect(service.getValue()).toBe('real value');
  });

  it('can inject a default value when service is not provided', () => {
    expect(TestBed.inject(NotProvided, null)).toBeNull();
  });

  it('la prueba debe esperar por ValueService.getObservableValue', waitForAsync(() => {
    service.getObservableValue().subscribe(value => {
      expect(value).toBe('observable value');
    });
  }));

  it('la prueba debe esperar por ValueService.getPromiseValue', waitForAsync(() => {
    service.getPromiseValue().then(value => {
      expect(value).toBe('promise value');
    })
  }));

  it('la prueba debe esperar por ValueService.getObservableDelayValue', (done: DoneFn) => {
    service.getObservableDelayValue().subscribe(value => {
      expect(value).toBe('observable delay value');
      done();
    });
  });

  it('debería permitir el uso de fakeAsync', fakeAsync(() => {
    let value: any;
    service.getPromiseValue().then((val: any) => value = val);
    tick(); //* Trigger JS engine cycle until all promises resolve.
    expect(value).toBe('promise value');
  }));
});
