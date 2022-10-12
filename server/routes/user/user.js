const { Router } = require("express");
const crypto = require("crypto");
const { User } = require("../../models");
const router = Router();
const jwt = require("jsonwebtoken");
const jwtConfig = require("./../../config/jwtConfig");

// http://localhost:8080/user/signUp
// 회원가입 2번
router.post("/signUp", async (req, res, next) => {
    let { email, password, name } = req.body;

    let checkEmail = await User.findOne({ email });

    if (checkEmail) {
        res.json({
            status: false,
            message: "존재하는 이메일 입니다."
        })
        return;
    }

    //비밀번호를 그냥 쓴게아니고 *해쉬로 변경해서* DB에 저장을함
    // 안하면 벌금
    let hashPassword = passwordHash(password);

    //회원 저장
    await User.create({
        email,
        password: hashPassword,
        name
    })

    res.json({
        status: true,
        message: "회원가입이 완료 되었습니다."
    })

});


//http://localhost:8080/user/login
//(로그인 2번)
router.post('/login', async (req, res, next) => {
    // 이메일을 비교해서 존재하는 회원인지 확인
    // 비밀번호가 맞는지 확인
    let { email, password } = req.body;

    //존재하고 있는 회원인지 확인하기 위한 부분
    let checkEmail = await User.findOne({ email });

    //만약 존재하지 않는 회원이라면?
    if (!checkEmail) {
        res.json({
            status: false,
            message: "존재하지 않거나 일치하지 않는 이메일입니다."
        })
        return;
    }

    // DB에 hash형태로 password를 저장하였기 때문에,
    // 요청으로 받아온 password또한 hash형태로 변경
    let hashPassword = passwordHash(password);

    // 만약 DB에 저장되어있는 패스워드와 요청으로 받아온 패스워드가 일치하지 않으면?
    if (hashPassword !== checkEmail.password) {
        res.json({
            status: false,
            message: '비밀번호가 틀렸습니다.'
        })
        return;
    }

    // 정상적으로 로그인을 한 사람이라면?
    jwt.sign({
        email: checkEmail.email, // 이메일과 이름을 jwt로 변경해주기 위해 작성
        name: checkEmail.name
    }, jwtConfig.secret, { //jwtConfig.secret는 암호문자열임
        expiresIn: '1d'     // 기간을 줌 (1d => 하루, 1h => 한시간, 1m => 1분)
    }, (error, token) => {
        if (error) {
            //토큰을 제대로 발행하지 못하고 오류가 났을경우.
            res.status(401)
                .json({ status: false, message: "토큰 발행 실패" });
        } else {
            //정상적으로 토큰을 발행 했을경우,
            res.json({
                status: true,
                accessToken: token, //토큰 값을 브라우저에게 넘겨주는 부분
                email: checkEmail.email,
                name: checkEmail.name
            })
        }
    })

});



const passwordHash = (password) => {
    return crypto.createHash("sha1").update(password).digest("hex");
}

module.exports = router;