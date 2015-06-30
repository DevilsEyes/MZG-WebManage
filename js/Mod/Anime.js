define(function () {

    GLOBAL.Anime_PageLoad = function() {
        $(".Nav_Content").stop();
        $(".Nav_BTN").stop();
        $(".Main").stop();

        $(".Nav_Content").css({marginLeft: '40px', opacity: '0'});
        $(".Nav_BTN").css({right: '30px', opacity: '0'});
        $(".Main").css({opacity: '0'});

        AnimateFlow(
            [
                [".Nav_Content", {marginLeft: '+=20px', opacity: '1'}, 200],
                [".Nav_BTN", {right: '+=20px', opacity: '1'}, 100],
                [".Main", {opacity: '1'}, 200]
            ]
        );
    }

    function AnimateFlow(animates, next) {
        var flow = function (animates) {
            if (animates.length > 0) {
                item = animates.shift();
                if (typeof(item[0]) == 'string' && typeof(item[1]) == 'object' && typeof(item[2]) == 'number') {
                    if ($(item[0]).length > 0) {
                        $(item[0]).animate(item[1], item[2], function () {
                            flow(animates);
                        });
                    } else flow(animates);
                }
            } else if (typeof(next) == 'function')next();
        };
        flow(animates);
    }
})

