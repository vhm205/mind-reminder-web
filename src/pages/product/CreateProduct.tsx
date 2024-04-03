import { FC } from "react";
import { object, string } from "yup";
import { FormikHelpers, useFormik } from "formik";

import { InputField } from "@/components/fields/InputField";
import { ErrorMessage } from "@/components/error";
import { Button } from "@/components/button";

interface ICreateProduct {
  name: string;
  type: string;
  category: string;
  price: number;
  status: string;
}

const createProductSchema = object<ICreateProduct>({
  name: string().min(2, "Too Short!").required("Name is required"),
  type: string().min(5, "Too short!").optional(),
});

const CreateProduct: FC = () => {
  const handleSubmit = (
    values: ICreateProduct,
    { resetForm }: FormikHelpers<ICreateProduct>,
  ) => {
    console.log({ values });
    resetForm();
  };

  const formik = useFormik({
    validationSchema: createProductSchema,
    initialValues: {
      name: "",
      type: "",
      category: "",
      price: 0,
      status: "active",
    },
    onSubmit: handleSubmit,
  });

  return (
    <div className="container flex min-h-screen flex-col px-6 py-3">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <a>Admin</a>
          </li>
          <li>Add Product</li>
        </ul>
      </div>
      <div className="box-border px-5 py-5 shadow-md">
        <h2 className="text-2xl font-bold">Create new product</h2>
        <form
          onSubmit={formik.handleSubmit}
          className="mb-12 mt-5 flex flex-col justify-items-end"
        >
          <InputField
            variant="default"
            extra="mb-2"
            label="Name (*)"
            placeholder="Product name"
            id="name"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            isError={formik.touched.name && !!formik.errors.name}
            errorElement={
              <ErrorMessage text={formik.errors.name} extra="mt-2 mx-2" />
            }
          />
          <InputField
            variant="default"
            extra="mb-3 mt-3"
            label="Description"
            placeholder="Description for template"
            id="description"
            name="description"
            type="text"
            value={formik.values.type}
            onChange={formik.handleChange}
            isError={formik.touched.type && !!formik.errors.type}
            errorElement={
              <ErrorMessage text={formik.errors.type} extra="mt-2 mx-2" />
            }
          />
          <div className="flex w-full justify-end">
            <Button text="Create" type="submit" extra="w-2/5" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
