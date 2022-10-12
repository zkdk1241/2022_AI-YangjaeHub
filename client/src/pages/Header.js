import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

let Header = () => {

    //쿠키를 사용하기 위해 작성
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    //로그아웃 버튼을 눌렀을 경우,
    // 쿠키에 존재하는 token이라는 이름의 value를 삭제함.
    let logOutBtn = () => {
        removeCookie("token", { path: "/" });
        //그 후 home페이지로 이동
        navigate("/");
    }

    return (
        <>
            <header>
                <div className="bg-dark collapse" id="navbarHeader">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8 col-md-7 py-4">
                                <h4 className="text-white">About</h4>
                                <p className="text-muted">Add some information about the album below, the author, or any other background context. Make it a few sentences long so folks can pick up some informative tidbits. Then, link them off to some social networking sites or contact information.</p>
                            </div>
                            <div className="col-sm-4 offset-md-1 py-4">
                                <h4 className="text-white">Contact</h4>
                                <ul className="list-unstyled">
                                    <li><a href="#" className="text-white">Follow on Twitter</a></li>
                                    <li><a href="#" className="text-white">Like on Facebook</a></li>
                                    <li><a href="#" className="text-white">Email me</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navbar navbar-dark bg-dark shadow-sm">
                    <div className="container">
                        <a href="#" className="navbar-brand d-flex align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true" className="me-2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                            <strong>Daily</strong>
                        </a>
                        <div style={{
                            width: "23%",
                            display: "flex",
                            justifyContent: "space-between"
                        }}>
                            {
                                //만약 쿠키에 token이 존재하지 않는다면 로그아웃 버튼을 보여주지 않음.
                                cookies.token === undefined ? (<></>) : (
                                    <button className="btn btn-danger" onClick={logOutBtn}>로그아웃</button>
                                )
                            }
                            <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;