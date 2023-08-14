import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function getServerSideProps(ctx) {
  // Get user session from the request headers
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  // If user is logged in then redirect to dashboard
  // If not then redirect the user to the signin page for login
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
      },
    };
  } else {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
}

/**
 * Our default root index page component function
 *
 * @param {*} props
 * @returns
 */
export default function Index() {
  return <div></div>;
}
