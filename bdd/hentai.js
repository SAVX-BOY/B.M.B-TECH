const fs = require('fs');
const path = require('path');

// Path to the JSON file storing unknown group data
const filePath = path.join(__dirname, '../xmd/unknownGroups.json');

// Load data from JSON file
function loadUnknownGroupsData() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return {}; // Default if file doesn't exist
  }
}

// Save data to JSON file
function saveUnknownGroupsData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Create default file if it doesn't exist
if (!fs.existsSync(filePath)) {
  saveUnknownGroupsData({});
}

// Function to add a group to the unknown groups list
async function addToUnknownGroupsList(groupJid) {
  try {
    const data = loadUnknownGroupsData();
    
    if (!data[groupJid]) {
      data[groupJid] = true;
      saveUnknownGroupsData(data);
      console.log(`Group JID ${groupJid} has been added to the unknown groups list.`);
    } else {
      console.log(`Group JID ${groupJid} is already in the unknown groups list.`);
    }
  } catch (error) {
    console.error("Error while adding the group to the unknown groups list:", error);
  }
}

// Function to check if a group is in the unknown groups list
async function checkFromUnknownGroupsList(groupJid) {
  try {
    const data = loadUnknownGroupsData();
    return !!data[groupJid];
  } catch (error) {
    console.error("Error while checking the group's presence in the unknown groups list:", error);
    return false;
  }
}

// Function to remove a group from the unknown groups list
async function removeFromUnknownGroupsList(groupJid) {
  try {
    const data = loadUnknownGroupsData();
    
    if (data[groupJid]) {
      delete data[groupJid];
      saveUnknownGroupsData(data);
      console.log(`Group JID ${groupJid} has been removed from the unknown groups list.`);
    } else {
      console.log(`Group JID ${groupJid} is not in the unknown groups list.`);
    }
  } catch (error) {
    console.error("Error while removing the group from the unknown groups list:", error);
  }
}

module.exports = {
  addToUnknownGroupsList,
  checkFromUnknownGroupsList,
  removeFromUnknownGroupsList,
};
