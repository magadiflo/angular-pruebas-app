import { obtenerRoots } from "./arreglos";

describe('Pruebas de arreglos', () => {

    it('Debe retornar al menos 3 robots', () => {
        const res = obtenerRoots();
        expect(res.length).toBeGreaterThanOrEqual(3);
    });

    it('Debe existir MegaMan o Ultrón', () => {
        const res = obtenerRoots();
        expect(res).toContain('MegaMan');
        expect(res).toContain('Ultrón');
    });


});