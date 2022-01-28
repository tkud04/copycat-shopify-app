(function() {
    if (typeof window.ometria != "undefined" && typeof ometria.init == "function") {
        return
    }
    if (typeof window.ometria != "undefined") {
        window.ometria.init = function() {}
    }
    var Q = navigator.cookieEnabled || ("cookie"in document && (document.cookie.length > 0 || (document.cookie = "test").indexOf.call(document.cookie, "test") > -1));
    if (!Q) {
        return
    }
    if (window.navigator && window.navigator.loadPurpose === "preview") {
        return
    }
    if (window.location.hash == "#om_debug") {
        an("OMdebug", "1", 1)
    }
    if (window.location.hash == "#om_debug=off") {
        an("OMdebug", "0", -1)
    }
    var az = (r("OMdebug") == "1");
    _log = [];
    var f = function(e) {
        _log.push(e)
    };
    var m = function(e, aA) {
        _log.push([e, aA])
    };
    var T = function(e) {
        _log.push(e);
        if (az) {
            console.log(["OMETRIA", e])
        }
    };
    var S = {
        key: "f7af012b9a5822ff",
        endpoint: "//trk.ometria.com/track/",
        plugins: ["v=3", "shopify"],
        callback_timeout: 250,
        cookie_expire_days: 365,
        session_timeout: 1800,
        api_version: 3,
        payment_domains: ["worldpay", "paypal", "myshopify", "pay.shopify.com"],
        cookie_domain: "",
        remove_domain_prefixes: ["www.", "secure."],
        page_types: [],
        external_campaign_plugins: [],
        extra_plugin_code: ""
    };
    var ah = function(e) {
        if (S.namespace) {
            return S.namespace + e
        }
        if (!e) {
            return e
        }
        return e
    };
    S.endpoint = "https:" + S.endpoint;
    /**
     * if (window.location.host.indexOf("localhost") > -1) {
        S.endpoint = "http://trk.ometria.localhost/track/"
    }
    **/
    var n = [];
    if (az) {
        var t = null;
        var X = [];
        function D() {
            if (!document.body) {
                return null
            }
            t = document.createElement("div");
            t.style.border = "1px solid #000";
            t.style.position = "absolute";
            t.style.top = "0px";
            t.style.right = "0px";
            t.style.background = "#666";
            t.style.padding = "0px";
            t.style.color = "#333";
            t.style.zIndex = 2147483650;
            t.style.width = "250px";
            t.style.maxHeight = "400px";
            t.style.overflow = "auto";
            document.body.appendChild(t)
        }
        function Z(e, aB) {
            var aA = "Event: " + e;
            if (e == "pageview") {
                aA += " (" + aB.type;
                if (aB.type == "product") {
                    aA += " #" + aB.pid
                }
                aA += ")"
            }
            if (e == "transaction") {
                aA += " (" + aB.tid + ")"
            }
            if (e == "checkout") {
                aA += " (" + aB.stage + ")"
            }
            return aA
        }
        function aq(aB, aA) {
            if (!t) {
                D()
            }
            if (t) {
                if (X.length) {
                    for (var e = 0; e < X.length; e++) {
                        am(X[e][0], X[e][1])
                    }
                    X = []
                }
                am(aB, aA)
            } else {
                X.push([aB, aA])
            }
        }
        function am(aD, aC) {
            try {
                var aA = document.createElement("div");
                aA.style.border = "1px solid #000";
                aA.style.fontSize = "11px";
                aA.style.padding = "3px";
                aA.style.margin = "3px";
                aA.style.background = "#fff";
                aA.innerHTML = "" + aD;
                if (aC) {
                    aA.addEventListener("click", function(e) {
                        console.log(aC)
                    })
                }
                t.appendChild(aA);
                return aA
            } catch (aB) {}
        }
        f = function(e) {
            aq(e);
            console.log(["OMETRIA", e, x])
        }
        ;
        m = function(e, aA) {
            aq(Z(e, aA), aA);
            console.log(["OMETRIA", "Sending event", e, aA, x])
        }
        ;
        T = function(e) {
            console.log(["OMETRIA", e])
        }
    }
    function F(aA) {
        var e = {};
        e.contains = function(aB) {
            return (typeof aA[aB] !== "undefined")
        }
        ;
        e.get = function(aB) {
            return aA[aB]
        }
        ;
        e.set = function(aC, aB) {
            aA[aC] = aB
        }
        ;
        e.toObject = function() {
            var aC = {};
            for (var aB in aA) {
                if (aA.hasOwnProperty(aB)) {
                    aC[aB] = aA[aB]
                }
            }
            return aC
        }
        ;
        return e
    }
    function E(e, aC) {
        aC = aC || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var aA = "";
        for (var aB = 0; aB < e; aB++) {
            var aD = Math.floor(Math.random() * aC.length);
            aA += aC.substring(aD, aD + 1)
        }
        return aA
    }
    function p(aA, e) {
        for (var aB in e) {
            aA[aB] = e[aB]
        }
        return aA
    }
    function b(aA) {
        if (typeof aA === "string") {
            if (!aA) {
                return null
            }
            var e = parseFloat(aA.replace(/[^0-9\.]/g, ""));
            if (isNaN(e)) {
                return null
            }
            return e
        }
        return aA
    }
    function ag(e) {
        return Math.floor(b(e))
    }
    function s(aA, e) {
        if (aA && aA.push) {
            B(aA, e)
        } else {
            if (typeof aA == "object") {
                c(aA, e)
            }
        }
    }
    function c(aB, aA) {
        for (var e in aB) {
            if (aB.hasOwnProperty(e)) {
                aA(e, aB[e])
            }
        }
    }
    function B(aB, aA) {
        for (var e = 0; e < aB.length; e++) {
            aA(e, aB[e])
        }
    }
    function q(aA, e) {
        return (aA.constructor === Array) ? y(aA, e) : K(aA, e)
    }
    function K(aC, aB) {
        var aA = {};
        for (var e in aC) {
            if (aC.hasOwnProperty(e)) {
                aA[e] = aB(aC[e], e)
            }
        }
        return aA
    }
    function y(aC, aB) {
        var e = [];
        for (var aA = 0; aA < aC.length; aA++) {
            e[aA] = aB(aC[aA], aA)
        }
        return e
    }
    function g(e) {
        if (typeof e == "undefined") {
            return ""
        }
        return e.replace(/^\s+|\s+$/g, "")
    }
    function u(e) {
        if (typeof e == "undefined") {
            e = window.location.href
        }
        e = e + "";
        e = e.split("#")[0];
        return e
    }
    function J(e) {
        if (!e) {
            return null
        }
        var aC = e.split("/");
        if (aC.length < 3) {
            return null
        }
        var aD = aC[2];
        for (var aA = 0; aA < S.remove_domain_prefixes.length; aA++) {
            var aB = S.remove_domain_prefixes[aA];
            if (aD.indexOf(aB) === 0) {
                aD = aD.replace(aB, "")
            }
        }
        aD = aD.split(":")[0];
        return aD
    }
    function k(e) {
        var aA = /\S+@\S+\.\S+/;
        return aA.test(e)
    }
    function l(aA) {
        var e = /omid:.+/;
        return e.test(aA)
    }
    function ad(aA) {
        var aB = document.getElementsByTagName("head")[0];
        var e = document.createElement("script");
        e.type = "text/javascript";
        e.src = aA;
        aB.appendChild(e)
    }
    function z(aA) {
        var e = new Image();
        e.src = aA
    }
    function A(aA, e) {
        return aA.indexOf(e) !== -1
    }
    var ar = {
        _keyStr: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=",
        encode: function(aB) {
            var e = "";
            var aI, aG, aE, aH, aF, aD, aC;
            var aA = 0;
            aB = ar._utf8_encode(aB);
            while (aA < aB.length) {
                aI = aB.charCodeAt(aA++);
                aG = aB.charCodeAt(aA++);
                aE = aB.charCodeAt(aA++);
                aH = aI >> 2;
                aF = ((aI & 3) << 4) | (aG >> 4);
                aD = ((aG & 15) << 2) | (aE >> 6);
                aC = aE & 63;
                if (isNaN(aG)) {
                    aD = aC = 64
                } else {
                    if (isNaN(aE)) {
                        aC = 64
                    }
                }
                e = e + ar._keyStr.charAt(aH) + ar._keyStr.charAt(aF) + ar._keyStr.charAt(aD) + ar._keyStr.charAt(aC)
            }
            return e
        },
        _utf8_encode: function(aA) {
            aA = aA.replace(/\r\n/g, "\n");
            var e = "";
            for (var aC = 0; aC < aA.length; aC++) {
                var aB = aA.charCodeAt(aC);
                if (aB < 128) {
                    e += String.fromCharCode(aB)
                } else {
                    e += "\\u" + ("0000" + aB.toString(16)).slice(-4)
                }
            }
            return e
        }
    };
    function ab(e) {
        if (e.indexOf("?") == -1) {
            return F({})
        }
        qstr = e.substring(e.indexOf("?") + 1);
        return R(qstr)
    }
    function R(aB) {
        if (aB.indexOf("?") == 0) {
            aB = aB.substring(aB.indexOf("?") + 1)
        }
        aB = aB.replace(/&amp;/g, "&");
        aB = aB.replace(/\+/g, "%20");
        var aF = {};
        var aC = aB.split(/\?|&/);
        for (var aE = 0; aE < aC.length; aE++) {
            var aA = aC[aE].split("=");
            try {
                aF[decodeURIComponent(aA[0])] = decodeURIComponent(aA[1])
            } catch (aG) {
                try {
                    aA[0] = aA[0].replace(/%[0-9A-Z][0-9A-Z]/, "");
                    aA[1] = aA[1].replace(/%[0-9A-Z][0-9A-Z]/, "");
                    aF[decodeURIComponent(aA[0])] = decodeURIComponent(aA[1])
                } catch (aD) {}
            }
        }
        return F(aF)
    }
    function W(aB, aA, e) {
        if (aB && typeof aB == "object") {
            s(aB, function(aD, aC) {
                W(aC, aA ? aA + "[" + aD + "]" : aD, e)
            })
        } else {
            if (typeof aB != "undefined") {
                e.push(encodeURIComponent(aA) + "=" + encodeURIComponent(aB))
            }
        }
    }
    function U(aA) {
        var e = [];
        W(aA, "", e);
        return e.join("&")
    }
    function an(aA, aC, e, aB) {
        var aD = new Date();
        var aE = aA + "=2_" + encodeURIComponent(aC);
        if (e) {
            aD.setDate(aD.getDate() + e);
            aE += ";expires=" + aD.toGMTString()
        }
        if (aB) {
            aE += ";domain=" + aB
        }
        aE += ";path=/";
        document.cookie = aE
    }
    function r(e) {
        var aB = document.cookie + "";
        if (aB.length > 0) {
            var aC = aB.indexOf(e + "=");
            if (aC != -1) {
                aC = aC + e.length + 1;
                c_end = aB.indexOf(";", aC);
                if (c_end == -1) {
                    c_end = aB.length
                }
                var aA = aB.substring(aC, c_end);
                if (aA.substring(0, 2) == "2_") {
                    aA = aA.substring(2);
                    return decodeURIComponent(aA)
                } else {
                    return unescape(aA)
                }
            }
        }
        return false
    }
    function al(e, aA) {
        an(e, "", -1, aA)
    }
    function V(e, aB, aA) {
        this.name = e;
        this.saveto = null;
        this.changed = false;
        this.life = aB;
        this.domain = aA;
        this.existed = false;
        this.data = F({});
        this.load()
    }
    V.prototype.get = function(e, aA) {
        if (!this.data.contains(e)) {
            return aA
        }
        return this.data.get(e)
    }
    ;
    V.prototype.getInt = function(e, aA) {
        return parseInt(this.get(e, aA))
    }
    ;
    V.prototype.appendText = function(aA, aB, e) {
        e = e || "";
        this.changed = true;
        var aC = this.data.get(aA) || "";
        if (aC) {
            aC = aC + e
        }
        aC = aC + aB;
        this.data.set(aA, aB);
        this.saveSoon()
    }
    ;
    V.prototype.set = function(e, aA) {
        this.changed = true;
        this.data.set(e, aA);
        this.saveSoon()
    }
    ;
    V.prototype.saveSoon = function(e, aB) {
        var aA = this;
        if (this.saveto) {
            clearTimeout(this.saveto)
        }
        this.saveto = setTimeout(function() {
            aA.saveto = null;
            aA.save()
        }, 5)
    }
    ;
    V.prototype.inc = function(e, aB) {
        var aA = this.getInt(e) || 0;
        aB = aB || 1;
        this.set(e, aA + aB)
    }
    ;
    V.prototype.load = function() {
        var e = r(this.name);
        if (!e) {
            return
        }
        this.existed = true;
        this.data = R(e)
    }
    ;
    V.prototype.save = function() {
        if (this.saveto) {
            clearTimeout(this.saveto);
            this.saveto = null
        }
        an(this.name, U(this.data.toObject()), this.life, this.domain);
        this.checkforDoubleCookie();
        this.changed = false
    }
    ;
    V.prototype.checkforDoubleCookie = function() {
        var aA = document.cookie.indexOf(this.name + "=");
        if (aA == -1) {
            return
        }
        var e = document.cookie.indexOf(this.name + "=", aA + 1);
        if (e == -1) {
            return
        }
        var aB = location.hostname;
        if (this.domain != aB && this.domain != "." + aB) {
            f("Erase cookie");
            al(this.name, aB);
            al(this.name, "")
        }
    }
    ;
    V.prototype.saveIfDirty = function() {
        if (this.changed) {
            this.save()
        }
    }
    ;
    var G = [];
    function H(aE, aD, e, aB) {
        aB = aB || "system";
        if (!w) {
            G.push([aE, aD, e, aB]);
            return
        }
        var aA = {};
        p(aA, x);
        aA.d = aD;
        aA.type = aE;
        aA.channel = aB;
        m(aE, aD);
        var aC = aw(aA);
        au(aC);
        if (e) {
            setTimeout(e, S.callback_timeout)
        }
    }
    function I() {
        for (var aA = 0; aA < G.length; aA++) {
            var e = G[aA];
            H(e[0], e[1], e[2], e[3])
        }
    }
    function aw(e) {
        return ar.encode(U(e))
    }
    function au(aC) {
        var e = {};
        e.data = aC;
        e.rnd = E(6);
        e.enc = x.enc;
        var aD = S.endpoint;
        var aB = aD + "v" + S.api_version + "/" + S.key + "/event.gif?" + U(e);
        var aA = new Image();
        aA.src = aB
    }
    function ap(aC) {
        var aD = "om_" + E(5);
        var aE = document.createElement("iframe");
        aE.style.width = "1px";
        aE.style.height = "1px";
        aE.style.position = "absolute";
        aE.style.top = "0px";
        aE.style.right = "0px";
        aE.style.visibility = "hidden";
        document.body.appendChild(aE);
        aE.id = aD;
        var e = aE.contentDocument ? aE.contentDocument : aE.contentWindow.document;
        e.open();
        e.close();
        var aB = e.createElement("form");
        aB.method = "post";
        aB.action = S.endpoint + "v" + S.api_version + "/" + S.key + "/event.html";
        var aA = e.createElement("input");
        aA.name = "data";
        aA.value = aC;
        aB.appendChild(aA);
        var aA = e.createElement("input");
        aA.name = "rnd";
        aA.value = E(6);
        aB.appendChild(aA);
        e.body.appendChild(aB);
        aB.submit();
        setTimeout(function() {
            aE.parentNode.removeChild(aE)
        }, 2000)
    }
    function d(aA, e) {
        var aB = Y(aA, e);
        aB = q(aB, function(aF, aE) {
            if (aF === true) {
                return ""
            }
            if (aF === false) {
                return ""
            }
            if (aF === null) {
                return ""
            }
            return (aF + "").replace("|", "")
        });
        var aC = aB.join("|");
        if (aC == "|||||") {
            return ""
        }
        var aD = av();
        return aC + "|" + aD
    }
    function av() {
        var e = new Date().getTime();
        return Math.floor(e / (1000 * 60 * 60 * 24))
    }
    function Y(aC, aB) {
        var aD = [null, null, null, null, null, null];
        if (aB) {
            var aE = J(aB);
            aD[0] = aE;
            var aA = ao(aE, aB);
            if (aA !== false) {
                aD[2] = "search";
                aD[1] = aA[0];
                aD[4] = aA[1]
            }
        }
        var e = ab(aC);
        if (e.contains("gclid")) {
            if (!aD[0]) {
                aD[0] = "google.com"
            }
            aD[2] = "cpc";
            aD[4] = "Google"
        }
        if (aB && aB.indexOf("/aclk") > -1 && aB.indexOf("adurl=") > -1) {
            aD[2] = "cpc";
            aD[4] = "Google"
        }
        if (e.contains("om_campaign")) {
            aD[2] = "email";
            aD[4] = "ometria"
        }
        if (e.contains("utm_term")) {
            aD[1] = e.get("utm_term")
        }
        if (e.contains("utm_medium")) {
            aD[2] = e.get("utm_medium")
        }
        if (e.contains("utm_campaign")) {
            aD[3] = e.get("utm_campaign")
        }
        if (e.contains("utm_source")) {
            aD[4] = e.get("utm_source")
        }
        if (e.contains("utm_content")) {
            aD[5] = e.get("utm_content")
        }
        return aD
    }
    function ao(aB, aD) {
        var aH = "360.cn:q|duckduckgo:q|about:terms|alice:qs|aol:q|aol:query|ask:q|avg:q|babylon:q|baidu:wd|biglobe:q|bing:q|cnn:query|comcast:q|conduit:q|daum:q|eniro:search_word|go.mail.ru:q|goo.ne:MT|google:q|images.google:q|incredimail:q|kvasir:q|live:q|lycos:q|lycos:query|mamma:q|msn:q|najdi:q|naver:query|netscape:query|onet:qt|ozu:q|pchome:q|rakuten:qt|rambler:query|search-results:q|search.centrum.cz:q|seznam:q|startsiden:q|terra:query|virgilio:qs|voila:rdata|wp:szukaj|yahoo:p|yahoo:q|yam:k|yandex:text".split("|");
        var aG = ab(aD);
        var aA = "." + aB + ".";
        for (var aF = 0; aF < aH.length; aF++) {
            var aI = aH[aF].split(":");
            var aE = "." + aI[0] + ".";
            var aC = aI[1];
            if (aA.indexOf(aE) > -1) {
                var e = aI[0];
                e = e.charAt(0).toUpperCase() + e.slice(1);
                if (aG.contains(aC)) {
                    return [aG.get(aC) || null, e]
                }
            }
        }
        if (aA.indexOf(".google.") === 0) {
            return ["NOT_SUPPLIED", "Google"]
        }
        return false
    }
    function v(aB) {
        if (!aB) {
            return null
        }
        var e = aB.split("|");
        if (e.length >= 7) {
            var aA = parseInt(e[6]);
            return av() - aA
        }
        return null
    }
    function h(aB, aA, e) {
        if (e.contains("om_campaign")) {
            return e.get("om_campaign")
        }
        return ""
    }
    function ac() {
        this.lis = [];
        this.total = 0;
        this.size = 0;
        this.id = null;
        this.cur = "";
        this.p = {};
        this.url = null
    }
    ac.prototype.setData = function(aA) {
        for (var e in aA) {
            this[e] = aA[e]
        }
    }
    ;
    ac.prototype.setProperties = function(e) {
        this.p = e
    }
    ;
    ac.prototype.addLineItem = function(e, aC, aB, aD, aA) {
        aB = b(aB);
        aC = ag(aC);
        if (typeof aD == "object") {
            aA = aD;
            aD = null
        }
        this.lis.push({
            pid: e,
            vid: aD,
            q: aC,
            tot: aB,
            p: aA || {}
        });
        this.size += aC
    }
    ;
    ac.prototype.setTotal = function(aA, e) {
        aA = b(aA);
        this.total = aA;
        this.cur = e
    }
    ;
    ac.prototype.setId = function(e) {
        this.id = e
    }
    ;
    ac.prototype.setUrl = function(e) {
        this.url = e
    }
    ;
    ac.prototype.setURL = function(e) {
        this.url = e
    }
    ;
    ac.prototype.signature = function() {
        return this.size + "|" + this.total
    }
    ;
    try {
        document.body.addEventListener("change", function(aB) {
            try {
                var aC = "b";
                aC = aC + "x";
                var aA = aB.target;
                if (aA.type == "email" && aA.id.startsWith(aC + "-")) {
                    if (ometria) {
                        if (!k(aA.value)) {
                            return
                        }
                        ometria.identify(aA.value);
                        H(aC + ":signup", {})
                    }
                }
            } catch (aB) {}
        }, false)
    } catch (M) {
        T(M)
    }
    if ((typeof S.cookie_domain == "undefined") || !S.cookie_domain) {
        S.cookie_domain = "." + J(u())
    }
    var x = {};
    var at = {};
    var o = null;
    var O = new V("ometria",365,S.cookie_domain);
    if (az) {
        x.debug = 1
    }
    (function() {
        var aB = function() {
            var aE = r("OMud");
            try {
                return aE ? JSON.parse(aE) : null
            } catch (aD) {
                return null
            }
        };
        var aC = r("OMuser");
        var e = aB();
        if (aC) {
            O.existed = true;
            var aA = aC.split("|");
            O.set("cid", aA[0]);
            O.set("sid", aA[1]);
            O.set("slt", parseInt(aA[2]));
            O.set("nses", parseInt(aA[3]));
            O.set("src", (aA[4] || "").replace(/\*/g, "|"));
            al("OMuser")
        }
        if (e) {
            O.existed = true;
            O.set("uiid", e.id);
            al("OMud")
        }
        O.saveIfDirty()
    }
    )();
    function C() {
        x.cor = E(16);
        ai();
        ae();
        ax();
        ay()
    }
    function a() {
        var aA = E(16);
        O.set("cid", aA);
        x.cid = aA;
        O.set("nses", 0);
        var e = Math.floor((new Date()).getTime() / 1000);
        O.set("osts", e);
        x.cnew = 1
    }
    function ai() {
        if (!O.get("cid")) {
            f("NEW COOKIE ID");
            a()
        }
        x.cid = O.get("cid");
        x.uiid = O.get("uiid");
        if (x.uiid) {
            f("Identified: " + x.uiid)
        } else {
            f("Not identified")
        }
    }
    function ay() {
        x.url = u()
    }
    function ae() {
        function e() {
            return !!("ontouchstart"in window) || !!("onmsgesturechange"in window)
        }
        x.dtouch = e() ? 1 : 0;
        x.dsize = screen.width + "x" + screen.height;
        x.enc = (document.characterSet || document.charset)
    }
    function ax() {
        var aG = u();
        var aF = u(document.referrer);
        if (aF == aG) {
            aF = null
        }
        var aR = J(aG);
        var aD = J(aF);
        var e = R(window.location.search);
        if (e.contains("om_user")) {
            window.setTimeout(function() {
                ometria.identify(e.get("om_user"));
                if (window.history && window.history.replaceState) {
                    window.history.replaceState({}, "", location.href.replace(/om_user=[^&]+&?/, ""))
                }
            }, 100)
        } else {
            if (e.contains("om_profile")) {
                window.setTimeout(function() {
                    ometria.identify("omid:" + e.get("om_profile"));
                    if (window.history && window.history.replaceState) {
                        window.history.replaceState({}, "", location.href.replace(/om_profile=[^&]+&?/, ""))
                    }
                }, 100)
            } else {
                if (e.contains("kmi")) {
                    window.setTimeout(function() {
                        ometria.identify(e.get("kmi"))
                    }, 100)
                }
            }
        }
        var aJ = h(aG, aF, e);
        var aI = Math.floor((new Date()).getTime() / 1000);
        var aM = O.getInt("slt", 0);
        var aQ = aI - aM;
        var aL = false;
        var aN = false;
        var aC = false;
        var aP = false;
        if (aQ >= S.session_timeout) {
            aN = true
        }
        if (aF && (aR != aD)) {
            aL = true;
            x.rurl = aF;
            if (aQ > 600) {
                aN = true
            }
            if (e.contains("utm_nooverride")) {
                aN = false
            }
            for (var aO = 0; aO < S.payment_domains.length; aO++) {
                if (aD.indexOf(S.payment_domains[aO]) > -1) {
                    aN = false
                }
            }
        }
        if (aF && (aR == aD)) {
            if (aQ < S.session_timeout * 1.95) {
                aN = false
            }
        }
        if (aQ <= 600) {
            aN = false
        }
        if (x.cnew) {
            aN = true
        }
        if (aN) {
            x.snew = 1;
            var aH = S.key;
            var aB = E(12);
            var aA = ((new Date().getTime()) / 1000) - 1388534400;
            aA = Math.floor(aA / (24 * 3600 * 30));
            var aK = aH.substring(0, 3) + aH.substring(aH.length - 3);
            O.set("sid", aK + aA + aB);
            f("NEW SESSION: " + O.get("sid"));
            O.inc("nses");
            O.set("npv", 0);
            O.set("tids", "");
            if (!aF || aL || x.cnew) {
                aP = true
            }
        } else {
            f("EXISTING SESSION: " + O.get("sid"))
        }
        if (aJ) {
            aP = true
        }
        if (aP) {
            var aE = d(aG, aF);
            if (aE || v(O.get("src")) >= 3) {
                f("SOURCE CHANGED: " + O.get("sid"));
                O.set("ecamp", aJ);
                O.set("src", aE);
                if (x.cnew) {
                    O.set("osrc", aE)
                }
                aC = true
            } else {
                f("SOURCE CONTINUED: " + O.get("sid"))
            }
        }
        O.set("slt", aI);
        x.tlast = aQ;
        x.sid = O.get("sid");
        x.nses = O.getInt("nses");
        x.src = O.get("src");
        x.osrc = O.get("osrc");
        x.osts = O.get("osts");
        x.ecamp = O.get("ecamp", "");
        x.tids = O.get("tids")
    }
    C();
    O.save();
    var w = false;
    var j = false;
    var af = x.nses && (x.nses <= 1);
    var aj = null;
    var L = {};
    var ak = [];
    j = true;
    ak.push(function() {
        T("Shopify plugin");
        try {
            if (typeof window.ometria == "undefined") {
                return
            }
            if (typeof window.ometria.raw_data == "undefined") {
                return
            }
            var aP = (typeof window.ometria.raw_data != "undefined") ? window.ometria.raw_data : {};
            var aG = {};
            if (aP.namespace) {
                S.namespace = aP.namespace
            }
            x.site = x.site || "default";
            if (aP.site) {
                x.site = aP.site
            }
            x.site = ah(x.site);
            function aH(aS, aR) {
                var aQ = aR.length;
                for (var e = 0; e < aQ; e++) {
                    if (aR[e] == aS) {
                        return true
                    }
                }
                return false
            }
            function aE(aR, aQ, e) {
                if (aR.attachEvent) {
                    aR["e" + aQ + e] = e;
                    aR[aQ + e] = function() {
                        aR["e" + aQ + e](window.event)
                    }
                    ;
                    aR.attachEvent("on" + aQ, aR[aQ + e])
                } else {
                    aR.addEventListener(aQ, e, false)
                }
            }
            function aL(aU, aR, aT) {
                aT = aT || "input";
                var aQ = aU.getElementsByTagName(aT)
                  , e = aQ.length;
                for (var aS = 0; aS < e; aS++) {
                    if (aQ[aS].name == aR) {
                        return aQ[aS].value
                    }
                }
                return null
            }
            function aB(e) {
                if (e === null) {
                    return null
                }
                if (typeof e === "undefined") {
                    return null
                }
                e = e * 1;
                return e / 100
            }
            var aA = u();
            var aD = J(aA);
            if (aD.indexOf(".shopify.com") > -1) {
                ometria.linkSession(true)
            }
            var aJ = (typeof aP.template != "undefined") ? aP.template.split(".") : [];
            if (aH("index", aJ)) {
                ometria.setPageType("homepage")
            } else {
                if (aH("collection", aJ)) {
                    ometria.setPageType("listing");
                    if (aP.collection_handle) {
                        aG.attributes = [{
                            id: aP.collection_handle,
                            type: "category"
                        }]
                    }
                    aG.category_id = ah((aP.collection_id) ? aP.collection_id : "all");
                    aG.nitems = aP.collection_count;
                    aG.page = aP.current_page
                } else {
                    if (aH("search", aJ)) {
                        ometria.setPageType("listing");
                        aG.search = aP.search_terms;
                        aG.nitems = aP.search_count;
                        aG.page = aP.current_page
                    } else {
                        if (aH("cart", aJ)) {
                            ometria.setPageType("basket")
                        } else {
                            if (aH("confirmation", aJ)) {
                                ometria.setPageType("confirmation");
                                ometria.trackTransaction(ah(aP.order))
                            } else {
                                if (aH("product", aJ)) {
                                    ometria.setPageType("product");
                                    if (aP.product_id) {
                                        aG.pid = ah(aP.product_id)
                                    }
                                } else {}
                            }
                        }
                    }
                }
            }
            ometria.setPageData(aG);
            if (aP.cart) {
                var aM = new ac();
                aM.setTotal(aB(aP.cart_total), aP.shop_currency);
                var aC = [];
                for (var aF = 0; aF < aP.cart.length; aF++) {
                    var aO = aP.cart[aF];
                    aM.addLineItem(ah(aO[0]), aO[2], aB(aO[3]));
                    aC.push(aO[1] + ":" + aO[2])
                }
                var aN = window.location.protocol + "//" + window.location.host + "/cart/" + aC.join(",");
                aM.url = aN;
                ometria.setBasket(aM)
            }
            if (aP.customer_email !== null) {
                ometria.identify(aP.customer_email)
            }
            if ((window.location.href + "").indexOf("checkout_url") > -1) {
                try {
                    setTimeout(function() {
                        ometria.trackCheckout("checkout")
                    }, 50);
                    ometria.setPageType("checkout")
                } catch (aK) {
                    T(aK)
                }
            }
            if ((window.location.href + "").indexOf("checkouts") > -1) {
                try {
                    setTimeout(function() {
                        ometria.trackCheckout("checkout")
                    }, 50);
                    ometria.setPageType("checkout")
                } catch (aK) {
                    T(aK)
                }
            }
            var aI = function() {
                T("Initing default Shopify email inputs");
                if (typeof $ == "function") {
                    $(document.body).on("submit", "form[name=mc-embedded-subscribe-form]", function() {
                        var e = $(event.target).parent().find("[type=email]").val();
                        if (e && k(e)) {
                            ometria.identify(e)
                        }
                    });
                    $(document.body).on("change", "form[name=mc-form]", function() {
                        var e = $(event.target).parent().find("[type=email]").val();
                        if (e && k(e)) {
                            ometria.identify(e)
                        }
                    });
                    $("#mc-email").on("change", function() {
                        var e = $(event.target).val();
                        if (e && k(e)) {
                            ometria.identify(e)
                        }
                    });
                    $(document.body).on("change", 'form[action="https://api.ometria.com/forms/signup"]', function() {
                        var e = $(event.target).parent().find('[name="ue"]').val();
                        if (e && k(e)) {
                            ometria.identify(e)
                        }
                    });
                    $('input[name="checkout[email]"]').on("change", function() {
                        var e = $(event.target).val();
                        if (e && k(e)) {
                            ometria.identify(e)
                        }
                    })
                } else {
                    T("Error no jquery")
                }
            };
            setTimeout(aI, 1000)
        } catch (aK) {
            T(aK)
        }
    });
    var P = function(aA) {
        var e = aA.slice(aA.indexOf("?") + 1).split("&");
        var aB = {};
        e.map(function(aC) {
            var aD = aC.split("=");
            aB[aD[0]] = aD[1]
        });
        return aB
    };
    var N = function(e) {
        var aB = P(e);
        var aA = {};
        if (aB.prodRecInstance) {
            aA.onsiteRecInstance = aB.prodRecInstance
        }
        if (aB.recommendationEngine) {
            aA.onsiteRecEngine = aB.recommendationEngine
        }
        if (aB.primaryEngine) {
            aA.onsiteRecIsPrimaryEngine = aB.primaryEngine === "true"
        }
        if (Object.keys(aA).length > 0) {
            H("rec:click", aA)
        }
    };
    L.Basket = ac;
    L.track = function(aA, aB, e) {
        H(aA, aB, e, "custom")
    }
    ;
    L.trackAddToBasket = function(e, aA, aB) {
        aA = aA || 1;
        aB = aB || {};
        aB.pid = e;
        aB.q = aA;
        H("addtobasket", aB)
    }
    ;
    L.isNewVisitor = function() {
        return af
    }
    ;
    L.basket = null;
    L.setBasket = function(aB) {
        var e = O.get("bskt");
        var aA = aB ? aB.signature() : "";
        this.basket = aB;
        if (e == aA) {
            return
        }
        O.set("bskt", aA);
        if (!aB.url) {}
        H("setbasket", aB)
    }
    ;
    L.getBasket = function() {
        return this.basket
    }
    ;
    L.trackCheckout = function(e, aA) {
        aA = aA || {};
        aA.stage = e;
        H("checkout", aA)
    }
    ;
    L.trackTransaction = function(aA, e) {
        e = e || {};
        e.tid = aA;
        H("transaction", e);
        O.appendText("tids", aA, "|");
        x.tids = O.get("tids")
    }
    ;
    L.pageview = function(e, aA, aB) {
        x.url = e;
        if (aA == "landing") {
            aA = "homepage"
        }
        if (e != aj) {
            aj = e;
            O.inc("npv");
            x.npv = O.getInt("npv")
        }
        aB.rurl = u(document.referrer);
        aB.type = aA;
        H("pageview", aB);
        N(e)
    }
    ;
    L.viewProducts = function(e) {}
    ;
    L.viewProduct = function(e) {
        H("viewproduct", {
            pid: e
        })
    }
    ;
    L.event = function(aB, e, aA) {}
    ;
    L.identify = function(aE, aF, aA) {
        aF = aF || {};
        var aD = {};
        if (aF) {
            aD.profile = aF
        }
        aD.uiid = aE;
        if (!(k(aE) || l(aE))) {
            return
        }
        var aB = this.getIdentity();
        var aC = true;
        var e = false;
        if (aB && aE == aB) {
            aC = false
        }
        if (aC && aB) {
            e = true
        }
        if (aC) {
            x.uiid = aE;
            if (e) {
                f("CHANGED IDENTITY");
                a();
                x.cnew = 0;
                O.set("osrc", O.get("src"));
                O.set("nses", 1)
            }
            H("identify", aD, null);
            O.set("uiid", aE)
        } else {
            if (aF) {
                H("identify", aD, null)
            }
        }
    }
    ;
    L.setProfileData = function(aA) {
        aA = aA || {};
        var e = {};
        if (aA) {
            e.profile = aA
        }
        e.uiid = ometria.getIdentity();
        if (!e.uiid) {
            return
        }
        H("profile", e, null)
    }
    ;
    L.getIdentity = function() {
        return O.get("uiid") || null
    }
    ;
    L.setPageType = function(e) {
        o = e
    }
    ;
    L.setPageData = function(e) {
        at = e
    }
    ;
    L.linkSession = function(e) {
        x.lnk = e ? "dsig" : ""
    }
    ;
    L.init = function(aA, aB, e) {
        T("Initialize phase 1 called");
        if (e) {
            x.site = e
        }
        if (document.body) {
            L.init2(aA, aB)
        } else {
            setTimeout(function() {
                L.init(aA, aB)
            }, 25)
        }
    }
    ;
    L.init2 = function(aE, aF) {
        T("Initialize phase 2 called");
        o = aE || null;
        at = aF || {};
        for (var aC = 0; aC < ak.length; aC++) {
            try {
                T("Calling plugin: " + aC);
                ak[aC]();
                T("Done plugin: " + aC)
            } catch (aG) {
                T(aG)
            }
        }
        var aA = u();
        if (S.page_types) {
            for (var aC = 0; aC < S.page_types.length; aC++) {
                var aB = S.page_types[aC];
                var aD = new RegExp(aB.pattern,"g");
                if (aA.match(aD)) {
                    o = aB.type
                }
            }
        }
        w = true;
        this.pageview(aA, o, at);
        I();
        if (typeof window.onOmetriaLoaded === "function") {
            window.onOmetriaLoaded()
        }
    }
    ;
    L._debug = function() {
        var e = {
            sessionId: x.sid,
            cookieId: x.cid,
            userIdentity: x.uiid,
            extra: x
        };
        return e
    }
    ;
    L._log = function() {
        return _log
    }
    ;
    L.observeEmailInputs = function(e) {
        var aA = document.querySelectorAll(e);
        T("Observe email input element " + aA.length + " found " + e);
        for (i = 0; i < aA.length; ++i) {
            aA[i].addEventListener("change", function(aB) {
                ometria.identify(aB.target.value)
            })
        }
    }
    ;
    L.setDebugLogging = function(e) {
        an("OMdebug", "1", e ? 1 : -1);
        location.reload()
    }
    ;
    var aa = function(e) {
        return Object.keys(e).map(function(aA) {
            return encodeURIComponent(aA) + "=" + encodeURIComponent(e[aA])
        })
    };
    L.request = function(aD) {
        try {
            var aA = aD.url;
            var aG = aD.body ? aa(aD.body) : null;
            var aC = aD.headers || [];
            var e = aD.method || "POST";
            var aB = aD.successCallback || function(aI) {
                T(aI)
            }
            ;
            var aE = aD.errorCallback || function(aI) {
                T(aI)
            }
            ;
            var aF = new XMLHttpRequest();
            aF.onload = function() {
                try {
                    var aI = JSON.parse(aF.response);
                    if (aF.status !== 200) {
                        aE(aI);
                        return
                    }
                    if (aB) {
                        aB(aI)
                    }
                } catch (aJ) {
                    aE(aJ)
                }
            }
            ;
            aF.onerror = function() {
                var aI = JSON.parse(aF.response);
                if (aE) {
                    aE(aI)
                }
            }
            ;
            aF.open(e, aA);
            aF.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            aC.push({
                "X-Ometria-Account": S.key
            });
            aC.forEach(function(aJ) {
                var aI = Object.keys(aJ)[0];
                aF.setRequestHeader(aI, aJ[aI])
            });
            aF.send(aG)
        } catch (aH) {
            aE(aH)
        }
    }
    ;
    L.ajaxFormSubmit = function(e, aD, aA) {
        var aC = document.querySelectorAll(e)[0];
        var aB = "https://api.ometria.com/forms/signup/ajax";
        aC.addEventListener("submit", function(aG) {
            aG.preventDefault();
            var aF = new XMLHttpRequest();
            var aE = aG.target.elements;
            var aH = Object.keys(aE).map(function(aI) {
                return encodeURIComponent(aE[aI].name) + "=" + encodeURIComponent(aE[aI].value)
            });
            urlEncodedData = aH.join("&").replace(/%20/g, "+");
            aF.onload = function() {
                var aI = JSON.parse(aF.response);
                if (aD) {
                    aD(aI)
                }
            }
            ;
            aF.onerror = function() {
                var aI = JSON.parse(aF.response);
                if (aA) {
                    aA(aI)
                }
            }
            ;
            aF.open("POST", aB);
            aF.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            aF.send(urlEncodedData)
        })
    }
    ;
    if (typeof window.ometria == "undefined") {
        window.ometria = {}
    }
    p(window.ometria, L);
    if (j) {
        ometria.init()
    } else {
        if (typeof ometria.onLoad == "function") {
            ometria.onLoad()
        }
    }
}
)();
