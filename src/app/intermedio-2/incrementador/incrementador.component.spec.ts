import { TestBed, ComponentFixture } from '@angular/core/testing';
import { IncrementadorComponent } from './incrementador.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';


describe('Incremendator Component', () => {

    let component: IncrementadorComponent;
    let fixture: ComponentFixture<IncrementadorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [IncrementadorComponent],
            imports: [FormsModule]
        });

        fixture = TestBed.createComponent(IncrementadorComponent);
        component = fixture.componentInstance;

    });

    it('Debe mostrar la leyenda', () => {
        component.leyenda = 'Progreso de carga';
        fixture.detectChanges(); //* disparar la detección de cambios

        const elem: HTMLElement = fixture.debugElement.query(By.css('h3')).nativeElement; //* css(..), si le mandamos directo el elemento lo tomará como un elemento html. Si le anteponemos un ., se llamará como clase
        expect(elem.innerHTML).toContain('Progreso de carga');
    });

    it('Debe mostrar en el input el valor del progreso', () => {
        component.cambiarValor(5);
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
            expect(input.value).toBe('55');            
        });
    });

});
