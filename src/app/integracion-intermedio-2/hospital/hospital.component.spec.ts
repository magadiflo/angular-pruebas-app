import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalComponent } from './hospital.component';

describe('HospitalComponent', () => {
  let component: HospitalComponent;
  let fixture: ComponentFixture<HospitalComponent>;

  /**
   * * Una diferencia que observamos cuando 
   * * creamos manualente el archivo de pruebas intermedio2/medico.component.spec.ts
   * * y este archivo creado automáticamente con el CLI, es que la función
   * * beforeEach(...), en este archivo, contiene el async y dentro el await, ¿Por qué?
   * *
   * * El async es usado para decirle a la función, en este caso al beforeEach, que se
   * * espere (await) hasta que la resolución de la funtión TestBed.configureTestingModule(...)
   * * retorne o sea se termine.
   * *
   * * ¿Pero por qué es asíncrona?
   * * Porque normalmente los componentes tienen una contraparte de HTML, es decir, si vemos el 
   * * componente creado hospital.component.ts necesita el hospital.component.html, necesita 
   * * accesar al file system, entonces para poder hacer eso, no necesariamente es instantáneo,
   * * puede demorar un par de segundos, microsegundos, etc.., el detalle es que NO ES INSTANTÁNEO,
   * * y por eso está la función async.
   * *
   * * Ahora, como actualmente el Angular CLI ahora trabaja con WebPack estos componentes tanto el 
   * * html, como su archivo de ts están en el mismo archivo, eso significa que el async() ya no
   * * sería necesario.
   * *
   * * El .compileComponents() tampoco sería necesario ya que estamos trabajando con WebPack ya que 
   * * él tiene al html y ts en el mismo lugar, por lo que no sería necesario llamar a esa función.
   * *
   * * ******************************************************************************************
   * * NOTA: Podemos dejarlo tal como viene, con el async, await... no nos generaría ningún error
   * * ******************************************************************************************
   * * 
   */
  //* Esto lo podríamos usar tal cual, pero solo lo comentarmos para dejar el código como lo hicimos
  //* manualmente.
  beforeEach(async () => {
    // await TestBed.configureTestingModule({
    //   declarations: [ HospitalComponent ]
    // })
    // .compileComponents();
  });

  //* Así fue como lo creamos manualemnte, pero podemos usarlo tal como se crea automáticamente.
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalComponent ]
    }); 

    fixture = TestBed.createComponent(HospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); //* Dispara el ciclo de detección de cambios de Angular
  });

  it('should create a hospital component', () => {
    expect(component).toBeTruthy();
  });
});
