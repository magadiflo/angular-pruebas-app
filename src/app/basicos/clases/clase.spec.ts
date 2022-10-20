import { Jugador } from './clase';

describe('Pruebas de clase', () => {
    
    const jugador = new Jugador();

    it('Debe retornar 80 de hp si recibe 20 de daño', () => {
        const hp = jugador.recibeDanio(20);
        expect(hp).toBe(80);
    });

    it('Debe retornar 50 de hp si recibe 50 de daño', () => {
        const hp = jugador.recibeDanio(50);
        expect(hp).toBe(50);
    });

});