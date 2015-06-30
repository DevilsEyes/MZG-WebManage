define(["Layer"], function () {

    VM_MainPage = avalon.define({
        $id: "MainPage",
        MainUrl: "",
        MainCss: "",
        isLoading: false
    });


    avalon.duplexHooks.limit = {
        get: function (str, data) {
            var limit = parseFloat(data.element.getAttribute("data-duplex-limit"))
            if (str.length > limit) {
                return data.element.value = str.slice(0, limit)
            }
            return str
        }
    }

});