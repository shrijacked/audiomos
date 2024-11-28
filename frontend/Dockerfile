FROM --platform=linux/amd64 node:19

WORKDIR /app

COPY package*.json ./

RUN npm install


COPY . .

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
