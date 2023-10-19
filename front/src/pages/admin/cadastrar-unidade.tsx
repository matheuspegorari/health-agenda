import Head from "next/head";

import CreateUnityHealthScreen from "@/screens/admin/CreateUnityHealthScreen";

export default function CreateUnityHealth() {
  return (
    <>
      <Head>
        <title>Agenda Saúde</title>
        <meta name="description" content="Agenda Saúde" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CreateUnityHealthScreen />
    </>
  );
}
