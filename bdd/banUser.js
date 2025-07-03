const fs = require('fs');
const path = require('path');

// Path to the JSON file storing banned users
const filePath = path.join(__dirname, '../xmd/banUser.json');

// Load data from JSON file
function loadBanUserData() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error("❌ [DE UNKNOWN] Error loading banUser.json:", err);
    return {};
  }
}

// Save data to JSON file
function saveBanUserData(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("❌ [DE UNKNOWN] Error saving banUser.json:", err);
  }
}

// Create default file if it doesn't exist
if (!fs.existsSync(filePath)) {
  saveBanUserData({});
  console.log("✅ [DE UNKNOWN] banUser.json initialized.");
}

// Function to add a user to the ban list
async function addUserToBanList(jid) {
  try {
    const data = loadBanUserData();
    data[jid] = true;
    saveBanUserData(data);
    console.log(`🚫 [DE UNKNOWN] JID ${jid} added to banned user list.`);
  } catch (error) {
    console.error("❌ [DE UNKNOWN] Error adding user to ban list:", error);
  }
}

// Function to check if a user is banned
async function isUserBanned(jid) {
  try {
    const data = loadBanUserData();
    return data.hasOwnProperty(jid);
  } catch (error) {
    console.error("❌ [DE UNKNOWN] Error checking ban status:", error);
    return false;
  }
}

// Function to remove a user from the ban list
async function removeUserFromBanList(jid) {
  try {
    const data = loadBanUserData();
    if (data.hasOwnProperty(jid)) {
      delete data[jid];
      saveBanUserData(data);
      console.log(`✅ [DE UNKNOWN] JID ${jid} removed from banned user list.`);
    } else {
      console.log(`⚠️ [DE UNKNOWN] JID ${jid} not found in banned user list.`);
    }
  } catch (error) {
    console.error("❌ [DE UNKNOWN] Error removing user from ban list:", error);
  }
}

module.exports = {
  addUserToBanList,
  isUserBanned,
  removeUserFromBanList,
};
