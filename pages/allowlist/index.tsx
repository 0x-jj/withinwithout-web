import Container from "@/components/Container";
import { Input } from "antd";
import Scores from "config/scores.json";
import { getAddress, isAddress } from "ethers/lib/utils";
import { NextSeo } from "next-seo";
import React, { useState } from "react";

const scores = new Map<string, number>();

for (const [address, points] of Object.entries(Scores)) {
  scores.set(address, points);
}

function getResponseText(address: string) {
  if (!address || !isAddress(address)) {
    return "";
  }
  const val = scores.get(getAddress(address));
  if (val) {
    return `You're in! You own ${val} eligible piece${
      val > 1 ? "s" : ""
    } so you can mint ${val >= 2 ? 2 : 1} in the presale.`;
  } else {
    return "Sorry, you're not in the presale allowlist, but you can purchase in the public sale!";
  }
}

export default function Allowlist() {
  const [address, setAddress] = useState("");
  return (
    <>
      <NextSeo
        title="Within/Without | Allowlist"
        description="Within/Without by Aaron Penne and FingerprintsDAO."
      />
      <Container>
        <div
          className="block-center"
          style={{ textAlign: "center", marginTop: "96px" }}
        >
          <div>Check if you're in the allowlist</div>
          <br></br>
          <Input
            placeholder="address"
            style={{ width: "50%", borderColor: "#444" }}
            onChange={(e) => setAddress(e.target.value)}
          />
          <br></br>
          <div style={{ marginTop: "32px" }}>
            <b>{getResponseText(address)}</b>
          </div>
        </div>
      </Container>
    </>
  );
}
