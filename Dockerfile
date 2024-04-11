# https://www.digitalocean.com/community/tutorials/how-to-build-a-node-js-application-with-docker
# https://gist.github.com/zmts/509f224950f85f3cfe4365e2b80081d1

FROM node:20.12.1-alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./

# copy source code to /app/src folder
COPY src /app/src

RUN npm install
RUN npm run build

EXPOSE 3333

CMD [ "node", "./dist/index.js" ]

