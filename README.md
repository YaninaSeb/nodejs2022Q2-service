# REST service: Containerization, Docker

## Downloading

```
git clone https://github.com/YaninaSeb/nodejs2022Q2-service.git
```



## Running application (using Docker)

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

## Remote docker images (in DokerHub)

Rest service

```
docker pull
```

Database

```
docker pull
```


## Testing

After application running open new terminal and enter:

To run all tests

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```


## Auto-fix and format

```
npm run lint
```

```
npm run format
```
