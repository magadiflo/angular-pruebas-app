import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MedicosComponent } from '../medicos.component';
import { MedicosService } from '../medicos.service';

describe('PU Componentes con dependencias - FORMA 1', () => {

    let fixture: ComponentFixture<MedicosComponent>;
    let component: MedicosComponent;
    let medicoService: MedicosService;

    /**
     * * waitForAsync()
     * * ***************
     * * Cuango generamos en automático el archivo de pruebas spec, angular crear con un async await, pero
     * * a partir de la versión 12 agregó una función waitForAsync(...) que es una función específicamente 
     * * hecha para esperar a código que estemos esperando dentro de las pruebas unitarias.
     * *
     * * Para usar este waitForAsync(...) o el async await, debemos solo hacerlo cuando ejecutemos el .compileComponents(),
     * * es decir, cuando queremos probar componentes, pero cuando estamos probando servicios no es necesario.
     * */
    /**
     * * ¿Como probar el componente MedicosComponent si este tiene como dependencia a MedicosService y este a su vez de HttpClient?
     * * **************************************************************************************************************************
     * * Recordemos que este archivo es para probar el componente MedicosComponent, este componente 
     * * usa el MedicosService para hacer peticiones HTTP, por lo que está siendo inyectado en el constructor de
     * * nuestro componente a testear. Ahora, a este servicio MedicosService se le inyecta el HttpClient, para
     * * concretar las peticiones HTTP, pero recordemos que nosotros vamos a probar nuestro componente 
     * * MedicosComponent y NO EL SERVICIO MedicosService, peor aún el HttpClient, entonces: ¿Qué podemos hacer
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
     * * **********************************************************
     * * FORMA 1 - Pruebas unitarias a componentes con dependencias
     * * **********************************************************
     * * En providers agregar el MedicosService que es una dependencia de MedicosComponent y su vez ese service tiene la dependencia HttpClient.
     * *
     * * En Imports agregar el HttpClientTestingModule que es similar al HttpClientModule (necesario para que funcione el HttpClient), 
     * * pero que no llama a los servicios, es decir, si nosotros dejampos en imports: HttpClientModule, la llamada al servicio sí se va a realizar, pero
     * * si nosotros lo dejamos como HttpClientTestingModule, esa llamada no se va a ejecutar.
     * *
     * * Para simular esas llamadas a los servicios, es decir simular retorno de valores tal como lo haría la llamada real, usaremos los spyOn.
     * */

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({ //* Crea un módulo específicamente para estas pruebas
            declarations: [
                MedicosComponent,
            ],
            imports: [
                HttpClientTestingModule, //* Este módulo es específico para pruebas que habilita el HttpClient, pero ya no ejecuta los servicios o llamadas reales al servidor
            ],
            providers: [
                //* Le informamos al sistema de inyección de dependencias de Angular sobre esta dependencia
                //* que luego se podrá inyectar en los componentes cuando se solicite a través de un Token de Iny. de Dep.
                //* En este caso, la dependencia y el token es MedicosService.
                MedicosService,
            ]
        }).compileComponents(); //* ¡Importante! cuando estamos probando componentes colocar el .compileComponents(), cuando probamos servios no es necesario
    }));

    beforeEach(() => {
        //* TestBed.createComponent(...), es la que va a instanciar el componente que queremos probar, 
        //* pero ese componente debe estar en el declarations
        fixture = TestBed.createComponent(MedicosComponent);

        //* fixture.componentInstance, Trae la instancia del componente que se ha creado
        component = fixture.componentInstance;

        /**
         * * fixture.detectChanges()
         * * ***********************
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

        /**
         * * TestBed.inject(...)
         * * *******************
         * * Cuando dice TestBed.inject(...) el sistema de inyección de dependencias de Angular
         * * verifica si hay un provider registrado contra el token, en caso afirmativo crea una
         * * instancia del servicio y lo devuelve. Si no encuentra el token, aparecerá el famoso
         * * error: No Provider for MedicosService.
         * *
         * * Por lo tanto, es similar a nuestro código de aplicación, donde primero configuramos 
         * * los proveedores y luego lo inyectamos en nuestros componentes para obtener una instancia 
         * * de ese servicio.
         */
        medicoService = TestBed.inject(MedicosService);
    });

    it('el componente se debe instanciar', () => {
        expect(component).toBeDefined();
        expect(component).toBeInstanceOf(MedicosComponent);
    });

    it('el metodo load debe inicializar el atributo medicos', () => {
        const medicos = [
            { id: 1, name: 'Martha', specialty: 'Cirujía' },
            { id: 2, name: 'Rosa', specialty: 'Medicina' },
            { id: 3, name: 'Susan', specialty: 'Pediatría' },
        ];

        //* Tiene que retornar del mismo tipo que retorna el método real del servicio, en este caso
        //* se debe retornar un Observable<Medico[]> 
        const espia = spyOn(medicoService, 'getMedicos').and.callFake(() => of(medicos));

        expect(component.medicos.length).toBe(0);

        component.load();

        expect(espia).toHaveBeenCalled();
        expect(espia).toHaveBeenCalledOnceWith();

        expect(component.medicos.length).withContext('debe inicializar con médicos').toBe(3);
    });

});