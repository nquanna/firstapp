const crypto = require("crypto");

const neonQueries = require("../app/models/neonQueries");

const genUniqueDeviceId = async () => {
  let deviceId = crypto.randomUUID();

  while (true) {
    const deviceIdInDb = await neonQueries.get.deviceId(deviceId);
    if (deviceIdInDb) deviceId = crypto.randomUUID();
    else break;
  }

  return deviceId;
};

module.exports = genUniqueDeviceId;
