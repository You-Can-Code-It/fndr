const fs = require("fs");
const cuid = require("cuid");
const path = require("path");
const companiesData = require("./initialData.json");
console.log("companiesData", companiesData.length);

const filePath = "companiesCuid.json";

const updatedCompaniesData = companiesData.map((company: any) => ({
  ...company,
  id: cuid(),
}));

fs.writeFileSync(
  filePath,
  JSON.stringify(updatedCompaniesData, null, 2),
  "utf-8"
);
console.log("server: AFTER file written successfully");
