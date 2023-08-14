import connectDB from "../data/db";

export const getServerSideProps = async (ctx) => {
  const { registerUser } = require("../data/dataModel");
  const { token } = ctx.query;
  try {
    // await connectDB();
    // Find the user with the provided verification token
    const user = await registerUser.findOne({ verificationToken: token });
    if (!user) {
      // Handle invalid verification token
      return {
        redirect: {
          destination: "/login",
        },
      };
    }

    // Set the user's isVerified field to true
    user.isVerified = true;
    user.verificationToken = false;
    await user.save();
    // Redirect the user to a success page or display a success message
    return {
      redirect: {
        destination: `/login?email=${user.email}`,
      },
      props: {},
    };
  } catch (err) {
    console.log(err);
    // Handle internal server error
  }
};

export default function Verify() {
  return (
    <>
      <Head>
        <title>Redbooth + Clockify Integration</title>
      </Head>
      <section className="py-24 lg:py-28 bg-cyan-600 h-screen overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif mb-4 text-4xl text-white tracking-tighter">
              Choose a new password
            </h2>
            <form /*onSubmit={handleSubmit}*/>
              <div className="w-full md:w-1/2 p-3">
                <label className="block">
                  <input
                    /*onChange={(e) => setPassword(e.target.value)} value={email}*/ name="password"
                    className="p-4 w-full text-gray-700 tracking-tight bg-white placeholder-gray-700 outline-none border border-gray-600 placeholder-light-gray-700 rounded-lg focus:border-indigo-500 transition duration-200"
                    id="password"
                    type="password"
                    placeholder="Password"
                    required
                  />
                </label>
              </div>
              <div className="w-full md:w-1/2 p-3">
                <label className="block">
                  <input
                    /*onChange={(e) => setConfirmPassword(e.target.value)} value={email}*/ name="confirmpassword"
                    className="p-4 w-full text-gray-700 tracking-tight bg-white placeholder-gray-700 outline-none border border-gray-600 placeholder-light-gray-700 rounded-lg focus:border-indigo-500 transition duration-200"
                    id="confirmpassword"
                    type="password"
                    placeholder="Confirm Password"
                    required
                  />
                </label>
              </div>

              <div className="w-full md:w-1/2 p-3">
                <button
                  type="submit"
                  className="p-4 w-full text-white font-semibold  bg-indigo-500 hover:bg-indigo-600 outline-none border border-gray-600 rounded-lg focus:border-indigo-500 transition duration-200"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
