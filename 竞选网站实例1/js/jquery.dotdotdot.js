;
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.jquery_dotdotdot_js = factory(root.jQuery);
    }
}(this, function(jQuery) {
    /*
     *	jQuery dotdotdot 3.2.2
     *	@requires jQuery 1.7.0 or later
     *
     *	dotdotdot.frebsite.nl
     *
     *	Copyright (c) Fred Heusschen
     *	www.frebsite.nl
     *
     *	License: CC-BY-NC-4.0
     *	http://creativecommons.org/licenses/by-nc/4.0/
     */
    ! function(t) {
        "use strict";

        function e() {
            h = t(window), s = {}, o = {}, r = {}, t.each([s, o, r], function(t, e) {
                e.add = function(t) {
                    t = t.split(" ");
                    for (var i = 0, n = t.length; i < n; i++) e[t[i]] = e.ddd(t[i])
                }
            }), s.ddd = function(t) {
                return "ddd-" + t
            }, s.add("truncated keep"), o.ddd = function(t) {
                return "ddd-" + t
            }, r.ddd = function(t) {
                return t + ".ddd"
            }, r.add("resize"), e = function() {}
        }
        var i = "dotdotdot",
            n = "3.2.2";
        if (!(t[i] && t[i].version > n)) {
            t[i] = function(t, e) {
                this.$dot = t, this.api = ["getInstance", "truncate", "restore", "destroy", "watch", "unwatch"], this.opts = e;
                var n = this.$dot.data(i);
                return n && n.destroy(), this.init(), this.truncate(), this.opts.watch && this.watch(), this
            }, t[i].version = n, t[i].uniqueId = 0, t[i].defaults = {
                ellipsis: "… ",
                callback: function(t) {},
                truncate: "word",
                tolerance: 0,
                keep: null,
                watch: "window",
                height: null
            }, t[i].prototype = {
                init: function() {
                    this.watchTimeout = null, this.watchInterval = null, this.uniqueId = t[i].uniqueId++, this.originalStyle = this.$dot.attr("style") || "", this.originalContent = this._getOriginalContent(), "break-word" !== this.$dot.css("word-wrap") && this.$dot.css("word-wrap", "break-word"), "nowrap" === this.$dot.css("white-space") && this.$dot.css("white-space", "normal"), null === this.opts.height && (this.opts.height = this._getMaxHeight()), "string" == typeof this.opts.ellipsis && (this.opts.ellipsis = document.createTextNode(this.opts.ellipsis))
                },
                getInstance: function() {
                    return this
                },
                truncate: function() {
                    this.$inner = this.$dot.wrapInner("<div />").children().css({
                        display: "block",
                        height: "auto",
                        width: "auto",
                        border: "none",
                        padding: 0,
                        margin: 0
                    }), this.$inner.empty().append(this.originalContent.clone(!0)), this.maxHeight = this._getMaxHeight();
                    var t = !1;
                    return this._fits() || (t = !0, this._truncateToNode(this.$inner[0])), this.$dot[t ? "addClass" : "removeClass"](s.truncated), this.$inner.replaceWith(this.$inner.contents()), this.$inner = null, this.opts.callback.call(this.$dot[0], t), t
                },
                restore: function() {
                    this.unwatch(), this.$dot.empty().append(this.originalContent).attr("style", this.originalStyle).removeClass(s.truncated)
                },
                destroy: function() {
                    this.restore(), this.$dot.data(i, null)
                },
                watch: function() {
                    var t = this;
                    this.unwatch();
                    var e = {};
                    "window" == this.opts.watch ? h.on(r.resize + t.uniqueId, function(i) {
                        t.watchTimeout && clearTimeout(t.watchTimeout), t.watchTimeout = setTimeout(function() {
                            e = t._watchSizes(e, h, "width", "height")
                        }, 100)
                    }) : this.watchInterval = setInterval(function() {
                        e = t._watchSizes(e, t.$dot, "innerWidth", "innerHeight")
                    }, 500)
                },
                unwatch: function() {
                    h.off(r.resize + this.uniqueId), this.watchInterval && clearInterval(this.watchInterval), this.watchTimeout && clearTimeout(this.watchTimeout)
                },
                _api: function() {
                    var e = this,
                        i = {};
                    return t.each(this.api, function(t) {
                        var n = this;
                        i[n] = function() {
                            var t = e[n].apply(e, arguments);
                            return "undefined" == typeof t ? i : t
                        }
                    }), i
                },
                _truncateToNode: function(e) {
                    var i = [],
                        n = [];
                    if (t(e).contents().each(function() {
                            var e = t(this);
                            if (!e.hasClass(s.keep)) {
                                var o = document.createComment("");
                                e.replaceWith(o), n.push(this), i.push(o)
                            }
                        }), n.length) {
                        for (var o = 0; o < n.length; o++) {
                            t(i[o]).replaceWith(n[o]), t(n[o]).append(this.opts.ellipsis);
                            var r = this._fits();
                            if (t(this.opts.ellipsis, n[o]).remove(), !r) {
                                if ("node" == this.opts.truncate && o > 1) return void t(n[o - 2]).remove();
                                break
                            }
                        }
                        for (var h = o; h < i.length; h++) t(i[h]).remove();
                        var a = n[Math.max(0, Math.min(o, n.length - 1))];
                        if (1 == a.nodeType) {
                            var d = t("<" + a.nodeName + " />");
                            d.append(this.opts.ellipsis), t(a).replaceWith(d), this._fits() ? d.replaceWith(a) : (d.remove(), a = n[Math.max(0, o - 1)])
                        }
                        1 == a.nodeType ? this._truncateToNode(a) : this._truncateToWord(a)
                    }
                },
                _truncateToWord: function(t) {
                    for (var e = t, i = this, n = this.__getTextContent(e), s = n.indexOf(" ") !== -1 ? " " : "　", o = n.split(s), r = "", h = o.length; h >= 0; h--)
                        if (r = o.slice(0, h).join(s), i.__setTextContent(e, i._addEllipsis(r)), i._fits()) {
                            "letter" == i.opts.truncate && (i.__setTextContent(e, o.slice(0, h + 1).join(s)), i._truncateToLetter(e));
                            break
                        }
                },
                _truncateToLetter: function(t) {
                    for (var e = this, i = this.__getTextContent(t), n = i.split(""), s = "", o = n.length; o >= 0 && (s = n.slice(0, o).join(""), !s.length || (e.__setTextContent(t, e._addEllipsis(s)), !e._fits())); o--);
                },
                _fits: function() {
                    return this.$inner.innerHeight() <= this.maxHeight + this.opts.tolerance
                },
                _addEllipsis: function(e) {
                    for (var i = [" ", "　", ",", ";", ".", "!", "?"]; t.inArray(e.slice(-1), i) > -1;) e = e.slice(0, -1);
                    return e += this.__getTextContent(this.opts.ellipsis)
                },
                _getOriginalContent: function() {
                    var e = this;
                    return this.$dot.find("script, style").addClass(s.keep), this.opts.keep && this.$dot.find(this.opts.keep).addClass(s.keep), this.$dot.find("*").not("." + s.keep).add(this.$dot).contents().each(function() {
                        var i = this,
                            n = t(this);
                        if (3 == i.nodeType) {
                            if ("" == t.trim(e.__getTextContent(i))) {
                                if (n.parent().is("table, thead, tbody, tfoot, tr, dl, ul, ol, video")) return void n.remove();
                                if (n.prev().is("div, p, table, td, td, dt, dd, li")) return void n.remove();
                                if (n.next().is("div, p, table, td, td, dt, dd, li")) return void n.remove();
                                if (!n.prev().length) return void n.remove();
                                if (!n.next().length) return void n.remove()
                            }
                        } else 8 == i.nodeType && n.remove()
                    }), this.$dot.contents()
                },
                _getMaxHeight: function() {
                    if ("number" == typeof this.opts.height) return this.opts.height;
                    for (var t = ["maxHeight", "height"], e = 0, i = 0; i < t.length; i++)
                        if (e = window.getComputedStyle(this.$dot[0])[t[i]], "px" == e.slice(-2)) {
                            e = parseFloat(e);
                            break
                        }
                    var t = [];
                    switch (this.$dot.css("boxSizing")) {
                        case "border-box":
                            t.push("borderTopWidth"), t.push("borderBottomWidth");
                        case "padding-box":
                            t.push("paddingTop"), t.push("paddingBottom")
                    }
                    for (var i = 0; i < t.length; i++) {
                        var n = window.getComputedStyle(this.$dot[0])[t[i]];
                        "px" == n.slice(-2) && (e -= parseFloat(n))
                    }
                    return Math.max(e, 0)
                },
                _watchSizes: function(t, e, i, n) {
                    if (this.$dot.is(":visible")) {
                        var s = {
                            width: e[i](),
                            height: e[n]()
                        };
                        return t.width == s.width && t.height == s.height || this.truncate(), s
                    }
                    return t
                },
                __getTextContent: function(t) {
                    for (var e = ["nodeValue", "textContent", "innerText"], i = 0; i < e.length; i++)
                        if ("string" == typeof t[e[i]]) return t[e[i]];
                    return ""
                },
                __setTextContent: function(t, e) {
                    for (var i = ["nodeValue", "textContent", "innerText"], n = 0; n < i.length; n++) t[i[n]] = e
                }
            }, t.fn[i] = function(n) {
                return e(), n = t.extend(!0, {}, t[i].defaults, n), this.each(function() {
                    t(this).data(i, new t[i](t(this), n)._api())
                })
            };
            var s, o, r, h
        }
    }(jQuery);
    return true;
}));