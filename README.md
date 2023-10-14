# BTV Backend

## [Front-end](https://github.com/Azat-Bilalov/btv-frontend)

## Установка
1. Отредактируйте `.env.example` под ваши переменные
(Установите DOCKERIZED=1 в случае если вы будете запускать приложение в контейнере)
2. Для настройки используйте
```sh
$ sudo chmod +x setup.sh
$ ./setup.sh
```
3.1. Для запуска в контйнере
```sh
$ docker-compose up -d
```
3.2. Для запуска базы в контейнере, а приложения локально
```sh
$ docker-compose -f docker-compose.dev.yaml up -d
```
При этом варианте будет доступна панель администратора mongo-express на порту 8081