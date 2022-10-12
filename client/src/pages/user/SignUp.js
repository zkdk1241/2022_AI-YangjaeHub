import { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import server from "./../../config/server.json";

let SignUp = () => {

    //회원가입 폼의 input 데이터들을 담아주는 부분
    // react가 데이터를 인식 하게 하기위해서.
    const [signUpData, setSignUpData] = useState({
        email: "",
        password: "",
        rePassword: "",
        name: ""
    });

    const [errorMsg, setErrorMsg] = useState("");

    // input에 데이터를 입력할때마다 singUpData가 변경되는걸 콘솔로 찍어서 보기위해
    useEffect(() => {
        console.log(signUpData);
    }, [signUpData]);

    //input의 값을 입력 했을 경우 signUpData의 값을 넣어줌.
    let changeSignUpData = (e) => {
        // console.log(e.target.name);
        //e.target.name  => input의 name속성의 값
        setSignUpData({
            ...signUpData,
            [e.target.name]: e.target.value
        })
    }

    // 회원가입 1번
    // 회원가입 버튼을 클릭 했을때, 유효성 검사 후,
    // axios를 사용해서 서버에 요청!
    let clickSignUpBtn = async () => {
        if (signUpData.email === "") {
            alert("이메일을 입력해주세요.");
            return;
        }

        if (signUpData.password === "") {
            alert("비밀번호를 입력해주세요.");
            return;
        }

        if (signUpData.rePassword === "") {
            alert("비밀번호 확인을 입력해주세요.")
            return;
        }

        if (signUpData.name === "") {
            alert("이름을 입력해주세요.");
            return;
        }

        if (signUpData.password !== signUpData.rePassword) {
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return;
        }

        //실질적인 axios요청,
        // 요청한 응답을 리턴해줌
        return await
            axios.post(server.url + '/user/signUp', signUpData);

    }

    return (
        <>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">이메일</label>
                    <input type="email" value={signUpData.email} onChange={changeSignUpData} className="form-control" name={"email"} id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">비밀번호</label>
                    <input type="password" value={signUpData.password} onChange={changeSignUpData} className="form-control" name="password" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="rePassword" className="form-label">비밀번호 확인</label>
                    <input type="password" value={signUpData.rePassword} onChange={changeSignUpData} className="form-control" name="rePassword" id="rePassword" />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">이름</label>
                    <input type="text" value={signUpData.name} onChange={changeSignUpData} className="form-control" name="name" id="name" />
                </div>
                <div className="mb-3">
                    <p className="text-danger">{errorMsg}</p>
                </div>
                <button type="button"
                    onClick={() => {
                        clickSignUpBtn().then((res) => {
                            //회원가입 3번
                            //서버에서 응답 받은 부분
                            console.log(res);
                            if (res.data.status) {
                                alert(res.data.message);
                                window.location.reload();
                            } else {
                                //에러 메시지를 보여주고
                                setErrorMsg(res.data.message);
                                //input의 모든 데이터를 없앰
                                setSignUpData({
                                    email: "",
                                    password: "",
                                    rePassword: "",
                                    name: ""
                                })
                                //email input에 포커스
                                $("#email").focus();
                            }
                        }).catch(e => {
                            console.log(e);
                        })
                    }}
                    className="btn btn-primary">회원가입</button>
            </form>
        </>
    )
}

export default SignUp;