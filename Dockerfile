FROM node:lts-buster

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ffmpeg \
    imagemagick \
    webp && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /usr/src/app

COPY package.json .

RUN npm ci && npm install -g qrcode-terminal pm2


COPY . .

EXPOSE 5000

CMD ["npm", "start"]
