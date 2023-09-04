import { prisma } from "./client";
import axios from "axios";
import companiesWithCoordinates from "../dataCleaning/companiesWithCoordinates.json"

console.log("companiesWithCoordinates", companiesWithCoordinates)

type PostcodeResponse = {
  valid: true;
  postcode: {
    city: string;
    street: string;
    house_number: string;
    postcode: string;
    province: string;
    latitude: number;
    longitude: number;
  };
  message: "ok";
  request: string;
};

async function getCoordinatesFromPostcode(
  postCode: string,
  houseNumber: string
): Promise<[string, null] | [null, PostcodeResponse]> {
  try {
    const response = await axios.get<PostcodeResponse>(
      `https://postcode-nl.onrender.com/validate/postcode?postcode=${postCode}&number=${houseNumber}`
    );
    return [null, response.data];
  } catch (error) {
    return ["This postcode is not valid", null];
  }
}

export async function getCoordinates() {
  const companies = await prisma.company.findMany({
    take: 100,
    where: {
      latitude: null,
      longitude: null,
    },
  });
  if (companies.length === 0) {
    console.log("All companies already have coordinates");
    return;
  }
  const updatedCompanies = [...companiesWithCoordinates];
  for (let i = 0; i < companies.length; i++) {
    let company = companies[i];
    const [error, data] = await getCoordinatesFromPostcode(
      company?.postCode,
      company?.houseNumber
    );
    if (error || !data) {
      console.log("error", error);
      // @ts-ignore
      updatedCompanies.push({ ...company, postCodeInValid: true });
      continue;
    }

    const updatedCompany = await prisma.company.update({
      where: {
        id: company?.id,
      },
      data: {
        latitude: data.postcode.latitude,
        longitude: data.postcode.longitude,
      },
    });
    // @ts-ignore
    updatedCompanies.push(updatedCompany);
    console.log("Coordinates found", updatedCompanies.length)
  }
  const fs = require("fs");

  fs.writeFile(
    __dirname + "/../dataCleaning/companiesWithCoordinates.json",
    JSON.stringify(updatedCompanies, null, 2),
    (err: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log("How many?", updatedCompanies.length)
        console.log("Success");
      }
    }
  );
}
getCoordinates();