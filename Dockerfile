FROM ubuntu:latest
FROM node:15

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install --force

COPY . .
EXPOSE 6543

ENV NODE_ENV=production
ENV SENDGRID_API_KEY="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"

CMD [ "npm", "run", "start" ]

