import React from "react";
import axios from "axios";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { months, years } from "@/utils/const";
import { endPoints } from "@/rest_api/endpoints";

const { REST_API, HOST_URL } = endPoints;

export default function GenerateInvoice() {
  const { data: session } = useSession();

  const router = useRouter();

  const initialValues = {
    userId: session?.user?.rbUserId || "",
    month: "",
    year: "",
    hourlyRate: "",
    invoiceNo: "",
  };

  const validationSchema = Yup.object().shape({
    userId: Yup.string().required("rbUserId is required"),
    hourlyRate: Yup.number()
      .required("Hourly rate is required")
      .positive("Hourly rate must be positive")
      .typeError("Hourly rate must be a number"),
    invoiceNo: Yup.number()
      .required("Invoice number is required")
      .integer("Invoice number must be an integer")
      .min(0, "Invoice number must be a positive integer"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        `${HOST_URL}${REST_API.Invoice.GenerateInvoice}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );
      console.log("Invoice generated successfully:", response.data);
      // Redirect to another page with invoiceItem as query parameter
      router.push({
        pathname: "/dashboard/invoice",
        query: { invoice_data: JSON.stringify(response.data) },
      });
    } catch (error) {
      console.error("Error generating invoice:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Generate Invoice</title>
      </Head>

      <div className="bg-gray-900 min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-semibold text-center mb-6">
            Invoice Generator
          </h1>
          <p className="text-gray-500 py-0 mb-6">
            Provide the following details to generate your Invoice
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="userId"
                  className="block text-gray-700 font-medium mb-2"
                >
                  RB UserId
                </label>
                <Field
                  type="text"
                  id="userId"
                  name="userId"
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <ErrorMessage
                  name="userId"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="month"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Select Month
                  </label>
                  <Field
                    as="select"
                    id="monthSelect"
                    name="month"
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    {Object.keys(months).map((monthName) => (
                      <option key={months[monthName]} value={months[monthName]}>
                        {monthName}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="month"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="year"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Select Year
                  </label>
                  <Field
                    as="select"
                    id="yearSelect"
                    name="year"
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="year"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="hourlyRate"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Hourly Rate
                </label>
                <Field
                  type="text"
                  id="hourlyRate"
                  name="hourlyRate"
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <ErrorMessage
                  name="hourlyRate"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="invoiceNo"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Invoice No
                </label>
                <Field
                  type="text"
                  id="invoiceNo"
                  name="invoiceNo"
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <ErrorMessage
                  name="invoiceNo"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 text-white bg-gray-600 hover:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Generate Invoice
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}
