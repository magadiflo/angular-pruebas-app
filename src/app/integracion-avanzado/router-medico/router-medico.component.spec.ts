import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';

import { RouterMedicoComponent } from './router-medico.component';
import { Observable, EMPTY, Subject } from 'rxjs';

//* La única función que nos interesa probar del Router es el .navigate(...).
//* Por eso definimos una función con el mismo nombre dentro de esta clase Fake.
//* Si hubieran más métodos que nos interesaría usar, entonces también la definiríamos.
class FakeRouter {
  navigate(params: any) { }
}

//* Como también necesitamos un ActivatedRoute, creamos esta clase Fake e internamente
//* le agregamos un parámetro llamado params que nos devolverá un tipo Observable 
//* que usaremos en reemplazo del parámetro real
class FakeActivatedRoute {
  //params: Observable<any> = EMPTY;
  private subject = new Subject();

  get params() {
    return this.subject.asObservable(); //* se quiere regresar un nuevo observable
  }

  push(valor: any) {
    this.subject.next(valor);
  }
}

describe('RouterMedicoComponent', () => {
  let component: RouterMedicoComponent;
  let fixture: ComponentFixture<RouterMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RouterMedicoComponent],

      //* 1. ¿Por qué debemos importar y colocar dentro del providers el Router y ActivatedRoute?
      //*       Porque este componente (router-medicos.component.ts) los requiere, ya que están siendo inyectados en su constructor
      //* 2. ¿Cómo le podemos decir al configureTestingModule que ese Router será un router falso?
      //*       En este caso, le diremos que en vez de que use el Router, use la clase FakeRouter (es lo que le decimos en ese objeto { provide: Router, useClass: FakeRouter })
      //* Lo mismo ocurriría con el ActivatedRoute, le decimos qu en vez de que use eso, que use nuestra clase Fake FakeActivatedRoute.
      providers: [
        { provide: Router, useClass: FakeRouter }, //* En vez de usar el Router que use el FakeRouter
        { provide: ActivatedRoute, useClass: FakeActivatedRoute },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe redireccionar a Médico cuando se guarde', () => {
    //* const router = TestBed.get(Router); //.get() quedó deprecado a partir de Angular 9
    const router = TestBed.inject(Router); //* en reemplazo del get() usamos el inject() 
    const spy = spyOn(router, 'navigate'); //* observa el router su método navigate (en el componente router-medico.component.ts)

    component.guardarMedico(); //* Cuando se de en guardarMedico(), internamente se hace uso del navigate

    expect(spy).toHaveBeenCalledWith(['medico', '123']);
  });

  it('Debe colocar el id = nuevo', () => {
    component = fixture.componentInstance;
    //* const activatedRoute: FakeActivatedRoute = TestBed.get(ActivatedRoute);
    //* Aquí usamos igual el inject, pero este sí necesitaba ser casteado
    const activatedRoute: FakeActivatedRoute = (TestBed.inject(ActivatedRoute) as unknown as FakeActivatedRoute);
    activatedRoute.push({ id: 'nuevo' });
    expect(component.id).toBe('nuevo');
  });

});
