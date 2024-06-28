import chainInfo from "@/config/chainInfo.json";
import { Card, Space } from "antd";
import { hooks, metaMask } from "./connectors/metaMask";

const {
  useChainId,
  useAccounts,
  useError,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

const connected = (
  <div
    style={{
      height: "8px",
      width: "8px",
      marginRight: "8px",
      backgroundColor: "rgb(39, 174, 96)",
      borderRadius: "50%",
    }}
  ></div>
);
export default function MetaMaskCard() {
  const isActivating = useIsActivating();
  const isActive = useIsActive();

  return (
    <Card
      bordered={false}
      size={"small"}
      style={{
        background: `url("https://images-cdn.welcomesoftware.com/Zz0zZTliMjQ4MzhlNGExMWViYmJiMjFiZTI2ZWNmN2MzZA==")`,
        fontSize: "18px",
        letterSpacing: "1px",
        cursor: "pointer",
        fontFamily: "EB Garamond, serif",
      }}
      onClick={
        isActivating ? undefined : () => metaMask.activate(chainInfo.chainId)
      }
    >
      <div style={{ margin: "4px 8px 0px 8px" }}>
        <div style={{ float: "left" }}>
          <Space>
            {isActive && connected}
            <h3 style={{ marginTop: "8px" }}> Metamask</h3>
          </Space>
        </div>
        <div style={{ float: "right" }}>
          <img
            src={"https://app.uniswap.org/static/media/metamask.02e3ec27.png"}
            height={"40px"}
          ></img>
        </div>
      </div>
    </Card>
  );
}
