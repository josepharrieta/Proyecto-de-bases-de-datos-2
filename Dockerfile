FROM node:18

# Metadata (Reemplaza TU_GITHUB_USERNAME y TU_EMAIL)
LABEL maintainer="Josepharrieta <Josepharrieta21@gmail.com>"
LABEL version="1.0"
LABEL description="Sistema de gestión para restaurantes - API Principal"

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]