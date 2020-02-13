FROM node:13.5

FROM node:12

# Copy source code
COPY . /app

# Change working directory
WORKDIR /app

# Install dependencies
RUN yarn install

# Expose API port to the outside
EXPOSE 4000

# Launch application
CMD ["yarn","start"]