import connectDB from "../data/db";
import { User, Project, Logging } from "../data/dataModel";

import Home from "@/components/Home";

export const getServerSideProps = async () => {
  try {
    await connectDB();
    console.log("MONGO_DB CONNECTED");

    const users = await User.find({}).sort({ name: 1 }).lean();
    const projects = await Project.find({}).sort({ name: -1 }).lean();
    const loggings = await Logging.find({});

    return {
      props: {
        users: JSON.parse(JSON.stringify(users)),
        projects: JSON.parse(JSON.stringify(projects)),
        loggings: JSON.parse(JSON.stringify(loggings)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default Home;
