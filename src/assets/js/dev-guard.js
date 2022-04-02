(function (window) {
    var o = {};
    var _C_;
    _C_ = function () { window.location.replace("about:blank") };
    var t = "";
    var dd = function (atl) {
        if (isNaN(+atl)) atl = 100;
        var start = +new Date();
        debugger;
        var end = +new Date();
        if (isNaN(start) || isNaN(end) || end - start > atl) {
            (_C_)();
        }
    };
    var se = function () {
        if (window.navigator.webdriver) (_C_)();
    };
    var ua_ = function () {
        var userAgent = navigator.userAgent;
        var isOpera = userAgent.indexOf("Opera") > -1;
        if (isOpera) {
            return "other"
        }
        if (userAgent.indexOf("Firefox") > -1) {
            return "firefox";
        }
        if (userAgent.indexOf("Chrome") > -1) {
            return "chrome";
        }
        if (userAgent.indexOf("Safari") > -1) {
            return "other";
        }
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
            return "other";
        }
        if (userAgent.indexOf("Trident") > -1) {
            return "other";
        }
        return "other";
    };
    var pc = function () {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod", "iPad"];
        var flag = true;
        for (var i = 0; i < Agents.length; i++) {
            if (userAgentInfo.indexOf(Agents[i]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    };
    (function () {
        var publicHandlers = function () {
            dd();
            se();
        }
        const chromeHandler = function () {
            console.log(t);
            console.clear && console.clear();
        };
        const firefoxHandler = function () {
            console.log(t);
            console.clear && console.clear();
        };
        if (isNaN(+o.interval)) o.interval = 500;
        if (pc()) {
            var ua = ua_()
            if (ua == "chrome") {
                t = new Image();
                t.__defineGetter__('id', function () {
                    (_C_)();
                });
                setInterval(function () {
                    if (window.STOP_DEV_GUARD) return;
                    chromeHandler();
                    publicHandlers();
                }, o.interval);
            }
            else if (ua == "firefox") {
                t = /./;
                t.toString = function () {
                    (_C_)();
                }
                setInterval(function () {
                    if (window.STOP_DEV_GUARD) return;
                    firefoxHandler();
                    publicHandlers();
                }, o.interval);
            }
        }
    })()
})(window)