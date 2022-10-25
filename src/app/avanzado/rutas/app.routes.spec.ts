import { MedicosComponent } from '../../intermedio/espias/medicos.component';
import { RUTAS } from './app.routes';

describe('Rutas principales', () => {

    it('Debe existir la ruta /medico/:id', () => {
        expect(RUTAS).toContain(
            { path: 'medico/:id', component: MedicosComponent }
        );
    });

});