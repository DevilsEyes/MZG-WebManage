define(["mmRouter"], function () {
    var limit = GLOBAL.LIST_LIMIT;
    function Works_init() {
        if(this.query.p  == undefined){
            location.hash = "#!/Check?page=Works&p=1";
            return;
        }

        var p = this.query.p;

        VM_MainPage.isLoading = true;
        if (GLOBAL.isLogin == true) {
            VM_SubPage.init("Works");
            VM_SubPage.SubUrl = "HTML/Works.html";
            VM_SubPage.SubCss = "css/Page_Works.css?1";

            $.jsonp({
                url: JSONP_PATH + "Product/list/",
                data: {
                    "storeId": USER.storeId,
                    "latestIndex": (p-1) * limit,
                    "limit": limit,
                    "count": true,
                },
                callbackParameter: "callback",

                success: function (obj) {
                    obj = $.parseJSON(obj);
                    console.dir(obj);
                }
            })




            avalon.scan(document.body);

            VM_MainPage.isLoading = false;
        }
        else {
            location.hash = "#!/Check?page=Works&p=" + p;
        }


    };

    VM_Works = avalon.define({
        $id: "Works",
        List:[],
        Check:[],
        _$Check:false,

    })

    avalon.router.get("/Works", Works_init);
})