


FROM node:18.10.0 as build

WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn global add @nestjs/cli
RUN yarn
COPY . .
RUN yarn build

FROM node:18.10.0
WORKDIR /app
COPY package.json .
RUN yarn --production
RUN yarn add yargs
COPY --from=build /app/dist ./dist
COPY .env.example .env
RUN yarn seed:employees
CMD yarn start
