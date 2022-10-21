import { FormularioRegister } from './formulario';
import { FormBuilder } from '@angular/forms';

describe('Formularios', () => {

    let componente: FormularioRegister;

    beforeEach(() => componente = new FormularioRegister(new FormBuilder()));

    it('Debe de crear un formulario con dos campos: email y password', () => {
        expect(componente.form.contains('email')).toBeTruthy();
        expect(componente.form.contains('password')).toBeTruthy();
    });

});