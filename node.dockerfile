# Build: docker build -f node.dockerfile -t expassauth .

# Option 1
# Start MongoDB and Node (link to MongoDB with Legacy Linking)

# docker run -d --name my-mongodb mongo
# docker run -d -p 3000:3000 --link my-mongodb:mongodb --name expassauth tumbone/expassauth

# Option 2
# Create a custom bridge network and add containers to it

# docker network create --driver bridge isolated_network
# docker run -d --net=isolated_network --name mongodb mongo
# docker run -d -p 3000:3000 --net=isolated_network --name expassauth tumbone/expassauth

# Option 3
# Use docker-compose


FROM node:8.9-alpine
MAINTAINER tumbonea
ENV NODE_ENV=test
ENV PORT=3000
WORKDIR /var/www
ADD . /var/www
RUN npm install
EXPOSE $PORT
ENTRYPOINT ["npm", "start"]