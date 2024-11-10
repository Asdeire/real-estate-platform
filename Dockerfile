FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

ENV DATABASE_URL=postgresql://example:password@postgresql:5432/real_estate_db

EXPOSE 3000

CMD ["npm", "start"]
