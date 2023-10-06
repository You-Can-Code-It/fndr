import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import styles from "./AddCompanyForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import NavBar from "../NavBar/NavBar";
import { fontInter } from "../../styles/fonts/";
import Button from "../Button/Button";
const formSchema = z.object({
  name: z
    .string()
    .min(2, "Company name must be at least 2 characters long.")
    .max(255, "The provided company name contains too much characters."),
  indReferentNumber: z
    .string()
    .min(5, "Ind number must be at least 5 characters long.")
    .max(255, "The provided description contains too much characters."),
  website: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi.test(
          value
        ),
      {
        message: "Please provide a valid website.",
      }
    ),
  category: z
    .string()
    .min(2, "Category must contain at least 2 characters.")
    .max(255, "The provided category name contains too much characters."),
  city: z
    .string()
    .min(2, "City must contain at least 2 characters.")
    .max(255, "The provided city name contains too much characters."),
  street: z
    .string()
    .min(2, "Street must contain at least 2 characters.")
    .max(255, "The provided street name contains too much characters."),
  houseNumber: z
    .string()
    .min(1, "House number must contain at least 1 character.")
    .max(255, "The provided house number contains too much characters."),
  postCode: z
    .string()
    .refine(
      (value) =>
        value === "" || /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i.test(value),
      {
        message: "Post code must be four numbers followed by two letters.",
      }
    ),
});

const AddCompanyForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) });

  const formSubmit = async (data: any) => {
    try {
      const response = await axios.post("/api/companies/", data);
      console.log("AddCompanyForm - New company added:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("AddCompanyForm - Error creating company:", error);
    }
  };

  return (
    <div className={fontInter.className}>
      <NavBar />
      <div className={styles.addCompanyForm}>
        <div className={styles.formInputs}>
          <h3 className={styles.formBanner}>New Company</h3>
          <div className={styles.forInputsInner}>
            <form onSubmit={handleSubmit(formSubmit)} className={styles.form}>
              <div className={styles.formBlock}>
                <div className={styles.firstBlock}>
                  <label className={styles.formLabel} htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Company Name"
                    {...register("name")}
                    className={styles.addCompanyFormInput}
                  />
                  {errors.name && (
                    <p className="error">{String(errors.name.message)}</p>
                  )}
                  <label
                    className={styles.formLabel}
                    htmlFor="indReferentNumber"
                  >
                    IND Number
                  </label>
                  <input
                    id="indReferentNumber"
                    type="text"
                    placeholder="Ind Number"
                    {...register("indReferentNumber")}
                    className={styles.addCompanyFormInput}
                  />
                  {errors.indReferentNumber && (
                    <p className="error">
                      {String(errors.indReferentNumber.message)}
                    </p>
                  )}
                  <label className={styles.formLabel} htmlFor="website">
                    Website
                  </label>
                  <input
                    id="website"
                    type="text"
                    placeholder="Website"
                    {...register("website")}
                    className={styles.addCompanyFormInput}
                  />
                  {errors.website && (
                    <p className="error">{String(errors.website.message)}</p>
                  )}
                  <label className={styles.formLabel} htmlFor="category">
                    Category
                  </label>
                  <input
                    id="category"
                    type="text"
                    placeholder="Category"
                    {...register("category")}
                    className={styles.addCompanyFormInput}
                  />
                  {errors.category && (
                    <p className="error">{String(errors.category.message)}</p>
                  )}
                </div>
                <div className={styles.secondBlock}>
                  <label className={styles.formLabel} htmlFor="city">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    placeholder="City"
                    {...register("city")}
                    className={styles.addCompanyFormInput}
                  />
                  {errors.city && (
                    <p className="error">{String(errors.city.message)}</p>
                  )}
                  <label className={styles.formLabel} htmlFor="street">
                    Street
                  </label>
                  <input
                    id="street"
                    type="text"
                    placeholder="Street"
                    {...register("street")}
                    className={styles.addCompanyFormInput}
                  />
                  {errors.street && (
                    <p className="error">{String(errors.street.message)}</p>
                  )}
                  <label className={styles.formLabel} htmlFor="houseNumber">
                    Number
                  </label>
                  <input
                    id="houseNumber"
                    type="text"
                    placeholder="Number"
                    {...register("houseNumber")}
                    className={styles.addCompanyFormInput}
                  />
                  {errors.houseNumber && (
                    <p className="error">
                      {String(errors.houseNumber.message)}
                    </p>
                  )}
                  <label className={styles.formLabel} htmlFor="postCode">
                    Zip Code
                  </label>
                  <input
                    id="postCode"
                    type="text"
                    placeholder="Postal code"
                    {...register("postCode")}
                    className={styles.addCompanyFormInput}
                  />
                  {errors.postCode && (
                    <p className="error">{String(errors.postCode.message)}</p>
                  )}
                </div>
              </div>
              <div>
                <div className={styles.submitButton}>
                  <Button variant="saveButton">Add Company</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCompanyForm;
