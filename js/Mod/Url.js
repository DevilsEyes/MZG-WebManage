define(["mmRouter",
        "jQjsonp",
        "Layer",
        "../Page/MainPage",
        "js/Page/Home",
        "js/Page/Login",
        "js/Page/Setting",
        "js/Page/Commodity",
        "js/Page/Works",
        "js/Page/Wechat",
    ],
    function () {

        function Page_ERROR() {
            console.log("Get Url Error!:\n  "+ location.hash);
            location.hash = "#!/Check?page=Setting";
        }

        function LoginCheck() {
            console.log(location.hash);
            var Page = this.query.page;
            var Query = location.hash.substr(15 + (Page.length));
            var Hash = "#!/" + Page;
            if (Query.length > 0) {
                Hash += "?" + Query;
            }
            $.jsonp({
                url: JSONP_PATH + "User/login?_method=GET",
                callbackParameter: "callback",
                success: function (obj) {
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
                            avater: obj.data.userInfo.avatar,
                            phone: obj.data.userInfo.phonenum,
                            sector: us,
                            wxNum: obj.data.userInfo.wxNum,
                            nickname: obj.data.userInfo.nickname,
                            intro: obj.data.userInfo.faith,
                            storeId: obj.data.userInfo.userId,
                            role: obj.data.userInfo.role
                        }

                        GLOBAL.isLogin = true;
                        location.hash = Hash;
                    }
                    else {
                        location.hash = "#!/Login";
                    }

                },
                error: function () {
                    layer.msg("您的网络好像不太给力哦", {time: 1000});
                    window.hash = "#!/Login";
                }
            })
        }

        function Refresh() {
            var Page = this.query.page;
            var Query = location.hash.substr(17 + (Page.length));
            var Hash = "#!/" + Page;
            if (Query.length > 0) {
                Hash += "?" + Query;
            }
            console.log(Hash);
            location.hash = Hash;
        }

        avalon.router.error(Page_ERROR);
        avalon.router.get("/Check", LoginCheck);
        avalon.router.get("/Refresh", Refresh);
        avalon.history.start({
            basepath: "/avalon"
        });
        avalon.scan(document.body);

    }
)
