import { Card, Space } from "antd";
import { hooks, walletConnect } from "./connectors/walletConnect";

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

export default function WalletConnectCard() {
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();

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
      onClick={isActivating ? undefined : () => walletConnect.activate()}
    >
      <div style={{ margin: "4px 8px 0px 8px" }}>
        <div style={{ float: "left" }}>
          <Space>
            {isActive && connected}
            <h3 style={{ marginTop: "8px" }}>WalletConnect</h3>
          </Space>
        </div>
        <div style={{ float: "right" }}>
          <img
            src={
              "https://app.uniswap.org/static/media/walletConnectIcon.304e3277.svg"
            }
            height={"35px"}
          ></img>
        </div>
      </div>
    </Card>
  );
}
