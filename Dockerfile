FROM node

WORKDIR /app

COPY "package.json" /app

RUN yarn

COPY . /app

# CMD ["yarn", "dev"]

# workdir é onde vai ficar a raiz da minha aplicação no docker

# FROM postgres:latest

# ARG POSTGRES_PASSWORD=1234

# ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

# WORKDIR /app

# COPY ["package.json", "yarn.lock"] .

# RUN yarn

# COPY . .

# CMD ["yarn", "dev"]
