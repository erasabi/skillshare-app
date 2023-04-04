#!/usr/bin/env bash

# bash working directory comes from wherever the shell cmd was run
# use this to instead get path relative to where this shell script is located 
PARENT_PATH="$(dirname ${BASH_SOURCE[0]})"

source "$PARENT_PATH/constants.sh"

# remove app containers and images
docker container stop $CLIENT_CONTAINER_ID
docker container rm $CLIENT_CONTAINER_ID
docker image rm $CLIENT_IMAGE_ID

# remove api containers and images
docker container stop $SERVER_CONTAINER_ID
docker container rm $SERVER_CONTAINER_ID
docker image rm $SERVER_IMAGE_ID

# remove db containers and images
docker container stop $DATABASE_CONTAINER_ID
docker container rm $DATABASE_CONTAINER_ID -f
docker image rm $DATABASE_IMAGE_ID -f

# remove server->db volume
docker volume rm $SERVER_DB_VOLUME_ID
# remove network 
docker network rm $NETWORK_ID