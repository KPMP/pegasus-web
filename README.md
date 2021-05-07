# Inital Setup
- Install NVM (https://github.com/nvm-sh/nvm)
- `nvm use v12.22.1` // Use Node.js version 12.22.1
- (optional) `nvm alias default 12.22.1` // Set nvm to always use Node.js v12.22.1
- `npm i` // install required dependencies
- Ensure you've setup heavans docker correctly (https://github.com/KPMP/heavens-docker)
- `cd ~/{your-path}/heavans-docker/atlas && sh repository-explorer-dev.sh up -d` Starts docker services 

# Send Build To Docker
- `npm run build` // optimizes files for production and sends to docker instance

# Safely bring down services
There are some potential issue with closing docker that are eliminated with the following command
- `cd ~/{your-path}/heavans-docker/atlas && sh repository-explorer-dev.sh down`
