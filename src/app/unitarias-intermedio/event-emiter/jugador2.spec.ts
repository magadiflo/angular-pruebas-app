import { Jugador2 } from './jugador2';

describe('Jugador 2 Emit', () => {

    let jugador: Jugador2;

    beforeEach(() => jugador = new Jugador2());

    it('Debe emitir un evento cuando recibe daño', () => {
        let nuevoHp = 0;

        //* Importante, aquí el subscribe(...) aunque es asíncrona, nuestra prueba
        //* espera que eso se resuelva para continuar. Más adelante, en otros ejercicios
        //* se verán códigos realmente asíncronos
        jugador.hpCambia.subscribe(hp => nuevoHp = hp);

        jugador.recibeDanio(1000);

        expect(nuevoHp).toBe(0);
    });

    it('Debe emitir un evento cuando recibe daño y sobrevivir si es menor de 100', () => {
        let nuevoHp = 0;

        jugador.hpCambia.subscribe(hp => nuevoHp = hp);

        jugador.recibeDanio(50);

        expect(nuevoHp).toBe(50);
    });

});