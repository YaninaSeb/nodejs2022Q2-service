# REST service: Containerization, Docker

## Install and use with Docker Compose

Clone  repository

```
git clone https://github.com/YaninaSeb/nodejs2022Q2-service.git
```

Switch to  branch 

```
containerization
```

Build image and start container

```
npm run docker
```


Scanning images

```
npm run docker:scan:app
```
```
npm run docker:scan:db
```


Testing

```
docker container exec docker-app npm run test
```


## Install and use local

Clone  repository

```
git clone https://github.com/YaninaSeb/nodejs2022Q2-service.git
```

Switch to  branch 

```
containerization
```

Install dependencies

```
npm install
```

Start REST service

```
npm run start:dev
```

Testing

```
npm run test
```


### Application starts on port 4000 by default   


### After starting the app you can open in your browser OpenAPI documentation by typing ```http://localhost:4000/doc/```

