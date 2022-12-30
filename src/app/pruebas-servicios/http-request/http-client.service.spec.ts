/**
 * * *************************
 * * Testing HTTP Request
 * * *************************
 * *
 * * En cuanto a cualquier dependencia externa, debe simular el servidor HTTP 
 * * para que sus pruebas puedan simular la interacción con un servidor remoto.
 * * La biblioteca @angular/common/http/testing facilita la configuración 
 * * de dicha simulación.
 * *
 * * La biblioteca de testing de HTTP de Angular está diseñada para un patrón
 * * de prueba en el que la aplicación ejecuta el código y realiza las solicitudes
 * * primero. Luego, la prueba espera que se hayan realizado o no ciertas solicitudes,
 * * realiza  aserciones contra las soclitudes y, finalmente, proporciona respuestas
 * * "vaciando" cada solicitud esperada.
 * *
 * * Al final, las pruebs pueden verificar que la aplicación no haya realizado
 * * solicitudes inesperadas.
 * /
 
/* 
 * * ******************************
 * * Configuración para las pruebas
 * * ******************************
 * * Para comenzar a probar las llamadas a HttpClient (que es propio de Angular),
 * * importe: HttpClientTestingModule y el controlador de mocking: HttpTestingController,
 * * junto con los demás símbolos que requieran sus pruebas.
 */

import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

describe('HttpClient testing', () => {

  //* HttpClient, la que usamos siempre para hacer peticiones http al backend
  let httpClient: HttpClient;

  //* HttpTestingController, controlador para ser inyectado en las pruebas, que permite la
  //* simulación y el vaciado de solicitudes. La simulación de las solicitudes se realizan
  //* en lugar de realizar solicitudes de API reales.
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      //* HttpClientTestingModule, es similar al HttpClientModule (necesario para el HttpClient), pero que no llama a los servicios reales.
      //* El módulo HttpClientTestingModule permite recuperar una instancia de HttpTestingController.
      imports: [HttpClientTestingModule]
    });

    //* Inyecte el servicio http y el controlador de test para cada prueba
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  /**
   * * Ahora, con la configuración realizada en la parte superior, cada vez que
   * * se hagan solicitudes en el transcurso de las pruebas, estas solicitudes 
   * * llegarán al "backend de las pruebas" en lugar del backend normal.
   * *
   * * Esta configuración también llama al TestBed.inject() para inyectar el
   * * servicio HttpClient y el controlador simulado (mocking) para que puedan
   * * ser referenciados durante las pruebas.
   */

  afterEach(() => {
    //* Después de cada prueba, verifica que no hay más solicitudes pendientes.
    httpTestingController.verify();
  });

  /**
   * * ***********************************************
   * * Esperando y respondiendo solicitudes (REQUEST)
   * * ***********************************************
   * * Ahora puede escribir una prueba que espera que ocurra una solicitud GET
   * * y proporcione una respuesta simulada
   */
  it('puede probar el HttpClient.get', () => {
    const testData: Data = { name: 'Test Data' };

    //* Hacemos una petición HTTP GET
    httpClient.get<Data>(testUrl)
      .subscribe(data => {
        //* Cuando se resuelve el observable, el resultado debe coincidir con el testData
        expect(data).toEqual(testData); //* [A]
      });

    /**
     * * expectOne(...), Espere que se haya realizado una sola solicitud que coincida 
     * * con la URL dada y devuelva su simulación.
     * *
     * * Si no se ha realizado ninguna solicitud de este tipo, o se ha realizado más 
     * * de una solicitud de este tipo, falla con un mensaje de error que incluye 
     * * la descripción de la solicitud dada, si corresponde.
     */
    const req = httpTestingController.expectOne('/data');

    //* Comprueba que la solicitud en un GET
    expect(req.request.method).toEqual('GET');

    //* flush(...), responde con mocks (datos simulados), lo que hace que el Observable
    //* se resuelva. La devolución de llamada de Subscribe afirma que se 
    //* devolvieron los datos correctos.
    req.flush(testData); //* Esa verificación de la prueba se realiza en ---> [A]
  });

  it('puede probar HttpClient.get con el encabezado correspondiente', () => {
    const testData: Data = { name: 'Test Data' };

    //* Realice una solicitud HTTP GET con un encabezado específico
    httpClient.get<Data>(testUrl, { headers: new HttpHeaders({ 'Authorization': 'my-auth-token' }) })
      .subscribe(data => {
        expect(data).toEqual(testData);
      });

    //* Busca una petición con una función de predicado
    //* Espera una solicitud con un encabezado de autorización
    const req = httpTestingController.expectOne(
      request => request.headers.has('Authorization')
    );

    req.flush(testData);
  });

  it('puede probar múltiples REQUEST', () => {
    const testData: Data[] = [
      { name: 'bob' },
      { name: 'carol' },
      { name: 'ted' },
      { name: 'alice' },
    ];

    //* Haciendo tres request seguidas
    httpClient.get<Data[]>(testUrl)
      .subscribe(data => expect(data.length).withContext('no debería tener datos').toEqual(0));

    httpClient.get<Data[]>(testUrl)
      .subscribe(data => expect(data).withContext('no tener un elemento en el arreglo').toEqual([testData[0]]));

    httpClient.get<Data[]>(testUrl)
      .subscribe(data => expect(data).withContext('deben ser los datos esperados').toEqual(testData));

    //* Obtener todas las solicitudes pendientes que coincidan con la URL dada
    const requests = httpTestingController.match(testUrl);
    expect(requests.length).toEqual(3);

    //* Responder a cada solicitud con resultados diferentes
    requests[0].flush([]);
    requests[1].flush([testData[0]]);
    requests[2].flush(testData);
  });

  it('puede probar el error 404', () => {
    const emsg = 'deliberate 404 error';

    httpClient.get<Data[]>(testUrl)
      .subscribe({
        next: () => fail('debería haber fallado con el error 404'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).withContext('status').toEqual(404);
          expect(error.error).withContext('message').toEqual(emsg);
        },
      });

    const req = httpTestingController.expectOne(testUrl);

    //* Responder con el error simulado
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });

});

const testUrl: string = '/data';

interface Data {
  name: string;
}
