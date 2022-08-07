# REST service: Containerization, Docker

## Install

Clone  repository

```
git clone https://github.com/YaninaSeb/nodejs2022Q2-service.git
```

Switch to  branch 

```
authentication
```

## Start app with Docker

```
npm run docker
```


## Scanning images

```
npm run docker:scan:app
```
```
npm run docker:scan:db
```


## Testing

To run all test with authorization

```
docker container exec docker-app npm run test:auth
```



### Application starts on port 4000 by default 


### After starting the app you can open in your browser OpenAPI documentation by typing ```http://localhost:4000/doc/```

