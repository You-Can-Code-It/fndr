const axios = require("axios");
const companies = require("./companiesCuid.json");

//Filtering companies that have "software" in their activities
const softwareCompanies = companies.filter((company: any) =>
  company.category.toLowerCase().includes("software")
);
//Returns 359 companies that include the word "software" in their "category" field
console.log("Software companies:", softwareCompanies.length);

const firstFiveCompanies = companies.splice(0, 5);
// console.log(":::5?", firstFiveCompanies);

const firstFiveCompaniesAddresses = firstFiveCompanies.map((company: any) => {
  return { postcode: company.postCode, number: company.houseNumber };
});

const bodyRequest = `{ postcodes: ${firstFiveCompaniesAddresses}}`;
console.log("bodyRequest:", firstFiveCompaniesAddresses);

const apiArrayRequestUrl =
  "https://postcode-nl.onrender.com/validate/postcodes";

const sendPostRequest = async () => {
  try {
    const response = await axios.post(apiArrayRequestUrl, {
      postCodes: firstFiveCompaniesAddresses,
    });
    response.data.results.forEach((result: any) => {
      console.log(result);
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

sendPostRequest();
