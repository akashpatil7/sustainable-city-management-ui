FROM node:latest as node
WORKDIR /app

COPY package.json /app/package.json
RUN npm install --force
RUN npm install -g @angular/cli@~13.1.4
COPY . /app

# start app
CMD ng serve --host 0.0.0.0