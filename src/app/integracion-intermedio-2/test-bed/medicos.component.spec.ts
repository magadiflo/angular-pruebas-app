import { MedicosComponent } from './medicos.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
//* import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MedicosService, Medico } from './medicos.service';
import { of, Observable } from 'rxjs';

class FakeMedicosService {

    getMedicos(): Observable<Medico[]> {
        const medicos: Medico[] = [
            { id: 1, name: 'Dr. Pedro', specialty: 'Pediatría' },
            { id: 2, name: 'Dr. Carillo', specialty: 'General Medicine' },
            { id: 3, name: 'Dr. Dávila', specialty: 'General Medicine' },
        ];
        return of(medicos);
    }

}

describe('[Integración intermedio 2 - TestBed] MedicosComponent', () => {

    let fixture: ComponentFixture<MedicosComponent>;
    let component: MedicosComponent;
    /**
     * * Cuango generamos en automático el archivo de pruebas spec, angular crear con un async await, pero
     * * a partir de la versión 12 agregó una función waitForAsync(...) que es una función específicamente 
     * * hecha para esperar a código que estemos esperando dentro de las pruebas unitarias.
     * *
     * * Para usar este waitForAsync(...) o el async await, debemos solo hacerlo cuando ejecutemos el .compileComponents(),
     * * es decir, cuando queremos probar componentes, pero cuando estamos probando servicios no es necesario.
     * *
     * * Recordemos que este archivo es para probar el componente MedicosComponent, este componente 
     * * usa el MedicosService para hacer peticiones HTTP, por lo que está siendo inyectado en el constructor de
     * * nuestro componente a testear. Ahora, a este servicio MedicosService se le inyecta el HttpClient, para
     * * concretar las peticiones HTTP, pero recordemos que nosotros vamos a probar nuestro componente 
     * * MedicosComponent y NO el servicio MedicosService, peor aún el HttpClient, entonces: ¿Qué podemos hacer
     * * para probar solo nuestro componente MedicosComponent si vemos que este depende de un servicio y este
     * * a su vez del HttpClient (que es de Angular)?
     * *
     * * >>> Lo que se puede hacer es usar el TestBed.configureTestingModule({...}) para declarar el componente
     * * que vamos testear: declarations: [MedicosComponent,], 
     * * y en los imports, agregar: imports: [HttpClientModule,].
     * *
     * * Ok, eso soluciona el problema de las dependencias, pero recordemos que el HttpClientModule es quien usamos 
     * * para poder importar el HttpClient en nuestros servicios y quien nos permitirá hacer las llamadas a los endpoints,
     * * pero eso hará la llamada real y nosotros no queremos usar esos datos reales ya que lo que queremos probar es el 
     * * componente y no el servicio.
     * * 
     * * Entonces, ¿que haremos?, existe muchas formas de solucionar
     * *
     * * PRIMERA FORMA:
     * * En providers agregar el MedicosService que es una dependencia de MedicosComponent y su vez el service tiene tiene la dependencia HttpClient
     * * En Imports agregar el HttpClientTestingModule que es similar al HttpClient, pero que no llama a los servicios. Para simular esas llamadas
     * * a los servicios, es decir simular retorno de valores tal como lo haría la llamada real, usaremos los spyOn
     * *
     * * SEGUNDA FORMA:
     * * - En la primera forma usábamos en el imports: [HttpClientModule,], aquí no usaremos eso, el resto de la primera configuración sí.
     * * - Lo que haremos será crear una clase similar al del servicio y en el providers decirle que usaremos nuestro FakeMedicosService
     * *   en vez de la clase de servicio real MedicosService.
     * * - En la clase FakeMedicosService, definimos el mismo método y tipo de retorno que necesitamos que nos devuelva ese servicio, es decir
     * *   el método que necesitamos para hacer la prueba, en nuestro caso sería este:  getMedicos(): Observable<Medico[]> {...}
     * * - Finalmente vemos que en ningún momento nos pide que importemos el HttpClient o el HttpClientTestingModule porque ya no lo necesitamos,
     * *   puesto que ahora ya no usamos el MedicosService sino el FakeMedicosService
     * *
     */

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({ //* Crea un módulo solo para estas pruebas
            declarations: [
                MedicosComponent,
            ],
            providers: [
                { provide: MedicosService, useClass: FakeMedicosService },
            ],
        }).compileComponents(); //* Importante cuando estamos probando componentes colocar el .compileComponents(), cuando probamos servios no es necesario
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MedicosComponent);
        component = fixture.componentInstance;
        /**
         * * Si nosotros tuviéramos un @Input, o algún dato que se va a inicializar dentro del componente,
         * * lo recomendable es que al último nosotros llamemos al fixture.detectChanges() para que pueda
         * * detectar cualquiera de esos cambios que estamos haciendo dentro del componente hacia la vista,
         * * por ejemplo, si tenemos una variable inicializada como el que sigue: titulo: string = 'Hola Mundo';
         * * y queremos que esa información se vea reflejado en el html, es que necesitamos colocar ese detectChanges(), 
         * * pero eso en el caso que nosotros quisiéramos probar el HTML como tal. 
         * * 
         * * Según se menciona en este tutorial, del cual estoy extrayendo estos comentarios (https://www.youtube.com/watch?v=tiIqfNVvsHc)
         * * (Pruebas unitarias con Angular 12 - Galaxy Training), por lo general probar la información que se muestra en la
         * * pantalla (html) es parte de las pruebas End-To-End, no tanto de las Pruebas Unitarias, pero también se puede incluir,
         * * aunque en este tutorial se enfoca más que todo a probar el código en TypeScript
         */
        fixture.detectChanges();
    });

    it('Retorna lista de médicos', () => {
        //* Arrange

        //* Como hasta este punto ya estamos usando una clase Fake (FakeMedicosService), 
        //* podemos usar el .callThrough(); para decirle que se ejecute como normalmente se ejecuta, es decir,
        //* como ahora en vez de usar la clase MedicosService estamos usando la clase FakeMedicosService, con 
        //* .callThrough() ejecutaremos el método getMedicos(...) y este devolverá lo que esté definido en él.
        //* 
        //* NOTA: Si quisiéramos sobreescribir dicho método para hacer alguna prueba en específico, no habría problemas y
        //* lo sobreescribimos haciendo como hacíamos normalmente: 
        //*
        //* - llamar al spyOn(...).and.callFake(() => ....)
        //* - Otra forma sería llamar al returnValue: spyOn(...).and.returnValue(....)
        //*  
        //* La diferencia con returnValue es que se pasa defrente la respuesta y no usa un arrow function
        spyOn(component._medicoService, 'getMedicos').and.callThrough();

        //* Act
        component.load();

        //* Assert
        expect(component.medicos.length).toBe(3);
    });


});
