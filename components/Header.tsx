import chainInfo from "@/config/chainInfo.json";
import { Modal, Space } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import MetaMaskCard from "./network/MetaMaskCard";
import {
  usePriorityAccount,
  usePriorityENSName,
  usePriorityProvider,
  usePriorityWeb3React,
} from "./network/priorityHooks";
import WalletConnectCard from "./network/WalletConnectCard";

function shortenAddress(address: string, chars = 4) {
  return `${address.substring(0, chars + 2)}...${address.substring(
    42 - chars
  )}`;
}

const Header: React.FC = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const walletAddress = usePriorityAccount() ?? "";
  const provider = usePriorityProvider(chainInfo.chainId);

  const ensName = usePriorityENSName(provider);
  const { active, library, chainId } = usePriorityWeb3React(provider);
  useEffect(() => {
    if (walletAddress.length > 0) {
      if (chainId != chainInfo.chainId) {
        provider?.send("wallet_switchEthereumChain", [
          {
            chainId: chainInfo.chainId == 1 ? "0x1" : "0x4",
          },
        ]);
      }
      setIsModalVisible(false);
    }
  }, [walletAddress]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div
      className="header"
      style={{ backgroundColor: "white", marginLeft: "24px" }}
    >
      <Space size={45}>
        <Link href={"/"}>
          <a>Home</a>
        </Link>
        <div>
          <span>
            <Link href={"/gallery"}>
              <a>Gallery</a>
            </Link>
          </span>
        </div>
        {/* <div>
          <span>
            <Link href={"/rinkeby"}>
              <a>Testnet Outputs</a>
            </Link>
          </span>
        </div> */}
        <div
          id="connectButton"
          onClick={walletAddress.length > 0 ? undefined : showModal}
        >
          <span>
            {walletAddress.length > 0 ? (
              <Link href={"/user/" + walletAddress}>
                <a>
                  {!ensName ? shortenAddress(String(walletAddress)) : ensName}
                </a>
              </Link>
            ) : (
              "Connect"
            )}
          </span>
        </div>
      </Space>
      <Modal
        centered
        closeIcon={<></>}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <MetaMaskCard />
        <br />
        <WalletConnectCard />
      </Modal>
    </div>
  );
};

export default Header;
