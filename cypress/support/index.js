const dotenvPlugin = require('cypress-dotenv');
const { connect, disconnect } = require('./db');
const path = require('path');
const XLSX = require('xlsx');

// `on` is used to hook into various events Cypress emits
// `config` is the resolved Cypress config

module.exports = async (on, config) => {
  config = dotenvPlugin(config);
  on('task', {
    addNewName({ name, sexo }) {
      const layout = path.resolve(
        'cypress/fixtures/DataUtils',
        'name-layout.xlsx',
      );
      const workbook = XLSX.readFile(layout);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      sheet['C2'].v = name;
      sheet['C3'].v = `${name}`;
      sheet['C32'].v = sexo;
      XLSX.writeFile(workbook, 'cypress/fixtures/DataUtils/name-layout.xlsx');
      return null;
    },

    async getAllDocuments(collection_name) {
      const db = await connect();
      const collection = db.collection(collection_name);
      let data = await collection.find({}).toArray();
      return data;
    },
    async getSpecificDocument({ collection_name, condition }) {
      const db = await connect();
      const collection = db.collection(collection_name);
      let data = await collection.find(condition).toArray();
      return data;
    },
    async countDocument(collection_name) {
      const db = await connect();
      const collection = db.collection(collection_name);
      let data = await collection.find({}).count();
      return data;
    },

    async distinctDocument({ collection_name, field, condition }) {
      const db = await connect();
      const collection = db.collection(collection_name);
      let data = await collection.distinct(field, condition);
      return data;
    },
    async getSpecificDocumentViewer({ collection_name, condition, viewers }) {
      const db = await connect();
      const collection = db.collection(collection_name);
      let data = await collection.find(condition, viewers).toArray();
      return data;
    },

    async closeMongoConexion() {
      await disconnect();
      return null;
    },
  });
  return config;
};
