import React, { useState } from "react";
import axios from "axios";
import styles from "./AddCompanyForm.module.css";

const AddCompanyForm: React.FC = () => {
  const [companyData, setCompanyData] = useState({
    name: "",
    indReferentNumber: "",
    website: "",
    category: "",
    city: "",
    street: "",
    houseNumber: "",
    postCode: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setCompanyData({
      name: "",
      indReferentNumber: "",
      website: "",
      category: "",
      city: "",
      street: "",
      houseNumber: "",
      postCode: "",
    });

    try {
      const response = await axios.post("/api/companies/", companyData);
      console.log("From AddCompanyForm. New company created:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };

  return (
    <div className={styles.addCompanyForm}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={companyData.name}
          onChange={handleInputChange}
          className={styles.addCompanyForm}
        />
        <input
          type="text"
          name="indReferentNumber"
          placeholder="Company Number"
          value={companyData.indReferentNumber}
          onChange={handleInputChange}
          className={styles.addCompanyForm}
        />
        <input
          type="text"
          name="website"
          placeholder="Website"
          value={companyData.website}
          onChange={handleInputChange}
          className={styles.addCompanyForm}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={companyData.category}
          onChange={handleInputChange}
          className={styles.addCompanyForm}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={companyData.city}
          onChange={handleInputChange}
          className={styles.addCompanyForm}
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={companyData.street}
          onChange={handleInputChange}
          className={styles.addCompanyForm}
        />
        <input
          type="text"
          name="houseNumber"
          placeholder="House number"
          value={companyData.houseNumber}
          onChange={handleInputChange}
          className={styles.addCompanyForm}
        />
        <input
          type="text"
          name="postCode"
          placeholder="Post code"
          value={companyData.postCode}
          onChange={handleInputChange}
          className={styles.addCompanyForm}
        />
        <div className={styles.addCompanyForm}>
          {" "}
          <button type="submit">Add Company</button>
        </div>
      </form>
    </div>
  );
};

export default AddCompanyForm;

// import React, { useState } from "react";
// import axios from "axios";

// const CreateCompanyForm: React.FC = () => {
//   const [id, setId] = useState("");
//   const [name, setName] = useState("");
//   const [indReferentNumber, setIndReferentNumber] = useState("");
//   const [website, setWebsite] = useState("");
//   const [category, setCategory] = useState("");
//   const [city, setCity] = useState("");
//   const [street, setStreet] = useState("");
//   const [houseNumber, setHouseNumber] = useState("");
//   const [postCode, setPostCode] = useState("");

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post("/api/companies/create-company", {
//         id,
//         name,
//         indReferentNumber,
//         website,
//         category,
//         city,
//         street,
//         houseNumber,
//         postCode,
//       });

//       console.log("New company created:", response.data);
//     } catch (error) {
//       console.error("Error creating company:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* Render form fields for name, city, website, lastVisit, and category */}
//       <button type="submit">Add Company</button>
//     </form>
//   );
// };

// export default CreateCompanyForm;
