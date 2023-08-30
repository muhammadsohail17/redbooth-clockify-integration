import React, { useState } from "react";
import axios from "axios";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { months, years } from "@/utils/const";
import { endPoints } from "@/rest_api/endpoints";
import { messages } from "@/utils/messages";
import { handleApiError } from "@/utils/handleApiError";

const { REST_API, HOST_URL } = endPoints;

export default function GenerateInvoice() {
  const [isLoading, setIsLoading] = useState(false);
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
    userId: Yup.string().required(messages.validation.rbUserId),
    hourlyRate: Yup.number()
      .required(messages.validation.requiredHourlyRate)
      .positive(messages.validation.positiveHourlyRate)
      .typeError(messages.validation.hourlrRateType),
    invoiceNo: Yup.number()
      .required(messages.validation.requiredInvoiceNumber)
      .integer(messages.validation.invoiceNumberType)
      .min(0, messages.validation.positiveInvoiceNumber),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
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
      setIsLoading(false);
      // Redirect to another page with invoiceItem as query parameter
      router.push({
        pathname: "/dashboard/invoice",
        query: { invoice_data: JSON.stringify(response.data) },
      });
    } catch (error) {
      handleApiError(error);
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
                className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 016 12H2c0 2.981 1.655 5.597 4 6.975V17zm10-5.291a7.962 7.962 0 01-2 5.291v-1.725c1.345-.378 2.3-1.494 2.4-2.766h-2.4zm-8-3.518v1.725c-1.345.378-2.3 1.494-2.4 2.766h2.4A7.962 7.962 0 016 11.709z"
                    ></path>
                  </svg>
                ) : (
                  <span>Generate Invoice</span>
                )}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}
