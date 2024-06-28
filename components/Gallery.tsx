import chainInfo from "@/config/chainInfo.json";
import { Col, Image, Row } from "antd";
import Link from "next/link";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export interface UserProps {
  tokenIds: string[];
  rinkeby: boolean;
}

export default function Gallery({ tokenIds, rinkeby }: UserProps) {
  const [tokens, setTokens] = useState(tokenIds);
  const [visibleTokens, setVisibleTokens] = useState(
    tokenIds.slice(0, 13).map((t: any) => t.toString())
  );
  const [hasMore, setHasMore] = useState(tokenIds.length > 13);

  const showMore = () => {
    if (visibleTokens.length >= tokens.length) {
      setHasMore(false);
      return;
    }
    setVisibleTokens(
      visibleTokens.concat(
        tokens.slice(visibleTokens.length, visibleTokens.length + 13)
      )
    );
  };

  return (
    <>
      {tokens.length !== 0 && (
        <InfiniteScroll
          dataLength={visibleTokens.length}
          next={showMore}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>end.</b>
            </p>
          }
          style={{ overflowX: "hidden" }}
        >
          <Row gutter={[16, 16]}>
            {visibleTokens.map((token, i) => {
              if (rinkeby) {
                return (
                  <Col span={4} xs={24} md={6} lg={6} xl={6} key={i}>
                    <Image
                      src={`https://apxfp-ropsten.s3.us-east-2.amazonaws.com/${token}.png`}
                      width={"100%"}
                      fallback={"/placeholder.png"}
                      preview={false}
                    ></Image>
                  </Col>
                );
              } else {
                return (
                  <Col span={4} xs={24} md={6} lg={6} xl={6} key={i}>
                    <a href={`/api/token/live/${token}`}>
                      <Image
                        src={`https://withinwithout.s3.us-east-2.amazonaws.com/${token}.png`}
                        width={"100%"}
                        fallback={"/placeholder.png"}
                        preview={false}
                      ></Image>
                    </a>
                    <div style={{ textAlign: "center", margin: "16px" }}>
                      <Link href={`/details/${token}`}>
                        <a>#{token} &#183; info</a>
                      </Link>{" "}
                      &#183;{" "}
                      <a
                        target={"_blank"}
                        rel="noreferrer"
                        href={`https://withinwithout.s3.us-east-2.amazonaws.com/${token}.png`}
                      >
                        image
                      </a>{" "}
                      &#183;{" "}
                      <a
                        target={"_blank"}
                        rel="noreferrer"
                        href={`https://opensea.io/assets/${chainInfo.contractAddress}/${token}`}
                      >
                        opensea
                      </a>
                    </div>
                  </Col>
                );
              }
            })}
          </Row>
        </InfiniteScroll>
      )}
      {tokens.length === 0 && (
        <p style={{ textAlign: "center", backgroundColor: "white" }}>
          <b>No tokens to display.</b>
        </p>
      )}
    </>
  );
}
