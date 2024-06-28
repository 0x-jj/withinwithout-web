import chainInfo from "@/config/chainInfo.json";
import { getErrorMessage } from "@/lib/errors";
import { getMerkleProof } from "@/lib/merkletree";
import styles from "@/styles/Home.module.css";
import { notification } from "antd";
import ABI from "config/apxfpAbi.json";
import { ethers } from "ethers";
import {
  usePriorityProvider,
  usePriorityWeb3React,
} from "./network/priorityHooks";

const toWei = ethers.utils.parseEther;

const MINT_PRICE = toWei("0.75");
const SUCCESS_MESSAGE = "success";
const THANKS_MESSAGE = "ty";

function NotifMessage({ address, type }) {
  if (type === THANKS_MESSAGE) {
    return <span>Transaction received, waiting for confirmation...</span>;
  } else {
    return (
      <span>
        Please wait a few minutes for us to render your new piece, which you'll
        be able to view{" "}
        <a href={`/user/${address}`}>
          <u>at this link</u>
        </a>
        .
      </span>
    );
  }
}

const openNotification = (title: string, type: string, address: string) => {
  notification.success({
    message: title,
    description: <NotifMessage address={address} type={type} />,
    duration: 5,
  });
};

const Mint: React.FC<{ saleStarted: boolean; minted: string }> = (props) => {
  const provider = usePriorityProvider(chainInfo.chainId);
  const { account } = usePriorityWeb3React(provider);
  const signer = provider?.getSigner(account);

  const contract = new ethers.Contract(chainInfo.contractAddress, ABI, signer);

  const handleMint = async (e: any, count: number) => {
    try {
      if (props.saleStarted) {
        const tx = await contract.purchase(count, {
          value: MINT_PRICE.mul(count),
        });
        openNotification("Received", THANKS_MESSAGE, account);
        await tx.wait(1);
        openNotification("Congratulations!", SUCCESS_MESSAGE, account);
      } else {
        const proof = getMerkleProof(account as string, count);
        const tx = await contract.purchasePresale(count, proof, {
          value: MINT_PRICE.mul(count),
        });
        openNotification("Received", THANKS_MESSAGE, account);
        await tx.wait(1);
        openNotification("Congratulations!", SUCCESS_MESSAGE, account);
      }
    } catch (e) {
      notification.error({
        duration: 15,
        message: getErrorMessage(e),
      });
      console.log(e);
    }
  };
  const handleMintReserved = async () => {
    try {
      const tx = await contract.mintReserved(1);
      openNotification("Received", THANKS_MESSAGE, account);
      await tx.wait(1);
      openNotification("Congratulations!", SUCCESS_MESSAGE, account);
    } catch (e) {
      notification.error({
        duration: 15,
        message: getErrorMessage(e),
      });
      console.log(e);
    }
  };
  return (
    <>
      <h4 style={{ color: "white" }}>
        <b>Price:</b> 0.75 ETH
      </h4>
      <h4 style={{ color: "white" }}>
        <b>Total Minted:</b> {props.minted}/750
      </h4>
      <br />
      <sub>
        *For the presale, if you hold one of the{" "}
        <a
          href={
            "https://twitter.com/FingerprintsDAO/status/1508564622298689537"
          }
          style={{ color: "white" }}
          target="_blank"
          rel="noreferrer"
        >
          <u>eligible projects</u>
        </a>
        , you can mint 1 token. If you hold more than one, you can mint 2
        tokens. Use{" "}
        <a
          style={{ color: "white" }}
          href={"/allowlist"}
          target="_blank"
          rel="noreferrer"
        >
          <u>this link</u>
        </a>{" "}
        to check. In the public sale, anyone can mint a max of 2 per
        transaction.{" "}
      </sub>
      <br />
      <br />
      <div style={{ display: "flex" }}>
        <span
          className={styles.button56}
          onClick={(e) => handleMint(e, 1)}
          style={{ width: "50%", marginRight: "8px" }}
        >
          <span>Mint 1 token {props.saleStarted ? "" : "(Presale)"}</span>
        </span>
        <span
          className={styles.button56}
          onClick={(e) => handleMint(e, 2)}
          style={{ width: "50%", marginLeft: "8px" }}
        >
          <span>Mint 2 tokens {props.saleStarted ? "" : "(Presale)"}</span>
        </span>
      </div>
      <br />
      {account &&
        [
          "0xf2bFd6b0e03B7F617f4fF3EBd32e3eBE5a912236",
          "0x3Fe227F41A54DC54972e7359D4fC55020bB8AB50",
          "0x7F49eaDE2a6Ac67eBdcDB8d341Ff64A577298cc1",
          "0x70b0e741C5Fe7694b65b73799353f36Da2Ef9A55",
        ].includes(account) && (
          <>
            <span className={styles.button56} onClick={handleMintReserved}>
              <span>Mint a Reserved</span>
            </span>
            <br />
          </>
        )}

      <a
        href={"https://opensea.io/collection/withinwithout"}
        target="_blank"
        rel="noreferrer"
      >
        <span className={styles.button56}>
          <span>View collection on OpenSea</span>
        </span>
      </a>
    </>
  );
};

export default Mint;
