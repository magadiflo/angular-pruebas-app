import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';

import { RouterMedicoComponent } from './router-medico.component';
import { Observable, EMPTY, Subject } from 'rxjs';

class FakeRouter {
  navigate(params: any) { }
}

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
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate'); //* observa el router su método navigate (en el componente router-medico.component.ts)

    component.guardarMedico(); //* Cuando se de en guardarMedico(), internamente se hace uso del navigate

    expect(spy).toHaveBeenCalledWith(['medico', '123']);
  });

  it('Debe colocar el id = nuevo', () => {
    component = fixture.componentInstance;
    const activatedRoute: FakeActivatedRoute = TestBed.get(ActivatedRoute);
    activatedRoute.push({ id: 'nuevo' });
    expect(component.id).toBe('nuevo');
  });

});
