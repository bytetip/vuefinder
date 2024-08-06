var Qo = Object.defineProperty;
var er = (t, e, n) => e in t ? Qo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var _s = (t, e, n) => er(t, typeof e != "symbol" ? e + "" : e, n);
import { reactive as yt, watch as He, ref as M, shallowRef as tr, onMounted as xe, onBeforeUnmount as rn, onUpdated as Os, nextTick as ct, computed as rt, inject as re, openBlock as _, createElementBlock as g, withKeys as $t, unref as o, createElementVNode as r, withModifiers as st, renderSlot as Tt, onUnmounted as nr, normalizeClass as ae, toDisplayString as b, createBlock as W, resolveDynamicComponent as Fs, withCtx as Q, createVNode as P, Fragment as ge, renderList as ke, createCommentVNode as q, withDirectives as ue, vModelCheckbox as zt, createTextVNode as J, vModelSelect as An, vModelText as kt, customRef as sr, vShow as Ue, isRef as or, TransitionGroup as rr, normalizeStyle as an, mergeModels as ar, useModel as Hs, resolveComponent as lr, provide as ir, Transition as cr } from "vue";
import dr from "mitt";
import ur from "dragselect";
import _r from "@uppy/core";
import vr from "@uppy/xhr-upload";
import fr from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import mr from "cropperjs";
var Ls;
const $n = (Ls = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Ls.getAttribute("content");
class pr {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    _s(this, "config");
    this.config = e;
  }
  /** @type {RequestConfig} */
  get config() {
    return this.config;
  }
  /**
   * Transform request params
   * @param {Object} input
   * @param {String} input.url
   * @param {'get'|'post'|'put'|'patch'|'delete'} input.method
   * @param {Record<String,String>=} input.headers
   * @param {Record<String,?String>=} input.params
   * @param {Record<String,?String>|FormData=} input.body
   * @return {RequestTransformResultInternal}
   */
  transformRequestParams(e) {
    const n = this.config, a = {};
    $n != null && $n !== "" && (a[n.xsrfHeaderName] = $n);
    const s = Object.assign({}, n.headers, a, e.headers), c = Object.assign({}, n.params, e.params), i = e.body, d = n.baseUrl + e.url, l = e.method;
    let u;
    l !== "get" && (i instanceof FormData ? (u = i, n.body != null && Object.entries(this.config.body).forEach(([v, p]) => {
      u.append(v, p);
    })) : (u = { ...i }, n.body != null && Object.assign(u, this.config.body)));
    const f = {
      url: d,
      method: l,
      headers: s,
      params: c,
      body: u
    };
    if (n.transformRequest != null) {
      const v = n.transformRequest({
        url: d,
        method: l,
        headers: s,
        params: c,
        body: u
      });
      v.url != null && (f.url = v.url), v.method != null && (f.method = v.method), v.params != null && (f.params = v.params ?? {}), v.headers != null && (f.headers = v.headers ?? {}), v.body != null && (f.body = v.body);
    }
    return f;
  }
  /**
   * Get download url
   * @param {String} adapter
   * @param {String} node
   * @param {String} node.path
   * @param {String=} node.url
   * @return {String}
   */
  getDownloadUrl(e, n) {
    if (n.url != null)
      return n.url;
    const a = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "download", adapter: e, path: n.path }
    });
    return a.url + "?" + new URLSearchParams(a.params).toString();
  }
  /**
   * Get preview url
   * @param {String} adapter
   * @param {String} node
   * @param {String} node.path
   * @param {String=} node.url
   * @return {String}
   */
  getPreviewUrl(e, n) {
    if (n.url != null)
      return n.url;
    const a = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "preview", adapter: e, path: n.path }
    });
    return a.url + "?" + new URLSearchParams(a.params).toString();
  }
  /**
   * Send request
   * @param {Object} input
   * @param {String} input.url
   * @param {'get'|'post'|'put'|'patch'|'delete'} input.method
   * @param {Record<String,String>=} input.headers
   * @param {Record<String,?String>=} input.params
   * @param {(Record<String,?String>|FormData|null)=} input.body
   * @param {'arrayBuffer'|'blob'|'json'|'text'=} input.responseType
   * @param {AbortSignal=} input.abortSignal
   * @returns {Promise<(ArrayBuffer|Blob|Record<String,?String>|String|null)>}
   * @throws {Record<String,?String>|null} resp json error
   */
  async send(e) {
    const n = this.transformRequestParams(e), a = e.responseType || "json", s = {
      method: e.method,
      headers: n.headers,
      signal: e.abortSignal
    }, c = n.url + "?" + new URLSearchParams(n.params);
    if (n.method !== "get" && n.body != null) {
      let d;
      n.body instanceof FormData ? d = e.body : (d = JSON.stringify(n.body), s.headers["Content-Type"] = "application/json"), s.body = d;
    }
    const i = await fetch(c, s);
    if (i.ok)
      return await i[a]();
    throw await i.json();
  }
}
function hr(t) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token"
  };
  return typeof t == "string" ? Object.assign(e, { baseUrl: t }) : Object.assign(e, t), new pr(e);
}
function gr(t) {
  let e = localStorage.getItem(t + "_storage");
  const n = yt(JSON.parse(e ?? "{}"));
  He(n, a);
  function a() {
    Object.keys(n).length ? localStorage.setItem(t + "_storage", JSON.stringify(n)) : localStorage.removeItem(t + "_storage");
  }
  function s(l, u) {
    n[l] = u;
  }
  function c(l) {
    delete n[l];
  }
  function i() {
    Object.keys(n).map((l) => c(l));
  }
  return { getStore: (l, u = null) => n.hasOwnProperty(l) ? n[l] : u, setStore: s, removeStore: c, clearStore: i };
}
async function br(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function wr(t, e, n, a) {
  const { getStore: s, setStore: c } = t, i = M({}), d = M(s("locale", e)), l = (v, p = e) => {
    br(v, a).then((m) => {
      i.value = m, c("locale", v), d.value = v, c("translations", m), Object.values(a).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + v }), n.emit("vf-language-saved"));
    }).catch((m) => {
      p ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), l(p, null)) : n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  He(d, (v) => {
    l(v);
  }), !s("locale") && !a.length ? l(e) : i.value = s("translations");
  const u = (v, ...p) => p.length ? u(v = v.replace("%s", p.shift()), ...p) : v;
  function f(v, ...p) {
    return i.value && i.value.hasOwnProperty(v) ? u(i.value[v], ...p) : u(v, ...p);
  }
  return yt({ t: f, locale: d });
}
const de = {
  EDIT: "edit",
  NEW_FILE: "newfile",
  NEW_FOLDER: "newfolder",
  PREVIEW: "preview",
  ARCHIVE: "archive",
  UNARCHIVE: "unarchive",
  SEARCH: "search",
  RENAME: "rename",
  UPLOAD: "upload",
  DELETE: "delete",
  FULL_SCREEN: "fullscreen",
  DOWNLOAD: "download",
  LANGUAGE: "language"
}, yr = Object.values(de), $r = "2.5.15";
function Rs(t, e, n, a, s) {
  return (e = Math, n = e.log, a = 1024, s = n(t) / n(a) | 0, t / e.pow(a, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function Bs(t, e, n, a, s) {
  return (e = Math, n = e.log, a = 1e3, s = n(t) / n(a) | 0, t / e.pow(a, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
function kr(t) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, a = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  return a[1] * Math.pow(1024, e[a[2].toLowerCase()]);
}
const tt = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function xr(t, e) {
  const n = M(tt.SYSTEM), a = M(tt.LIGHT);
  n.value = t.getStore("theme", e ?? tt.SYSTEM);
  const s = window.matchMedia("(prefers-color-scheme: dark)"), c = (i) => {
    n.value === tt.DARK || n.value === tt.SYSTEM && i.matches ? a.value = tt.DARK : a.value = tt.LIGHT;
  };
  return c(s), s.addEventListener("change", c), {
    /**
     * @type {import('vue').Ref<Theme>}
     */
    value: n,
    /**
     * @type {import('vue').Ref<Theme>}
     */
    actualValue: a,
    /**
     * @param {Theme} value
     */
    set(i) {
      n.value = i, i !== tt.SYSTEM ? t.setStore("theme", i) : t.removeStore("theme"), c(s);
    }
  };
}
function Sr() {
  const t = tr(null), e = M(!1), n = M();
  return { visible: e, type: t, data: n, open: (c, i = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = c, n.value = i;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, t.value = null;
  } };
}
/*!
 * OverlayScrollbars
 * Version: 2.10.0
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
const De = (t, e) => {
  const { o: n, i: a, u: s } = t;
  let c = n, i;
  const d = (f, v) => {
    const p = c, m = f, h = v || (a ? !a(p, m) : p !== m);
    return (h || s) && (c = m, i = p), [c, h, i];
  };
  return [e ? (f) => d(e(c, i), f) : d, (f) => [c, !!f, i]];
}, Cr = typeof window < "u" && typeof HTMLElement < "u" && !!window.document, Me = Cr ? window : {}, Is = Math.max, Er = Math.min, Tn = Math.round, Jt = Math.abs, vs = Math.sign, Ns = Me.cancelAnimationFrame, Gn = Me.requestAnimationFrame, Zt = Me.setTimeout, Mn = Me.clearTimeout, ln = (t) => typeof Me[t] < "u" ? Me[t] : void 0, Ar = ln("MutationObserver"), fs = ln("IntersectionObserver"), Qt = ln("ResizeObserver"), Kt = ln("ScrollTimeline"), Kn = (t) => t === void 0, cn = (t) => t === null, ze = (t) => typeof t == "number", Lt = (t) => typeof t == "string", Wn = (t) => typeof t == "boolean", Re = (t) => typeof t == "function", Pe = (t) => Array.isArray(t), en = (t) => typeof t == "object" && !Pe(t) && !cn(t), Yn = (t) => {
  const e = !!t && t.length, n = ze(e) && e > -1 && e % 1 == 0;
  return Pe(t) || !Re(t) && n ? e > 0 && en(t) ? e - 1 in t : !0 : !1;
}, tn = (t) => !!t && t.constructor === Object, nn = (t) => t instanceof HTMLElement, dn = (t) => t instanceof Element;
function le(t, e) {
  if (Yn(t))
    for (let n = 0; n < t.length && e(t[n], n, t) !== !1; n++)
      ;
  else t && le(Object.keys(t), (n) => e(t[n], n, t));
  return t;
}
const Us = (t, e) => t.indexOf(e) >= 0, Mt = (t, e) => t.concat(e), me = (t, e, n) => (!Lt(e) && Yn(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), at = (t) => Array.from(t || []), Xn = (t) => Pe(t) ? t : !Lt(t) && Yn(t) ? at(t) : [t], Dn = (t) => !!t && !t.length, Vn = (t) => at(new Set(t)), Oe = (t, e, n) => {
  le(t, (s) => s ? s.apply(void 0, e || []) : !0), !n && (t.length = 0);
}, qs = "paddingTop", zs = "paddingRight", Ps = "paddingLeft", js = "paddingBottom", Gs = "marginLeft", Ks = "marginRight", Ws = "marginBottom", Ys = "overflowX", Xs = "overflowY", un = "width", _n = "height", nt = "visible", it = "hidden", gt = "scroll", Tr = (t) => {
  const e = String(t || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, vn = (t, e, n, a) => {
  if (t && e) {
    let s = !0;
    return le(n, (c) => {
      const i = t[c], d = e[c];
      i !== d && (s = !1);
    }), s;
  }
  return !1;
}, Js = (t, e) => vn(t, e, ["w", "h"]), Wt = (t, e) => vn(t, e, ["x", "y"]), Mr = (t, e) => vn(t, e, ["t", "r", "b", "l"]), dt = () => {
}, X = (t, ...e) => t.bind(0, ...e), ft = (t) => {
  let e;
  const n = t ? Zt : Gn, a = t ? Mn : Ns;
  return [(s) => {
    a(e), e = n(() => s(), Re(t) ? t() : t);
  }, () => a(e)];
}, Ln = (t, e) => {
  const { _: n, v: a, p: s, S: c } = e || {};
  let i, d, l, u, f = dt;
  const v = function(y) {
    f(), Mn(i), u = i = d = void 0, f = dt, t.apply(this, y);
  }, p = ($) => c && d ? c(d, $) : $, m = () => {
    f !== dt && v(p(l) || l);
  }, h = function() {
    const y = at(arguments), D = Re(n) ? n() : n;
    if (ze(D) && D >= 0) {
      const R = Re(a) ? a() : a, w = ze(R) && R >= 0, V = D > 0 ? Zt : Gn, z = D > 0 ? Mn : Ns, C = p(y) || y, T = v.bind(0, C);
      let S;
      f(), s && !u ? (T(), u = !0, S = V(() => u = void 0, D)) : (S = V(T, D), w && !i && (i = Zt(m, R))), f = () => z(S), d = l = C;
    } else
      v(y);
  };
  return h.m = m, h;
}, Zs = (t, e) => Object.prototype.hasOwnProperty.call(t, e), Be = (t) => t ? Object.keys(t) : [], oe = (t, e, n, a, s, c, i) => {
  const d = [e, n, a, s, c, i];
  return (typeof t != "object" || cn(t)) && !Re(t) && (t = {}), le(d, (l) => {
    le(l, (u, f) => {
      const v = l[f];
      if (t === v)
        return !0;
      const p = Pe(v);
      if (v && tn(v)) {
        const m = t[f];
        let h = m;
        p && !Pe(m) ? h = [] : !p && !tn(m) && (h = {}), t[f] = oe(h, v);
      } else
        t[f] = p ? v.slice() : v;
    });
  }), t;
}, Qs = (t, e) => le(oe({}, t), (n, a, s) => {
  n === void 0 ? delete s[a] : n && tn(n) && (s[a] = Qs(n));
}), Jn = (t) => !Be(t).length, eo = (t, e, n) => Is(t, Er(e, n)), ut = (t) => Vn((Pe(t) ? t : (t || "").split(" ")).filter((e) => e)), Zn = (t, e) => t && t.getAttribute(e), ms = (t, e) => t && t.hasAttribute(e), Xe = (t, e, n) => {
  le(ut(e), (a) => {
    t && t.setAttribute(a, String(n || ""));
  });
}, Ne = (t, e) => {
  le(ut(e), (n) => t && t.removeAttribute(n));
}, fn = (t, e) => {
  const n = ut(Zn(t, e)), a = X(Xe, t, e), s = (c, i) => {
    const d = new Set(n);
    return le(ut(c), (l) => {
      d[i](l);
    }), at(d).join(" ");
  };
  return {
    O: (c) => a(s(c, "delete")),
    $: (c) => a(s(c, "add")),
    C: (c) => {
      const i = ut(c);
      return i.reduce((d, l) => d && n.includes(l), i.length > 0);
    }
  };
}, to = (t, e, n) => (fn(t, e).O(n), X(Qn, t, e, n)), Qn = (t, e, n) => (fn(t, e).$(n), X(to, t, e, n)), sn = (t, e, n, a) => (a ? Qn : to)(t, e, n), es = (t, e, n) => fn(t, e).C(n), no = (t) => fn(t, "class"), so = (t, e) => {
  no(t).O(e);
}, ts = (t, e) => (no(t).$(e), X(so, t, e)), oo = (t, e) => {
  const n = e ? dn(e) && e : document;
  return n ? at(n.querySelectorAll(t)) : [];
}, Dr = (t, e) => {
  const n = e ? dn(e) && e : document;
  return n && n.querySelector(t);
}, On = (t, e) => dn(t) && t.matches(e), ro = (t) => On(t, "body"), Fn = (t) => t ? at(t.childNodes) : [], Dt = (t) => t && t.parentElement, mt = (t, e) => dn(t) && t.closest(e), Hn = (t) => document.activeElement, Vr = (t, e, n) => {
  const a = mt(t, e), s = t && Dr(n, a), c = mt(s, e) === a;
  return a && s ? a === t || s === t || c && mt(mt(t, n), e) !== a : !1;
}, bt = (t) => {
  le(Xn(t), (e) => {
    const n = Dt(e);
    e && n && n.removeChild(e);
  });
}, Ve = (t, e) => X(bt, t && e && le(Xn(e), (n) => {
  n && t.appendChild(n);
})), pt = (t) => {
  const e = document.createElement("div");
  return Xe(e, "class", t), e;
}, ao = (t) => {
  const e = pt();
  return e.innerHTML = t.trim(), le(Fn(e), (n) => bt(n));
}, ps = (t, e) => t.getPropertyValue(e) || t[e] || "", lo = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, Pt = (t) => lo(parseFloat(t || "")), Rn = (t) => Math.round(t * 1e4) / 1e4, io = (t) => `${Rn(lo(t))}px`;
function Vt(t, e) {
  t && e && le(e, (n, a) => {
    try {
      const s = t.style, c = cn(n) || Wn(n) ? "" : ze(n) ? io(n) : n;
      a.indexOf("--") === 0 ? s.setProperty(a, c) : s[a] = c;
    } catch {
    }
  });
}
function Ze(t, e, n) {
  const a = Lt(e);
  let s = a ? "" : {};
  if (t) {
    const c = Me.getComputedStyle(t, n) || t.style;
    s = a ? ps(c, e) : at(e).reduce((i, d) => (i[d] = ps(c, d), i), s);
  }
  return s;
}
const hs = (t, e, n) => {
  const a = e ? `${e}-` : "", s = n ? `-${n}` : "", c = `${a}top${s}`, i = `${a}right${s}`, d = `${a}bottom${s}`, l = `${a}left${s}`, u = Ze(t, [c, i, d, l]);
  return {
    t: Pt(u[c]),
    r: Pt(u[i]),
    b: Pt(u[d]),
    l: Pt(u[l])
  };
}, Lr = (t, e) => `translate${en(t) ? `(${t.x},${t.y})` : `Y(${t})`}`, Or = (t) => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length), Fr = {
  w: 0,
  h: 0
}, mn = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : Fr, Hr = (t) => mn("inner", t || Me), ht = X(mn, "offset"), co = X(mn, "client"), on = X(mn, "scroll"), ns = (t) => {
  const e = parseFloat(Ze(t, un)) || 0, n = parseFloat(Ze(t, _n)) || 0;
  return {
    w: e - Tn(e),
    h: n - Tn(n)
  };
}, kn = (t) => t.getBoundingClientRect(), Rr = (t) => !!t && Or(t), Bn = (t) => !!(t && (t[_n] || t[un])), uo = (t, e) => {
  const n = Bn(t);
  return !Bn(e) && n;
}, gs = (t, e, n, a) => {
  le(ut(e), (s) => {
    t && t.removeEventListener(s, n, a);
  });
}, _e = (t, e, n, a) => {
  var s;
  const c = (s = a && a.H) != null ? s : !0, i = a && a.I || !1, d = a && a.A || !1, l = {
    passive: c,
    capture: i
  };
  return X(Oe, ut(e).map((u) => {
    const f = d ? (v) => {
      gs(t, u, f, i), n && n(v);
    } : n;
    return t && t.addEventListener(u, f, l), X(gs, t, u, f, i);
  }));
}, _o = (t) => t.stopPropagation(), In = (t) => t.preventDefault(), vo = (t) => _o(t) || In(t), qe = (t, e) => {
  const { x: n, y: a } = ze(e) ? {
    x: e,
    y: e
  } : e || {};
  ze(n) && (t.scrollLeft = n), ze(a) && (t.scrollTop = a);
}, Le = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), fo = () => ({
  D: {
    x: 0,
    y: 0
  },
  M: {
    x: 0,
    y: 0
  }
}), Br = (t, e) => {
  const { D: n, M: a } = t, { w: s, h: c } = e, i = (v, p, m) => {
    let h = vs(v) * m, $ = vs(p) * m;
    if (h === $) {
      const y = Jt(v), D = Jt(p);
      $ = y > D ? 0 : $, h = y < D ? 0 : h;
    }
    return h = h === $ ? 0 : h, [h + 0, $ + 0];
  }, [d, l] = i(n.x, a.x, s), [u, f] = i(n.y, a.y, c);
  return {
    D: {
      x: d,
      y: u
    },
    M: {
      x: l,
      y: f
    }
  };
}, bs = ({ D: t, M: e }) => {
  const n = (a, s) => a === 0 && a <= s;
  return {
    x: n(t.x, e.x),
    y: n(t.y, e.y)
  };
}, ws = ({ D: t, M: e }, n) => {
  const a = (s, c, i) => eo(0, 1, (s - i) / (s - c) || 0);
  return {
    x: a(t.x, e.x, n.x),
    y: a(t.y, e.y, n.y)
  };
}, Nn = (t) => {
  t && t.focus && t.focus({
    preventScroll: !0
  });
}, ys = (t, e) => {
  le(Xn(e), t);
}, Un = (t) => {
  const e = /* @__PURE__ */ new Map(), n = (c, i) => {
    if (c) {
      const d = e.get(c);
      ys((l) => {
        d && d[l ? "delete" : "clear"](l);
      }, i);
    } else
      e.forEach((d) => {
        d.clear();
      }), e.clear();
  }, a = (c, i) => {
    if (Lt(c)) {
      const u = e.get(c) || /* @__PURE__ */ new Set();
      return e.set(c, u), ys((f) => {
        Re(f) && u.add(f);
      }, i), X(n, c, i);
    }
    Wn(i) && i && n();
    const d = Be(c), l = [];
    return le(d, (u) => {
      const f = c[u];
      f && me(l, a(u, f));
    }), X(Oe, l);
  }, s = (c, i) => {
    le(at(e.get(c)), (d) => {
      i && !Dn(i) ? d.apply(0, i) : d();
    });
  };
  return a(t || {}), [a, n, s];
}, $s = (t) => JSON.stringify(t, (e, n) => {
  if (Re(n))
    throw 0;
  return n;
}), ks = (t, e) => t ? `${e}`.split(".").reduce((n, a) => n && Zs(n, a) ? n[a] : void 0, t) : void 0, Ir = {
  paddingAbsolute: !1,
  showNativeOverlaidScrollbars: !1,
  update: {
    elementEvents: [["img", "load"]],
    debounce: [0, 33],
    attributes: null,
    ignoreMutation: null
  },
  overflow: {
    x: "scroll",
    y: "scroll"
  },
  scrollbars: {
    theme: "os-theme-dark",
    visibility: "auto",
    autoHide: "never",
    autoHideDelay: 1300,
    autoHideSuspend: !1,
    dragScroll: !0,
    clickScroll: !1,
    pointers: ["mouse", "touch", "pen"]
  }
}, mo = (t, e) => {
  const n = {}, a = Mt(Be(e), Be(t));
  return le(a, (s) => {
    const c = t[s], i = e[s];
    if (en(c) && en(i))
      oe(n[s] = {}, mo(c, i)), Jn(n[s]) && delete n[s];
    else if (Zs(e, s) && i !== c) {
      let d = !0;
      if (Pe(c) || Pe(i))
        try {
          $s(c) === $s(i) && (d = !1);
        } catch {
        }
      d && (n[s] = i);
    }
  }), n;
}, xs = (t, e, n) => (a) => [ks(t, a), n || ks(e, a) !== void 0], xt = "data-overlayscrollbars", Yt = "os-environment", jt = `${Yt}-scrollbar-hidden`, xn = `${xt}-initialize`, Xt = "noClipping", Ss = `${xt}-body`, ot = xt, Nr = "host", Je = `${xt}-viewport`, Ur = Ys, qr = Xs, zr = "arrange", po = "measuring", Pr = "scrolling", ho = "scrollbarHidden", jr = "noContent", qn = `${xt}-padding`, Cs = `${xt}-content`, ss = "os-size-observer", Gr = `${ss}-appear`, Kr = `${ss}-listener`, Wr = "os-trinsic-observer", Yr = "os-theme-none", Fe = "os-scrollbar", Xr = `${Fe}-rtl`, Jr = `${Fe}-horizontal`, Zr = `${Fe}-vertical`, go = `${Fe}-track`, os = `${Fe}-handle`, Qr = `${Fe}-visible`, ea = `${Fe}-cornerless`, Es = `${Fe}-interaction`, As = `${Fe}-unusable`, zn = `${Fe}-auto-hide`, Ts = `${zn}-hidden`, Ms = `${Fe}-wheel`, ta = `${go}-interactive`, na = `${os}-interactive`;
let bo;
const sa = () => bo, oa = (t) => {
  bo = t;
};
let Sn;
const ra = () => {
  const t = (w, V, z) => {
    Ve(document.body, w), Ve(document.body, w);
    const E = co(w), C = ht(w), T = ns(V);
    return z && bt(w), {
      x: C.h - E.h + T.h,
      y: C.w - E.w + T.w
    };
  }, e = (w) => {
    let V = !1;
    const z = ts(w, jt);
    try {
      V = Ze(w, "scrollbar-width") === "none" || Ze(w, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return z(), V;
  }, n = `.${Yt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Yt} div{width:200%;height:200%;margin:10px 0}.${jt}{scrollbar-width:none!important}.${jt}::-webkit-scrollbar,.${jt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, s = ao(`<div class="${Yt}"><div></div><style>${n}</style></div>`)[0], c = s.firstChild, i = s.lastChild, d = sa();
  d && (i.nonce = d);
  const [l, , u] = Un(), [f, v] = De({
    o: t(s, c),
    i: Wt
  }, X(t, s, c, !0)), [p] = v(), m = e(s), h = {
    x: p.x === 0,
    y: p.y === 0
  }, $ = {
    elements: {
      host: null,
      padding: !m,
      viewport: (w) => m && ro(w) && w,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, y = oe({}, Ir), D = X(oe, {}, y), O = X(oe, {}, $), R = {
    T: p,
    k: h,
    R: m,
    V: !!Kt,
    L: X(l, "r"),
    U: O,
    P: (w) => oe($, w) && O(),
    N: D,
    q: (w) => oe(y, w) && D(),
    B: oe({}, $),
    F: oe({}, y)
  };
  if (Ne(s, "style"), bt(s), _e(Me, "resize", () => {
    u("r", []);
  }), Re(Me.matchMedia) && !m && (!h.x || !h.y)) {
    const w = (V) => {
      const z = Me.matchMedia(`(resolution: ${Me.devicePixelRatio}dppx)`);
      _e(z, "change", () => {
        V(), w(V);
      }, {
        A: !0
      });
    };
    w(() => {
      const [V, z] = f();
      oe(R.T, V), u("r", [z]);
    });
  }
  return R;
}, Ge = () => (Sn || (Sn = ra()), Sn), wo = (t, e) => Re(e) ? e.apply(0, t) : e, aa = (t, e, n, a) => {
  const s = Kn(a) ? n : a;
  return wo(t, s) || e.apply(0, t);
}, yo = (t, e, n, a) => {
  const s = Kn(a) ? n : a, c = wo(t, s);
  return !!c && (nn(c) ? c : e.apply(0, t));
}, la = (t, e) => {
  const { nativeScrollbarsOverlaid: n, body: a } = e || {}, { k: s, R: c, U: i } = Ge(), { nativeScrollbarsOverlaid: d, body: l } = i().cancel, u = n ?? d, f = Kn(a) ? l : a, v = (s.x || s.y) && u, p = t && (cn(f) ? !c : f);
  return !!v || !!p;
}, rs = /* @__PURE__ */ new WeakMap(), ia = (t, e) => {
  rs.set(t, e);
}, ca = (t) => {
  rs.delete(t);
}, $o = (t) => rs.get(t), da = (t, e, n) => {
  let a = !1;
  const s = n ? /* @__PURE__ */ new WeakMap() : !1, c = () => {
    a = !0;
  }, i = (d) => {
    if (s && n) {
      const l = n.map((u) => {
        const [f, v] = u || [];
        return [v && f ? (d || oo)(f, t) : [], v];
      });
      le(l, (u) => le(u[0], (f) => {
        const v = u[1], p = s.get(f) || [];
        if (t.contains(f) && v) {
          const h = _e(f, v, ($) => {
            a ? (h(), s.delete(f)) : e($);
          });
          s.set(f, me(p, h));
        } else
          Oe(p), s.delete(f);
      }));
    }
  };
  return i(), [c, i];
}, Ds = (t, e, n, a) => {
  let s = !1;
  const { j: c, X: i, Y: d, W: l, J: u, G: f } = a || {}, v = Ln(() => s && n(!0), {
    _: 33,
    v: 99
  }), [p, m] = da(t, v, d), h = c || [], $ = i || [], y = Mt(h, $), D = (R, w) => {
    if (!Dn(w)) {
      const V = u || dt, z = f || dt, E = [], C = [];
      let T = !1, S = !1;
      if (le(w, (x) => {
        const { attributeName: L, target: B, type: k, oldValue: N, addedNodes: U, removedNodes: ee } = x, se = k === "attributes", ne = k === "childList", pe = t === B, F = se && L, H = F && Zn(B, L || ""), I = Lt(H) ? H : null, j = F && N !== I, A = Us($, L) && j;
        if (e && (ne || !pe)) {
          const K = se && j, G = K && l && On(B, l), te = (G ? !V(B, L, N, I) : !se || K) && !z(x, !!G, t, a);
          le(U, (ie) => me(E, ie)), le(ee, (ie) => me(E, ie)), S = S || te;
        }
        !e && pe && j && !V(B, L, N, I) && (me(C, L), T = T || A);
      }), m((x) => Vn(E).reduce((L, B) => (me(L, oo(x, B)), On(B, x) ? me(L, B) : L), [])), e)
        return !R && S && n(!1), [!1];
      if (!Dn(C) || T) {
        const x = [Vn(C), T];
        return !R && n.apply(0, x), x;
      }
    }
  }, O = new Ar(X(D, !1));
  return [() => (O.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: y,
    subtree: e,
    childList: e,
    characterData: e
  }), s = !0, () => {
    s && (p(), O.disconnect(), s = !1);
  }), () => {
    if (s)
      return v.m(), D(!0, O.takeRecords());
  }];
}, ko = {}, xo = {}, ua = (t) => {
  le(t, (e) => le(e, (n, a) => {
    ko[a] = e[a];
  }));
}, So = (t, e, n) => Be(t).map((a) => {
  const { static: s, instance: c } = t[a], [i, d, l] = n || [], u = n ? c : s;
  if (u) {
    const f = n ? u(i, d, e) : u(e);
    return (l || xo)[a] = f;
  }
}), Ot = (t) => xo[t], _a = "__osOptionsValidationPlugin", va = "__osSizeObserverPlugin", fa = (t, e) => {
  const { k: n } = e, [a, s] = t("showNativeOverlaidScrollbars");
  return [a && n.x && n.y, s];
}, wt = (t) => t.indexOf(nt) === 0, ma = (t, e) => {
  const n = (s, c, i, d) => {
    const l = s === nt ? it : s.replace(`${nt}-`, ""), u = wt(s), f = wt(i);
    return !c && !d ? it : u && f ? nt : u ? c && d ? l : c ? nt : it : c ? l : f && d ? nt : it;
  }, a = {
    x: n(e.x, t.x, e.y, t.y),
    y: n(e.y, t.y, e.x, t.x)
  };
  return {
    K: a,
    Z: {
      x: a.x === gt,
      y: a.y === gt
    }
  };
}, Co = "__osScrollbarsHidingPlugin", pa = "__osClickScrollPlugin", Eo = (t, e, n) => {
  const { dt: a } = n || {}, s = Ot(va), [c] = De({
    o: !1,
    u: !0
  });
  return () => {
    const i = [], l = ao(`<div class="${ss}"><div class="${Kr}"></div></div>`)[0], u = l.firstChild, f = (v) => {
      const p = v instanceof ResizeObserverEntry;
      let m = !1, h = !1;
      if (p) {
        const [$, , y] = c(v.contentRect), D = Bn($);
        h = uo($, y), m = !h && !D;
      } else
        h = v === !0;
      m || e({
        ft: !0,
        dt: h
      });
    };
    if (Qt) {
      const v = new Qt((p) => f(p.pop()));
      v.observe(u), me(i, () => {
        v.disconnect();
      });
    } else if (s) {
      const [v, p] = s(u, f, a);
      me(i, Mt([ts(l, Gr), _e(l, "animationstart", v)], p));
    } else
      return dt;
    return X(Oe, me(i, Ve(t, l)));
  };
}, ha = (t, e) => {
  let n;
  const a = (l) => l.h === 0 || l.isIntersecting || l.intersectionRatio > 0, s = pt(Wr), [c] = De({
    o: !1
  }), i = (l, u) => {
    if (l) {
      const f = c(a(l)), [, v] = f;
      return v && !u && e(f) && [f];
    }
  }, d = (l, u) => i(u.pop(), l);
  return [() => {
    const l = [];
    if (fs)
      n = new fs(X(d, !1), {
        root: t
      }), n.observe(s), me(l, () => {
        n.disconnect();
      });
    else {
      const u = () => {
        const f = ht(s);
        i(f);
      };
      me(l, Eo(s, u)()), u();
    }
    return X(Oe, me(l, Ve(t, s)));
  }, () => n && d(!0, n.takeRecords())];
}, ga = (t, e, n, a) => {
  let s, c, i, d, l, u;
  const f = `[${ot}]`, v = `[${Je}]`, p = ["id", "class", "style", "open", "wrap", "cols", "rows"], { vt: m, ht: h, ot: $, gt: y, bt: D, nt: O, wt: R, yt: w, St: V, Ot: z } = t, E = (A) => Ze(A, "direction") === "rtl", C = {
    $t: !1,
    ct: E(m)
  }, T = Ge(), S = Ot(Co), [x] = De({
    i: Js,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const A = S && S.tt(t, e, C, T, n).ut, G = !(R && O) && es(h, ot, Xt), Y = !O && w(zr), te = Y && Le(y), ie = te && z(), be = V(po, G), ve = Y && A && A()[0], Se = on($), Z = ns($);
    return ve && ve(), qe(y, te), ie && ie(), G && be(), {
      w: Se.w + Z.w,
      h: Se.h + Z.h
    };
  }), L = Ln(a, {
    _: () => s,
    v: () => c,
    S(A, K) {
      const [G] = A, [Y] = K;
      return [Mt(Be(G), Be(Y)).reduce((te, ie) => (te[ie] = G[ie] || Y[ie], te), {})];
    }
  }), B = (A) => {
    const K = E(m);
    oe(A, {
      Ct: u !== K
    }), oe(C, {
      ct: K
    }), u = K;
  }, k = (A, K) => {
    const [G, Y] = A, te = {
      xt: Y
    };
    return oe(C, {
      $t: G
    }), !K && a(te), te;
  }, N = ({ ft: A, dt: K }) => {
    const Y = !(A && !K) && T.R ? L : a, te = {
      ft: A || K,
      dt: K
    };
    B(te), Y(te);
  }, U = (A, K) => {
    const [, G] = x(), Y = {
      Ht: G
    };
    return B(Y), G && !K && (A ? a : L)(Y), Y;
  }, ee = (A, K, G) => {
    const Y = {
      Et: K
    };
    return B(Y), K && !G && L(Y), Y;
  }, [se, ne] = D ? ha(h, k) : [], pe = !O && Eo(h, N, {
    dt: !0
  }), [F, H] = Ds(h, !1, ee, {
    X: p,
    j: p
  }), I = O && Qt && new Qt((A) => {
    const K = A[A.length - 1].contentRect;
    N({
      ft: !0,
      dt: uo(K, l)
    }), l = K;
  }), j = Ln(() => {
    const [, A] = x();
    a({
      Ht: A
    });
  }, {
    _: 222,
    p: !0
  });
  return [() => {
    I && I.observe(h);
    const A = pe && pe(), K = se && se(), G = F(), Y = T.L((te) => {
      te ? L({
        zt: te
      }) : j();
    });
    return () => {
      I && I.disconnect(), A && A(), K && K(), d && d(), G(), Y();
    };
  }, ({ It: A, At: K, Dt: G }) => {
    const Y = {}, [te] = A("update.ignoreMutation"), [ie, be] = A("update.attributes"), [ve, Se] = A("update.elementEvents"), [Z, Ce] = A("update.debounce"), Ae = Se || be, ye = K || G, Ee = (he) => Re(te) && te(he);
    if (Ae) {
      i && i(), d && d();
      const [he, we] = Ds(D || $, !0, U, {
        j: Mt(p, ie || []),
        Y: ve,
        W: f,
        G: (ce, fe) => {
          const { target: $e, attributeName: Te } = ce;
          return (!fe && Te && !O ? Vr($e, f, v) : !1) || !!mt($e, `.${Fe}`) || !!Ee(ce);
        }
      });
      d = he(), i = we;
    }
    if (Ce)
      if (L.m(), Pe(Z)) {
        const he = Z[0], we = Z[1];
        s = ze(he) && he, c = ze(we) && we;
      } else ze(Z) ? (s = Z, c = !1) : (s = !1, c = !1);
    if (ye) {
      const he = H(), we = ne && ne(), ce = i && i();
      he && oe(Y, ee(he[0], he[1], ye)), we && oe(Y, k(we[0], ye)), ce && oe(Y, U(ce[0], ye));
    }
    return B(Y), Y;
  }, C];
}, ba = (t, e, n, a) => {
  const s = "--os-viewport-percent", c = "--os-scroll-percent", i = "--os-scroll-direction", { U: d } = Ge(), { scrollbars: l } = d(), { slot: u } = l, { vt: f, ht: v, ot: p, Mt: m, gt: h, wt: $, nt: y } = e, { scrollbars: D } = m ? {} : t, { slot: O } = D || {}, R = [], w = [], V = [], z = yo([f, v, p], () => y && $ ? f : v, u, O), E = (F) => {
    if (Kt) {
      const H = new Kt({
        source: h,
        axis: F
      });
      return {
        kt: (j) => {
          const A = j.Tt.animate({
            clear: ["left"],
            [c]: [0, 1]
          }, {
            timeline: H
          });
          return () => A.cancel();
        }
      };
    }
  }, C = {
    x: E("x"),
    y: E("y")
  }, T = () => {
    const { Rt: F, Vt: H } = n, I = (j, A) => eo(0, 1, j / (j + A) || 0);
    return {
      x: I(H.x, F.x),
      y: I(H.y, F.y)
    };
  }, S = (F, H, I) => {
    const j = I ? ts : so;
    le(F, (A) => {
      j(A.Tt, H);
    });
  }, x = (F, H) => {
    le(F, (I) => {
      const [j, A] = H(I);
      Vt(j, A);
    });
  }, L = (F, H, I) => {
    const j = Wn(I), A = j ? I : !0, K = j ? !I : !0;
    A && S(w, F, H), K && S(V, F, H);
  }, B = () => {
    const F = T(), H = (I) => (j) => [j.Tt, {
      [s]: Rn(I) + ""
    }];
    x(w, H(F.x)), x(V, H(F.y));
  }, k = () => {
    if (!Kt) {
      const { Lt: F } = n, H = ws(F, Le(h)), I = (j) => (A) => [A.Tt, {
        [c]: Rn(j) + ""
      }];
      x(w, I(H.x)), x(V, I(H.y));
    }
  }, N = () => {
    const { Lt: F } = n, H = bs(F), I = (j) => (A) => [A.Tt, {
      [i]: j ? "0" : "1"
    }];
    x(w, I(H.x)), x(V, I(H.y));
  }, U = () => {
    if (y && !$) {
      const { Rt: F, Lt: H } = n, I = bs(H), j = ws(H, Le(h)), A = (K) => {
        const { Tt: G } = K, Y = Dt(G) === p && G, te = (ie, be, ve) => {
          const Se = be * ie;
          return io(ve ? Se : -Se);
        };
        return [Y, Y && {
          transform: Lr({
            x: te(j.x, F.x, I.x),
            y: te(j.y, F.y, I.y)
          })
        }];
      };
      x(w, A), x(V, A);
    }
  }, ee = (F) => {
    const H = F ? "x" : "y", j = pt(`${Fe} ${F ? Jr : Zr}`), A = pt(go), K = pt(os), G = {
      Tt: j,
      Ut: A,
      Pt: K
    }, Y = C[H];
    return me(F ? w : V, G), me(R, [Ve(j, A), Ve(A, K), X(bt, j), Y && Y.kt(G), a(G, L, F)]), G;
  }, se = X(ee, !0), ne = X(ee, !1), pe = () => (Ve(z, w[0].Tt), Ve(z, V[0].Tt), X(Oe, R));
  return se(), ne(), [{
    Nt: B,
    qt: k,
    Bt: N,
    Ft: U,
    jt: L,
    Xt: {
      Yt: w,
      Wt: se,
      Jt: X(x, w)
    },
    Gt: {
      Yt: V,
      Wt: ne,
      Jt: X(x, V)
    }
  }, pe];
}, wa = (t, e, n, a) => (s, c, i) => {
  const { ht: d, ot: l, nt: u, gt: f, Kt: v, Ot: p } = e, { Tt: m, Ut: h, Pt: $ } = s, [y, D] = ft(333), [O, R] = ft(444), w = (E) => {
    Re(f.scrollBy) && f.scrollBy({
      behavior: "smooth",
      left: E.x,
      top: E.y
    });
  }, V = () => {
    const E = "pointerup pointercancel lostpointercapture", C = `client${i ? "X" : "Y"}`, T = i ? un : _n, S = i ? "left" : "top", x = i ? "w" : "h", L = i ? "x" : "y", B = (N, U) => (ee) => {
      const { Rt: se } = n, ne = ht(h)[x] - ht($)[x], F = U * ee / ne * se[L];
      qe(f, {
        [L]: N + F
      });
    }, k = [];
    return _e(h, "pointerdown", (N) => {
      const U = mt(N.target, `.${os}`) === $, ee = U ? $ : h, se = t.scrollbars, ne = se[U ? "dragScroll" : "clickScroll"], { button: pe, isPrimary: F, pointerType: H } = N, { pointers: I } = se;
      if (pe === 0 && F && ne && (I || []).includes(H)) {
        Oe(k), R();
        const A = !U && (N.shiftKey || ne === "instant"), K = X(kn, $), G = X(kn, h), Y = (fe, $e) => (fe || K())[S] - ($e || G())[S], te = Tn(kn(f)[T]) / ht(f)[x] || 1, ie = B(Le(f)[L], 1 / te), be = N[C], ve = K(), Se = G(), Z = ve[T], Ce = Y(ve, Se) + Z / 2, Ae = be - Se[S], ye = U ? 0 : Ae - Ce, Ee = (fe) => {
          Oe(ce), ee.releasePointerCapture(fe.pointerId);
        }, he = U || A, we = p(), ce = [_e(v, E, Ee), _e(v, "selectstart", (fe) => In(fe), {
          H: !1
        }), _e(h, E, Ee), he && _e(h, "pointermove", (fe) => ie(ye + (fe[C] - be))), he && (() => {
          const fe = Le(f);
          we();
          const $e = Le(f), Te = {
            x: $e.x - fe.x,
            y: $e.y - fe.y
          };
          (Jt(Te.x) > 3 || Jt(Te.y) > 3) && (p(), qe(f, fe), w(Te), O(we));
        })];
        if (ee.setPointerCapture(N.pointerId), A)
          ie(ye);
        else if (!U) {
          const fe = Ot(pa);
          if (fe) {
            const $e = fe(ie, ye, Z, (Te) => {
              Te ? we() : me(ce, we);
            });
            me(ce, $e), me(k, X($e, !0));
          }
        }
      }
    });
  };
  let z = !0;
  return X(Oe, [_e($, "pointermove pointerleave", a), _e(m, "pointerenter", () => {
    c(Es, !0);
  }), _e(m, "pointerleave pointercancel", () => {
    c(Es, !1);
  }), !u && _e(m, "mousedown", () => {
    const E = Hn();
    (ms(E, Je) || ms(E, ot) || E === document.body) && Zt(X(Nn, l), 25);
  }), _e(m, "wheel", (E) => {
    const { deltaX: C, deltaY: T, deltaMode: S } = E;
    z && S === 0 && Dt(m) === d && w({
      x: C,
      y: T
    }), z = !1, c(Ms, !0), y(() => {
      z = !0, c(Ms);
    }), In(E);
  }, {
    H: !1,
    I: !0
  }), _e(m, "pointerdown", X(_e, v, "click", vo, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), V(), D, R]);
}, ya = (t, e, n, a, s, c) => {
  let i, d, l, u, f, v = dt, p = 0;
  const m = (F) => F.pointerType === "mouse", [h, $] = ft(), [y, D] = ft(100), [O, R] = ft(100), [w, V] = ft(() => p), [z, E] = ba(t, s, a, wa(e, s, a, (F) => m(F) && ee())), { ht: C, Qt: T, wt: S } = s, { jt: x, Nt: L, qt: B, Bt: k, Ft: N } = z, U = (F, H) => {
    if (V(), F)
      x(Ts);
    else {
      const I = X(x, Ts, !0);
      p > 0 && !H ? w(I) : I();
    }
  }, ee = () => {
    (l ? !i : !u) && (U(!0), y(() => {
      U(!1);
    }));
  }, se = (F) => {
    x(zn, F, !0), x(zn, F, !1);
  }, ne = (F) => {
    m(F) && (i = l, l && U(!0));
  }, pe = [V, D, R, $, () => v(), _e(C, "pointerover", ne, {
    A: !0
  }), _e(C, "pointerenter", ne), _e(C, "pointerleave", (F) => {
    m(F) && (i = !1, l && U(!1));
  }), _e(C, "pointermove", (F) => {
    m(F) && d && ee();
  }), _e(T, "scroll", (F) => {
    h(() => {
      B(), ee();
    }), c(F), N();
  })];
  return [() => X(Oe, me(pe, E())), ({ It: F, Dt: H, Zt: I, tn: j }) => {
    const { nn: A, sn: K, en: G, cn: Y } = j || {}, { Ct: te, dt: ie } = I || {}, { ct: be } = n, { k: ve } = Ge(), { K: Se, rn: Z } = a, [Ce, Ae] = F("showNativeOverlaidScrollbars"), [ye, Ee] = F("scrollbars.theme"), [he, we] = F("scrollbars.visibility"), [ce, fe] = F("scrollbars.autoHide"), [$e, Te] = F("scrollbars.autoHideSuspend"), [St] = F("scrollbars.autoHideDelay"), [Ft, Ht] = F("scrollbars.dragScroll"), [Rt, lt] = F("scrollbars.clickScroll"), [_t, hn] = F("overflow"), gn = ie && !H, bn = Z.x || Z.y, wn = A || K || Y || te || H, Ie = G || we || hn, yn = Ce && ve.x && ve.y, Ct = (Et, et, Bt) => {
      const At = Et.includes(gt) && (he === nt || he === "auto" && et === gt);
      return x(Qr, At, Bt), At;
    };
    if (p = St, gn && ($e && bn ? (se(!1), v(), O(() => {
      v = _e(T, "scroll", X(se, !0), {
        A: !0
      });
    })) : se(!0)), Ae && x(Yr, yn), Ee && (x(f), x(ye, !0), f = ye), Te && !$e && se(!0), fe && (d = ce === "move", l = ce === "leave", u = ce === "never", U(u, !0)), Ht && x(na, Ft), lt && x(ta, !!Rt), Ie) {
      const Et = Ct(_t.x, Se.x, !0), et = Ct(_t.y, Se.y, !1);
      x(ea, !(Et && et));
    }
    wn && (B(), L(), N(), Y && k(), x(As, !Z.x, !0), x(As, !Z.y, !1), x(Xr, be && !S));
  }, {}, z];
}, $a = (t) => {
  const e = Ge(), { U: n, R: a } = e, { elements: s } = n(), { padding: c, viewport: i, content: d } = s, l = nn(t), u = l ? {} : t, { elements: f } = u, { padding: v, viewport: p, content: m } = f || {}, h = l ? t : u.target, $ = ro(h), y = h.ownerDocument, D = y.documentElement, O = () => y.defaultView || Me, R = X(aa, [h]), w = X(yo, [h]), V = X(pt, ""), z = X(R, V, i), E = X(w, V, d), C = (Z) => {
    const Ce = ht(Z), Ae = on(Z), ye = Ze(Z, Ys), Ee = Ze(Z, Xs);
    return Ae.w - Ce.w > 0 && !wt(ye) || Ae.h - Ce.h > 0 && !wt(Ee);
  }, T = z(p), S = T === h, x = S && $, L = !S && E(m), B = !S && T === L, k = x ? D : T, N = x ? k : h, U = !S && w(V, c, v), ee = !B && L, se = [ee, k, U, N].map((Z) => nn(Z) && !Dt(Z) && Z), ne = (Z) => Z && Us(se, Z), pe = !ne(k) && C(k) ? k : h, F = x ? D : k, I = {
    vt: h,
    ht: N,
    ot: k,
    ln: U,
    bt: ee,
    gt: F,
    Qt: x ? y : k,
    an: $ ? D : pe,
    Kt: y,
    wt: $,
    Mt: l,
    nt: S,
    un: O,
    yt: (Z) => es(k, Je, Z),
    St: (Z, Ce) => sn(k, Je, Z, Ce),
    Ot: () => sn(F, Je, Pr, !0)
  }, { vt: j, ht: A, ln: K, ot: G, bt: Y } = I, te = [() => {
    Ne(A, [ot, xn]), Ne(j, xn), $ && Ne(D, [xn, ot]);
  }];
  let ie = Fn([Y, G, K, A, j].find((Z) => Z && !ne(Z)));
  const be = x ? j : Y || G, ve = X(Oe, te);
  return [I, () => {
    const Z = O(), Ce = Hn(), Ae = (ce) => {
      Ve(Dt(ce), Fn(ce)), bt(ce);
    }, ye = (ce) => _e(ce, "focusin focusout focus blur", vo, {
      I: !0,
      H: !1
    }), Ee = "tabindex", he = Zn(G, Ee), we = ye(Ce);
    return Xe(A, ot, S ? "" : Nr), Xe(K, qn, ""), Xe(G, Je, ""), Xe(Y, Cs, ""), S || (Xe(G, Ee, he || "-1"), $ && Xe(D, Ss, "")), Ve(be, ie), Ve(A, K), Ve(K || A, !S && G), Ve(G, Y), me(te, [we, () => {
      const ce = Hn(), fe = ne(G), $e = fe && ce === G ? j : ce, Te = ye($e);
      Ne(K, qn), Ne(Y, Cs), Ne(G, Je), $ && Ne(D, Ss), he ? Xe(G, Ee, he) : Ne(G, Ee), ne(Y) && Ae(Y), fe && Ae(G), ne(K) && Ae(K), Nn($e), Te();
    }]), a && !S && (Qn(G, Je, ho), me(te, X(Ne, G, Je))), Nn(!S && $ && Ce === j && Z.top === Z ? G : Ce), we(), ie = 0, ve;
  }, ve];
}, ka = ({ bt: t }) => ({ Zt: e, _n: n, Dt: a }) => {
  const { xt: s } = e || {}, { $t: c } = n;
  t && (s || a) && Vt(t, {
    [_n]: c && "100%"
  });
}, xa = ({ ht: t, ln: e, ot: n, nt: a }, s) => {
  const [c, i] = De({
    i: Mr,
    o: hs()
  }, X(hs, t, "padding", ""));
  return ({ It: d, Zt: l, _n: u, Dt: f }) => {
    let [v, p] = i(f);
    const { R: m } = Ge(), { ft: h, Ht: $, Ct: y } = l || {}, { ct: D } = u, [O, R] = d("paddingAbsolute");
    (h || p || (f || $)) && ([v, p] = c(f));
    const V = !a && (R || y || p);
    if (V) {
      const z = !O || !e && !m, E = v.r + v.l, C = v.t + v.b, T = {
        [Ks]: z && !D ? -E : 0,
        [Ws]: z ? -C : 0,
        [Gs]: z && D ? -E : 0,
        top: z ? -v.t : 0,
        right: z ? D ? -v.r : "auto" : 0,
        left: z ? D ? "auto" : -v.l : 0,
        [un]: z && `calc(100% + ${E}px)`
      }, S = {
        [qs]: z ? v.t : 0,
        [zs]: z ? v.r : 0,
        [js]: z ? v.b : 0,
        [Ps]: z ? v.l : 0
      };
      Vt(e || n, T), Vt(n, S), oe(s, {
        ln: v,
        dn: !z,
        rt: e ? S : oe({}, T, S)
      });
    }
    return {
      fn: V
    };
  };
}, Sa = (t, e) => {
  const n = Ge(), { ht: a, ln: s, ot: c, nt: i, Qt: d, gt: l, wt: u, St: f, un: v } = t, { R: p } = n, m = u && i, h = X(Is, 0), $ = {
    display: () => !1,
    direction: (H) => H !== "ltr",
    flexDirection: (H) => H.endsWith("-reverse"),
    writingMode: (H) => H !== "horizontal-tb"
  }, y = Be($), D = {
    i: Js,
    o: {
      w: 0,
      h: 0
    }
  }, O = {
    i: Wt,
    o: {}
  }, R = (H) => {
    f(po, !m && H);
  }, w = (H) => {
    if (!y.some((be) => {
      const ve = H[be];
      return ve && $[be](ve);
    }))
      return {
        D: {
          x: 0,
          y: 0
        },
        M: {
          x: 1,
          y: 1
        }
      };
    R(!0);
    const j = Le(l), A = f(jr, !0), K = _e(d, gt, (be) => {
      const ve = Le(l);
      be.isTrusted && ve.x === j.x && ve.y === j.y && _o(be);
    }, {
      I: !0,
      A: !0
    });
    qe(l, {
      x: 0,
      y: 0
    }), A();
    const G = Le(l), Y = on(l);
    qe(l, {
      x: Y.w,
      y: Y.h
    });
    const te = Le(l);
    qe(l, {
      x: te.x - G.x < 1 && -Y.w,
      y: te.y - G.y < 1 && -Y.h
    });
    const ie = Le(l);
    return qe(l, j), Gn(() => K()), {
      D: G,
      M: ie
    };
  }, V = (H, I) => {
    const j = Me.devicePixelRatio % 1 !== 0 ? 1 : 0, A = {
      w: h(H.w - I.w),
      h: h(H.h - I.h)
    };
    return {
      w: A.w > j ? A.w : 0,
      h: A.h > j ? A.h : 0
    };
  }, [z, E] = De(D, X(ns, c)), [C, T] = De(D, X(on, c)), [S, x] = De(D), [L] = De(O), [B, k] = De(D), [N] = De(O), [U] = De({
    i: (H, I) => vn(H, I, y),
    o: {}
  }, () => Rr(c) ? Ze(c, y) : {}), [ee, se] = De({
    i: (H, I) => Wt(H.D, I.D) && Wt(H.M, I.M),
    o: fo()
  }), ne = Ot(Co), pe = (H, I) => `${I ? Ur : qr}${Tr(H)}`, F = (H) => {
    const I = (A) => [nt, it, gt].map((K) => pe(K, A)), j = I(!0).concat(I()).join(" ");
    f(j), f(Be(H).map((A) => pe(H[A], A === "x")).join(" "), !0);
  };
  return ({ It: H, Zt: I, _n: j, Dt: A }, { fn: K }) => {
    const { ft: G, Ht: Y, Ct: te, dt: ie, zt: be } = I || {}, ve = ne && ne.tt(t, e, j, n, H), { it: Se, ut: Z, _t: Ce } = ve || {}, [Ae, ye] = fa(H, n), [Ee, he] = H("overflow"), we = wt(Ee.x), ce = wt(Ee.y), fe = !0;
    let $e = E(A), Te = T(A), St = x(A), Ft = k(A);
    ye && p && f(ho, !Ae);
    {
      es(a, ot, Xt) && R(!0);
      const [ds] = Z ? Z() : [], [It] = $e = z(A), [Nt] = Te = C(A), Ut = co(c), qt = m && Hr(v()), Zo = {
        w: h(Nt.w + It.w),
        h: h(Nt.h + It.h)
      }, us = {
        w: h((qt ? qt.w : Ut.w + h(Ut.w - Nt.w)) + It.w),
        h: h((qt ? qt.h : Ut.h + h(Ut.h - Nt.h)) + It.h)
      };
      ds && ds(), Ft = B(us), St = S(V(Zo, us), A);
    }
    const [Ht, Rt] = Ft, [lt, _t] = St, [hn, gn] = Te, [bn, wn] = $e, [Ie, yn] = L({
      x: lt.w > 0,
      y: lt.h > 0
    }), Ct = we && ce && (Ie.x || Ie.y) || we && Ie.x && !Ie.y || ce && Ie.y && !Ie.x, Et = K || te || be || wn || gn || Rt || _t || he || ye || fe, et = ma(Ie, Ee), [Bt, At] = N(et.K), [Wo, Yo] = U(A), cs = te || ie || Yo || yn || A, [Xo, Jo] = cs ? ee(w(Wo), A) : se();
    return Et && (At && F(et.K), Ce && Se && Vt(c, Ce(et, j, Se(et, hn, bn)))), R(!1), sn(a, ot, Xt, Ct), sn(s, qn, Xt, Ct), oe(e, {
      K: Bt,
      Vt: {
        x: Ht.w,
        y: Ht.h
      },
      Rt: {
        x: lt.w,
        y: lt.h
      },
      rn: Ie,
      Lt: Br(Xo, lt)
    }), {
      en: At,
      nn: Rt,
      sn: _t,
      cn: Jo || _t,
      vn: cs
    };
  };
}, Ca = (t) => {
  const [e, n, a] = $a(t), s = {
    ln: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    dn: !1,
    rt: {
      [Ks]: 0,
      [Ws]: 0,
      [Gs]: 0,
      [qs]: 0,
      [zs]: 0,
      [js]: 0,
      [Ps]: 0
    },
    Vt: {
      x: 0,
      y: 0
    },
    Rt: {
      x: 0,
      y: 0
    },
    K: {
      x: it,
      y: it
    },
    rn: {
      x: !1,
      y: !1
    },
    Lt: fo()
  }, { vt: c, gt: i, nt: d, Ot: l } = e, { R: u, k: f } = Ge(), v = !u && (f.x || f.y), p = [ka(e), xa(e, s), Sa(e, s)];
  return [n, (m) => {
    const h = {}, y = v && Le(i), D = y && l();
    return le(p, (O) => {
      oe(h, O(m, h) || {});
    }), qe(i, y), D && D(), !d && qe(c, 0), h;
  }, s, e, a];
}, Ea = (t, e, n, a, s) => {
  let c = !1;
  const i = xs(e, {}), [d, l, u, f, v] = Ca(t), [p, m, h] = ga(f, u, i, (w) => {
    R({}, w);
  }), [$, y, , D] = ya(t, e, h, u, f, s), O = (w) => Be(w).some((V) => !!w[V]), R = (w, V) => {
    if (n())
      return !1;
    const { pn: z, Dt: E, At: C, hn: T } = w, S = z || {}, x = !!E || !c, L = {
      It: xs(e, S, x),
      pn: S,
      Dt: x
    };
    if (T)
      return y(L), !1;
    const B = V || m(oe({}, L, {
      At: C
    })), k = l(oe({}, L, {
      _n: h,
      Zt: B
    }));
    y(oe({}, L, {
      Zt: B,
      tn: k
    }));
    const N = O(B), U = O(k), ee = N || U || !Jn(S) || x;
    return c = !0, ee && a(w, {
      Zt: B,
      tn: k
    }), ee;
  };
  return [() => {
    const { an: w, gt: V, Ot: z } = f, E = Le(w), C = [p(), d(), $()], T = z();
    return qe(V, E), T(), X(Oe, C);
  }, R, () => ({
    gn: h,
    bn: u
  }), {
    wn: f,
    yn: D
  }, v];
}, je = (t, e, n) => {
  const { N: a } = Ge(), s = nn(t), c = s ? t : t.target, i = $o(c);
  if (e && !i) {
    let d = !1;
    const l = [], u = {}, f = (S) => {
      const x = Qs(S), L = Ot(_a);
      return L ? L(x, !0) : x;
    }, v = oe({}, a(), f(e)), [p, m, h] = Un(), [$, y, D] = Un(n), O = (S, x) => {
      D(S, x), h(S, x);
    }, [R, w, V, z, E] = Ea(t, v, () => d, ({ pn: S, Dt: x }, { Zt: L, tn: B }) => {
      const { ft: k, Ct: N, xt: U, Ht: ee, Et: se, dt: ne } = L, { nn: pe, sn: F, en: H, cn: I } = B;
      O("updated", [T, {
        updateHints: {
          sizeChanged: !!k,
          directionChanged: !!N,
          heightIntrinsicChanged: !!U,
          overflowEdgeChanged: !!pe,
          overflowAmountChanged: !!F,
          overflowStyleChanged: !!H,
          scrollCoordinatesChanged: !!I,
          contentMutation: !!ee,
          hostMutation: !!se,
          appear: !!ne
        },
        changedOptions: S || {},
        force: !!x
      }]);
    }, (S) => O("scroll", [T, S])), C = (S) => {
      ca(c), Oe(l), d = !0, O("destroyed", [T, S]), m(), y();
    }, T = {
      options(S, x) {
        if (S) {
          const L = x ? a() : {}, B = mo(v, oe(L, f(S)));
          Jn(B) || (oe(v, B), w({
            pn: B
          }));
        }
        return oe({}, v);
      },
      on: $,
      off: (S, x) => {
        S && x && y(S, x);
      },
      state() {
        const { gn: S, bn: x } = V(), { ct: L } = S, { Vt: B, Rt: k, K: N, rn: U, ln: ee, dn: se, Lt: ne } = x;
        return oe({}, {
          overflowEdge: B,
          overflowAmount: k,
          overflowStyle: N,
          hasOverflow: U,
          scrollCoordinates: {
            start: ne.D,
            end: ne.M
          },
          padding: ee,
          paddingAbsolute: se,
          directionRTL: L,
          destroyed: d
        });
      },
      elements() {
        const { vt: S, ht: x, ln: L, ot: B, bt: k, gt: N, Qt: U } = z.wn, { Xt: ee, Gt: se } = z.yn, ne = (F) => {
          const { Pt: H, Ut: I, Tt: j } = F;
          return {
            scrollbar: j,
            track: I,
            handle: H
          };
        }, pe = (F) => {
          const { Yt: H, Wt: I } = F, j = ne(H[0]);
          return oe({}, j, {
            clone: () => {
              const A = ne(I());
              return w({
                hn: !0
              }), A;
            }
          });
        };
        return oe({}, {
          target: S,
          host: x,
          padding: L || B,
          viewport: B,
          content: k || B,
          scrollOffsetElement: N,
          scrollEventElement: U,
          scrollbarHorizontal: pe(ee),
          scrollbarVertical: pe(se)
        });
      },
      update: (S) => w({
        Dt: S,
        At: !0
      }),
      destroy: X(C, !1),
      plugin: (S) => u[Be(S)[0]]
    };
    return me(l, [E]), ia(c, T), So(ko, je, [T, p, u]), la(z.wn.wt, !s && t.cancel) ? (C(!0), T) : (me(l, R()), O("initialized", [T]), T.update(), T);
  }
  return i;
};
je.plugin = (t) => {
  const e = Pe(t), n = e ? t : [t], a = n.map((s) => So(s, je)[0]);
  return ua(n), e ? a : a[0];
};
je.valid = (t) => {
  const e = t && t.elements, n = Re(e) && e();
  return tn(n) && !!$o(n.target);
};
je.env = () => {
  const { T: t, k: e, R: n, V: a, B: s, F: c, U: i, P: d, N: l, q: u } = Ge();
  return oe({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: e,
    scrollbarsHiding: n,
    scrollTimeline: a,
    staticDefaultInitialization: s,
    staticDefaultOptions: c,
    getDefaultInitialization: i,
    setDefaultInitialization: d,
    getDefaultOptions: l,
    setDefaultOptions: u
  });
};
je.nonce = oa;
function Aa() {
  let t;
  const e = M(null), n = Math.floor(Math.random() * 2 ** 32), a = M(!1), s = M([]), c = () => s.value, i = () => t.getSelection(), d = () => s.value.length, l = () => t.clearSelection(!0), u = M(), f = M(null), v = M(null), p = M(null);
  function m() {
    t = new ur({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), t.subscribe("DS:start:pre", ({ items: w, event: V, isDragging: z }) => {
      if (z)
        t.Interaction._reset(V);
      else {
        a.value = !1;
        const E = e.value.offsetWidth - V.offsetX, C = e.value.offsetHeight - V.offsetY;
        E < 15 && C < 15 && t.Interaction._reset(V), V.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(V);
      }
    }), document.addEventListener("dragleave", (w) => {
      !w.buttons && a.value && (a.value = !1);
    });
  }
  const h = () => ct(() => {
    t.addSelection(
      t.getSelectables()
    ), $();
  }), $ = () => {
    s.value = t.getSelection().map((w) => JSON.parse(w.dataset.item)), u.value(s.value);
  }, y = () => ct(() => {
    const w = c().map((V) => V.path);
    l(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + n)
    }), t.addSelection(
      t.getSelectables().filter((V) => w.includes(JSON.parse(V.dataset.item).path))
    ), $(), O();
  }), D = (w) => {
    u.value = w, t.subscribe("DS:end", ({ items: V, event: z, isDragging: E }) => {
      s.value = V.map((C) => JSON.parse(C.dataset.item)), w(V.map((C) => JSON.parse(C.dataset.item)));
    });
  }, O = () => {
    f.value && (e.value && e.value.getBoundingClientRect().height < e.value.scrollHeight ? (v.value.style.height = e.value.scrollHeight + "px", v.value.style.display = "block") : v.value && (v.value.style.height = "100%", v.value.style.display = "none"));
  }, R = (w) => {
    if (!f.value)
      return;
    const { scrollOffsetElement: V } = f.value.elements();
    V.scrollTo(
      {
        top: e.value.scrollTop,
        left: 0
      }
    );
  };
  return xe(() => {
    je(p.value, {
      scrollbars: {
        theme: "vf-theme-dark dark:vf-theme-light"
      },
      plugins: {
        OverlayScrollbars: je
        // ScrollbarsHidingPlugin,
        // SizeObserverPlugin,
        // ClickScrollPlugin
      }
    }, {
      initialized: (w) => {
        f.value = w;
      },
      scroll: (w, V) => {
        const { scrollOffsetElement: z } = w.elements();
        e.value.scrollTo({
          top: z.scrollTop,
          left: 0
        });
      }
    }), m(), O(), new ResizeObserver(O).observe(e.value), e.value.addEventListener("scroll", R), t.subscribe("DS:scroll", ({ isDragging: w }) => w || R());
  }), rn(() => {
    t && t.stop();
  }), Os(() => {
    t && t.Area.reset();
  }), {
    area: e,
    explorerId: n,
    isDraggingRef: a,
    scrollBar: v,
    scrollBarContainer: p,
    getSelected: c,
    getSelection: i,
    selectAll: h,
    clearSelection: l,
    refreshSelection: y,
    getCount: d,
    onSelect: D
  };
}
function Ta(t, e) {
  const n = M(t), a = M(e), s = M([]), c = M([]), i = M([]), d = M(!1), l = M(5);
  let u = !1, f = !1;
  const v = yt({
    adapter: n,
    storages: [],
    dirname: a,
    files: []
  });
  function p() {
    let O = [], R = [], w = a.value ?? n.value + "://";
    w.length === 0 && (s.value = []), w.replace(n.value + "://", "").split("/").forEach(function(E) {
      O.push(E), O.join("/") !== "" && R.push({
        basename: E,
        name: E,
        path: n.value + "://" + O.join("/"),
        type: "dir"
      });
    }), c.value = R;
    const [V, z] = h(R, l.value);
    i.value = z, s.value = V;
  }
  function m(O) {
    l.value = O, p();
  }
  function h(O, R) {
    return O.length > R ? [O.slice(-R), O.slice(0, -R)] : [O, []];
  }
  function $(O = null) {
    d.value = O ?? !d.value;
  }
  function y() {
    return s.value && s.value.length && !f;
  }
  const D = rt(() => {
    var O;
    return ((O = s.value[s.value.length - 2]) == null ? void 0 : O.path) ?? n.value + "://";
  });
  return xe(() => {
  }), He(a, p), xe(p), {
    adapter: n,
    path: a,
    loading: u,
    searchMode: f,
    data: v,
    breadcrumbs: s,
    breadcrumbItems: c,
    limitBreadcrumbItems: m,
    hiddenBreadcrumbs: i,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: $,
    isGoUpAvailable: y,
    parentFolderPath: D
  };
}
const Ma = (t, e) => {
  const n = gr(t.id), a = dr(), s = n.getStore("metricUnits", !1), c = xr(n, t.theme), i = e.i18n, d = t.locale ?? e.locale, l = n.getStore("adapter"), u = (p) => Array.isArray(p) ? p : yr, f = n.getStore("persist-path", t.persist), v = f ? n.getStore("path", t.path) : t.path;
  return yt({
    /** 
    * Core properties
    * */
    // app version
    version: $r,
    // root element
    root: null,
    // app id
    debug: t.debug,
    // Event Bus
    emitter: a,
    // storage
    storage: n,
    // localization object
    i18n: wr(n, d, a, i),
    // modal state
    modal: Sr(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: rt(() => Aa()),
    // http object
    requester: hr(t.request),
    // active features
    features: u(t.features),
    // view state
    view: n.getStore("viewport", "grid"),
    // fullscreen state
    fullScreen: n.getStore("full-screen", t.fullScreen),
    // show tree view
    showTreeView: n.getStore("show-tree-view", t.showTreeView),
    // pinnedFolders
    pinnedFolders: n.getStore("pinned-folders", t.pinnedFolders),
    // treeViewData
    treeViewData: [],
    // selectButton state
    selectButton: t.selectButton,
    // max file size
    maxFileSize: t.maxFileSize,
    /**
    * Settings
    * */
    // theme state
    theme: c,
    // unit state - for example: GB or GiB
    metricUnits: s,
    // human readable file sizes
    filesize: s ? Bs : Rs,
    // show large icons in list view
    compactListView: n.getStore("compact-list-view", !0),
    // persist state
    persist: f,
    // show thumbnails
    showThumbnails: n.getStore("show-thumbnails", t.showThumbnails),
    // file system
    fs: Ta(l, v)
  });
}, Da = /* @__PURE__ */ r("div", { class: "vuefinder__modal-layout__overlay" }, null, -1), Va = { class: "vuefinder__modal-layout__container" }, La = { class: "vuefinder__modal-layout__content" }, Oa = { class: "vuefinder__modal-layout__footer" }, Ke = {
  __name: "ModalLayout",
  setup(t) {
    const e = M(null), n = re("ServiceContainer");
    return xe(() => {
      const a = document.querySelector(".v-f-modal input");
      a && a.focus(), ct(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768) {
          const s = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: s,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (a, s) => (_(), g("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: s[1] || (s[1] = $t((c) => o(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      Da,
      r("div", Va, [
        r("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: s[0] || (s[0] = st((c) => o(n).modal.close(), ["self"]))
        }, [
          r("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            r("div", La, [
              Tt(a.$slots, "default")
            ]),
            r("div", Oa, [
              Tt(a.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, Fa = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [a, s] of e)
    n[a] = s;
  return n;
}, Ha = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const a = re("ServiceContainer"), s = M(!1), { t: c } = a.i18n;
    let i = null;
    const d = () => {
      clearTimeout(i), s.value = !0, i = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return xe(() => {
      a.emitter.on(t.on, d);
    }), nr(() => {
      clearTimeout(i);
    }), {
      shown: s,
      t: c
    };
  }
}, Ra = { key: 1 };
function Ba(t, e, n, a, s, c) {
  return _(), g("div", {
    class: ae(["vuefinder__action-message", { "vuefinder__action-message--hidden": !a.shown }])
  }, [
    t.$slots.default ? Tt(t.$slots, "default", { key: 0 }) : (_(), g("span", Ra, b(a.t("Saved.")), 1))
  ], 2);
}
const vt = /* @__PURE__ */ Fa(Ha, [["render", Ba]]), Ia = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
}, Na = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
}, null, -1), Ua = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
}, null, -1), qa = [
  Na,
  Ua
];
function za(t, e) {
  return _(), g("svg", Ia, [...qa]);
}
const Pa = { render: za }, ja = { class: "vuefinder__modal-header" }, Ga = { class: "vuefinder__modal-header__icon-container" }, Ka = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, Qe = {
  __name: "ModalHeader",
  props: {
    title: {
      type: String,
      required: !0
    },
    icon: {
      type: Object,
      required: !0
    }
  },
  setup(t) {
    return (e, n) => (_(), g("div", ja, [
      r("div", Ga, [
        (_(), W(Fs(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      r("h3", Ka, b(t.title), 1)
    ]));
  }
}, Wa = { class: "vuefinder__about-modal__content" }, Ya = { class: "vuefinder__about-modal__main" }, Xa = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, Ja = ["onClick", "aria-current"], Za = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, Qa = { class: "vuefinder__about-modal__description" }, el = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, tl = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, nl = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, sl = { class: "vuefinder__about-modal__description" }, ol = { class: "vuefinder__about-modal__settings" }, rl = { class: "vuefinder__about-modal__setting flex" }, al = { class: "vuefinder__about-modal__setting-input" }, ll = { class: "vuefinder__about-modal__setting-label" }, il = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, cl = { class: "vuefinder__about-modal__setting flex" }, dl = { class: "vuefinder__about-modal__setting-input" }, ul = { class: "vuefinder__about-modal__setting-label" }, _l = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, vl = { class: "vuefinder__about-modal__setting flex" }, fl = { class: "vuefinder__about-modal__setting-input" }, ml = { class: "vuefinder__about-modal__setting-label" }, pl = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, hl = { class: "vuefinder__about-modal__setting flex" }, gl = { class: "vuefinder__about-modal__setting-input" }, bl = { class: "vuefinder__about-modal__setting-label" }, wl = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, yl = { class: "vuefinder__about-modal__setting" }, $l = { class: "vuefinder__about-modal__setting-input" }, kl = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, xl = { class: "vuefinder__about-modal__setting-label" }, Sl = ["label"], Cl = ["value"], El = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, Al = { class: "vuefinder__about-modal__setting-input" }, Tl = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, Ml = { class: "vuefinder__about-modal__setting-label" }, Dl = ["label"], Vl = ["value"], Ll = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Ol = { class: "vuefinder__about-modal__shortcuts" }, Fl = { class: "vuefinder__about-modal__shortcut" }, Hl = /* @__PURE__ */ r("kbd", null, "F2", -1), Rl = { class: "vuefinder__about-modal__shortcut" }, Bl = /* @__PURE__ */ r("kbd", null, "F5", -1), Il = { class: "vuefinder__about-modal__shortcut" }, Nl = /* @__PURE__ */ r("kbd", null, "Del", -1), Ul = { class: "vuefinder__about-modal__shortcut" }, ql = /* @__PURE__ */ r("div", null, [
  /* @__PURE__ */ r("kbd", null, "Esc")
], -1), zl = { class: "vuefinder__about-modal__shortcut" }, Pl = /* @__PURE__ */ r("div", null, [
  /* @__PURE__ */ r("kbd", null, "Ctrl"),
  /* @__PURE__ */ J(" + "),
  /* @__PURE__ */ r("kbd", null, "A")
], -1), jl = { class: "vuefinder__about-modal__shortcut" }, Gl = /* @__PURE__ */ r("div", null, [
  /* @__PURE__ */ r("kbd", null, "Ctrl"),
  /* @__PURE__ */ J(" + "),
  /* @__PURE__ */ r("kbd", null, "F")
], -1), Kl = { class: "vuefinder__about-modal__shortcut" }, Wl = /* @__PURE__ */ r("div", null, [
  /* @__PURE__ */ r("kbd", null, "Ctrl"),
  /* @__PURE__ */ J(" + "),
  /* @__PURE__ */ r("kbd", null, "E")
], -1), Yl = { class: "vuefinder__about-modal__shortcut" }, Xl = /* @__PURE__ */ r("div", null, [
  /* @__PURE__ */ r("kbd", null, "Ctrl"),
  /* @__PURE__ */ J(" + "),
  /* @__PURE__ */ r("kbd", null, ",")
], -1), Jl = { class: "vuefinder__about-modal__shortcut" }, Zl = /* @__PURE__ */ r("div", null, [
  /* @__PURE__ */ r("kbd", null, "Ctrl"),
  /* @__PURE__ */ J(" + "),
  /* @__PURE__ */ r("kbd", null, "Enter")
], -1), Ql = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, ei = { class: "vuefinder__about-modal__description" }, Ao = {
  __name: "ModalAbout",
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n, clearStore: a } = e.storage, { t: s } = e.i18n, c = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, i = rt(() => [
      { name: s("About"), key: c.ABOUT },
      { name: s("Settings"), key: c.SETTINGS },
      { name: s("Shortcuts"), key: c.SHORTCUTS },
      { name: s("Reset"), key: c.RESET }
    ]), d = M("about"), l = async () => {
      a(), location.reload();
    }, u = (O) => {
      e.theme.set(O), e.emitter.emit("vf-theme-saved");
    }, f = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? Bs : Rs, n("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, v = () => {
      e.compactListView = !e.compactListView, n("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, p = () => {
      e.showThumbnails = !e.showThumbnails, n("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, m = () => {
      e.persist = !e.persist, n("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: h } = re("VueFinderOptions"), y = Object.fromEntries(
      Object.entries({
        en: "English",
        fr: "French (Français)",
        de: "German (Deutsch)",
        fa: "Persian (فارسی)",
        he: "Hebrew (עִברִית)",
        hi: "Hindi (हिंदी)",
        ru: "Russian (Pусский)",
        sv: "Swedish (Svenska)",
        tr: "Turkish (Türkçe)",
        zhCN: "Simplified Chinese (简体中文)",
        zhTW: "Traditional Chinese (繁體中文)"
      }).filter(([O]) => Object.keys(h).includes(O))
    ), D = rt(() => ({
      system: s("System"),
      light: s("Light"),
      dark: s("Dark")
    }));
    return (O, R) => (_(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: R[7] || (R[7] = (w) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(s)("Close")), 1)
      ]),
      default: Q(() => [
        r("div", Wa, [
          P(Qe, {
            icon: o(Pa),
            title: "Vuefinder " + o(e).version
          }, null, 8, ["icon", "title"]),
          r("div", Ya, [
            r("div", null, [
              r("div", null, [
                r("nav", Xa, [
                  (_(!0), g(ge, null, ke(i.value, (w) => (_(), g("button", {
                    key: w.name,
                    onClick: (V) => d.value = w.key,
                    class: ae([w.key === d.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": w.current ? "page" : void 0
                  }, b(w.name), 11, Ja))), 128))
                ])
              ])
            ]),
            d.value === c.ABOUT ? (_(), g("div", Za, [
              r("div", Qa, b(o(s)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              r("a", el, b(o(s)("Project home")), 1),
              r("a", tl, b(o(s)("Follow on GitHub")), 1)
            ])) : q("", !0),
            d.value === c.SETTINGS ? (_(), g("div", nl, [
              r("div", sl, b(o(s)("Customize your experience with the following settings")), 1),
              r("div", ol, [
                r("fieldset", null, [
                  r("div", rl, [
                    r("div", al, [
                      ue(r("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": R[0] || (R[0] = (w) => o(e).metricUnits = w),
                        onClick: f,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).metricUnits]
                      ])
                    ]),
                    r("div", ll, [
                      r("label", il, [
                        J(b(o(s)("Use Metric Units")) + " ", 1),
                        P(vt, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: Q(() => [
                            J(b(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  r("div", cl, [
                    r("div", dl, [
                      ue(r("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        "onUpdate:modelValue": R[1] || (R[1] = (w) => o(e).compactListView = w),
                        onClick: v,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).compactListView]
                      ])
                    ]),
                    r("div", ul, [
                      r("label", _l, [
                        J(b(o(s)("Compact list view")) + " ", 1),
                        P(vt, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: Q(() => [
                            J(b(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  r("div", vl, [
                    r("div", fl, [
                      ue(r("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        "onUpdate:modelValue": R[2] || (R[2] = (w) => o(e).persist = w),
                        onClick: m,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).persist]
                      ])
                    ]),
                    r("div", ml, [
                      r("label", pl, [
                        J(b(o(s)("Persist path on reload")) + " ", 1),
                        P(vt, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: Q(() => [
                            J(b(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  r("div", hl, [
                    r("div", gl, [
                      ue(r("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        "onUpdate:modelValue": R[3] || (R[3] = (w) => o(e).showThumbnails = w),
                        onClick: p,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).showThumbnails]
                      ])
                    ]),
                    r("div", bl, [
                      r("label", wl, [
                        J(b(o(s)("Show thumbnails")) + " ", 1),
                        P(vt, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: Q(() => [
                            J(b(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  r("div", yl, [
                    r("div", $l, [
                      r("label", kl, b(o(s)("Theme")), 1)
                    ]),
                    r("div", xl, [
                      ue(r("select", {
                        id: "theme",
                        "onUpdate:modelValue": R[4] || (R[4] = (w) => o(e).theme.value = w),
                        onChange: R[5] || (R[5] = (w) => u(w.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        r("optgroup", {
                          label: o(s)("Theme")
                        }, [
                          (_(!0), g(ge, null, ke(D.value, (w, V) => (_(), g("option", { value: V }, b(w), 9, Cl))), 256))
                        ], 8, Sl)
                      ], 544), [
                        [An, o(e).theme.value]
                      ]),
                      P(vt, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: Q(() => [
                          J(b(o(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  o(e).features.includes(o(de).LANGUAGE) && Object.keys(o(y)).length > 1 ? (_(), g("div", El, [
                    r("div", Al, [
                      r("label", Tl, b(o(s)("Language")), 1)
                    ]),
                    r("div", Ml, [
                      ue(r("select", {
                        id: "language",
                        "onUpdate:modelValue": R[6] || (R[6] = (w) => o(e).i18n.locale = w),
                        class: "vuefinder__about-modal__select"
                      }, [
                        r("optgroup", {
                          label: o(s)("Language")
                        }, [
                          (_(!0), g(ge, null, ke(o(y), (w, V) => (_(), g("option", { value: V }, b(w), 9, Vl))), 256))
                        ], 8, Dl)
                      ], 512), [
                        [An, o(e).i18n.locale]
                      ]),
                      P(vt, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: Q(() => [
                          J(b(o(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : q("", !0)
                ])
              ])
            ])) : q("", !0),
            d.value === c.SHORTCUTS ? (_(), g("div", Ll, [
              r("div", Ol, [
                r("div", Fl, [
                  r("div", null, b(o(s)("Rename")), 1),
                  Hl
                ]),
                r("div", Rl, [
                  r("div", null, b(o(s)("Refresh")), 1),
                  Bl
                ]),
                r("div", Il, [
                  J(b(o(s)("Delete")) + " ", 1),
                  Nl
                ]),
                r("div", Ul, [
                  J(b(o(s)("Escape")) + " ", 1),
                  ql
                ]),
                r("div", zl, [
                  J(b(o(s)("Select All")) + " ", 1),
                  Pl
                ]),
                r("div", jl, [
                  J(b(o(s)("Search")) + " ", 1),
                  Gl
                ]),
                r("div", Kl, [
                  J(b(o(s)("Toggle Sidebar")) + " ", 1),
                  Wl
                ]),
                r("div", Yl, [
                  J(b(o(s)("Open Settings")) + " ", 1),
                  Xl
                ]),
                r("div", Jl, [
                  J(b(o(s)("Toggle Full Screen")) + " ", 1),
                  Zl
                ])
              ])
            ])) : q("", !0),
            d.value === c.RESET ? (_(), g("div", Ql, [
              r("div", ei, b(o(s)("Reset all settings to default")), 1),
              r("button", {
                onClick: l,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(o(s)("Reset Settings")), 1)
            ])) : q("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, ti = ["title"], ni = /* @__PURE__ */ r("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "vuefinder__message__icon"
}, [
  /* @__PURE__ */ r("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), si = [
  ni
], We = {
  __name: "Message",
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    var u;
    const n = e, a = re("ServiceContainer"), { t: s } = a.i18n, c = M(!1), i = M(null), d = M((u = i.value) == null ? void 0 : u.strMessage);
    He(d, () => c.value = !1);
    const l = () => {
      n("hidden"), c.value = !0;
    };
    return (f, v) => (_(), g("div", null, [
      c.value ? q("", !0) : (_(), g("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: ae(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Tt(f.$slots, "default"),
        r("div", {
          class: "vuefinder__message__close",
          onClick: l,
          title: o(s)("Close")
        }, si, 8, ti)
      ], 2))
    ]));
  }
}, oi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, ri = /* @__PURE__ */ r("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1), ai = [
  ri
];
function li(t, e) {
  return _(), g("svg", oi, [...ai]);
}
const To = { render: li }, ii = { class: "vuefinder__delete-modal__content" }, ci = { class: "vuefinder__delete-modal__form" }, di = { class: "vuefinder__delete-modal__description" }, ui = { class: "vuefinder__delete-modal__files vf-scrollbar" }, _i = { class: "vuefinder__delete-modal__file" }, vi = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, fi = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), mi = [
  fi
], pi = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, hi = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), gi = [
  hi
], bi = { class: "vuefinder__delete-modal__file-name" }, wi = { class: "vuefinder__delete-modal__warning" }, as = {
  __name: "ModalDelete",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = M(e.modal.data.items), s = M(""), c = () => {
      a.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: a.value.map(({ path: i, type: d }) => ({ path: i, type: d }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files deleted.") });
        },
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (_(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-danger"
        }, b(o(n)("Yes, Delete!")), 1),
        r("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1),
        r("div", wi, b(o(n)("This action cannot be undone.")), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          P(Qe, {
            icon: o(To),
            title: o(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          r("div", ii, [
            r("div", ci, [
              r("p", di, b(o(n)("Are you sure you want to delete these files?")), 1),
              r("div", ui, [
                (_(!0), g(ge, null, ke(a.value, (l) => (_(), g("p", _i, [
                  l.type === "dir" ? (_(), g("svg", vi, mi)) : (_(), g("svg", pi, gi)),
                  r("span", bi, b(l.basename), 1)
                ]))), 256))
              ]),
              s.value.length ? (_(), W(We, {
                key: 0,
                onHidden: d[0] || (d[0] = (l) => s.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(b(s.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, yi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, $i = /* @__PURE__ */ r("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1), ki = [
  $i
];
function xi(t, e) {
  return _(), g("svg", yi, [...ki]);
}
const Mo = { render: xi }, Si = { class: "vuefinder__rename-modal__content" }, Ci = { class: "vuefinder__rename-modal__item" }, Ei = { class: "vuefinder__rename-modal__item-info" }, Ai = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ti = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Mi = [
  Ti
], Di = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Vi = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Li = [
  Vi
], Oi = { class: "vuefinder__rename-modal__item-name" }, ls = {
  __name: "ModalRename",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = M(e.modal.data.items[0]), s = M(e.modal.data.items[0].basename), c = M(""), i = () => {
      s.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: a.value.path,
          name: s.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is renamed.", s.value) });
        },
        onError: (d) => {
          c.value = n(d.message);
        }
      });
    };
    return (d, l) => (_(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Rename")), 1),
        r("button", {
          type: "button",
          onClick: l[2] || (l[2] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          P(Qe, {
            icon: o(Mo),
            title: o(n)("Rename")
          }, null, 8, ["icon", "title"]),
          r("div", Si, [
            r("div", Ci, [
              r("p", Ei, [
                a.value.type === "dir" ? (_(), g("svg", Ai, Mi)) : (_(), g("svg", Di, Li)),
                r("span", Oi, b(a.value.basename), 1)
              ]),
              ue(r("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => s.value = u),
                onKeyup: $t(i, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [kt, s.value]
              ]),
              c.value.length ? (_(), W(We, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => c.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(b(c.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Ye = {
  ESCAPE: "Escape",
  F2: "F2",
  F5: "F5",
  DELETE: "Delete",
  ENTER: "Enter",
  BACKSLASH: "Backslash",
  KEY_A: "KeyA",
  KEY_E: "KeyE",
  KEY_F: "KeyF"
};
function Fi(t) {
  const e = (n) => {
    n.code === Ye.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (t.fs.searchMode || (n.code === Ye.F2 && t.features.includes(de.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(ls, { items: t.dragSelect.getSelected() })), n.code === Ye.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), n.code === Ye.DELETE && (!t.dragSelect.getCount() || t.modal.open(as, { items: t.dragSelect.getSelected() })), n.metaKey && n.code === Ye.BACKSLASH && t.modal.open(Ao), n.metaKey && n.code === Ye.KEY_F && t.features.includes(de.SEARCH) && (t.fs.searchMode = !0, n.preventDefault()), n.metaKey && n.code === Ye.KEY_E && (t.showTreeView = !t.showTreeView, t.storage.setStore("show-tree-view", t.showTreeView)), n.metaKey && n.code === Ye.ENTER && (t.fullScreen = !t.fullScreen, t.root.focus()), n.metaKey && n.code === Ye.KEY_A && (t.dragSelect.selectAll(), n.preventDefault())));
  };
  xe(() => {
    t.root.addEventListener("keydown", e);
  }), rn(() => {
    t.root.removeEventListener("keydown", e);
  });
}
const Hi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Ri = /* @__PURE__ */ r("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1), Bi = [
  Ri
];
function Ii(t, e) {
  return _(), g("svg", Hi, [...Bi]);
}
const Do = { render: Ii }, Ni = { class: "vuefinder__new-folder-modal__content" }, Ui = { class: "vuefinder__new-folder-modal__form" }, qi = { class: "vuefinder__new-folder-modal__description" }, zi = ["placeholder"], Vo = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = re("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, a = M(""), s = M(""), c = () => {
      a.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: a.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", a.value) });
        },
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (_(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Create")), 1),
        r("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          P(Qe, {
            icon: o(Do),
            title: o(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          r("div", Ni, [
            r("div", Ui, [
              r("p", qi, b(o(n)("Create a new folder")), 1),
              ue(r("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => a.value = l),
                onKeyup: $t(c, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: o(n)("Folder Name"),
                type: "text"
              }, null, 40, zi), [
                [kt, a.value]
              ]),
              s.value.length ? (_(), W(We, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => s.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(b(s.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Pi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, ji = /* @__PURE__ */ r("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1), Gi = [
  ji
];
function Ki(t, e) {
  return _(), g("svg", Pi, [...Gi]);
}
const Lo = { render: Ki }, Wi = { class: "vuefinder__new-file-modal__content" }, Yi = { class: "vuefinder__new-file-modal__form" }, Xi = { class: "vuefinder__new-file-modal__description" }, Ji = ["placeholder"], Zi = {
  __name: "ModalNewFile",
  setup(t) {
    const e = re("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, a = M(""), s = M(""), c = () => {
      a.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: a.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", a.value) });
        },
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (_(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Create")), 1),
        r("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          P(Qe, {
            icon: o(Lo),
            title: o(n)("New File")
          }, null, 8, ["icon", "title"]),
          r("div", Wi, [
            r("div", Yi, [
              r("p", Xi, b(o(n)("Create a new file")), 1),
              ue(r("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => a.value = l),
                onKeyup: $t(c, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: o(n)("File Name"),
                type: "text"
              }, null, 40, Ji), [
                [kt, a.value]
              ]),
              s.value.length ? (_(), W(We, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => s.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(b(s.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
};
function Pn(t, e = 14) {
  let n = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(n), "$2..$4");
}
const Qi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, ec = /* @__PURE__ */ r("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1), tc = [
  ec
];
function nc(t, e) {
  return _(), g("svg", Qi, [...tc]);
}
const Oo = { render: nc }, sc = { class: "vuefinder__upload-modal__content" }, oc = {
  key: 0,
  class: "pointer-events-none"
}, rc = {
  key: 1,
  class: "pointer-events-none"
}, ac = ["disabled"], lc = ["disabled"], ic = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, cc = ["textContent"], dc = { class: "vuefinder__upload-modal__file-info" }, uc = { class: "vuefinder__upload-modal__file-name hidden md:block" }, _c = { class: "vuefinder__upload-modal__file-name md:hidden" }, vc = {
  key: 0,
  class: "ml-auto"
}, fc = ["title", "disabled", "onClick"], mc = /* @__PURE__ */ r("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "vuefinder__upload-modal__file-remove-icon"
}, [
  /* @__PURE__ */ r("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), pc = [
  mc
], hc = {
  key: 0,
  class: "py-2"
}, gc = ["disabled"], bc = {
  __name: "ModalUpload",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = n("uppy"), s = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, c = M({ QUEUE_ENTRY_STATUS: s }), i = M(null), d = M(null), l = M(null), u = M(null), f = M(null), v = M(null), p = M([]), m = M(""), h = M(!1), $ = M(!1);
    let y;
    function D(L) {
      return p.value.findIndex((B) => B.id === L);
    }
    function O(L, B = null) {
      B = B ?? (L.webkitRelativePath || L.name), y.addFile({
        name: B,
        type: L.type,
        data: L,
        source: "Local"
      });
    }
    function R(L) {
      switch (L.status) {
        case s.DONE:
          return "text-green-600";
        case s.ERROR:
          return "text-red-600";
        case s.CANCELED:
          return "text-red-600";
        case s.PENDING:
        default:
          return "";
      }
    }
    const w = (L) => {
      switch (L.status) {
        case s.DONE:
          return "✓";
        case s.ERROR:
        case s.CANCELED:
          return "!";
        case s.PENDING:
        default:
          return "...";
      }
    };
    function V() {
      u.value.click();
    }
    function z() {
      if (!h.value) {
        if (!p.value.filter((L) => L.status !== s.DONE).length) {
          m.value = n("Please select file to upload first.");
          return;
        }
        m.value = "", y.retryAll(), y.upload();
      }
    }
    function E() {
      y.cancelAll({ reason: "user" }), p.value.forEach((L) => {
        L.status !== s.DONE && (L.status = s.CANCELED, L.statusName = n("Canceled"));
      }), h.value = !1;
    }
    function C(L) {
      h.value || (y.removeFile(L.id, "removed-by-user"), p.value.splice(D(L.id), 1));
    }
    function T(L) {
      if (!h.value) {
        if (y.cancelAll({ reason: "user" }), L) {
          const B = [];
          p.value.forEach((k) => {
            k.status !== s.DONE && B.push(k);
          }), p.value = [], B.forEach((k) => {
            O(k.originalFile, k.name);
          });
          return;
        }
        p.value.splice(0);
      }
    }
    function S() {
      e.modal.close();
    }
    function x() {
      return e.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", adapter: e.fs.adapter, path: e.fs.data.dirname }
      });
    }
    return xe(async () => {
      y = new _r({
        debug: e.debug,
        restrictions: {
          maxFileSize: kr(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: a,
        onBeforeFileAdded(k, N) {
          if (N[k.id] != null) {
            const ee = D(k.id);
            p.value[ee].status === s.PENDING && (m.value = y.i18n("noDuplicates", { fileName: k.name })), p.value = p.value.filter((se) => se.id !== k.id);
          }
          return p.value.push({
            id: k.id,
            name: k.name,
            size: e.filesize(k.size),
            status: s.PENDING,
            statusName: n("Pending upload"),
            percent: null,
            originalFile: k.data
          }), !0;
        }
      }), y.use(vr, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(k, N) {
          let U;
          try {
            U = JSON.parse(k).message;
          } catch {
            U = n("Cannot parse server response.");
          }
          return new Error(U);
        }
      }), y.on("restriction-failed", (k, N) => {
        const U = p.value[D(k.id)];
        C(U), m.value = N.message;
      }), y.on("upload", () => {
        const k = x();
        y.setMeta({ ...k.body });
        const N = y.getPlugin("XHRUpload");
        N.opts.method = k.method, N.opts.endpoint = k.url + "?" + new URLSearchParams(k.params), N.opts.headers = k.headers, delete k.headers["Content-Type"], h.value = !0, p.value.forEach((U) => {
          U.status !== s.DONE && (U.percent = null, U.status = s.UPLOADING, U.statusName = n("Pending upload"));
        });
      }), y.on("upload-progress", (k, N) => {
        const U = Math.floor(N.bytesUploaded / N.bytesTotal * 100);
        p.value[D(k.id)].percent = `${U}%`;
      }), y.on("upload-success", (k) => {
        const N = p.value[D(k.id)];
        N.status = s.DONE, N.statusName = n("Done");
      }), y.on("upload-error", (k, N) => {
        const U = p.value[D(k.id)];
        U.percent = null, U.status = s.ERROR, N.isNetworkError ? U.statusName = n("Network Error, Unable establish connection to the server or interrupted.") : U.statusName = N ? N.message : n("Unknown Error");
      }), y.on("error", (k) => {
        m.value = k.message, h.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), y.on("complete", () => {
        h.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), u.value.addEventListener("click", () => {
        d.value.click();
      }), f.value.addEventListener("click", () => {
        l.value.click();
      }), v.value.addEventListener("dragover", (k) => {
        k.preventDefault(), $.value = !0;
      }), v.value.addEventListener("dragleave", (k) => {
        k.preventDefault(), $.value = !1;
      });
      function L(k, N) {
        N.isFile && N.file((U) => k(N, U)), N.isDirectory && N.createReader().readEntries((U) => {
          U.forEach((ee) => {
            L(k, ee);
          });
        });
      }
      v.value.addEventListener("drop", (k) => {
        k.preventDefault(), $.value = !1;
        const N = /^[/\\](.+)/;
        [...k.dataTransfer.items].forEach((U) => {
          U.kind === "file" && L((ee, se) => {
            const ne = N.exec(ee.fullPath);
            O(se, ne[1]);
          }, U.webkitGetAsEntry());
        });
      });
      const B = ({ target: k }) => {
        const N = k.files;
        for (const U of N)
          O(U);
        k.value = "";
      };
      d.value.addEventListener("change", B), l.value.addEventListener("change", B);
    }), rn(() => {
      y == null || y.close({ reason: "unmount" });
    }), (L, B) => (_(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: h.value,
          onClick: st(z, ["prevent"])
        }, b(o(n)("Upload")), 9, gc),
        h.value ? (_(), g("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: st(E, ["prevent"])
        }, b(o(n)("Cancel")), 1)) : (_(), g("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: st(S, ["prevent"])
        }, b(o(n)("Close")), 1))
      ]),
      default: Q(() => [
        r("div", null, [
          P(Qe, {
            icon: o(Oo),
            title: o(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          r("div", sc, [
            r("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: v,
              onClick: V
            }, [
              $.value ? (_(), g("div", oc, b(o(n)("Release to drop these files.")), 1)) : (_(), g("div", rc, b(o(n)("Drag and drop the files/folders to here or click here.")), 1))
            ], 512),
            r("div", {
              ref_key: "container",
              ref: i,
              class: "vuefinder__upload-modal__buttons"
            }, [
              r("button", {
                ref_key: "pickFiles",
                ref: u,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(o(n)("Select Files")), 513),
              r("button", {
                ref_key: "pickFolders",
                ref: f,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(o(n)("Select Folders")), 513),
              r("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: h.value,
                onClick: B[0] || (B[0] = (k) => T(!1))
              }, b(o(n)("Clear all")), 9, ac),
              r("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: h.value,
                onClick: B[1] || (B[1] = (k) => T(!0))
              }, b(o(n)("Clear only successful")), 9, lc)
            ], 512),
            r("div", ic, [
              (_(!0), g(ge, null, ke(p.value, (k) => (_(), g("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: k.id
              }, [
                r("span", {
                  class: ae(["vuefinder__upload-modal__file-icon", R(k)])
                }, [
                  r("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: b(w(k))
                  }, null, 8, cc)
                ], 2),
                r("div", dc, [
                  r("div", uc, b(o(Pn)(k.name, 40)) + " (" + b(k.size) + ")", 1),
                  r("div", _c, b(o(Pn)(k.name, 16)) + " (" + b(k.size) + ")", 1),
                  r("div", {
                    class: ae(["vuefinder__upload-modal__file-status", R(k)])
                  }, [
                    J(b(k.statusName) + " ", 1),
                    k.status === c.value.QUEUE_ENTRY_STATUS.UPLOADING ? (_(), g("b", vc, b(k.percent), 1)) : q("", !0)
                  ], 2)
                ]),
                r("button", {
                  type: "button",
                  class: ae(["vuefinder__upload-modal__file-remove", h.value ? "disabled" : ""]),
                  title: o(n)("Delete"),
                  disabled: h.value,
                  onClick: (N) => C(k)
                }, pc, 10, fc)
              ]))), 128)),
              p.value.length ? q("", !0) : (_(), g("div", hc, b(o(n)("No files selected!")), 1))
            ]),
            m.value.length ? (_(), W(We, {
              key: 0,
              onHidden: B[2] || (B[2] = (k) => m.value = ""),
              error: ""
            }, {
              default: Q(() => [
                J(b(m.value), 1)
              ]),
              _: 1
            })) : q("", !0)
          ])
        ]),
        r("input", {
          ref_key: "internalFileInput",
          ref: d,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        r("input", {
          ref_key: "internalFolderInput",
          ref: l,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }));
  }
}, wc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, yc = /* @__PURE__ */ r("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), $c = [
  yc
];
function kc(t, e) {
  return _(), g("svg", wc, [...$c]);
}
const Fo = { render: kc }, xc = { class: "vuefinder__unarchive-modal__content" }, Sc = { class: "vuefinder__unarchive-modal__items" }, Cc = { class: "vuefinder__unarchive-modal__item" }, Ec = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ac = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Tc = [
  Ac
], Mc = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Dc = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Vc = [
  Dc
], Lc = { class: "vuefinder__unarchive-modal__item-name" }, Oc = { class: "vuefinder__unarchive-modal__info" }, Ho = {
  __name: "ModalUnarchive",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = M(e.modal.data.items[0]), s = M(""), c = M([]), i = () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: a.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("The file unarchived.") });
        },
        onError: (d) => {
          s.value = n(d.message);
        }
      });
    };
    return (d, l) => (_(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Unarchive")), 1),
        r("button", {
          type: "button",
          onClick: l[1] || (l[1] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          P(Qe, {
            icon: o(Fo),
            title: o(n)("Unarchive")
          }, null, 8, ["icon", "title"]),
          r("div", xc, [
            r("div", Sc, [
              (_(!0), g(ge, null, ke(c.value, (u) => (_(), g("p", Cc, [
                u.type === "dir" ? (_(), g("svg", Ec, Tc)) : (_(), g("svg", Mc, Vc)),
                r("span", Lc, b(u.basename), 1)
              ]))), 256)),
              r("p", Oc, b(o(n)("The archive will be unarchived at")) + " (" + b(o(e).fs.data.dirname) + ")", 1),
              s.value.length ? (_(), W(We, {
                key: 0,
                onHidden: l[0] || (l[0] = (u) => s.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(b(s.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Fc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Hc = /* @__PURE__ */ r("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), Rc = [
  Hc
];
function Bc(t, e) {
  return _(), g("svg", Fc, [...Rc]);
}
const Ro = { render: Bc }, Ic = { class: "vuefinder__archive-modal__content" }, Nc = { class: "vuefinder__archive-modal__form" }, Uc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, qc = { class: "vuefinder__archive-modal__file" }, zc = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Pc = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), jc = [
  Pc
], Gc = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Kc = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Wc = [
  Kc
], Yc = { class: "vuefinder__archive-modal__file-name" }, Xc = ["placeholder"], Bo = {
  __name: "ModalArchive",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = M(""), s = M(""), c = M(e.modal.data.items), i = () => {
      c.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: c.value.map(({ path: d, type: l }) => ({ path: d, type: l })),
          name: a.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("The file(s) archived.") });
        },
        onError: (d) => {
          s.value = n(d.message);
        }
      });
    };
    return (d, l) => (_(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Archive")), 1),
        r("button", {
          type: "button",
          onClick: l[2] || (l[2] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          P(Qe, {
            icon: o(Ro),
            title: o(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          r("div", Ic, [
            r("div", Nc, [
              r("div", Uc, [
                (_(!0), g(ge, null, ke(c.value, (u) => (_(), g("p", qc, [
                  u.type === "dir" ? (_(), g("svg", zc, jc)) : (_(), g("svg", Gc, Wc)),
                  r("span", Yc, b(u.basename), 1)
                ]))), 256))
              ]),
              ue(r("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => a.value = u),
                onKeyup: $t(i, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: o(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Xc), [
                [kt, a.value]
              ]),
              s.value.length ? (_(), W(We, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => s.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(b(s.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Jc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
}, Zc = /* @__PURE__ */ r("circle", {
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4",
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
}, null, -1), Qc = /* @__PURE__ */ r("path", {
  fill: "currentColor",
  d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
  class: "opacity-75"
}, null, -1), ed = [
  Zc,
  Qc
];
function td(t, e) {
  return _(), g("svg", Jc, [...ed]);
}
const is = { render: td }, nd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, sd = /* @__PURE__ */ r("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1), od = [
  sd
];
function rd(t, e) {
  return _(), g("svg", nd, [...od]);
}
const ad = { render: rd }, ld = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, id = /* @__PURE__ */ r("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1), cd = [
  id
];
function dd(t, e) {
  return _(), g("svg", ld, [...cd]);
}
const ud = { render: dd }, _d = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, vd = /* @__PURE__ */ r("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1), fd = [
  vd
];
function md(t, e) {
  return _(), g("svg", _d, [...fd]);
}
const pd = { render: md }, hd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, gd = /* @__PURE__ */ r("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1), bd = [
  gd
];
function wd(t, e) {
  return _(), g("svg", hd, [...bd]);
}
const yd = { render: wd }, $d = { class: "vuefinder__toolbar" }, kd = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, xd = ["title"], Sd = ["title"], Cd = ["title"], Ed = ["title"], Ad = ["title"], Td = ["title"], Md = ["title"], Dd = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, Vd = { class: "pl-2" }, Ld = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Od = { class: "vuefinder__toolbar__controls" }, Fd = ["title"], Hd = ["title"], Rd = {
  __name: "Toolbar",
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n } = e.storage, { t: a } = e.i18n, s = e.dragSelect, c = M("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      c.value = l;
    });
    const i = () => {
      e.fullScreen = !e.fullScreen;
    };
    He(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", n("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    });
    const d = () => {
      e.view = e.view === "list" ? "grid" : "list", s.refreshSelection(), n("viewport", e.view);
    };
    return (l, u) => (_(), g("div", $d, [
      c.value.length ? (_(), g("div", Dd, [
        r("div", Vd, [
          J(b(o(a)("Search results for")) + " ", 1),
          r("span", Ld, b(c.value), 1)
        ]),
        o(e).fs.loading ? (_(), W(o(is), { key: 0 })) : q("", !0)
      ])) : (_(), g("div", kd, [
        o(e).features.includes(o(de).NEW_FOLDER) ? (_(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: o(a)("New Folder"),
          onClick: u[0] || (u[0] = (f) => o(e).modal.open(Vo, { items: o(s).getSelected() }))
        }, [
          P(o(Do))
        ], 8, xd)) : q("", !0),
        o(e).features.includes(o(de).NEW_FILE) ? (_(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: o(a)("New File"),
          onClick: u[1] || (u[1] = (f) => o(e).modal.open(Zi, { items: o(s).getSelected() }))
        }, [
          P(o(Lo))
        ], 8, Sd)) : q("", !0),
        o(e).features.includes(o(de).RENAME) ? (_(), g("div", {
          key: 2,
          class: "mx-1.5",
          title: o(a)("Rename"),
          onClick: u[2] || (u[2] = (f) => o(s).getCount() !== 1 || o(e).modal.open(ls, { items: o(s).getSelected() }))
        }, [
          P(o(Mo), {
            class: ae(o(s).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Cd)) : q("", !0),
        o(e).features.includes(o(de).DELETE) ? (_(), g("div", {
          key: 3,
          class: "mx-1.5",
          title: o(a)("Delete"),
          onClick: u[3] || (u[3] = (f) => !o(s).getCount() || o(e).modal.open(as, { items: o(s).getSelected() }))
        }, [
          P(o(To), {
            class: ae(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ed)) : q("", !0),
        o(e).features.includes(o(de).UPLOAD) ? (_(), g("div", {
          key: 4,
          class: "mx-1.5",
          title: o(a)("Upload"),
          onClick: u[4] || (u[4] = (f) => o(e).modal.open(bc, { items: o(s).getSelected() }))
        }, [
          P(o(Oo))
        ], 8, Ad)) : q("", !0),
        o(e).features.includes(o(de).UNARCHIVE) && o(s).getCount() === 1 && o(s).getSelected()[0].mime_type === "application/zip" ? (_(), g("div", {
          key: 5,
          class: "mx-1.5",
          title: o(a)("Unarchive"),
          onClick: u[5] || (u[5] = (f) => !o(s).getCount() || o(e).modal.open(Ho, { items: o(s).getSelected() }))
        }, [
          P(o(Fo), {
            class: ae(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Td)) : q("", !0),
        o(e).features.includes(o(de).ARCHIVE) ? (_(), g("div", {
          key: 6,
          class: "mx-1.5",
          title: o(a)("Archive"),
          onClick: u[6] || (u[6] = (f) => !o(s).getCount() || o(e).modal.open(Bo, { items: o(s).getSelected() }))
        }, [
          P(o(Ro), {
            class: ae(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Md)) : q("", !0)
      ])),
      r("div", Od, [
        o(e).features.includes(o(de).FULL_SCREEN) ? (_(), g("div", {
          key: 0,
          onClick: i,
          class: "mx-1.5",
          title: o(a)("Toggle Full Screen")
        }, [
          o(e).fullScreen ? (_(), W(o(ud), { key: 0 })) : (_(), W(o(ad), { key: 1 }))
        ], 8, Fd)) : q("", !0),
        r("div", {
          class: "mx-1.5",
          title: o(a)("Change View"),
          onClick: u[7] || (u[7] = (f) => c.value.length || d())
        }, [
          o(e).view === "grid" ? (_(), W(o(pd), {
            key: 0,
            class: ae(["vf-toolbar-icon", c.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : q("", !0),
          o(e).view === "list" ? (_(), W(o(yd), {
            key: 1,
            class: ae(["vf-toolbar-icon", c.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : q("", !0)
        ], 8, Hd)
      ])
    ]));
  }
}, Bd = (t, e = 0, n = !1) => {
  let a;
  return (...s) => {
    n && !a && t(...s), clearTimeout(a), a = setTimeout(() => {
      t(...s);
    }, e);
  };
}, Vs = (t, e, n) => {
  const a = M(t);
  return sr((s, c) => ({
    get() {
      return s(), a.value;
    },
    set: Bd(
      (i) => {
        a.value = i, c();
      },
      e,
      n
    )
  }));
}, Id = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
}, Nd = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
}, null, -1), Ud = [
  Nd
];
function qd(t, e) {
  return _(), g("svg", Id, [...Ud]);
}
const zd = { render: qd }, Pd = { class: "vuefinder__move-modal__content" }, jd = { class: "vuefinder__move-modal__description" }, Gd = { class: "vuefinder__move-modal__files vf-scrollbar" }, Kd = { class: "vuefinder__move-modal__file" }, Wd = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Yd = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Xd = [
  Yd
], Jd = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Zd = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Qd = [
  Zd
], eu = { class: "vuefinder__move-modal__file-name" }, tu = { class: "vuefinder__move-modal__target-title" }, nu = { class: "vuefinder__move-modal__target-directory" }, su = /* @__PURE__ */ r("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ r("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })
], -1), ou = { class: "vuefinder__move-modal__target-path" }, ru = { class: "vuefinder__move-modal__selected-items" }, jn = {
  __name: "ModalMove",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = M(e.modal.data.items.from), s = M(""), c = () => {
      a.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "move",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: a.value.map(({ path: i, type: d }) => ({ path: i, type: d })),
          item: e.modal.data.items.to.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files moved.", e.modal.data.items.to.name) });
        },
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (_(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Yes, Move!")), 1),
        r("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1),
        r("div", ru, b(o(n)("%s item(s) selected.", a.value.length)), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          P(Qe, {
            icon: o(zd),
            title: o(n)("Move files")
          }, null, 8, ["icon", "title"]),
          r("div", Pd, [
            r("p", jd, b(o(n)("Are you sure you want to move these files?")), 1),
            r("div", Gd, [
              (_(!0), g(ge, null, ke(a.value, (l) => (_(), g("div", Kd, [
                r("div", null, [
                  l.type === "dir" ? (_(), g("svg", Wd, Xd)) : (_(), g("svg", Jd, Qd))
                ]),
                r("div", eu, b(l.path), 1)
              ]))), 256))
            ]),
            r("h4", tu, b(o(n)("Target Directory")), 1),
            r("p", nu, [
              su,
              r("span", ou, b(o(e).modal.data.items.to.path), 1)
            ]),
            s.value.length ? (_(), W(We, {
              key: 0,
              onHidden: d[0] || (d[0] = (l) => s.value = ""),
              error: ""
            }, {
              default: Q(() => [
                J(b(s.value), 1)
              ]),
              _: 1
            })) : q("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, au = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
}, lu = /* @__PURE__ */ r("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1), iu = [
  lu
];
function cu(t, e) {
  return _(), g("svg", au, [...iu]);
}
const du = { render: cu }, uu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
}, _u = /* @__PURE__ */ r("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
  class: "pointer-events-none",
  "clip-rule": "evenodd"
}, null, -1), vu = [
  _u
];
function fu(t, e) {
  return _(), g("svg", uu, [...vu]);
}
const mu = { render: fu }, pu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
}, hu = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), gu = [
  hu
];
function bu(t, e) {
  return _(), g("svg", pu, [...gu]);
}
const wu = { render: bu }, yu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
}, $u = /* @__PURE__ */ r("path", {
  d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
  class: "pointer-events-none"
}, null, -1), ku = [
  $u
];
function xu(t, e) {
  return _(), g("svg", yu, [...ku]);
}
const Su = { render: xu }, Cu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
}, Eu = /* @__PURE__ */ r("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1), Au = [
  Eu
];
function Tu(t, e) {
  return _(), g("svg", Cu, [...Au]);
}
const Mu = { render: Tu }, Du = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
}, Vu = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), Lu = [
  Vu
];
function Ou(t, e) {
  return _(), g("svg", Du, [...Lu]);
}
const Fu = { render: Ou }, Hu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
}, Ru = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
}, null, -1), Bu = [
  Ru
];
function Iu(t, e) {
  return _(), g("svg", Hu, [...Bu]);
}
const pn = { render: Iu }, Nu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
}, Uu = /* @__PURE__ */ r("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), qu = /* @__PURE__ */ r("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1), zu = [
  Uu,
  qu
];
function Pu(t, e) {
  return _(), g("svg", Nu, [...zu]);
}
const ju = { render: Pu }, Gu = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
}, Ku = /* @__PURE__ */ r("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1), Wu = [
  Ku
];
function Yu(t, e) {
  return _(), g("svg", Gu, [...Wu]);
}
const Xu = { render: Yu }, Ju = { class: "vuefinder__breadcrumb__container" }, Zu = ["title"], Qu = ["title"], e_ = ["title"], t_ = ["title"], n_ = { class: "vuefinder__breadcrumb__list" }, s_ = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, o_ = /* @__PURE__ */ r("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1), r_ = { class: "relative" }, a_ = /* @__PURE__ */ r("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1), l_ = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], i_ = { class: "vuefinder__breadcrumb__search-mode" }, c_ = ["placeholder"], d_ = { class: "vuefinder__breadcrumb__hidden-dropdown" }, u_ = ["onDrop", "onClick"], __ = { class: "vuefinder__breadcrumb__hidden-item-content" }, v_ = { class: "vuefinder__breadcrumb__hidden-item-text" }, f_ = {
  __name: "Breadcrumb",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = e.dragSelect, { setStore: s } = e.storage, c = M(null), i = Vs(0, 100);
    He(i, (E) => {
      const C = c.value.children;
      let T = 0, S = 0, x = 5, L = 1;
      e.fs.limitBreadcrumbItems(x), ct(() => {
        for (let B = C.length - 1; B >= 0 && !(T + C[B].offsetWidth > i.value - 40); B--)
          T += parseInt(C[B].offsetWidth, 10), S++;
        S < L && (S = L), S > x && (S = x), e.fs.limitBreadcrumbItems(S);
      });
    });
    const d = () => {
      c.value && (i.value = c.value.offsetWidth);
    };
    xe(() => {
      new ResizeObserver(d).observe(c.value);
    });
    const l = (E, C = null) => {
      E.preventDefault(), a.isDraggingRef.value = !1, v(E), C ?? (C = e.fs.hiddenBreadcrumbs.length - 1);
      let T = JSON.parse(E.dataTransfer.getData("items"));
      if (T.find((S) => S.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(jn, {
        items: {
          from: T,
          to: e.fs.hiddenBreadcrumbs[C] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, u = (E, C = null) => {
      E.preventDefault(), a.isDraggingRef.value = !1, v(E), C ?? (C = e.fs.breadcrumbs.length - 2);
      let T = JSON.parse(E.dataTransfer.getData("items"));
      if (T.find((S) => S.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(jn, {
        items: {
          from: T,
          to: e.fs.breadcrumbs[C] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, f = (E) => {
      E.preventDefault(), e.fs.isGoUpAvailable() ? (E.dataTransfer.dropEffect = "copy", E.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (E.dataTransfer.dropEffect = "none", E.dataTransfer.effectAllowed = "none");
    }, v = (E) => {
      E.preventDefault(), E.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && E.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, p = () => {
      V(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, m = () => {
      V(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, h = (E) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: E.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, $ = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, y = {
      mounted(E, C, T, S) {
        E.clickOutsideEvent = function(x) {
          E === x.target || E.contains(x.target) || C.value();
        }, document.body.addEventListener("click", E.clickOutsideEvent);
      },
      beforeUnmount(E, C, T, S) {
        document.body.removeEventListener("click", E.clickOutsideEvent);
      }
    }, D = () => {
      e.showTreeView = !e.showTreeView;
    };
    He(() => e.showTreeView, (E, C) => {
      E !== C && s("show-tree-view", E);
    });
    const O = M(null), R = () => {
      e.features.includes(de.SEARCH) && (e.fs.searchMode = !0, ct(() => O.value.focus()));
    }, w = Vs("", 400);
    He(w, (E) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: E });
    }), He(() => e.fs.searchMode, (E) => {
      E && ct(() => O.value.focus());
    });
    const V = () => {
      e.fs.searchMode = !1, w.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      V();
    });
    const z = () => {
      w.value === "" && V();
    };
    return (E, C) => (_(), g("div", Ju, [
      r("span", {
        title: o(n)("Toggle Tree View")
      }, [
        P(o(ju), {
          onClick: D,
          class: ae(["vuefinder__breadcrumb__toggle-tree", o(e).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, Zu),
      r("span", {
        title: o(n)("Go up a directory")
      }, [
        P(o(mu), {
          onDragover: C[0] || (C[0] = (T) => f(T)),
          onDragleave: C[1] || (C[1] = (T) => v(T)),
          onDrop: C[2] || (C[2] = (T) => u(T)),
          onClick: m,
          class: ae(o(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive")
        }, null, 8, ["class"])
      ], 8, Qu),
      o(e).fs.loading ? (_(), g("span", {
        key: 1,
        title: o(n)("Cancel")
      }, [
        P(o(wu), {
          onClick: C[3] || (C[3] = (T) => o(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, t_)) : (_(), g("span", {
        key: 0,
        title: o(n)("Refresh")
      }, [
        P(o(du), { onClick: p })
      ], 8, e_)),
      ue(r("div", {
        onClick: st(R, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        r("div", null, [
          P(o(Su), {
            onDragover: C[4] || (C[4] = (T) => f(T)),
            onDragleave: C[5] || (C[5] = (T) => v(T)),
            onDrop: C[6] || (C[6] = (T) => u(T, -1)),
            onClick: C[7] || (C[7] = (T) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter } }))
          })
        ]),
        r("div", n_, [
          o(e).fs.hiddenBreadcrumbs.length ? ue((_(), g("div", s_, [
            o_,
            r("div", r_, [
              r("span", {
                onDragenter: C[8] || (C[8] = (T) => o(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: C[9] || (C[9] = (T) => o(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                P(o(Xu), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [y, $]
          ]) : q("", !0)
        ]),
        r("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: st(R, ["self"])
        }, [
          (_(!0), g(ge, null, ke(o(e).fs.breadcrumbs, (T, S) => (_(), g("div", { key: S }, [
            a_,
            r("span", {
              onDragover: (x) => S === o(e).fs.breadcrumbs.length - 1 || f(x),
              onDragleave: (x) => S === o(e).fs.breadcrumbs.length - 1 || v(x),
              onDrop: (x) => S === o(e).fs.breadcrumbs.length - 1 || u(x, S),
              class: "vuefinder__breadcrumb__item",
              title: T.basename,
              onClick: (x) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter, path: T.path } })
            }, b(T.name), 41, l_)
          ]))), 128))
        ], 512),
        o(e).fs.loading ? (_(), W(o(is), { key: 0 })) : q("", !0)
      ], 512), [
        [Ue, !o(e).fs.searchMode]
      ]),
      ue(r("div", i_, [
        r("div", null, [
          P(o(Mu))
        ]),
        ue(r("input", {
          ref_key: "searchInput",
          ref: O,
          onKeydown: $t(V, ["esc"]),
          onBlur: z,
          "onUpdate:modelValue": C[10] || (C[10] = (T) => or(w) ? w.value = T : null),
          placeholder: o(n)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, c_), [
          [kt, o(w)]
        ]),
        P(o(Fu), { onClick: V })
      ], 512), [
        [Ue, o(e).fs.searchMode]
      ]),
      ue(r("div", d_, [
        (_(!0), g(ge, null, ke(o(e).fs.hiddenBreadcrumbs, (T, S) => (_(), g("div", {
          key: S,
          onDragover: C[11] || (C[11] = (x) => f(x)),
          onDragleave: C[12] || (C[12] = (x) => v(x)),
          onDrop: (x) => l(x, S),
          onClick: (x) => h(T),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          r("div", __, [
            r("span", null, [
              P(o(pn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
            ]),
            J(),
            r("span", v_, b(T.name), 1)
          ])
        ], 40, u_))), 128))
      ], 512), [
        [Ue, o(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, Io = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), m_ = ["onClick"], p_ = {
  __name: "Toast",
  setup(t) {
    const e = re("ServiceContainer"), { getStore: n } = e.storage, a = M(n("full-screen", !1)), s = M([]), c = (l) => l === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", i = (l) => {
      s.value.splice(l, 1);
    }, d = (l) => {
      let u = s.value.findIndex((f) => f.id === l);
      u !== -1 && i(u);
    };
    return e.emitter.on("vf-toast-clear", () => {
      s.value = [];
    }), e.emitter.on("vf-toast-push", (l) => {
      let u = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      l.id = u, s.value.push(l), setTimeout(() => {
        d(u);
      }, 5e3);
    }), (l, u) => (_(), g("div", {
      class: ae(["vuefinder__toast", a.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      P(rr, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: Q(() => [
          (_(!0), g(ge, null, ke(s.value, (f, v) => (_(), g("div", {
            key: v,
            onClick: (p) => i(v),
            class: ae(["vuefinder__toast__message", c(f.type)])
          }, b(f.label), 11, m_))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, h_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, g_ = /* @__PURE__ */ r("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
  "clip-rule": "evenodd"
}, null, -1), b_ = [
  g_
];
function w_(t, e) {
  return _(), g("svg", h_, [...b_]);
}
const y_ = { render: w_ }, $_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, k_ = /* @__PURE__ */ r("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
  "clip-rule": "evenodd"
}, null, -1), x_ = [
  k_
];
function S_(t, e) {
  return _(), g("svg", $_, [...x_]);
}
const C_ = { render: S_ }, Gt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, n) => (_(), g("div", null, [
      t.direction === "asc" ? (_(), W(o(y_), { key: 0 })) : q("", !0),
      t.direction === "desc" ? (_(), W(o(C_), { key: 1 })) : q("", !0)
    ]));
  }
}, E_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
}, A_ = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), T_ = [
  A_
];
function M_(t, e) {
  return _(), g("svg", E_, [...T_]);
}
const D_ = { render: M_ }, V_ = { class: "vuefinder__item-icon" }, Cn = {
  __name: "ItemIcon",
  props: {
    type: {
      type: String,
      required: !0
    },
    small: {
      type: Boolean,
      default: !1
    }
  },
  setup(t) {
    return (e, n) => (_(), g("span", V_, [
      t.type === "dir" ? (_(), W(o(pn), {
        key: 0,
        class: ae(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (_(), W(o(D_), {
        key: 1,
        class: ae(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"]))
    ]));
  }
}, L_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
}, O_ = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), F_ = [
  O_
];
function H_(t, e) {
  return _(), g("svg", L_, [...F_]);
}
const R_ = { render: H_ }, B_ = { class: "vuefinder__drag-item__container" }, I_ = { class: "vuefinder__drag-item__count" }, N_ = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (n, a) => (_(), g("div", B_, [
      P(o(R_)),
      r("div", I_, b(e.count), 1)
    ]));
  }
}, U_ = { class: "vuefinder__text-preview" }, q_ = { class: "vuefinder__text-preview__header" }, z_ = ["title"], P_ = { class: "vuefinder__text-preview__actions" }, j_ = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, G_ = { key: 1 }, K_ = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, a = M(""), s = M(""), c = M(null), i = M(!1), d = M(""), l = M(!1), u = re("ServiceContainer"), { t: f } = u.i18n;
    xe(() => {
      u.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: u.modal.data.adapter, path: u.modal.data.item.path },
        responseType: "text"
      }).then((m) => {
        a.value = m, n("success");
      });
    });
    const v = () => {
      i.value = !i.value, s.value = a.value;
    }, p = () => {
      d.value = "", l.value = !1, u.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: u.modal.data.adapter,
          path: u.modal.data.item.path
        },
        body: {
          content: s.value
        },
        responseType: "text"
      }).then((m) => {
        d.value = f("Updated."), a.value = m, n("success"), i.value = !i.value;
      }).catch((m) => {
        d.value = f(m.message), l.value = !0;
      });
    };
    return (m, h) => (_(), g("div", U_, [
      r("div", q_, [
        r("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: o(u).modal.data.item.path
        }, b(o(u).modal.data.item.basename), 9, z_),
        r("div", P_, [
          i.value ? (_(), g("button", {
            key: 0,
            onClick: p,
            class: "vuefinder__text-preview__save-button"
          }, b(o(f)("Save")), 1)) : q("", !0),
          o(u).features.includes(o(de).EDIT) ? (_(), g("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: h[0] || (h[0] = ($) => v())
          }, b(i.value ? o(f)("Cancel") : o(f)("Edit")), 1)) : q("", !0)
        ])
      ]),
      r("div", null, [
        i.value ? (_(), g("div", G_, [
          ue(r("textarea", {
            ref_key: "editInput",
            ref: c,
            "onUpdate:modelValue": h[1] || (h[1] = ($) => s.value = $),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [kt, s.value]
          ])
        ])) : (_(), g("pre", j_, b(a.value), 1)),
        d.value.length ? (_(), W(We, {
          key: 2,
          onHidden: h[2] || (h[2] = ($) => d.value = ""),
          error: l.value
        }, {
          default: Q(() => [
            J(b(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : q("", !0)
      ])
    ]));
  }
}, W_ = { class: "vuefinder__image-preview" }, Y_ = { class: "vuefinder__image-preview__header" }, X_ = ["title"], J_ = { class: "vuefinder__image-preview__actions" }, Z_ = { class: "vuefinder__image-preview__image-container" }, Q_ = ["src"], ev = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, a = re("ServiceContainer"), { t: s } = a.i18n, c = M(null), i = M(null), d = M(!1), l = M(""), u = M(!1), f = () => {
      d.value = !d.value, d.value ? i.value = new mr(c.value, {
        crop(p) {
        }
      }) : i.value.destroy();
    }, v = () => {
      i.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (p) => {
          l.value = "", u.value = !1;
          const m = new FormData();
          m.set("file", p), a.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: a.modal.data.adapter,
              path: a.modal.data.item.path
            },
            body: m
          }).then((h) => {
            l.value = s("Updated."), c.value.src = a.requester.getPreviewUrl(a.modal.data.adapter, a.modal.data.item), f(), n("success");
          }).catch((h) => {
            l.value = s(h.message), u.value = !0;
          });
        }
      );
    };
    return xe(() => {
      n("success");
    }), (p, m) => (_(), g("div", W_, [
      r("div", Y_, [
        r("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: o(a).modal.data.item.path
        }, b(o(a).modal.data.item.basename), 9, X_),
        r("div", J_, [
          d.value ? (_(), g("button", {
            key: 0,
            onClick: v,
            class: "vuefinder__image-preview__crop-button"
          }, b(o(s)("Crop")), 1)) : q("", !0),
          o(a).features.includes(o(de).EDIT) ? (_(), g("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: m[0] || (m[0] = (h) => f())
          }, b(d.value ? o(s)("Cancel") : o(s)("Edit")), 1)) : q("", !0)
        ])
      ]),
      r("div", Z_, [
        r("img", {
          ref_key: "image",
          ref: c,
          class: "vuefinder__image-preview__image",
          src: o(a).requester.getPreviewUrl(o(a).modal.data.adapter, o(a).modal.data.item),
          alt: ""
        }, null, 8, Q_)
      ]),
      l.value.length ? (_(), W(We, {
        key: 0,
        onHidden: m[1] || (m[1] = (h) => l.value = ""),
        error: u.value
      }, {
        default: Q(() => [
          J(b(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : q("", !0)
    ]));
  }
}, tv = { class: "vuefinder__default-preview" }, nv = { class: "vuefinder__default-preview__header" }, sv = ["title"], ov = /* @__PURE__ */ r("div", null, null, -1), rv = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), a = e;
    return xe(() => {
      a("success");
    }), (s, c) => (_(), g("div", tv, [
      r("div", nv, [
        r("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: o(n).modal.data.item.path
        }, b(o(n).modal.data.item.basename), 9, sv)
      ]),
      ov
    ]));
  }
}, av = { class: "vuefinder__video-preview" }, lv = ["title"], iv = {
  class: "vuefinder__video-preview__video",
  preload: "",
  controls: ""
}, cv = ["src"], dv = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), a = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return xe(() => {
      a("success");
    }), (c, i) => (_(), g("div", av, [
      r("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, lv),
      r("div", null, [
        r("video", iv, [
          r("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, cv),
          J(" Your browser does not support the video tag. ")
        ])
      ])
    ]));
  }
}, uv = { class: "vuefinder__audio-preview" }, _v = ["title"], vv = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, fv = ["src"], mv = {
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, a = re("ServiceContainer"), s = () => a.requester.getPreviewUrl(a.modal.data.adapter, a.modal.data.item);
    return xe(() => {
      n("success");
    }), (c, i) => (_(), g("div", uv, [
      r("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: o(a).modal.data.item.path
      }, b(o(a).modal.data.item.basename), 9, _v),
      r("div", null, [
        r("audio", vv, [
          r("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, fv),
          J(" Your browser does not support the audio element. ")
        ])
      ])
    ]));
  }
}, pv = { class: "vuefinder__pdf-preview" }, hv = ["title"], gv = ["data"], bv = ["src"], wv = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), a = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return xe(() => {
      a("success");
    }), (c, i) => (_(), g("div", pv, [
      r("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, hv),
      r("div", null, [
        r("object", {
          class: "vuefinder__pdf-preview__object",
          data: s(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          r("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: s(),
            width: "100%",
            height: "100%"
          }, `
          <p>
            Your browser does not support PDFs.
            <a href="https://example.com/test.pdf">Download the PDF</a>.
          </p>
        `, 8, bv)
        ], 8, gv)
      ])
    ]));
  }
}, yv = { class: "vuefinder__preview-modal__content" }, $v = { key: 0 }, kv = { class: "vuefinder__preview-modal__loading" }, xv = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Sv = /* @__PURE__ */ r("svg", {
  class: "vuefinder__preview-modal__spinner",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ r("circle", {
    class: "vuefinder__preview-modal__spinner-circle",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }),
  /* @__PURE__ */ r("path", {
    class: "vuefinder__preview-modal__spinner-path",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
], -1), Cv = { class: "vuefinder__preview-modal__details" }, Ev = { class: "font-bold" }, Av = { class: "font-bold pl-2" }, Tv = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Mv = ["download", "href"], No = {
  __name: "ModalPreview",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = M(!1), s = (i) => (e.modal.data.item.mime_type ?? "").startsWith(i), c = e.features.includes(de.PREVIEW);
    return c || (a.value = !0), (i, d) => (_(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: d[6] || (d[6] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Close")), 1),
        o(e).features.includes(o(de).DOWNLOAD) ? (_(), g("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item),
          href: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item)
        }, b(o(n)("Download")), 9, Mv)) : q("", !0)
      ]),
      default: Q(() => [
        r("div", null, [
          r("div", yv, [
            o(c) ? (_(), g("div", $v, [
              s("text") ? (_(), W(K_, {
                key: 0,
                onSuccess: d[0] || (d[0] = (l) => a.value = !0)
              })) : s("image") ? (_(), W(ev, {
                key: 1,
                onSuccess: d[1] || (d[1] = (l) => a.value = !0)
              })) : s("video") ? (_(), W(dv, {
                key: 2,
                onSuccess: d[2] || (d[2] = (l) => a.value = !0)
              })) : s("audio") ? (_(), W(mv, {
                key: 3,
                onSuccess: d[3] || (d[3] = (l) => a.value = !0)
              })) : s("application/pdf") ? (_(), W(wv, {
                key: 4,
                onSuccess: d[4] || (d[4] = (l) => a.value = !0)
              })) : (_(), W(rv, {
                key: 5,
                onSuccess: d[5] || (d[5] = (l) => a.value = !0)
              }))
            ])) : q("", !0),
            r("div", kv, [
              a.value === !1 ? (_(), g("div", xv, [
                Sv,
                r("span", null, b(o(n)("Loading")), 1)
              ])) : q("", !0)
            ])
          ])
        ]),
        r("div", Cv, [
          r("div", null, [
            r("span", Ev, b(o(n)("File Size")) + ": ", 1),
            J(b(o(e).filesize(o(e).modal.data.item.file_size)), 1)
          ]),
          r("div", null, [
            r("span", Av, b(o(n)("Last Modified")) + ": ", 1),
            J(" " + b(o(Io)(o(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        o(e).features.includes(o(de).DOWNLOAD) ? (_(), g("div", Tv, [
          r("span", null, b(o(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : q("", !0)
      ]),
      _: 1
    }));
  }
}, Dv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, Vv = /* @__PURE__ */ r("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Lv = /* @__PURE__ */ r("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1), Ov = [
  Vv,
  Lv
];
function Fv(t, e) {
  return _(), g("svg", Dv, [...Ov]);
}
const Uo = { render: Fv }, Hv = ["data-type", "data-item", "data-index"], En = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(t) {
    const e = re("ServiceContainer"), n = e.dragSelect, a = t, s = (m) => {
      m.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: m.path } })) : e.modal.open(No, { adapter: e.fs.adapter, item: m });
    }, c = {
      mounted(m, h, $, y) {
        $.props.draggable && (m.addEventListener("dragstart", (D) => i(D, h.value)), m.addEventListener("dragover", (D) => l(D, h.value)), m.addEventListener("drop", (D) => d(D, h.value)));
      },
      beforeUnmount(m, h, $, y) {
        $.props.draggable && (m.removeEventListener("dragstart", i), m.removeEventListener("dragover", l), m.removeEventListener("drop", d));
      }
    }, i = (m, h) => {
      if (m.altKey || m.ctrlKey || m.metaKey)
        return m.preventDefault(), !1;
      n.isDraggingRef.value = !0, m.dataTransfer.setDragImage(a.dragImage.$el, 0, 15), m.dataTransfer.effectAllowed = "all", m.dataTransfer.dropEffect = "copy", m.dataTransfer.setData("items", JSON.stringify(n.getSelected()));
    }, d = (m, h) => {
      m.preventDefault(), n.isDraggingRef.value = !1;
      let $ = JSON.parse(m.dataTransfer.getData("items"));
      if ($.find((y) => y.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(jn, { items: { from: $, to: h } });
    }, l = (m, h) => {
      m.preventDefault(), !h || h.type !== "dir" || n.getSelection().find(($) => $ === m.currentTarget) ? (m.dataTransfer.dropEffect = "none", m.dataTransfer.effectAllowed = "none") : m.dataTransfer.dropEffect = "copy";
    };
    let u = null, f = !1;
    const v = () => {
      u && clearTimeout(u);
    }, p = (m) => {
      if (!f)
        f = !0, setTimeout(() => f = !1, 300);
      else
        return f = !1, s(a.item), clearTimeout(u), !1;
      u = setTimeout(() => {
        const h = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: m.target.getBoundingClientRect().x,
          clientY: m.target.getBoundingClientRect().y
        });
        m.target.dispatchEvent(h);
      }, 500);
    };
    return (m, h) => ue((_(), g("div", {
      style: an({ opacity: o(n).isDraggingRef.value && o(n).getSelection().find(($) => m.$el === $) ? "0.5 !important" : "" }),
      class: ae(["vuefinder__item", "vf-item-" + o(n).explorerId]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: h[0] || (h[0] = ($) => s(t.item)),
      onTouchstart: h[1] || (h[1] = ($) => p($)),
      onTouchend: h[2] || (h[2] = ($) => v()),
      onContextmenu: h[3] || (h[3] = st(($) => o(e).emitter.emit("vf-contextmenu-show", { event: $, items: o(n).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Tt(m.$slots, "default"),
      o(e).pinnedFolders.find(($) => $.path === t.item.path) ? (_(), W(o(Uo), {
        key: 0,
        class: "vuefinder__item--pinned"
      })) : q("", !0)
    ], 46, Hv)), [
      [c, t.item]
    ]);
  }
}, Rv = { class: "vuefinder__explorer__container" }, Bv = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Iv = { class: "vuefinder__explorer__drag-item" }, Nv = { class: "vuefinder__explorer__item-list-content" }, Uv = { class: "vuefinder__explorer__item-list-name" }, qv = { class: "vuefinder__explorer__item-name" }, zv = { class: "vuefinder__explorer__item-path" }, Pv = { class: "vuefinder__explorer__item-list-content" }, jv = { class: "vuefinder__explorer__item-list-name" }, Gv = { class: "vuefinder__explorer__item-name" }, Kv = { class: "vuefinder__explorer__item-size" }, Wv = { class: "vuefinder__explorer__item-date" }, Yv = { class: "vuefinder__explorer__item-grid-content" }, Xv = ["data-src", "alt"], Jv = {
  key: 2,
  class: "vuefinder__explorer__item-extension"
}, Zv = { class: "vuefinder__explorer__item-title break-all" }, Qv = {
  __name: "Explorer",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = (v) => v == null ? void 0 : v.substring(0, 3), s = M(null), c = M(""), i = e.dragSelect;
    let d;
    e.emitter.on("vf-fullscreen-toggle", () => {
      i.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: v }) => {
      c.value = v, v ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname,
          filter: v
        },
        onSuccess: (p) => {
          p.files.length || e.emitter.emit("vf-toast-push", { label: n("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const l = yt({ active: !1, column: "", order: "" }), u = (v = !0) => {
      let p = [...e.fs.data.files], m = l.column, h = l.order === "asc" ? 1 : -1;
      if (!v)
        return p;
      const $ = (y, D) => typeof y == "string" && typeof D == "string" ? y.toLowerCase().localeCompare(D.toLowerCase()) : y < D ? -1 : y > D ? 1 : 0;
      return l.active && (p = p.slice().sort((y, D) => $(y[m], D[m]) * h)), p;
    }, f = (v) => {
      l.active && l.column === v ? (l.active = l.order === "asc", l.column = v, l.order = "desc") : (l.active = !0, l.column = v, l.order = "asc");
    };
    return xe(() => {
      d = new fr(i.area.value);
    }), Os(() => {
      d.update();
    }), rn(() => {
      d.destroy();
    }), (v, p) => (_(), g("div", Rv, [
      o(e).view === "list" || c.value.length ? (_(), g("div", Bv, [
        r("div", {
          onClick: p[0] || (p[0] = (m) => f("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          J(b(o(n)("Name")) + " ", 1),
          ue(P(Gt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Ue, l.active && l.column === "basename"]
          ])
        ]),
        c.value.length ? q("", !0) : (_(), g("div", {
          key: 0,
          onClick: p[1] || (p[1] = (m) => f("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          J(b(o(n)("Size")) + " ", 1),
          ue(P(Gt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Ue, l.active && l.column === "file_size"]
          ])
        ])),
        c.value.length ? q("", !0) : (_(), g("div", {
          key: 1,
          onClick: p[2] || (p[2] = (m) => f("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          J(b(o(n)("Date")) + " ", 1),
          ue(P(Gt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Ue, l.active && l.column === "last_modified"]
          ])
        ])),
        c.value.length ? (_(), g("div", {
          key: 2,
          onClick: p[3] || (p[3] = (m) => f("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          J(b(o(n)("Filepath")) + " ", 1),
          ue(P(Gt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Ue, l.active && l.column === "path"]
          ])
        ])) : q("", !0)
      ])) : q("", !0),
      r("div", Iv, [
        P(N_, {
          ref_key: "dragImage",
          ref: s,
          count: o(i).getCount()
        }, null, 8, ["count"])
      ]),
      r("div", {
        ref: o(i).scrollBarContainer,
        class: ae(["vf-explorer-scrollbar-container vuefinder__explorer__scrollbar-container", [{ "grid-view": o(e).view === "grid" }, { "search-active": c.value.length }]])
      }, [
        r("div", {
          ref: o(i).scrollBar,
          class: "vuefinder__explorer__scrollbar"
        }, null, 512)
      ], 2),
      r("div", {
        ref: o(i).area,
        class: "vuefinder__explorer__selector-area vf-explorer-scrollbar vf-selector-area",
        onContextmenu: p[4] || (p[4] = st((m) => o(e).emitter.emit("vf-contextmenu-show", { event: m, items: o(i).getSelected() }), ["self", "prevent"]))
      }, [
        c.value.length ? (_(!0), g(ge, { key: 0 }, ke(u(), (m, h) => (_(), W(En, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list"
        }, {
          default: Q(() => [
            r("div", Nv, [
              r("div", Uv, [
                P(Cn, {
                  type: m.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                r("span", qv, b(m.basename), 1)
              ]),
              r("div", zv, b(m.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : q("", !0),
        o(e).view === "list" && !c.value.length ? (_(!0), g(ge, { key: 1 }, ke(u(), (m, h) => (_(), W(En, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: m.path
        }, {
          default: Q(() => [
            r("div", Pv, [
              r("div", jv, [
                P(Cn, {
                  type: m.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                r("span", Gv, b(m.basename), 1)
              ]),
              r("div", Kv, b(m.file_size ? o(e).filesize(m.file_size) : ""), 1),
              r("div", Wv, b(o(Io)(m.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : q("", !0),
        o(e).view === "grid" && !c.value.length ? (_(!0), g(ge, { key: 2 }, ke(u(!1), (m, h) => (_(), W(En, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: Q(() => [
            r("div", null, [
              r("div", Yv, [
                (m.mime_type ?? "").startsWith("image") && o(e).showThumbnails ? (_(), g("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": o(e).requester.getPreviewUrl(o(e).fs.adapter, m),
                  alt: m.basename,
                  key: m.path
                }, null, 8, Xv)) : (_(), W(Cn, {
                  key: 1,
                  type: m.type
                }, null, 8, ["type"])),
                !((m.mime_type ?? "").startsWith("image") && o(e).showThumbnails) && m.type !== "dir" ? (_(), g("div", Jv, b(a(m.extension)), 1)) : q("", !0)
              ]),
              r("span", Zv, b(o(Pn)(m.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : q("", !0)
      ], 544),
      P(p_)
    ]));
  }
}, ef = ["href", "download"], tf = ["onClick"], nf = {
  __name: "ContextMenu",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = M(null), s = M([]), c = M(""), i = yt({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = rt(() => i.items.filter((v) => v.key == null || e.features.includes(v.key)));
    e.emitter.on("vf-context-selected", (v) => {
      s.value = v;
    });
    const l = {
      newfolder: {
        key: de.NEW_FOLDER,
        title: () => n("New Folder"),
        action: () => e.modal.open(Vo)
      },
      selectAll: {
        title: () => n("Select All"),
        action: () => e.dragSelect.selectAll()
      },
      pinFolder: {
        title: () => n("Pin Folder"),
        action: () => {
          e.pinnedFolders = e.pinnedFolders.concat(s.value), e.storage.setStore("pinned-folders", e.pinnedFolders);
        }
      },
      unpinFolder: {
        title: () => n("Unpin Folder"),
        action: () => {
          e.pinnedFolders = e.pinnedFolders.filter((v) => !s.value.find((p) => p.path === v.path)), e.storage.setStore("pinned-folders", e.pinnedFolders);
        }
      },
      delete: {
        key: de.DELETE,
        title: () => n("Delete"),
        action: () => {
          e.modal.open(as, { items: s });
        }
      },
      refresh: {
        title: () => n("Refresh"),
        action: () => {
          e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
        }
      },
      preview: {
        key: de.PREVIEW,
        title: () => n("Preview"),
        action: () => e.modal.open(No, { adapter: e.fs.adapter, item: s.value[0] })
      },
      open: {
        title: () => n("Open"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: s.value[0].path
            }
          });
        }
      },
      openDir: {
        title: () => n("Open containing folder"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: s.value[0].dir
            }
          });
        }
      },
      download: {
        key: de.DOWNLOAD,
        link: rt(() => e.requester.getDownloadUrl(e.fs.adapter, s.value[0])),
        title: () => n("Download"),
        action: () => {
        }
      },
      archive: {
        key: de.ARCHIVE,
        title: () => n("Archive"),
        action: () => e.modal.open(Bo, { items: s })
      },
      unarchive: {
        key: de.UNARCHIVE,
        title: () => n("Unarchive"),
        action: () => e.modal.open(Ho, { items: s })
      },
      rename: {
        key: de.RENAME,
        title: () => n("Rename"),
        action: () => e.modal.open(ls, { items: s })
      }
    }, u = (v) => {
      e.emitter.emit("vf-contextmenu-hide"), v.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: v }) => {
      c.value = v;
    }), e.emitter.on("vf-contextmenu-show", ({ event: v, items: p, target: m = null }) => {
      if (i.items = [], c.value)
        if (m)
          i.items.push(l.openDir), e.emitter.emit("vf-context-selected", [m]);
        else
          return;
      else !m && !c.value ? (i.items.push(l.refresh), i.items.push(l.selectAll), i.items.push(l.newfolder), e.emitter.emit("vf-context-selected", [])) : p.length > 1 && p.some((h) => h.path === m.path) ? (i.items.push(l.refresh), i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", p)) : (m.type === "dir" ? (i.items.push(l.open), e.pinnedFolders.findIndex((h) => h.path === m.path) !== -1 ? i.items.push(l.unpinFolder) : i.items.push(l.pinFolder)) : (i.items.push(l.preview), i.items.push(l.download)), i.items.push(l.rename), m.mime_type === "application/zip" ? i.items.push(l.unarchive) : i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", [m]));
      f(v);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const f = (v) => {
      const p = e.dragSelect.area.value, m = e.root.getBoundingClientRect(), h = p.getBoundingClientRect();
      let $ = v.clientX - m.left, y = v.clientY - m.top;
      i.active = !0, ct(() => {
        var w;
        const D = (w = a.value) == null ? void 0 : w.getBoundingClientRect();
        let O = (D == null ? void 0 : D.height) ?? 0, R = (D == null ? void 0 : D.width) ?? 0;
        $ = h.right - v.pageX + window.scrollX < R ? $ - R : $, y = h.bottom - v.pageY + window.scrollY < O ? y - O : y, i.positions = {
          left: $ + "px",
          top: y + "px"
        };
      });
    };
    return (v, p) => ue((_(), g("ul", {
      ref_key: "contextmenu",
      ref: a,
      style: an(i.positions),
      class: "vuefinder__context-menu"
    }, [
      (_(!0), g(ge, null, ke(d.value, (m) => (_(), g("li", {
        class: "vuefinder__context-menu__item",
        key: m.title
      }, [
        m.link ? (_(), g("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: m.link,
          download: m.link,
          onClick: p[0] || (p[0] = (h) => o(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          r("span", null, b(m.title()), 1)
        ], 8, ef)) : (_(), g("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (h) => u(m)
        }, [
          r("span", null, b(m.title()), 1)
        ], 8, tf))
      ]))), 128))
    ], 4)), [
      [Ue, i.active]
    ]);
  }
}, sf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, of = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
}, null, -1), rf = [
  of
];
function af(t, e) {
  return _(), g("svg", sf, [...rf]);
}
const qo = { render: af }, lf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
}, cf = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
}, null, -1), df = [
  cf
];
function uf(t, e) {
  return _(), g("svg", lf, [...df]);
}
const _f = { render: uf }, vf = { class: "vuefinder__status-bar__wrapper" }, ff = { class: "vuefinder__status-bar__storage" }, mf = ["title"], pf = { class: "vuefinder__status-bar__storage-icon" }, hf = ["value"], gf = { class: "vuefinder__status-bar__info" }, bf = { key: 0 }, wf = { class: "vuefinder__status-bar__selected-count" }, yf = { class: "vuefinder__status-bar__actions" }, $f = ["disabled"], kf = ["title"], xf = {
  __name: "Statusbar",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { setStore: a } = e.storage, s = e.dragSelect, c = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), a("adapter", e.fs.adapter);
    }, i = M("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      i.value = l;
    });
    const d = rt(() => {
      const l = e.selectButton.multiple ? s.getSelected().length > 0 : s.getSelected().length === 1;
      return e.selectButton.active && l;
    });
    return (l, u) => (_(), g("div", vf, [
      r("div", ff, [
        r("div", {
          class: "vuefinder__status-bar__storage-container",
          title: o(n)("Storage")
        }, [
          r("div", pf, [
            P(o(qo))
          ]),
          ue(r("select", {
            "onUpdate:modelValue": u[0] || (u[0] = (f) => o(e).fs.adapter = f),
            onChange: c,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (_(!0), g(ge, null, ke(o(e).fs.data.storages, (f) => (_(), g("option", { value: f }, b(f), 9, hf))), 256))
          ], 544), [
            [An, o(e).fs.adapter]
          ])
        ], 8, mf),
        r("div", gf, [
          i.value.length ? (_(), g("span", bf, b(o(e).fs.data.files.length) + " items found. ", 1)) : q("", !0),
          r("span", wf, b(o(e).dragSelect.getCount() > 0 ? o(n)("%s item(s) selected.", o(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      r("div", yf, [
        o(e).selectButton.active ? (_(), g("button", {
          key: 0,
          class: ae(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: u[1] || (u[1] = (f) => o(e).selectButton.click(o(s).getSelected(), f))
        }, b(o(n)("Select")), 11, $f)) : q("", !0),
        r("span", {
          class: "vuefinder__status-bar__about",
          title: o(n)("About"),
          onClick: u[2] || (u[2] = (f) => o(e).modal.open(Ao))
        }, [
          P(o(_f))
        ], 8, kf)
      ])
    ]));
  }
}, Sf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
}, Cf = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
}, null, -1), Ef = [
  Cf
];
function Af(t, e) {
  return _(), g("svg", Sf, [...Ef]);
}
const zo = { render: Af }, Tf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, Mf = /* @__PURE__ */ r("path", {
  fill: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Df = /* @__PURE__ */ r("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1), Vf = [
  Mf,
  Df
];
function Lf(t, e) {
  return _(), g("svg", Tf, [...Vf]);
}
const Of = { render: Lf }, Ff = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
}, Hf = /* @__PURE__ */ r("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Rf = /* @__PURE__ */ r("path", { d: "M15 12H9M12 9v6" }, null, -1), Bf = [
  Hf,
  Rf
];
function If(t, e) {
  return _(), g("svg", Ff, [...Bf]);
}
const Po = { render: If }, Nf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
}, Uf = /* @__PURE__ */ r("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), qf = /* @__PURE__ */ r("path", { d: "M9 12h6" }, null, -1), zf = [
  Uf,
  qf
];
function Pf(t, e) {
  return _(), g("svg", Nf, [...zf]);
}
const jo = { render: Pf };
function Go(t, e) {
  const n = t.findIndex((a) => a.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const jf = { class: "vuefinder__folder-loader-indicator" }, Gf = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Ko = {
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ ar({
    adapter: {
      type: String,
      required: !0
    },
    path: {
      type: String,
      required: !0
    }
  }, {
    modelValue: {}
  }),
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, n = re("ServiceContainer");
    n.i18n;
    const a = Hs(t, "modelValue"), s = M(!1);
    He(
      () => a.value,
      () => {
        var d;
        return ((d = c()) == null ? void 0 : d.folders.length) || i();
      }
    );
    function c() {
      return n.treeViewData.find((d) => d.path === e.path);
    }
    const i = () => {
      s.value = !0, n.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          adapter: e.adapter,
          path: e.path
        }
      }).then((d) => {
        Go(n.treeViewData, { path: e.path, ...d });
      }).catch((d) => {
      }).finally(() => {
        s.value = !1;
      });
    };
    return (d, l) => {
      var u;
      return _(), g("div", jf, [
        s.value ? (_(), W(o(is), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (_(), g("div", Gf, [
          a.value && ((u = c()) != null && u.folders.length) ? (_(), W(o(jo), {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : q("", !0),
          a.value ? q("", !0) : (_(), W(o(Po), {
            key: 1,
            class: "vuefinder__folder-loader-indicator--plus"
          }))
        ]))
      ]);
    };
  }
}, Kf = { class: "vuefinder__treesubfolderlist__item-content" }, Wf = ["onClick"], Yf = ["title", "onClick"], Xf = { class: "vuefinder__treesubfolderlist__item-icon" }, Jf = { class: "vuefinder__treesubfolderlist__subfolder" }, Zf = {
  __name: "TreeSubfolderList",
  props: {
    adapter: {
      type: String,
      required: !0
    },
    path: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = re("ServiceContainer"), n = M([]), a = t, s = M(null);
    xe(() => {
      a.path === a.adapter + "://" && je(s.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const c = rt(() => {
      var i;
      return ((i = e.treeViewData.find((d) => d.path === a.path)) == null ? void 0 : i.folders) || [];
    });
    return (i, d) => {
      const l = lr("TreeSubfolderList", !0);
      return _(), g("ul", {
        ref_key: "parentSubfolderList",
        ref: s,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (_(!0), g(ge, null, ke(c.value, (u, f) => (_(), g("li", {
          key: u.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          r("div", Kf, [
            r("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (v) => n.value[u.path] = !n.value[u.path]
            }, [
              P(Ko, {
                adapter: t.adapter,
                path: u.path,
                modelValue: n.value[u.path],
                "onUpdate:modelValue": (v) => n.value[u.path] = v
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Wf),
            r("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: u.path,
              onClick: (v) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: a.adapter, path: u.path } })
            }, [
              r("div", Xf, [
                o(e).fs.path === u.path ? (_(), W(o(zo), { key: 0 })) : (_(), W(o(pn), { key: 1 }))
              ]),
              r("div", {
                class: ae(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": o(e).fs.path === u.path
                }])
              }, b(u.basename), 3)
            ], 8, Yf)
          ]),
          r("div", Jf, [
            ue(P(l, {
              adapter: a.adapter,
              path: u.path
            }, null, 8, ["adapter", "path"]), [
              [Ue, n.value[u.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}, Qf = { class: "vuefinder__treestorageitem__loader" }, em = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = re("ServiceContainer"), n = M(!1);
    return (a, s) => (_(), g(ge, null, [
      r("div", {
        onClick: s[1] || (s[1] = (c) => n.value = !n.value),
        class: "vuefinder__treestorageitem__header"
      }, [
        r("div", {
          class: ae(["vuefinder__treestorageitem__info", t.storage === o(e).fs.adapter ? "vuefinder__treestorageitem__info--active" : ""])
        }, [
          r("div", {
            class: ae(["vuefinder__treestorageitem__icon", t.storage === o(e).fs.adapter ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            P(o(qo))
          ], 2),
          r("div", null, b(t.storage), 1)
        ], 2),
        r("div", Qf, [
          P(Ko, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: n.value,
            "onUpdate:modelValue": s[0] || (s[0] = (c) => n.value = c)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      ue(P(Zf, {
        adapter: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["adapter", "path"]), [
        [Ue, n.value]
      ])
    ], 64));
  }
}, tm = { class: "vuefinder__folder-indicator" }, nm = { class: "vuefinder__folder-indicator--icon" }, sm = {
  __name: "FolderIndicator",
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Hs(t, "modelValue");
    return (n, a) => (_(), g("div", tm, [
      r("div", nm, [
        e.value ? (_(), W(o(jo), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : q("", !0),
        e.value ? q("", !0) : (_(), W(o(Po), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}, om = { class: "vuefinder__treeview__header" }, rm = { class: "vuefinder__treeview__pinned-label" }, am = { class: "vuefinder__treeview__pin-text text-nowrap" }, lm = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, im = { class: "vuefinder__treeview__pinned-item" }, cm = ["onClick"], dm = ["title"], um = ["onClick"], _m = { key: 0 }, vm = { class: "vuefinder__treeview__no-pinned" }, fm = { class: "vuefinder__treeview__storage" }, mm = {
  __name: "TreeView",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { getStore: a, setStore: s } = e.storage, c = M(190), i = M(a("pinned-folders-opened", !0));
    He(i, (f) => s("pinned-folders-opened", f));
    const d = (f) => {
      e.pinnedFolders = e.pinnedFolders.filter((v) => v.path !== f.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, l = (f) => {
      const v = f.clientX, p = f.target.parentElement, m = p.getBoundingClientRect().width;
      p.classList.remove("transition-[width]"), p.classList.add("transition-none");
      const h = (y) => {
        c.value = m + y.clientX - v, c.value < 50 && (c.value = 0, e.showTreeView = !1), c.value > 50 && (e.showTreeView = !0);
      }, $ = () => {
        const y = p.getBoundingClientRect();
        c.value = y.width, p.classList.add("transition-[width]"), p.classList.remove("transition-none"), window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", $);
      };
      window.addEventListener("mousemove", h), window.addEventListener("mouseup", $);
    }, u = M(null);
    return xe(() => {
      je(u.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), He(e.fs.data, (f, v) => {
      const p = f.files.filter((m) => m.type === "dir");
      Go(e.treeViewData, { path: e.fs.path, folders: p.map((m) => ({
        adapter: m.storage,
        path: m.path,
        basename: m.basename
      })) });
    }), (f, v) => (_(), g(ge, null, [
      r("div", {
        onClick: v[0] || (v[0] = (p) => o(e).showTreeView = !o(e).showTreeView),
        class: ae(["vuefinder__treeview__overlay", o(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      r("div", {
        style: an(o(e).showTreeView ? "min-width:100px;max-width:75%; width: " + c.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        r("div", {
          ref_key: "treeViewScrollElement",
          ref: u,
          class: "vuefinder__treeview__scroll"
        }, [
          r("div", om, [
            r("div", {
              onClick: v[2] || (v[2] = (p) => i.value = !i.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              r("div", rm, [
                P(o(Uo), { class: "vuefinder__treeview__pin-icon" }),
                r("div", am, b(o(n)("Pinned Folders")), 1)
              ]),
              P(sm, {
                modelValue: i.value,
                "onUpdate:modelValue": v[1] || (v[1] = (p) => i.value = p)
              }, null, 8, ["modelValue"])
            ]),
            i.value ? (_(), g("ul", lm, [
              (_(!0), g(ge, null, ke(o(e).pinnedFolders, (p) => (_(), g("li", im, [
                r("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (m) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: p.storage, path: p.path } })
                }, [
                  o(e).fs.path !== p.path ? (_(), W(o(pn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : q("", !0),
                  o(e).fs.path === p.path ? (_(), W(o(zo), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : q("", !0),
                  r("div", {
                    title: p.path,
                    class: ae(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": o(e).fs.path === p.path
                    }])
                  }, b(p.basename), 11, dm)
                ], 8, cm),
                r("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (m) => d(p)
                }, [
                  P(o(Of), { class: "vuefinder__treeview__remove-icon" })
                ], 8, um)
              ]))), 256)),
              o(e).pinnedFolders.length ? q("", !0) : (_(), g("li", _m, [
                r("div", vm, b(o(n)("No folders pinned")), 1)
              ]))
            ])) : q("", !0)
          ]),
          (_(!0), g(ge, null, ke(o(e).fs.data.storages, (p) => (_(), g("div", fm, [
            P(em, { storage: p }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        r("div", {
          onMousedown: l,
          class: ae([(o(e).showTreeView, ""), "vuefinder__treeview__resize-handle"])
        }, null, 34)
      ], 4)
    ], 64));
  }
}, pm = { class: "vuefinder__main__content" }, hm = {
  __name: "VueFinder",
  props: {
    id: {
      type: String,
      default: "vf"
    },
    request: {
      type: [String, Object],
      required: !0
    },
    persist: {
      type: Boolean,
      default: !1
    },
    path: {
      type: String,
      default: ""
    },
    features: {
      type: [Array, Boolean],
      default: !0
    },
    debug: {
      type: Boolean,
      default: !1
    },
    theme: {
      type: String,
      default: "system"
    },
    locale: {
      type: String,
      default: null
    },
    maxHeight: {
      type: String,
      default: "600px"
    },
    maxFileSize: {
      type: String,
      default: "10mb"
    },
    fullScreen: {
      type: Boolean,
      default: !1
    },
    showTreeView: {
      type: Boolean,
      default: !1
    },
    pinnedFolders: {
      type: Array,
      default: []
    },
    showThumbnails: {
      type: Boolean,
      default: !0
    },
    selectButton: {
      type: Object,
      default(t) {
        return {
          active: !1,
          multiple: !1,
          click: (e) => {
          },
          ...t
        };
      }
    }
  },
  emits: ["select"],
  setup(t, { emit: e }) {
    const n = e, s = Ma(t, re("VueFinderOptions"));
    ir("ServiceContainer", s);
    const { setStore: c } = s.storage, i = M(null);
    s.root = i;
    const d = s.dragSelect;
    Fi(s);
    const l = (f) => {
      Object.assign(s.fs.data, f), d.clearSelection(), d.refreshSelection();
    };
    let u;
    return s.emitter.on("vf-fetch-abort", () => {
      u.abort(), s.fs.loading = !1;
    }), s.emitter.on("vf-fetch", ({ params: f, body: v = null, onSuccess: p = null, onError: m = null, noCloseModal: h = !1 }) => {
      ["index", "search"].includes(f.q) && (u && u.abort(), s.fs.loading = !0), u = new AbortController();
      const $ = u.signal;
      s.requester.send({
        url: "",
        method: f.m || "get",
        params: f,
        body: v,
        abortSignal: $
      }).then((y) => {
        s.fs.adapter = y.adapter, s.persist && (s.fs.path = y.dirname, c("path", s.fs.path)), ["index", "search"].includes(f.q) && (s.fs.loading = !1), h || s.modal.close(), l(y), p && p(y);
      }).catch((y) => {
        console.error(y), m && m(y);
      });
    }), xe(() => {
      let f = {};
      s.fs.path.includes("://") && (f = {
        adapter: s.fs.path.split("://")[0],
        path: s.fs.path
      }), s.emitter.emit("vf-fetch", { params: { q: "index", adapter: s.fs.adapter, ...f } }), d.onSelect((v) => {
        n("select", v);
      });
    }), (f, v) => (_(), g("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: i,
      tabindex: "0"
    }, [
      r("div", {
        class: ae(o(s).theme.actualValue)
      }, [
        r("div", {
          class: ae([o(s).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: an(o(s).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: v[0] || (v[0] = (p) => o(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: v[1] || (v[1] = (p) => o(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          P(Rd),
          P(f_),
          r("div", pm, [
            P(mm),
            P(Qv)
          ]),
          P(xf)
        ], 38),
        P(cr, { name: "fade" }, {
          default: Q(() => [
            o(s).modal.visible ? (_(), W(Fs(o(s).modal.type), { key: 0 })) : q("", !0)
          ]),
          _: 1
        }),
        P(nf)
      ], 2)
    ], 512));
  }
}, Em = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", hm);
  }
};
export {
  Em as default
};
