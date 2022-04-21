FROM node:14.15.3 as base
EXPOSE 6000 
WORKDIR /node
COPY package*.json ./
COPY prisma ./
RUN npm i && npm cache clean --force
COPY . .

# development
FROM base as dev
CMD ["npm", "run", "watch-debug"]

# test
FROM base as test
CMD ["npm", "run", "test"]

# production
FROM base as prod
RUN npm run build
CMD ["npm", "run", "start"]
