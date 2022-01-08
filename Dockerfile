FROM node:16.13-buster-slim

SHELL ["/bin/bash", "-c"]

COPY . /materials

WORKDIR /materials

RUN yarn install --network-timeout 600000

RUN yarn build

CMD [ "yarn", "start" ]