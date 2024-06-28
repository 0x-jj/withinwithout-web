import AppContainer from "@/components/Container";
import { GlyphCards } from "@/components/GlyphCards";
import styles from "@/styles/Home.module.css";
import { Col, Row } from "antd";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import React from "react";

const Mint = dynamic(() => import("@/components/Mint"), {
  ssr: false,
});

const boxShadow = `2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
100px 100px 80px rgba(0, 0, 0, 0.07)`;

export default function Home() {
  return (
    <>
      <NextSeo
        title="Within/Without | Home"
        description="Within/Without by Aaron Penne and FingerprintsDAO."
      />
      <AppContainer>
        <Row gutter={[48, 16]}>
          <Col
            span={12}
            style={{
              boxShadow,
              backgroundColor: "rgb(34, 34, 34)",
              backgroundSize: "cover",
              color: "white",
            }}
            xs={24}
            md={24}
            lg={24}
            xl={12}
          >
            <div className={styles.home}>
              <br />
              <br />
              <h1 className="main-title" style={{ color: "white" }}>
                Within/Without
              </h1>
              <h3 style={{ color: "white" }}>
                by Aaron Penne & FingerprintsDAO
              </h3>
              <h1 style={{ color: "white" }}></h1>
              <span style={{ color: "white" }}>
                Is the art in the code or the output? For on-chain generative
                artwork it is both, simultaneously. Tracing the lineage from Sol
                LeWitt’s Wall Drawings to Larva Labs’ Autoglyphs, Aaron Penne’s
                Within/Without decouples the artist's instructions from the
                visual output, and those instructions are interpreted according
                to some element of chance.
                <br></br>
                <br></br> The familiar Autoglyph-like structure is made up of
                primitive forms: lines, circles, and squares. In WW these are
                translated to create complex rectangular structures, dreamlike
                gradients, and soft edges made of pixelated digital artifacts.
                <br></br>
                <br></br>
                <a
                  href={"https://aaronpenne.io/work/withinwithout"}
                  style={{ color: "white" }}
                  target={"_blank"}
                  rel="noreferrer"
                >
                  More details: <u>https://aaronpenne.io/work/withinwithout</u>
                </a>
                .
              </span>
              <br />
              <br />
              {/* <Mint minted={totalSupply} saleStarted={saleStarted} /> */}
              <a
                href={"https://opensea.io/collection/withinwithout"}
                target="_blank"
                rel="noreferrer"
              >
                <span className={styles.button56}>
                  <span>View collection on OpenSea</span>
                </span>
              </a>
              <br />
            </div>
          </Col>
          <Col span={12} xs={24} md={24} lg={24} xl={12}>
            <GlyphCards />
          </Col>
        </Row>
        <br />
        <br />
      </AppContainer>
    </>
  );
}

interface HomeProps {
  status: string;
  totalSupply: string;
  saleStarted: boolean;
  error?: string;
}
