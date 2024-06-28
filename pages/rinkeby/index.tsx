import Container from "@/components/Container";
import ABI from "config/apxfpAbi.json";
import { ethers } from "ethers";
import type { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import React from "react";

const chainInfo = {
  contractAddress: "0x86bbef8de1287068abb819a56ca89c214b39193c",
  chainId: 4,
};

const Gallery = dynamic(() => import("@/components/Gallery"), {
  ssr: false,
});

export default function AllTokens(props: GalleryProps) {
  const { tokenIds } = props;
  return (
    <Container>
      <br />
      <Gallery tokenIds={tokenIds} rinkeby={true} />
    </Container>
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
    process.env.RINKEBY_ALCHEMY_URL
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
