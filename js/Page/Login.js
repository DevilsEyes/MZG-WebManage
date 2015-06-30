define(["mmRouter", "jQjsonp", "Layer"],
    function () {

        var Func_keyup = function (event) {
            var key = event.keyCode;
            if (key == 13) {
                Func_login();
            }
        };

        var Func_login = function () {
            if (VM_Login.btn_login === true) {
                return;
            }
            VM_Login.btn_login = true;
            VM_MainPage.isLoading = true;
            $.jsonp({
                url: JSONP_PATH + "User/login?_method=POST",
                data: {
                    "phonenum": VM_Login.ph,
                    "password": VM_Login.pa
                },
                callbackParameter: "callback",

                success: function (obj) {
                    VM_Login.btn_login = false;
                    obj = $.parseJSON(obj);
                    console.dir(obj);
                    if (obj.code == 0) {
                        var us = obj.data.storeInfo.sector;
                        if (us == 10) {
                            us = '美甲';
                        }
                        else if (us == 20) {
                            us = '美发';
                        }
                        else if (us == 30) {
                            us = '纹身';
                        }
                        else if (us == 40) {
                            us = '摄影';
                        }

                        USER = {
                            "avater": obj.data.userInfo.avatar,
                            "phone": obj.data.userInfo.phonenum,
                            "sector": us,
                            "wxNum": obj.data.userInfo.wxNum,
                            "nickname": obj.data.userInfo.nickname,
                            "intro": obj.data.userInfo.faith,
                            "storeId": obj.data.userInfo.userId,
                            "role": obj.data.userInfo.role
                        };

                        GLOBAL.isLogin = true;
                        layer.msg("登录成功", {time: 1000});
                        location.hash = "#!/Setting"

                    }
                    else {
                        layer.msg("ERROR:" + obj.code + "," + obj.msg);
                        VM_MainPage.isLoading = false;
                    }
                },

                error: function (obj) {
                    layer.msg("您的网络好像不太给力哦", {time: 1000});
                    VM_Login.btn_login = false;
                    VM_MainPage.isLoading = false;
                }
            });
        }

        function Login_init() {
            VM_MainPage.isLoading = true;
            VM_MainPage.MainUrl = "HTML/Login.html";
            VM_MainPage.MainCss = "css/Login.css";

            VM_Login.ph = "";
            VM_Login.pa = "";

            VM_MainPage.isLoading = false;
            avalon.scan(document.body);
        }

        VM_Login = avalon.define({
            $id: "Login",
            ph: "",
            pa: "",
            login: Func_login,
            enter: Func_keyup,
            btn_login: false
        });

        avalon.router.get("/Login", Login_init);
    }
)
