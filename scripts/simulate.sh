#!/bin/bash

rm -rf ./simulations/trace && shadow ./simulations/task.yaml > ./simulations/shadow.log -d ./simulations/trace -p 1  