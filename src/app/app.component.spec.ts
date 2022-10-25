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
      schemas: [
        NO_ERRORS_SCHEMA, //* Ignorará cualquier directiva, componente que no conozca
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
