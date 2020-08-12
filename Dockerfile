# Image Node 12.18-alpine
FROM node:14.4.0
# Production
ENV NODE_ENV production

# Permissions in our app code on the container
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Application working directory
WORKDIR /home/node/app

# Dependecies
COPY package*.json ./
COPY yarn.lock ./

# User Node (No Root)
USER node

# Install Dependencies
RUN npm install --production --silent
# RUN npm install --no-optional --no-shrinkwrap --no-package-lock

# Permissions in our app code on the container
COPY --chown=node:node . .

# Start App
EXPOSE 8080
CMD [ "node", "src/server.ts" ]
