#!/usr/bin/env bash

cd /home/vagrant/styleguide-ide/test-project
forever start node_modules/sourcejs/app.js

cd /home/vagrant/styleguide-ide/watcher-build
forever start gulp watch

cd /home/vagrant/styleguide-ide/watch-lint
forever start gulp watch