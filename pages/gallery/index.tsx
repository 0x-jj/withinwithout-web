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

export default function AllTokens(props: GalleryProps) {
  const { tokenIds } = props;
  return (
    <>
      <NextSeo
        title="Within/Without | Gallery"
        description="Within/Without by Aaron Penne and FingerprintsDAO."
      />
      <Container>
        <br />
        <Gallery tokenIds={tokenIds} rinkeby={false} />
      </Container>
    </>
  );
}

interface GalleryProps {
  status?: string;
  tokenIds: string[];
  error?: any;
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
      },
    };
  } catch (e) {
    return {
      props: {
        status: "error",
        error: "notoken",
        tokenIds: [],
      },
    };
  }
};
