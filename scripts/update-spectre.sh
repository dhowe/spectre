#!/bin/sh

cd ~/git/spectre
git pull
yarn install
yarn pub-client
pm2 reload spectre-server
