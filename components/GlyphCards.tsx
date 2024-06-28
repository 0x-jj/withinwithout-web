import styles from "@/styles/Home.module.css";
import { Col, Row } from "antd";
import FlipCard from "flip-card-react";
import React, { useState } from "react";

export function GlyphCards() {
  const [isOneFlipped, setOneFlipped] = useState(false);
  const [isTwoFlipped, setTwoFlipped] = useState(false);
  const [isThreeFlipped, setThreeFlipped] = useState(false);
  const [isFourFlipped, setFourFlipped] = useState(false);
  return (
    <Row gutter={[24, 24]} align={"middle"} style={{ height: "100%" }}>
      <Col
        span={12}
        xs={24}
        md={12}
        lg={12}
        xl={12}
        className={styles.glyph}
        onMouseEnter={(e) => {
          e.preventDefault();
          setOneFlipped(!isOneFlipped);
        }}
      >
        <FlipCard
          isFlipped={isOneFlipped}
          perspective={true}
          vertical={true}
          infinite={true}
          front={<img src={"/output2.png"} width={"100%"}></img>}
          back={<img src={"/glyph2.png"} width={"100%"}></img>}
        ></FlipCard>
      </Col>
      <Col
        span={12}
        xs={24}
        md={12}
        lg={12}
        xl={12}
        className={styles.glyph}
        onMouseEnter={(e) => {
          e.preventDefault();
          setTwoFlipped(!isTwoFlipped);
        }}
      >
        <FlipCard
          isFlipped={isTwoFlipped}
          vertical={true}
          perspective={true}
          infinite={true}
          back={<img src={"/glyph3.png"} width={"100%"}></img>}
          front={<img src={"/output3.png"} width={"100%"}></img>}
        ></FlipCard>
      </Col>

      <Col
        span={12}
        className={styles.glyph}
        onMouseEnter={(e) => {
          e.preventDefault();
          setThreeFlipped(!isThreeFlipped);
        }}
      >
        <FlipCard
          isFlipped={isThreeFlipped}
          perspective={true}
          vertical={true}
          infinite={true}
          back={<img src={"/glyph1.png"} width={"100%"}></img>}
          front={<img src={"/output1.png"} width={"100%"}></img>}
        ></FlipCard>
      </Col>
      <Col
        span={12}
        className={styles.glyph}
        onMouseEnter={(e) => {
          e.preventDefault();
          setFourFlipped(!isFourFlipped);
        }}
      >
        <FlipCard
          isFlipped={isFourFlipped}
          perspective={true}
          vertical={true}
          infinite={true}
          front={<img src={"/output4.png"} width={"100%"}></img>}
          back={<img src={"/glyph4.png"} width={"100%"}></img>}
        ></FlipCard>
      </Col>
    </Row>
  );
}
