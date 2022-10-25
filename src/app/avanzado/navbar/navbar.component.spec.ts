import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';

import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule], //* Aquí se encuentran todos los elementos de las rutas
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe tener un link a la página de médicos', () => {
    const elementos = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    const resp = elementos.filter(elemento => elemento.attributes['routerLink'] === '/medicos');
    expect(resp.length).toBeGreaterThanOrEqual(1);
  });
});
