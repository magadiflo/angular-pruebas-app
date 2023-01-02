import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { LoginService } from './login.service';
import { StorageService } from './storage.service';
import { User } from './user.model';
import { Observable, of } from 'rxjs';

class FakeHttpClient {
  post = jasmine.createSpy('HttpClient.post');
}

class FakeStorageService {
  //* setItem y getItem serán los métodos del StorageService
  //* que se necesita en el LoginService
  setItem = jasmine.createSpy('StorageService.setItem');
  getItem = jasmine.createSpy('StorageService.getItem');
}

describe('LoginService', () => {

  let serviceUnderTest: LoginService;
  let fakeStorageService: StorageService;
  let fakeHttpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: HttpClient, useClass: FakeHttpClient },
        { provide: StorageService, useClass: FakeStorageService },
      ]
    });
    serviceUnderTest = TestBed.inject(LoginService);
    fakeStorageService = TestBed.inject(StorageService);
    fakeHttpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(serviceUnderTest).toBeTruthy();
  });

  it('debe configurar el usuario en el localStorage usando el método storageService setItem', () => {
    const userToken = serviceUnderTest.USER_TOKEN;
    const userData: User = {
      fullName: 'Liz Gonzales',
      email: 'liz@gmail.com',
      password: '123456',
      group: 'A',
    }

    expect(serviceUnderTest.getUser()).toBeUndefined();
    serviceUnderTest.setUser(userData);

    const user = serviceUnderTest.getUser();
    expect(user).toEqual(userData);

    expect(fakeStorageService.setItem).toHaveBeenCalledWith(userToken, user as Object);
  });

  it('debe devolver al usuario del servicio de almacenamiento o devolver el atributo del usuario', () => {
    const userDataFromStorage: User = {
      fullName: 'Vicky Inocente',
      email: 'vicky@gmail.com',
      password: '123456',
      group: 'Z',
    }

    //* Le decimos, cuando se llame al fakeStorageService.getItem, jasmin tienes que crear un spy y retornar un valor
    fakeStorageService.getItem = jasmine.createSpy().and.returnValue(userDataFromStorage);
    expect(serviceUnderTest.getUser()).toEqual(userDataFromStorage);


    //* Para abarcar el segundo caso, es necesario que el getItem retorne un null
    fakeStorageService.getItem = jasmine.createSpy().and.returnValue(null);
    const anotherUser: User = {
      fullName: 'Luis Alberto',
      email: 'luis@gmail.com',
      password: '123456',
      group: 'Y',
    };
    serviceUnderTest.setUser(anotherUser);
    expect(serviceUnderTest.getUser()).toEqual(anotherUser);
  });

  it('debe devolver un observable con estado de inicio de sesión y configurar al usuario usando la respuesta de la publicación http', () => {
    const userDataFromServer: User = {
      fullName: 'Are Caldas',
      email: 'are@gmail.com',
      password: '123456',
      group: 'A',
    };

    const userObservable: Observable<User> = of(userDataFromServer);
    fakeHttpClient.post = jasmine.createSpy().and.returnValue(userObservable);

    const authData = {
      email: 'are@gmail.com',
      password: '123456',
    };
    const URL = serviceUnderTest.URL_AUTH;

    serviceUnderTest.authenticate(authData.email, authData.password)
      .subscribe(loginStatus => {
        expect(fakeHttpClient.post).toHaveBeenCalledWith(URL, authData);
        expect(loginStatus).toBe(true);
      });
  });
});