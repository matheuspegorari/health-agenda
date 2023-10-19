import Head from "next/head";

import SchedulesAdminScreen from "@/screens/admin/SchedulesAdminScreen";

export default function SchedulesAdmin() {
  return (
    <>
      <Head>
        <title>Agenda Saúde</title>
        <meta name="description" content="Agenda Saúde" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SchedulesAdminScreen />
    </>
  );
}
