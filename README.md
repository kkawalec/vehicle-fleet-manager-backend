## Description

Project based on [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
Please note, that for development and deployment you need nest and heroku cli installed on your machine.
In case of any troubles runnning the app, please contact me directly.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Running production build with docker

```bash
docker build -t vehicle-fleet-manager .

docker run -p 8080:8080 vehicle-fleet-manager
```

## Deploy to production

```bash
git push heroku main
```

where "main" is the name of the branch you want to deploy.

App will be deployed to [https://boiling-eyrie-36583.herokuapp.com/](https://boiling-eyrie-36583.herokuapp.com/)
Please note, that app is currently running on free Heroku postgres db, which can stop working after Heroku update on 28th October.

## Frontend app

Code is on [Github](https://github.com/kkawalec/vehicle-fleet-manager-frontend)
And working example is deployed to [https://aedriell-vehicles-fleet-manager.surge.sh/](https://aedriell-vehicles-fleet-manager.surge.sh/)