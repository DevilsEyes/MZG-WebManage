define(["Anime", "Layer"], function () {

    function Side_Switch(page) {

        var u = VM_SubPage.sidebar;

        if (page != u)$("#BTN_SideBar_" + u + " img").attr("src", "imgs/Dark_" + u + ".png");
        $("#BTN_SideBar_" + page + " img").attr("src", "imgs/Light_" + page + ".png");

        VM_SubPage.sidebar = page;

        $(".SideBar_Tag_Selected").addClass("SideBar_Tag");
        $(".SideBar_Tag_Selected").removeClass("SideBar_Tag_Selected");

        $("#BTN_SideBar_" + page).removeClass("SideBar_Tag");
        $("#BTN_SideBar_" + page).addClass("SideBar_Tag_Selected");
    }

    VM_SubPage = avalon.define({
        $id: "SubPage",
        SubUrl: "",
        SubCss: "",
        avatar: "",
        nickname: "",

        sidebar: "",

        SideBarClick: function (p) {
            VM_SubPage.Side_Switch(p);
            location.hash = "#!/" + p;
        },

        Side_Switch: Side_Switch,

        PageLoaded: function () {
            GLOBAL.Anime_PageLoad();
            VM_SubPage.Side_Switch(VM_SubPage.sidebar);
        },

        LogOut: function () {
            VM_MainPage.isLoading = true;
            $.jsonp({
                url: JSONP_PATH + "User/logout?_method=POST",
                callbackParameter: "callback",
                success: function (obj) {
                    obj = $.parseJSON(obj);
                    if (obj.code === 0) {
                        layer.msg("注销成功", {time: 1000});
                        location.hash = "#!Login";
                    }
                }
            })
        },

        init: function (target) {
            VM_MainPage.MainUrl = "HTML/Home.html";
            VM_MainPage.MainCss = "css/Home.css?aih";

            VM_SubPage.avatar = USER.avater;
            VM_SubPage.nickname = USER.nickname;
            VM_SubPage.sidebar = target;

            avalon.scan(document.body);
        }

    });


})
