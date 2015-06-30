define(["mmRouter", "Layer"], function () {

    function Func_Save(){

        VM_MainPage.isLoading = true;

        $.jsonp({
            url: JSONP_PATH + "User/userInfo?_method=POST",
            data:
            {
                "faith" : VM_Setting.intro,
                "wxNum": VM_Setting.wxNum ,
            },

            callbackParameter:"callback",
            success: function(obj){
                obj = $.parseJSON(obj);
                if( obj.code == 0 ) {
                    layer.msg("修改成功", {time: 1000});
                    Setting_init();
                }
                else if(obj.code==7001||obj.code==7002) {
                    layer.msg("您的登录状态过期了哦");
                    location.hash = "#!/Login"
                }else {
                    layer.msg("ERROR:" + obj.code + "," + obj.msg);
                    VM_MainPage.isLoading = false;
                }

            },

            error: function(d,msg){
                layer.msg("你的网络状况好像有点差哦~", {time: 1000});
                VM_MainPage.isLoading = false;
            }
        });
    }



    function Setting_init() {
        VM_MainPage.isLoading = true;
        if (GLOBAL.isLogin==true) {
            VM_SubPage.init("Setting");
            VM_SubPage.SubUrl = "HTML/Setting.html";
            VM_SubPage.SubCss = "css/Page_Setting.css";

            VM_Setting.nickname = USER.nickname;
            VM_Setting.sector = USER.sector;
            VM_Setting.phone = USER.phone;
            VM_Setting.wxNum = USER.wxNum;
            VM_Setting.intro = USER.intro;

            avalon.scan(document.body);

            VM_MainPage.isLoading=false;
        }
        else {
            location.hash = "#!/Check?page=Setting"
        }
    }

    VM_Setting = avalon.define({
        $id: "Setting",
        nickname: "",
        sector: "",
        phone:"",
        wxNum:"",
        intro:"",
        Save:Func_Save
    })

    avalon.router.get("/Setting", Setting_init);

})