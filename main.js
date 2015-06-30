require.config({
	paths: {
		jquery: "include/jQuery/jquery-1.9.1.min",
		avalon: "include/avalon/avalon.modern",
		
		jQjsonp:"include/jQuery/jquery.jsonp-2.4.0.min",
		jQmd5:"include/jQuery/jquery.md5",
		
		iScroll:"include/iScroll/iscroll",
		
		Layer:"include/Layer/layer",
		
		Plupload:"include/Plupload/plupload.full.min",
		Qiniu:"include/Qiniu/qiniu",

		text:"include/require/text",
		css:"include/require/css",
		
		Test:"js/Test/main",

		mmRouter:"include/avalon/mmRouter",
		mmHistory:"include/avalon/mmHistory",

		Url:"js/Mod/Url",
		Anime:"js/Mod/Anime"
	},

	priority:["text","css"],

	shim: {
		jquery: {exports: "jQuery"},
		avalon: {exports: "avalon"},
		
		jQjsonp:["jquery"],
		jQmd5:["jquery"],
		
		iScroll:["jquery"],
		
		Plupload:["jquery"],
		Qiniu:["jquery","Plupload"]
		
	}
})
require(["jquery", "avalon"], function($, avalon) {

    //JSONP_PATH = "http://123.57.42.13/V1.0.0/";
    //JSONP_PATH = "http://192.168.2.3/V1.0.0/";
    JSONP_PATH = "http://api.meizhanggui.cc/V1.0.0/";

    GLOBAL = {
        nowPage: "",
        isLogin: false,
		LIST_LIMIT:5
    }

    USER = {
        avater: "",
        phone: "",
        sector: "",
        wxNum: "",
        nickname: "",
        intro: "",
        storeId: "",
        role: 0
    };
	require(["Url"]);
	//require(["Test"]);

})