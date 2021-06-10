#!/usr/bin/env bash
set -euo pipefail

cd ./scrapen && npm i && npm run start
cd ../solr-import && npm i && npm run start