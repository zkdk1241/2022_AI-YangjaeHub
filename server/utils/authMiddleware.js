const jwt = require("jsonwebtoken");
const jwtConfig = require("./../config/jwtConfig");

module.exports = async (req, res, next) => {
    //클라이언트에서 요청을 할때 req.header에 jwt token 같이 담아서 보냅니다.
    // 그걸 확인하는 곳.
    console.log(req.header("accessToken"));
    const accessToken = req.header("accessToken");

    //토큰이 존재하는지 확인을 먼저함.
    if (accessToken === undefined) {
        res.json({
            status: false,
            message: "로그인 되지 않은 사용자입니다."
        });
        return;
    } else {
        try {

            const tokenInfo = await new Promise((resolve, reject) => {
                jwt.verify(accessToken, jwtConfig.secret, (err, decode) => {
                    if (err) {
                        //인증 실패 시
                        reject(err);
                    } else {
                        //인증 성공 시
                        resolve(decode);
                    }
                })
            });

            req.tokenInfo = tokenInfo;
            next();

        } catch (e) {
            res.status(403).json({
                status: false,
                message: "허용되지 않은 사용자"
            });
        }
    }
}