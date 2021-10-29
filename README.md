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

# Create Reference UMAPs

 1. Ensure you either:
	  a) have the latest data loaded on your local machine
	  b) have pointed your local instance to qa KE with the latest data
 2. Change initialState.json 'recreateUmaps' to true
 3. `npm run build`
 4. Start up your local Atlas docker environment (see steps in initial setup)
 5. Point your browser at localhost
 6. Go to Explorer home page
 7. Do a gene search
 8. Pick the dataset type you want to recreate
 9. Wait until it has loaded the expression plot
 10. Change your url to `http://localhost/explorer/dataviz/umap` 
 11. The updated UMAP will load
