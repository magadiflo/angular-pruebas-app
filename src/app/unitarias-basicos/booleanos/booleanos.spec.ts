import { usuarioLogeado } from './booleanos';

describe('Pruebas de booleanos', () => {

    it('Debe de retornar true', () => {
        const res = usuarioLogeado();
        expect(res).toBeTruthy();
    });

});