FROM node:16

WORKDIR /usr/src/

COPY . .

EXPOSE 5000

RUN npm ci

CMD npx prisma migrate dev && npm run build && npm start