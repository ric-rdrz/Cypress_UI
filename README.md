# Developer Experience

## Pre requisites

1. Install NVM
2. Install a LTS version of NODE
3. Install Cypress ```npm install cypress```
4. Run ```npm install```

## Run test with UI

1. ```cd``` on the project folder
2. Run ```npm run cy:open```
3. In the UI select the browser and then select the spec file.


### Dependencies to install

```
  npm install --save-dev cypress-file-upload
  npm install cypress-downloadfile
  npm install -D cypress-xpath
  npm install username
  npm install xlsx
  npm install node-xlsx
  npm install file-system
  npm install dotenv
  npm install faker
  npm install mongodb
```

### Setup Percy Visual Tests

Install @percy/cypress using npm:
```
npm install --save-dev @percy/cypress
```

Execute Visual Test in Sandbox App DesignSystem:
```
PERCY_TOKEN=a67f10616766e89f178bfcfd8cd9fbcbbbcec1c194319116eff71af07565c4f9 npm run cy:percy_sb
```
Execute Visual Test in Playground DesignSystem:
```
PERCY_TOKEN=b1bdf890aab94e364a1b37ee6d01b54e7a02a79db0b2bd2b24d3f41949deb28e npm run cy:percy_pg

