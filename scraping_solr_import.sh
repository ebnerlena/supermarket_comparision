#!/usr/bin/env bash
set -euo pipefail

cd /var/www/supermarket_comparision/scrapen && npm i && npm run start
cd ../solr-import && npm i && npm run start