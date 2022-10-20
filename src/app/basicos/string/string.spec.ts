import { mensaje } from './string';

describe('Pruebas de strings', () => {

    it('Debe regresar un string', () => {
        const resp = mensaje('Martín');
        expect(typeof resp).toBe('string');
    });

});