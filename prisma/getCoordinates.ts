import { prisma } from "./client";
import axios from "axios";

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
    take: 10,
    where: {
      latitude: null,
      longitude: null,
    },
  });
  if (companies.length === 0) {
    console.log("All companies already have coordinates");
    return;
  }
  for (let i = 0; i < companies.length; i++) {
    let company = companies[i];
    const [error, data] = await getCoordinatesFromPostcode(
      company?.postCode,
      company?.houseNumber
    );
    if (error || !data) {
      console.log("error", error);
      return;
    }
    console.log("data", data);

    console.log("response", data);
    console.log("company.id", company?.id);
    const updatedCompany = await prisma.company.update({
      where: {
        id: company?.id,
      },
      data: {
        latitude: data.postcode.latitude,
        longitude: data.postcode.longitude,
      },
    });
    console.log("updatedCompany", updatedCompany);
  }
}
getCoordinates();

//right for loop
