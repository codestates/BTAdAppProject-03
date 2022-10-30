import "./mainpage.scss";
import Button from '../../components/Button';
import {Modal, openModal} from '../../components/Modal';

const MainPage = () => {
    const handleClickMintBtn = () => {
        openModal();
    }
    const handleClickDownloadBtn = () => {
        window.open("https://github.com/codestates/BTAdAppProject-03", "_blank");
    }
    return(
        <div className="root-container">
            <div className="main-expl-body">
                <div>
                    빗썸 테크 아카데미 3기 NFT를 민팅하여
                </div>
                <div>
                    트위터 아이디와 지갑 주소를 연결하고
                </div>
                <br/>
                <div>
                    크롬 익스텐션을 설치하고 트위터 프로필 페이지에서
                </div>
                <div>
                    BTA-03 과정 수료 뱃지를 확인해보세요!!!
                </div>
            </div>
            <div className="btn-box">
                <Button onClick={handleClickMintBtn} className="main-btn mint-btn">
                    <div className="main-btn-txt">Mint BTA03 NFT</div>
                </Button>
                <Button onClick={handleClickDownloadBtn} className="main-btn extension-btn btn-white">
                    <div className="main-btn-txt">Download Extension</div>
                </Button>
            </div>
            <Modal />
        </div>
    )
}


export default MainPage;