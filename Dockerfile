FROM node:18-alpine

ARG API_URI
ARG NEXT_PUBLIC_API_URI
ARG NODE_ENV
ARG PORT=3000

ENV API_URI=${API_URI}
ENV NEXT_PUBLIC_API_URI=${NEXT_PUBLIC_API_URI}
ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE ${PORT}

CMD ["npm", "start"]