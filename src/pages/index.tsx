import Head from "next/head";
import FlightSearchPage from "@/component/FlightSearchPage";

export default function Home() {
  
  return (
    <>
      <Head>
        <title>Flight booking system</title>
      </Head>
      <main>
        <FlightSearchPage />
      </main>
    </>
  );
}
