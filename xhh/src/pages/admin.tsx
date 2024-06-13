import { useSession } from "next-auth/react";
import React from "react";
import Login from "./login";
import { CssBaseline } from "@mui/material";
import DashboardPage from "./dashboard";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IOrder, IPost } from "../../interface/interface";
import { client } from "../../lib/sanity";

async function getData() {
  const query = `*[_type == "orderXHH"] | order(_createdAt desc)`;

  const data = await client.fetch(query);

  return data;
}

export default function Admin({ data }: { data: IOrder[] }) {
  const { data: session } = useSession();

  return (
    <>
        <CssBaseline/>
        <main>
            {session && <DashboardPage data={data}/>}
            {!session && <Login/>}
        </main>
    </>
  );
};

export async function getServerSideProps({ locale }: { locale: string }) {
  const data = await getData() as IOrder[];

  return {
    props: {
      data: data,
      ...(await serverSideTranslations(locale, [
          'common',
      ]))
    }, // will be passed to the page component as props
  };
}