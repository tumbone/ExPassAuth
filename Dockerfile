# Build: docker build -f Dockerfile -t tumbone/expassauth .

# Option 1
# Start MongoDB and Node (link to MongoDB with Legacy Linking)

# docker run -d --name my-mongodb mongo
# docker run -d -p 3000:3000 --link my-mongodb:mongodb --name expassauth tumbone/expassauth

# Option 2
# Create a custom bridge network and add containers to it

# docker network create --driver bridge isolated_network
# docker run -d --net=isolated_network --name mongodb mongo
# docker run -d -p 3000:3000 --net=isolated_network --name expassauth tumbone/expassauth


FROM node:latest
MAINTAINER tumbonea
ENV NODE_ENV=dev
ENV PORT=3000
COPY . /var/www
WORKDIR /var/www
RUN npm install
EXPOSE $PORT
ENTRYPOINT ["npm", "start"]