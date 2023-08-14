const fs = require("fs"); // standard lib
const csv = require("csv-parser"); // a package from npm

function parseAddress(addressString) {
  if (addressString === "") {
    return;
  }
  const parts = addressString.split(","); // Split the address string by comma
  if (parts.length === 2) {
    const streetAndNumber = parts[0].trim();
    const postCodeAndCity = parts[1].trim();

    const houseNumberRegex = /(\d+\s*-\s*\w+|\d+\s*\w*)/;
    const houseNumberMatch = streetAndNumber.match(houseNumberRegex);
    const houseNumber = houseNumberMatch ? houseNumberMatch[0] : "";

    const streetName = streetAndNumber.replace(houseNumberRegex, "").trim(); // Remove house number

    const postCodeMatch = postCodeAndCity.match(/\d{4}\s?[A-Z]{2}/); // Match postal code pattern
    const postCode = postCodeMatch ? postCodeMatch[0].replace(/\s/g, "") : ""; // Remove spaces

    return {
      street: streetName,
      houseNumber,
      postCode,
    };
  } else {
    return {
      street: "invalidFormat",
      houseNumber: "invalidFormat",
      postCode: "invalidFormat",
    };
  }
}

function parseCompanyActivity(nameSection) {
  //first remove content before backslashes

  const parts = nameSection.split("\r\n");

  if (parts.length > 1) {
    const firstResult = parts[1].split(" in ")[0].trim();
    //console.log("result:::", firstResult);

    return firstResult;
  } else {
    console.log("Separator not found in the input string.");
    return null;
  }
}

const filePath = "./companiesCleaned.csv";

const unfilteredCompanies = [];

fs.createReadStream(filePath)
  .pipe(csv())
  .on("data", (data) => unfilteredCompanies.push(data))
  .on("end", () => {
    const websiteCompanies = unfilteredCompanies.filter(
      (company) => company.webpageUrl !== ""
    );

    // console.log(
    //   unfilteredCompanies.length,
    //   "Total companies with informed website:",
    //   websiteCompanies.length
    // );

    const companiesWithCorrectUrl = websiteCompanies.map((company) => {
      const url = company.webpageUrl;
      const startIndex = url.indexOf("http");
      if (startIndex !== -1) {
        const endIndex = url.indexOf("&");
        if (endIndex !== -1) {
          const correctUrl = url.substring(startIndex, endIndex);
          return { ...company, webpageUrl: correctUrl };
        }
      }
    });

    const companiesWithWebsiteAndCategory = companiesWithCorrectUrl.map(
      (company) => {
        const inputString = company.nameSection;
        const activity = parseCompanyActivity(inputString);

        return { ...company, category: activity };
      }
    );

    const companiesWithGivenAddress = companiesWithWebsiteAndCategory.filter(
      (company) => company.address !== ""
    );

    const companiesWithAddressWebsiteAndCategory = companiesWithGivenAddress
      .map((company) => {
        const addressString = company.address;
        const addressObject = parseAddress(addressString);

        return { ...company, ...addressObject };
      })
      .filter((c) => !c.street.includes("invalid"));

    fs.writeFileSync(
      "initialData.json",
      JSON.stringify(companiesWithAddressWebsiteAndCategory)
    );
  });
