# PruebasApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.4.

# Para iniciar todas las pruebas
```
ng test
```

# Para iniciar una prueba en específico
Supongamos que solo queremos testear el archivo de pruebas **login.service.spec.ts** y en el proyecto
tenemos muchos archivos de pruebas.  
Para lograr eso usamos la bandera **--include** y lo igualamos a 
la ruta empezando por **src\app.....**  hasta donde se encuentre el archivo a testear.
```
ng test --include=src\app\pruebas-servicios\http-services\login-service\login.service.spec.ts
```

# Para iniciar un grupo de pruebas en específico
Supongamos que en el proyecto tenemos muchos archivos de pruebas ubicadas en distintos directorios, pero nosotros <br>
solo queremos ejecutar el conjunto de pruebas ubicadas en un directorio específico y no todas las pruebas del proyecto.  
Para eso haremos como en el caso anterior, pero esta vez la ruta será hasta el directorio raíz que contenga el conjunto de pruebas.
```
ng test --include=src\app\unitarias-basicos\
```

# Para ver estadísticas de las pruebas

Genera el reporte de la covertura de pruebas y está pendiente para actualizarlo en tiempo real
```
ng test --code-coverage
```

Genera el reporte de la covertura de pruebas
```
ng test --no-watch --code-coverage
```

# Importante
Tener Chrome para compilar las estadísticas, sino no se podrá

## ¿Cómo ignorar una prueba?
Colocar una x delante del método describe(....): xdescribe(...), de esa forma ignorará todas las pruebas
que estén dentro


## Partes de una prueba
Agrupara las pruebas
```
describe();
```

Es una prueba
```
it();
```

--- 

# Fuentes a consultar
- Galaxy Training (youtube) [Pruebas unitarias con Angular 12](https://www.youtube.com/watch?v=tiIqfNVvsHc)

# Documentación Oficial de Angular
- [Testing Services](https://angular.io/guide/testing-services)
- [Testing de heroes.service.ts](https://stackblitz.com/run?file=src%2Fapp%2Fheroes%2Fheroes.service.ts)
- [Creando pruebas unitarias para un Servicio en Angular | LoginService](https://medium.com/boolean-chile/creando-pruebas-unitarias-para-un-servicio-en-angular-807732534d78)
- [Testing Asynchronous Operations in Angular Components](https://medium.com/@menloinnovations/testing-asynchronous-operations-in-angular-components-45d1ebad3864)