import Head from "next/head";

import HomeAdminScreen from "@/screens/admin/HomeAdminScreen";

export default function HomeAdmin() {
  return (
    <>
      <Head>
        <title>Agenda Saúde</title>
        <meta name="description" content="Agenda Saúde" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeAdminScreen />
    </>
  );
}
