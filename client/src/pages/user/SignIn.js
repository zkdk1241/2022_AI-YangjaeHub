import { useEffect, useState } from "react";
import axios from "axios";
import server from "./../../config/server.json";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

let SignIn = () => {

    //페이지를 이동하기 위해 router에서 제공하는 함수
    const navigate = useNavigate();

    //로그인 정보를 저장하기 위해서 react-cookie라이브러리 사용
    //token이라는 이름에 쿠키로 저장
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    //로그인 정보를 담는 부분
    const [signInData, setSignInData] = useState({
        email: "",
        password: ""
    });

    //email과 password에 input의 name값에 맞춰 value를 넣어주는 함수
    let changeSignInData = (e) => {
        // e => element  요소 그자체를 가져온거, 요소는 input 
        setSignInData({
            ...signInData,
            [e.target.name]: e.target.value
        });
    }

    //로그인 버튼을 클릭했을때? (로그인 1번)
    let clickLoginBtn = async () => {
        if (signInData.email === "") {
            alert("이메일을 입력해주세요.");
            return;
        }
        if (signInData.password === "") {
            alert("비밀번호를 입력해주세요.");
            return;
        }

        //axios를 사용해서 http://localhost:8080/user/login에 요청을 하는 부분
        //server.url은 혹시나 서버 주소가 변경될 경우 한번에 변경하기 위해서 작성.
        return await
            axios.post(server.url + "/user/login", signInData);
    }

    //로그인이 제대로 진행되지 않았을 경우, 에러 메시지를 보여주는 부분
    const [errorMsg, setErrorMsg] = useState("");

    return (
        <>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">이메일</label>
                    <input type="email" value={signInData.email} onChange={changeSignInData} className="form-control" name={"email"} id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">비밀번호</label>
                    <input type="password" value={signInData.password} onChange={changeSignInData} className="form-control" name="password" id="password" />
                </div>
                <div className="mb-3">
                    <p className="text-danger">{errorMsg}</p>
                </div>
                <button type="button" onClick={() => {
                    //실질적으로 로그인 버튼을 클릭 했을때 작동
                    clickLoginBtn().then(res => {
                        //로그인에대한 응답 처리 (로그인 3번)
                        console.log(res);
                        if (res.data.status) {
                            //로그인 성공
                            //응답받은 데이터를 브라우저의 *쿠키*에다가 저장 (url => / 전역에다가 저장)
                            setCookie("token", res.data, { path: "/" });
                            // 쿠키에 저장한 뒤 일기장 리스트 페이지로 이동
                            navigate('/daily/list');
                        } else {
                            //로그인 실패
                            //만약 로그인에 실패했을경우, 실패한 이유를 출력
                            setErrorMsg(res.data.message);
                        }

                    }).catch(err => {
                        console.log(err);
                    })
                }}
                    className="btn btn-primary">로그인</button>
            </form>
        </>
    )
}

export default SignIn;