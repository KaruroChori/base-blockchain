#!/bin/bash

# Check if there is Shadow (global/local) or download it
if ! [ -x "$(command -v shadow)" ]
then
    echo "shadow could not be found"
    wget https://github.com/shadow/shadow/archive/refs/heads/main.zip -P ./deps
    unzip ./deps/main*.tar.gz -d ./deps
    #TODO: make stuff
    rm ./deps/main.zip
fi

# Check if there is Emrichen (global) or install it via pip3
if ! [ -x "$(command -v emrichen)" ]
then
    echo "emrichen could not be found"
    pip3 install emrichen
fi

# Check if there is Redis (local) or download it
if ! [ -x "$(command -v ./deps/redis/bin/redis-server)" ]
then
    echo "redis custom stack could not be found"
    rm -rf ./deps/redis
    wget https://packages.redis.io/redis-stack/redis-stack-server-7.0.2-RC3.xenial.x86_64.tar.gz -P ./deps
    tar -xvzf ./deps/redis*.tar.gz -C ./deps/
    rm ./deps/redis*.tar.gz
    mv ./deps/redis* ./deps/redis
fi

# Install NPM/YARN deps
yarn install