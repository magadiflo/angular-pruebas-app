import { incrementar } from './numeros';

describe('Pruebas de números', () => {

    it('Debe retornar 100 si el número ingresado es mayor a 100', () => {
        const res = incrementar(105);
        expect(res).toBe(100);
    });

    it('Debe retornar el número enviado + 1, si no es mayor a 100', () => {
        const res = incrementar(50);
        expect(res).toBe(51);
    });

});