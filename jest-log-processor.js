module.exports = (results) => {
  const fs = require("fs");
  const path = require("path");
  fs.mkdirSync(path.join(__dirname, "logs"), { recursive: true });
  fs.writeFileSync(
    path.join(__dirname, "logs", "all-results.json"),
    JSON.stringify(results, null, 2)
  );
  return results;
};
