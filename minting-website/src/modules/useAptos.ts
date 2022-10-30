import { Types, AptosClient, AptosAccount, TokenClient, HexString } from 'aptos';

const TESTNET_NODE_URL = 'https://fullnode.testnet.aptoslabs.com';
const COLLECTION_NAME = "BTA_03_Badge";
const TOKEN_DECRIPTION = "빗썸 테크 아카데미 3기 수료 뱃지 NFT입니다. 토큰 이름은 자신이 민팅시 제출했던 트위터 아이디와 같습니다.";
const TOKEN_URI = "https://d22p4hblaqdu3x.cloudfront.net/BTA-03-TAG/bithumb.png";
const CREATOR_ADDR = "0x10656bc042639da94238e21f0ba00779d103ee7150a316f1c82b3319b1db6824";

export const hasToken = async (twitterId:string): Promise<boolean> => {
    const client = new AptosClient(TESTNET_NODE_URL);
    const collection: { type: Types.MoveStructTag; data: any } = await client.getAccountResource(
      CREATOR_ADDR,
      "0x3::token::Collections",
    );
    const { handle } = collection.data.token_data;
    const tokenName = twitterId;
    const tokenDataId = {
      creator: CREATOR_ADDR,
      collection: COLLECTION_NAME,
      name: tokenName,
    };

    const getTokenTableItemRequest: Types.TableItemRequest = {
      key_type: "0x3::token::TokenDataId",
      value_type: "0x3::token::TokenData",
      key: tokenDataId,
    };

    try {
        const result = await client.getTableItem(handle, getTokenTableItemRequest);
        if (result) return true;
    } catch(e) {
        console.log(e);
        return false;
    }
    return false;
}

const getCreatorAccount = (): AptosAccount => {
    const privateKey = "REACT_APP_CREATOR_PRIVATE_KEY";
    const hexString = new HexString(privateKey);
    return new AptosAccount(hexString.toUint8Array());
}

export const mintToken = async (toAddr: string, twitterId: string) => {
    const client = new AptosClient(TESTNET_NODE_URL);
    const tokenClient = new TokenClient(client);
    const creatorAccount = getCreatorAccount();
    const tokenName = twitterId;
    const supply = 1;
    const createTxHash = await tokenClient.createToken(
        creatorAccount, 
        COLLECTION_NAME, 
        tokenName, 
        TOKEN_DECRIPTION, 
        supply, 
        TOKEN_URI, 
        );
        alert("토큰이 생성되었음. tx hash: " + createTxHash);
    const createTxResult = await client.waitForTransactionWithResult(createTxHash);
    console.log(createTxResult);
    
    const offerTxHash = await tokenClient.offerToken(
        creatorAccount,
        toAddr,
        creatorAccount.address().toString(),
        COLLECTION_NAME,
        tokenName,
        1,
        0
    )
    const offerTxResult = await client.waitForTransactionWithResult(offerTxHash);
    console.log(offerTxResult);
    alert("토큰 생성자로부터 offer가 들어왔습니다. 클레임 준비해주세요. tx hash: " + offerTxHash);

    const claimTx = {
        type: "entry_function_payload",
        function: "0x3::token_transfers::claim_script",
        type_arguments: [],
        arguments: [
          creatorAccount.address().toString(),
          creatorAccount.address().toString(),
          COLLECTION_NAME,
          tokenName,
          0
        ]
      }
    await window.aptos.signAndSubmitTransaction(claimTx);
}