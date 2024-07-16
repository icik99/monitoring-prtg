import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Toaster
            position="top-center"
            reverseOrder={true}
        />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
