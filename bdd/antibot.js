const fs = require('fs');
const path = require('path');

// Define the path for the JSON file to store data
const dataFilePath = path.join(__dirname, '../xmd/antibot.json');

// Function to read data from JSON file
function readDataFromFile() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('❌ [DE UNKNOWN] Error reading antibot data:', error);
    return {};
  }
}

// Function to write data to JSON file
function writeDataToFile(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('❌ [DE UNKNOWN] Error writing antibot data:', error);
  }
}

// Function to create initial structure if file does not exist
function initializeDataFile() {
  if (!fs.existsSync(dataFilePath)) {
    writeDataToFile({});
    console.log("✅ [DE UNKNOWN] antibot.json initialized.");
  }
}

// Initialize data file if not present
initializeDataFile();

// Function to add or update a JID with a given state
function addOrUpdateJidState(jid, etat) {
  const data = readDataFromFile();
  data[jid] = data[jid] || {};
  data[jid].etat = etat;
  data[jid].action = data[jid].action || 'supp';
  writeDataToFile(data);

  console.log(`✅ [DE UNKNOWN] JID ${jid} added/updated with state: ${etat}`);
}

// Function to update the action for a given JID
function updateJidAction(jid, action) {
  const data = readDataFromFile();
  data[jid] = data[jid] || {};
  data[jid].etat = data[jid].etat || 'non';
  data[jid].action = action;
  writeDataToFile(data);

  console.log(`✅ [DE UNKNOWN] Action updated for JID ${jid}: ${action}`);
}

// Function to verify the state of a JID
function checkJidState(jid) {
  const data = readDataFromFile();
  return data[jid]?.etat === 'oui';
}

// Function to retrieve the action of a JID
function getJidAction(jid) {
  const data = readDataFromFile();
  return data[jid]?.action || 'supp';
}

// Export the functions for external use
module.exports = {
  updateJidAction,
  addOrUpdateJidState,
  checkJidState,
  getJidAction,
};
