import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import styles from "./AddCompanyForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod";

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
    <div className={styles.addCompanyForm}>
      <form onSubmit={handleSubmit(formSubmit)}>
        <input
          type="text"
          placeholder="Company Name"
          {...register("name")}
          className={styles.addCompanyForm}
        />
        {errors.name && <p className="error">{String(errors.name.message)}</p>}
        <input
          type="text"
          placeholder="Ind Number"
          {...register("indReferentNumber")}
          className={styles.addCompanyForm}
        />
        {errors.indReferentNumber && (
          <p className="error">{String(errors.indReferentNumber.message)}</p>
        )}
        <input
          type="text"
          placeholder="Website"
          {...register("website")}
          className={styles.addCompanyForm}
        />
        {errors.website && (
          <p className="error">{String(errors.website.message)}</p>
        )}
        <input
          type="text"
          placeholder="Category"
          {...register("category")}
          className={styles.addCompanyForm}
        />
        {errors.category && (
          <p className="error">{String(errors.category.message)}</p>
        )}
        <input
          type="text"
          placeholder="City"
          {...register("city")}
          className={styles.addCompanyForm}
        />
        {errors.city && <p className="error">{String(errors.city.message)}</p>}
        <input
          type="text"
          placeholder="Street"
          {...register("street")}
          className={styles.addCompanyForm}
        />
        {errors.street && (
          <p className="error">{String(errors.street.message)}</p>
        )}
        <input
          type="text"
          placeholder="Number"
          {...register("houseNumber")}
          className={styles.addCompanyForm}
        />
        {errors.houseNumber && (
          <p className="error">{String(errors.houseNumber.message)}</p>
        )}
        <input
          type="text"
          placeholder="Postal code"
          {...register("postCode")}
          className={styles.addCompanyForm}
        />
        {errors.postCode && (
          <p className="error">{String(errors.postCode.message)}</p>
        )}

        <div className={styles.addCompanyForm}>
          {" "}
          <button type="submit">Add Company</button>
        </div>
      </form>
    </div>
  );
};

export default AddCompanyForm;
