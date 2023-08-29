import React, { useState } from "react";
import axios from "axios";
import Router from "next/router";
import Head from "next/head";
import PopUpModel from "@/common/PopUpModel";
import { endPoints } from "@/rest_api/endpoints";
import { messages } from "@/utils/messages";
import { handleApiError } from "@/utils/handleApiError";

const { REST_API, HOST_URL } = endPoints;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState(""); // To store the reset token
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleResetSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${HOST_URL}${REST_API.Account.Forgot_password}`,
        {
          email: email,
        }
      );
      setResetToken(response.data.resetToken);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handlePasswordResetSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${HOST_URL}${REST_API.Account.ResetPassword}`,
        {
          email: email,
          token: resetToken,
          password: password,
          confirmPassword: confirmPassword,
        }
      );
      setShowModal(true);
      setModalMessage(
        response.data.status === 1
          ? messages.showSuccessMessage.passwordReset
          : messages.validation.invalidPassword
      );
      if (response.data.status == 1) {
        Router.replace("/dashboard");
      }
    } catch (error) {
      setShowModal(true);
      setModalMessage(messages.showErrorMessage.passwordError);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <>
      <Head>
        <title>Forgot password</title>
      </Head>
      <div className="flex justify-center items-center h-screen">
        {!resetToken ? (
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleResetSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Reset Password
              </button>
            </div>
          </form>
        ) : (
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handlePasswordResetSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="New Password"
                value={password}
                onChange={handleNewPasswordChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
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
                  <span> Reset Password</span>
                )}
              </button>
            </div>
          </form>
        )}
        {showModal && (
          <PopUpModel
            isOpen={showModal}
            closeModal={closeModal}
            title="Forgot password"
            text={modalMessage}
          />
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
