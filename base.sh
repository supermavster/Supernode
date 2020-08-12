#!/bin/bash
### Automation steps ###
# Inside the project
cd /home/PROJECT

# Remove older node_modules
# rm -rf node_modules

# Install Dependencies
npm install --save

# Kill Last Process
npm run serve:kill

# Run the build Project
npm run serve:production