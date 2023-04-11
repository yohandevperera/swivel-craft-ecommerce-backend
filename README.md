## Description
Craft E-Commerce nest js backend.

**Prerequisites**
| Tool | Version |
| ------ | ------ |
| Node | 14.20.0 |
| Yarn | 1.22.15 |
| MySql | 8.0 or later |
| Docker | latest |
| gcloud SDK | latest |

**Backend API documentation link**
> http://localhost:5000/api-docs/ 

## Installation

Clone the repository using
```sh
git clone git@github.com:yohandevperera/swivel-craft-ecommerce-backend.git
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
# to seed all craft-categories
$ npx nestjs-command seed:craft-categories

# to remove all craft-categories
$ npx nestjs-command remove:craft-categories

# to seed all crafts
$ npx nestjs-command seed:crafts

# to remove all crafts
$ npx nestjs-command remove:crafts

# to seed all users
$ npx nestjs-command seed:users

# to remove all users
$ npx nestjs-command remove:users

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

## Production Setup

> To deploy the server in the production environment a GCP web service should be created

```bash
# Build the server docker image
 docker build -t swviel-craft-e-commerce-backend --network=host .
 
# Run the built docker image on local to validate if the container works
 docker run -p 8000:80 swviel-craft-e-commerce-backend
 
```

> download the latest gcloud SDK from 
https://cloud.google.com/sdk/docs/install

> create a new project in GCP which includes container registry and cloud run

```bash
# Validate if the gcloud is installed by running the below command
 gcloud
 
# Login to the gcloud dashboard
 gcloud auth login
 
 # Login to the gcloud dashboard
 gcloud auth login
 
 # Create a docker tag
 docker tag swviel-employee-manager-backend gcr.io/{project-name}/swviel-craft-e-commerce-backend
 
 # Push the docker image to the container registry
 docker push gcr.io/{project-name}/swviel-craft-e-commerce-backend
 
```

> create a new service in cloud run using the below link
https://cloud.google.com/run/docs/quickstarts/deploy-container

> Thats it you have deployed !!
