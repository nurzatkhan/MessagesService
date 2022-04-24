FROM node:14.15.3 as base
EXPOSE 6000 
WORKDIR /app
COPY package*.json ./
COPY prisma ./
RUN npm i && npm cache clean --force
RUN npx prisma migrate dev --name init

COPY . .

# development
FROM base as dev
CMD ["npx", "prisma", "migrate", "dev", "--name", "init"]
CMD ["npm", "run", "dev"]
