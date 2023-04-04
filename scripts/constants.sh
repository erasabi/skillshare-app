#!/usr/bin/env bash

# declare constants shared across scripts
CLIENT_CONTAINER_ID='skillshare-app-client-1'
SERVER_CONTAINER_ID='skillshare-app-server-1'
DATABASE_CONTAINER_ID='skillshare-app-postgres-1'

CLIENT_IMAGE_ID='skillshare-app-client'
SERVER_IMAGE_ID='skillshare-app-server'
DATABASE_IMAGE_ID='postgres'

SERVER_DB_VOLUME_ID='skillshare-app_server-db'

NETWORK_ID='skillshare-app_default'

