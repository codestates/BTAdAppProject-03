import Button from "../Button";
import { Types, AptosClient, TokenClient, TransactionBuilderABI } from 'aptos';
import { useRecoilState } from 'recoil';
import "./walletBtn.scss";
import { addressState, connectionState } from "../../states/accountState";

const WalletBtn = () => {
    const [isConnected, setIsConnected] = useRecoilState<boolean>(connectionState);
    const [address, setAddress] = useRecoilState<string | null>(addressState);

    const handleClick = async () => {
        if (isConnected) {
            await window.aptos.disconnect();
            setIsConnected(false);
        } else {
            await window.aptos.connect();
            await window.aptos.account().then((data: { address: string }) => setAddress(data.address));
            setIsConnected(true);
        }
    }

    return (
        <Button className="connect-wallet-btn" onClick={handleClick}>
            {!isConnected ? (<div className="font-unbounded">
                Connect Wallet
            </div>) : (<span className="txt-white font-unbounded">
                {address !== null
                    ? `${address.slice(0, 6)} ... ${address.slice(-4)}`
                    : 'Connecting...'}
            </span>)
            }
        </Button>
    )
}

export default WalletBtn;