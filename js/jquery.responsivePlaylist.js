(function (e, t, n, r) {
	function a(e) {
		if (e.length <= 8) {
			return false
		}
		return true
	}

	function f(e) {
		var t = null;
		if (e.indexOf("vim") !== -1) {
			var n = /vimeo.*\/(\d+)/i.exec(e);
			if (n) {
				t = n[1]
			}
		} else if (e.indexOf("yout") !== -1) {
			var r = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
			var n = e.match(r);
			if (n && n[2].length == 11) {
				t = n[2]
			}
		}
		return t
	}

	function l(t) {
		var n = t.link,
			r = t.url;
		e.ajax({
			url: r,
			dataType: "jsonp",
			success: function (e) {
				var t = e[0].title;
				var r = "by " + e[0].user_name;
				if (t.length > 50) {
					n.find(".rp_title").html(t.substr(0, 50) + "&hellip;")
				} else {
					n.find(".rp_title").html(t)
				}
				n.find(".rp_author").html(r);
				n.find(".rp_thumbnail img").attr("src", e[0].thumbnail_small)
			}
		})
	}

	function c(t) {
		var n = t.link,
			r = t.url;
		e.ajax({
			url: r,
			dataType: "jsonp",
			success: function (e) {
				var t = e.items[0].snippet.title;
				var r = "by " + e.items[0].snippet.channelTitle;
				if (t.length > 50) {
					n.find(".rp_title").html(t.substr(0, 50) + "&hellip;")
				} else {
					n.find(".rp_title").html(t)
				}
				n.find(".rp_author").html(r)
			}
		})
	}

	function h(t, n) {
		e.ajax({
			url: "https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=" + t + "&key=AIzaSyCIlwa-7d7qpKS0Nj5vhI7tb-0minC-qZ8",
			dataType: "jsonp",
			success: function (e) {
				n(e.items[0].contentDetails.relatedPlaylists.uploads)
			}
		})
	}

	function p(t, n) {
		e.ajax({
			url: "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=" + t + "&key=AIzaSyCIlwa-7d7qpKS0Nj5vhI7tb-0minC-qZ8",
			dataType: "jsonp",
			success: function (e) {
				n(e.items.reverse())
			}
		})
	}

	function d(t, n) {
		var r, i;
		for (var s = 0, o = t.length; s < o; s++) {
			r = t[s];
			i = r.snippet.resourceId.videoId;
			li = '<li><a href="https://www.youtube.com/watch?v=' + i + '"></a></li>';
			e(li).prependTo("#rp_playlist")
		}
		n()
	}

	function v(t, n) {
		e.ajax({
			url: "http://vimeo.com/api/v2/" + t + "/videos.json",
			dataType: "jsonp",
			success: function (e) {
				n(e.reverse())
			}
		})
	}

	function m(t, n) {
		e.ajax({
			url: "http://vimeo.com/api/v2/album/" + t + "/videos.json",
			dataType: "jsonp",
			success: function (e) {
				n(e.reverse())
			}
		})
	}

	function g(t, n) {
		var r, i;
		for (var s = 0, o = t.length; s < o; s++) {
			r = t[s];
			i = r.id;
			li = '<li><a href="https://www.vimeo.com/' + i + '"></a></li>';
			e(li).prependTo("#rp_playlist")
		}
		n()
	}

	function y(n, r) {
		this.element = n;
		this.options = e.extend({}, u, r);
		this._defaults = u;
		this._name = i;
		this._protocol = this.options.secure === "auto" ? t.location.protocol === "https:" ? "https://" : "http://" : this.options.secure ? "https://" : "http://";
		this.isFirst = true;
		this.init()
	}
	var i = "responsiveplaylist";
	var s, o;
	var u = {
		autoPlayOnLoad: false,
		autoPlay: false,
		allowFullScreen: true,
		deepLinks: true,
		onChange: function () {},
		start: 1,
		youtube: {
			autohide: "2",
			rel: "1",
			theme: "dark",
			color: "white",
			showinfo: "1",
			vq: "medium"
		},
		vimeo: {
			title: "1",
			byline: "1",
			portrait: "1",
			color: "ffffff"
		},
		holderId: "rp_video",
		secure: "auto"
	};
	y.prototype = {
		init: function () {
			var r = this;
			var i = r.options.deepLinks && t.location.hash.indexOf("#video-") !== -1 ? t.location.hash : null;
			var s = function () {
				e(r.element).find("li").each(function (t) {
					var n = e(this),
						s = t + 1;
					n.find("a:first").each(function () {
						var t = e(this),
							i = f(t.attr("href")),
							o = n.text();
						t.data("yt-href", t.attr("href"));
						t.attr("href", "#video-" + s);
						t.data("yt-id", i);
						var u, h = "";
						if (!a(i)) {
							l({
								link: t,
								url: r._protocol + "vimeo.com/api/v2/video/" + i + ".json"
							})
						} else {
							c({
								link: t,
								url: "https://www.googleapis.com/youtube/v3/videos?part=id%2Csnippet%2Cstatistics&id=" + i + "&key=AIzaSyCIlwa-7d7qpKS0Nj5vhI7tb-0minC-qZ8"
							});
							h = r._protocol + "i.ytimg.com/vi/" + i + "/default.jpg"
						}
						u = '<span class="rp_thumbnail"><img src="' + h + '" alt="' + o + '" /></span><p class="rp_title"></p><p class="rp_author"></p>';
						t.empty().html(u + o).attr("title", o);
						if (!r.options.deepLinks) {
							t.click(function (e) {
								e.preventDefault();
								r.handleClick(t, r.options);
								r.options.onChange.call()
							})
						}
					});
					var o = e(n.children("a")[0]);
					if (i) {
						if (o.attr("href") === i) {
							r.handleClick(o, r.options)
						}
					} else if (s === r.options.start) {
						r.handleClick(o, r.options)
					}
				});
				if (r.options.deepLinks) {
					e(t).bind("hashchange", function (n) {
						var i = t.location.hash;
						var s = e(r.element).find('a[href="' + i + '"]');
						if (s.length > 0) {
							r.handleClick(s, r.options)
						} else if (i === "") {
							r.handleClick(e(r.element).find("a:first"), r.options)
						}
					})
				}
				var s = n.createElement("div"),
					o = n.getElementsByTagName("base")[0] || n.getElementsByTagName("script")[0];
				s.innerHTML = "&shy;<style> iframe { visibility: hidden; } </style>";
				o.parentNode.insertBefore(s, o);
				t.onload = function () {
					s.parentNode.removeChild(s)
				}
			};
			var o = function (e) {
				p(r.options.youtubePlaylist, function (t) {
					d(t, e)
				})
			};
			var u = function (e) {
				m(r.options.vimeoAlbum, function (t) {
					g(t, e)
				})
			};
			var y = function (e) {
				h(r.options.youtubeUsername, function (t) {
					p(t, function (t) {
						d(t, e)
					})
				})
			};
			var b = function (e) {
				v(r.options.vimeoUsername, function (t) {
					g(t, e)
				})
			};
			var w = [];
			if (r.options.vimeoAlbum) w.push(u);
			if (r.options.youtubePlaylist) w.push(o);
			if (r.options.vimeoUsername) w.push(b);
			if (r.options.youtubeUsername) w.push(y);
			w.push(s);
			var E = function (e, t) {
				if (!t) t = 0;
				e[t].call(this, function () {
					if (t + 1 < e.length) {
						E(e, t + 1)
					}
				})
			};
			E(w)
		},
		getEmbedCode: function (e, t) {
			if (!a(t)) {
				var n = "";
				n += '<iframe id="vimeoiframe"';
				n += ' src="' + this._protocol + "player.vimeo.com/video/" + t;
				n += "?";
				n += e.autoPlayOnLoad ? "autoplay=1" : "autoplay=0";
				n += "&title=" + e.vimeo.title;
				n += "&byline=" + e.vimeo.byline;
				n += "&portrait=" + e.vimeo.portrait;
				n += "&color=" + e.vimeo.color;
				n += '&api=1&player_id=vimeoiframe" ';
				if (e.allowFullScreen) {
					n += " webkitAllowFullScreen mozallowfullscreen allowFullScreen "
				}
				n += ' type="text/html" frameborder="0" ></iframe>'
			} else {
				var n = "";
				n += '<iframe id="youtube-iframe"';
				n += ' src="' + this._protocol + "www.youtube.com/embed/" + t;
				n += "?";
				n += e.autoPlayOnLoad ? "autoplay=1" : "autoplay=0";
				n += "&autohide=" + e.youtube.autohide;
				n += "&rel=" + e.youtube.rel;
				n += "&theme=" + e.youtube.theme;
				n += "&color=" + e.youtube.color;
				n += "&showinfo=" + e.youtube.showinfo;
				n += "&vq=" + e.youtube.vq;
				n += '&enablejsapi=1" ';
				if (e.allowFullScreen) {
					n += " webkitAllowFullScreen mozallowfullscreen allowFullScreen "
				}
				n += ' frameborder="0" ></iframe>'
			}
			return n
		},
		handleClick: function (e, t) {
			t.onChange.call();
			return this.handleVideoClick(e, t)
		},
		handleVideoClick: function (t, n) {
			var r = this;
			var i = n.holder ? n.holder : e("#" + n.holderId);
			i.html(r.getEmbedCode(r.options, t.data("yt-id")));
			t.parent().parent("ul").find("li.rp_currentVideo").removeClass("rp_currentVideo");
			t.parent("li").addClass("rp_currentVideo");
			if (r.options.autoPlayOnLoad && r.isFirst) {
				r.autoPlayVideo(t)
			} else if (r.options.autoPlay && !r.isFirst) {
				r.autoPlayVideo(t)
			}
			r.isFirst = false;
			return false
		},
		autoPlayVideo: function (t) {
			var n = this;
			if (a(t.data("yt-id"))) {
				var r = function (t) {
					if (t.data === 0) {
						n.handleClick(e(".rp_currentVideo").next("li").children("a"), n.options)
					}
				};
				var i = function (e) {
					s.playVideo()
				};
				yt_int = setInterval(function () {
					if (typeof YT === "object") {
						s = new YT.Player("youtube-iframe", {
							events: {
								onReady: i,
								onStateChange: r
							}
						});
						clearInterval(yt_int)
					}
				}, 500)
			} else {
				function u(t) {
					n.handleClick(e(".rp_currentVideo").next("li").children("a"), n.options)
				}
				var f = e("#vimeoiframe")[0];
				o = $f(f);
				o.addEvent("ready", function () {
					o.api("play");
					o.addEvent("finish", u)
				})
			}
		}
	};
	e.fn[i] = function (t) {
		return this.each(function () {
			if (!e.data(this, "plugin_" + i)) {
				e.data(this, "plugin_" + i, new y(this, t))
			}
		})
	}
})(jQuery, window, document)