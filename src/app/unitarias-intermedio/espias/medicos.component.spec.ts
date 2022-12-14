import { of, EMPTY, throwError } from 'rxjs';
import { MedicosComponent } from './medicos.component';
import { MedicosService } from './medicos.service';


describe('MedicosComponent', () => {

    let componente: MedicosComponent;
    const servicio = new MedicosService();

    beforeEach(() => {
        componente = new MedicosComponent(servicio);
    });


    it('Init: Debe de cargar los médicos', () => {
        const medicos = ['medico1', 'medico2', 'medico3'];

        spyOn(servicio, 'getMedicos').and.callFake(() => {
            return of(medicos);
        });

        componente.ngOnInit();
        expect(componente.medicos.length).toBeGreaterThan(0);
    });

    it('Debe de llamar al servidor para agregar un médico', () => {
        const espia = spyOn(servicio, 'agregarMedico').and.callFake(medico => {
            //* Regresamos un observable vacío porque no nos interesa el resultado, 
            //* solo queremos estar seguros que al agregar un médico se llame el método agregarMedico
            return EMPTY;
        });

        componente.agregarMedico();

        expect(espia).toHaveBeenCalled();
    });

    it('Debe agregar un nuevo médico al arreglo de médicos', () => {
        //* Arrange (organizar/inicializar)
        const medicoBD = { id: 1, nombre: 'Martín' };
        spyOn(servicio, 'agregarMedico').and.returnValue(of(medicoBD));

        //* Act (actuar)
        componente.agregarMedico();

        //* Assert (confirmar/comprobar)
        expect(componente.medicos.indexOf(medicoBD)).toBeGreaterThanOrEqual(0);
    });

    it('Si falla la adición la propiedad mensajeError, debe ser igual al error del servicio', () => {
        const miError = 'No se pudo agregar el médico';
        spyOn(servicio, 'agregarMedico').and.returnValue(throwError(() => new Error(miError)));

        componente.agregarMedico();

        expect(componente.mensajeError).toBe(miError);
    });

    it('Debe de llamar al servidor para borrar el médico', () => {
        //* El objetivo de las pruebas automáticas es que nosotros no intactuemos con
        //* las pruebas, es decir no hagamos click y esas cosas, sino por el contrario
        //* sea la misma prueba que ejecute todo en automático. Entonces, ¿cómo hacemos
        //* para cuando no salga el confirm, dar click en aceptar?
        //* Respuesta: podemos simular ese evento.
        spyOn(window, 'confirm').and.returnValue(true);

        //* No nos interesa que valor retorne, solo nos interesa que la función borrarMedico sea llamada
        const espia = spyOn(servicio, 'borrarMedico').and.returnValue(EMPTY);

        componente.borrarMedico('1');

        expect(espia).toHaveBeenCalledWith('1');
    });

    it('No Debe de llamar al servidor para borrar el médico', () => {
        spyOn(window, 'confirm').and.returnValue(false);
        const espia = spyOn(servicio, 'borrarMedico').and.returnValue(EMPTY);

        componente.borrarMedico('1');

        expect(espia).not.toHaveBeenCalledWith('1');
    });

});
