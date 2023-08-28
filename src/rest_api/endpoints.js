const HOST_URL = "http://localhost:3001/";

export const endPoints = {
  HOST_URL,
  REST_API: {
    Account: {
      LogIn: "user/login",
      Register: "user/signup",
      Forgot_password: "user/forgot-password",
      Reset_password: "reset-password",
    },
    CxRedbooth: {
      ConnextarUsers: "cx-users",
      ConnextarProjects: "projects",
      GenerateWeeklySummary: "invoice/generate-weekly-summary/",
    },
    CxClockify: {
      WeeklySummary: "generate-weekly-summary",
    },
    Invoice: {
      GenerateInvoice: "invoice/generate-invoice",
      DownloadPDF: "invoice/generate-invoice/pdf",
    },
  },
};
