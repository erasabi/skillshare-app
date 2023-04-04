#!/usr/bin/env bash
# description: init db with test data through server npm commands

# bash working directory comes from wherever the shell cmd was run
# use this to instead get path relative to where this shell script is located 
PARENT_PATH="$(dirname ${BASH_SOURCE[0]})"

source "$PARENT_PATH/constants.sh"

# clean and remove any existing database 
docker exec -t -i $SERVER_CONTAINER_ID npm run db:clean
docker exec -t -i $SERVER_CONTAINER_ID npm run migrate:undo

# run migrate script in server docker container
docker exec -t -i $SERVER_CONTAINER_ID npm run migrate

# run seed:all script in server docker container
docker exec -t -i $SERVER_CONTAINER_ID npm run seed:all