import { Jugador } from './clase';

describe('Pruebas de clase', () => {
    
    let jugador = new Jugador();

    beforeAll(() => {
        console.log('beforeAll');
    });

    beforeEach(() => {
        jugador = new Jugador();
        console.log('beforeEach');
    });

    afterEach(() => {
        console.log('afterEach');
    });

    afterAll(() => {
        console.log('afterAll');
    });

    it('Debe retornar 80 de hp si recibe 20 de daño', () => {
        const hp = jugador.recibeDanio(20);
        expect(hp).toBe(80);
    });

    it('Debe retornar 50 de hp si recibe 50 de daño', () => {
        const hp = jugador.recibeDanio(50);
        expect(hp).toBe(50);
    });

    it('Debe retornar 0 si recibe 100 o más de daño', () => {
        const hp = jugador.recibeDanio(101);
        expect(hp).toBe(0);
    });

});