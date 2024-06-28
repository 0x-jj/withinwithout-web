import Container from "@/components/Container";
import chainInfo from "@/config/chainInfo.json";
import { Col, Row, Space, Typography } from "antd";
import axios from "axios";
import ABI from "config/apxfpAbi.json";
import { ethers } from "ethers";
import type { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";

const { Title } = Typography;

function shortenAddress(address: string, chars = 4) {
  return `${address.substring(0, chars + 2)}...${address.substring(
    42 - chars
  )}`;
}

export default function Token(props: TokenProps) {
  const router = useRouter();
  const tokenId = router.query.token;
  const { owner, metadata } = props;

  return (
    <>
      <NextSeo
        title={`Within/Without | #${tokenId}`}
        description="Within/Without by Aaron Penne and FingerprintsDAO."
      />
      <Container>
        <Row
          gutter={[48, 16]}
          className="mobile-padding"
          style={{ backgroundColor: "white" }}
        >
          <Col
            span={12}
            xs={{ span: 24, order: 2 }}
            md={{ span: 24, order: 2 }}
            lg={{ span: 24, order: 2 }}
            xl={{ span: 24, order: 2 }}
            xxl={{ span: 12, order: 1 }}
            style={{
              backgroundColor: "rgb(255, 255, 255, 0.5)",
              paddingLeft: "0px",
              paddingRight: "0px",
            }}
          >
            <Row
              align="middle"
              justify="center"
              style={{ minHeight: "50%", backgroundColor: "white" }}
            >
              <Title>APxFP #{tokenId}</Title>
              <p className="token-description center-block">
                <b>
                  Is the art in the code or the output? For on-chain generative
                  artwork it is both, simultaneously.
                  <br></br>
                  <br></br>
                  There is a direct lineage traced from Sol LeWitt’s Wall
                  Drawings to Larva Labs’ Autoglyphs to Aaron Penne’s
                  Within/Without. Each of these projects decouples the artist's
                  instructions from the visual output, and those instructions
                  are interpreted according to some element of chance. Sol
                  LeWitt wrote step-by-step instructions for other people to
                  follow, Larva Labs generated symbols with Solidity code which
                  are to be interpreted as instructions, and Within/Without
                  generates symbols with Javascript code which are interpreted
                  internally to then generate colorful abstract artwork.
                  <br></br>
                  <br></br>
                  The familiar Autoglyph-like structure is made up of primitive
                  forms: lines, circles, and squares. In WW these are translated
                  to create complex rectangular structures, dreamlike gradients,
                  and soft edges made of pixelated digital artifacts. WW
                  captures the duality of soft paintings and geometric digital
                  art, intentionally preserving the artifacts of striking this
                  balance. Both the composition and the color position of each
                  piece slowly shifts over time, with the majority taking as
                  long as 306 hours to loop.
                  <br></br>
                  <br></br>
                  Each output will animate at the Meditative speed every
                  Saturday (UTC−08:00). This is done to bring our community
                  together on a regular basis, to enjoy getting to know your
                  artwork better. You can see the underlying glyph and can
                  change the zoom levels for your piece, details at{" "}
                  <a
                    href={"https://aaronpenne.io/work/withinwithout"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <u>https://aaronpenne.io/work/withinwithout</u>
                  </a>
                  .<br></br>
                  <br></br>
                  Within/Without is created with vanilla Javascript/GLSL stored
                  entirely on the Ethereum blockchain.
                  <br></br>
                  <br></br>
                  Thank you to{" "}
                  <a
                    href={"https://twitter.com/0x__jj"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <u>0x__jj</u>
                  </a>{" "}
                  for building the contract and website. Thank you to{" "}
                  <a
                    href={"https://twitter.com/dollar_monopoly"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <u>Dollar Monopoly</u>
                  </a>{" "}
                  for patiently driving this project forward for months. Thank
                  you to the members of #genartclub,{" "}
                  <a
                    href={"https://twitter.com/framergence"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <u>Arihz</u>
                  </a>
                  , and{" "}
                  <a
                    href={"https://twitter.com/supergremplin"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <u>Gremplin</u>
                  </a>{" "}
                  for support. Thank you to Larva Labs for paving the way. Thank
                  you to all members of the Fingerprints DAO for continuing to
                  solidify on-chain generative art as a culturally significant
                  medium.
                </b>
              </p>
              <Space direction="vertical">
                <div style={{ textAlign: "center" }}>
                  Owner:{" "}
                  <a
                    href={`https://etherscan.io/address/${owner}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {shortenAddress(owner)}
                  </a>
                </div>
                <Space wrap className="hide-on-mobile">
                  <div style={{ textAlign: "center" }}>
                    <a
                      href={`https://etherscan.io/token/${chainInfo.contractAddress}?a=${tokenId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <b>view on Etherscan ↗ </b>
                    </a>
                  </div>
                  <div>&#183;</div>
                  <div>
                    <a
                      href={`https://opensea.io/assets/${chainInfo.contractAddress}/${tokenId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <b>view on OpenSea ↗ </b>
                    </a>
                  </div>
                  <div>&#183;</div>
                  <div>
                    <a
                      href={`https://looksrare.org/collections/${chainInfo.contractAddress}/${tokenId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <b>view on LooksRare ↗ </b>
                    </a>
                  </div>
                </Space>
              </Space>
            </Row>
            <Row style={{ marginTop: "1rem" }}>
              <table className={"tbl"}>
                <tr className={"tbl-row"}>
                  <th>Feature</th>
                  <th>Value</th>
                </tr>
                {metadata.attributes.map((m) => {
                  return (
                    <tr className={"tbl-row"}>
                      <td>{m.trait_type}</td>
                      <td>{m.value}</td>
                    </tr>
                  );
                })}
              </table>
            </Row>
          </Col>
          <Col
            span={12}
            xs={{ span: 24, order: 1 }}
            md={{ span: 24, order: 1 }}
            lg={{ span: 24, order: 1 }}
            xl={{ span: 24, order: 1 }}
            xxl={{ span: 12, order: 2 }}
            style={{
              paddingLeft: "0px",
              paddingRight: "0px",
            }}
          >
            <div className="center-block detail-view">
              <iframe
                style={{ width: "100%", height: "100%", border: "none" }}
                src={`/api/token/live/${tokenId}`}
                scrolling="no"
              />
            </div>
            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <a
                href={`https://withinwithout.s3.us-east-2.amazonaws.com/${tokenId}.png`}
                target="_blank"
                rel="noreferrer"
              >
                <b>Image</b>
              </a>{" "}
              -{" "}
              <a
                href={`/api/token/live/${tokenId}`}
                target="_blank"
                rel="noreferrer"
              >
                <b>Live</b>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

interface TokenProps {
  status?: string;
  owner: string;
  error?: any;
  metadata?: any;
}

export const getServerSideProps: GetServerSideProps<TokenProps> = async (
  context
) => {
  const { token } = context.query;
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.ALCHEMY_URL
  );

  const contract = new ethers.Contract(
    chainInfo.contractAddress,
    ABI,
    provider
  );
  const owner = await contract.ownerOf(token as string);
  const resp = await axios.get(
    `https://www.withinwithout.xyz/api/token/metadata/${token}`
  );
  try {
    return {
      props: {
        status: "ok",
        owner: owner,
        metadata: resp.data,
      },
    };
  } catch (e) {
    return {
      props: {
        status: "error",
        error: "notoken",
        owner: "",
        metadata: { attributes: [] },
      },
    };
  }
};
