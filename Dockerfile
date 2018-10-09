FROM node:8-alpine

RUN mkdir -p /console
WORKDIR /console
COPY . .

RUN npm install

CMD npm install -g serve && \
	npm run build && \
	serve --port 3030 -s build \

EXPOSE 3030