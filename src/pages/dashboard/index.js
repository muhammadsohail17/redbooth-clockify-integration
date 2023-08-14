import Head from "next/head";
import React from "react";
import axios from "axios";
import Dashboard from "../../components/Dashboard";
import { generateInvoiceData } from "../../data/util";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function getServerSideProps(ctx) {
  const { User } = require("../../data/dataModel");
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (session) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const { rbUserId: userId } = User;

    let data = await generateInvoiceData(currentMonth, currentYear, userId);

    return {
      props: {
        data: JSON.parse(JSON.stringify(data)),
      },
    };
  } else {
    return {
      redirect: { destination: "/login" },
      props: {},
    };
  }
}

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Dashboard data={data} />
    </>
  );
}
