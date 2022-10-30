FROM node:19 as build
# RUN apk update && apk add git

# set working directory
RUN mkdir /app
COPY . /app
WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 3000

RUN yarn
# start app
CMD ["yarn", "start"]
