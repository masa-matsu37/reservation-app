
FROM node:10.19.0-slim
ENV APP_ROOT /app

WORKDIR $APP_ROOT

COPY ./package.json $APP_ROOT
COPY ./package-lock.json $APP_ROOT

RUN npm install -g @angular/cli && \
    apt update && \
    apt install -y git && \
    npm install
