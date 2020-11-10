FROM node:12-alpine

WORKDIR /code

COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

RUN npm install
RUN npm update

COPY . /code

CMD ["npm", "start"]


