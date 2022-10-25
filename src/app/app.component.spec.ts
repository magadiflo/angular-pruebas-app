import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
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

  it('Debe tener un link a la página de médicos', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const elementos = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    const resp = elementos.filter(elemento => elemento.attributes['routerLink'] === '/medicos');
    expect(resp.length).toBeGreaterThanOrEqual(1);
  });


});
