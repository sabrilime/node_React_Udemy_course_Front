FROM node:18.10.0

LABEL version="1.0"
LABEL description="docker image for hotel frontend react app."
LABEL maintainer = ["sabrilioui@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]