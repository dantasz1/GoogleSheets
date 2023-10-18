const { GoogleSpreadsheet } = require('google-spreadsheet');
const credenciais = require('./credentials.json');
const arquivo = require('./arquivo.json');
const { JWT } = require('google-auth-library')

const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets'
];
const jwt = new JWT({
    email: credenciais.client_email,
    key: credenciais.private_key,
    scopes: SCOPES,
});

async function GetDoc() {
    const doc = new GoogleSpreadsheet(arquivo.id, jwt)
    await doc.loadInfo()
    return doc
}
async function ReadWorkSheet(doc) {
    const sheet = await doc.sheetsByIndex[0];
    let rows = await sheet.getRows()
    let Usuarios = rows.map(row => {

        return row.toObject()
    })
    return Usuarios
}
async function AddUser(data={}) {
    const response = await fetch('https://apigenerator.dronahq.com/api/5yZdV9HP/data', {
  
      method: 'POST', 
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return response.json();
  }
  async function Fluxo(){
    let doc = await GetDoc()
let Usuarios = await ReadWorkSheet(doc)
AddUser(Usuarios[2])
  }
  Fluxo()




