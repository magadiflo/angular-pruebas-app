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
        //* Arrange
        component.leyenda = 'Progreso de carga';
        const elem: HTMLElement = fixture.debugElement.query(By.css('h3')).nativeElement; //* css(..), si le mandamos directo el elemento lo tomará como un elemento html. Si le anteponemos un ., se llamará como clase
        //* Podríamos haber usado de esata forma tabién, tal como muestra la documentación de Angular
        //*const elem = (fixture.nativeElement as HTMLElement).querySelector('h3');

        //* Act
        fixture.detectChanges(); //* disparar la detección de cambios

        //* Assert
        expect(elem.innerHTML).toContain('Progreso de carga');
    });

    it('Debe mostrar en el input el valor del progreso', () => {
        component.cambiarValor(5);
        fixture.detectChanges(); //* Para llamar el ciclo de detección de Angular y se actualice en todos los lugares

        //* Como la detección de cambio generada por fixture.detectChanges(); puede demorar, es decir
        //* no es instantáneo, quizá tome microsergundos, entonces podríamos usar la función 
        //* fixture.whenStable().... lo que indica es que cuando ya termine la detección de cambios 
        //* y ya esté lista para ser evaluada podemos disparar todo el contenido que vamos a evaluar,
        //* de esa manera las pruebas pasarán, ya que anteriormente sin esta iplementación nos mostraba
        //* el input.value = '', es decir el expect(input.value).toBe('55'); se evaluaba antes de que 
        //* el ciclo de detección e cambios terminara
        fixture.whenStable().then(() => {
            const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
            expect(input.value).toBe('55');
        });
    });

    it('Debe incrementar/decrementar en 5, con un click en el botón', () => {
        const botones = fixture.debugElement.queryAll(By.css('button'));
        botones[0].triggerEventHandler('click', null);
        expect(component.progreso).toBe(45);

        botones[1].triggerEventHandler('click', null);
        expect(component.progreso).toBe(50);
    });

    it('El título del componente debe mostrar el progreso', () => {
        const botones = fixture.debugElement.queryAll(By.css('button'));
        botones[0].triggerEventHandler('click', null);

        fixture.detectChanges();

        const elem: HTMLElement = fixture.debugElement.query(By.css('h3')).nativeElement;
        expect(elem.innerHTML).toContain('45');
    });

});
