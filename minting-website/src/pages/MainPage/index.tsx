import "./mainpage.scss";
import Button from '../../components/Button';
// import CS from "../../assets/images/codestates.jpg";
// import Bithumb from "../../assets/images/bithumb-lg.png";

const MainPage = () => {
    const handleClick = () => {

    }
    return(
        <div className="root-container">
            <div className="main-expl-body">
                <div>
                    빗썸 아카데미 3기 NFT를 민팅하여
                </div>
                <div>
                    트위터 아이디와 지갑 주소를 연결하고
                </div>
                <div>
                    크롬 익스텐션을 통해 BTA 과정 수료 뱃지를 확인해보세요!
                </div>
            </div>
            
            <div className="btn-box">
                <Button onClick={handleClick} className="main-btn mint-btn">
                    <div className="main-btn-txt">Mint BTA NFT</div>
                </Button>
                <Button onClick={handleClick} className="main-btn extension-btn btn-white">
                    <div className="main-btn-txt">Download Extension</div>
                </Button>
            </div>
        </div>
    )
}


export default MainPage;