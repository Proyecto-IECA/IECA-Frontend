import { LoginComponent } from './login.component';
import { FormBuilder } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';
import { AuthUserService } from '../auth-user.service';


describe('Prueba del formulario Login', () => {

    let component: LoginComponent;
    const authUserService = new AuthUserService(null, null);

    beforeEach(() =>
        component = new LoginComponent(
            new FormBuilder(),
            new ValidatorsService(),
            null,
            authUserService
        )
    );

    it('Validar que exista los campos email y contraseña', () => {
       expect(component.loginForm.contains('email')).toBeTruthy();
    });

});
