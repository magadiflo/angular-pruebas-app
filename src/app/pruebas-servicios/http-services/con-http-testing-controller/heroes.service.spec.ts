import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { HeroesService, Hero } from './heroes.service';
import { HttpErrorHandler } from './servicios/http-error-handler.service';
import { MessageService } from './servicios/message.service';

describe('HeroesService', () => {

  let httpClient: HttpClient;
  let heroService: HeroesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      //* Importamos los servicios de mocking (simulación) de HttpClient.
      //* Es decir, en vez de importar el HttpClientModule, importamos el de mocking HttpClientTestingModule
      imports: [
        HttpClientTestingModule,
      ],
      //* Proporcionar el servicio bajo prueba y sus dependencias
      providers: [
        HeroesService, //* Servicio bajo prueba
        HttpErrorHandler, //* Servicio que maneja los errores
        MessageService, //* Servicio que necesita el HttpErrorHandler
      ]
    });

    //* Inyecte el http, el controlador de prueba y el servicio bajo prueba,
    //* ya que cada prueba hará referencia a ellos
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    heroService = TestBed.inject(HeroesService);
  });

  afterEach(() => {
    //* Después de cada test, verifica que no haya más solicitudes pendientes.
    httpTestingController.verify();
  });

  describe('#getHeroes', () => {

    let expectedHeroes: Hero[];

    beforeEach(() => {
      heroService = TestBed.inject(HeroesService);
      expectedHeroes = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
      ];
    });

    it('debería devolver los héroes esperados (llamados una vez)', () => {
      heroService.getHeroes()
        .subscribe({
          next: heroes => expect(heroes).withContext('deberían regresar los héroes esperados').toEqual(expectedHeroes),
          error: fail,
        });

      //* HeroService debería haber ralizado una solicitud para obtner héroes de la URL esperada
      const req = httpTestingController.expectOne(heroService.heroesUrl);
      expect(req.request.method).toEqual('GET');

      //* Responde con los héroes simulados
      req.flush(expectedHeroes);
    });

    //* Este servicio informa el error, pero encuentra una manera de permitir que la aplicación continúe
    it('debería convertir 404 en un resultado de héroes vacío', () => {

      heroService.getHeroes()
        .subscribe({
          next: heroes => expect(heroes.length).withContext('debería devolver un arreglo de héroes vacío').toEqual(0),
          error: fail,
        });

      const req = httpTestingController.expectOne(heroService.heroesUrl);

      //* Responder con un 404 y el mensaje de error en el cuerpo
      const message = 'error 404 deliberado';

      //* Desencadenamos la ejecución del observable para que el subscribe reciba los valores
      req.flush(message, { status: 404, statusText: 'Not Found' });
    });

    it('debería devolver los héroes esperados (llamados varias veces)', () => {

      heroService.getHeroes().subscribe(); //* 0
      heroService.getHeroes().subscribe();//* 1
      heroService.getHeroes().subscribe({ //* 2
        next: heroes => expect(heroes).withContext('debería retornar los héroes esperados').toEqual(expectedHeroes),
        error: fail,
      });

      const req = httpTestingController.match(heroService.heroesUrl);
      expect(req.length).withContext('Llamadas a getHeroes()').toEqual(3);

      //* Responder a cada petición con diferentes resultados simulados (mock) de hero
      req[0].flush([]);
      req[1].flush([{ id: 1, Name: 'bob' }]);
      req[2].flush(expectedHeroes);
    });

  });

  describe('#updateHero', () => {

    it('debería actualizar el héroe y retornarlo', () => {
      const updateHero: Hero = { id: 1, name: 'A' };

      heroService.updateHero(updateHero)
        .subscribe({
          next: hero => expect(hero).withContext('debería retornar al héroe').toEqual(updateHero),
          error: fail,
        });

      //* El heroService debería haber realizado una solicitud de tipo PUT
      const req = httpTestingController.expectOne(heroService.heroesUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateHero);

      //* Se espera que el servidor retorne al héroe después de actualizar
      const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: updateHero });

      req.event(expectedResponse);
    });

    //* Este servicio informa el error, pero encuentra una manera de permitir que la aplicación continúe
    it('debería convertir el error 404 en el regrso del héroe de actualización', () => {
      const updateHero: Hero = { id: 1, name: 'A' };
      heroService.updateHero(updateHero).subscribe({
        next: data => expect(data).withContext('debería retornar el héroe actualizado').toEqual(updateHero),
        error: fail,
      });

      const req = httpTestingController.expectOne(heroService.heroesUrl);

      //* Responde con un 404 y el mensaje de error en el cuerpo
      const msg = 'error 404 deliberado';
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });

  });

});
