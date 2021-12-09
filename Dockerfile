FROM node:lts-buster

SHELL ["/bin/bash", "-c"]

COPY . /materials

WORKDIR /materials

RUN yarn install --network-timeout 6000000

RUN yarn build

CMD [ "yarn", "start" ]