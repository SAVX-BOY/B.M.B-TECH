const fs = require('fs');
const path = require('path');

// Path to the JSON file storing banned groups
const filePath = path.join(__dirname, '../xmd/banGroup.json');

// Load data from JSON file
function loadBanGroupData() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error("❌ [DE UNKNOWN] Error loading banned group data:", err);
    return {};
  }
}

// Save data to JSON file
function saveBanGroupData(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("❌ [DE UNKNOWN] Error saving banned group data:", err);
  }
}

// Create default file if it doesn't exist
if (!fs.existsSync(filePath)) {
  saveBanGroupData({});
  console.log("✅ [DE UNKNOWN] banGroup.json initialized.");
}

// Function to add a group to the ban list
async function addGroupToBanList(groupeJid) {
  try {
    const data = loadBanGroupData();
    data[groupeJid] = true;
    saveBanGroupData(data);
    console.log(`🚫 [DE UNKNOWN] Group JID ${groupeJid} added to ban list.`);
  } catch (error) {
    console.error("❌ [DE UNKNOWN] Error adding group to ban list:", error);
  }
}

// Function to check if a group is banned
async function isGroupBanned(groupeJid) {
  try {
    const data = loadBanGroupData();
    return data.hasOwnProperty(groupeJid);
  } catch (error) {
    console.error("❌ [DE UNKNOWN] Error checking group ban status:", error);
    return false;
  }
}

// Function to remove a group from the ban list
async function removeGroupFromBanList(groupeJid) {
  try {
    const data = loadBanGroupData();
    if (data.hasOwnProperty(groupeJid)) {
      delete data[groupeJid];
      saveBanGroupData(data);
      console.log(`✅ [DE UNKNOWN] Group JID ${groupeJid} removed from ban list.`);
    } else {
      console.log(`⚠️ [DE UNKNOWN] Group JID ${groupeJid} not found in ban list.`);
    }
  } catch (error) {
    console.error("❌ [DE UNKNOWN] Error removing group from ban list:", error);
  }
}

module.exports = {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList,
};
