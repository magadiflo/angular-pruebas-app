# PruebasApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.4.

# Para iniciar las pruebas
```
ng test
```

# Para ver estadísticas de las pruebas
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
