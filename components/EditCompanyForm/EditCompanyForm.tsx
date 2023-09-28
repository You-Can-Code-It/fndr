import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import styles from "./EditCompanyForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Atoms/Input/Input";
import Label from "../Atoms/Label/Label";
import FormContainer from "../Atoms/FormContainer/FormContainer";

type FormProps = {
  id: string;
  name: string;
  indReferentNumber: string;
  city: string;
  street: string;
  houseNumber: string;
  postCode: string;
  website: string;
  category: string;
};

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

const EditCompanyForm: React.FC<FormProps> = ({
  id,
  name,
  indReferentNumber,
  city,
  street,
  houseNumber,
  postCode,
  website,
  category,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id,
      name,
      indReferentNumber,
      city,
      street,
      houseNumber,
      postCode,
      website,
      category,
    },
    resolver: zodResolver(formSchema),
  });

  const formSubmit = async (data: any) => {
    try {
      const response = await axios.patch(`/api/companies/${id}`, data);
      console.log("EditCompanyForm - Company edited:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("EditCompanyForm - Error editing company:", error);
    }
  };

  return (
    <div className={styles.editCompanyFormContainer}>
      <form
        className={styles.editCompanyForm}
        onSubmit={handleSubmit(formSubmit)}
      >
        <FormContainer>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Company Name"
            {...register("name")}
          />
          {errors.name && (
            <p className="error">{String(errors.name.message)}</p>
          )}
        </FormContainer>

        <FormContainer>
          <Label htmlFor="indReferentNumber">Ind Number</Label>
          <Input
            id="indReferentNumber"
            type="text"
            placeholder="Ind Number"
            {...register("indReferentNumber")}
          />
          {errors.indReferentNumber && (
            <p className="error">{String(errors.indReferentNumber.message)}</p>
          )}
        </FormContainer>

        <FormContainer>
          <Label htmlFor="website">Website</Label>
          <Input type="text" placeholder="Website" {...register("website")} />
          {errors.website && (
            <p className="error">{String(errors.website.message)}</p>
          )}
        </FormContainer>

        <FormContainer>
          <Label htmlFor="category">Category</Label>
          <Input
            type="text"
            placeholder="Category"
            {...register("category")}
            className={styles.addCompanyForm}
          />
          {errors.category && (
            <p className="error">{String(errors.category.message)}</p>
          )}
        </FormContainer>

        <FormContainer>
          <Label htmlFor="city">City</Label>
          <Input type="text" placeholder="City" {...register("city")} />
          {errors.city && (
            <p className="error">{String(errors.city.message)}</p>
          )}
        </FormContainer>

        <FormContainer>
          <Label htmlFor="street">Street name</Label>
          <Input type="text" placeholder="Street" {...register("street")} />
          {errors.street && (
            <p className="error">{String(errors.street.message)}</p>
          )}
        </FormContainer>

        <FormContainer>
          <Label htmlFor="houseNumber">House number</Label>
          <Input
            type="text"
            placeholder="Number"
            {...register("houseNumber")}
          />
          {errors.houseNumber && (
            <p className="error">{String(errors.houseNumber.message)}</p>
          )}
        </FormContainer>

        <FormContainer>
          <Label htmlFor="postCode">Postal code</Label>
          <Input
            type="text"
            placeholder="Postal code"
            {...register("postCode")}
          />
          {errors.postCode && (
            <p className="error">{String(errors.postCode.message)}</p>
          )}
        </FormContainer>

        <FormContainer>
          <button className={styles.cancelButton} type="submit">
            Cancel
          </button>
          <button className={styles.submitButton} type="submit">
            Edit Company
          </button>
        </FormContainer>
      </form>
    </div>
  );
};

export default EditCompanyForm;
