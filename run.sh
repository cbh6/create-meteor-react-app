#!/bin/bash
#nvm use v8.4.0
#meteor npm install


# export CLUSTER_WORKERS_COUNT=auto
if [ -z "$METEORLOCAL" ]
then
    SETTINGS_FILE="settings.json"
    # export MONGO_URL=SET_YOUR_PRODUCTION_MONGO_DATABASE
    # export MONGO_OPLOG_URL=SET_YOUR_PRODUCTION_MONGODB_OPLOG
else
    # export MONGO_URL=SET_YOUR_DEVELOP_MONGO_DATABASE
    SETTINGS_FILE="settings-develop.json"
fi

# export MAIL_URL=...


if [ -z "$METEOR_PORT" ]
then
    METEOR_PORT=3000
fi

meteor --settings $SETTINGS_FILE --port $METEOR_PORT