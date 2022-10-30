import { AptosClient } from 'aptos';

// find profile btn 
const modifyProfilePage = () => {
    const PROFILE_INTERVAL = 1000; //ms
    let count = 0;

    let detectProfileWithInterval = setInterval(() => {
        const userNameBox = document.querySelector('[data-testid="UserName"]');
        if (userNameBox) {
            appendTagTo(userNameBox);
            clearInterval(detectProfileWithInterval)
        } else {
            count++;
            if (count >= 5) {
                clearInterval(detectProfileWithInterval)
            }
        }
    }, PROFILE_INTERVAL)
}

const appendTagTo = async (targetNode) => {
    targetNode.setAttribute('id', 'id-tag-appended');
    const targetId = targetNode.getAttribute('id');
    if (targetId === null) {
        targetNode.setAttribute('id', 'id-tag-appended');
        const userId = targetNode.innerText.split('@')[1].split('\n')[0];
        const hasNFT = await hasToken(userId);
        if (hasNFT) {
            const tagEl = createTagEl(hasNFT);
            targetNode.appendChild(tagEl);
        }
    } else if (targetId === 'id-tag-appended') {
        const textDiv = targetNode.querySelector('div.id-tag-text-box');
        const userId = targetNode.innerText.split('@')[1].split('\n')[0];
        const hasNFT = await hasToken(userId);
        if (!hasNFT) return;
        if (textDiv === undefined || textDiv === null) {
            const tagEl = createTagEl(hasNFT);
            targetNode.appendChild(tagEl);
        }
    }
}

const createTagEl = (hasNFT) => {
    const rootDiv = document.createElement('div');
    const imgDiv = document.createElement('div');
    const linkEl = document.createElement('a');
    const imgEl = document.createElement('img');
    const textDiv = document.createElement('div');
    const src = 'https://d22p4hblaqdu3x.cloudfront.net/BTA-03-TAG/bithumb-32.png';
    const href = 'https://github.com/codestates/BTAdAppProject-03';

    rootDiv.setAttribute('class', 'bta-03-tag-container');
    rootDiv.setAttribute('aria-label', 'BTA-03-Tag');
    linkEl.setAttribute('href', href);
    linkEl.setAttribute('target', '_blank');
    imgEl.setAttribute('class', 'id-tag id-tag-img');
    imgEl.setAttribute('src', src);
    imgDiv.setAttribute('class', 'id-tag-img-container id-tag-flex-box hint--top hint--rounded')
    imgDiv.setAttribute('aria-label', 'BTA-03');
    textDiv.setAttribute('class', 'id-tag-flex-box id-tag-text-box');
    textDiv.innerText = hasNFT ? "BTA-03" : "I do not have BTA_03_Badge...";

    linkEl.appendChild(imgEl);
    imgDiv.appendChild(linkEl);
    rootDiv.appendChild(imgDiv);
    rootDiv.appendChild(textDiv);
    return rootDiv;
}

const pauseControlProfilePage = () => {
    const userNameBox = document.querySelector('[data-testid="UserName"]');
    if (userNameBox) {
        userNameBox.removeAttribute('id');
        const tagContainer = userNameBox.querySelector('div.bta-03-tag-container');
        if (tagContainer) tagContainer.remove();
    }
}

const resetProfilePage = () => {
    const userNameBox = document.querySelector('[data-testid="UserName"]');
    if (userNameBox) appendTagTo(userNameBox);
}

const COLLECTION_NAME = "BTA_03_Badge";
const CREATOR_ADDR = "0x10656bc042639da94238e21f0ba00779d103ee7150a316f1c82b3319b1db6824";
const TESTNET_NODE_URL = 'https://fullnode.testnet.aptoslabs.com';


const hasToken = async (twitterId) => {
    const client = new AptosClient(TESTNET_NODE_URL);
    const collection = await client.getAccountResource(
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

    const getTokenTableItemRequest = {
        key_type: "0x3::token::TokenDataId",
        value_type: "0x3::token::TokenData",
        key: tokenDataId,
    };

    try {
        const result = await client.getTableItem(handle, getTokenTableItemRequest);
        if (result) return true;
    } catch (e) {
        console.log(e);
        return false;
    }
    return false;
}


export { modifyProfilePage, pauseControlProfilePage, resetProfilePage };