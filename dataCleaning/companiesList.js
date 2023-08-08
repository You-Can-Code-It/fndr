const fs = require("fs");
const csv = require("csv-parser");

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

    // const city = postCodeAndCity
    //   .replace(postCodeMatch[0], "")
    //   .trim()
    //   .replace(/^,/, ""); // Remove postal code and leading comma

    return {
      streetName,
      houseNumber,
      postCode,
    };
  } else {
    return "invalid address format";
  }
}

function parseCompanyActivity(nameSection) {
  //first remove content before backslashes

  const parts = nameSection.split("\r\n");

  if (parts.length > 1) {
    const firstResult = parts[1].split(" in ")[0].trim();
    console.log("result:::", firstResult);

    return firstResult;
  } else {
    console.log("Separator not found in the input string.");
    return;
  }

  // const regex = /\sin\s+[A-Za-z\s]+,\s+Netherlands$/;
  // const firstPart = firstResult();

  // const finalResult = firstPart.replace(regex, "").trim();

  // console.log("final result?:::", finalResult);
}

parseCompanyActivity(
  "Zorgfactory B.V. 5.0  (1) \r\nFinancial institution in Ter Apel, Netherlands"
);

const inputString2 =
  "ZF Services Nederland B.V. 4.7  (63) \r\nAuto body parts supplier in Delfgauw, Netherlands";

const parts = inputString2.split("\r\n");

if (parts.length > 1) {
  const editedString2 = parts[1].trim();
  console.log("nr slash", editedString2);
} else {
  console.log("Separator not found in the input string.");
}

const filePath = "./companiesCleaned.csv";
const outputFilePath = "./output.json";
const companiesWithWebsitePath = "./companiesWithWebsite.json";
const companiesWithCleanedWebsitePath = "./companiesWithCleanedWebsite.json";
const companiesWithoutWebsitePath = "./companiesWithoutWebsite.json";
const companiesWithObjectAddressPath = "./companiesWithAddress.json";
const correctedSiteAndAddressPath =
  "./companiesWithCorrectedSiteAndAddress.json";

const results = [];

fs.createReadStream(filePath)
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    const jsonData = JSON.stringify(results, null, 2);

    //Converting CSV file into JSON and storing in output.json file
    fs.writeFile(outputFilePath, jsonData, (error) => {
      if (error) {
        console.log("Error writing JSON file:", error);
        return;
      }
      console.log("CSV successfully converted!");
    });

    const websiteCompanies = results.filter(
      (company) => company.webpageUrl !== ""
    );
    console.log(
      "Total companies with informed website:",
      websiteCompanies.length
    );

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
    const correctedActivityField = results.map((company) => {
      const inputString = company.nameSection;

      const activity = parseCompanyActivity(inputString);

      return { ...company, category: activity };
    });

    const companiesWithGivenAddress = results.filter(
      (company) => company.address !== ""
    );
    console.log(
      "Total companies: ",
      results.length,
      "Companies that informed address: Total: ",
      companiesWithGivenAddress.length
    );

    const companiesWithAddressObject = companiesWithGivenAddress.map(
      (company) => {
        const addressString = company.address;
        const addressObject = parseAddress(addressString);

        return { ...company, address: addressObject };
      }
    );

    const replacedAddressAndWebsite = results.map((company) => {
      //Company with website and address
      if (company.address !== "" && company.webpageUrl !== "") {
        const addressString = company.address;
        const addressObject = parseAddress(addressString);

        const url = company.webpageUrl;
        const startIndex = url.indexOf("http");
        if (startIndex !== -1) {
          const endIndex = url.indexOf("&");
          if (endIndex !== -1) {
            const correctUrl = url.substring(startIndex, endIndex);
            //return { ...company, webpageUrl: correctUrl };
            return {
              ...company,
              webpageUrl: correctUrl,
              address: addressObject,
            };
          }
        }

        //Company with website but no address
      } else if (company.address === "" && company.webpageUrl !== "") {
        const url = company.webpageUrl;
        const startIndex = url.indexOf("http");
        if (startIndex !== -1) {
          const endIndex = url.indexOf("&");
          if (endIndex !== -1) {
            const correctUrl = url.substring(startIndex, endIndex);
            return {
              ...company,
              webpageUrl: correctUrl,
            };
          }
        }
        //Company with no website but with address
      } else if (company.address !== "" && company.webpageUrl === "") {
        const addressString = company.address;
        const addressObject = parseAddress(addressString);
        return {
          ...company,
          address: addressObject,
        };
        //No website or address
      } else {
        return company;
      }
    });
    //console.log("right infos", replacedAddressAndWebsite.slice(0, 10));

    const companiesWithCorrectedInfos = JSON.stringify(
      replacedAddressAndWebsite,
      null,
      2
    );

    const companiesAddressObject = JSON.stringify(
      companiesWithAddressObject,
      null,
      2
    );

    const goodUrlCompaniesJson = JSON.stringify(
      companiesWithCorrectUrl,
      null,
      2
    );

    const websitelessCompanies = results.filter(
      (company) => company.webpageUrl === ""
    );
    console.log(
      "Total companies with no informed website:",
      websitelessCompanies.length
    );

    const websiteCompaniesJson = JSON.stringify(websiteCompanies, null, 2);
    const websitelessCompaniesJson = JSON.stringify(
      websitelessCompanies,
      null,
      2
    );

    fs.writeFile(
      correctedSiteAndAddressPath,
      companiesWithCorrectedInfos,
      (error) => {
        if (error) {
          console.log(
            "Error writing list of companies with corrected website and address.",
            error
          );
        }
        console.log(
          "List of companies with corrected website and address successfully created."
        );
      }
    );

    fs.writeFile(
      companiesWithObjectAddressPath,
      companiesAddressObject,
      (error) => {
        if (error) {
          console.log(
            "Error writing list of companies with object address:",
            error
          );
        }
        console.log(
          "List of companies with informed address converted into objects successfully created."
        );
      }
    );

    fs.writeFile(companiesWithWebsitePath, websiteCompaniesJson, (error) => {
      if (error) {
        console.log("Error writing list of companies with website:", error);
      }
      console.log("List of companies with website successfully written");
    });

    fs.writeFile(
      companiesWithCleanedWebsitePath,
      goodUrlCompaniesJson,
      (error) => {
        if (error) {
          console.log(
            "Error writing list of companies with cleaned website:",
            error
          );
        }
        console.log(
          `List of companies with corrected website successfully written.`
        );
      }
    );
    fs.writeFile(
      companiesWithoutWebsitePath,
      websitelessCompaniesJson,
      (error) => {
        if (error) {
          console.log(
            "Error writing list of companies without website:",
            error
          );
        } else {
          console.log(
            `List of companies without website successfully written.`
          );
        }
      }
    );
  });

//Obs. as example "readFile":
// fs.readFile(outputFilePath, "utf-8", (error, data) => {
//   if (error) {
//     console.error("Error reading JSON file", error);
//   } else {
//     try {
//       //const parsedData = JSON.parse(data);
//       //This as object
//       //   console.log("JSONDATA:", jsonData);
//       //And this as JSON with quotes in the keys
//       //console.log("JSONDATA:", JSON.stringify(jsonData, null, 2));
//       //here process the data
//     } catch (parseError) {
//       console.error("Error parsing JSON", parseError);
//     }
//   }
// });

//Obs2. this one returns invalid address format error
// const addressString = "Regulusweg 11, Etage 3, 2516 AC Den Haag";
//const addressString = "Regulusweg 11-B, 2516 AC Den Haag";
//const parsedAddress = parseAddress(addressString);
//console.log("parsedAddress:", parsedAddress);
