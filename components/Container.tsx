import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const Header = dynamic(() => import("@/components/Header"), {
  ssr: false,
});

const Container: React.FC = ({ children }) => {
  return (
    <>
      <div className="app">
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <Header />
        <div id="content">{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Container;
