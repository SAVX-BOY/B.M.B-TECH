const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../xmd/antilien.json');

// Load data from JSON file
function loadAntilienData() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error("❌ [DE UNKNOWN] Could not load antilien data:", err);
    return {};
  }
}

// Save data to JSON file
function saveAntilienData(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("❌ [DE UNKNOWN] Could not save antilien data:", err);
  }
}

const antilienData = loadAntilienData();

// Add or update a JID's link-blocking status
async function ajouterOuMettreAJourJid(jid, etat) {
  antilienData[jid] = { etat, action: antilienData[jid]?.action || 'supp' };
  saveAntilienData(antilienData);
  console.log(`✅ [DE UNKNOWN] JID ${jid} updated with state '${etat}' in antilien.`);
}

// Update the action type for a JID
async function mettreAJourAction(jid, action) {
  if (antilienData[jid]) {
    antilienData[jid].action = action;
  } else {
    antilienData[jid] = { etat: 'non', action };
  }
  saveAntilienData(antilienData);
  console.log(`✅ [DE UNKNOWN] Action '${action}' updated for JID ${jid}.`);
}

// Check if anti-link is enabled
async function verifierEtatJid(jid) {
  return antilienData[jid]?.etat === 'oui';
}

// Get the action assigned to a JID
async function recupererActionJid(jid) {
  return antilienData[jid]?.action || 'supp';
}

module.exports = {
  ajouterOuMettreAJourJid,
  mettreAJourAction,
  verifierEtatJid,
  recupererActionJid,
};
