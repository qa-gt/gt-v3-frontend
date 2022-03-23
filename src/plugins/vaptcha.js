!(function () {
    "use strict";
    function e(e) {
        return e === undefined || null === e;
    }
    function t(e) {
        return e !== undefined && null !== e;
    }
    function n(e) {
        return null !== e && "object" === (void 0 === e ? "undefined" : h(e));
    }
    function r(e) {
        return (
            "object" === (void 0 === e ? "undefined" : h(e)) &&
            e instanceof HTMLElement
        );
    }
    function a(e) {
        var t = e && e.toString().match(/^\s*function (\w+)/);
        return t ? t[1] : "";
    }
    function o() {
        return (
            new RegExp("MSIE (\\d+\\.\\d+);").test(navigator.userAgent),
            parseFloat(RegExp.$1) || Infinity
        );
    }
    function i(e) {
        var t =
            arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : {};
        for (var n in t) e[n] = t[n];
        return e;
    }
    function c(e) {
        var t = Object.create(null);
        return function (n) {
            return t[n] || (t[n] = e(n));
        };
    }
    function u(e) {
        return v.call(e).slice(8, -1);
    }
    function l(e) {
        throw new Error(e);
    }
    function s() {
        if (navigator.cookieEnabled) {
            localStorage.setItem("vaptchatemp1", "1");
            var e = localStorage.getItem("vaptchatemp1");
            return localStorage.removeItem("vaptchatemp1"), !!e;
        }
        return !1;
    }
    function Promise(e) {
        var t = this;
        (this.state = "pending"),
            (this.value = undefined),
            (this.reason = undefined),
            (this.onResolveAsyncCallbacks = []),
            (this.onRejectAsyncCallbacks = []);
        var n = function (e) {
                "pending" === t.state &&
                    ((t.state = "fulfilled"),
                    (t.value = e),
                    t.onResolveAsyncCallbacks.map(function (e) {
                        return e();
                    }));
            },
            r = function (e) {
                "pending" === t.state &&
                    ((t.state = "rejected"),
                    (t.reason = e),
                    t.onRejectAsyncCallbacks.map(function (t) {
                        return t(e);
                    }));
            };
        try {
            e(n, r);
        } catch (a) {
            r(a);
        }
    }
    function f(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
    }
    function d() {
        var e = navigator.language || navigator.userLanguage;
        return "zh-CN" === e
            ? "zh-CN"
            : "zh-TW" === e
            ? "zh-TW"
            : e.includes("en", -1)
            ? "en"
            : e.includes("ja", -1)
            ? "jp"
            : e.includes("vi", -1)
            ? "vi"
            : "zh-CN";
    }
    (window.HTMLElement = window.HTMLElement || Element),
        Array.prototype.map ||
            (Array.prototype.map = function (e, t) {
                var n, r, a;
                if (null == this)
                    throw new TypeError(" this is null or not defined");
                var o = Object(this),
                    i = o.length >>> 0;
                if ("[object Function]" != Object.prototype.toString.call(e))
                    throw new TypeError(e + " is not a function");
                for (t && (n = t), r = new Array(i), a = 0; a < i; ) {
                    var c, u;
                    a in o &&
                        ((c = o[a]), (u = e.call(n, c, a, o)), (r[a] = u)),
                        a++;
                }
                return r;
            }),
        Array.prototype.includes ||
            (Array.prototype.includes = function (e, t) {
                if (null == this)
                    throw new TypeError('"this" is null or not defined');
                var n = Object(this),
                    r = n.length >>> 0;
                if (0 === r) return !1;
                for (
                    var a = 0 | t,
                        o = Math.max(a >= 0 ? a : r - Math.abs(a), 0);
                    o < r;

                ) {
                    if (n[o] === e) return !0;
                    o++;
                }
                return !1;
            }),
        Array.prototype.findIndex ||
            (Array.prototype.findIndex = function (e) {
                if (null == this)
                    throw new TypeError('"this" is null or not defined');
                var t = Object(this),
                    n = t.length >>> 0;
                if ("function" != typeof e)
                    throw new TypeError("predicate must be a function");
                for (var r = arguments[1], a = 0; a < n; ) {
                    if (e.call(r, t[a], a, t)) return a;
                    a++;
                }
                return -1;
            }),
        Object.create ||
            (Object.create = function (e) {
                var t = function () {};
                return (t.prototype = e), new t();
            });
    var p = {
            vid: null,
            scene: 0,
            container: null,
            mode: "popup",
            style: "dark",
            lang: "auto",
            ai: !0,
            https: !0,
            guide: !0,
            aiAnimation: !1,
            protocol: "https://",
            css_version: "2.2.5",
            cdn_servers: ["statics.vaptcha.com"],
            api_server: "api.vaptcha.com/v3",
            canvas_path: "/canvas.min.js",
            offline_server: "",
        },
        h =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                      return typeof e;
                  }
                : function (e) {
                      return e &&
                          "function" == typeof Symbol &&
                          e.constructor === Symbol &&
                          e !== Symbol.prototype
                          ? "symbol"
                          : typeof e;
                  },
        v = Object.prototype.toString,
        g =
            (c(function (e) {
                for (
                    var t = {},
                        n =
                            (e && -1 !== e.indexOf("?") && e.split("?")[1]) ||
                            window.location.search.substring(1),
                        r = n.split("&"),
                        a = 0;
                    a < r.length;
                    a++
                ) {
                    var o = r[a].split("=");
                    t[decodeURIComponent(o[0])] = decodeURIComponent(o[1]);
                }
                return t;
            }),
            c(function (e) {
                return e.charAt(0).toUpperCase() + e.slice(1);
            })),
        m = function (t) {
            (this.data = t),
                (this.valiudateFuns = []),
                (this.ruleFuns = {
                    required: function (t, n) {
                        return e(t) || 0 === t.length ? n : null;
                    },
                });
        };
    m.prototype = {
        constructor: m,
        addValidateRules: function (e) {
            i(this.ruleFuns, e);
        },
        add: function (e, t, n) {
            var r = this,
                a = t.split(":"),
                o = a.shift(),
                i = this.ruleFuns[o];
            a.unshift(this.data[e]),
                a.push(n),
                i
                    ? this.valiudateFuns.push(function () {
                          return i.apply(r, a);
                      })
                    : console.warn(
                          "Validator warning: rule " + o + " is not defined"
                      );
        },
        validate: function () {
            for (var e, t = 0; (e = this.valiudateFuns[t++]); ) {
                var n = e();
                if (n) return l(n), !1;
            }
            return !0;
        },
    };
    var y = {
        AccessDenied: "0101",
        RefreshAgain: "0102",
        Success: "0103",
        Fail: "0104",
        RefreshTooFast: "0105",
        RefreshTanto: "0106",
        DrawTanto: "0107",
        Attack: "0108",
        jsonpTimeOut: "0703",
        challengeExpire: "1002",
    };
    (Promise.prototype.then = function (e) {
        var t = this;
        if ("fulfilled" === this.state) {
            var r = e(this.value);
            if (n(r) && "Promise" === a(r.constructor)) return r;
        }
        return "pending" === this.state
            ? new Promise(function (r) {
                  t.onResolveAsyncCallbacks.push(function () {
                      var o = e(t.value);
                      if (n(o) && "Promise" === a(o.constructor))
                          return o.then(r);
                      r(o);
                  });
              })
            : this;
    }),
        (Promise.prototype["catch"] = function (e) {
            return (
                "rejected" === this.state && e(this.reason),
                "pending" === this.state && this.onRejectAsyncCallbacks.push(e),
                this
            );
        }),
        (Promise.resolve = function (e) {
            return new Promise(function (t) {
                t(e);
            });
        }),
        (Promise.reject = function (e) {
            return new Promise(function (t, n) {
                n(e);
            });
        });
    var w = (function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    (r.enumerable = r.enumerable || !1),
                        (r.configurable = !0),
                        "value" in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r);
                }
            }
            return function (t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t;
            };
        })(),
        C = (function () {
            function e() {
                f(this, e);
            }
            return (
                w(e, [
                    {
                        key: "GenerateFP",
                        value: function () {
                            return this.extractCRC32FromBase64(
                                this.getComplexCanvasFingerprint(
                                    arguments.length > 0 &&
                                        arguments[0] !== undefined
                                        ? arguments[0]
                                        : ""
                                )
                            );
                        },
                    },
                    {
                        key: "getComplexCanvasFingerprint",
                        value: function () {
                            var e =
                                    arguments.length > 0 &&
                                    arguments[0] !== undefined
                                        ? arguments[0]
                                        : "",
                                t = "BrowserLeaks,com <canvas> 1.0" + e,
                                n = document.createElement("canvas");
                            n.setAttribute("width", "220"),
                                n.setAttribute("height", "30");
                            var r = n.getContext("2d");
                            return (
                                (r.textBaseline = "top"),
                                (r.font = "14px 'Arial'"),
                                (r.textBaseline = "alphabetic"),
                                (r.fillStyle = "#f60"),
                                r.fillRect(125, 1, 62, 20),
                                (r.fillStyle = "#069"),
                                r.fillText(t, 2, 15),
                                (r.fillStyle = "rgba(102, 204, 0, 0.7)"),
                                r.fillText(t, 4, 17),
                                n.toDataURL()
                            );
                        },
                    },
                    {
                        key: "extractCRC32FromBase64",
                        value: function (e) {
                            return (
                                (e = e.replace("data:image/png;base64,", "")),
                                this.string2Hex(
                                    atob(e).slice(-16, -12).toString()
                                )
                            );
                        },
                    },
                    {
                        key: "string2Hex",
                        value: function (e) {
                            for (var t = "", n = 0; n < e.length; n++) {
                                var r = e.charCodeAt(n);
                                r <= 15 && (t += "0"),
                                    (t += r.toString(16).toLocaleUpperCase());
                            }
                            return t;
                        },
                    },
                ]),
                e
            );
        })(),
        b =
            (new C(),
            (function () {
                var e = p.protocol,
                    t = p.api_server,
                    n = function (e) {
                        var t = "";
                        for (var n in e)
                            Object.prototype.hasOwnProperty.call(e, n) &&
                                (t += "&" + n + "=" + encodeURIComponent(e[n]));
                        return t;
                    },
                    r = function (r, a) {
                        var o = n(a),
                            i =
                                r.indexOf("http://") > -1 ||
                                r.indexOf("https://") > -1;
                        return (
                            r.indexOf("?") < 0 && (o = "?" + o.slice(1)),
                            i ? "" + r + o : "" + e + t + r + o
                        );
                    },
                    a = function (e) {
                        var t = document.getElementsByTagName("head")[0],
                            n = document.createElement("script");
                        return (
                            (n.charset = "UTF-8"),
                            (n.src = e),
                            t.appendChild(n),
                            {
                                remove: function () {
                                    t.removeChild(n);
                                },
                            }
                        );
                    },
                    o = function (e, t, n, o) {
                        return (
                            (t = t || {}),
                            (n = n || !1),
                            new Promise(function (c) {
                                if (n) {
                                    var u = setTimeout(function () {
                                        clearTimeout(u),
                                            l.remove(),
                                            c({
                                                code: "0703",
                                                msg: "Time out,Refresh Again!",
                                            });
                                    }, o || 2e3);
                                    window["static"] = function () {
                                        clearTimeout(u),
                                            c.apply(this, arguments),
                                            l.remove();
                                    };
                                    var l = a(e);
                                } else {
                                    var s =
                                        "VaptchaJsonp" + new Date().valueOf();
                                    window[s] && (s += "1"),
                                        i(t, { callback: s }),
                                        (e = r(e, t));
                                    var f = a(e),
                                        d = setTimeout(function () {
                                            clearTimeout(d),
                                                (window[s] = null),
                                                f.remove(),
                                                c({
                                                    code: "0703",
                                                    msg: "Time out,Refresh Again!",
                                                });
                                        }, 1e4);
                                    window[s] = function () {
                                        clearTimeout(d),
                                            c.apply(this, arguments),
                                            f.remove(),
                                            (window[s] = null);
                                    };
                                }
                            })
                        );
                    };
                return (
                    (o.setConfig = function (n) {
                        (e = n.protocol || e), (t = n.api_server || t);
                    }),
                    o
                );
            })()),
        S = {
            staticConfig: function (e) {
                return b(
                    e.protocol + e.url + e.type + e.id,
                    {},
                    !0,
                    e.waitTime || 2e3
                );
            },
            getConfig: function (e) {
                var n = "";
                return (
                    s() &&
                        t(localStorage.getItem("vaptchanu")) &&
                        (n = localStorage.getItem("vaptchanu")),
                    b("/config", {
                        vi: e.vid,
                        t: e.mode,
                        s: e.scene || 0,
                        z: e.zone,
                        v: 3,
                        u: n,
                    })
                );
            },
            lang: function (e) {
                return b("http://localhost:8080/api/v1/lang", {}, !1);
            },
        },
        T = {
            en: {
                "0201": "id empty",
                "0202": "id error",
                "0208": "scene error",
                "0209": "request used up",
                "0906": "params error",
                "0702": "VAPTCHA unit does not match the domain name",
                "0105": "Request too fast, try again later!",
            },
            "zh-CN": {
                "0702": "验证单元与域名不匹配",
                "0105": "刷新过快,请稍后再试。",
            },
        },
        j = (function () {
            function a() {
                var e = navigator.language || navigator.userLanguage;
                return "zh-CN" === e
                    ? "zh-CN"
                    : "zh-TW" === e
                    ? "zh-TW"
                    : e.includes("en", -1)
                    ? "en"
                    : e.includes("ja", -1)
                    ? "jp"
                    : "zh-CN";
            }
            function c(e) {
                if ("cn" === e.area) return "cn";
                if ("sea" === e.area) return "sea";
                if ("na" === e.area) return "na";
                if (
                    t(localStorage.getItem("vaptchaNetway")) &&
                    "" !== localStorage.getItem("vaptchaNetway")
                )
                    return (
                        i(e, { area: localStorage.getItem("vaptchaNetway") }),
                        localStorage.getItem("vaptchaNetway")
                    );
                var n = 0 - new Date().getTimezoneOffset() / 60,
                    r = navigator.language || window.navigator.userLanguage;
                return (
                    (r = r.toLowerCase()),
                    8 === n && "zh-cn" === r
                        ? (i(e, { area: "cn" }), "cn")
                        : 8 === n && "zh-cn" !== r
                        ? (i(e, { area: "sea" }), "sea")
                        : (n >= 6 && n < 8) || (n > 8 && n <= 10)
                        ? (i(e, { area: "sea" }), "na")
                        : (i(e, { area: "na" }), "na")
                );
            }
            var s = !1,
                f = function (e) {
                    var n = void 0,
                        r = void 0;
                    return (
                        t(e.area)
                            ? ((n = "channel-" + c(e) + ".vaptcha.net/" + c(e)),
                              (r = "api-" + c(e) + ".vaptcha.net"))
                            : (i(e, { area: "cn" }),
                              (n = "channel-cn.vaptcha.net/cn"),
                              (r = "api-cn.vaptcha.net")),
                        t(localStorage.getItem("vaptchaSpareCh")) &&
                        new Date().getTime() -
                            localStorage.getItem("vaptchaSpareCh") <
                            36e5
                            ? S.staticConfig({
                                  protocol: e.protocol,
                                  url: r,
                                  type: "/channel/",
                                  id: e.vid,
                                  waitTime: 5e3,
                              }).then(function (e) {
                                  return Promise.resolve(e);
                              })
                            : S.staticConfig({
                                  protocol: e.protocol,
                                  id: e.vid,
                                  url: n,
                                  type: "/config/",
                              }).then(function (a) {
                                  return t(a.msg)
                                      ? (localStorage.setItem(
                                            "vaptchaSpareCh",
                                            new Date().getTime()
                                        ),
                                        S.staticConfig({
                                            protocol: e.protocol,
                                            url: r,
                                            type: "/channel/",
                                            id: e.vid,
                                            waitTime: 5e3,
                                        }).then(function (e) {
                                            return Promise.resolve(e);
                                        }))
                                      : t(a.alias)
                                      ? S.staticConfig({
                                            protocol: e.protocol,
                                            id: a.alias,
                                            url: n,
                                            type: "/alias/",
                                        }).then(function (e) {
                                            return (
                                                i(e, { state: a.state }),
                                                Promise.resolve(e)
                                            );
                                        })
                                      : void console.log("channel error");
                              })
                    );
                },
                d = function (e) {
                    return f(e)
                        .then(function (n) {
                            if (t(n.code) && "0703" === n.code)
                                return (
                                    l("5001: channel interface timeout"),
                                    Promise.reject(
                                        "5001: channel interface timeout"
                                    )
                                );
                            i(e, {
                                api_server: n.api,
                                offline_key: n.offline_key,
                            }),
                                b.setConfig(e);
                            var r = 0 - new Date().getTimezoneOffset() / 60;
                            return i(e, { zone: r }), S.getConfig(e);
                        })
                        .then(function (n) {
                            if (t(n.code) && "0703" === n.code)
                                return (
                                    l("5002: config interface timeout"),
                                    Promise.reject(
                                        "5002: config interface timeout"
                                    )
                                );
                            if (!n) return Promise.resolve();
                            if (n.code !== y.Success) {
                                var r = T.en;
                                return (
                                    "0702" === n.msg
                                        ? alert("" + r[n.msg])
                                        : "0105" === n.code
                                        ? alert("" + r[n.code])
                                        : console.log(
                                              "errorCode：" +
                                                  n.code +
                                                  ":" +
                                                  n.msg
                                          ),
                                    l(r[n.msg] || n.msg),
                                    Promise.reject(n.code)
                                );
                            }
                            return (
                                t(n.data.node) &&
                                    localStorage.setItem(
                                        "vaptchaNetway",
                                        n.data.node.toLowerCase()
                                    ),
                                n.data.guideVersion &&
                                n.data.guideVersion > "3.2.0"
                                    ? ((n.data.v3Update = 0),
                                      console.log(
                                          "Sorry,the version of V3.JS is too low, please upgrade!"
                                      ))
                                    : (n.data.v3Update = 1),
                                i(e, n.data),
                                Promise.resolve()
                            );
                        });
                },
                p = function (e, t) {
                    return "" + e.protocol + e.cdn_servers[0] + "/" + t;
                },
                h = function (t) {
                    var n = document.getElementsByTagName("head")[0],
                        r = document.getElementById("vaptcha_style");
                    return new Promise(function (a) {
                        e(r)
                            ? ((r = document.createElement("link")),
                              i(r, {
                                  rel: "stylesheet",
                                  type: "text/css",
                                  href: t,
                                  id: "vaptcha_style",
                                  onload: a,
                              }),
                              n && n.appendChild(r))
                            : a();
                    });
                },
                v = function j(e) {
                    var n = document.getElementsByTagName("head")[0],
                        r = document.querySelector("script[src='" + e + "']");
                    return new Promise(function (a) {
                        if (t(r))
                            return void (r.loaded
                                ? a()
                                : setTimeout(function () {
                                      return j(e).then(a);
                                  }));
                        r = document.createElement("script");
                        var o = function () {
                            (r.readyState &&
                                "loaded" !== r.readyState &&
                                "complete" !== r.readyState) ||
                                (a(),
                                (r.loaded = !0),
                                (r.onload = null),
                                (r.onreadystatechange = null));
                        };
                        i(r, {
                            async: !0,
                            charset: "utf-8",
                            src: e,
                            onerror: function () {
                                return l("load sdk timeout");
                            },
                            onload: o,
                            onreadystatechange: o,
                        }),
                            n.appendChild(r);
                    });
                },
                w = function (e) {
                    var t = e.sdkName,
                        n = e.config,
                        r = p(n, "js/" + n.js_path);
                    return v(r).then(function () {
                        var e = g(t);
                        return Promise.resolve(
                            new (0, window["_" + e + "Vaptcha"])(n)
                        );
                    });
                },
                C = function (e) {
                    if ("auto" === e.lang || "" === e.lang) {
                        var i = a();
                        e.lang = i || "zh-CN";
                    }
                    (s = !0),
                        (e.https = !0),
                        (e.protocol = "https://"),
                        b.setConfig(e),
                        t(e.type) && (e.mode = e.type),
                        "embedded" === e.mode && (e.mode = "embed"),
                        !["embed", "popup", "invisible"].includes(e.mode) &&
                            (e.mode = "popup"),
                        t(e.mode) && (e.type = e.mode),
                        o() < 9 && v(p(e, e.canvas_path));
                    var c = new m(e);
                    if (
                        (c.addValidateRules({
                            elementOrSelector: function (t, a) {
                                if (
                                    ("String" === u(e.container) &&
                                        (e.container = document.querySelector(
                                            e.container
                                        )),
                                    n(e.container) &&
                                        r(e.container[0]) &&
                                        (e.container = e.container[0]),
                                    !r(e.container))
                                )
                                    return a;
                            },
                        }),
                        c.add("vid", "required", "please configure vid"),
                        "invisible" !== e.mode &&
                            c.add(
                                "container",
                                "elementOrSelector",
                                "5004: please configure container with element or selector"
                            ),
                        c.validate())
                    )
                        return d(e)
                            .then(function () {
                                var t = e.https
                                        ? "css/theme_https." +
                                          e.css_version +
                                          ".css"
                                        : "css/theme." + e.css_version + ".css",
                                    n = p(e, t);
                                return h(n);
                            })
                            .then(function () {
                                var t = e.mode;
                                return (s = !1), w({ sdkName: t, config: e });
                            });
                };
            return function A(e) {
                return new Promise(function (t) {
                    s
                        ? setTimeout(function () {
                              A(e).then(t);
                          }, 1e3)
                        : C(e).then(t);
                })["catch"](function (e) {
                    return (s = !1), l(e), Promise.reject(e);
                });
            };
        })(),
        A = (function () {
            var e = function (e) {
                    var n = e.getAttribute("data-config"),
                        r = {};
                    if (t(n))
                        try {
                            r = JSON.parse(n);
                        } catch (a) {
                            l("dom config format error");
                        }
                    return r;
                },
                n = function (e) {
                    var n = e.getAttribute("data-vid");
                    return t(n) ? { vid: n } : {};
                },
                r = function (e, n) {
                    var r = Object.create(p);
                    (r.container = e),
                        i(r, n),
                        t(r.vid) &&
                            j(r).then(function (e) {
                                e.renderTokenInput(), e.render();
                            });
                };
            return function () {
                for (
                    var t = document.querySelectorAll("[data-vid]"),
                        a = document.querySelectorAll("[data-config]"),
                        o = 0;
                    o < a.length;
                    o++
                ) {
                    var i = e(a[o]);
                    r(a[o], i);
                }
                for (var c = 0; c < t.length; c++)
                    if (!Array.prototype.includes.call(a, t[c])) {
                        var u = n(t[c]);
                        r(t[c], u);
                    }
            };
        })();
    (window.onload = A),
        (window.vaptcha = function (e) {
            var t = Object.create(p);
            return (
                i(t, e),
                ("auto" === t.lang || "" === t.lang) &&
                    (t.lang = d() || "zh-CN"),
                j(t)
            );
        });
})();
