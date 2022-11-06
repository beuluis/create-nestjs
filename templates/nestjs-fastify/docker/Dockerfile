ARG VERSION=16.17-alpine
FROM node:${VERSION} as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --ignore-scripts

COPY tsconfig.json tsconfig.build.json nest-cli.json ./

COPY src/ ./src

RUN npm run build

FROM node:${VERSION}

WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/

CMD ["npm", "run", "start:prod"]