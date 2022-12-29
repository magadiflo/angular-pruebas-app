# PruebasApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.4.

# Para iniciar las pruebas
```
ng test
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