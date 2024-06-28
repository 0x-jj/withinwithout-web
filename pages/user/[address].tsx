import Container from "@/components/Container";
import chainInfo from "@/config/chainInfo.json";
import ABI from "config/apxfpAbi.json";
import { ethers } from "ethers";
import type { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import React from "react";

const Gallery = dynamic(() => import("@/components/Gallery"), {
  ssr: false,
});

function shortenAddress(address: string, chars = 4) {
  return `${address.substring(0, chars + 2)}...${address.substring(
    42 - chars
  )}`;
}

interface GalleryProps {
  status?: string;
  tokenIds: string[];
  error?: any;
  address?: string;
}

export default function User(props: GalleryProps) {
  const { tokenIds, address } = props;

  return (
    <>
      <NextSeo
        title={`Within/Without | ${address ? shortenAddress(address) : ""}`}
        description="Within/Without by Aaron Penne and FingerprintsDAO."
      />
      <Container>
        <br />
        <Gallery tokenIds={tokenIds} rinkeby={false} />
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<GalleryProps> = async (
  context
) => {
  const { address } = context.query;
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.ALCHEMY_URL
  );

  const contract = new ethers.Contract(
    chainInfo.contractAddress,
    ABI,
    provider
  );
  let tokenIds: string[] = [];
  if (!address) {
    const totalSupply = await contract.totalSupply();
    const all = Array.from(Array(Number(totalSupply.toString())).keys());
    tokenIds = all.map((e) => e.toString());
  } else {
    const fetchedTokens: number[] = await contract.getTokensOfOwner(address);
    tokenIds = fetchedTokens.map((e) => e.toString());
  }

  try {
    return {
      props: {
        status: "ok",
        tokenIds,
        address: address as string,
      },
    };
  } catch (e) {
    return {
      props: {
        status: "error",
        error: "notoken",
        tokenIds: [],
        address: address as string,
      },
    };
  }
};
