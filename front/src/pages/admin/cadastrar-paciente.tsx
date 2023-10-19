import Head from "next/head";

import CreatePatientScreen from "@/screens/admin/CreatePatientScreen";

export default function CreatePatient() {
  return (
    <>
      <Head>
        <title>Agenda Saúde</title>
        <meta name="description" content="Agenda Saúde" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CreatePatientScreen />
    </>
  );
}
