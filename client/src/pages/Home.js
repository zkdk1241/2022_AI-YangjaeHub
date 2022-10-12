import SignUp from "./user/SignUp";
import SignIn from "./user/SignIn";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

let Home = () => {

    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    // 로그인 폼이나 회원가입 폼을 버튼 누름에 따라 보여주는 부분
    const [status, setStatus] = useState({
        login: false,
        signUp: false
    });

    const navigate = useNavigate();

    //처음 렌더링이 되었을 경우, 쿠키의 값을 확인,
    // 만약 쿠키가 비워져있지 않다면 (즉, 로그인 되어있는 상태)
    // 일기장 리스트 페이지로 이동시킴
    useEffect(() => {
        console.log(cookies);
        if (cookies.token !== undefined) {
            navigate("/daily/list");
        }
    }, []);

    return (
        <main>
            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Album example</h1>
                        <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
                        <p>
                            <button onClick={() => {
                                setStatus({
                                    login: true,
                                    signUp: false
                                })
                            }}
                                className="btn btn-primary my-2 m-1">로그인</button>
                            <button onClick={() => {
                                setStatus({
                                    login: false,
                                    signUp: true
                                })
                            }} className="btn btn-secondary my-2 m-1">회원가입</button>
                        </p>
                    </div>
                </div>
            </section>
            <div className={"container"}>
                {
                    status.signUp === true ? (<SignUp />) : (<></>)
                }
                {
                    status.login === true ? (<SignIn />) : (<></>)
                }
            </div>
        </main>
    )
}

export default Home;
