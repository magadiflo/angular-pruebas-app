import { MedicoComponent } from './medico.component';
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HttpClientModule } from '@angular/common/http';
import { MedicoService } from './medico.service';

describe('Médico Component [Prueba de integración]', () => {

    let component: MedicoComponent;
    let fixture: ComponentFixture<MedicoComponent>;
    /**
     * * Recordar que cuando hacíamos Pruebas Unitarias, 
     * * inicializábamos el objeto a testear de la siguiente manera:
     * *        beforeEach(() => component = new MedicoComponent());
     * *
     * * Ahora, para las Pruebas de Integración ya no lo haremos así
     * * Tenemos que decirle a Angualr que compile la forma para poder 
     * * obtener acceso al HTML y otros componentes que puede ser que
     * * el MedicoComponent necesite o utilice. Es decir, le diremos 
     * * a Angular que compile y que se prepare para que trabaje con su
     * * ciclo de detección de cambios, para que use los pipes, y use
     * * x cantidad de cosas de Angular, entonces para eso necesitamos 
     * * importar el TestBed.
     * * TestBed, nos ayudará hacer pruebas con los elementos  y componentes 
     * * ya propiamente de Angular.
     */
    beforeEach(() => {
        //* El objeto dentro del configureTestingModule({}) es casi similar al objeto que recibe 
        //* el @NgModule, la diferencia es que aquí solo colocaremos las cosas que necesitaremos 
        //* para probar este componente, además de las cosas que quizá requiera su html
        TestBed.configureTestingModule({
            declarations: [MedicoComponent],
            imports: [HttpClientModule],
            providers: [MedicoService]
        });

        //* Ahora, necesitamos crear un componente ya compilado y procesado por el TestBed
        //* Ese método regresa un ComponentFixture, el cual nos ayudará a tener acceso al HTML (DOM)
        fixture = TestBed.createComponent(MedicoComponent);
        component = fixture.componentInstance;
    });

    it('Debe de crear un componente', () => {
        expect(component).toBeTruthy();
    });

    it('El saludo retornado debe contener el nombre del médico enviado', () => {
        const nombre = 'Martín';
        const saludo = component.saludarMedico(nombre);

        expect(saludo).toContain(nombre);
    });

});