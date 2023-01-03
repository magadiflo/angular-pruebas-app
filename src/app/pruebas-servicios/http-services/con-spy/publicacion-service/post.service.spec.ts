import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { PostService, Post } from './post.service';

describe('PostService', () => {

  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let postService: PostService;

  let POSTS: Post[] = [
    { id: 1, body: 'body 1', title: 'title 1' },
    { id: 2, body: 'body 2', title: 'title 2' },
    { id: 3, body: 'body 3', title: 'title 3' },
  ];

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['get', 'delete']);
    postService = new PostService(httpClientSpy);
  });

  describe('getPosts()', () => {

    //* done, importante colocarlo, ya que como estamos en un subscribe no sabemos el tiempo que tardará en obtenerse la respuesta
    it('should return expected posts when getPosts is called', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(POSTS));

      postService.getPosts()
        .subscribe({
          next: posts => {
            expect(posts).toEqual(POSTS);
            done(); //* le decimos que se ha completado este expect(...)
          },
          error: err => done.fail //* falla la especificación e indica que se ha completado. Si el mensaje es un error, se utiliza Error.message
        });

      expect(httpClientSpy.get.calls.count()).withContext('Forma 1: se espera que se haga solo una petición').toBe(1);
      expect(httpClientSpy.get).withContext('Forma 2: se espera que se haga solo una petición').toHaveBeenCalledTimes(1);

    });

  });

});
