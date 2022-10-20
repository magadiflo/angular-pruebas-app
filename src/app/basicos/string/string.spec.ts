import { mensaje } from './string';

describe('Pruebas de strings', () => {

    it('Debe regresar un string', () => {
        const resp = mensaje('Martín');
        expect(typeof resp).toBe('string');
    });

    it('Debe contener en la cadena del saludo el nombre enviado', () => {
        const nombre: string = 'Martín';
        const resp = mensaje(nombre);
        expect(resp).toContain(nombre);
    });

});