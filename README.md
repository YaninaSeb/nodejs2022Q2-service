# REST service

### ***Учебный проект из курса [The Rolling Scopes School  NodeJS](https://rs.school/nodejs/)***  
***Выполнен:  июль 2022***  

## Описание проекта
Сервер для работы с определенными ресурсами, который использует базу данных.   
Пользователь может создавать, читать, обновлять и удалять данные Artists, Tracks и Albums, добавлять их в Favorites.  
[Ссылка на задание. Часть 1](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md)   
[Ссылка на задание. Часть 2](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/containerization/assignment.md)   
[Ссылка на задание. Часть 3](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/database-orm/score.md)   
[Ссылка на задание. Часть 4](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/authentication/assignment.md)   


## Инструкция по установке и запуску
Клонировать репозиторий

   ```git clone https://github.com/YaninaSeb/nodejs2022Q2-service.git```   

Перейти на ветку в соответствии с частью задания

   ```git checkout develop```   

   ```git checkout containerization```   

   ```git checkout typeorm```   

   ```git checkout authentication```   

Установить зависимости   

   ```npm install```   

Запустить     

   ```npm run start:dev``` 
   
Если предполагается использование Docker, запустить следующим образом

   ```npm run docker``` 


## Прохождение тестов

При локальном запуске приложения   

    npm run test   

При запуске приложения через Docker   

    docker container exec docker-app npm run test   

При локальном запуске приложения с подключенной авторизацией   

    docker container exec docker-app npm run test:auth   



## После запуска приложения на порту (4000 по умолчанию) вы можете открыть в своем браузере документацию OpenAPI на ```http://localhost:4000/doc/```

