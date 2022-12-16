import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      //* NO_ERRORS_SCHEMA, Le decimos que ignore cualquier selector que no conozca: directiva, componente, etc.
      //* Esto con la finalidad de no estar Importando los componentes dentro de imports[], ya que podrían haber muchos 
      //* componentes, entonces para evitar importarlos mejor lo ignoramos
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Debe tener un router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const debugElement = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(debugElement).not.toBeNull();
  });

});
