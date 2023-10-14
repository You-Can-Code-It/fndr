import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import styles from "./EditCompanyForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Atoms/Input/Input";
import Label from "../typography/Label";
import FormContainer from "../Atoms/FormContainer/FormContainer";
import { useRouter } from "next/router";
import NavBar from "../NavBar/NavBar";
import BackIcon from "../Atoms/BackIcon/BackIcon";
import Heading1 from "../typography/Heading1";
import Button from "../Button/Button";
import Link from "next/link";

type Company = {
  id: string;
  name: string;
  indReferentNumber: string;
  city: string;
  street: string;
  houseNumber: string;
  postCode: string;
  website: string;
  category: string;
  tagTitle: string;
  tagCategory: string;
  tags: any;
};

type Tag = {
  id: string;
  title: string;
  category: string;
};

type EditCompanyProps = {
  company: Company;
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
  tagTitle: z
    .string()
    .min(2, "Tag title must contain at least 2 characters.")
    .max(255, "The provided tag title contains too much characters."),
  tagCategory: z
    .string()
    .min(2, "Tag category must contain at least 2 characters.")
    .max(255, "The provided tag category contains too much characters."),
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

const EditCompanyForm: React.FC<EditCompanyProps> = ({ company }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: company.id,
      name: company.name,
      indReferentNumber: company.indReferentNumber,
      city: company.city,
      street: company.street,
      houseNumber: company.houseNumber,
      postCode: company.postCode,
      website: company.website,
      category: company.category,
      tagTitle: "",
      tagCategory: "",
    },
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();
  const [displayAddTag, setDisplayAddTag] = useState(false);

  const formSubmit = async (data: any) => {
    try {
      console.log("EditCompanyForm, data", data);
      const response = await axios.patch(`/api/companies/${company.id}`, data);
      router.push(`/companies/${company.id}`);
    } catch (error) {
      console.error("EditCompanyForm - Error editing company:", error);
    }
  };

  const removeTag = (tagId: any) => {
    axios
      .delete(`/api/companies/${company.id}/tags?tagId=${tagId}`)
      .then((response) => {
        console.log("Tag removed:", response.data);
        window.location.reload();
      })

      .catch((error) => {
        console.error("EditCompanyForm: Failed to remove tag:", error);
      });
  };

  return (
    <div className={styles.editCompanyFormContainer}>
      <NavBar />
      <div className={styles.editCompanyNavContainer}>
        <Link href={"/"}>
          <BackIcon />
        </Link>

        <Heading1 variant="detailsPage">Edit Company</Heading1>
      </div>
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
          <Label htmlFor="tags">Tags:</Label>
          {company.tags.length !== 0 &&
            company.tags.map((oneTag: any) => (
              <li
                className={styles.removeTag}
                onClick={() => removeTag(oneTag.id)}
              >
                {oneTag.title}{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="20"
                  viewBox="0 0 14 20"
                  fill="none"
                >
                  <path
                    d="M12.8333 4.99999V16.6667C12.8333 17.1087 12.6577 17.5326 12.3451 17.8452C12.0326 18.1577 11.6087 18.3333 11.1666 18.3333H2.83329C2.39127 18.3333 1.96734 18.1577 1.65478 17.8452C1.34222 17.5326 1.16663 17.1087 1.16663 16.6667V4.99999M3.66663 4.99999V3.33332C3.66663 2.8913 3.84222 2.46737 4.15478 2.15481C4.46734 1.84225 4.89127 1.66666 5.33329 1.66666H8.66663C9.10865 1.66666 9.53258 1.84225 9.84514 2.15481C10.1577 2.46737 10.3333 2.8913 10.3333 3.33332V4.99999"
                    stroke="#EC7065"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </li>
            ))}
          {!company.tags.length && <Label>"No tags added yet."</Label>}
        </FormContainer>
        <div className={styles.addTagButton}>
          <FormContainer onClick={() => setDisplayAddTag(!displayAddTag)}>
            {" "}
            <Label htmlFor="addNewTag">+ Add Tag</Label>
          </FormContainer>
        </div>{" "}
        {displayAddTag && (
          <>
            <FormContainer>
              <Label htmlFor="tag">Tag title</Label>
              <Input
                type="text"
                placeholder="add a tag title"
                {...register("tagTitle")}
                className={styles.addCompanyForm}
              />
              {errors.category && (
                <p className="error">{String(errors.tagTitle?.message)}</p>
              )}
            </FormContainer>
            <FormContainer>
              <Label htmlFor="tag">Tag category</Label>
              <Input
                type="text"
                placeholder="add a tag category"
                {...register("tagCategory")}
                className={styles.addCompanyForm}
              />
              {errors.category && (
                <p className="error">{String(errors.tagCategory?.message)}</p>
              )}
            </FormContainer>
          </>
        )}
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
        <div className={styles.buttonContainer}>
          <Button
            variant="cancelButton"
            onClick={() => {
              router.push(`/companies/${company.id}`);
            }}
          >
            Cancel
          </Button>
          <Button variant="saveButton">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default EditCompanyForm;
