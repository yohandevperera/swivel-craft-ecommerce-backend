## Description
Employee-manager nest js backend.

**Prerequisites**
| Tool | Version |
| ------ | ------ |
| Node | 14.20.0 |
| Yarn | 1.22.15 |
| MySql | 8.0 or later |
| Docker | latest |

**Backend API documentation link**
> http://localhost:5000/api-docs/ 

## Installation

Clone the repository using
```sh
git clone git@github.com:yohandevperera/swivel-employee-manager-backend.git
```
Change the directory to the server using
```sh
cd server
```
Intiate a mongoDB instance using the below link on a docker container
```sh
https://medium.com/@szpytfire/setting-up-mongodb-within-a-docker-container-for-local-development-327e32a2b68d
```
**Please note**
> Add the created container host ip, username and password to the backend .env file  

Install the dependances using 
```bash
$ npm install or yarn 
```

## Setting up environment variables

> copy the .env.example file and rename it to .env 


## Running seeders 

```bash
# to seed all employees
$ npx nestjs-command seed:employees

# to remove all employees
$ npx nestjs-command remove:employees

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
