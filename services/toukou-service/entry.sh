#!/usr/bin/env bash
set -e

rake db:create
rake db:migrate

exec "$@"
