import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PopUpModel from "@/common/PopUpModel";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import { handleApiError } from "@/utils/handleApiError";
import { endPoints } from "@/rest_api/endpoints";
import { messages } from "@/utils/messages";

const { REST_API, HOST_URL } = endPoints;

const Signup = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false); // New state variable for checkbox
  const [showModal, setShowModal] = useState(false); // State variable for modal visibility
  const [modalMessage, setModalMessage] = useState(""); // State variable for modal message
  const [isLoading, setIsLoading] = useState(false); //state varialble for loading...

  const router = useRouter();

  useEffect(() => {
    if (isRegistered) {
      // Redirect to the dashboard page after successful registration
      router.push("/login");
    }
  }, [isRegistered]);

  const initialValues = {
    rbUserId: "",
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    rbUserId: Yup.string().required(messages.validation.rbUserId),
    name: Yup.string().required(messages.validation.requiredName),
    email: Yup.string()
      .email(messages.validation.invalidEmail)
      .required(messages.validation.requiredField),
    password: Yup.string()
      .required(messages.validation.requiredField)
      .min(8, messages.validation.minimumPassword),
    acceptTerms: Yup.bool().oneOf([true], messages.validation.acceptTerms),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      // Make the API call to localhost:3001/user/signup
      await axios
        .post(`${HOST_URL}${REST_API.Account.Register}`, values)
        .then(() => {
          setIsLoading(false);
          setShowModal(true);
          setModalMessage(messages.showSuccessMessage.signupSuccess);
          setIsRegistered(true);
        });
    } catch (error) {
      setIsLoading(false);
      const errorMessage = handleApiError(error);
      setShowModal(true);
      setModalMessage(errorMessage);
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Signup</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="rbUserId">RB User ID</label>
              <Field
                type="text"
                id="rbUserId"
                name="rbUserId"
                className="block w-full border rounded py-2 px-3"
              />
              <ErrorMessage
                name="rbUserId"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                className="block w-full border rounded py-2 px-3"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="block w-full border rounded py-2 px-3"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="block w-full border rounded py-2 px-3"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            {/* Checkbox for accepting terms */}
            <div className="mb-4">
              <label>
                <Field
                  type="checkbox"
                  name="acceptTerms"
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                />
                <span className="ml-2">I accept the terms and conditions.</span>
              </label>
              <ErrorMessage
                name="acceptTerms"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
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
                  <span>Sign Up</span>
                )}
              </button>
            </div>
          </Form>
        </Formik>
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="underline font-bold">
            Login
          </a>
        </p>
      </div>
      {showModal && (
        <PopUpModel
          isOpen={showModal}
          closeModal={closeModal}
          title="Registration Status"
          text={modalMessage}
        />
      )}
    </div>
  );
};

export default Signup;
