import { of, Observable } from 'rxjs';
import { Medico } from '../medico.model';
/**
 * * Este servicio tendrá la misma estructura del servicio MedicosService, 
 * * pero estará hecho específicamente para las pruebas
 */
export class FakeMedicosService {

    getMedicos(): Observable<Medico[]> {
        const medicos: Medico[] = [
            { id: 1, name: 'Dr. Pedro', specialty: 'Pediatría' },
            { id: 2, name: 'Dr. Carillo', specialty: 'General Medicine' },
            { id: 3, name: 'Dr. Dávila', specialty: 'General Medicine' },
            { id: 4, name: 'Dr. Gabriel', specialty: 'Dental' },
        ];
        return of(medicos);
    }

    agregarMedico(): Observable<Medico> {
        const medico = { id: 1, name: 'Dr. Pedro', specialty: 'Pediatría' };
        return of(medico);
    }

    actualizarMedico(): Observable<Medico> {
        const medico = { id: 1, name: 'Dr. Pedro', specialty: 'Pediatría' };
        return of(medico);
    }

    borrarMedico(): Observable<{}> {
        return of({}); //*También se podría retornar un of(null);
    }
}