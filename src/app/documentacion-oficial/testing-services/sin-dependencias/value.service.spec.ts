import { ValueService } from './value.service';

describe('ValueService', () => {

    let service: ValueService;

    beforeEach(() => service = new ValueService());

    it('#getValue should return real value', () => {
        //* Arrange
        const expected = 'real value';

        //* Act
        const currentValue = service.getValue();

        //* Assert
        expect(currentValue).toBe(expected);
    });

    //* DoneFn, Método de acción al que se debe llamar cuando se complete el trabajo asíncrono.
    it('#getObservableValue should return value from observable', (done: DoneFn) => {
        const expected = 'observable value';
        service.getObservableValue()
            .subscribe(value => {
                expect(value).toBe(expected);

                done(); //* Llamamos al done() una vez completado el trabajo
            });
    });

    it('#getPromiseValue should return value from a promise', (done: DoneFn) => {
        const expected = 'promise value';
        service.getPromiseValue().then(value => {
            expect(value).toBe(expected);

            done(); //* Llamamos al done() una vez completado el trabajo
        });
    });

});