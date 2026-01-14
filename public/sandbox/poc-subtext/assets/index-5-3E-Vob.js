(function () {
  const U = document.createElement("link").relList;
  if (U && U.supports && U.supports("modulepreload")) return;
  for (const R of document.querySelectorAll('link[rel="modulepreload"]')) o(R);
  new MutationObserver(R => {
    for (const j of R)
      if (j.type === "childList")
        for (const B of j.addedNodes)
          B.tagName === "LINK" && B.rel === "modulepreload" && o(B);
  }).observe(document, { childList: !0, subtree: !0 });
  function _(R) {
    const j = {};
    return (
      R.integrity && (j.integrity = R.integrity),
      R.referrerPolicy && (j.referrerPolicy = R.referrerPolicy),
      R.crossOrigin === "use-credentials"
        ? (j.credentials = "include")
        : R.crossOrigin === "anonymous"
          ? (j.credentials = "omit")
          : (j.credentials = "same-origin"),
      j
    );
  }
  function o(R) {
    if (R.ep) return;
    R.ep = !0;
    const j = _(R);
    fetch(R.href, j);
  }
})();
var sf = { exports: {} },
  zu = {};
var br;
function lv() {
  if (br) return zu;
  br = 1;
  var y = Symbol.for("react.transitional.element"),
    U = Symbol.for("react.fragment");
  function _(o, R, j) {
    var B = null;
    if (
      (j !== void 0 && (B = "" + j),
      R.key !== void 0 && (B = "" + R.key),
      "key" in R)
    ) {
      j = {};
      for (var X in R) X !== "key" && (j[X] = R[X]);
    } else j = R;
    return (
      (R = j.ref),
      { $$typeof: y, type: o, key: B, ref: R !== void 0 ? R : null, props: j }
    );
  }
  return (zu.Fragment = U), (zu.jsx = _), (zu.jsxs = _), zu;
}
var pr;
function tv() {
  return pr || ((pr = 1), (sf.exports = lv())), sf.exports;
}
var T = tv(),
  of = { exports: {} },
  k = {};
var Er;
function ev() {
  if (Er) return k;
  Er = 1;
  var y = Symbol.for("react.transitional.element"),
    U = Symbol.for("react.portal"),
    _ = Symbol.for("react.fragment"),
    o = Symbol.for("react.strict_mode"),
    R = Symbol.for("react.profiler"),
    j = Symbol.for("react.consumer"),
    B = Symbol.for("react.context"),
    X = Symbol.for("react.forward_ref"),
    D = Symbol.for("react.suspense"),
    S = Symbol.for("react.memo"),
    H = Symbol.for("react.lazy"),
    O = Symbol.for("react.activity"),
    L = Symbol.iterator;
  function W(s) {
    return s === null || typeof s != "object"
      ? null
      : ((s = (L && s[L]) || s["@@iterator"]),
        typeof s == "function" ? s : null);
  }
  var sl = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    ol = Object.assign,
    nl = {};
  function bl(s, z, x) {
    (this.props = s),
      (this.context = z),
      (this.refs = nl),
      (this.updater = x || sl);
  }
  (bl.prototype.isReactComponent = {}),
    (bl.prototype.setState = function (s, z) {
      if (typeof s != "object" && typeof s != "function" && s != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, s, z, "setState");
    }),
    (bl.prototype.forceUpdate = function (s) {
      this.updater.enqueueForceUpdate(this, s, "forceUpdate");
    });
  function Wl() {}
  Wl.prototype = bl.prototype;
  function pl(s, z, x) {
    (this.props = s),
      (this.context = z),
      (this.refs = nl),
      (this.updater = x || sl);
  }
  var Vl = (pl.prototype = new Wl());
  (Vl.constructor = pl), ol(Vl, bl.prototype), (Vl.isPureReactComponent = !0);
  var Bl = Array.isArray;
  function Hl() {}
  var $ = { H: null, A: null, T: null, S: null },
    El = Object.prototype.hasOwnProperty;
  function Kl(s, z, x) {
    var C = x.ref;
    return {
      $$typeof: y,
      type: s,
      key: z,
      ref: C !== void 0 ? C : null,
      props: x,
    };
  }
  function _t(s, z) {
    return Kl(s.type, z, s.props);
  }
  function Jl(s) {
    return typeof s == "object" && s !== null && s.$$typeof === y;
  }
  function Ol(s) {
    var z = { "=": "=0", ":": "=2" };
    return (
      "$" +
      s.replace(/[=:]/g, function (x) {
        return z[x];
      })
    );
  }
  var nt = /\/+/g;
  function Fl(s, z) {
    return typeof s == "object" && s !== null && s.key != null
      ? Ol("" + s.key)
      : z.toString(36);
  }
  function $l(s) {
    switch (s.status) {
      case "fulfilled":
        return s.value;
      case "rejected":
        throw s.reason;
      default:
        switch (
          (typeof s.status == "string"
            ? s.then(Hl, Hl)
            : ((s.status = "pending"),
              s.then(
                function (z) {
                  s.status === "pending" &&
                    ((s.status = "fulfilled"), (s.value = z));
                },
                function (z) {
                  s.status === "pending" &&
                    ((s.status = "rejected"), (s.reason = z));
                }
              )),
          s.status)
        ) {
          case "fulfilled":
            return s.value;
          case "rejected":
            throw s.reason;
        }
    }
    throw s;
  }
  function r(s, z, x, C, w) {
    var Y = typeof s;
    (Y === "undefined" || Y === "boolean") && (s = null);
    var F = !1;
    if (s === null) F = !0;
    else
      switch (Y) {
        case "bigint":
        case "string":
        case "number":
          F = !0;
          break;
        case "object":
          switch (s.$$typeof) {
            case y:
            case U:
              F = !0;
              break;
            case H:
              return (F = s._init), r(F(s._payload), z, x, C, w);
          }
      }
    if (F)
      return (
        (w = w(s)),
        (F = C === "" ? "." + Fl(s, 0) : C),
        Bl(w)
          ? ((x = ""),
            F != null && (x = F.replace(nt, "$&/") + "/"),
            r(w, z, x, "", function (Ua) {
              return Ua;
            }))
          : w != null &&
            (Jl(w) &&
              (w = _t(
                w,
                x +
                  (w.key == null || (s && s.key === w.key)
                    ? ""
                    : ("" + w.key).replace(nt, "$&/") + "/") +
                  F
              )),
            z.push(w)),
        1
      );
    F = 0;
    var Ul = C === "" ? "." : C + ":";
    if (Bl(s))
      for (var zl = 0; zl < s.length; zl++)
        (C = s[zl]), (Y = Ul + Fl(C, zl)), (F += r(C, z, x, Y, w));
    else if (((zl = W(s)), typeof zl == "function"))
      for (s = zl.call(s), zl = 0; !(C = s.next()).done; )
        (C = C.value), (Y = Ul + Fl(C, zl++)), (F += r(C, z, x, Y, w));
    else if (Y === "object") {
      if (typeof s.then == "function") return r($l(s), z, x, C, w);
      throw (
        ((z = String(s)),
        Error(
          "Objects are not valid as a React child (found: " +
            (z === "[object Object]"
              ? "object with keys {" + Object.keys(s).join(", ") + "}"
              : z) +
            "). If you meant to render a collection of children, use an array instead."
        ))
      );
    }
    return F;
  }
  function p(s, z, x) {
    if (s == null) return s;
    var C = [],
      w = 0;
    return (
      r(s, C, "", "", function (Y) {
        return z.call(x, Y, w++);
      }),
      C
    );
  }
  function N(s) {
    if (s._status === -1) {
      var z = s._result;
      (z = z()),
        z.then(
          function (x) {
            (s._status === 0 || s._status === -1) &&
              ((s._status = 1), (s._result = x));
          },
          function (x) {
            (s._status === 0 || s._status === -1) &&
              ((s._status = 2), (s._result = x));
          }
        ),
        s._status === -1 && ((s._status = 0), (s._result = z));
    }
    if (s._status === 1) return s._result.default;
    throw s._result;
  }
  var Q =
      typeof reportError == "function"
        ? reportError
        : function (s) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var z = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof s == "object" &&
                  s !== null &&
                  typeof s.message == "string"
                    ? String(s.message)
                    : String(s),
                error: s,
              });
              if (!window.dispatchEvent(z)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", s);
              return;
            }
            console.error(s);
          },
    J = {
      map: p,
      forEach: function (s, z, x) {
        p(
          s,
          function () {
            z.apply(this, arguments);
          },
          x
        );
      },
      count: function (s) {
        var z = 0;
        return (
          p(s, function () {
            z++;
          }),
          z
        );
      },
      toArray: function (s) {
        return (
          p(s, function (z) {
            return z;
          }) || []
        );
      },
      only: function (s) {
        if (!Jl(s))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return s;
      },
    };
  return (
    (k.Activity = O),
    (k.Children = J),
    (k.Component = bl),
    (k.Fragment = _),
    (k.Profiler = R),
    (k.PureComponent = pl),
    (k.StrictMode = o),
    (k.Suspense = D),
    (k.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = $),
    (k.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (s) {
        return $.H.useMemoCache(s);
      },
    }),
    (k.cache = function (s) {
      return function () {
        return s.apply(null, arguments);
      };
    }),
    (k.cacheSignal = function () {
      return null;
    }),
    (k.cloneElement = function (s, z, x) {
      if (s == null)
        throw Error(
          "The argument must be a React element, but you passed " + s + "."
        );
      var C = ol({}, s.props),
        w = s.key;
      if (z != null)
        for (Y in (z.key !== void 0 && (w = "" + z.key), z))
          !El.call(z, Y) ||
            Y === "key" ||
            Y === "__self" ||
            Y === "__source" ||
            (Y === "ref" && z.ref === void 0) ||
            (C[Y] = z[Y]);
      var Y = arguments.length - 2;
      if (Y === 1) C.children = x;
      else if (1 < Y) {
        for (var F = Array(Y), Ul = 0; Ul < Y; Ul++) F[Ul] = arguments[Ul + 2];
        C.children = F;
      }
      return Kl(s.type, w, C);
    }),
    (k.createContext = function (s) {
      return (
        (s = {
          $$typeof: B,
          _currentValue: s,
          _currentValue2: s,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (s.Provider = s),
        (s.Consumer = { $$typeof: j, _context: s }),
        s
      );
    }),
    (k.createElement = function (s, z, x) {
      var C,
        w = {},
        Y = null;
      if (z != null)
        for (C in (z.key !== void 0 && (Y = "" + z.key), z))
          El.call(z, C) &&
            C !== "key" &&
            C !== "__self" &&
            C !== "__source" &&
            (w[C] = z[C]);
      var F = arguments.length - 2;
      if (F === 1) w.children = x;
      else if (1 < F) {
        for (var Ul = Array(F), zl = 0; zl < F; zl++)
          Ul[zl] = arguments[zl + 2];
        w.children = Ul;
      }
      if (s && s.defaultProps)
        for (C in ((F = s.defaultProps), F)) w[C] === void 0 && (w[C] = F[C]);
      return Kl(s, Y, w);
    }),
    (k.createRef = function () {
      return { current: null };
    }),
    (k.forwardRef = function (s) {
      return { $$typeof: X, render: s };
    }),
    (k.isValidElement = Jl),
    (k.lazy = function (s) {
      return { $$typeof: H, _payload: { _status: -1, _result: s }, _init: N };
    }),
    (k.memo = function (s, z) {
      return { $$typeof: S, type: s, compare: z === void 0 ? null : z };
    }),
    (k.startTransition = function (s) {
      var z = $.T,
        x = {};
      $.T = x;
      try {
        var C = s(),
          w = $.S;
        w !== null && w(x, C),
          typeof C == "object" &&
            C !== null &&
            typeof C.then == "function" &&
            C.then(Hl, Q);
      } catch (Y) {
        Q(Y);
      } finally {
        z !== null && x.types !== null && (z.types = x.types), ($.T = z);
      }
    }),
    (k.unstable_useCacheRefresh = function () {
      return $.H.useCacheRefresh();
    }),
    (k.use = function (s) {
      return $.H.use(s);
    }),
    (k.useActionState = function (s, z, x) {
      return $.H.useActionState(s, z, x);
    }),
    (k.useCallback = function (s, z) {
      return $.H.useCallback(s, z);
    }),
    (k.useContext = function (s) {
      return $.H.useContext(s);
    }),
    (k.useDebugValue = function () {}),
    (k.useDeferredValue = function (s, z) {
      return $.H.useDeferredValue(s, z);
    }),
    (k.useEffect = function (s, z) {
      return $.H.useEffect(s, z);
    }),
    (k.useEffectEvent = function (s) {
      return $.H.useEffectEvent(s);
    }),
    (k.useId = function () {
      return $.H.useId();
    }),
    (k.useImperativeHandle = function (s, z, x) {
      return $.H.useImperativeHandle(s, z, x);
    }),
    (k.useInsertionEffect = function (s, z) {
      return $.H.useInsertionEffect(s, z);
    }),
    (k.useLayoutEffect = function (s, z) {
      return $.H.useLayoutEffect(s, z);
    }),
    (k.useMemo = function (s, z) {
      return $.H.useMemo(s, z);
    }),
    (k.useOptimistic = function (s, z) {
      return $.H.useOptimistic(s, z);
    }),
    (k.useReducer = function (s, z, x) {
      return $.H.useReducer(s, z, x);
    }),
    (k.useRef = function (s) {
      return $.H.useRef(s);
    }),
    (k.useState = function (s) {
      return $.H.useState(s);
    }),
    (k.useSyncExternalStore = function (s, z, x) {
      return $.H.useSyncExternalStore(s, z, x);
    }),
    (k.useTransition = function () {
      return $.H.useTransition();
    }),
    (k.version = "19.2.3"),
    k
  );
}
var zr;
function hf() {
  return zr || ((zr = 1), (of.exports = ev())), of.exports;
}
var K = hf(),
  df = { exports: {} },
  Tu = {},
  rf = { exports: {} },
  mf = {};
var Tr;
function av() {
  return (
    Tr ||
      ((Tr = 1),
      (function (y) {
        function U(r, p) {
          var N = r.length;
          r.push(p);
          l: for (; 0 < N; ) {
            var Q = (N - 1) >>> 1,
              J = r[Q];
            if (0 < R(J, p)) (r[Q] = p), (r[N] = J), (N = Q);
            else break l;
          }
        }
        function _(r) {
          return r.length === 0 ? null : r[0];
        }
        function o(r) {
          if (r.length === 0) return null;
          var p = r[0],
            N = r.pop();
          if (N !== p) {
            r[0] = N;
            l: for (var Q = 0, J = r.length, s = J >>> 1; Q < s; ) {
              var z = 2 * (Q + 1) - 1,
                x = r[z],
                C = z + 1,
                w = r[C];
              if (0 > R(x, N))
                C < J && 0 > R(w, x)
                  ? ((r[Q] = w), (r[C] = N), (Q = C))
                  : ((r[Q] = x), (r[z] = N), (Q = z));
              else if (C < J && 0 > R(w, N)) (r[Q] = w), (r[C] = N), (Q = C);
              else break l;
            }
          }
          return p;
        }
        function R(r, p) {
          var N = r.sortIndex - p.sortIndex;
          return N !== 0 ? N : r.id - p.id;
        }
        if (
          ((y.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var j = performance;
          y.unstable_now = function () {
            return j.now();
          };
        } else {
          var B = Date,
            X = B.now();
          y.unstable_now = function () {
            return B.now() - X;
          };
        }
        var D = [],
          S = [],
          H = 1,
          O = null,
          L = 3,
          W = !1,
          sl = !1,
          ol = !1,
          nl = !1,
          bl = typeof setTimeout == "function" ? setTimeout : null,
          Wl = typeof clearTimeout == "function" ? clearTimeout : null,
          pl = typeof setImmediate < "u" ? setImmediate : null;
        function Vl(r) {
          for (var p = _(S); p !== null; ) {
            if (p.callback === null) o(S);
            else if (p.startTime <= r)
              o(S), (p.sortIndex = p.expirationTime), U(D, p);
            else break;
            p = _(S);
          }
        }
        function Bl(r) {
          if (((ol = !1), Vl(r), !sl))
            if (_(D) !== null) (sl = !0), Hl || ((Hl = !0), Ol());
            else {
              var p = _(S);
              p !== null && $l(Bl, p.startTime - r);
            }
        }
        var Hl = !1,
          $ = -1,
          El = 5,
          Kl = -1;
        function _t() {
          return nl ? !0 : !(y.unstable_now() - Kl < El);
        }
        function Jl() {
          if (((nl = !1), Hl)) {
            var r = y.unstable_now();
            Kl = r;
            var p = !0;
            try {
              l: {
                (sl = !1), ol && ((ol = !1), Wl($), ($ = -1)), (W = !0);
                var N = L;
                try {
                  t: {
                    for (
                      Vl(r), O = _(D);
                      O !== null && !(O.expirationTime > r && _t());

                    ) {
                      var Q = O.callback;
                      if (typeof Q == "function") {
                        (O.callback = null), (L = O.priorityLevel);
                        var J = Q(O.expirationTime <= r);
                        if (((r = y.unstable_now()), typeof J == "function")) {
                          (O.callback = J), Vl(r), (p = !0);
                          break t;
                        }
                        O === _(D) && o(D), Vl(r);
                      } else o(D);
                      O = _(D);
                    }
                    if (O !== null) p = !0;
                    else {
                      var s = _(S);
                      s !== null && $l(Bl, s.startTime - r), (p = !1);
                    }
                  }
                  break l;
                } finally {
                  (O = null), (L = N), (W = !1);
                }
                p = void 0;
              }
            } finally {
              p ? Ol() : (Hl = !1);
            }
          }
        }
        var Ol;
        if (typeof pl == "function")
          Ol = function () {
            pl(Jl);
          };
        else if (typeof MessageChannel < "u") {
          var nt = new MessageChannel(),
            Fl = nt.port2;
          (nt.port1.onmessage = Jl),
            (Ol = function () {
              Fl.postMessage(null);
            });
        } else
          Ol = function () {
            bl(Jl, 0);
          };
        function $l(r, p) {
          $ = bl(function () {
            r(y.unstable_now());
          }, p);
        }
        (y.unstable_IdlePriority = 5),
          (y.unstable_ImmediatePriority = 1),
          (y.unstable_LowPriority = 4),
          (y.unstable_NormalPriority = 3),
          (y.unstable_Profiling = null),
          (y.unstable_UserBlockingPriority = 2),
          (y.unstable_cancelCallback = function (r) {
            r.callback = null;
          }),
          (y.unstable_forceFrameRate = function (r) {
            0 > r || 125 < r
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (El = 0 < r ? Math.floor(1e3 / r) : 5);
          }),
          (y.unstable_getCurrentPriorityLevel = function () {
            return L;
          }),
          (y.unstable_next = function (r) {
            switch (L) {
              case 1:
              case 2:
              case 3:
                var p = 3;
                break;
              default:
                p = L;
            }
            var N = L;
            L = p;
            try {
              return r();
            } finally {
              L = N;
            }
          }),
          (y.unstable_requestPaint = function () {
            nl = !0;
          }),
          (y.unstable_runWithPriority = function (r, p) {
            switch (r) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                r = 3;
            }
            var N = L;
            L = r;
            try {
              return p();
            } finally {
              L = N;
            }
          }),
          (y.unstable_scheduleCallback = function (r, p, N) {
            var Q = y.unstable_now();
            switch (
              (typeof N == "object" && N !== null
                ? ((N = N.delay),
                  (N = typeof N == "number" && 0 < N ? Q + N : Q))
                : (N = Q),
              r)
            ) {
              case 1:
                var J = -1;
                break;
              case 2:
                J = 250;
                break;
              case 5:
                J = 1073741823;
                break;
              case 4:
                J = 1e4;
                break;
              default:
                J = 5e3;
            }
            return (
              (J = N + J),
              (r = {
                id: H++,
                callback: p,
                priorityLevel: r,
                startTime: N,
                expirationTime: J,
                sortIndex: -1,
              }),
              N > Q
                ? ((r.sortIndex = N),
                  U(S, r),
                  _(D) === null &&
                    r === _(S) &&
                    (ol ? (Wl($), ($ = -1)) : (ol = !0), $l(Bl, N - Q)))
                : ((r.sortIndex = J),
                  U(D, r),
                  sl || W || ((sl = !0), Hl || ((Hl = !0), Ol()))),
              r
            );
          }),
          (y.unstable_shouldYield = _t),
          (y.unstable_wrapCallback = function (r) {
            var p = L;
            return function () {
              var N = L;
              L = p;
              try {
                return r.apply(this, arguments);
              } finally {
                L = N;
              }
            };
          });
      })(mf)),
    mf
  );
}
var Ar;
function uv() {
  return Ar || ((Ar = 1), (rf.exports = av())), rf.exports;
}
var vf = { exports: {} },
  wl = {};
var Mr;
function nv() {
  if (Mr) return wl;
  Mr = 1;
  var y = hf();
  function U(D) {
    var S = "https://react.dev/errors/" + D;
    if (1 < arguments.length) {
      S += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var H = 2; H < arguments.length; H++)
        S += "&args[]=" + encodeURIComponent(arguments[H]);
    }
    return (
      "Minified React error #" +
      D +
      "; visit " +
      S +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function _() {}
  var o = {
      d: {
        f: _,
        r: function () {
          throw Error(U(522));
        },
        D: _,
        C: _,
        L: _,
        m: _,
        X: _,
        S: _,
        M: _,
      },
      p: 0,
      findDOMNode: null,
    },
    R = Symbol.for("react.portal");
  function j(D, S, H) {
    var O =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: R,
      key: O == null ? null : "" + O,
      children: D,
      containerInfo: S,
      implementation: H,
    };
  }
  var B = y.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function X(D, S) {
    if (D === "font") return "";
    if (typeof S == "string") return S === "use-credentials" ? S : "";
  }
  return (
    (wl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (wl.createPortal = function (D, S) {
      var H =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!S || (S.nodeType !== 1 && S.nodeType !== 9 && S.nodeType !== 11))
        throw Error(U(299));
      return j(D, S, null, H);
    }),
    (wl.flushSync = function (D) {
      var S = B.T,
        H = o.p;
      try {
        if (((B.T = null), (o.p = 2), D)) return D();
      } finally {
        (B.T = S), (o.p = H), o.d.f();
      }
    }),
    (wl.preconnect = function (D, S) {
      typeof D == "string" &&
        (S
          ? ((S = S.crossOrigin),
            (S =
              typeof S == "string"
                ? S === "use-credentials"
                  ? S
                  : ""
                : void 0))
          : (S = null),
        o.d.C(D, S));
    }),
    (wl.prefetchDNS = function (D) {
      typeof D == "string" && o.d.D(D);
    }),
    (wl.preinit = function (D, S) {
      if (typeof D == "string" && S && typeof S.as == "string") {
        var H = S.as,
          O = X(H, S.crossOrigin),
          L = typeof S.integrity == "string" ? S.integrity : void 0,
          W = typeof S.fetchPriority == "string" ? S.fetchPriority : void 0;
        H === "style"
          ? o.d.S(D, typeof S.precedence == "string" ? S.precedence : void 0, {
              crossOrigin: O,
              integrity: L,
              fetchPriority: W,
            })
          : H === "script" &&
            o.d.X(D, {
              crossOrigin: O,
              integrity: L,
              fetchPriority: W,
              nonce: typeof S.nonce == "string" ? S.nonce : void 0,
            });
      }
    }),
    (wl.preinitModule = function (D, S) {
      if (typeof D == "string")
        if (typeof S == "object" && S !== null) {
          if (S.as == null || S.as === "script") {
            var H = X(S.as, S.crossOrigin);
            o.d.M(D, {
              crossOrigin: H,
              integrity: typeof S.integrity == "string" ? S.integrity : void 0,
              nonce: typeof S.nonce == "string" ? S.nonce : void 0,
            });
          }
        } else S == null && o.d.M(D);
    }),
    (wl.preload = function (D, S) {
      if (
        typeof D == "string" &&
        typeof S == "object" &&
        S !== null &&
        typeof S.as == "string"
      ) {
        var H = S.as,
          O = X(H, S.crossOrigin);
        o.d.L(D, H, {
          crossOrigin: O,
          integrity: typeof S.integrity == "string" ? S.integrity : void 0,
          nonce: typeof S.nonce == "string" ? S.nonce : void 0,
          type: typeof S.type == "string" ? S.type : void 0,
          fetchPriority:
            typeof S.fetchPriority == "string" ? S.fetchPriority : void 0,
          referrerPolicy:
            typeof S.referrerPolicy == "string" ? S.referrerPolicy : void 0,
          imageSrcSet:
            typeof S.imageSrcSet == "string" ? S.imageSrcSet : void 0,
          imageSizes: typeof S.imageSizes == "string" ? S.imageSizes : void 0,
          media: typeof S.media == "string" ? S.media : void 0,
        });
      }
    }),
    (wl.preloadModule = function (D, S) {
      if (typeof D == "string")
        if (S) {
          var H = X(S.as, S.crossOrigin);
          o.d.m(D, {
            as: typeof S.as == "string" && S.as !== "script" ? S.as : void 0,
            crossOrigin: H,
            integrity: typeof S.integrity == "string" ? S.integrity : void 0,
          });
        } else o.d.m(D);
    }),
    (wl.requestFormReset = function (D) {
      o.d.r(D);
    }),
    (wl.unstable_batchedUpdates = function (D, S) {
      return D(S);
    }),
    (wl.useFormState = function (D, S, H) {
      return B.H.useFormState(D, S, H);
    }),
    (wl.useFormStatus = function () {
      return B.H.useHostTransitionStatus();
    }),
    (wl.version = "19.2.3"),
    wl
  );
}
var _r;
function cv() {
  if (_r) return vf.exports;
  _r = 1;
  function y() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(y);
      } catch (U) {
        console.error(U);
      }
  }
  return y(), (vf.exports = nv()), vf.exports;
}
var Dr;
function iv() {
  if (Dr) return Tu;
  Dr = 1;
  var y = uv(),
    U = hf(),
    _ = cv();
  function o(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        t += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return (
      "Minified React error #" +
      l +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function R(l) {
    return !(!l || (l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11));
  }
  function j(l) {
    var t = l,
      e = l;
    if (l.alternate) for (; t.return; ) t = t.return;
    else {
      l = t;
      do (t = l), (t.flags & 4098) !== 0 && (e = t.return), (l = t.return);
      while (l);
    }
    return t.tag === 3 ? e : null;
  }
  function B(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (
        (t === null && ((l = l.alternate), l !== null && (t = l.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function X(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (
        (t === null && ((l = l.alternate), l !== null && (t = l.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function D(l) {
    if (j(l) !== l) throw Error(o(188));
  }
  function S(l) {
    var t = l.alternate;
    if (!t) {
      if (((t = j(l)), t === null)) throw Error(o(188));
      return t !== l ? null : l;
    }
    for (var e = l, a = t; ; ) {
      var u = e.return;
      if (u === null) break;
      var n = u.alternate;
      if (n === null) {
        if (((a = u.return), a !== null)) {
          e = a;
          continue;
        }
        break;
      }
      if (u.child === n.child) {
        for (n = u.child; n; ) {
          if (n === e) return D(u), l;
          if (n === a) return D(u), t;
          n = n.sibling;
        }
        throw Error(o(188));
      }
      if (e.return !== a.return) (e = u), (a = n);
      else {
        for (var c = !1, i = u.child; i; ) {
          if (i === e) {
            (c = !0), (e = u), (a = n);
            break;
          }
          if (i === a) {
            (c = !0), (a = u), (e = n);
            break;
          }
          i = i.sibling;
        }
        if (!c) {
          for (i = n.child; i; ) {
            if (i === e) {
              (c = !0), (e = n), (a = u);
              break;
            }
            if (i === a) {
              (c = !0), (a = n), (e = u);
              break;
            }
            i = i.sibling;
          }
          if (!c) throw Error(o(189));
        }
      }
      if (e.alternate !== a) throw Error(o(190));
    }
    if (e.tag !== 3) throw Error(o(188));
    return e.stateNode.current === e ? l : t;
  }
  function H(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (((t = H(l)), t !== null)) return t;
      l = l.sibling;
    }
    return null;
  }
  var O = Object.assign,
    L = Symbol.for("react.element"),
    W = Symbol.for("react.transitional.element"),
    sl = Symbol.for("react.portal"),
    ol = Symbol.for("react.fragment"),
    nl = Symbol.for("react.strict_mode"),
    bl = Symbol.for("react.profiler"),
    Wl = Symbol.for("react.consumer"),
    pl = Symbol.for("react.context"),
    Vl = Symbol.for("react.forward_ref"),
    Bl = Symbol.for("react.suspense"),
    Hl = Symbol.for("react.suspense_list"),
    $ = Symbol.for("react.memo"),
    El = Symbol.for("react.lazy"),
    Kl = Symbol.for("react.activity"),
    _t = Symbol.for("react.memo_cache_sentinel"),
    Jl = Symbol.iterator;
  function Ol(l) {
    return l === null || typeof l != "object"
      ? null
      : ((l = (Jl && l[Jl]) || l["@@iterator"]),
        typeof l == "function" ? l : null);
  }
  var nt = Symbol.for("react.client.reference");
  function Fl(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === nt ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case ol:
        return "Fragment";
      case bl:
        return "Profiler";
      case nl:
        return "StrictMode";
      case Bl:
        return "Suspense";
      case Hl:
        return "SuspenseList";
      case Kl:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case sl:
          return "Portal";
        case pl:
          return l.displayName || "Context";
        case Wl:
          return (l._context.displayName || "Context") + ".Consumer";
        case Vl:
          var t = l.render;
          return (
            (l = l.displayName),
            l ||
              ((l = t.displayName || t.name || ""),
              (l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef")),
            l
          );
        case $:
          return (
            (t = l.displayName || null), t !== null ? t : Fl(l.type) || "Memo"
          );
        case El:
          (t = l._payload), (l = l._init);
          try {
            return Fl(l(t));
          } catch {}
      }
    return null;
  }
  var $l = Array.isArray,
    r = U.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    p = _.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    N = { pending: !1, data: null, method: null, action: null },
    Q = [],
    J = -1;
  function s(l) {
    return { current: l };
  }
  function z(l) {
    0 > J || ((l.current = Q[J]), (Q[J] = null), J--);
  }
  function x(l, t) {
    J++, (Q[J] = l.current), (l.current = t);
  }
  var C = s(null),
    w = s(null),
    Y = s(null),
    F = s(null);
  function Ul(l, t) {
    switch ((x(Y, t), x(w, l), x(C, null), t.nodeType)) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? Qd(l) : 0;
        break;
      default:
        if (((l = t.tagName), (t = t.namespaceURI)))
          (t = Qd(t)), (l = Zd(t, l));
        else
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    z(C), x(C, l);
  }
  function zl() {
    z(C), z(w), z(Y);
  }
  function Ua(l) {
    l.memoizedState !== null && x(F, l);
    var t = C.current,
      e = Zd(t, l.type);
    t !== e && (x(w, l), x(C, e));
  }
  function Au(l) {
    w.current === l && (z(C), z(w)),
      F.current === l && (z(F), (Su._currentValue = N));
  }
  var Vn, gf;
  function Ae(l) {
    if (Vn === void 0)
      try {
        throw Error();
      } catch (e) {
        var t = e.stack.trim().match(/\n( *(at )?)/);
        (Vn = (t && t[1]) || ""),
          (gf =
            -1 <
            e.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < e.stack.indexOf("@")
                ? "@unknown:0:0"
                : "");
      }
    return (
      `
` +
      Vn +
      l +
      gf
    );
  }
  var Kn = !1;
  function Jn(l, t) {
    if (!l || Kn) return "";
    Kn = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var M = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(M.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(M, []);
                } catch (b) {
                  var g = b;
                }
                Reflect.construct(l, [], M);
              } else {
                try {
                  M.call();
                } catch (b) {
                  g = b;
                }
                l.call(M.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (b) {
                g = b;
              }
              (M = l()) &&
                typeof M.catch == "function" &&
                M.catch(function () {});
            }
          } catch (b) {
            if (b && g && typeof b.stack == "string") return [b.stack, g.stack];
          }
          return [null, null];
        },
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      u &&
        u.configurable &&
        Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var n = a.DetermineComponentFrameRoot(),
        c = n[0],
        i = n[1];
      if (c && i) {
        var f = c.split(`
`),
          h = i.split(`
`);
        for (
          u = a = 0;
          a < f.length && !f[a].includes("DetermineComponentFrameRoot");

        )
          a++;
        for (; u < h.length && !h[u].includes("DetermineComponentFrameRoot"); )
          u++;
        if (a === f.length || u === h.length)
          for (
            a = f.length - 1, u = h.length - 1;
            1 <= a && 0 <= u && f[a] !== h[u];

          )
            u--;
        for (; 1 <= a && 0 <= u; a--, u--)
          if (f[a] !== h[u]) {
            if (a !== 1 || u !== 1)
              do
                if ((a--, u--, 0 > u || f[a] !== h[u])) {
                  var E =
                    `
` + f[a].replace(" at new ", " at ");
                  return (
                    l.displayName &&
                      E.includes("<anonymous>") &&
                      (E = E.replace("<anonymous>", l.displayName)),
                    E
                  );
                }
              while (1 <= a && 0 <= u);
            break;
          }
      }
    } finally {
      (Kn = !1), (Error.prepareStackTrace = e);
    }
    return (e = l ? l.displayName || l.name : "") ? Ae(e) : "";
  }
  function Rr(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return Ae(l.type);
      case 16:
        return Ae("Lazy");
      case 13:
        return l.child !== t && t !== null
          ? Ae("Suspense Fallback")
          : Ae("Suspense");
      case 19:
        return Ae("SuspenseList");
      case 0:
      case 15:
        return Jn(l.type, !1);
      case 11:
        return Jn(l.type.render, !1);
      case 1:
        return Jn(l.type, !0);
      case 31:
        return Ae("Activity");
      default:
        return "";
    }
  }
  function Sf(l) {
    try {
      var t = "",
        e = null;
      do (t += Rr(l, e)), (e = l), (l = l.return);
      while (l);
      return t;
    } catch (a) {
      return (
        `
Error generating stack: ` +
        a.message +
        `
` +
        a.stack
      );
    }
  }
  var wn = Object.prototype.hasOwnProperty,
    Wn = y.unstable_scheduleCallback,
    $n = y.unstable_cancelCallback,
    jr = y.unstable_shouldYield,
    xr = y.unstable_requestPaint,
    ct = y.unstable_now,
    Hr = y.unstable_getCurrentPriorityLevel,
    bf = y.unstable_ImmediatePriority,
    pf = y.unstable_UserBlockingPriority,
    Mu = y.unstable_NormalPriority,
    Cr = y.unstable_LowPriority,
    Ef = y.unstable_IdlePriority,
    Br = y.log,
    qr = y.unstable_setDisableYieldValue,
    Na = null,
    it = null;
  function It(l) {
    if (
      (typeof Br == "function" && qr(l),
      it && typeof it.setStrictMode == "function")
    )
      try {
        it.setStrictMode(Na, l);
      } catch {}
  }
  var ft = Math.clz32 ? Math.clz32 : Lr,
    Yr = Math.log,
    Gr = Math.LN2;
  function Lr(l) {
    return (l >>>= 0), l === 0 ? 32 : (31 - ((Yr(l) / Gr) | 0)) | 0;
  }
  var _u = 256,
    Du = 262144,
    Ou = 4194304;
  function Me(l) {
    var t = l & 42;
    if (t !== 0) return t;
    switch (l & -l) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return l & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return l;
    }
  }
  function Uu(l, t, e) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var u = 0,
      n = l.suspendedLanes,
      c = l.pingedLanes;
    l = l.warmLanes;
    var i = a & 134217727;
    return (
      i !== 0
        ? ((a = i & ~n),
          a !== 0
            ? (u = Me(a))
            : ((c &= i),
              c !== 0
                ? (u = Me(c))
                : e || ((e = i & ~l), e !== 0 && (u = Me(e)))))
        : ((i = a & ~n),
          i !== 0
            ? (u = Me(i))
            : c !== 0
              ? (u = Me(c))
              : e || ((e = a & ~l), e !== 0 && (u = Me(e)))),
      u === 0
        ? 0
        : t !== 0 &&
            t !== u &&
            (t & n) === 0 &&
            ((n = u & -u),
            (e = t & -t),
            n >= e || (n === 32 && (e & 4194048) !== 0))
          ? t
          : u
    );
  }
  function Ra(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function Xr(l, t) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function zf() {
    var l = Ou;
    return (Ou <<= 1), (Ou & 62914560) === 0 && (Ou = 4194304), l;
  }
  function kn(l) {
    for (var t = [], e = 0; 31 > e; e++) t.push(l);
    return t;
  }
  function ja(l, t) {
    (l.pendingLanes |= t),
      t !== 268435456 &&
        ((l.suspendedLanes = 0), (l.pingedLanes = 0), (l.warmLanes = 0));
  }
  function Qr(l, t, e, a, u, n) {
    var c = l.pendingLanes;
    (l.pendingLanes = e),
      (l.suspendedLanes = 0),
      (l.pingedLanes = 0),
      (l.warmLanes = 0),
      (l.expiredLanes &= e),
      (l.entangledLanes &= e),
      (l.errorRecoveryDisabledLanes &= e),
      (l.shellSuspendCounter = 0);
    var i = l.entanglements,
      f = l.expirationTimes,
      h = l.hiddenUpdates;
    for (e = c & ~e; 0 < e; ) {
      var E = 31 - ft(e),
        M = 1 << E;
      (i[E] = 0), (f[E] = -1);
      var g = h[E];
      if (g !== null)
        for (h[E] = null, E = 0; E < g.length; E++) {
          var b = g[E];
          b !== null && (b.lane &= -536870913);
        }
      e &= ~M;
    }
    a !== 0 && Tf(l, a, 0),
      n !== 0 && u === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(c & ~t));
  }
  function Tf(l, t, e) {
    (l.pendingLanes |= t), (l.suspendedLanes &= ~t);
    var a = 31 - ft(t);
    (l.entangledLanes |= t),
      (l.entanglements[a] = l.entanglements[a] | 1073741824 | (e & 261930));
  }
  function Af(l, t) {
    var e = (l.entangledLanes |= t);
    for (l = l.entanglements; e; ) {
      var a = 31 - ft(e),
        u = 1 << a;
      (u & t) | (l[a] & t) && (l[a] |= t), (e &= ~u);
    }
  }
  function Mf(l, t) {
    var e = t & -t;
    return (
      (e = (e & 42) !== 0 ? 1 : Fn(e)),
      (e & (l.suspendedLanes | t)) !== 0 ? 0 : e
    );
  }
  function Fn(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function In(l) {
    return (
      (l &= -l),
      2 < l ? (8 < l ? ((l & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function _f() {
    var l = p.p;
    return l !== 0 ? l : ((l = window.event), l === void 0 ? 32 : rr(l.type));
  }
  function Df(l, t) {
    var e = p.p;
    try {
      return (p.p = l), t();
    } finally {
      p.p = e;
    }
  }
  var Pt = Math.random().toString(36).slice(2),
    Gl = "__reactFiber$" + Pt,
    Il = "__reactProps$" + Pt,
    Ze = "__reactContainer$" + Pt,
    Pn = "__reactEvents$" + Pt,
    Zr = "__reactListeners$" + Pt,
    Vr = "__reactHandles$" + Pt,
    Of = "__reactResources$" + Pt,
    xa = "__reactMarker$" + Pt;
  function lc(l) {
    delete l[Gl], delete l[Il], delete l[Pn], delete l[Zr], delete l[Vr];
  }
  function Ve(l) {
    var t = l[Gl];
    if (t) return t;
    for (var e = l.parentNode; e; ) {
      if ((t = e[Ze] || e[Gl])) {
        if (
          ((e = t.alternate),
          t.child !== null || (e !== null && e.child !== null))
        )
          for (l = kd(l); l !== null; ) {
            if ((e = l[Gl])) return e;
            l = kd(l);
          }
        return t;
      }
      (l = e), (e = l.parentNode);
    }
    return null;
  }
  function Ke(l) {
    if ((l = l[Gl] || l[Ze])) {
      var t = l.tag;
      if (
        t === 5 ||
        t === 6 ||
        t === 13 ||
        t === 31 ||
        t === 26 ||
        t === 27 ||
        t === 3
      )
        return l;
    }
    return null;
  }
  function Ha(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(o(33));
  }
  function Je(l) {
    var t = l[Of];
    return (
      t ||
        (t = l[Of] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function ql(l) {
    l[xa] = !0;
  }
  var Uf = new Set(),
    Nf = {};
  function _e(l, t) {
    we(l, t), we(l + "Capture", t);
  }
  function we(l, t) {
    for (Nf[l] = t, l = 0; l < t.length; l++) Uf.add(t[l]);
  }
  var Kr = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    Rf = {},
    jf = {};
  function Jr(l) {
    return wn.call(jf, l)
      ? !0
      : wn.call(Rf, l)
        ? !1
        : Kr.test(l)
          ? (jf[l] = !0)
          : ((Rf[l] = !0), !1);
  }
  function Nu(l, t, e) {
    if (Jr(t))
      if (e === null) l.removeAttribute(t);
      else {
        switch (typeof e) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              l.removeAttribute(t);
              return;
            }
        }
        l.setAttribute(t, "" + e);
      }
  }
  function Ru(l, t, e) {
    if (e === null) l.removeAttribute(t);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, "" + e);
    }
  }
  function Ht(l, t, e, a) {
    if (a === null) l.removeAttribute(e);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(e);
          return;
      }
      l.setAttributeNS(t, e, "" + a);
    }
  }
  function yt(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function xf(l) {
    var t = l.type;
    return (
      (l = l.nodeName) &&
      l.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function wr(l, t, e) {
    var a = Object.getOwnPropertyDescriptor(l.constructor.prototype, t);
    if (
      !l.hasOwnProperty(t) &&
      typeof a < "u" &&
      typeof a.get == "function" &&
      typeof a.set == "function"
    ) {
      var u = a.get,
        n = a.set;
      return (
        Object.defineProperty(l, t, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (c) {
            (e = "" + c), n.call(this, c);
          },
        }),
        Object.defineProperty(l, t, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return e;
          },
          setValue: function (c) {
            e = "" + c;
          },
          stopTracking: function () {
            (l._valueTracker = null), delete l[t];
          },
        }
      );
    }
  }
  function tc(l) {
    if (!l._valueTracker) {
      var t = xf(l) ? "checked" : "value";
      l._valueTracker = wr(l, t, "" + l[t]);
    }
  }
  function Hf(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var e = t.getValue(),
      a = "";
    return (
      l && (a = xf(l) ? (l.checked ? "true" : "false") : l.value),
      (l = a),
      l !== e ? (t.setValue(l), !0) : !1
    );
  }
  function ju(l) {
    if (
      ((l = l || (typeof document < "u" ? document : void 0)), typeof l > "u")
    )
      return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var Wr = /[\n"\\]/g;
  function gt(l) {
    return l.replace(Wr, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function ec(l, t, e, a, u, n, c, i) {
    (l.name = ""),
      c != null &&
      typeof c != "function" &&
      typeof c != "symbol" &&
      typeof c != "boolean"
        ? (l.type = c)
        : l.removeAttribute("type"),
      t != null
        ? c === "number"
          ? ((t === 0 && l.value === "") || l.value != t) &&
            (l.value = "" + yt(t))
          : l.value !== "" + yt(t) && (l.value = "" + yt(t))
        : (c !== "submit" && c !== "reset") || l.removeAttribute("value"),
      t != null
        ? ac(l, c, yt(t))
        : e != null
          ? ac(l, c, yt(e))
          : a != null && l.removeAttribute("value"),
      u == null && n != null && (l.defaultChecked = !!n),
      u != null &&
        (l.checked = u && typeof u != "function" && typeof u != "symbol"),
      i != null &&
      typeof i != "function" &&
      typeof i != "symbol" &&
      typeof i != "boolean"
        ? (l.name = "" + yt(i))
        : l.removeAttribute("name");
  }
  function Cf(l, t, e, a, u, n, c, i) {
    if (
      (n != null &&
        typeof n != "function" &&
        typeof n != "symbol" &&
        typeof n != "boolean" &&
        (l.type = n),
      t != null || e != null)
    ) {
      if (!((n !== "submit" && n !== "reset") || t != null)) {
        tc(l);
        return;
      }
      (e = e != null ? "" + yt(e) : ""),
        (t = t != null ? "" + yt(t) : e),
        i || t === l.value || (l.value = t),
        (l.defaultValue = t);
    }
    (a = a ?? u),
      (a = typeof a != "function" && typeof a != "symbol" && !!a),
      (l.checked = i ? l.checked : !!a),
      (l.defaultChecked = !!a),
      c != null &&
        typeof c != "function" &&
        typeof c != "symbol" &&
        typeof c != "boolean" &&
        (l.name = c),
      tc(l);
  }
  function ac(l, t, e) {
    (t === "number" && ju(l.ownerDocument) === l) ||
      l.defaultValue === "" + e ||
      (l.defaultValue = "" + e);
  }
  function We(l, t, e, a) {
    if (((l = l.options), t)) {
      t = {};
      for (var u = 0; u < e.length; u++) t["$" + e[u]] = !0;
      for (e = 0; e < l.length; e++)
        (u = t.hasOwnProperty("$" + l[e].value)),
          l[e].selected !== u && (l[e].selected = u),
          u && a && (l[e].defaultSelected = !0);
    } else {
      for (e = "" + yt(e), t = null, u = 0; u < l.length; u++) {
        if (l[u].value === e) {
          (l[u].selected = !0), a && (l[u].defaultSelected = !0);
          return;
        }
        t !== null || l[u].disabled || (t = l[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Bf(l, t, e) {
    if (
      t != null &&
      ((t = "" + yt(t)), t !== l.value && (l.value = t), e == null)
    ) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = e != null ? "" + yt(e) : "";
  }
  function qf(l, t, e, a) {
    if (t == null) {
      if (a != null) {
        if (e != null) throw Error(o(92));
        if ($l(a)) {
          if (1 < a.length) throw Error(o(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), (t = e);
    }
    (e = yt(t)),
      (l.defaultValue = e),
      (a = l.textContent),
      a === e && a !== "" && a !== null && (l.value = a),
      tc(l);
  }
  function $e(l, t) {
    if (t) {
      var e = l.firstChild;
      if (e && e === l.lastChild && e.nodeType === 3) {
        e.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var $r = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Yf(l, t, e) {
    var a = t.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === ""
      ? a
        ? l.setProperty(t, "")
        : t === "float"
          ? (l.cssFloat = "")
          : (l[t] = "")
      : a
        ? l.setProperty(t, e)
        : typeof e != "number" || e === 0 || $r.has(t)
          ? t === "float"
            ? (l.cssFloat = e)
            : (l[t] = ("" + e).trim())
          : (l[t] = e + "px");
  }
  function Gf(l, t, e) {
    if (t != null && typeof t != "object") throw Error(o(62));
    if (((l = l.style), e != null)) {
      for (var a in e)
        !e.hasOwnProperty(a) ||
          (t != null && t.hasOwnProperty(a)) ||
          (a.indexOf("--") === 0
            ? l.setProperty(a, "")
            : a === "float"
              ? (l.cssFloat = "")
              : (l[a] = ""));
      for (var u in t)
        (a = t[u]), t.hasOwnProperty(u) && e[u] !== a && Yf(l, u, a);
    } else for (var n in t) t.hasOwnProperty(n) && Yf(l, n, t[n]);
  }
  function uc(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var kr = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    Fr =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function xu(l) {
    return Fr.test("" + l)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : l;
  }
  function Ct() {}
  var nc = null;
  function cc(l) {
    return (
      (l = l.target || l.srcElement || window),
      l.correspondingUseElement && (l = l.correspondingUseElement),
      l.nodeType === 3 ? l.parentNode : l
    );
  }
  var ke = null,
    Fe = null;
  function Lf(l) {
    var t = Ke(l);
    if (t && (l = t.stateNode)) {
      var e = l[Il] || null;
      l: switch (((l = t.stateNode), t.type)) {
        case "input":
          if (
            (ec(
              l,
              e.value,
              e.defaultValue,
              e.defaultValue,
              e.checked,
              e.defaultChecked,
              e.type,
              e.name
            ),
            (t = e.name),
            e.type === "radio" && t != null)
          ) {
            for (e = l; e.parentNode; ) e = e.parentNode;
            for (
              e = e.querySelectorAll(
                'input[name="' + gt("" + t) + '"][type="radio"]'
              ),
                t = 0;
              t < e.length;
              t++
            ) {
              var a = e[t];
              if (a !== l && a.form === l.form) {
                var u = a[Il] || null;
                if (!u) throw Error(o(90));
                ec(
                  a,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (t = 0; t < e.length; t++)
              (a = e[t]), a.form === l.form && Hf(a);
          }
          break l;
        case "textarea":
          Bf(l, e.value, e.defaultValue);
          break l;
        case "select":
          (t = e.value), t != null && We(l, !!e.multiple, t, !1);
      }
    }
  }
  var ic = !1;
  function Xf(l, t, e) {
    if (ic) return l(t, e);
    ic = !0;
    try {
      var a = l(t);
      return a;
    } finally {
      if (
        ((ic = !1),
        (ke !== null || Fe !== null) &&
          (En(), ke && ((t = ke), (l = Fe), (Fe = ke = null), Lf(t), l)))
      )
        for (t = 0; t < l.length; t++) Lf(l[t]);
    }
  }
  function Ca(l, t) {
    var e = l.stateNode;
    if (e === null) return null;
    var a = e[Il] || null;
    if (a === null) return null;
    e = a[t];
    l: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (a = !a.disabled) ||
          ((l = l.type),
          (a = !(
            l === "button" ||
            l === "input" ||
            l === "select" ||
            l === "textarea"
          ))),
          (l = !a);
        break l;
      default:
        l = !1;
    }
    if (l) return null;
    if (e && typeof e != "function") throw Error(o(231, t, typeof e));
    return e;
  }
  var Bt = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    fc = !1;
  if (Bt)
    try {
      var Ba = {};
      Object.defineProperty(Ba, "passive", {
        get: function () {
          fc = !0;
        },
      }),
        window.addEventListener("test", Ba, Ba),
        window.removeEventListener("test", Ba, Ba);
    } catch {
      fc = !1;
    }
  var le = null,
    sc = null,
    Hu = null;
  function Qf() {
    if (Hu) return Hu;
    var l,
      t = sc,
      e = t.length,
      a,
      u = "value" in le ? le.value : le.textContent,
      n = u.length;
    for (l = 0; l < e && t[l] === u[l]; l++);
    var c = e - l;
    for (a = 1; a <= c && t[e - a] === u[n - a]; a++);
    return (Hu = u.slice(l, 1 < a ? 1 - a : void 0));
  }
  function Cu(l) {
    var t = l.keyCode;
    return (
      "charCode" in l
        ? ((l = l.charCode), l === 0 && t === 13 && (l = 13))
        : (l = t),
      l === 10 && (l = 13),
      32 <= l || l === 13 ? l : 0
    );
  }
  function Bu() {
    return !0;
  }
  function Zf() {
    return !1;
  }
  function Pl(l) {
    function t(e, a, u, n, c) {
      (this._reactName = e),
        (this._targetInst = u),
        (this.type = a),
        (this.nativeEvent = n),
        (this.target = c),
        (this.currentTarget = null);
      for (var i in l)
        l.hasOwnProperty(i) && ((e = l[i]), (this[i] = e ? e(n) : n[i]));
      return (
        (this.isDefaultPrevented = (
          n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1
        )
          ? Bu
          : Zf),
        (this.isPropagationStopped = Zf),
        this
      );
    }
    return (
      O(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var e = this.nativeEvent;
          e &&
            (e.preventDefault
              ? e.preventDefault()
              : typeof e.returnValue != "unknown" && (e.returnValue = !1),
            (this.isDefaultPrevented = Bu));
        },
        stopPropagation: function () {
          var e = this.nativeEvent;
          e &&
            (e.stopPropagation
              ? e.stopPropagation()
              : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0),
            (this.isPropagationStopped = Bu));
        },
        persist: function () {},
        isPersistent: Bu,
      }),
      t
    );
  }
  var De = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (l) {
        return l.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    qu = Pl(De),
    qa = O({}, De, { view: 0, detail: 0 }),
    Ir = Pl(qa),
    oc,
    dc,
    Ya,
    Yu = O({}, qa, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: mc,
      button: 0,
      buttons: 0,
      relatedTarget: function (l) {
        return l.relatedTarget === void 0
          ? l.fromElement === l.srcElement
            ? l.toElement
            : l.fromElement
          : l.relatedTarget;
      },
      movementX: function (l) {
        return "movementX" in l
          ? l.movementX
          : (l !== Ya &&
              (Ya && l.type === "mousemove"
                ? ((oc = l.screenX - Ya.screenX), (dc = l.screenY - Ya.screenY))
                : (dc = oc = 0),
              (Ya = l)),
            oc);
      },
      movementY: function (l) {
        return "movementY" in l ? l.movementY : dc;
      },
    }),
    Vf = Pl(Yu),
    Pr = O({}, Yu, { dataTransfer: 0 }),
    lm = Pl(Pr),
    tm = O({}, qa, { relatedTarget: 0 }),
    rc = Pl(tm),
    em = O({}, De, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    am = Pl(em),
    um = O({}, De, {
      clipboardData: function (l) {
        return "clipboardData" in l ? l.clipboardData : window.clipboardData;
      },
    }),
    nm = Pl(um),
    cm = O({}, De, { data: 0 }),
    Kf = Pl(cm),
    im = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    fm = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    sm = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function om(l) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(l)
      : (l = sm[l])
        ? !!t[l]
        : !1;
  }
  function mc() {
    return om;
  }
  var dm = O({}, qa, {
      key: function (l) {
        if (l.key) {
          var t = im[l.key] || l.key;
          if (t !== "Unidentified") return t;
        }
        return l.type === "keypress"
          ? ((l = Cu(l)), l === 13 ? "Enter" : String.fromCharCode(l))
          : l.type === "keydown" || l.type === "keyup"
            ? fm[l.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: mc,
      charCode: function (l) {
        return l.type === "keypress" ? Cu(l) : 0;
      },
      keyCode: function (l) {
        return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
      },
      which: function (l) {
        return l.type === "keypress"
          ? Cu(l)
          : l.type === "keydown" || l.type === "keyup"
            ? l.keyCode
            : 0;
      },
    }),
    rm = Pl(dm),
    mm = O({}, Yu, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Jf = Pl(mm),
    vm = O({}, qa, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: mc,
    }),
    hm = Pl(vm),
    ym = O({}, De, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    gm = Pl(ym),
    Sm = O({}, Yu, {
      deltaX: function (l) {
        return "deltaX" in l
          ? l.deltaX
          : "wheelDeltaX" in l
            ? -l.wheelDeltaX
            : 0;
      },
      deltaY: function (l) {
        return "deltaY" in l
          ? l.deltaY
          : "wheelDeltaY" in l
            ? -l.wheelDeltaY
            : "wheelDelta" in l
              ? -l.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    bm = Pl(Sm),
    pm = O({}, De, { newState: 0, oldState: 0 }),
    Em = Pl(pm),
    zm = [9, 13, 27, 32],
    vc = Bt && "CompositionEvent" in window,
    Ga = null;
  Bt && "documentMode" in document && (Ga = document.documentMode);
  var Tm = Bt && "TextEvent" in window && !Ga,
    wf = Bt && (!vc || (Ga && 8 < Ga && 11 >= Ga)),
    Wf = " ",
    $f = !1;
  function kf(l, t) {
    switch (l) {
      case "keyup":
        return zm.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Ff(l) {
    return (l = l.detail), typeof l == "object" && "data" in l ? l.data : null;
  }
  var Ie = !1;
  function Am(l, t) {
    switch (l) {
      case "compositionend":
        return Ff(t);
      case "keypress":
        return t.which !== 32 ? null : (($f = !0), Wf);
      case "textInput":
        return (l = t.data), l === Wf && $f ? null : l;
      default:
        return null;
    }
  }
  function Mm(l, t) {
    if (Ie)
      return l === "compositionend" || (!vc && kf(l, t))
        ? ((l = Qf()), (Hu = sc = le = null), (Ie = !1), l)
        : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return wf && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var _m = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function If(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!_m[l.type] : t === "textarea";
  }
  function Pf(l, t, e, a) {
    ke ? (Fe ? Fe.push(a) : (Fe = [a])) : (ke = a),
      (t = On(t, "onChange")),
      0 < t.length &&
        ((e = new qu("onChange", "change", null, e, a)),
        l.push({ event: e, listeners: t }));
  }
  var La = null,
    Xa = null;
  function Dm(l) {
    Bd(l, 0);
  }
  function Gu(l) {
    var t = Ha(l);
    if (Hf(t)) return l;
  }
  function ls(l, t) {
    if (l === "change") return t;
  }
  var ts = !1;
  if (Bt) {
    var hc;
    if (Bt) {
      var yc = "oninput" in document;
      if (!yc) {
        var es = document.createElement("div");
        es.setAttribute("oninput", "return;"),
          (yc = typeof es.oninput == "function");
      }
      hc = yc;
    } else hc = !1;
    ts = hc && (!document.documentMode || 9 < document.documentMode);
  }
  function as() {
    La && (La.detachEvent("onpropertychange", us), (Xa = La = null));
  }
  function us(l) {
    if (l.propertyName === "value" && Gu(Xa)) {
      var t = [];
      Pf(t, Xa, l, cc(l)), Xf(Dm, t);
    }
  }
  function Om(l, t, e) {
    l === "focusin"
      ? (as(), (La = t), (Xa = e), La.attachEvent("onpropertychange", us))
      : l === "focusout" && as();
  }
  function Um(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return Gu(Xa);
  }
  function Nm(l, t) {
    if (l === "click") return Gu(t);
  }
  function Rm(l, t) {
    if (l === "input" || l === "change") return Gu(t);
  }
  function jm(l, t) {
    return (l === t && (l !== 0 || 1 / l === 1 / t)) || (l !== l && t !== t);
  }
  var st = typeof Object.is == "function" ? Object.is : jm;
  function Qa(l, t) {
    if (st(l, t)) return !0;
    if (
      typeof l != "object" ||
      l === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var e = Object.keys(l),
      a = Object.keys(t);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var u = e[a];
      if (!wn.call(t, u) || !st(l[u], t[u])) return !1;
    }
    return !0;
  }
  function ns(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function cs(l, t) {
    var e = ns(l);
    l = 0;
    for (var a; e; ) {
      if (e.nodeType === 3) {
        if (((a = l + e.textContent.length), l <= t && a >= t))
          return { node: e, offset: t - l };
        l = a;
      }
      l: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break l;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = ns(e);
    }
  }
  function is(l, t) {
    return l && t
      ? l === t
        ? !0
        : l && l.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? is(l, t.parentNode)
            : "contains" in l
              ? l.contains(t)
              : l.compareDocumentPosition
                ? !!(l.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function fs(l) {
    l =
      l != null &&
      l.ownerDocument != null &&
      l.ownerDocument.defaultView != null
        ? l.ownerDocument.defaultView
        : window;
    for (var t = ju(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var e = typeof t.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) l = t.contentWindow;
      else break;
      t = ju(l.document);
    }
    return t;
  }
  function gc(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (l.type === "text" ||
          l.type === "search" ||
          l.type === "tel" ||
          l.type === "url" ||
          l.type === "password")) ||
        t === "textarea" ||
        l.contentEditable === "true")
    );
  }
  var xm = Bt && "documentMode" in document && 11 >= document.documentMode,
    Pe = null,
    Sc = null,
    Za = null,
    bc = !1;
  function ss(l, t, e) {
    var a =
      e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    bc ||
      Pe == null ||
      Pe !== ju(a) ||
      ((a = Pe),
      "selectionStart" in a && gc(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = (
            (a.ownerDocument && a.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (Za && Qa(Za, a)) ||
        ((Za = a),
        (a = On(Sc, "onSelect")),
        0 < a.length &&
          ((t = new qu("onSelect", "select", null, t, e)),
          l.push({ event: t, listeners: a }),
          (t.target = Pe))));
  }
  function Oe(l, t) {
    var e = {};
    return (
      (e[l.toLowerCase()] = t.toLowerCase()),
      (e["Webkit" + l] = "webkit" + t),
      (e["Moz" + l] = "moz" + t),
      e
    );
  }
  var la = {
      animationend: Oe("Animation", "AnimationEnd"),
      animationiteration: Oe("Animation", "AnimationIteration"),
      animationstart: Oe("Animation", "AnimationStart"),
      transitionrun: Oe("Transition", "TransitionRun"),
      transitionstart: Oe("Transition", "TransitionStart"),
      transitioncancel: Oe("Transition", "TransitionCancel"),
      transitionend: Oe("Transition", "TransitionEnd"),
    },
    pc = {},
    os = {};
  Bt &&
    ((os = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete la.animationend.animation,
      delete la.animationiteration.animation,
      delete la.animationstart.animation),
    "TransitionEvent" in window || delete la.transitionend.transition);
  function Ue(l) {
    if (pc[l]) return pc[l];
    if (!la[l]) return l;
    var t = la[l],
      e;
    for (e in t) if (t.hasOwnProperty(e) && e in os) return (pc[l] = t[e]);
    return l;
  }
  var ds = Ue("animationend"),
    rs = Ue("animationiteration"),
    ms = Ue("animationstart"),
    Hm = Ue("transitionrun"),
    Cm = Ue("transitionstart"),
    Bm = Ue("transitioncancel"),
    vs = Ue("transitionend"),
    hs = new Map(),
    Ec =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  Ec.push("scrollEnd");
  function Dt(l, t) {
    hs.set(l, t), _e(t, [l]);
  }
  var Lu =
      typeof reportError == "function"
        ? reportError
        : function (l) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var t = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof l == "object" &&
                  l !== null &&
                  typeof l.message == "string"
                    ? String(l.message)
                    : String(l),
                error: l,
              });
              if (!window.dispatchEvent(t)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", l);
              return;
            }
            console.error(l);
          },
    St = [],
    ta = 0,
    zc = 0;
  function Xu() {
    for (var l = ta, t = (zc = ta = 0); t < l; ) {
      var e = St[t];
      St[t++] = null;
      var a = St[t];
      St[t++] = null;
      var u = St[t];
      St[t++] = null;
      var n = St[t];
      if (((St[t++] = null), a !== null && u !== null)) {
        var c = a.pending;
        c === null ? (u.next = u) : ((u.next = c.next), (c.next = u)),
          (a.pending = u);
      }
      n !== 0 && ys(e, u, n);
    }
  }
  function Qu(l, t, e, a) {
    (St[ta++] = l),
      (St[ta++] = t),
      (St[ta++] = e),
      (St[ta++] = a),
      (zc |= a),
      (l.lanes |= a),
      (l = l.alternate),
      l !== null && (l.lanes |= a);
  }
  function Tc(l, t, e, a) {
    return Qu(l, t, e, a), Zu(l);
  }
  function Ne(l, t) {
    return Qu(l, null, null, t), Zu(l);
  }
  function ys(l, t, e) {
    l.lanes |= e;
    var a = l.alternate;
    a !== null && (a.lanes |= e);
    for (var u = !1, n = l.return; n !== null; )
      (n.childLanes |= e),
        (a = n.alternate),
        a !== null && (a.childLanes |= e),
        n.tag === 22 &&
          ((l = n.stateNode), l === null || l._visibility & 1 || (u = !0)),
        (l = n),
        (n = n.return);
    return l.tag === 3
      ? ((n = l.stateNode),
        u &&
          t !== null &&
          ((u = 31 - ft(e)),
          (l = n.hiddenUpdates),
          (a = l[u]),
          a === null ? (l[u] = [t]) : a.push(t),
          (t.lane = e | 536870912)),
        n)
      : null;
  }
  function Zu(l) {
    if (50 < du) throw ((du = 0), (ji = null), Error(o(185)));
    for (var t = l.return; t !== null; ) (l = t), (t = l.return);
    return l.tag === 3 ? l.stateNode : null;
  }
  var ea = {};
  function qm(l, t, e, a) {
    (this.tag = l),
      (this.key = e),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function ot(l, t, e, a) {
    return new qm(l, t, e, a);
  }
  function Ac(l) {
    return (l = l.prototype), !(!l || !l.isReactComponent);
  }
  function qt(l, t) {
    var e = l.alternate;
    return (
      e === null
        ? ((e = ot(l.tag, t, l.key, l.mode)),
          (e.elementType = l.elementType),
          (e.type = l.type),
          (e.stateNode = l.stateNode),
          (e.alternate = l),
          (l.alternate = e))
        : ((e.pendingProps = t),
          (e.type = l.type),
          (e.flags = 0),
          (e.subtreeFlags = 0),
          (e.deletions = null)),
      (e.flags = l.flags & 65011712),
      (e.childLanes = l.childLanes),
      (e.lanes = l.lanes),
      (e.child = l.child),
      (e.memoizedProps = l.memoizedProps),
      (e.memoizedState = l.memoizedState),
      (e.updateQueue = l.updateQueue),
      (t = l.dependencies),
      (e.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (e.sibling = l.sibling),
      (e.index = l.index),
      (e.ref = l.ref),
      (e.refCleanup = l.refCleanup),
      e
    );
  }
  function gs(l, t) {
    l.flags &= 65011714;
    var e = l.alternate;
    return (
      e === null
        ? ((l.childLanes = 0),
          (l.lanes = t),
          (l.child = null),
          (l.subtreeFlags = 0),
          (l.memoizedProps = null),
          (l.memoizedState = null),
          (l.updateQueue = null),
          (l.dependencies = null),
          (l.stateNode = null))
        : ((l.childLanes = e.childLanes),
          (l.lanes = e.lanes),
          (l.child = e.child),
          (l.subtreeFlags = 0),
          (l.deletions = null),
          (l.memoizedProps = e.memoizedProps),
          (l.memoizedState = e.memoizedState),
          (l.updateQueue = e.updateQueue),
          (l.type = e.type),
          (t = e.dependencies),
          (l.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      l
    );
  }
  function Vu(l, t, e, a, u, n) {
    var c = 0;
    if (((a = l), typeof l == "function")) Ac(l) && (c = 1);
    else if (typeof l == "string")
      c = Q0(l, e, C.current)
        ? 26
        : l === "html" || l === "head" || l === "body"
          ? 27
          : 5;
    else
      l: switch (l) {
        case Kl:
          return (l = ot(31, e, t, u)), (l.elementType = Kl), (l.lanes = n), l;
        case ol:
          return Re(e.children, u, n, t);
        case nl:
          (c = 8), (u |= 24);
          break;
        case bl:
          return (
            (l = ot(12, e, t, u | 2)), (l.elementType = bl), (l.lanes = n), l
          );
        case Bl:
          return (l = ot(13, e, t, u)), (l.elementType = Bl), (l.lanes = n), l;
        case Hl:
          return (l = ot(19, e, t, u)), (l.elementType = Hl), (l.lanes = n), l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case pl:
                c = 10;
                break l;
              case Wl:
                c = 9;
                break l;
              case Vl:
                c = 11;
                break l;
              case $:
                c = 14;
                break l;
              case El:
                (c = 16), (a = null);
                break l;
            }
          (c = 29),
            (e = Error(o(130, l === null ? "null" : typeof l, ""))),
            (a = null);
      }
    return (
      (t = ot(c, e, t, u)), (t.elementType = l), (t.type = a), (t.lanes = n), t
    );
  }
  function Re(l, t, e, a) {
    return (l = ot(7, l, a, t)), (l.lanes = e), l;
  }
  function Mc(l, t, e) {
    return (l = ot(6, l, null, t)), (l.lanes = e), l;
  }
  function Ss(l) {
    var t = ot(18, null, null, 0);
    return (t.stateNode = l), t;
  }
  function _c(l, t, e) {
    return (
      (t = ot(4, l.children !== null ? l.children : [], l.key, t)),
      (t.lanes = e),
      (t.stateNode = {
        containerInfo: l.containerInfo,
        pendingChildren: null,
        implementation: l.implementation,
      }),
      t
    );
  }
  var bs = new WeakMap();
  function bt(l, t) {
    if (typeof l == "object" && l !== null) {
      var e = bs.get(l);
      return e !== void 0
        ? e
        : ((t = { value: l, source: t, stack: Sf(t) }), bs.set(l, t), t);
    }
    return { value: l, source: t, stack: Sf(t) };
  }
  var aa = [],
    ua = 0,
    Ku = null,
    Va = 0,
    pt = [],
    Et = 0,
    te = null,
    Nt = 1,
    Rt = "";
  function Yt(l, t) {
    (aa[ua++] = Va), (aa[ua++] = Ku), (Ku = l), (Va = t);
  }
  function ps(l, t, e) {
    (pt[Et++] = Nt), (pt[Et++] = Rt), (pt[Et++] = te), (te = l);
    var a = Nt;
    l = Rt;
    var u = 32 - ft(a) - 1;
    (a &= ~(1 << u)), (e += 1);
    var n = 32 - ft(t) + u;
    if (30 < n) {
      var c = u - (u % 5);
      (n = (a & ((1 << c) - 1)).toString(32)),
        (a >>= c),
        (u -= c),
        (Nt = (1 << (32 - ft(t) + u)) | (e << u) | a),
        (Rt = n + l);
    } else (Nt = (1 << n) | (e << u) | a), (Rt = l);
  }
  function Dc(l) {
    l.return !== null && (Yt(l, 1), ps(l, 1, 0));
  }
  function Oc(l) {
    for (; l === Ku; )
      (Ku = aa[--ua]), (aa[ua] = null), (Va = aa[--ua]), (aa[ua] = null);
    for (; l === te; )
      (te = pt[--Et]),
        (pt[Et] = null),
        (Rt = pt[--Et]),
        (pt[Et] = null),
        (Nt = pt[--Et]),
        (pt[Et] = null);
  }
  function Es(l, t) {
    (pt[Et++] = Nt),
      (pt[Et++] = Rt),
      (pt[Et++] = te),
      (Nt = t.id),
      (Rt = t.overflow),
      (te = l);
  }
  var Ll = null,
    gl = null,
    ul = !1,
    ee = null,
    zt = !1,
    Uc = Error(o(519));
  function ae(l) {
    var t = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        ""
      )
    );
    throw (Ka(bt(t, l)), Uc);
  }
  function zs(l) {
    var t = l.stateNode,
      e = l.type,
      a = l.memoizedProps;
    switch (((t[Gl] = l), (t[Il] = a), e)) {
      case "dialog":
        tl("cancel", t), tl("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        tl("load", t);
        break;
      case "video":
      case "audio":
        for (e = 0; e < mu.length; e++) tl(mu[e], t);
        break;
      case "source":
        tl("error", t);
        break;
      case "img":
      case "image":
      case "link":
        tl("error", t), tl("load", t);
        break;
      case "details":
        tl("toggle", t);
        break;
      case "input":
        tl("invalid", t),
          Cf(
            t,
            a.value,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name,
            !0
          );
        break;
      case "select":
        tl("invalid", t);
        break;
      case "textarea":
        tl("invalid", t), qf(t, a.value, a.defaultValue, a.children);
    }
    (e = a.children),
      (typeof e != "string" && typeof e != "number" && typeof e != "bigint") ||
      t.textContent === "" + e ||
      a.suppressHydrationWarning === !0 ||
      Ld(t.textContent, e)
        ? (a.popover != null && (tl("beforetoggle", t), tl("toggle", t)),
          a.onScroll != null && tl("scroll", t),
          a.onScrollEnd != null && tl("scrollend", t),
          a.onClick != null && (t.onclick = Ct),
          (t = !0))
        : (t = !1),
      t || ae(l, !0);
  }
  function Ts(l) {
    for (Ll = l.return; Ll; )
      switch (Ll.tag) {
        case 5:
        case 31:
        case 13:
          zt = !1;
          return;
        case 27:
        case 3:
          zt = !0;
          return;
        default:
          Ll = Ll.return;
      }
  }
  function na(l) {
    if (l !== Ll) return !1;
    if (!ul) return Ts(l), (ul = !0), !1;
    var t = l.tag,
      e;
    if (
      ((e = t !== 3 && t !== 27) &&
        ((e = t === 5) &&
          ((e = l.type),
          (e =
            !(e !== "form" && e !== "button") || wi(l.type, l.memoizedProps))),
        (e = !e)),
      e && gl && ae(l),
      Ts(l),
      t === 13)
    ) {
      if (((l = l.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
        throw Error(o(317));
      gl = $d(l);
    } else if (t === 31) {
      if (((l = l.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
        throw Error(o(317));
      gl = $d(l);
    } else
      t === 27
        ? ((t = gl), ge(l.type) ? ((l = Ii), (Ii = null), (gl = l)) : (gl = t))
        : (gl = Ll ? At(l.stateNode.nextSibling) : null);
    return !0;
  }
  function je() {
    (gl = Ll = null), (ul = !1);
  }
  function Nc() {
    var l = ee;
    return (
      l !== null &&
        (at === null ? (at = l) : at.push.apply(at, l), (ee = null)),
      l
    );
  }
  function Ka(l) {
    ee === null ? (ee = [l]) : ee.push(l);
  }
  var Rc = s(null),
    xe = null,
    Gt = null;
  function ue(l, t, e) {
    x(Rc, t._currentValue), (t._currentValue = e);
  }
  function Lt(l) {
    (l._currentValue = Rc.current), z(Rc);
  }
  function jc(l, t, e) {
    for (; l !== null; ) {
      var a = l.alternate;
      if (
        ((l.childLanes & t) !== t
          ? ((l.childLanes |= t), a !== null && (a.childLanes |= t))
          : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
        l === e)
      )
        break;
      l = l.return;
    }
  }
  function xc(l, t, e, a) {
    var u = l.child;
    for (u !== null && (u.return = l); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var c = u.child;
        n = n.firstContext;
        l: for (; n !== null; ) {
          var i = n;
          n = u;
          for (var f = 0; f < t.length; f++)
            if (i.context === t[f]) {
              (n.lanes |= e),
                (i = n.alternate),
                i !== null && (i.lanes |= e),
                jc(n.return, e, l),
                a || (c = null);
              break l;
            }
          n = i.next;
        }
      } else if (u.tag === 18) {
        if (((c = u.return), c === null)) throw Error(o(341));
        (c.lanes |= e),
          (n = c.alternate),
          n !== null && (n.lanes |= e),
          jc(c, e, l),
          (c = null);
      } else c = u.child;
      if (c !== null) c.return = u;
      else
        for (c = u; c !== null; ) {
          if (c === l) {
            c = null;
            break;
          }
          if (((u = c.sibling), u !== null)) {
            (u.return = c.return), (c = u);
            break;
          }
          c = c.return;
        }
      u = c;
    }
  }
  function ca(l, t, e, a) {
    l = null;
    for (var u = t, n = !1; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var c = u.alternate;
        if (c === null) throw Error(o(387));
        if (((c = c.memoizedProps), c !== null)) {
          var i = u.type;
          st(u.pendingProps.value, c.value) ||
            (l !== null ? l.push(i) : (l = [i]));
        }
      } else if (u === F.current) {
        if (((c = u.alternate), c === null)) throw Error(o(387));
        c.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (l !== null ? l.push(Su) : (l = [Su]));
      }
      u = u.return;
    }
    l !== null && xc(t, l, e, a), (t.flags |= 262144);
  }
  function Ju(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!st(l.context._currentValue, l.memoizedValue)) return !0;
      l = l.next;
    }
    return !1;
  }
  function He(l) {
    (xe = l),
      (Gt = null),
      (l = l.dependencies),
      l !== null && (l.firstContext = null);
  }
  function Xl(l) {
    return As(xe, l);
  }
  function wu(l, t) {
    return xe === null && He(l), As(l, t);
  }
  function As(l, t) {
    var e = t._currentValue;
    if (((t = { context: t, memoizedValue: e, next: null }), Gt === null)) {
      if (l === null) throw Error(o(308));
      (Gt = t),
        (l.dependencies = { lanes: 0, firstContext: t }),
        (l.flags |= 524288);
    } else Gt = Gt.next = t;
    return e;
  }
  var Ym =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var l = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (e, a) {
                  l.push(a);
                },
              });
            this.abort = function () {
              (t.aborted = !0),
                l.forEach(function (e) {
                  return e();
                });
            };
          },
    Gm = y.unstable_scheduleCallback,
    Lm = y.unstable_NormalPriority,
    Nl = {
      $$typeof: pl,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Hc() {
    return { controller: new Ym(), data: new Map(), refCount: 0 };
  }
  function Ja(l) {
    l.refCount--,
      l.refCount === 0 &&
        Gm(Lm, function () {
          l.controller.abort();
        });
  }
  var wa = null,
    Cc = 0,
    ia = 0,
    fa = null;
  function Xm(l, t) {
    if (wa === null) {
      var e = (wa = []);
      (Cc = 0),
        (ia = Yi()),
        (fa = {
          status: "pending",
          value: void 0,
          then: function (a) {
            e.push(a);
          },
        });
    }
    return Cc++, t.then(Ms, Ms), t;
  }
  function Ms() {
    if (--Cc === 0 && wa !== null) {
      fa !== null && (fa.status = "fulfilled");
      var l = wa;
      (wa = null), (ia = 0), (fa = null);
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function Qm(l, t) {
    var e = [],
      a = {
        status: "pending",
        value: null,
        reason: null,
        then: function (u) {
          e.push(u);
        },
      };
    return (
      l.then(
        function () {
          (a.status = "fulfilled"), (a.value = t);
          for (var u = 0; u < e.length; u++) (0, e[u])(t);
        },
        function (u) {
          for (a.status = "rejected", a.reason = u, u = 0; u < e.length; u++)
            (0, e[u])(void 0);
        }
      ),
      a
    );
  }
  var _s = r.S;
  r.S = function (l, t) {
    (od = ct()),
      typeof t == "object" &&
        t !== null &&
        typeof t.then == "function" &&
        Xm(l, t),
      _s !== null && _s(l, t);
  };
  var Ce = s(null);
  function Bc() {
    var l = Ce.current;
    return l !== null ? l : yl.pooledCache;
  }
  function Wu(l, t) {
    t === null ? x(Ce, Ce.current) : x(Ce, t.pool);
  }
  function Ds() {
    var l = Bc();
    return l === null ? null : { parent: Nl._currentValue, pool: l };
  }
  var sa = Error(o(460)),
    qc = Error(o(474)),
    $u = Error(o(542)),
    ku = { then: function () {} };
  function Os(l) {
    return (l = l.status), l === "fulfilled" || l === "rejected";
  }
  function Us(l, t, e) {
    switch (
      ((e = l[e]),
      e === void 0 ? l.push(t) : e !== t && (t.then(Ct, Ct), (t = e)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((l = t.reason), Rs(l), l);
      default:
        if (typeof t.status == "string") t.then(Ct, Ct);
        else {
          if (((l = yl), l !== null && 100 < l.shellSuspendCounter))
            throw Error(o(482));
          (l = t),
            (l.status = "pending"),
            l.then(
              function (a) {
                if (t.status === "pending") {
                  var u = t;
                  (u.status = "fulfilled"), (u.value = a);
                }
              },
              function (a) {
                if (t.status === "pending") {
                  var u = t;
                  (u.status = "rejected"), (u.reason = a);
                }
              }
            );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((l = t.reason), Rs(l), l);
        }
        throw ((qe = t), sa);
    }
  }
  function Be(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function"
        ? ((qe = e), sa)
        : e;
    }
  }
  var qe = null;
  function Ns() {
    if (qe === null) throw Error(o(459));
    var l = qe;
    return (qe = null), l;
  }
  function Rs(l) {
    if (l === sa || l === $u) throw Error(o(483));
  }
  var oa = null,
    Wa = 0;
  function Fu(l) {
    var t = Wa;
    return (Wa += 1), oa === null && (oa = []), Us(oa, l, t);
  }
  function $a(l, t) {
    (t = t.props.ref), (l.ref = t !== void 0 ? t : null);
  }
  function Iu(l, t) {
    throw t.$$typeof === L
      ? Error(o(525))
      : ((l = Object.prototype.toString.call(t)),
        Error(
          o(
            31,
            l === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : l
          )
        ));
  }
  function js(l) {
    function t(m, d) {
      if (l) {
        var v = m.deletions;
        v === null ? ((m.deletions = [d]), (m.flags |= 16)) : v.push(d);
      }
    }
    function e(m, d) {
      if (!l) return null;
      for (; d !== null; ) t(m, d), (d = d.sibling);
      return null;
    }
    function a(m) {
      for (var d = new Map(); m !== null; )
        m.key !== null ? d.set(m.key, m) : d.set(m.index, m), (m = m.sibling);
      return d;
    }
    function u(m, d) {
      return (m = qt(m, d)), (m.index = 0), (m.sibling = null), m;
    }
    function n(m, d, v) {
      return (
        (m.index = v),
        l
          ? ((v = m.alternate),
            v !== null
              ? ((v = v.index), v < d ? ((m.flags |= 67108866), d) : v)
              : ((m.flags |= 67108866), d))
          : ((m.flags |= 1048576), d)
      );
    }
    function c(m) {
      return l && m.alternate === null && (m.flags |= 67108866), m;
    }
    function i(m, d, v, A) {
      return d === null || d.tag !== 6
        ? ((d = Mc(v, m.mode, A)), (d.return = m), d)
        : ((d = u(d, v)), (d.return = m), d);
    }
    function f(m, d, v, A) {
      var Z = v.type;
      return Z === ol
        ? E(m, d, v.props.children, A, v.key)
        : d !== null &&
            (d.elementType === Z ||
              (typeof Z == "object" &&
                Z !== null &&
                Z.$$typeof === El &&
                Be(Z) === d.type))
          ? ((d = u(d, v.props)), $a(d, v), (d.return = m), d)
          : ((d = Vu(v.type, v.key, v.props, null, m.mode, A)),
            $a(d, v),
            (d.return = m),
            d);
    }
    function h(m, d, v, A) {
      return d === null ||
        d.tag !== 4 ||
        d.stateNode.containerInfo !== v.containerInfo ||
        d.stateNode.implementation !== v.implementation
        ? ((d = _c(v, m.mode, A)), (d.return = m), d)
        : ((d = u(d, v.children || [])), (d.return = m), d);
    }
    function E(m, d, v, A, Z) {
      return d === null || d.tag !== 7
        ? ((d = Re(v, m.mode, A, Z)), (d.return = m), d)
        : ((d = u(d, v)), (d.return = m), d);
    }
    function M(m, d, v) {
      if (
        (typeof d == "string" && d !== "") ||
        typeof d == "number" ||
        typeof d == "bigint"
      )
        return (d = Mc("" + d, m.mode, v)), (d.return = m), d;
      if (typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case W:
            return (
              (v = Vu(d.type, d.key, d.props, null, m.mode, v)),
              $a(v, d),
              (v.return = m),
              v
            );
          case sl:
            return (d = _c(d, m.mode, v)), (d.return = m), d;
          case El:
            return (d = Be(d)), M(m, d, v);
        }
        if ($l(d) || Ol(d))
          return (d = Re(d, m.mode, v, null)), (d.return = m), d;
        if (typeof d.then == "function") return M(m, Fu(d), v);
        if (d.$$typeof === pl) return M(m, wu(m, d), v);
        Iu(m, d);
      }
      return null;
    }
    function g(m, d, v, A) {
      var Z = d !== null ? d.key : null;
      if (
        (typeof v == "string" && v !== "") ||
        typeof v == "number" ||
        typeof v == "bigint"
      )
        return Z !== null ? null : i(m, d, "" + v, A);
      if (typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case W:
            return v.key === Z ? f(m, d, v, A) : null;
          case sl:
            return v.key === Z ? h(m, d, v, A) : null;
          case El:
            return (v = Be(v)), g(m, d, v, A);
        }
        if ($l(v) || Ol(v)) return Z !== null ? null : E(m, d, v, A, null);
        if (typeof v.then == "function") return g(m, d, Fu(v), A);
        if (v.$$typeof === pl) return g(m, d, wu(m, v), A);
        Iu(m, v);
      }
      return null;
    }
    function b(m, d, v, A, Z) {
      if (
        (typeof A == "string" && A !== "") ||
        typeof A == "number" ||
        typeof A == "bigint"
      )
        return (m = m.get(v) || null), i(d, m, "" + A, Z);
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case W:
            return (
              (m = m.get(A.key === null ? v : A.key) || null), f(d, m, A, Z)
            );
          case sl:
            return (
              (m = m.get(A.key === null ? v : A.key) || null), h(d, m, A, Z)
            );
          case El:
            return (A = Be(A)), b(m, d, v, A, Z);
        }
        if ($l(A) || Ol(A)) return (m = m.get(v) || null), E(d, m, A, Z, null);
        if (typeof A.then == "function") return b(m, d, v, Fu(A), Z);
        if (A.$$typeof === pl) return b(m, d, v, wu(d, A), Z);
        Iu(d, A);
      }
      return null;
    }
    function q(m, d, v, A) {
      for (
        var Z = null, cl = null, G = d, P = (d = 0), al = null;
        G !== null && P < v.length;
        P++
      ) {
        G.index > P ? ((al = G), (G = null)) : (al = G.sibling);
        var il = g(m, G, v[P], A);
        if (il === null) {
          G === null && (G = al);
          break;
        }
        l && G && il.alternate === null && t(m, G),
          (d = n(il, d, P)),
          cl === null ? (Z = il) : (cl.sibling = il),
          (cl = il),
          (G = al);
      }
      if (P === v.length) return e(m, G), ul && Yt(m, P), Z;
      if (G === null) {
        for (; P < v.length; P++)
          (G = M(m, v[P], A)),
            G !== null &&
              ((d = n(G, d, P)),
              cl === null ? (Z = G) : (cl.sibling = G),
              (cl = G));
        return ul && Yt(m, P), Z;
      }
      for (G = a(G); P < v.length; P++)
        (al = b(G, m, P, v[P], A)),
          al !== null &&
            (l &&
              al.alternate !== null &&
              G.delete(al.key === null ? P : al.key),
            (d = n(al, d, P)),
            cl === null ? (Z = al) : (cl.sibling = al),
            (cl = al));
      return (
        l &&
          G.forEach(function (ze) {
            return t(m, ze);
          }),
        ul && Yt(m, P),
        Z
      );
    }
    function V(m, d, v, A) {
      if (v == null) throw Error(o(151));
      for (
        var Z = null, cl = null, G = d, P = (d = 0), al = null, il = v.next();
        G !== null && !il.done;
        P++, il = v.next()
      ) {
        G.index > P ? ((al = G), (G = null)) : (al = G.sibling);
        var ze = g(m, G, il.value, A);
        if (ze === null) {
          G === null && (G = al);
          break;
        }
        l && G && ze.alternate === null && t(m, G),
          (d = n(ze, d, P)),
          cl === null ? (Z = ze) : (cl.sibling = ze),
          (cl = ze),
          (G = al);
      }
      if (il.done) return e(m, G), ul && Yt(m, P), Z;
      if (G === null) {
        for (; !il.done; P++, il = v.next())
          (il = M(m, il.value, A)),
            il !== null &&
              ((d = n(il, d, P)),
              cl === null ? (Z = il) : (cl.sibling = il),
              (cl = il));
        return ul && Yt(m, P), Z;
      }
      for (G = a(G); !il.done; P++, il = v.next())
        (il = b(G, m, P, il.value, A)),
          il !== null &&
            (l &&
              il.alternate !== null &&
              G.delete(il.key === null ? P : il.key),
            (d = n(il, d, P)),
            cl === null ? (Z = il) : (cl.sibling = il),
            (cl = il));
      return (
        l &&
          G.forEach(function (P0) {
            return t(m, P0);
          }),
        ul && Yt(m, P),
        Z
      );
    }
    function hl(m, d, v, A) {
      if (
        (typeof v == "object" &&
          v !== null &&
          v.type === ol &&
          v.key === null &&
          (v = v.props.children),
        typeof v == "object" && v !== null)
      ) {
        switch (v.$$typeof) {
          case W:
            l: {
              for (var Z = v.key; d !== null; ) {
                if (d.key === Z) {
                  if (((Z = v.type), Z === ol)) {
                    if (d.tag === 7) {
                      e(m, d.sibling),
                        (A = u(d, v.props.children)),
                        (A.return = m),
                        (m = A);
                      break l;
                    }
                  } else if (
                    d.elementType === Z ||
                    (typeof Z == "object" &&
                      Z !== null &&
                      Z.$$typeof === El &&
                      Be(Z) === d.type)
                  ) {
                    e(m, d.sibling),
                      (A = u(d, v.props)),
                      $a(A, v),
                      (A.return = m),
                      (m = A);
                    break l;
                  }
                  e(m, d);
                  break;
                } else t(m, d);
                d = d.sibling;
              }
              v.type === ol
                ? ((A = Re(v.props.children, m.mode, A, v.key)),
                  (A.return = m),
                  (m = A))
                : ((A = Vu(v.type, v.key, v.props, null, m.mode, A)),
                  $a(A, v),
                  (A.return = m),
                  (m = A));
            }
            return c(m);
          case sl:
            l: {
              for (Z = v.key; d !== null; ) {
                if (d.key === Z)
                  if (
                    d.tag === 4 &&
                    d.stateNode.containerInfo === v.containerInfo &&
                    d.stateNode.implementation === v.implementation
                  ) {
                    e(m, d.sibling),
                      (A = u(d, v.children || [])),
                      (A.return = m),
                      (m = A);
                    break l;
                  } else {
                    e(m, d);
                    break;
                  }
                else t(m, d);
                d = d.sibling;
              }
              (A = _c(v, m.mode, A)), (A.return = m), (m = A);
            }
            return c(m);
          case El:
            return (v = Be(v)), hl(m, d, v, A);
        }
        if ($l(v)) return q(m, d, v, A);
        if (Ol(v)) {
          if (((Z = Ol(v)), typeof Z != "function")) throw Error(o(150));
          return (v = Z.call(v)), V(m, d, v, A);
        }
        if (typeof v.then == "function") return hl(m, d, Fu(v), A);
        if (v.$$typeof === pl) return hl(m, d, wu(m, v), A);
        Iu(m, v);
      }
      return (typeof v == "string" && v !== "") ||
        typeof v == "number" ||
        typeof v == "bigint"
        ? ((v = "" + v),
          d !== null && d.tag === 6
            ? (e(m, d.sibling), (A = u(d, v)), (A.return = m), (m = A))
            : (e(m, d), (A = Mc(v, m.mode, A)), (A.return = m), (m = A)),
          c(m))
        : e(m, d);
    }
    return function (m, d, v, A) {
      try {
        Wa = 0;
        var Z = hl(m, d, v, A);
        return (oa = null), Z;
      } catch (G) {
        if (G === sa || G === $u) throw G;
        var cl = ot(29, G, null, m.mode);
        return (cl.lanes = A), (cl.return = m), cl;
      }
    };
  }
  var Ye = js(!0),
    xs = js(!1),
    ne = !1;
  function Yc(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Gc(l, t) {
    (l = l.updateQueue),
      t.updateQueue === l &&
        (t.updateQueue = {
          baseState: l.baseState,
          firstBaseUpdate: l.firstBaseUpdate,
          lastBaseUpdate: l.lastBaseUpdate,
          shared: l.shared,
          callbacks: null,
        });
  }
  function ce(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function ie(l, t, e) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (fl & 2) !== 0)) {
      var u = a.pending;
      return (
        u === null ? (t.next = t) : ((t.next = u.next), (u.next = t)),
        (a.pending = t),
        (t = Zu(l)),
        ys(l, null, e),
        t
      );
    }
    return Qu(l, a, t, e), Zu(l);
  }
  function ka(l, t, e) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (e & 4194048) !== 0))
    ) {
      var a = t.lanes;
      (a &= l.pendingLanes), (e |= a), (t.lanes = e), Af(l, e);
    }
  }
  function Lc(l, t) {
    var e = l.updateQueue,
      a = l.alternate;
    if (a !== null && ((a = a.updateQueue), e === a)) {
      var u = null,
        n = null;
      if (((e = e.firstBaseUpdate), e !== null)) {
        do {
          var c = {
            lane: e.lane,
            tag: e.tag,
            payload: e.payload,
            callback: null,
            next: null,
          };
          n === null ? (u = n = c) : (n = n.next = c), (e = e.next);
        } while (e !== null);
        n === null ? (u = n = t) : (n = n.next = t);
      } else u = n = t;
      (e = {
        baseState: a.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: n,
        shared: a.shared,
        callbacks: a.callbacks,
      }),
        (l.updateQueue = e);
      return;
    }
    (l = e.lastBaseUpdate),
      l === null ? (e.firstBaseUpdate = t) : (l.next = t),
      (e.lastBaseUpdate = t);
  }
  var Xc = !1;
  function Fa() {
    if (Xc) {
      var l = fa;
      if (l !== null) throw l;
    }
  }
  function Ia(l, t, e, a) {
    Xc = !1;
    var u = l.updateQueue;
    ne = !1;
    var n = u.firstBaseUpdate,
      c = u.lastBaseUpdate,
      i = u.shared.pending;
    if (i !== null) {
      u.shared.pending = null;
      var f = i,
        h = f.next;
      (f.next = null), c === null ? (n = h) : (c.next = h), (c = f);
      var E = l.alternate;
      E !== null &&
        ((E = E.updateQueue),
        (i = E.lastBaseUpdate),
        i !== c &&
          (i === null ? (E.firstBaseUpdate = h) : (i.next = h),
          (E.lastBaseUpdate = f)));
    }
    if (n !== null) {
      var M = u.baseState;
      (c = 0), (E = h = f = null), (i = n);
      do {
        var g = i.lane & -536870913,
          b = g !== i.lane;
        if (b ? (el & g) === g : (a & g) === g) {
          g !== 0 && g === ia && (Xc = !0),
            E !== null &&
              (E = E.next =
                {
                  lane: 0,
                  tag: i.tag,
                  payload: i.payload,
                  callback: null,
                  next: null,
                });
          l: {
            var q = l,
              V = i;
            g = t;
            var hl = e;
            switch (V.tag) {
              case 1:
                if (((q = V.payload), typeof q == "function")) {
                  M = q.call(hl, M, g);
                  break l;
                }
                M = q;
                break l;
              case 3:
                q.flags = (q.flags & -65537) | 128;
              case 0:
                if (
                  ((q = V.payload),
                  (g = typeof q == "function" ? q.call(hl, M, g) : q),
                  g == null)
                )
                  break l;
                M = O({}, M, g);
                break l;
              case 2:
                ne = !0;
            }
          }
          (g = i.callback),
            g !== null &&
              ((l.flags |= 64),
              b && (l.flags |= 8192),
              (b = u.callbacks),
              b === null ? (u.callbacks = [g]) : b.push(g));
        } else
          (b = {
            lane: g,
            tag: i.tag,
            payload: i.payload,
            callback: i.callback,
            next: null,
          }),
            E === null ? ((h = E = b), (f = M)) : (E = E.next = b),
            (c |= g);
        if (((i = i.next), i === null)) {
          if (((i = u.shared.pending), i === null)) break;
          (b = i),
            (i = b.next),
            (b.next = null),
            (u.lastBaseUpdate = b),
            (u.shared.pending = null);
        }
      } while (!0);
      E === null && (f = M),
        (u.baseState = f),
        (u.firstBaseUpdate = h),
        (u.lastBaseUpdate = E),
        n === null && (u.shared.lanes = 0),
        (re |= c),
        (l.lanes = c),
        (l.memoizedState = M);
    }
  }
  function Hs(l, t) {
    if (typeof l != "function") throw Error(o(191, l));
    l.call(t);
  }
  function Cs(l, t) {
    var e = l.callbacks;
    if (e !== null)
      for (l.callbacks = null, l = 0; l < e.length; l++) Hs(e[l], t);
  }
  var da = s(null),
    Pu = s(0);
  function Bs(l, t) {
    (l = $t), x(Pu, l), x(da, t), ($t = l | t.baseLanes);
  }
  function Qc() {
    x(Pu, $t), x(da, da.current);
  }
  function Zc() {
    ($t = Pu.current), z(da), z(Pu);
  }
  var dt = s(null),
    Tt = null;
  function fe(l) {
    var t = l.alternate;
    x(_l, _l.current & 1),
      x(dt, l),
      Tt === null &&
        (t === null || da.current !== null || t.memoizedState !== null) &&
        (Tt = l);
  }
  function Vc(l) {
    x(_l, _l.current), x(dt, l), Tt === null && (Tt = l);
  }
  function qs(l) {
    l.tag === 22
      ? (x(_l, _l.current), x(dt, l), Tt === null && (Tt = l))
      : se();
  }
  function se() {
    x(_l, _l.current), x(dt, dt.current);
  }
  function rt(l) {
    z(dt), Tt === l && (Tt = null), z(_l);
  }
  var _l = s(0);
  function ln(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (e !== null && ((e = e.dehydrated), e === null || ki(e) || Fi(e)))
          return t;
      } else if (
        t.tag === 19 &&
        (t.memoizedProps.revealOrder === "forwards" ||
          t.memoizedProps.revealOrder === "backwards" ||
          t.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          t.memoizedProps.revealOrder === "together")
      ) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        (t.child.return = t), (t = t.child);
        continue;
      }
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return null;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
  }
  var Xt = 0,
    I = null,
    ml = null,
    Rl = null,
    tn = !1,
    ra = !1,
    Ge = !1,
    en = 0,
    Pa = 0,
    ma = null,
    Zm = 0;
  function Al() {
    throw Error(o(321));
  }
  function Kc(l, t) {
    if (t === null) return !1;
    for (var e = 0; e < t.length && e < l.length; e++)
      if (!st(l[e], t[e])) return !1;
    return !0;
  }
  function Jc(l, t, e, a, u, n) {
    return (
      (Xt = n),
      (I = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (r.H = l === null || l.memoizedState === null ? Eo : ii),
      (Ge = !1),
      (n = e(a, u)),
      (Ge = !1),
      ra && (n = Gs(t, e, a, u)),
      Ys(l),
      n
    );
  }
  function Ys(l) {
    r.H = eu;
    var t = ml !== null && ml.next !== null;
    if (((Xt = 0), (Rl = ml = I = null), (tn = !1), (Pa = 0), (ma = null), t))
      throw Error(o(300));
    l === null ||
      jl ||
      ((l = l.dependencies), l !== null && Ju(l) && (jl = !0));
  }
  function Gs(l, t, e, a) {
    I = l;
    var u = 0;
    do {
      if ((ra && (ma = null), (Pa = 0), (ra = !1), 25 <= u))
        throw Error(o(301));
      if (((u += 1), (Rl = ml = null), l.updateQueue != null)) {
        var n = l.updateQueue;
        (n.lastEffect = null),
          (n.events = null),
          (n.stores = null),
          n.memoCache != null && (n.memoCache.index = 0);
      }
      (r.H = zo), (n = t(e, a));
    } while (ra);
    return n;
  }
  function Vm() {
    var l = r.H,
      t = l.useState()[0];
    return (
      (t = typeof t.then == "function" ? lu(t) : t),
      (l = l.useState()[0]),
      (ml !== null ? ml.memoizedState : null) !== l && (I.flags |= 1024),
      t
    );
  }
  function wc() {
    var l = en !== 0;
    return (en = 0), l;
  }
  function Wc(l, t, e) {
    (t.updateQueue = l.updateQueue), (t.flags &= -2053), (l.lanes &= ~e);
  }
  function $c(l) {
    if (tn) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), (l = l.next);
      }
      tn = !1;
    }
    (Xt = 0), (Rl = ml = I = null), (ra = !1), (Pa = en = 0), (ma = null);
  }
  function kl() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return Rl === null ? (I.memoizedState = Rl = l) : (Rl = Rl.next = l), Rl;
  }
  function Dl() {
    if (ml === null) {
      var l = I.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = ml.next;
    var t = Rl === null ? I.memoizedState : Rl.next;
    if (t !== null) (Rl = t), (ml = l);
    else {
      if (l === null)
        throw I.alternate === null ? Error(o(467)) : Error(o(310));
      (ml = l),
        (l = {
          memoizedState: ml.memoizedState,
          baseState: ml.baseState,
          baseQueue: ml.baseQueue,
          queue: ml.queue,
          next: null,
        }),
        Rl === null ? (I.memoizedState = Rl = l) : (Rl = Rl.next = l);
    }
    return Rl;
  }
  function an() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function lu(l) {
    var t = Pa;
    return (
      (Pa += 1),
      ma === null && (ma = []),
      (l = Us(ma, l, t)),
      (t = I),
      (Rl === null ? t.memoizedState : Rl.next) === null &&
        ((t = t.alternate),
        (r.H = t === null || t.memoizedState === null ? Eo : ii)),
      l
    );
  }
  function un(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return lu(l);
      if (l.$$typeof === pl) return Xl(l);
    }
    throw Error(o(438, String(l)));
  }
  function kc(l) {
    var t = null,
      e = I.updateQueue;
    if ((e !== null && (t = e.memoCache), t == null)) {
      var a = I.alternate;
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (t = {
              data: a.data.map(function (u) {
                return u.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      e === null && ((e = an()), (I.updateQueue = e)),
      (e.memoCache = t),
      (e = t.data[t.index]),
      e === void 0)
    )
      for (e = t.data[t.index] = Array(l), a = 0; a < l; a++) e[a] = _t;
    return t.index++, e;
  }
  function Qt(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function nn(l) {
    var t = Dl();
    return Fc(t, ml, l);
  }
  function Fc(l, t, e) {
    var a = l.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = e;
    var u = l.baseQueue,
      n = a.pending;
    if (n !== null) {
      if (u !== null) {
        var c = u.next;
        (u.next = n.next), (n.next = c);
      }
      (t.baseQueue = u = n), (a.pending = null);
    }
    if (((n = l.baseState), u === null)) l.memoizedState = n;
    else {
      t = u.next;
      var i = (c = null),
        f = null,
        h = t,
        E = !1;
      do {
        var M = h.lane & -536870913;
        if (M !== h.lane ? (el & M) === M : (Xt & M) === M) {
          var g = h.revertLane;
          if (g === 0)
            f !== null &&
              (f = f.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: h.action,
                  hasEagerState: h.hasEagerState,
                  eagerState: h.eagerState,
                  next: null,
                }),
              M === ia && (E = !0);
          else if ((Xt & g) === g) {
            (h = h.next), g === ia && (E = !0);
            continue;
          } else
            (M = {
              lane: 0,
              revertLane: h.revertLane,
              gesture: null,
              action: h.action,
              hasEagerState: h.hasEagerState,
              eagerState: h.eagerState,
              next: null,
            }),
              f === null ? ((i = f = M), (c = n)) : (f = f.next = M),
              (I.lanes |= g),
              (re |= g);
          (M = h.action),
            Ge && e(n, M),
            (n = h.hasEagerState ? h.eagerState : e(n, M));
        } else
          (g = {
            lane: M,
            revertLane: h.revertLane,
            gesture: h.gesture,
            action: h.action,
            hasEagerState: h.hasEagerState,
            eagerState: h.eagerState,
            next: null,
          }),
            f === null ? ((i = f = g), (c = n)) : (f = f.next = g),
            (I.lanes |= M),
            (re |= M);
        h = h.next;
      } while (h !== null && h !== t);
      if (
        (f === null ? (c = n) : (f.next = i),
        !st(n, l.memoizedState) && ((jl = !0), E && ((e = fa), e !== null)))
      )
        throw e;
      (l.memoizedState = n),
        (l.baseState = c),
        (l.baseQueue = f),
        (a.lastRenderedState = n);
    }
    return u === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function Ic(l) {
    var t = Dl(),
      e = t.queue;
    if (e === null) throw Error(o(311));
    e.lastRenderedReducer = l;
    var a = e.dispatch,
      u = e.pending,
      n = t.memoizedState;
    if (u !== null) {
      e.pending = null;
      var c = (u = u.next);
      do (n = l(n, c.action)), (c = c.next);
      while (c !== u);
      st(n, t.memoizedState) || (jl = !0),
        (t.memoizedState = n),
        t.baseQueue === null && (t.baseState = n),
        (e.lastRenderedState = n);
    }
    return [n, a];
  }
  function Ls(l, t, e) {
    var a = I,
      u = Dl(),
      n = ul;
    if (n) {
      if (e === void 0) throw Error(o(407));
      e = e();
    } else e = t();
    var c = !st((ml || u).memoizedState, e);
    if (
      (c && ((u.memoizedState = e), (jl = !0)),
      (u = u.queue),
      ti(Zs.bind(null, a, u, l), [l]),
      u.getSnapshot !== t || c || (Rl !== null && Rl.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        va(9, { destroy: void 0 }, Qs.bind(null, a, u, e, t), null),
        yl === null)
      )
        throw Error(o(349));
      n || (Xt & 127) !== 0 || Xs(a, t, e);
    }
    return e;
  }
  function Xs(l, t, e) {
    (l.flags |= 16384),
      (l = { getSnapshot: t, value: e }),
      (t = I.updateQueue),
      t === null
        ? ((t = an()), (I.updateQueue = t), (t.stores = [l]))
        : ((e = t.stores), e === null ? (t.stores = [l]) : e.push(l));
  }
  function Qs(l, t, e, a) {
    (t.value = e), (t.getSnapshot = a), Vs(t) && Ks(l);
  }
  function Zs(l, t, e) {
    return e(function () {
      Vs(t) && Ks(l);
    });
  }
  function Vs(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var e = t();
      return !st(l, e);
    } catch {
      return !0;
    }
  }
  function Ks(l) {
    var t = Ne(l, 2);
    t !== null && ut(t, l, 2);
  }
  function Pc(l) {
    var t = kl();
    if (typeof l == "function") {
      var e = l;
      if (((l = e()), Ge)) {
        It(!0);
        try {
          e();
        } finally {
          It(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = l),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Qt,
        lastRenderedState: l,
      }),
      t
    );
  }
  function Js(l, t, e, a) {
    return (l.baseState = e), Fc(l, ml, typeof a == "function" ? a : Qt);
  }
  function Km(l, t, e, a, u) {
    if (sn(l)) throw Error(o(485));
    if (((l = t.action), l !== null)) {
      var n = {
        payload: u,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (c) {
          n.listeners.push(c);
        },
      };
      r.T !== null ? e(!0) : (n.isTransition = !1),
        a(n),
        (e = t.pending),
        e === null
          ? ((n.next = t.pending = n), ws(t, n))
          : ((n.next = e.next), (t.pending = e.next = n));
    }
  }
  function ws(l, t) {
    var e = t.action,
      a = t.payload,
      u = l.state;
    if (t.isTransition) {
      var n = r.T,
        c = {};
      r.T = c;
      try {
        var i = e(u, a),
          f = r.S;
        f !== null && f(c, i), Ws(l, t, i);
      } catch (h) {
        li(l, t, h);
      } finally {
        n !== null && c.types !== null && (n.types = c.types), (r.T = n);
      }
    } else
      try {
        (n = e(u, a)), Ws(l, t, n);
      } catch (h) {
        li(l, t, h);
      }
  }
  function Ws(l, t, e) {
    e !== null && typeof e == "object" && typeof e.then == "function"
      ? e.then(
          function (a) {
            $s(l, t, a);
          },
          function (a) {
            return li(l, t, a);
          }
        )
      : $s(l, t, e);
  }
  function $s(l, t, e) {
    (t.status = "fulfilled"),
      (t.value = e),
      ks(t),
      (l.state = e),
      (t = l.pending),
      t !== null &&
        ((e = t.next),
        e === t ? (l.pending = null) : ((e = e.next), (t.next = e), ws(l, e)));
  }
  function li(l, t, e) {
    var a = l.pending;
    if (((l.pending = null), a !== null)) {
      a = a.next;
      do (t.status = "rejected"), (t.reason = e), ks(t), (t = t.next);
      while (t !== a);
    }
    l.action = null;
  }
  function ks(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function Fs(l, t) {
    return t;
  }
  function Is(l, t) {
    if (ul) {
      var e = yl.formState;
      if (e !== null) {
        l: {
          var a = I;
          if (ul) {
            if (gl) {
              t: {
                for (var u = gl, n = zt; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break t;
                  }
                  if (((u = At(u.nextSibling)), u === null)) {
                    u = null;
                    break t;
                  }
                }
                (n = u.data), (u = n === "F!" || n === "F" ? u : null);
              }
              if (u) {
                (gl = At(u.nextSibling)), (a = u.data === "F!");
                break l;
              }
            }
            ae(a);
          }
          a = !1;
        }
        a && (t = e[0]);
      }
    }
    return (
      (e = kl()),
      (e.memoizedState = e.baseState = t),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Fs,
        lastRenderedState: t,
      }),
      (e.queue = a),
      (e = So.bind(null, I, a)),
      (a.dispatch = e),
      (a = Pc(!1)),
      (n = ci.bind(null, I, !1, a.queue)),
      (a = kl()),
      (u = { state: t, dispatch: null, action: l, pending: null }),
      (a.queue = u),
      (e = Km.bind(null, I, u, n, e)),
      (u.dispatch = e),
      (a.memoizedState = l),
      [t, e, !1]
    );
  }
  function Ps(l) {
    var t = Dl();
    return lo(t, ml, l);
  }
  function lo(l, t, e) {
    if (
      ((t = Fc(l, t, Fs)[0]),
      (l = nn(Qt)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var a = lu(t);
      } catch (c) {
        throw c === sa ? $u : c;
      }
    else a = t;
    t = Dl();
    var u = t.queue,
      n = u.dispatch;
    return (
      e !== t.memoizedState &&
        ((I.flags |= 2048),
        va(9, { destroy: void 0 }, Jm.bind(null, u, e), null)),
      [a, n, l]
    );
  }
  function Jm(l, t) {
    l.action = t;
  }
  function to(l) {
    var t = Dl(),
      e = ml;
    if (e !== null) return lo(t, e, l);
    Dl(), (t = t.memoizedState), (e = Dl());
    var a = e.queue.dispatch;
    return (e.memoizedState = l), [t, a, !1];
  }
  function va(l, t, e, a) {
    return (
      (l = { tag: l, create: e, deps: a, inst: t, next: null }),
      (t = I.updateQueue),
      t === null && ((t = an()), (I.updateQueue = t)),
      (e = t.lastEffect),
      e === null
        ? (t.lastEffect = l.next = l)
        : ((a = e.next), (e.next = l), (l.next = a), (t.lastEffect = l)),
      l
    );
  }
  function eo() {
    return Dl().memoizedState;
  }
  function cn(l, t, e, a) {
    var u = kl();
    (I.flags |= l),
      (u.memoizedState = va(
        1 | t,
        { destroy: void 0 },
        e,
        a === void 0 ? null : a
      ));
  }
  function fn(l, t, e, a) {
    var u = Dl();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    ml !== null && a !== null && Kc(a, ml.memoizedState.deps)
      ? (u.memoizedState = va(t, n, e, a))
      : ((I.flags |= l), (u.memoizedState = va(1 | t, n, e, a)));
  }
  function ao(l, t) {
    cn(8390656, 8, l, t);
  }
  function ti(l, t) {
    fn(2048, 8, l, t);
  }
  function wm(l) {
    I.flags |= 4;
    var t = I.updateQueue;
    if (t === null) (t = an()), (I.updateQueue = t), (t.events = [l]);
    else {
      var e = t.events;
      e === null ? (t.events = [l]) : e.push(l);
    }
  }
  function uo(l) {
    var t = Dl().memoizedState;
    return (
      wm({ ref: t, nextImpl: l }),
      function () {
        if ((fl & 2) !== 0) throw Error(o(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function no(l, t) {
    return fn(4, 2, l, t);
  }
  function co(l, t) {
    return fn(4, 4, l, t);
  }
  function io(l, t) {
    if (typeof t == "function") {
      l = l();
      var e = t(l);
      return function () {
        typeof e == "function" ? e() : t(null);
      };
    }
    if (t != null)
      return (
        (l = l()),
        (t.current = l),
        function () {
          t.current = null;
        }
      );
  }
  function fo(l, t, e) {
    (e = e != null ? e.concat([l]) : null), fn(4, 4, io.bind(null, t, l), e);
  }
  function ei() {}
  function so(l, t) {
    var e = Dl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    return t !== null && Kc(t, a[1]) ? a[0] : ((e.memoizedState = [l, t]), l);
  }
  function oo(l, t) {
    var e = Dl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    if (t !== null && Kc(t, a[1])) return a[0];
    if (((a = l()), Ge)) {
      It(!0);
      try {
        l();
      } finally {
        It(!1);
      }
    }
    return (e.memoizedState = [a, t]), a;
  }
  function ai(l, t, e) {
    return e === void 0 || ((Xt & 1073741824) !== 0 && (el & 261930) === 0)
      ? (l.memoizedState = t)
      : ((l.memoizedState = e), (l = rd()), (I.lanes |= l), (re |= l), e);
  }
  function ro(l, t, e, a) {
    return st(e, t)
      ? e
      : da.current !== null
        ? ((l = ai(l, e, a)), st(l, t) || (jl = !0), l)
        : (Xt & 42) === 0 || ((Xt & 1073741824) !== 0 && (el & 261930) === 0)
          ? ((jl = !0), (l.memoizedState = e))
          : ((l = rd()), (I.lanes |= l), (re |= l), t);
  }
  function mo(l, t, e, a, u) {
    var n = p.p;
    p.p = n !== 0 && 8 > n ? n : 8;
    var c = r.T,
      i = {};
    (r.T = i), ci(l, !1, t, e);
    try {
      var f = u(),
        h = r.S;
      if (
        (h !== null && h(i, f),
        f !== null && typeof f == "object" && typeof f.then == "function")
      ) {
        var E = Qm(f, a);
        tu(l, t, E, ht(l));
      } else tu(l, t, a, ht(l));
    } catch (M) {
      tu(l, t, { then: function () {}, status: "rejected", reason: M }, ht());
    } finally {
      (p.p = n),
        c !== null && i.types !== null && (c.types = i.types),
        (r.T = c);
    }
  }
  function Wm() {}
  function ui(l, t, e, a) {
    if (l.tag !== 5) throw Error(o(476));
    var u = vo(l).queue;
    mo(
      l,
      u,
      t,
      N,
      e === null
        ? Wm
        : function () {
            return ho(l), e(a);
          }
    );
  }
  function vo(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: N,
      baseState: N,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Qt,
        lastRenderedState: N,
      },
      next: null,
    };
    var e = {};
    return (
      (t.next = {
        memoizedState: e,
        baseState: e,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Qt,
          lastRenderedState: e,
        },
        next: null,
      }),
      (l.memoizedState = t),
      (l = l.alternate),
      l !== null && (l.memoizedState = t),
      t
    );
  }
  function ho(l) {
    var t = vo(l);
    t.next === null && (t = l.alternate.memoizedState),
      tu(l, t.next.queue, {}, ht());
  }
  function ni() {
    return Xl(Su);
  }
  function yo() {
    return Dl().memoizedState;
  }
  function go() {
    return Dl().memoizedState;
  }
  function $m(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var e = ht();
          l = ce(e);
          var a = ie(t, l, e);
          a !== null && (ut(a, t, e), ka(a, t, e)),
            (t = { cache: Hc() }),
            (l.payload = t);
          return;
      }
      t = t.return;
    }
  }
  function km(l, t, e) {
    var a = ht();
    (e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      sn(l)
        ? bo(t, e)
        : ((e = Tc(l, t, e, a)), e !== null && (ut(e, l, a), po(e, t, a)));
  }
  function So(l, t, e) {
    var a = ht();
    tu(l, t, e, a);
  }
  function tu(l, t, e, a) {
    var u = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (sn(l)) bo(t, u);
    else {
      var n = l.alternate;
      if (
        l.lanes === 0 &&
        (n === null || n.lanes === 0) &&
        ((n = t.lastRenderedReducer), n !== null)
      )
        try {
          var c = t.lastRenderedState,
            i = n(c, e);
          if (((u.hasEagerState = !0), (u.eagerState = i), st(i, c)))
            return Qu(l, t, u, 0), yl === null && Xu(), !1;
        } catch {}
      if (((e = Tc(l, t, u, a)), e !== null))
        return ut(e, l, a), po(e, t, a), !0;
    }
    return !1;
  }
  function ci(l, t, e, a) {
    if (
      ((a = {
        lane: 2,
        revertLane: Yi(),
        gesture: null,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      sn(l))
    ) {
      if (t) throw Error(o(479));
    } else (t = Tc(l, e, a, 2)), t !== null && ut(t, l, 2);
  }
  function sn(l) {
    var t = l.alternate;
    return l === I || (t !== null && t === I);
  }
  function bo(l, t) {
    ra = tn = !0;
    var e = l.pending;
    e === null ? (t.next = t) : ((t.next = e.next), (e.next = t)),
      (l.pending = t);
  }
  function po(l, t, e) {
    if ((e & 4194048) !== 0) {
      var a = t.lanes;
      (a &= l.pendingLanes), (e |= a), (t.lanes = e), Af(l, e);
    }
  }
  var eu = {
    readContext: Xl,
    use: un,
    useCallback: Al,
    useContext: Al,
    useEffect: Al,
    useImperativeHandle: Al,
    useLayoutEffect: Al,
    useInsertionEffect: Al,
    useMemo: Al,
    useReducer: Al,
    useRef: Al,
    useState: Al,
    useDebugValue: Al,
    useDeferredValue: Al,
    useTransition: Al,
    useSyncExternalStore: Al,
    useId: Al,
    useHostTransitionStatus: Al,
    useFormState: Al,
    useActionState: Al,
    useOptimistic: Al,
    useMemoCache: Al,
    useCacheRefresh: Al,
  };
  eu.useEffectEvent = Al;
  var Eo = {
      readContext: Xl,
      use: un,
      useCallback: function (l, t) {
        return (kl().memoizedState = [l, t === void 0 ? null : t]), l;
      },
      useContext: Xl,
      useEffect: ao,
      useImperativeHandle: function (l, t, e) {
        (e = e != null ? e.concat([l]) : null),
          cn(4194308, 4, io.bind(null, t, l), e);
      },
      useLayoutEffect: function (l, t) {
        return cn(4194308, 4, l, t);
      },
      useInsertionEffect: function (l, t) {
        cn(4, 2, l, t);
      },
      useMemo: function (l, t) {
        var e = kl();
        t = t === void 0 ? null : t;
        var a = l();
        if (Ge) {
          It(!0);
          try {
            l();
          } finally {
            It(!1);
          }
        }
        return (e.memoizedState = [a, t]), a;
      },
      useReducer: function (l, t, e) {
        var a = kl();
        if (e !== void 0) {
          var u = e(t);
          if (Ge) {
            It(!0);
            try {
              e(t);
            } finally {
              It(!1);
            }
          }
        } else u = t;
        return (
          (a.memoizedState = a.baseState = u),
          (l = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: l,
            lastRenderedState: u,
          }),
          (a.queue = l),
          (l = l.dispatch = km.bind(null, I, l)),
          [a.memoizedState, l]
        );
      },
      useRef: function (l) {
        var t = kl();
        return (l = { current: l }), (t.memoizedState = l);
      },
      useState: function (l) {
        l = Pc(l);
        var t = l.queue,
          e = So.bind(null, I, t);
        return (t.dispatch = e), [l.memoizedState, e];
      },
      useDebugValue: ei,
      useDeferredValue: function (l, t) {
        var e = kl();
        return ai(e, l, t);
      },
      useTransition: function () {
        var l = Pc(!1);
        return (
          (l = mo.bind(null, I, l.queue, !0, !1)),
          (kl().memoizedState = l),
          [!1, l]
        );
      },
      useSyncExternalStore: function (l, t, e) {
        var a = I,
          u = kl();
        if (ul) {
          if (e === void 0) throw Error(o(407));
          e = e();
        } else {
          if (((e = t()), yl === null)) throw Error(o(349));
          (el & 127) !== 0 || Xs(a, t, e);
        }
        u.memoizedState = e;
        var n = { value: e, getSnapshot: t };
        return (
          (u.queue = n),
          ao(Zs.bind(null, a, n, l), [l]),
          (a.flags |= 2048),
          va(9, { destroy: void 0 }, Qs.bind(null, a, n, e, t), null),
          e
        );
      },
      useId: function () {
        var l = kl(),
          t = yl.identifierPrefix;
        if (ul) {
          var e = Rt,
            a = Nt;
          (e = (a & ~(1 << (32 - ft(a) - 1))).toString(32) + e),
            (t = "_" + t + "R_" + e),
            (e = en++),
            0 < e && (t += "H" + e.toString(32)),
            (t += "_");
        } else (e = Zm++), (t = "_" + t + "r_" + e.toString(32) + "_");
        return (l.memoizedState = t);
      },
      useHostTransitionStatus: ni,
      useFormState: Is,
      useActionState: Is,
      useOptimistic: function (l) {
        var t = kl();
        t.memoizedState = t.baseState = l;
        var e = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = e), (t = ci.bind(null, I, !0, e)), (e.dispatch = t), [l, t]
        );
      },
      useMemoCache: kc,
      useCacheRefresh: function () {
        return (kl().memoizedState = $m.bind(null, I));
      },
      useEffectEvent: function (l) {
        var t = kl(),
          e = { impl: l };
        return (
          (t.memoizedState = e),
          function () {
            if ((fl & 2) !== 0) throw Error(o(440));
            return e.impl.apply(void 0, arguments);
          }
        );
      },
    },
    ii = {
      readContext: Xl,
      use: un,
      useCallback: so,
      useContext: Xl,
      useEffect: ti,
      useImperativeHandle: fo,
      useInsertionEffect: no,
      useLayoutEffect: co,
      useMemo: oo,
      useReducer: nn,
      useRef: eo,
      useState: function () {
        return nn(Qt);
      },
      useDebugValue: ei,
      useDeferredValue: function (l, t) {
        var e = Dl();
        return ro(e, ml.memoizedState, l, t);
      },
      useTransition: function () {
        var l = nn(Qt)[0],
          t = Dl().memoizedState;
        return [typeof l == "boolean" ? l : lu(l), t];
      },
      useSyncExternalStore: Ls,
      useId: yo,
      useHostTransitionStatus: ni,
      useFormState: Ps,
      useActionState: Ps,
      useOptimistic: function (l, t) {
        var e = Dl();
        return Js(e, ml, l, t);
      },
      useMemoCache: kc,
      useCacheRefresh: go,
    };
  ii.useEffectEvent = uo;
  var zo = {
    readContext: Xl,
    use: un,
    useCallback: so,
    useContext: Xl,
    useEffect: ti,
    useImperativeHandle: fo,
    useInsertionEffect: no,
    useLayoutEffect: co,
    useMemo: oo,
    useReducer: Ic,
    useRef: eo,
    useState: function () {
      return Ic(Qt);
    },
    useDebugValue: ei,
    useDeferredValue: function (l, t) {
      var e = Dl();
      return ml === null ? ai(e, l, t) : ro(e, ml.memoizedState, l, t);
    },
    useTransition: function () {
      var l = Ic(Qt)[0],
        t = Dl().memoizedState;
      return [typeof l == "boolean" ? l : lu(l), t];
    },
    useSyncExternalStore: Ls,
    useId: yo,
    useHostTransitionStatus: ni,
    useFormState: to,
    useActionState: to,
    useOptimistic: function (l, t) {
      var e = Dl();
      return ml !== null
        ? Js(e, ml, l, t)
        : ((e.baseState = l), [l, e.queue.dispatch]);
    },
    useMemoCache: kc,
    useCacheRefresh: go,
  };
  zo.useEffectEvent = uo;
  function fi(l, t, e, a) {
    (t = l.memoizedState),
      (e = e(a, t)),
      (e = e == null ? t : O({}, t, e)),
      (l.memoizedState = e),
      l.lanes === 0 && (l.updateQueue.baseState = e);
  }
  var si = {
    enqueueSetState: function (l, t, e) {
      l = l._reactInternals;
      var a = ht(),
        u = ce(a);
      (u.payload = t),
        e != null && (u.callback = e),
        (t = ie(l, u, a)),
        t !== null && (ut(t, l, a), ka(t, l, a));
    },
    enqueueReplaceState: function (l, t, e) {
      l = l._reactInternals;
      var a = ht(),
        u = ce(a);
      (u.tag = 1),
        (u.payload = t),
        e != null && (u.callback = e),
        (t = ie(l, u, a)),
        t !== null && (ut(t, l, a), ka(t, l, a));
    },
    enqueueForceUpdate: function (l, t) {
      l = l._reactInternals;
      var e = ht(),
        a = ce(e);
      (a.tag = 2),
        t != null && (a.callback = t),
        (t = ie(l, a, e)),
        t !== null && (ut(t, l, e), ka(t, l, e));
    },
  };
  function To(l, t, e, a, u, n, c) {
    return (
      (l = l.stateNode),
      typeof l.shouldComponentUpdate == "function"
        ? l.shouldComponentUpdate(a, n, c)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Qa(e, a) || !Qa(u, n)
          : !0
    );
  }
  function Ao(l, t, e, a) {
    (l = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(e, a),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(e, a),
      t.state !== l && si.enqueueReplaceState(t, t.state, null);
  }
  function Le(l, t) {
    var e = t;
    if ("ref" in t) {
      e = {};
      for (var a in t) a !== "ref" && (e[a] = t[a]);
    }
    if ((l = l.defaultProps)) {
      e === t && (e = O({}, e));
      for (var u in l) e[u] === void 0 && (e[u] = l[u]);
    }
    return e;
  }
  function Mo(l) {
    Lu(l);
  }
  function _o(l) {
    console.error(l);
  }
  function Do(l) {
    Lu(l);
  }
  function on(l, t) {
    try {
      var e = l.onUncaughtError;
      e(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function Oo(l, t, e) {
    try {
      var a = l.onCaughtError;
      a(e.value, {
        componentStack: e.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function oi(l, t, e) {
    return (
      (e = ce(e)),
      (e.tag = 3),
      (e.payload = { element: null }),
      (e.callback = function () {
        on(l, t);
      }),
      e
    );
  }
  function Uo(l) {
    return (l = ce(l)), (l.tag = 3), l;
  }
  function No(l, t, e, a) {
    var u = e.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = a.value;
      (l.payload = function () {
        return u(n);
      }),
        (l.callback = function () {
          Oo(t, e, a);
        });
    }
    var c = e.stateNode;
    c !== null &&
      typeof c.componentDidCatch == "function" &&
      (l.callback = function () {
        Oo(t, e, a),
          typeof u != "function" &&
            (me === null ? (me = new Set([this])) : me.add(this));
        var i = a.stack;
        this.componentDidCatch(a.value, {
          componentStack: i !== null ? i : "",
        });
      });
  }
  function Fm(l, t, e, a, u) {
    if (
      ((e.flags |= 32768),
      a !== null && typeof a == "object" && typeof a.then == "function")
    ) {
      if (
        ((t = e.alternate),
        t !== null && ca(t, e, u, !0),
        (e = dt.current),
        e !== null)
      ) {
        switch (e.tag) {
          case 31:
          case 13:
            return (
              Tt === null ? zn() : e.alternate === null && Ml === 0 && (Ml = 3),
              (e.flags &= -257),
              (e.flags |= 65536),
              (e.lanes = u),
              a === ku
                ? (e.flags |= 16384)
                : ((t = e.updateQueue),
                  t === null ? (e.updateQueue = new Set([a])) : t.add(a),
                  Ci(l, a, u)),
              !1
            );
          case 22:
            return (
              (e.flags |= 65536),
              a === ku
                ? (e.flags |= 16384)
                : ((t = e.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([a]),
                      }),
                      (e.updateQueue = t))
                    : ((e = t.retryQueue),
                      e === null ? (t.retryQueue = new Set([a])) : e.add(a)),
                  Ci(l, a, u)),
              !1
            );
        }
        throw Error(o(435, e.tag));
      }
      return Ci(l, a, u), zn(), !1;
    }
    if (ul)
      return (
        (t = dt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = u),
            a !== Uc && ((l = Error(o(422), { cause: a })), Ka(bt(l, e))))
          : (a !== Uc && ((t = Error(o(423), { cause: a })), Ka(bt(t, e))),
            (l = l.current.alternate),
            (l.flags |= 65536),
            (u &= -u),
            (l.lanes |= u),
            (a = bt(a, e)),
            (u = oi(l.stateNode, a, u)),
            Lc(l, u),
            Ml !== 4 && (Ml = 2)),
        !1
      );
    var n = Error(o(520), { cause: a });
    if (
      ((n = bt(n, e)),
      ou === null ? (ou = [n]) : ou.push(n),
      Ml !== 4 && (Ml = 2),
      t === null)
    )
      return !0;
    (a = bt(a, e)), (e = t);
    do {
      switch (e.tag) {
        case 3:
          return (
            (e.flags |= 65536),
            (l = u & -u),
            (e.lanes |= l),
            (l = oi(e.stateNode, a, l)),
            Lc(e, l),
            !1
          );
        case 1:
          if (
            ((t = e.type),
            (n = e.stateNode),
            (e.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (n !== null &&
                  typeof n.componentDidCatch == "function" &&
                  (me === null || !me.has(n)))))
          )
            return (
              (e.flags |= 65536),
              (u &= -u),
              (e.lanes |= u),
              (u = Uo(u)),
              No(u, l, e, a),
              Lc(e, u),
              !1
            );
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var di = Error(o(461)),
    jl = !1;
  function Ql(l, t, e, a) {
    t.child = l === null ? xs(t, null, e, a) : Ye(t, l.child, e, a);
  }
  function Ro(l, t, e, a, u) {
    e = e.render;
    var n = t.ref;
    if ("ref" in a) {
      var c = {};
      for (var i in a) i !== "ref" && (c[i] = a[i]);
    } else c = a;
    return (
      He(t),
      (a = Jc(l, t, e, c, n, u)),
      (i = wc()),
      l !== null && !jl
        ? (Wc(l, t, u), Zt(l, t, u))
        : (ul && i && Dc(t), (t.flags |= 1), Ql(l, t, a, u), t.child)
    );
  }
  function jo(l, t, e, a, u) {
    if (l === null) {
      var n = e.type;
      return typeof n == "function" &&
        !Ac(n) &&
        n.defaultProps === void 0 &&
        e.compare === null
        ? ((t.tag = 15), (t.type = n), xo(l, t, n, a, u))
        : ((l = Vu(e.type, null, a, t, t.mode, u)),
          (l.ref = t.ref),
          (l.return = t),
          (t.child = l));
    }
    if (((n = l.child), !bi(l, u))) {
      var c = n.memoizedProps;
      if (
        ((e = e.compare), (e = e !== null ? e : Qa), e(c, a) && l.ref === t.ref)
      )
        return Zt(l, t, u);
    }
    return (
      (t.flags |= 1),
      (l = qt(n, a)),
      (l.ref = t.ref),
      (l.return = t),
      (t.child = l)
    );
  }
  function xo(l, t, e, a, u) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (Qa(n, a) && l.ref === t.ref)
        if (((jl = !1), (t.pendingProps = a = n), bi(l, u)))
          (l.flags & 131072) !== 0 && (jl = !0);
        else return (t.lanes = l.lanes), Zt(l, t, u);
    }
    return ri(l, t, e, a, u);
  }
  function Ho(l, t, e, a) {
    var u = a.children,
      n = l !== null ? l.memoizedState : null;
    if (
      (l === null &&
        t.stateNode === null &&
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      a.mode === "hidden")
    ) {
      if ((t.flags & 128) !== 0) {
        if (((n = n !== null ? n.baseLanes | e : e), l !== null)) {
          for (a = t.child = l.child, u = 0; a !== null; )
            (u = u | a.lanes | a.childLanes), (a = a.sibling);
          a = u & ~n;
        } else (a = 0), (t.child = null);
        return Co(l, t, n, e, a);
      }
      if ((e & 536870912) !== 0)
        (t.memoizedState = { baseLanes: 0, cachePool: null }),
          l !== null && Wu(t, n !== null ? n.cachePool : null),
          n !== null ? Bs(t, n) : Qc(),
          qs(t);
      else
        return (
          (a = t.lanes = 536870912),
          Co(l, t, n !== null ? n.baseLanes | e : e, e, a)
        );
    } else
      n !== null
        ? (Wu(t, n.cachePool), Bs(t, n), se(), (t.memoizedState = null))
        : (l !== null && Wu(t, null), Qc(), se());
    return Ql(l, t, u, e), t.child;
  }
  function au(l, t) {
    return (
      (l !== null && l.tag === 22) ||
        t.stateNode !== null ||
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      t.sibling
    );
  }
  function Co(l, t, e, a, u) {
    var n = Bc();
    return (
      (n = n === null ? null : { parent: Nl._currentValue, pool: n }),
      (t.memoizedState = { baseLanes: e, cachePool: n }),
      l !== null && Wu(t, null),
      Qc(),
      qs(t),
      l !== null && ca(l, t, a, !0),
      (t.childLanes = u),
      null
    );
  }
  function dn(l, t) {
    return (
      (t = mn({ mode: t.mode, children: t.children }, l.mode)),
      (t.ref = l.ref),
      (l.child = t),
      (t.return = l),
      t
    );
  }
  function Bo(l, t, e) {
    return (
      Ye(t, l.child, null, e),
      (l = dn(t, t.pendingProps)),
      (l.flags |= 2),
      rt(t),
      (t.memoizedState = null),
      l
    );
  }
  function Im(l, t, e) {
    var a = t.pendingProps,
      u = (t.flags & 128) !== 0;
    if (((t.flags &= -129), l === null)) {
      if (ul) {
        if (a.mode === "hidden")
          return (l = dn(t, a)), (t.lanes = 536870912), au(null, l);
        if (
          (Vc(t),
          (l = gl)
            ? ((l = Wd(l, zt)),
              (l = l !== null && l.data === "&" ? l : null),
              l !== null &&
                ((t.memoizedState = {
                  dehydrated: l,
                  treeContext: te !== null ? { id: Nt, overflow: Rt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (e = Ss(l)),
                (e.return = t),
                (t.child = e),
                (Ll = t),
                (gl = null)))
            : (l = null),
          l === null)
        )
          throw ae(t);
        return (t.lanes = 536870912), null;
      }
      return dn(t, a);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var c = n.dehydrated;
      if ((Vc(t), u))
        if (t.flags & 256) (t.flags &= -257), (t = Bo(l, t, e));
        else if (t.memoizedState !== null)
          (t.child = l.child), (t.flags |= 128), (t = null);
        else throw Error(o(558));
      else if (
        (jl || ca(l, t, e, !1), (u = (e & l.childLanes) !== 0), jl || u)
      ) {
        if (
          ((a = yl),
          a !== null && ((c = Mf(a, e)), c !== 0 && c !== n.retryLane))
        )
          throw ((n.retryLane = c), Ne(l, c), ut(a, l, c), di);
        zn(), (t = Bo(l, t, e));
      } else
        (l = n.treeContext),
          (gl = At(c.nextSibling)),
          (Ll = t),
          (ul = !0),
          (ee = null),
          (zt = !1),
          l !== null && Es(t, l),
          (t = dn(t, a)),
          (t.flags |= 4096);
      return t;
    }
    return (
      (l = qt(l.child, { mode: a.mode, children: a.children })),
      (l.ref = t.ref),
      (t.child = l),
      (l.return = t),
      l
    );
  }
  function rn(l, t) {
    var e = t.ref;
    if (e === null) l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object") throw Error(o(284));
      (l === null || l.ref !== e) && (t.flags |= 4194816);
    }
  }
  function ri(l, t, e, a, u) {
    return (
      He(t),
      (e = Jc(l, t, e, a, void 0, u)),
      (a = wc()),
      l !== null && !jl
        ? (Wc(l, t, u), Zt(l, t, u))
        : (ul && a && Dc(t), (t.flags |= 1), Ql(l, t, e, u), t.child)
    );
  }
  function qo(l, t, e, a, u, n) {
    return (
      He(t),
      (t.updateQueue = null),
      (e = Gs(t, a, e, u)),
      Ys(l),
      (a = wc()),
      l !== null && !jl
        ? (Wc(l, t, n), Zt(l, t, n))
        : (ul && a && Dc(t), (t.flags |= 1), Ql(l, t, e, n), t.child)
    );
  }
  function Yo(l, t, e, a, u) {
    if ((He(t), t.stateNode === null)) {
      var n = ea,
        c = e.contextType;
      typeof c == "object" && c !== null && (n = Xl(c)),
        (n = new e(a, n)),
        (t.memoizedState =
          n.state !== null && n.state !== void 0 ? n.state : null),
        (n.updater = si),
        (t.stateNode = n),
        (n._reactInternals = t),
        (n = t.stateNode),
        (n.props = a),
        (n.state = t.memoizedState),
        (n.refs = {}),
        Yc(t),
        (c = e.contextType),
        (n.context = typeof c == "object" && c !== null ? Xl(c) : ea),
        (n.state = t.memoizedState),
        (c = e.getDerivedStateFromProps),
        typeof c == "function" && (fi(t, e, c, a), (n.state = t.memoizedState)),
        typeof e.getDerivedStateFromProps == "function" ||
          typeof n.getSnapshotBeforeUpdate == "function" ||
          (typeof n.UNSAFE_componentWillMount != "function" &&
            typeof n.componentWillMount != "function") ||
          ((c = n.state),
          typeof n.componentWillMount == "function" && n.componentWillMount(),
          typeof n.UNSAFE_componentWillMount == "function" &&
            n.UNSAFE_componentWillMount(),
          c !== n.state && si.enqueueReplaceState(n, n.state, null),
          Ia(t, a, n, u),
          Fa(),
          (n.state = t.memoizedState)),
        typeof n.componentDidMount == "function" && (t.flags |= 4194308),
        (a = !0);
    } else if (l === null) {
      n = t.stateNode;
      var i = t.memoizedProps,
        f = Le(e, i);
      n.props = f;
      var h = n.context,
        E = e.contextType;
      (c = ea), typeof E == "object" && E !== null && (c = Xl(E));
      var M = e.getDerivedStateFromProps;
      (E =
        typeof M == "function" ||
        typeof n.getSnapshotBeforeUpdate == "function"),
        (i = t.pendingProps !== i),
        E ||
          (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
            typeof n.componentWillReceiveProps != "function") ||
          ((i || h !== c) && Ao(t, n, a, c)),
        (ne = !1);
      var g = t.memoizedState;
      (n.state = g),
        Ia(t, a, n, u),
        Fa(),
        (h = t.memoizedState),
        i || g !== h || ne
          ? (typeof M == "function" && (fi(t, e, M, a), (h = t.memoizedState)),
            (f = ne || To(t, e, f, a, g, h, c))
              ? (E ||
                  (typeof n.UNSAFE_componentWillMount != "function" &&
                    typeof n.componentWillMount != "function") ||
                  (typeof n.componentWillMount == "function" &&
                    n.componentWillMount(),
                  typeof n.UNSAFE_componentWillMount == "function" &&
                    n.UNSAFE_componentWillMount()),
                typeof n.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof n.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = a),
                (t.memoizedState = h)),
            (n.props = a),
            (n.state = h),
            (n.context = c),
            (a = f))
          : (typeof n.componentDidMount == "function" && (t.flags |= 4194308),
            (a = !1));
    } else {
      (n = t.stateNode),
        Gc(l, t),
        (c = t.memoizedProps),
        (E = Le(e, c)),
        (n.props = E),
        (M = t.pendingProps),
        (g = n.context),
        (h = e.contextType),
        (f = ea),
        typeof h == "object" && h !== null && (f = Xl(h)),
        (i = e.getDerivedStateFromProps),
        (h =
          typeof i == "function" ||
          typeof n.getSnapshotBeforeUpdate == "function") ||
          (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
            typeof n.componentWillReceiveProps != "function") ||
          ((c !== M || g !== f) && Ao(t, n, a, f)),
        (ne = !1),
        (g = t.memoizedState),
        (n.state = g),
        Ia(t, a, n, u),
        Fa();
      var b = t.memoizedState;
      c !== M ||
      g !== b ||
      ne ||
      (l !== null && l.dependencies !== null && Ju(l.dependencies))
        ? (typeof i == "function" && (fi(t, e, i, a), (b = t.memoizedState)),
          (E =
            ne ||
            To(t, e, E, a, g, b, f) ||
            (l !== null && l.dependencies !== null && Ju(l.dependencies)))
            ? (h ||
                (typeof n.UNSAFE_componentWillUpdate != "function" &&
                  typeof n.componentWillUpdate != "function") ||
                (typeof n.componentWillUpdate == "function" &&
                  n.componentWillUpdate(a, b, f),
                typeof n.UNSAFE_componentWillUpdate == "function" &&
                  n.UNSAFE_componentWillUpdate(a, b, f)),
              typeof n.componentDidUpdate == "function" && (t.flags |= 4),
              typeof n.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof n.componentDidUpdate != "function" ||
                (c === l.memoizedProps && g === l.memoizedState) ||
                (t.flags |= 4),
              typeof n.getSnapshotBeforeUpdate != "function" ||
                (c === l.memoizedProps && g === l.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = a),
              (t.memoizedState = b)),
          (n.props = a),
          (n.state = b),
          (n.context = f),
          (a = E))
        : (typeof n.componentDidUpdate != "function" ||
            (c === l.memoizedProps && g === l.memoizedState) ||
            (t.flags |= 4),
          typeof n.getSnapshotBeforeUpdate != "function" ||
            (c === l.memoizedProps && g === l.memoizedState) ||
            (t.flags |= 1024),
          (a = !1));
    }
    return (
      (n = a),
      rn(l, t),
      (a = (t.flags & 128) !== 0),
      n || a
        ? ((n = t.stateNode),
          (e =
            a && typeof e.getDerivedStateFromError != "function"
              ? null
              : n.render()),
          (t.flags |= 1),
          l !== null && a
            ? ((t.child = Ye(t, l.child, null, u)),
              (t.child = Ye(t, null, e, u)))
            : Ql(l, t, e, u),
          (t.memoizedState = n.state),
          (l = t.child))
        : (l = Zt(l, t, u)),
      l
    );
  }
  function Go(l, t, e, a) {
    return je(), (t.flags |= 256), Ql(l, t, e, a), t.child;
  }
  var mi = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function vi(l) {
    return { baseLanes: l, cachePool: Ds() };
  }
  function hi(l, t, e) {
    return (l = l !== null ? l.childLanes & ~e : 0), t && (l |= vt), l;
  }
  function Lo(l, t, e) {
    var a = t.pendingProps,
      u = !1,
      n = (t.flags & 128) !== 0,
      c;
    if (
      ((c = n) ||
        (c =
          l !== null && l.memoizedState === null ? !1 : (_l.current & 2) !== 0),
      c && ((u = !0), (t.flags &= -129)),
      (c = (t.flags & 32) !== 0),
      (t.flags &= -33),
      l === null)
    ) {
      if (ul) {
        if (
          (u ? fe(t) : se(),
          (l = gl)
            ? ((l = Wd(l, zt)),
              (l = l !== null && l.data !== "&" ? l : null),
              l !== null &&
                ((t.memoizedState = {
                  dehydrated: l,
                  treeContext: te !== null ? { id: Nt, overflow: Rt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (e = Ss(l)),
                (e.return = t),
                (t.child = e),
                (Ll = t),
                (gl = null)))
            : (l = null),
          l === null)
        )
          throw ae(t);
        return Fi(l) ? (t.lanes = 32) : (t.lanes = 536870912), null;
      }
      var i = a.children;
      return (
        (a = a.fallback),
        u
          ? (se(),
            (u = t.mode),
            (i = mn({ mode: "hidden", children: i }, u)),
            (a = Re(a, u, e, null)),
            (i.return = t),
            (a.return = t),
            (i.sibling = a),
            (t.child = i),
            (a = t.child),
            (a.memoizedState = vi(e)),
            (a.childLanes = hi(l, c, e)),
            (t.memoizedState = mi),
            au(null, a))
          : (fe(t), yi(t, i))
      );
    }
    var f = l.memoizedState;
    if (f !== null && ((i = f.dehydrated), i !== null)) {
      if (n)
        t.flags & 256
          ? (fe(t), (t.flags &= -257), (t = gi(l, t, e)))
          : t.memoizedState !== null
            ? (se(), (t.child = l.child), (t.flags |= 128), (t = null))
            : (se(),
              (i = a.fallback),
              (u = t.mode),
              (a = mn({ mode: "visible", children: a.children }, u)),
              (i = Re(i, u, e, null)),
              (i.flags |= 2),
              (a.return = t),
              (i.return = t),
              (a.sibling = i),
              (t.child = a),
              Ye(t, l.child, null, e),
              (a = t.child),
              (a.memoizedState = vi(e)),
              (a.childLanes = hi(l, c, e)),
              (t.memoizedState = mi),
              (t = au(null, a)));
      else if ((fe(t), Fi(i))) {
        if (((c = i.nextSibling && i.nextSibling.dataset), c)) var h = c.dgst;
        (c = h),
          (a = Error(o(419))),
          (a.stack = ""),
          (a.digest = c),
          Ka({ value: a, source: null, stack: null }),
          (t = gi(l, t, e));
      } else if (
        (jl || ca(l, t, e, !1), (c = (e & l.childLanes) !== 0), jl || c)
      ) {
        if (
          ((c = yl),
          c !== null && ((a = Mf(c, e)), a !== 0 && a !== f.retryLane))
        )
          throw ((f.retryLane = a), Ne(l, a), ut(c, l, a), di);
        ki(i) || zn(), (t = gi(l, t, e));
      } else
        ki(i)
          ? ((t.flags |= 192), (t.child = l.child), (t = null))
          : ((l = f.treeContext),
            (gl = At(i.nextSibling)),
            (Ll = t),
            (ul = !0),
            (ee = null),
            (zt = !1),
            l !== null && Es(t, l),
            (t = yi(t, a.children)),
            (t.flags |= 4096));
      return t;
    }
    return u
      ? (se(),
        (i = a.fallback),
        (u = t.mode),
        (f = l.child),
        (h = f.sibling),
        (a = qt(f, { mode: "hidden", children: a.children })),
        (a.subtreeFlags = f.subtreeFlags & 65011712),
        h !== null ? (i = qt(h, i)) : ((i = Re(i, u, e, null)), (i.flags |= 2)),
        (i.return = t),
        (a.return = t),
        (a.sibling = i),
        (t.child = a),
        au(null, a),
        (a = t.child),
        (i = l.child.memoizedState),
        i === null
          ? (i = vi(e))
          : ((u = i.cachePool),
            u !== null
              ? ((f = Nl._currentValue),
                (u = u.parent !== f ? { parent: f, pool: f } : u))
              : (u = Ds()),
            (i = { baseLanes: i.baseLanes | e, cachePool: u })),
        (a.memoizedState = i),
        (a.childLanes = hi(l, c, e)),
        (t.memoizedState = mi),
        au(l.child, a))
      : (fe(t),
        (e = l.child),
        (l = e.sibling),
        (e = qt(e, { mode: "visible", children: a.children })),
        (e.return = t),
        (e.sibling = null),
        l !== null &&
          ((c = t.deletions),
          c === null ? ((t.deletions = [l]), (t.flags |= 16)) : c.push(l)),
        (t.child = e),
        (t.memoizedState = null),
        e);
  }
  function yi(l, t) {
    return (
      (t = mn({ mode: "visible", children: t }, l.mode)),
      (t.return = l),
      (l.child = t)
    );
  }
  function mn(l, t) {
    return (l = ot(22, l, null, t)), (l.lanes = 0), l;
  }
  function gi(l, t, e) {
    return (
      Ye(t, l.child, null, e),
      (l = yi(t, t.pendingProps.children)),
      (l.flags |= 2),
      (t.memoizedState = null),
      l
    );
  }
  function Xo(l, t, e) {
    l.lanes |= t;
    var a = l.alternate;
    a !== null && (a.lanes |= t), jc(l.return, t, e);
  }
  function Si(l, t, e, a, u, n) {
    var c = l.memoizedState;
    c === null
      ? (l.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: e,
          tailMode: u,
          treeForkCount: n,
        })
      : ((c.isBackwards = t),
        (c.rendering = null),
        (c.renderingStartTime = 0),
        (c.last = a),
        (c.tail = e),
        (c.tailMode = u),
        (c.treeForkCount = n));
  }
  function Qo(l, t, e) {
    var a = t.pendingProps,
      u = a.revealOrder,
      n = a.tail;
    a = a.children;
    var c = _l.current,
      i = (c & 2) !== 0;
    if (
      (i ? ((c = (c & 1) | 2), (t.flags |= 128)) : (c &= 1),
      x(_l, c),
      Ql(l, t, a, e),
      (a = ul ? Va : 0),
      !i && l !== null && (l.flags & 128) !== 0)
    )
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13) l.memoizedState !== null && Xo(l, e, t);
        else if (l.tag === 19) Xo(l, e, t);
        else if (l.child !== null) {
          (l.child.return = l), (l = l.child);
          continue;
        }
        if (l === t) break l;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t) break l;
          l = l.return;
        }
        (l.sibling.return = l.return), (l = l.sibling);
      }
    switch (u) {
      case "forwards":
        for (e = t.child, u = null; e !== null; )
          (l = e.alternate),
            l !== null && ln(l) === null && (u = e),
            (e = e.sibling);
        (e = u),
          e === null
            ? ((u = t.child), (t.child = null))
            : ((u = e.sibling), (e.sibling = null)),
          Si(t, !1, u, e, n, a);
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (e = null, u = t.child, t.child = null; u !== null; ) {
          if (((l = u.alternate), l !== null && ln(l) === null)) {
            t.child = u;
            break;
          }
          (l = u.sibling), (u.sibling = e), (e = u), (u = l);
        }
        Si(t, !0, e, null, n, a);
        break;
      case "together":
        Si(t, !1, null, null, void 0, a);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Zt(l, t, e) {
    if (
      (l !== null && (t.dependencies = l.dependencies),
      (re |= t.lanes),
      (e & t.childLanes) === 0)
    )
      if (l !== null) {
        if ((ca(l, t, e, !1), (e & t.childLanes) === 0)) return null;
      } else return null;
    if (l !== null && t.child !== l.child) throw Error(o(153));
    if (t.child !== null) {
      for (
        l = t.child, e = qt(l, l.pendingProps), t.child = e, e.return = t;
        l.sibling !== null;

      )
        (l = l.sibling),
          (e = e.sibling = qt(l, l.pendingProps)),
          (e.return = t);
      e.sibling = null;
    }
    return t.child;
  }
  function bi(l, t) {
    return (l.lanes & t) !== 0
      ? !0
      : ((l = l.dependencies), !!(l !== null && Ju(l)));
  }
  function Pm(l, t, e) {
    switch (t.tag) {
      case 3:
        Ul(t, t.stateNode.containerInfo),
          ue(t, Nl, l.memoizedState.cache),
          je();
        break;
      case 27:
      case 5:
        Ua(t);
        break;
      case 4:
        Ul(t, t.stateNode.containerInfo);
        break;
      case 10:
        ue(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return (t.flags |= 128), Vc(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null
            ? (fe(t), (t.flags |= 128), null)
            : (e & t.child.childLanes) !== 0
              ? Lo(l, t, e)
              : (fe(t), (l = Zt(l, t, e)), l !== null ? l.sibling : null);
        fe(t);
        break;
      case 19:
        var u = (l.flags & 128) !== 0;
        if (
          ((a = (e & t.childLanes) !== 0),
          a || (ca(l, t, e, !1), (a = (e & t.childLanes) !== 0)),
          u)
        ) {
          if (a) return Qo(l, t, e);
          t.flags |= 128;
        }
        if (
          ((u = t.memoizedState),
          u !== null &&
            ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          x(_l, _l.current),
          a)
        )
          break;
        return null;
      case 22:
        return (t.lanes = 0), Ho(l, t, e, t.pendingProps);
      case 24:
        ue(t, Nl, l.memoizedState.cache);
    }
    return Zt(l, t, e);
  }
  function Zo(l, t, e) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps) jl = !0;
      else {
        if (!bi(l, e) && (t.flags & 128) === 0) return (jl = !1), Pm(l, t, e);
        jl = (l.flags & 131072) !== 0;
      }
    else (jl = !1), ul && (t.flags & 1048576) !== 0 && ps(t, Va, t.index);
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (((l = Be(t.elementType)), (t.type = l), typeof l == "function"))
            Ac(l)
              ? ((a = Le(l, a)), (t.tag = 1), (t = Yo(null, t, l, a, e)))
              : ((t.tag = 0), (t = ri(null, t, l, a, e)));
          else {
            if (l != null) {
              var u = l.$$typeof;
              if (u === Vl) {
                (t.tag = 11), (t = Ro(null, t, l, a, e));
                break l;
              } else if (u === $) {
                (t.tag = 14), (t = jo(null, t, l, a, e));
                break l;
              }
            }
            throw ((t = Fl(l) || l), Error(o(306, t, "")));
          }
        }
        return t;
      case 0:
        return ri(l, t, t.type, t.pendingProps, e);
      case 1:
        return (a = t.type), (u = Le(a, t.pendingProps)), Yo(l, t, a, u, e);
      case 3:
        l: {
          if ((Ul(t, t.stateNode.containerInfo), l === null))
            throw Error(o(387));
          a = t.pendingProps;
          var n = t.memoizedState;
          (u = n.element), Gc(l, t), Ia(t, a, null, e);
          var c = t.memoizedState;
          if (
            ((a = c.cache),
            ue(t, Nl, a),
            a !== n.cache && xc(t, [Nl], e, !0),
            Fa(),
            (a = c.element),
            n.isDehydrated)
          )
            if (
              ((n = { element: a, isDehydrated: !1, cache: c.cache }),
              (t.updateQueue.baseState = n),
              (t.memoizedState = n),
              t.flags & 256)
            ) {
              t = Go(l, t, a, e);
              break l;
            } else if (a !== u) {
              (u = bt(Error(o(424)), t)), Ka(u), (t = Go(l, t, a, e));
              break l;
            } else
              for (
                l = t.stateNode.containerInfo,
                  l.nodeType === 9
                    ? (l = l.body)
                    : (l = l.nodeName === "HTML" ? l.ownerDocument.body : l),
                  gl = At(l.firstChild),
                  Ll = t,
                  ul = !0,
                  ee = null,
                  zt = !0,
                  e = xs(t, null, a, e),
                  t.child = e;
                e;

              )
                (e.flags = (e.flags & -3) | 4096), (e = e.sibling);
          else {
            if ((je(), a === u)) {
              t = Zt(l, t, e);
              break l;
            }
            Ql(l, t, a, e);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          rn(l, t),
          l === null
            ? (e = lr(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = e)
              : ul ||
                ((e = t.type),
                (l = t.pendingProps),
                (a = Un(Y.current).createElement(e)),
                (a[Gl] = t),
                (a[Il] = l),
                Zl(a, e, l),
                ql(a),
                (t.stateNode = a))
            : (t.memoizedState = lr(
                t.type,
                l.memoizedProps,
                t.pendingProps,
                l.memoizedState
              )),
          null
        );
      case 27:
        return (
          Ua(t),
          l === null &&
            ul &&
            ((a = t.stateNode = Fd(t.type, t.pendingProps, Y.current)),
            (Ll = t),
            (zt = !0),
            (u = gl),
            ge(t.type) ? ((Ii = u), (gl = At(a.firstChild))) : (gl = u)),
          Ql(l, t, t.pendingProps.children, e),
          rn(l, t),
          l === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          l === null &&
            ul &&
            ((u = a = gl) &&
              ((a = U0(a, t.type, t.pendingProps, zt)),
              a !== null
                ? ((t.stateNode = a),
                  (Ll = t),
                  (gl = At(a.firstChild)),
                  (zt = !1),
                  (u = !0))
                : (u = !1)),
            u || ae(t)),
          Ua(t),
          (u = t.type),
          (n = t.pendingProps),
          (c = l !== null ? l.memoizedProps : null),
          (a = n.children),
          wi(u, n) ? (a = null) : c !== null && wi(u, c) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((u = Jc(l, t, Vm, null, null, e)), (Su._currentValue = u)),
          rn(l, t),
          Ql(l, t, a, e),
          t.child
        );
      case 6:
        return (
          l === null &&
            ul &&
            ((l = e = gl) &&
              ((e = N0(e, t.pendingProps, zt)),
              e !== null
                ? ((t.stateNode = e), (Ll = t), (gl = null), (l = !0))
                : (l = !1)),
            l || ae(t)),
          null
        );
      case 13:
        return Lo(l, t, e);
      case 4:
        return (
          Ul(t, t.stateNode.containerInfo),
          (a = t.pendingProps),
          l === null ? (t.child = Ye(t, null, a, e)) : Ql(l, t, a, e),
          t.child
        );
      case 11:
        return Ro(l, t, t.type, t.pendingProps, e);
      case 7:
        return Ql(l, t, t.pendingProps, e), t.child;
      case 8:
        return Ql(l, t, t.pendingProps.children, e), t.child;
      case 12:
        return Ql(l, t, t.pendingProps.children, e), t.child;
      case 10:
        return (
          (a = t.pendingProps),
          ue(t, t.type, a.value),
          Ql(l, t, a.children, e),
          t.child
        );
      case 9:
        return (
          (u = t.type._context),
          (a = t.pendingProps.children),
          He(t),
          (u = Xl(u)),
          (a = a(u)),
          (t.flags |= 1),
          Ql(l, t, a, e),
          t.child
        );
      case 14:
        return jo(l, t, t.type, t.pendingProps, e);
      case 15:
        return xo(l, t, t.type, t.pendingProps, e);
      case 19:
        return Qo(l, t, e);
      case 31:
        return Im(l, t, e);
      case 22:
        return Ho(l, t, e, t.pendingProps);
      case 24:
        return (
          He(t),
          (a = Xl(Nl)),
          l === null
            ? ((u = Bc()),
              u === null &&
                ((u = yl),
                (n = Hc()),
                (u.pooledCache = n),
                n.refCount++,
                n !== null && (u.pooledCacheLanes |= e),
                (u = n)),
              (t.memoizedState = { parent: a, cache: u }),
              Yc(t),
              ue(t, Nl, u))
            : ((l.lanes & e) !== 0 && (Gc(l, t), Ia(t, null, null, e), Fa()),
              (u = l.memoizedState),
              (n = t.memoizedState),
              u.parent !== a
                ? ((u = { parent: a, cache: a }),
                  (t.memoizedState = u),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = u),
                  ue(t, Nl, a))
                : ((a = n.cache),
                  ue(t, Nl, a),
                  a !== u.cache && xc(t, [Nl], e, !0))),
          Ql(l, t, t.pendingProps.children, e),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function Vt(l) {
    l.flags |= 4;
  }
  function pi(l, t, e, a, u) {
    if (((t = (l.mode & 32) !== 0) && (t = !1), t)) {
      if (((l.flags |= 16777216), (u & 335544128) === u))
        if (l.stateNode.complete) l.flags |= 8192;
        else if (yd()) l.flags |= 8192;
        else throw ((qe = ku), qc);
    } else l.flags &= -16777217;
  }
  function Vo(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (((l.flags |= 16777216), !nr(t)))
      if (yd()) l.flags |= 8192;
      else throw ((qe = ku), qc);
  }
  function vn(l, t) {
    t !== null && (l.flags |= 4),
      l.flags & 16384 &&
        ((t = l.tag !== 22 ? zf() : 536870912), (l.lanes |= t), (Sa |= t));
  }
  function uu(l, t) {
    if (!ul)
      switch (l.tailMode) {
        case "hidden":
          t = l.tail;
          for (var e = null; t !== null; )
            t.alternate !== null && (e = t), (t = t.sibling);
          e === null ? (l.tail = null) : (e.sibling = null);
          break;
        case "collapsed":
          e = l.tail;
          for (var a = null; e !== null; )
            e.alternate !== null && (a = e), (e = e.sibling);
          a === null
            ? t || l.tail === null
              ? (l.tail = null)
              : (l.tail.sibling = null)
            : (a.sibling = null);
      }
  }
  function Sl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child,
      e = 0,
      a = 0;
    if (t)
      for (var u = l.child; u !== null; )
        (e |= u.lanes | u.childLanes),
          (a |= u.subtreeFlags & 65011712),
          (a |= u.flags & 65011712),
          (u.return = l),
          (u = u.sibling);
    else
      for (u = l.child; u !== null; )
        (e |= u.lanes | u.childLanes),
          (a |= u.subtreeFlags),
          (a |= u.flags),
          (u.return = l),
          (u = u.sibling);
    return (l.subtreeFlags |= a), (l.childLanes = e), t;
  }
  function l0(l, t, e) {
    var a = t.pendingProps;
    switch ((Oc(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Sl(t), null;
      case 1:
        return Sl(t), null;
      case 3:
        return (
          (e = t.stateNode),
          (a = null),
          l !== null && (a = l.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Lt(Nl),
          zl(),
          e.pendingContext &&
            ((e.context = e.pendingContext), (e.pendingContext = null)),
          (l === null || l.child === null) &&
            (na(t)
              ? Vt(t)
              : l === null ||
                (l.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Nc())),
          Sl(t),
          null
        );
      case 26:
        var u = t.type,
          n = t.memoizedState;
        return (
          l === null
            ? (Vt(t),
              n !== null ? (Sl(t), Vo(t, n)) : (Sl(t), pi(t, u, null, a, e)))
            : n
              ? n !== l.memoizedState
                ? (Vt(t), Sl(t), Vo(t, n))
                : (Sl(t), (t.flags &= -16777217))
              : ((l = l.memoizedProps),
                l !== a && Vt(t),
                Sl(t),
                pi(t, u, l, a, e)),
          null
        );
      case 27:
        if (
          (Au(t),
          (e = Y.current),
          (u = t.type),
          l !== null && t.stateNode != null)
        )
          l.memoizedProps !== a && Vt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(o(166));
            return Sl(t), null;
          }
          (l = C.current),
            na(t) ? zs(t) : ((l = Fd(u, a, e)), (t.stateNode = l), Vt(t));
        }
        return Sl(t), null;
      case 5:
        if ((Au(t), (u = t.type), l !== null && t.stateNode != null))
          l.memoizedProps !== a && Vt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(o(166));
            return Sl(t), null;
          }
          if (((n = C.current), na(t))) zs(t);
          else {
            var c = Un(Y.current);
            switch (n) {
              case 1:
                n = c.createElementNS("http://www.w3.org/2000/svg", u);
                break;
              case 2:
                n = c.createElementNS("http://www.w3.org/1998/Math/MathML", u);
                break;
              default:
                switch (u) {
                  case "svg":
                    n = c.createElementNS("http://www.w3.org/2000/svg", u);
                    break;
                  case "math":
                    n = c.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    (n = c.createElement("div")),
                      (n.innerHTML = "<script></script>"),
                      (n = n.removeChild(n.firstChild));
                    break;
                  case "select":
                    (n =
                      typeof a.is == "string"
                        ? c.createElement("select", { is: a.is })
                        : c.createElement("select")),
                      a.multiple
                        ? (n.multiple = !0)
                        : a.size && (n.size = a.size);
                    break;
                  default:
                    n =
                      typeof a.is == "string"
                        ? c.createElement(u, { is: a.is })
                        : c.createElement(u);
                }
            }
            (n[Gl] = t), (n[Il] = a);
            l: for (c = t.child; c !== null; ) {
              if (c.tag === 5 || c.tag === 6) n.appendChild(c.stateNode);
              else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                (c.child.return = c), (c = c.child);
                continue;
              }
              if (c === t) break l;
              for (; c.sibling === null; ) {
                if (c.return === null || c.return === t) break l;
                c = c.return;
              }
              (c.sibling.return = c.return), (c = c.sibling);
            }
            t.stateNode = n;
            l: switch ((Zl(n, u, a), u)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break l;
              case "img":
                a = !0;
                break l;
              default:
                a = !1;
            }
            a && Vt(t);
          }
        }
        return (
          Sl(t),
          pi(t, t.type, l === null ? null : l.memoizedProps, t.pendingProps, e),
          null
        );
      case 6:
        if (l && t.stateNode != null) l.memoizedProps !== a && Vt(t);
        else {
          if (typeof a != "string" && t.stateNode === null) throw Error(o(166));
          if (((l = Y.current), na(t))) {
            if (
              ((l = t.stateNode),
              (e = t.memoizedProps),
              (a = null),
              (u = Ll),
              u !== null)
            )
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            (l[Gl] = t),
              (l = !!(
                l.nodeValue === e ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                Ld(l.nodeValue, e)
              )),
              l || ae(t, !0);
          } else (l = Un(l).createTextNode(a)), (l[Gl] = t), (t.stateNode = l);
        }
        return Sl(t), null;
      case 31:
        if (((e = t.memoizedState), l === null || l.memoizedState !== null)) {
          if (((a = na(t)), e !== null)) {
            if (l === null) {
              if (!a) throw Error(o(318));
              if (
                ((l = t.memoizedState),
                (l = l !== null ? l.dehydrated : null),
                !l)
              )
                throw Error(o(557));
              l[Gl] = t;
            } else
              je(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4);
            Sl(t), (l = !1);
          } else
            (e = Nc()),
              l !== null &&
                l.memoizedState !== null &&
                (l.memoizedState.hydrationErrors = e),
              (l = !0);
          if (!l) return t.flags & 256 ? (rt(t), t) : (rt(t), null);
          if ((t.flags & 128) !== 0) throw Error(o(558));
        }
        return Sl(t), null;
      case 13:
        if (
          ((a = t.memoizedState),
          l === null ||
            (l.memoizedState !== null && l.memoizedState.dehydrated !== null))
        ) {
          if (((u = na(t)), a !== null && a.dehydrated !== null)) {
            if (l === null) {
              if (!u) throw Error(o(318));
              if (
                ((u = t.memoizedState),
                (u = u !== null ? u.dehydrated : null),
                !u)
              )
                throw Error(o(317));
              u[Gl] = t;
            } else
              je(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4);
            Sl(t), (u = !1);
          } else
            (u = Nc()),
              l !== null &&
                l.memoizedState !== null &&
                (l.memoizedState.hydrationErrors = u),
              (u = !0);
          if (!u) return t.flags & 256 ? (rt(t), t) : (rt(t), null);
        }
        return (
          rt(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = e), t)
            : ((e = a !== null),
              (l = l !== null && l.memoizedState !== null),
              e &&
                ((a = t.child),
                (u = null),
                a.alternate !== null &&
                  a.alternate.memoizedState !== null &&
                  a.alternate.memoizedState.cachePool !== null &&
                  (u = a.alternate.memoizedState.cachePool.pool),
                (n = null),
                a.memoizedState !== null &&
                  a.memoizedState.cachePool !== null &&
                  (n = a.memoizedState.cachePool.pool),
                n !== u && (a.flags |= 2048)),
              e !== l && e && (t.child.flags |= 8192),
              vn(t, t.updateQueue),
              Sl(t),
              null)
        );
      case 4:
        return zl(), l === null && Qi(t.stateNode.containerInfo), Sl(t), null;
      case 10:
        return Lt(t.type), Sl(t), null;
      case 19:
        if ((z(_l), (a = t.memoizedState), a === null)) return Sl(t), null;
        if (((u = (t.flags & 128) !== 0), (n = a.rendering), n === null))
          if (u) uu(a, !1);
          else {
            if (Ml !== 0 || (l !== null && (l.flags & 128) !== 0))
              for (l = t.child; l !== null; ) {
                if (((n = ln(l)), n !== null)) {
                  for (
                    t.flags |= 128,
                      uu(a, !1),
                      l = n.updateQueue,
                      t.updateQueue = l,
                      vn(t, l),
                      t.subtreeFlags = 0,
                      l = e,
                      e = t.child;
                    e !== null;

                  )
                    gs(e, l), (e = e.sibling);
                  return (
                    x(_l, (_l.current & 1) | 2),
                    ul && Yt(t, a.treeForkCount),
                    t.child
                  );
                }
                l = l.sibling;
              }
            a.tail !== null &&
              ct() > bn &&
              ((t.flags |= 128), (u = !0), uu(a, !1), (t.lanes = 4194304));
          }
        else {
          if (!u)
            if (((l = ln(n)), l !== null)) {
              if (
                ((t.flags |= 128),
                (u = !0),
                (l = l.updateQueue),
                (t.updateQueue = l),
                vn(t, l),
                uu(a, !0),
                a.tail === null &&
                  a.tailMode === "hidden" &&
                  !n.alternate &&
                  !ul)
              )
                return Sl(t), null;
            } else
              2 * ct() - a.renderingStartTime > bn &&
                e !== 536870912 &&
                ((t.flags |= 128), (u = !0), uu(a, !1), (t.lanes = 4194304));
          a.isBackwards
            ? ((n.sibling = t.child), (t.child = n))
            : ((l = a.last),
              l !== null ? (l.sibling = n) : (t.child = n),
              (a.last = n));
        }
        return a.tail !== null
          ? ((l = a.tail),
            (a.rendering = l),
            (a.tail = l.sibling),
            (a.renderingStartTime = ct()),
            (l.sibling = null),
            (e = _l.current),
            x(_l, u ? (e & 1) | 2 : e & 1),
            ul && Yt(t, a.treeForkCount),
            l)
          : (Sl(t), null);
      case 22:
      case 23:
        return (
          rt(t),
          Zc(),
          (a = t.memoizedState !== null),
          l !== null
            ? (l.memoizedState !== null) !== a && (t.flags |= 8192)
            : a && (t.flags |= 8192),
          a
            ? (e & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Sl(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Sl(t),
          (e = t.updateQueue),
          e !== null && vn(t, e.retryQueue),
          (e = null),
          l !== null &&
            l.memoizedState !== null &&
            l.memoizedState.cachePool !== null &&
            (e = l.memoizedState.cachePool.pool),
          (a = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (a = t.memoizedState.cachePool.pool),
          a !== e && (t.flags |= 2048),
          l !== null && z(Ce),
          null
        );
      case 24:
        return (
          (e = null),
          l !== null && (e = l.memoizedState.cache),
          t.memoizedState.cache !== e && (t.flags |= 2048),
          Lt(Nl),
          Sl(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function t0(l, t) {
    switch ((Oc(t), t.tag)) {
      case 1:
        return (
          (l = t.flags), l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 3:
        return (
          Lt(Nl),
          zl(),
          (l = t.flags),
          (l & 65536) !== 0 && (l & 128) === 0
            ? ((t.flags = (l & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return Au(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if ((rt(t), t.alternate === null)) throw Error(o(340));
          je();
        }
        return (
          (l = t.flags), l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 13:
        if (
          (rt(t), (l = t.memoizedState), l !== null && l.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(o(340));
          je();
        }
        return (
          (l = t.flags), l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 19:
        return z(_l), null;
      case 4:
        return zl(), null;
      case 10:
        return Lt(t.type), null;
      case 22:
      case 23:
        return (
          rt(t),
          Zc(),
          l !== null && z(Ce),
          (l = t.flags),
          l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 24:
        return Lt(Nl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Ko(l, t) {
    switch ((Oc(t), t.tag)) {
      case 3:
        Lt(Nl), zl();
        break;
      case 26:
      case 27:
      case 5:
        Au(t);
        break;
      case 4:
        zl();
        break;
      case 31:
        t.memoizedState !== null && rt(t);
        break;
      case 13:
        rt(t);
        break;
      case 19:
        z(_l);
        break;
      case 10:
        Lt(t.type);
        break;
      case 22:
      case 23:
        rt(t), Zc(), l !== null && z(Ce);
        break;
      case 24:
        Lt(Nl);
    }
  }
  function nu(l, t) {
    try {
      var e = t.updateQueue,
        a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        e = u;
        do {
          if ((e.tag & l) === l) {
            a = void 0;
            var n = e.create,
              c = e.inst;
            (a = n()), (c.destroy = a);
          }
          e = e.next;
        } while (e !== u);
      }
    } catch (i) {
      rl(t, t.return, i);
    }
  }
  function oe(l, t, e) {
    try {
      var a = t.updateQueue,
        u = a !== null ? a.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        a = n;
        do {
          if ((a.tag & l) === l) {
            var c = a.inst,
              i = c.destroy;
            if (i !== void 0) {
              (c.destroy = void 0), (u = t);
              var f = e,
                h = i;
              try {
                h();
              } catch (E) {
                rl(u, f, E);
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (E) {
      rl(t, t.return, E);
    }
  }
  function Jo(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var e = l.stateNode;
      try {
        Cs(t, e);
      } catch (a) {
        rl(l, l.return, a);
      }
    }
  }
  function wo(l, t, e) {
    (e.props = Le(l.type, l.memoizedProps)), (e.state = l.memoizedState);
    try {
      e.componentWillUnmount();
    } catch (a) {
      rl(l, t, a);
    }
  }
  function cu(l, t) {
    try {
      var e = l.ref;
      if (e !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var a = l.stateNode;
            break;
          case 30:
            a = l.stateNode;
            break;
          default:
            a = l.stateNode;
        }
        typeof e == "function" ? (l.refCleanup = e(a)) : (e.current = a);
      }
    } catch (u) {
      rl(l, t, u);
    }
  }
  function jt(l, t) {
    var e = l.ref,
      a = l.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (u) {
          rl(l, t, u);
        } finally {
          (l.refCleanup = null),
            (l = l.alternate),
            l != null && (l.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (u) {
          rl(l, t, u);
        }
      else e.current = null;
  }
  function Wo(l) {
    var t = l.type,
      e = l.memoizedProps,
      a = l.stateNode;
    try {
      l: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          e.autoFocus && a.focus();
          break l;
        case "img":
          e.src ? (a.src = e.src) : e.srcSet && (a.srcset = e.srcSet);
      }
    } catch (u) {
      rl(l, l.return, u);
    }
  }
  function Ei(l, t, e) {
    try {
      var a = l.stateNode;
      T0(a, l.type, e, t), (a[Il] = t);
    } catch (u) {
      rl(l, l.return, u);
    }
  }
  function $o(l) {
    return (
      l.tag === 5 ||
      l.tag === 3 ||
      l.tag === 26 ||
      (l.tag === 27 && ge(l.type)) ||
      l.tag === 4
    );
  }
  function zi(l) {
    l: for (;;) {
      for (; l.sibling === null; ) {
        if (l.return === null || $o(l.return)) return null;
        l = l.return;
      }
      for (
        l.sibling.return = l.return, l = l.sibling;
        l.tag !== 5 && l.tag !== 6 && l.tag !== 18;

      ) {
        if (
          (l.tag === 27 && ge(l.type)) ||
          l.flags & 2 ||
          l.child === null ||
          l.tag === 4
        )
          continue l;
        (l.child.return = l), (l = l.child);
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function Ti(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      (l = l.stateNode),
        t
          ? (e.nodeType === 9
              ? e.body
              : e.nodeName === "HTML"
                ? e.ownerDocument.body
                : e
            ).insertBefore(l, t)
          : ((t =
              e.nodeType === 9
                ? e.body
                : e.nodeName === "HTML"
                  ? e.ownerDocument.body
                  : e),
            t.appendChild(l),
            (e = e._reactRootContainer),
            e != null || t.onclick !== null || (t.onclick = Ct));
    else if (
      a !== 4 &&
      (a === 27 && ge(l.type) && ((e = l.stateNode), (t = null)),
      (l = l.child),
      l !== null)
    )
      for (Ti(l, t, e), l = l.sibling; l !== null; )
        Ti(l, t, e), (l = l.sibling);
  }
  function hn(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      (l = l.stateNode), t ? e.insertBefore(l, t) : e.appendChild(l);
    else if (
      a !== 4 &&
      (a === 27 && ge(l.type) && (e = l.stateNode), (l = l.child), l !== null)
    )
      for (hn(l, t, e), l = l.sibling; l !== null; )
        hn(l, t, e), (l = l.sibling);
  }
  function ko(l) {
    var t = l.stateNode,
      e = l.memoizedProps;
    try {
      for (var a = l.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      Zl(t, a, e), (t[Gl] = l), (t[Il] = e);
    } catch (n) {
      rl(l, l.return, n);
    }
  }
  var Kt = !1,
    xl = !1,
    Ai = !1,
    Fo = typeof WeakSet == "function" ? WeakSet : Set,
    Yl = null;
  function e0(l, t) {
    if (((l = l.containerInfo), (Ki = Bn), (l = fs(l)), gc(l))) {
      if ("selectionStart" in l)
        var e = { start: l.selectionStart, end: l.selectionEnd };
      else
        l: {
          e = ((e = l.ownerDocument) && e.defaultView) || window;
          var a = e.getSelection && e.getSelection();
          if (a && a.rangeCount !== 0) {
            e = a.anchorNode;
            var u = a.anchorOffset,
              n = a.focusNode;
            a = a.focusOffset;
            try {
              e.nodeType, n.nodeType;
            } catch {
              e = null;
              break l;
            }
            var c = 0,
              i = -1,
              f = -1,
              h = 0,
              E = 0,
              M = l,
              g = null;
            t: for (;;) {
              for (
                var b;
                M !== e || (u !== 0 && M.nodeType !== 3) || (i = c + u),
                  M !== n || (a !== 0 && M.nodeType !== 3) || (f = c + a),
                  M.nodeType === 3 && (c += M.nodeValue.length),
                  (b = M.firstChild) !== null;

              )
                (g = M), (M = b);
              for (;;) {
                if (M === l) break t;
                if (
                  (g === e && ++h === u && (i = c),
                  g === n && ++E === a && (f = c),
                  (b = M.nextSibling) !== null)
                )
                  break;
                (M = g), (g = M.parentNode);
              }
              M = b;
            }
            e = i === -1 || f === -1 ? null : { start: i, end: f };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (
      Ji = { focusedElem: l, selectionRange: e }, Bn = !1, Yl = t;
      Yl !== null;

    )
      if (
        ((t = Yl), (l = t.child), (t.subtreeFlags & 1028) !== 0 && l !== null)
      )
        (l.return = t), (Yl = l);
      else
        for (; Yl !== null; ) {
          switch (((t = Yl), (n = t.alternate), (l = t.flags), t.tag)) {
            case 0:
              if (
                (l & 4) !== 0 &&
                ((l = t.updateQueue),
                (l = l !== null ? l.events : null),
                l !== null)
              )
                for (e = 0; e < l.length; e++)
                  (u = l[e]), (u.ref.impl = u.nextImpl);
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && n !== null) {
                (l = void 0),
                  (e = t),
                  (u = n.memoizedProps),
                  (n = n.memoizedState),
                  (a = e.stateNode);
                try {
                  var q = Le(e.type, u);
                  (l = a.getSnapshotBeforeUpdate(q, n)),
                    (a.__reactInternalSnapshotBeforeUpdate = l);
                } catch (V) {
                  rl(e, e.return, V);
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (
                  ((l = t.stateNode.containerInfo), (e = l.nodeType), e === 9)
                )
                  $i(l);
                else if (e === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      $i(l);
                      break;
                    default:
                      l.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((l & 1024) !== 0) throw Error(o(163));
          }
          if (((l = t.sibling), l !== null)) {
            (l.return = t.return), (Yl = l);
            break;
          }
          Yl = t.return;
        }
  }
  function Io(l, t, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        wt(l, e), a & 4 && nu(5, e);
        break;
      case 1:
        if ((wt(l, e), a & 4))
          if (((l = e.stateNode), t === null))
            try {
              l.componentDidMount();
            } catch (c) {
              rl(e, e.return, c);
            }
          else {
            var u = Le(e.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              l.componentDidUpdate(u, t, l.__reactInternalSnapshotBeforeUpdate);
            } catch (c) {
              rl(e, e.return, c);
            }
          }
        a & 64 && Jo(e), a & 512 && cu(e, e.return);
        break;
      case 3:
        if ((wt(l, e), a & 64 && ((l = e.updateQueue), l !== null))) {
          if (((t = null), e.child !== null))
            switch (e.child.tag) {
              case 27:
              case 5:
                t = e.child.stateNode;
                break;
              case 1:
                t = e.child.stateNode;
            }
          try {
            Cs(l, t);
          } catch (c) {
            rl(e, e.return, c);
          }
        }
        break;
      case 27:
        t === null && a & 4 && ko(e);
      case 26:
      case 5:
        wt(l, e), t === null && a & 4 && Wo(e), a & 512 && cu(e, e.return);
        break;
      case 12:
        wt(l, e);
        break;
      case 31:
        wt(l, e), a & 4 && td(l, e);
        break;
      case 13:
        wt(l, e),
          a & 4 && ed(l, e),
          a & 64 &&
            ((l = e.memoizedState),
            l !== null &&
              ((l = l.dehydrated),
              l !== null && ((e = d0.bind(null, e)), R0(l, e))));
        break;
      case 22:
        if (((a = e.memoizedState !== null || Kt), !a)) {
          (t = (t !== null && t.memoizedState !== null) || xl), (u = Kt);
          var n = xl;
          (Kt = a),
            (xl = t) && !n ? Wt(l, e, (e.subtreeFlags & 8772) !== 0) : wt(l, e),
            (Kt = u),
            (xl = n);
        }
        break;
      case 30:
        break;
      default:
        wt(l, e);
    }
  }
  function Po(l) {
    var t = l.alternate;
    t !== null && ((l.alternate = null), Po(t)),
      (l.child = null),
      (l.deletions = null),
      (l.sibling = null),
      l.tag === 5 && ((t = l.stateNode), t !== null && lc(t)),
      (l.stateNode = null),
      (l.return = null),
      (l.dependencies = null),
      (l.memoizedProps = null),
      (l.memoizedState = null),
      (l.pendingProps = null),
      (l.stateNode = null),
      (l.updateQueue = null);
  }
  var Tl = null,
    lt = !1;
  function Jt(l, t, e) {
    for (e = e.child; e !== null; ) ld(l, t, e), (e = e.sibling);
  }
  function ld(l, t, e) {
    if (it && typeof it.onCommitFiberUnmount == "function")
      try {
        it.onCommitFiberUnmount(Na, e);
      } catch {}
    switch (e.tag) {
      case 26:
        xl || jt(e, t),
          Jt(l, t, e),
          e.memoizedState
            ? e.memoizedState.count--
            : e.stateNode && ((e = e.stateNode), e.parentNode.removeChild(e));
        break;
      case 27:
        xl || jt(e, t);
        var a = Tl,
          u = lt;
        ge(e.type) && ((Tl = e.stateNode), (lt = !1)),
          Jt(l, t, e),
          hu(e.stateNode),
          (Tl = a),
          (lt = u);
        break;
      case 5:
        xl || jt(e, t);
      case 6:
        if (
          ((a = Tl),
          (u = lt),
          (Tl = null),
          Jt(l, t, e),
          (Tl = a),
          (lt = u),
          Tl !== null)
        )
          if (lt)
            try {
              (Tl.nodeType === 9
                ? Tl.body
                : Tl.nodeName === "HTML"
                  ? Tl.ownerDocument.body
                  : Tl
              ).removeChild(e.stateNode);
            } catch (n) {
              rl(e, t, n);
            }
          else
            try {
              Tl.removeChild(e.stateNode);
            } catch (n) {
              rl(e, t, n);
            }
        break;
      case 18:
        Tl !== null &&
          (lt
            ? ((l = Tl),
              Jd(
                l.nodeType === 9
                  ? l.body
                  : l.nodeName === "HTML"
                    ? l.ownerDocument.body
                    : l,
                e.stateNode
              ),
              _a(l))
            : Jd(Tl, e.stateNode));
        break;
      case 4:
        (a = Tl),
          (u = lt),
          (Tl = e.stateNode.containerInfo),
          (lt = !0),
          Jt(l, t, e),
          (Tl = a),
          (lt = u);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        oe(2, e, t), xl || oe(4, e, t), Jt(l, t, e);
        break;
      case 1:
        xl ||
          (jt(e, t),
          (a = e.stateNode),
          typeof a.componentWillUnmount == "function" && wo(e, t, a)),
          Jt(l, t, e);
        break;
      case 21:
        Jt(l, t, e);
        break;
      case 22:
        (xl = (a = xl) || e.memoizedState !== null), Jt(l, t, e), (xl = a);
        break;
      default:
        Jt(l, t, e);
    }
  }
  function td(l, t) {
    if (
      t.memoizedState === null &&
      ((l = t.alternate), l !== null && ((l = l.memoizedState), l !== null))
    ) {
      l = l.dehydrated;
      try {
        _a(l);
      } catch (e) {
        rl(t, t.return, e);
      }
    }
  }
  function ed(l, t) {
    if (
      t.memoizedState === null &&
      ((l = t.alternate),
      l !== null &&
        ((l = l.memoizedState), l !== null && ((l = l.dehydrated), l !== null)))
    )
      try {
        _a(l);
      } catch (e) {
        rl(t, t.return, e);
      }
  }
  function a0(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new Fo()), t;
      case 22:
        return (
          (l = l.stateNode),
          (t = l._retryCache),
          t === null && (t = l._retryCache = new Fo()),
          t
        );
      default:
        throw Error(o(435, l.tag));
    }
  }
  function yn(l, t) {
    var e = a0(l);
    t.forEach(function (a) {
      if (!e.has(a)) {
        e.add(a);
        var u = r0.bind(null, l, a);
        a.then(u, u);
      }
    });
  }
  function tt(l, t) {
    var e = t.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var u = e[a],
          n = l,
          c = t,
          i = c;
        l: for (; i !== null; ) {
          switch (i.tag) {
            case 27:
              if (ge(i.type)) {
                (Tl = i.stateNode), (lt = !1);
                break l;
              }
              break;
            case 5:
              (Tl = i.stateNode), (lt = !1);
              break l;
            case 3:
            case 4:
              (Tl = i.stateNode.containerInfo), (lt = !0);
              break l;
          }
          i = i.return;
        }
        if (Tl === null) throw Error(o(160));
        ld(n, c, u),
          (Tl = null),
          (lt = !1),
          (n = u.alternate),
          n !== null && (n.return = null),
          (u.return = null);
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; ) ad(t, l), (t = t.sibling);
  }
  var Ot = null;
  function ad(l, t) {
    var e = l.alternate,
      a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        tt(t, l),
          et(l),
          a & 4 && (oe(3, l, l.return), nu(3, l), oe(5, l, l.return));
        break;
      case 1:
        tt(t, l),
          et(l),
          a & 512 && (xl || e === null || jt(e, e.return)),
          a & 64 &&
            Kt &&
            ((l = l.updateQueue),
            l !== null &&
              ((a = l.callbacks),
              a !== null &&
                ((e = l.shared.hiddenCallbacks),
                (l.shared.hiddenCallbacks = e === null ? a : e.concat(a)))));
        break;
      case 26:
        var u = Ot;
        if (
          (tt(t, l),
          et(l),
          a & 512 && (xl || e === null || jt(e, e.return)),
          a & 4)
        ) {
          var n = e !== null ? e.memoizedState : null;
          if (((a = l.memoizedState), e === null))
            if (a === null)
              if (l.stateNode === null) {
                l: {
                  (a = l.type),
                    (e = l.memoizedProps),
                    (u = u.ownerDocument || u);
                  t: switch (a) {
                    case "title":
                      (n = u.getElementsByTagName("title")[0]),
                        (!n ||
                          n[xa] ||
                          n[Gl] ||
                          n.namespaceURI === "http://www.w3.org/2000/svg" ||
                          n.hasAttribute("itemprop")) &&
                          ((n = u.createElement(a)),
                          u.head.insertBefore(
                            n,
                            u.querySelector("head > title")
                          )),
                        Zl(n, a, e),
                        (n[Gl] = l),
                        ql(n),
                        (a = n);
                      break l;
                    case "link":
                      var c = ar("link", "href", u).get(a + (e.href || ""));
                      if (c) {
                        for (var i = 0; i < c.length; i++)
                          if (
                            ((n = c[i]),
                            n.getAttribute("href") ===
                              (e.href == null || e.href === ""
                                ? null
                                : e.href) &&
                              n.getAttribute("rel") ===
                                (e.rel == null ? null : e.rel) &&
                              n.getAttribute("title") ===
                                (e.title == null ? null : e.title) &&
                              n.getAttribute("crossorigin") ===
                                (e.crossOrigin == null ? null : e.crossOrigin))
                          ) {
                            c.splice(i, 1);
                            break t;
                          }
                      }
                      (n = u.createElement(a)),
                        Zl(n, a, e),
                        u.head.appendChild(n);
                      break;
                    case "meta":
                      if (
                        (c = ar("meta", "content", u).get(
                          a + (e.content || "")
                        ))
                      ) {
                        for (i = 0; i < c.length; i++)
                          if (
                            ((n = c[i]),
                            n.getAttribute("content") ===
                              (e.content == null ? null : "" + e.content) &&
                              n.getAttribute("name") ===
                                (e.name == null ? null : e.name) &&
                              n.getAttribute("property") ===
                                (e.property == null ? null : e.property) &&
                              n.getAttribute("http-equiv") ===
                                (e.httpEquiv == null ? null : e.httpEquiv) &&
                              n.getAttribute("charset") ===
                                (e.charSet == null ? null : e.charSet))
                          ) {
                            c.splice(i, 1);
                            break t;
                          }
                      }
                      (n = u.createElement(a)),
                        Zl(n, a, e),
                        u.head.appendChild(n);
                      break;
                    default:
                      throw Error(o(468, a));
                  }
                  (n[Gl] = l), ql(n), (a = n);
                }
                l.stateNode = a;
              } else ur(u, l.type, l.stateNode);
            else l.stateNode = er(u, a, l.memoizedProps);
          else
            n !== a
              ? (n === null
                  ? e.stateNode !== null &&
                    ((e = e.stateNode), e.parentNode.removeChild(e))
                  : n.count--,
                a === null
                  ? ur(u, l.type, l.stateNode)
                  : er(u, a, l.memoizedProps))
              : a === null &&
                l.stateNode !== null &&
                Ei(l, l.memoizedProps, e.memoizedProps);
        }
        break;
      case 27:
        tt(t, l),
          et(l),
          a & 512 && (xl || e === null || jt(e, e.return)),
          e !== null && a & 4 && Ei(l, l.memoizedProps, e.memoizedProps);
        break;
      case 5:
        if (
          (tt(t, l),
          et(l),
          a & 512 && (xl || e === null || jt(e, e.return)),
          l.flags & 32)
        ) {
          u = l.stateNode;
          try {
            $e(u, "");
          } catch (q) {
            rl(l, l.return, q);
          }
        }
        a & 4 &&
          l.stateNode != null &&
          ((u = l.memoizedProps), Ei(l, u, e !== null ? e.memoizedProps : u)),
          a & 1024 && (Ai = !0);
        break;
      case 6:
        if ((tt(t, l), et(l), a & 4)) {
          if (l.stateNode === null) throw Error(o(162));
          (a = l.memoizedProps), (e = l.stateNode);
          try {
            e.nodeValue = a;
          } catch (q) {
            rl(l, l.return, q);
          }
        }
        break;
      case 3:
        if (
          ((jn = null),
          (u = Ot),
          (Ot = Nn(t.containerInfo)),
          tt(t, l),
          (Ot = u),
          et(l),
          a & 4 && e !== null && e.memoizedState.isDehydrated)
        )
          try {
            _a(t.containerInfo);
          } catch (q) {
            rl(l, l.return, q);
          }
        Ai && ((Ai = !1), ud(l));
        break;
      case 4:
        (a = Ot),
          (Ot = Nn(l.stateNode.containerInfo)),
          tt(t, l),
          et(l),
          (Ot = a);
        break;
      case 12:
        tt(t, l), et(l);
        break;
      case 31:
        tt(t, l),
          et(l),
          a & 4 &&
            ((a = l.updateQueue),
            a !== null && ((l.updateQueue = null), yn(l, a)));
        break;
      case 13:
        tt(t, l),
          et(l),
          l.child.flags & 8192 &&
            (l.memoizedState !== null) !=
              (e !== null && e.memoizedState !== null) &&
            (Sn = ct()),
          a & 4 &&
            ((a = l.updateQueue),
            a !== null && ((l.updateQueue = null), yn(l, a)));
        break;
      case 22:
        u = l.memoizedState !== null;
        var f = e !== null && e.memoizedState !== null,
          h = Kt,
          E = xl;
        if (
          ((Kt = h || u),
          (xl = E || f),
          tt(t, l),
          (xl = E),
          (Kt = h),
          et(l),
          a & 8192)
        )
          l: for (
            t = l.stateNode,
              t._visibility = u ? t._visibility & -2 : t._visibility | 1,
              u && (e === null || f || Kt || xl || Xe(l)),
              e = null,
              t = l;
            ;

          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (e === null) {
                f = e = t;
                try {
                  if (((n = f.stateNode), u))
                    (c = n.style),
                      typeof c.setProperty == "function"
                        ? c.setProperty("display", "none", "important")
                        : (c.display = "none");
                  else {
                    i = f.stateNode;
                    var M = f.memoizedProps.style,
                      g =
                        M != null && M.hasOwnProperty("display")
                          ? M.display
                          : null;
                    i.style.display =
                      g == null || typeof g == "boolean" ? "" : ("" + g).trim();
                  }
                } catch (q) {
                  rl(f, f.return, q);
                }
              }
            } else if (t.tag === 6) {
              if (e === null) {
                f = t;
                try {
                  f.stateNode.nodeValue = u ? "" : f.memoizedProps;
                } catch (q) {
                  rl(f, f.return, q);
                }
              }
            } else if (t.tag === 18) {
              if (e === null) {
                f = t;
                try {
                  var b = f.stateNode;
                  u ? wd(b, !0) : wd(f.stateNode, !1);
                } catch (q) {
                  rl(f, f.return, q);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === l) &&
              t.child !== null
            ) {
              (t.child.return = t), (t = t.child);
              continue;
            }
            if (t === l) break l;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === l) break l;
              e === t && (e = null), (t = t.return);
            }
            e === t && (e = null),
              (t.sibling.return = t.return),
              (t = t.sibling);
          }
        a & 4 &&
          ((a = l.updateQueue),
          a !== null &&
            ((e = a.retryQueue),
            e !== null && ((a.retryQueue = null), yn(l, e))));
        break;
      case 19:
        tt(t, l),
          et(l),
          a & 4 &&
            ((a = l.updateQueue),
            a !== null && ((l.updateQueue = null), yn(l, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        tt(t, l), et(l);
    }
  }
  function et(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var e, a = l.return; a !== null; ) {
          if ($o(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(o(160));
        switch (e.tag) {
          case 27:
            var u = e.stateNode,
              n = zi(l);
            hn(l, n, u);
            break;
          case 5:
            var c = e.stateNode;
            e.flags & 32 && ($e(c, ""), (e.flags &= -33));
            var i = zi(l);
            hn(l, i, c);
            break;
          case 3:
          case 4:
            var f = e.stateNode.containerInfo,
              h = zi(l);
            Ti(l, h, f);
            break;
          default:
            throw Error(o(161));
        }
      } catch (E) {
        rl(l, l.return, E);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function ud(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        ud(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (l = l.sibling);
      }
  }
  function wt(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) Io(l, t.alternate, t), (t = t.sibling);
  }
  function Xe(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          oe(4, t, t.return), Xe(t);
          break;
        case 1:
          jt(t, t.return);
          var e = t.stateNode;
          typeof e.componentWillUnmount == "function" && wo(t, t.return, e),
            Xe(t);
          break;
        case 27:
          hu(t.stateNode);
        case 26:
        case 5:
          jt(t, t.return), Xe(t);
          break;
        case 22:
          t.memoizedState === null && Xe(t);
          break;
        case 30:
          Xe(t);
          break;
        default:
          Xe(t);
      }
      l = l.sibling;
    }
  }
  function Wt(l, t, e) {
    for (e = e && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate,
        u = l,
        n = t,
        c = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Wt(u, n, e), nu(4, n);
          break;
        case 1:
          if (
            (Wt(u, n, e),
            (a = n),
            (u = a.stateNode),
            typeof u.componentDidMount == "function")
          )
            try {
              u.componentDidMount();
            } catch (h) {
              rl(a, a.return, h);
            }
          if (((a = n), (u = a.updateQueue), u !== null)) {
            var i = a.stateNode;
            try {
              var f = u.shared.hiddenCallbacks;
              if (f !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < f.length; u++)
                  Hs(f[u], i);
            } catch (h) {
              rl(a, a.return, h);
            }
          }
          e && c & 64 && Jo(n), cu(n, n.return);
          break;
        case 27:
          ko(n);
        case 26:
        case 5:
          Wt(u, n, e), e && a === null && c & 4 && Wo(n), cu(n, n.return);
          break;
        case 12:
          Wt(u, n, e);
          break;
        case 31:
          Wt(u, n, e), e && c & 4 && td(u, n);
          break;
        case 13:
          Wt(u, n, e), e && c & 4 && ed(u, n);
          break;
        case 22:
          n.memoizedState === null && Wt(u, n, e), cu(n, n.return);
          break;
        case 30:
          break;
        default:
          Wt(u, n, e);
      }
      t = t.sibling;
    }
  }
  function Mi(l, t) {
    var e = null;
    l !== null &&
      l.memoizedState !== null &&
      l.memoizedState.cachePool !== null &&
      (e = l.memoizedState.cachePool.pool),
      (l = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (l = t.memoizedState.cachePool.pool),
      l !== e && (l != null && l.refCount++, e != null && Ja(e));
  }
  function _i(l, t) {
    (l = null),
      t.alternate !== null && (l = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== l && (t.refCount++, l != null && Ja(l));
  }
  function Ut(l, t, e, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) nd(l, t, e, a), (t = t.sibling);
  }
  function nd(l, t, e, a) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Ut(l, t, e, a), u & 2048 && nu(9, t);
        break;
      case 1:
        Ut(l, t, e, a);
        break;
      case 3:
        Ut(l, t, e, a),
          u & 2048 &&
            ((l = null),
            t.alternate !== null && (l = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== l && (t.refCount++, l != null && Ja(l)));
        break;
      case 12:
        if (u & 2048) {
          Ut(l, t, e, a), (l = t.stateNode);
          try {
            var n = t.memoizedProps,
              c = n.id,
              i = n.onPostCommit;
            typeof i == "function" &&
              i(
                c,
                t.alternate === null ? "mount" : "update",
                l.passiveEffectDuration,
                -0
              );
          } catch (f) {
            rl(t, t.return, f);
          }
        } else Ut(l, t, e, a);
        break;
      case 31:
        Ut(l, t, e, a);
        break;
      case 13:
        Ut(l, t, e, a);
        break;
      case 23:
        break;
      case 22:
        (n = t.stateNode),
          (c = t.alternate),
          t.memoizedState !== null
            ? n._visibility & 2
              ? Ut(l, t, e, a)
              : iu(l, t)
            : n._visibility & 2
              ? Ut(l, t, e, a)
              : ((n._visibility |= 2),
                ha(l, t, e, a, (t.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && Mi(c, t);
        break;
      case 24:
        Ut(l, t, e, a), u & 2048 && _i(t.alternate, t);
        break;
      default:
        Ut(l, t, e, a);
    }
  }
  function ha(l, t, e, a, u) {
    for (
      u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child;
      t !== null;

    ) {
      var n = l,
        c = t,
        i = e,
        f = a,
        h = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          ha(n, c, i, f, u), nu(8, c);
          break;
        case 23:
          break;
        case 22:
          var E = c.stateNode;
          c.memoizedState !== null
            ? E._visibility & 2
              ? ha(n, c, i, f, u)
              : iu(n, c)
            : ((E._visibility |= 2), ha(n, c, i, f, u)),
            u && h & 2048 && Mi(c.alternate, c);
          break;
        case 24:
          ha(n, c, i, f, u), u && h & 2048 && _i(c.alternate, c);
          break;
        default:
          ha(n, c, i, f, u);
      }
      t = t.sibling;
    }
  }
  function iu(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var e = l,
          a = t,
          u = a.flags;
        switch (a.tag) {
          case 22:
            iu(e, a), u & 2048 && Mi(a.alternate, a);
            break;
          case 24:
            iu(e, a), u & 2048 && _i(a.alternate, a);
            break;
          default:
            iu(e, a);
        }
        t = t.sibling;
      }
  }
  var fu = 8192;
  function ya(l, t, e) {
    if (l.subtreeFlags & fu)
      for (l = l.child; l !== null; ) cd(l, t, e), (l = l.sibling);
  }
  function cd(l, t, e) {
    switch (l.tag) {
      case 26:
        ya(l, t, e),
          l.flags & fu &&
            l.memoizedState !== null &&
            Z0(e, Ot, l.memoizedState, l.memoizedProps);
        break;
      case 5:
        ya(l, t, e);
        break;
      case 3:
      case 4:
        var a = Ot;
        (Ot = Nn(l.stateNode.containerInfo)), ya(l, t, e), (Ot = a);
        break;
      case 22:
        l.memoizedState === null &&
          ((a = l.alternate),
          a !== null && a.memoizedState !== null
            ? ((a = fu), (fu = 16777216), ya(l, t, e), (fu = a))
            : ya(l, t, e));
        break;
      default:
        ya(l, t, e);
    }
  }
  function id(l) {
    var t = l.alternate;
    if (t !== null && ((l = t.child), l !== null)) {
      t.child = null;
      do (t = l.sibling), (l.sibling = null), (l = t);
      while (l !== null);
    }
  }
  function su(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          (Yl = a), sd(a, l);
        }
      id(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) fd(l), (l = l.sibling);
  }
  function fd(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        su(l), l.flags & 2048 && oe(9, l, l.return);
        break;
      case 3:
        su(l);
        break;
      case 12:
        su(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null &&
        t._visibility & 2 &&
        (l.return === null || l.return.tag !== 13)
          ? ((t._visibility &= -3), gn(l))
          : su(l);
        break;
      default:
        su(l);
    }
  }
  function gn(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          (Yl = a), sd(a, l);
        }
      id(l);
    }
    for (l = l.child; l !== null; ) {
      switch (((t = l), t.tag)) {
        case 0:
        case 11:
        case 15:
          oe(8, t, t.return), gn(t);
          break;
        case 22:
          (e = t.stateNode),
            e._visibility & 2 && ((e._visibility &= -3), gn(t));
          break;
        default:
          gn(t);
      }
      l = l.sibling;
    }
  }
  function sd(l, t) {
    for (; Yl !== null; ) {
      var e = Yl;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          oe(8, e, t);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Ja(e.memoizedState.cache);
      }
      if (((a = e.child), a !== null)) (a.return = e), (Yl = a);
      else
        l: for (e = l; Yl !== null; ) {
          a = Yl;
          var u = a.sibling,
            n = a.return;
          if ((Po(a), a === e)) {
            Yl = null;
            break l;
          }
          if (u !== null) {
            (u.return = n), (Yl = u);
            break l;
          }
          Yl = n;
        }
    }
  }
  var u0 = {
      getCacheForType: function (l) {
        var t = Xl(Nl),
          e = t.data.get(l);
        return e === void 0 && ((e = l()), t.data.set(l, e)), e;
      },
      cacheSignal: function () {
        return Xl(Nl).controller.signal;
      },
    },
    n0 = typeof WeakMap == "function" ? WeakMap : Map,
    fl = 0,
    yl = null,
    ll = null,
    el = 0,
    dl = 0,
    mt = null,
    de = !1,
    ga = !1,
    Di = !1,
    $t = 0,
    Ml = 0,
    re = 0,
    Qe = 0,
    Oi = 0,
    vt = 0,
    Sa = 0,
    ou = null,
    at = null,
    Ui = !1,
    Sn = 0,
    od = 0,
    bn = 1 / 0,
    pn = null,
    me = null,
    Cl = 0,
    ve = null,
    ba = null,
    kt = 0,
    Ni = 0,
    Ri = null,
    dd = null,
    du = 0,
    ji = null;
  function ht() {
    return (fl & 2) !== 0 && el !== 0 ? el & -el : r.T !== null ? Yi() : _f();
  }
  function rd() {
    if (vt === 0)
      if ((el & 536870912) === 0 || ul) {
        var l = Du;
        (Du <<= 1), (Du & 3932160) === 0 && (Du = 262144), (vt = l);
      } else vt = 536870912;
    return (l = dt.current), l !== null && (l.flags |= 32), vt;
  }
  function ut(l, t, e) {
    ((l === yl && (dl === 2 || dl === 9)) || l.cancelPendingCommit !== null) &&
      (pa(l, 0), he(l, el, vt, !1)),
      ja(l, e),
      ((fl & 2) === 0 || l !== yl) &&
        (l === yl &&
          ((fl & 2) === 0 && (Qe |= e), Ml === 4 && he(l, el, vt, !1)),
        xt(l));
  }
  function md(l, t, e) {
    if ((fl & 6) !== 0) throw Error(o(327));
    var a = (!e && (t & 127) === 0 && (t & l.expiredLanes) === 0) || Ra(l, t),
      u = a ? f0(l, t) : Hi(l, t, !0),
      n = a;
    do {
      if (u === 0) {
        ga && !a && he(l, t, 0, !1);
        break;
      } else {
        if (((e = l.current.alternate), n && !c0(e))) {
          (u = Hi(l, t, !1)), (n = !1);
          continue;
        }
        if (u === 2) {
          if (((n = t), l.errorRecoveryDisabledLanes & n)) var c = 0;
          else
            (c = l.pendingLanes & -536870913),
              (c = c !== 0 ? c : c & 536870912 ? 536870912 : 0);
          if (c !== 0) {
            t = c;
            l: {
              var i = l;
              u = ou;
              var f = i.current.memoizedState.isDehydrated;
              if ((f && (pa(i, c).flags |= 256), (c = Hi(i, c, !1)), c !== 2)) {
                if (Di && !f) {
                  (i.errorRecoveryDisabledLanes |= n), (Qe |= n), (u = 4);
                  break l;
                }
                (n = at),
                  (at = u),
                  n !== null && (at === null ? (at = n) : at.push.apply(at, n));
              }
              u = c;
            }
            if (((n = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          pa(l, 0), he(l, t, 0, !0);
          break;
        }
        l: {
          switch (((a = l), (n = u), n)) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              he(a, t, vt, !de);
              break l;
            case 2:
              at = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && ((u = Sn + 300 - ct()), 10 < u)) {
            if ((he(a, t, vt, !de), Uu(a, 0, !0) !== 0)) break l;
            (kt = t),
              (a.timeoutHandle = Vd(
                vd.bind(
                  null,
                  a,
                  e,
                  at,
                  pn,
                  Ui,
                  t,
                  vt,
                  Qe,
                  Sa,
                  de,
                  n,
                  "Throttled",
                  -0,
                  0
                ),
                u
              ));
            break l;
          }
          vd(a, e, at, pn, Ui, t, vt, Qe, Sa, de, n, null, -0, 0);
        }
      }
      break;
    } while (!0);
    xt(l);
  }
  function vd(l, t, e, a, u, n, c, i, f, h, E, M, g, b) {
    if (
      ((l.timeoutHandle = -1),
      (M = t.subtreeFlags),
      M & 8192 || (M & 16785408) === 16785408)
    ) {
      (M = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ct,
      }),
        cd(t, n, M);
      var q =
        (n & 62914560) === n ? Sn - ct() : (n & 4194048) === n ? od - ct() : 0;
      if (((q = V0(M, q)), q !== null)) {
        (kt = n),
          (l.cancelPendingCommit = q(
            zd.bind(null, l, t, n, e, a, u, c, i, f, E, M, null, g, b)
          )),
          he(l, n, c, !h);
        return;
      }
    }
    zd(l, t, n, e, a, u, c, i, f);
  }
  function c0(l) {
    for (var t = l; ; ) {
      var e = t.tag;
      if (
        (e === 0 || e === 11 || e === 15) &&
        t.flags & 16384 &&
        ((e = t.updateQueue), e !== null && ((e = e.stores), e !== null))
      )
        for (var a = 0; a < e.length; a++) {
          var u = e[a],
            n = u.getSnapshot;
          u = u.value;
          try {
            if (!st(n(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (((e = t.child), t.subtreeFlags & 16384 && e !== null))
        (e.return = t), (t = e);
      else {
        if (t === l) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) return !0;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    }
    return !0;
  }
  function he(l, t, e, a) {
    (t &= ~Oi),
      (t &= ~Qe),
      (l.suspendedLanes |= t),
      (l.pingedLanes &= ~t),
      a && (l.warmLanes |= t),
      (a = l.expirationTimes);
    for (var u = t; 0 < u; ) {
      var n = 31 - ft(u),
        c = 1 << n;
      (a[n] = -1), (u &= ~c);
    }
    e !== 0 && Tf(l, e, t);
  }
  function En() {
    return (fl & 6) === 0 ? (ru(0), !1) : !0;
  }
  function xi() {
    if (ll !== null) {
      if (dl === 0) var l = ll.return;
      else (l = ll), (Gt = xe = null), $c(l), (oa = null), (Wa = 0), (l = ll);
      for (; l !== null; ) Ko(l.alternate, l), (l = l.return);
      ll = null;
    }
  }
  function pa(l, t) {
    var e = l.timeoutHandle;
    e !== -1 && ((l.timeoutHandle = -1), _0(e)),
      (e = l.cancelPendingCommit),
      e !== null && ((l.cancelPendingCommit = null), e()),
      (kt = 0),
      xi(),
      (yl = l),
      (ll = e = qt(l.current, null)),
      (el = t),
      (dl = 0),
      (mt = null),
      (de = !1),
      (ga = Ra(l, t)),
      (Di = !1),
      (Sa = vt = Oi = Qe = re = Ml = 0),
      (at = ou = null),
      (Ui = !1),
      (t & 8) !== 0 && (t |= t & 32);
    var a = l.entangledLanes;
    if (a !== 0)
      for (l = l.entanglements, a &= t; 0 < a; ) {
        var u = 31 - ft(a),
          n = 1 << u;
        (t |= l[u]), (a &= ~n);
      }
    return ($t = t), Xu(), e;
  }
  function hd(l, t) {
    (I = null),
      (r.H = eu),
      t === sa || t === $u
        ? ((t = Ns()), (dl = 3))
        : t === qc
          ? ((t = Ns()), (dl = 4))
          : (dl =
              t === di
                ? 8
                : t !== null &&
                    typeof t == "object" &&
                    typeof t.then == "function"
                  ? 6
                  : 1),
      (mt = t),
      ll === null && ((Ml = 1), on(l, bt(t, l.current)));
  }
  function yd() {
    var l = dt.current;
    return l === null
      ? !0
      : (el & 4194048) === el
        ? Tt === null
        : (el & 62914560) === el || (el & 536870912) !== 0
          ? l === Tt
          : !1;
  }
  function gd() {
    var l = r.H;
    return (r.H = eu), l === null ? eu : l;
  }
  function Sd() {
    var l = r.A;
    return (r.A = u0), l;
  }
  function zn() {
    (Ml = 4),
      de || ((el & 4194048) !== el && dt.current !== null) || (ga = !0),
      ((re & 134217727) === 0 && (Qe & 134217727) === 0) ||
        yl === null ||
        he(yl, el, vt, !1);
  }
  function Hi(l, t, e) {
    var a = fl;
    fl |= 2;
    var u = gd(),
      n = Sd();
    (yl !== l || el !== t) && ((pn = null), pa(l, t)), (t = !1);
    var c = Ml;
    l: do
      try {
        if (dl !== 0 && ll !== null) {
          var i = ll,
            f = mt;
          switch (dl) {
            case 8:
              xi(), (c = 6);
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              dt.current === null && (t = !0);
              var h = dl;
              if (((dl = 0), (mt = null), Ea(l, i, f, h), e && ga)) {
                c = 0;
                break l;
              }
              break;
            default:
              (h = dl), (dl = 0), (mt = null), Ea(l, i, f, h);
          }
        }
        i0(), (c = Ml);
        break;
      } catch (E) {
        hd(l, E);
      }
    while (!0);
    return (
      t && l.shellSuspendCounter++,
      (Gt = xe = null),
      (fl = a),
      (r.H = u),
      (r.A = n),
      ll === null && ((yl = null), (el = 0), Xu()),
      c
    );
  }
  function i0() {
    for (; ll !== null; ) bd(ll);
  }
  function f0(l, t) {
    var e = fl;
    fl |= 2;
    var a = gd(),
      u = Sd();
    yl !== l || el !== t
      ? ((pn = null), (bn = ct() + 500), pa(l, t))
      : (ga = Ra(l, t));
    l: do
      try {
        if (dl !== 0 && ll !== null) {
          t = ll;
          var n = mt;
          t: switch (dl) {
            case 1:
              (dl = 0), (mt = null), Ea(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (Os(n)) {
                (dl = 0), (mt = null), pd(t);
                break;
              }
              (t = function () {
                (dl !== 2 && dl !== 9) || yl !== l || (dl = 7), xt(l);
              }),
                n.then(t, t);
              break l;
            case 3:
              dl = 7;
              break l;
            case 4:
              dl = 5;
              break l;
            case 7:
              Os(n)
                ? ((dl = 0), (mt = null), pd(t))
                : ((dl = 0), (mt = null), Ea(l, t, n, 7));
              break;
            case 5:
              var c = null;
              switch (ll.tag) {
                case 26:
                  c = ll.memoizedState;
                case 5:
                case 27:
                  var i = ll;
                  if (c ? nr(c) : i.stateNode.complete) {
                    (dl = 0), (mt = null);
                    var f = i.sibling;
                    if (f !== null) ll = f;
                    else {
                      var h = i.return;
                      h !== null ? ((ll = h), Tn(h)) : (ll = null);
                    }
                    break t;
                  }
              }
              (dl = 0), (mt = null), Ea(l, t, n, 5);
              break;
            case 6:
              (dl = 0), (mt = null), Ea(l, t, n, 6);
              break;
            case 8:
              xi(), (Ml = 6);
              break l;
            default:
              throw Error(o(462));
          }
        }
        s0();
        break;
      } catch (E) {
        hd(l, E);
      }
    while (!0);
    return (
      (Gt = xe = null),
      (r.H = a),
      (r.A = u),
      (fl = e),
      ll !== null ? 0 : ((yl = null), (el = 0), Xu(), Ml)
    );
  }
  function s0() {
    for (; ll !== null && !jr(); ) bd(ll);
  }
  function bd(l) {
    var t = Zo(l.alternate, l, $t);
    (l.memoizedProps = l.pendingProps), t === null ? Tn(l) : (ll = t);
  }
  function pd(l) {
    var t = l,
      e = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = qo(e, t, t.pendingProps, t.type, void 0, el);
        break;
      case 11:
        t = qo(e, t, t.pendingProps, t.type.render, t.ref, el);
        break;
      case 5:
        $c(t);
      default:
        Ko(e, t), (t = ll = gs(t, $t)), (t = Zo(e, t, $t));
    }
    (l.memoizedProps = l.pendingProps), t === null ? Tn(l) : (ll = t);
  }
  function Ea(l, t, e, a) {
    (Gt = xe = null), $c(t), (oa = null), (Wa = 0);
    var u = t.return;
    try {
      if (Fm(l, u, t, e, el)) {
        (Ml = 1), on(l, bt(e, l.current)), (ll = null);
        return;
      }
    } catch (n) {
      if (u !== null) throw ((ll = u), n);
      (Ml = 1), on(l, bt(e, l.current)), (ll = null);
      return;
    }
    t.flags & 32768
      ? (ul || a === 1
          ? (l = !0)
          : ga || (el & 536870912) !== 0
            ? (l = !1)
            : ((de = l = !0),
              (a === 2 || a === 9 || a === 3 || a === 6) &&
                ((a = dt.current),
                a !== null && a.tag === 13 && (a.flags |= 16384))),
        Ed(t, l))
      : Tn(t);
  }
  function Tn(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        Ed(t, de);
        return;
      }
      l = t.return;
      var e = l0(t.alternate, t, $t);
      if (e !== null) {
        ll = e;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        ll = t;
        return;
      }
      ll = t = l;
    } while (t !== null);
    Ml === 0 && (Ml = 5);
  }
  function Ed(l, t) {
    do {
      var e = t0(l.alternate, l);
      if (e !== null) {
        (e.flags &= 32767), (ll = e);
        return;
      }
      if (
        ((e = l.return),
        e !== null &&
          ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null)),
        !t && ((l = l.sibling), l !== null))
      ) {
        ll = l;
        return;
      }
      ll = l = e;
    } while (l !== null);
    (Ml = 6), (ll = null);
  }
  function zd(l, t, e, a, u, n, c, i, f) {
    l.cancelPendingCommit = null;
    do An();
    while (Cl !== 0);
    if ((fl & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === l.current) throw Error(o(177));
      if (
        ((n = t.lanes | t.childLanes),
        (n |= zc),
        Qr(l, e, n, c, i, f),
        l === yl && ((ll = yl = null), (el = 0)),
        (ba = t),
        (ve = l),
        (kt = e),
        (Ni = n),
        (Ri = u),
        (dd = a),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((l.callbackNode = null),
            (l.callbackPriority = 0),
            m0(Mu, function () {
              return Dd(), null;
            }))
          : ((l.callbackNode = null), (l.callbackPriority = 0)),
        (a = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || a)
      ) {
        (a = r.T), (r.T = null), (u = p.p), (p.p = 2), (c = fl), (fl |= 4);
        try {
          e0(l, t, e);
        } finally {
          (fl = c), (p.p = u), (r.T = a);
        }
      }
      (Cl = 1), Td(), Ad(), Md();
    }
  }
  function Td() {
    if (Cl === 1) {
      Cl = 0;
      var l = ve,
        t = ba,
        e = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || e) {
        (e = r.T), (r.T = null);
        var a = p.p;
        p.p = 2;
        var u = fl;
        fl |= 4;
        try {
          ad(t, l);
          var n = Ji,
            c = fs(l.containerInfo),
            i = n.focusedElem,
            f = n.selectionRange;
          if (
            c !== i &&
            i &&
            i.ownerDocument &&
            is(i.ownerDocument.documentElement, i)
          ) {
            if (f !== null && gc(i)) {
              var h = f.start,
                E = f.end;
              if ((E === void 0 && (E = h), "selectionStart" in i))
                (i.selectionStart = h),
                  (i.selectionEnd = Math.min(E, i.value.length));
              else {
                var M = i.ownerDocument || document,
                  g = (M && M.defaultView) || window;
                if (g.getSelection) {
                  var b = g.getSelection(),
                    q = i.textContent.length,
                    V = Math.min(f.start, q),
                    hl = f.end === void 0 ? V : Math.min(f.end, q);
                  !b.extend && V > hl && ((c = hl), (hl = V), (V = c));
                  var m = cs(i, V),
                    d = cs(i, hl);
                  if (
                    m &&
                    d &&
                    (b.rangeCount !== 1 ||
                      b.anchorNode !== m.node ||
                      b.anchorOffset !== m.offset ||
                      b.focusNode !== d.node ||
                      b.focusOffset !== d.offset)
                  ) {
                    var v = M.createRange();
                    v.setStart(m.node, m.offset),
                      b.removeAllRanges(),
                      V > hl
                        ? (b.addRange(v), b.extend(d.node, d.offset))
                        : (v.setEnd(d.node, d.offset), b.addRange(v));
                  }
                }
              }
            }
            for (M = [], b = i; (b = b.parentNode); )
              b.nodeType === 1 &&
                M.push({ element: b, left: b.scrollLeft, top: b.scrollTop });
            for (
              typeof i.focus == "function" && i.focus(), i = 0;
              i < M.length;
              i++
            ) {
              var A = M[i];
              (A.element.scrollLeft = A.left), (A.element.scrollTop = A.top);
            }
          }
          (Bn = !!Ki), (Ji = Ki = null);
        } finally {
          (fl = u), (p.p = a), (r.T = e);
        }
      }
      (l.current = t), (Cl = 2);
    }
  }
  function Ad() {
    if (Cl === 2) {
      Cl = 0;
      var l = ve,
        t = ba,
        e = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || e) {
        (e = r.T), (r.T = null);
        var a = p.p;
        p.p = 2;
        var u = fl;
        fl |= 4;
        try {
          Io(l, t.alternate, t);
        } finally {
          (fl = u), (p.p = a), (r.T = e);
        }
      }
      Cl = 3;
    }
  }
  function Md() {
    if (Cl === 4 || Cl === 3) {
      (Cl = 0), xr();
      var l = ve,
        t = ba,
        e = kt,
        a = dd;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Cl = 5)
        : ((Cl = 0), (ba = ve = null), _d(l, l.pendingLanes));
      var u = l.pendingLanes;
      if (
        (u === 0 && (me = null),
        In(e),
        (t = t.stateNode),
        it && typeof it.onCommitFiberRoot == "function")
      )
        try {
          it.onCommitFiberRoot(Na, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (a !== null) {
        (t = r.T), (u = p.p), (p.p = 2), (r.T = null);
        try {
          for (var n = l.onRecoverableError, c = 0; c < a.length; c++) {
            var i = a[c];
            n(i.value, { componentStack: i.stack });
          }
        } finally {
          (r.T = t), (p.p = u);
        }
      }
      (kt & 3) !== 0 && An(),
        xt(l),
        (u = l.pendingLanes),
        (e & 261930) !== 0 && (u & 42) !== 0
          ? l === ji
            ? du++
            : ((du = 0), (ji = l))
          : (du = 0),
        ru(0);
    }
  }
  function _d(l, t) {
    (l.pooledCacheLanes &= t) === 0 &&
      ((t = l.pooledCache), t != null && ((l.pooledCache = null), Ja(t)));
  }
  function An() {
    return Td(), Ad(), Md(), Dd();
  }
  function Dd() {
    if (Cl !== 5) return !1;
    var l = ve,
      t = Ni;
    Ni = 0;
    var e = In(kt),
      a = r.T,
      u = p.p;
    try {
      (p.p = 32 > e ? 32 : e), (r.T = null), (e = Ri), (Ri = null);
      var n = ve,
        c = kt;
      if (((Cl = 0), (ba = ve = null), (kt = 0), (fl & 6) !== 0))
        throw Error(o(331));
      var i = fl;
      if (
        ((fl |= 4),
        fd(n.current),
        nd(n, n.current, c, e),
        (fl = i),
        ru(0, !1),
        it && typeof it.onPostCommitFiberRoot == "function")
      )
        try {
          it.onPostCommitFiberRoot(Na, n);
        } catch {}
      return !0;
    } finally {
      (p.p = u), (r.T = a), _d(l, t);
    }
  }
  function Od(l, t, e) {
    (t = bt(e, t)),
      (t = oi(l.stateNode, t, 2)),
      (l = ie(l, t, 2)),
      l !== null && (ja(l, 2), xt(l));
  }
  function rl(l, t, e) {
    if (l.tag === 3) Od(l, l, e);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Od(t, l, e);
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof a.componentDidCatch == "function" &&
              (me === null || !me.has(a)))
          ) {
            (l = bt(e, l)),
              (e = Uo(2)),
              (a = ie(t, e, 2)),
              a !== null && (No(e, a, t, l), ja(a, 2), xt(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function Ci(l, t, e) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new n0();
      var u = new Set();
      a.set(t, u);
    } else (u = a.get(t)), u === void 0 && ((u = new Set()), a.set(t, u));
    u.has(e) ||
      ((Di = !0), u.add(e), (l = o0.bind(null, l, t, e)), t.then(l, l));
  }
  function o0(l, t, e) {
    var a = l.pingCache;
    a !== null && a.delete(t),
      (l.pingedLanes |= l.suspendedLanes & e),
      (l.warmLanes &= ~e),
      yl === l &&
        (el & e) === e &&
        (Ml === 4 || (Ml === 3 && (el & 62914560) === el && 300 > ct() - Sn)
          ? (fl & 2) === 0 && pa(l, 0)
          : (Oi |= e),
        Sa === el && (Sa = 0)),
      xt(l);
  }
  function Ud(l, t) {
    t === 0 && (t = zf()), (l = Ne(l, t)), l !== null && (ja(l, t), xt(l));
  }
  function d0(l) {
    var t = l.memoizedState,
      e = 0;
    t !== null && (e = t.retryLane), Ud(l, e);
  }
  function r0(l, t) {
    var e = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var a = l.stateNode,
          u = l.memoizedState;
        u !== null && (e = u.retryLane);
        break;
      case 19:
        a = l.stateNode;
        break;
      case 22:
        a = l.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    a !== null && a.delete(t), Ud(l, e);
  }
  function m0(l, t) {
    return Wn(l, t);
  }
  var Mn = null,
    za = null,
    Bi = !1,
    _n = !1,
    qi = !1,
    ye = 0;
  function xt(l) {
    l !== za &&
      l.next === null &&
      (za === null ? (Mn = za = l) : (za = za.next = l)),
      (_n = !0),
      Bi || ((Bi = !0), h0());
  }
  function ru(l, t) {
    if (!qi && _n) {
      qi = !0;
      do
        for (var e = !1, a = Mn; a !== null; ) {
          if (l !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var c = a.suspendedLanes,
                i = a.pingedLanes;
              (n = (1 << (31 - ft(42 | l) + 1)) - 1),
                (n &= u & ~(c & ~i)),
                (n = n & 201326741 ? (n & 201326741) | 1 : n ? n | 2 : 0);
            }
            n !== 0 && ((e = !0), xd(a, n));
          } else
            (n = el),
              (n = Uu(
                a,
                a === yl ? n : 0,
                a.cancelPendingCommit !== null || a.timeoutHandle !== -1
              )),
              (n & 3) === 0 || Ra(a, n) || ((e = !0), xd(a, n));
          a = a.next;
        }
      while (e);
      qi = !1;
    }
  }
  function v0() {
    Nd();
  }
  function Nd() {
    _n = Bi = !1;
    var l = 0;
    ye !== 0 && M0() && (l = ye);
    for (var t = ct(), e = null, a = Mn; a !== null; ) {
      var u = a.next,
        n = Rd(a, t);
      n === 0
        ? ((a.next = null),
          e === null ? (Mn = u) : (e.next = u),
          u === null && (za = e))
        : ((e = a), (l !== 0 || (n & 3) !== 0) && (_n = !0)),
        (a = u);
    }
    (Cl !== 0 && Cl !== 5) || ru(l), ye !== 0 && (ye = 0);
  }
  function Rd(l, t) {
    for (
      var e = l.suspendedLanes,
        a = l.pingedLanes,
        u = l.expirationTimes,
        n = l.pendingLanes & -62914561;
      0 < n;

    ) {
      var c = 31 - ft(n),
        i = 1 << c,
        f = u[c];
      f === -1
        ? ((i & e) === 0 || (i & a) !== 0) && (u[c] = Xr(i, t))
        : f <= t && (l.expiredLanes |= i),
        (n &= ~i);
    }
    if (
      ((t = yl),
      (e = el),
      (e = Uu(
        l,
        l === t ? e : 0,
        l.cancelPendingCommit !== null || l.timeoutHandle !== -1
      )),
      (a = l.callbackNode),
      e === 0 ||
        (l === t && (dl === 2 || dl === 9)) ||
        l.cancelPendingCommit !== null)
    )
      return (
        a !== null && a !== null && $n(a),
        (l.callbackNode = null),
        (l.callbackPriority = 0)
      );
    if ((e & 3) === 0 || Ra(l, e)) {
      if (((t = e & -e), t === l.callbackPriority)) return t;
      switch ((a !== null && $n(a), In(e))) {
        case 2:
        case 8:
          e = pf;
          break;
        case 32:
          e = Mu;
          break;
        case 268435456:
          e = Ef;
          break;
        default:
          e = Mu;
      }
      return (
        (a = jd.bind(null, l)),
        (e = Wn(e, a)),
        (l.callbackPriority = t),
        (l.callbackNode = e),
        t
      );
    }
    return (
      a !== null && a !== null && $n(a),
      (l.callbackPriority = 2),
      (l.callbackNode = null),
      2
    );
  }
  function jd(l, t) {
    if (Cl !== 0 && Cl !== 5)
      return (l.callbackNode = null), (l.callbackPriority = 0), null;
    var e = l.callbackNode;
    if (An() && l.callbackNode !== e) return null;
    var a = el;
    return (
      (a = Uu(
        l,
        l === yl ? a : 0,
        l.cancelPendingCommit !== null || l.timeoutHandle !== -1
      )),
      a === 0
        ? null
        : (md(l, a, t),
          Rd(l, ct()),
          l.callbackNode != null && l.callbackNode === e
            ? jd.bind(null, l)
            : null)
    );
  }
  function xd(l, t) {
    if (An()) return null;
    md(l, t, !0);
  }
  function h0() {
    D0(function () {
      (fl & 6) !== 0 ? Wn(bf, v0) : Nd();
    });
  }
  function Yi() {
    if (ye === 0) {
      var l = ia;
      l === 0 && ((l = _u), (_u <<= 1), (_u & 261888) === 0 && (_u = 256)),
        (ye = l);
    }
    return ye;
  }
  function Hd(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean"
      ? null
      : typeof l == "function"
        ? l
        : xu("" + l);
  }
  function Cd(l, t) {
    var e = t.ownerDocument.createElement("input");
    return (
      (e.name = t.name),
      (e.value = t.value),
      l.id && e.setAttribute("form", l.id),
      t.parentNode.insertBefore(e, t),
      (l = new FormData(l)),
      e.parentNode.removeChild(e),
      l
    );
  }
  function y0(l, t, e, a, u) {
    if (t === "submit" && e && e.stateNode === u) {
      var n = Hd((u[Il] || null).action),
        c = a.submitter;
      c &&
        ((t = (t = c[Il] || null)
          ? Hd(t.formAction)
          : c.getAttribute("formAction")),
        t !== null && ((n = t), (c = null)));
      var i = new qu("action", "action", null, a, u);
      l.push({
        event: i,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (ye !== 0) {
                  var f = c ? Cd(u, c) : new FormData(u);
                  ui(
                    e,
                    { pending: !0, data: f, method: u.method, action: n },
                    null,
                    f
                  );
                }
              } else
                typeof n == "function" &&
                  (i.preventDefault(),
                  (f = c ? Cd(u, c) : new FormData(u)),
                  ui(
                    e,
                    { pending: !0, data: f, method: u.method, action: n },
                    n,
                    f
                  ));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var Gi = 0; Gi < Ec.length; Gi++) {
    var Li = Ec[Gi],
      g0 = Li.toLowerCase(),
      S0 = Li[0].toUpperCase() + Li.slice(1);
    Dt(g0, "on" + S0);
  }
  Dt(ds, "onAnimationEnd"),
    Dt(rs, "onAnimationIteration"),
    Dt(ms, "onAnimationStart"),
    Dt("dblclick", "onDoubleClick"),
    Dt("focusin", "onFocus"),
    Dt("focusout", "onBlur"),
    Dt(Hm, "onTransitionRun"),
    Dt(Cm, "onTransitionStart"),
    Dt(Bm, "onTransitionCancel"),
    Dt(vs, "onTransitionEnd"),
    we("onMouseEnter", ["mouseout", "mouseover"]),
    we("onMouseLeave", ["mouseout", "mouseover"]),
    we("onPointerEnter", ["pointerout", "pointerover"]),
    we("onPointerLeave", ["pointerout", "pointerover"]),
    _e(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    _e(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    _e("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    _e(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    _e(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    _e(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
  var mu =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    b0 = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(mu)
    );
  function Bd(l, t) {
    t = (t & 4) !== 0;
    for (var e = 0; e < l.length; e++) {
      var a = l[e],
        u = a.event;
      a = a.listeners;
      l: {
        var n = void 0;
        if (t)
          for (var c = a.length - 1; 0 <= c; c--) {
            var i = a[c],
              f = i.instance,
              h = i.currentTarget;
            if (((i = i.listener), f !== n && u.isPropagationStopped()))
              break l;
            (n = i), (u.currentTarget = h);
            try {
              n(u);
            } catch (E) {
              Lu(E);
            }
            (u.currentTarget = null), (n = f);
          }
        else
          for (c = 0; c < a.length; c++) {
            if (
              ((i = a[c]),
              (f = i.instance),
              (h = i.currentTarget),
              (i = i.listener),
              f !== n && u.isPropagationStopped())
            )
              break l;
            (n = i), (u.currentTarget = h);
            try {
              n(u);
            } catch (E) {
              Lu(E);
            }
            (u.currentTarget = null), (n = f);
          }
      }
    }
  }
  function tl(l, t) {
    var e = t[Pn];
    e === void 0 && (e = t[Pn] = new Set());
    var a = l + "__bubble";
    e.has(a) || (qd(t, l, 2, !1), e.add(a));
  }
  function Xi(l, t, e) {
    var a = 0;
    t && (a |= 4), qd(e, l, a, t);
  }
  var Dn = "_reactListening" + Math.random().toString(36).slice(2);
  function Qi(l) {
    if (!l[Dn]) {
      (l[Dn] = !0),
        Uf.forEach(function (e) {
          e !== "selectionchange" && (b0.has(e) || Xi(e, !1, l), Xi(e, !0, l));
        });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[Dn] || ((t[Dn] = !0), Xi("selectionchange", !1, t));
    }
  }
  function qd(l, t, e, a) {
    switch (rr(t)) {
      case 2:
        var u = w0;
        break;
      case 8:
        u = W0;
        break;
      default:
        u = af;
    }
    (e = u.bind(null, t, e, l)),
      (u = void 0),
      !fc ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (u = !0),
      a
        ? u !== void 0
          ? l.addEventListener(t, e, { capture: !0, passive: u })
          : l.addEventListener(t, e, !0)
        : u !== void 0
          ? l.addEventListener(t, e, { passive: u })
          : l.addEventListener(t, e, !1);
  }
  function Zi(l, t, e, a, u) {
    var n = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      l: for (;;) {
        if (a === null) return;
        var c = a.tag;
        if (c === 3 || c === 4) {
          var i = a.stateNode.containerInfo;
          if (i === u) break;
          if (c === 4)
            for (c = a.return; c !== null; ) {
              var f = c.tag;
              if ((f === 3 || f === 4) && c.stateNode.containerInfo === u)
                return;
              c = c.return;
            }
          for (; i !== null; ) {
            if (((c = Ve(i)), c === null)) return;
            if (((f = c.tag), f === 5 || f === 6 || f === 26 || f === 27)) {
              a = n = c;
              continue l;
            }
            i = i.parentNode;
          }
        }
        a = a.return;
      }
    Xf(function () {
      var h = n,
        E = cc(e),
        M = [];
      l: {
        var g = hs.get(l);
        if (g !== void 0) {
          var b = qu,
            q = l;
          switch (l) {
            case "keypress":
              if (Cu(e) === 0) break l;
            case "keydown":
            case "keyup":
              b = rm;
              break;
            case "focusin":
              (q = "focus"), (b = rc);
              break;
            case "focusout":
              (q = "blur"), (b = rc);
              break;
            case "beforeblur":
            case "afterblur":
              b = rc;
              break;
            case "click":
              if (e.button === 2) break l;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              b = Vf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              b = lm;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              b = hm;
              break;
            case ds:
            case rs:
            case ms:
              b = am;
              break;
            case vs:
              b = gm;
              break;
            case "scroll":
            case "scrollend":
              b = Ir;
              break;
            case "wheel":
              b = bm;
              break;
            case "copy":
            case "cut":
            case "paste":
              b = nm;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              b = Jf;
              break;
            case "toggle":
            case "beforetoggle":
              b = Em;
          }
          var V = (t & 4) !== 0,
            hl = !V && (l === "scroll" || l === "scrollend"),
            m = V ? (g !== null ? g + "Capture" : null) : g;
          V = [];
          for (var d = h, v; d !== null; ) {
            var A = d;
            if (
              ((v = A.stateNode),
              (A = A.tag),
              (A !== 5 && A !== 26 && A !== 27) ||
                v === null ||
                m === null ||
                ((A = Ca(d, m)), A != null && V.push(vu(d, A, v))),
              hl)
            )
              break;
            d = d.return;
          }
          0 < V.length &&
            ((g = new b(g, q, null, e, E)), M.push({ event: g, listeners: V }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (
            ((g = l === "mouseover" || l === "pointerover"),
            (b = l === "mouseout" || l === "pointerout"),
            g &&
              e !== nc &&
              (q = e.relatedTarget || e.fromElement) &&
              (Ve(q) || q[Ze]))
          )
            break l;
          if (
            (b || g) &&
            ((g =
              E.window === E
                ? E
                : (g = E.ownerDocument)
                  ? g.defaultView || g.parentWindow
                  : window),
            b
              ? ((q = e.relatedTarget || e.toElement),
                (b = h),
                (q = q ? Ve(q) : null),
                q !== null &&
                  ((hl = j(q)),
                  (V = q.tag),
                  q !== hl || (V !== 5 && V !== 27 && V !== 6)) &&
                  (q = null))
              : ((b = null), (q = h)),
            b !== q)
          ) {
            if (
              ((V = Vf),
              (A = "onMouseLeave"),
              (m = "onMouseEnter"),
              (d = "mouse"),
              (l === "pointerout" || l === "pointerover") &&
                ((V = Jf),
                (A = "onPointerLeave"),
                (m = "onPointerEnter"),
                (d = "pointer")),
              (hl = b == null ? g : Ha(b)),
              (v = q == null ? g : Ha(q)),
              (g = new V(A, d + "leave", b, e, E)),
              (g.target = hl),
              (g.relatedTarget = v),
              (A = null),
              Ve(E) === h &&
                ((V = new V(m, d + "enter", q, e, E)),
                (V.target = v),
                (V.relatedTarget = hl),
                (A = V)),
              (hl = A),
              b && q)
            )
              t: {
                for (V = p0, m = b, d = q, v = 0, A = m; A; A = V(A)) v++;
                A = 0;
                for (var Z = d; Z; Z = V(Z)) A++;
                for (; 0 < v - A; ) (m = V(m)), v--;
                for (; 0 < A - v; ) (d = V(d)), A--;
                for (; v--; ) {
                  if (m === d || (d !== null && m === d.alternate)) {
                    V = m;
                    break t;
                  }
                  (m = V(m)), (d = V(d));
                }
                V = null;
              }
            else V = null;
            b !== null && Yd(M, g, b, V, !1),
              q !== null && hl !== null && Yd(M, hl, q, V, !0);
          }
        }
        l: {
          if (
            ((g = h ? Ha(h) : window),
            (b = g.nodeName && g.nodeName.toLowerCase()),
            b === "select" || (b === "input" && g.type === "file"))
          )
            var cl = ls;
          else if (If(g))
            if (ts) cl = Rm;
            else {
              cl = Um;
              var G = Om;
            }
          else
            (b = g.nodeName),
              !b ||
              b.toLowerCase() !== "input" ||
              (g.type !== "checkbox" && g.type !== "radio")
                ? h && uc(h.elementType) && (cl = ls)
                : (cl = Nm);
          if (cl && (cl = cl(l, h))) {
            Pf(M, cl, e, E);
            break l;
          }
          G && G(l, g, h),
            l === "focusout" &&
              h &&
              g.type === "number" &&
              h.memoizedProps.value != null &&
              ac(g, "number", g.value);
        }
        switch (((G = h ? Ha(h) : window), l)) {
          case "focusin":
            (If(G) || G.contentEditable === "true") &&
              ((Pe = G), (Sc = h), (Za = null));
            break;
          case "focusout":
            Za = Sc = Pe = null;
            break;
          case "mousedown":
            bc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (bc = !1), ss(M, e, E);
            break;
          case "selectionchange":
            if (xm) break;
          case "keydown":
          case "keyup":
            ss(M, e, E);
        }
        var P;
        if (vc)
          l: {
            switch (l) {
              case "compositionstart":
                var al = "onCompositionStart";
                break l;
              case "compositionend":
                al = "onCompositionEnd";
                break l;
              case "compositionupdate":
                al = "onCompositionUpdate";
                break l;
            }
            al = void 0;
          }
        else
          Ie
            ? kf(l, e) && (al = "onCompositionEnd")
            : l === "keydown" &&
              e.keyCode === 229 &&
              (al = "onCompositionStart");
        al &&
          (wf &&
            e.locale !== "ko" &&
            (Ie || al !== "onCompositionStart"
              ? al === "onCompositionEnd" && Ie && (P = Qf())
              : ((le = E),
                (sc = "value" in le ? le.value : le.textContent),
                (Ie = !0))),
          (G = On(h, al)),
          0 < G.length &&
            ((al = new Kf(al, l, null, e, E)),
            M.push({ event: al, listeners: G }),
            P ? (al.data = P) : ((P = Ff(e)), P !== null && (al.data = P)))),
          (P = Tm ? Am(l, e) : Mm(l, e)) &&
            ((al = On(h, "onBeforeInput")),
            0 < al.length &&
              ((G = new Kf("onBeforeInput", "beforeinput", null, e, E)),
              M.push({ event: G, listeners: al }),
              (G.data = P))),
          y0(M, l, h, e, E);
      }
      Bd(M, t);
    });
  }
  function vu(l, t, e) {
    return { instance: l, listener: t, currentTarget: e };
  }
  function On(l, t) {
    for (var e = t + "Capture", a = []; l !== null; ) {
      var u = l,
        n = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          n === null ||
          ((u = Ca(l, e)),
          u != null && a.unshift(vu(l, u, n)),
          (u = Ca(l, t)),
          u != null && a.push(vu(l, u, n))),
        l.tag === 3)
      )
        return a;
      l = l.return;
    }
    return [];
  }
  function p0(l) {
    if (l === null) return null;
    do l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Yd(l, t, e, a, u) {
    for (var n = t._reactName, c = []; e !== null && e !== a; ) {
      var i = e,
        f = i.alternate,
        h = i.stateNode;
      if (((i = i.tag), f !== null && f === a)) break;
      (i !== 5 && i !== 26 && i !== 27) ||
        h === null ||
        ((f = h),
        u
          ? ((h = Ca(e, n)), h != null && c.unshift(vu(e, h, f)))
          : u || ((h = Ca(e, n)), h != null && c.push(vu(e, h, f)))),
        (e = e.return);
    }
    c.length !== 0 && l.push({ event: t, listeners: c });
  }
  var E0 = /\r\n?/g,
    z0 = /\u0000|\uFFFD/g;
  function Gd(l) {
    return (typeof l == "string" ? l : "" + l)
      .replace(
        E0,
        `
`
      )
      .replace(z0, "");
  }
  function Ld(l, t) {
    return (t = Gd(t)), Gd(l) === t;
  }
  function vl(l, t, e, a, u, n) {
    switch (e) {
      case "children":
        typeof a == "string"
          ? t === "body" || (t === "textarea" && a === "") || $e(l, a)
          : (typeof a == "number" || typeof a == "bigint") &&
            t !== "body" &&
            $e(l, "" + a);
        break;
      case "className":
        Ru(l, "class", a);
        break;
      case "tabIndex":
        Ru(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ru(l, e, a);
        break;
      case "style":
        Gf(l, a, n);
        break;
      case "data":
        if (t !== "object") {
          Ru(l, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || e !== "href")) {
          l.removeAttribute(e);
          break;
        }
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "symbol" ||
          typeof a == "boolean"
        ) {
          l.removeAttribute(e);
          break;
        }
        (a = xu("" + a)), l.setAttribute(e, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          l.setAttribute(
            e,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof n == "function" &&
            (e === "formAction"
              ? (t !== "input" && vl(l, t, "name", u.name, u, null),
                vl(l, t, "formEncType", u.formEncType, u, null),
                vl(l, t, "formMethod", u.formMethod, u, null),
                vl(l, t, "formTarget", u.formTarget, u, null))
              : (vl(l, t, "encType", u.encType, u, null),
                vl(l, t, "method", u.method, u, null),
                vl(l, t, "target", u.target, u, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        (a = xu("" + a)), l.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (l.onclick = Ct);
        break;
      case "onScroll":
        a != null && tl("scroll", l);
        break;
      case "onScrollEnd":
        a != null && tl("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(o(61));
          if (((e = a.__html), e != null)) {
            if (u.children != null) throw Error(o(60));
            l.innerHTML = e;
          }
        }
        break;
      case "multiple":
        l.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        l.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "boolean" ||
          typeof a == "symbol"
        ) {
          l.removeAttribute("xlink:href");
          break;
        }
        (e = xu("" + a)),
          l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", e);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol"
          ? l.setAttribute(e, "" + a)
          : l.removeAttribute(e);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol"
          ? l.setAttribute(e, "")
          : l.removeAttribute(e);
        break;
      case "capture":
      case "download":
        a === !0
          ? l.setAttribute(e, "")
          : a !== !1 &&
              a != null &&
              typeof a != "function" &&
              typeof a != "symbol"
            ? l.setAttribute(e, a)
            : l.removeAttribute(e);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null &&
        typeof a != "function" &&
        typeof a != "symbol" &&
        !isNaN(a) &&
        1 <= a
          ? l.setAttribute(e, a)
          : l.removeAttribute(e);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a)
          ? l.removeAttribute(e)
          : l.setAttribute(e, a);
        break;
      case "popover":
        tl("beforetoggle", l), tl("toggle", l), Nu(l, "popover", a);
        break;
      case "xlinkActuate":
        Ht(l, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
        break;
      case "xlinkArcrole":
        Ht(l, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
        break;
      case "xlinkRole":
        Ht(l, "http://www.w3.org/1999/xlink", "xlink:role", a);
        break;
      case "xlinkShow":
        Ht(l, "http://www.w3.org/1999/xlink", "xlink:show", a);
        break;
      case "xlinkTitle":
        Ht(l, "http://www.w3.org/1999/xlink", "xlink:title", a);
        break;
      case "xlinkType":
        Ht(l, "http://www.w3.org/1999/xlink", "xlink:type", a);
        break;
      case "xmlBase":
        Ht(l, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
        break;
      case "xmlLang":
        Ht(l, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
        break;
      case "xmlSpace":
        Ht(l, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
        break;
      case "is":
        Nu(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) ||
          (e[0] !== "o" && e[0] !== "O") ||
          (e[1] !== "n" && e[1] !== "N")) &&
          ((e = kr.get(e) || e), Nu(l, e, a));
    }
  }
  function Vi(l, t, e, a, u, n) {
    switch (e) {
      case "style":
        Gf(l, a, n);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(o(61));
          if (((e = a.__html), e != null)) {
            if (u.children != null) throw Error(o(60));
            l.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof a == "string"
          ? $e(l, a)
          : (typeof a == "number" || typeof a == "bigint") && $e(l, "" + a);
        break;
      case "onScroll":
        a != null && tl("scroll", l);
        break;
      case "onScrollEnd":
        a != null && tl("scrollend", l);
        break;
      case "onClick":
        a != null && (l.onclick = Ct);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Nf.hasOwnProperty(e))
          l: {
            if (
              e[0] === "o" &&
              e[1] === "n" &&
              ((u = e.endsWith("Capture")),
              (t = e.slice(2, u ? e.length - 7 : void 0)),
              (n = l[Il] || null),
              (n = n != null ? n[e] : null),
              typeof n == "function" && l.removeEventListener(t, n, u),
              typeof a == "function")
            ) {
              typeof n != "function" &&
                n !== null &&
                (e in l
                  ? (l[e] = null)
                  : l.hasAttribute(e) && l.removeAttribute(e)),
                l.addEventListener(t, a, u);
              break l;
            }
            e in l
              ? (l[e] = a)
              : a === !0
                ? l.setAttribute(e, "")
                : Nu(l, e, a);
          }
    }
  }
  function Zl(l, t, e) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        tl("error", l), tl("load", l);
        var a = !1,
          u = !1,
          n;
        for (n in e)
          if (e.hasOwnProperty(n)) {
            var c = e[n];
            if (c != null)
              switch (n) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, t));
                default:
                  vl(l, t, n, c, e, null);
              }
          }
        u && vl(l, t, "srcSet", e.srcSet, e, null),
          a && vl(l, t, "src", e.src, e, null);
        return;
      case "input":
        tl("invalid", l);
        var i = (n = c = u = null),
          f = null,
          h = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var E = e[a];
            if (E != null)
              switch (a) {
                case "name":
                  u = E;
                  break;
                case "type":
                  c = E;
                  break;
                case "checked":
                  f = E;
                  break;
                case "defaultChecked":
                  h = E;
                  break;
                case "value":
                  n = E;
                  break;
                case "defaultValue":
                  i = E;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (E != null) throw Error(o(137, t));
                  break;
                default:
                  vl(l, t, a, E, e, null);
              }
          }
        Cf(l, n, i, f, h, c, u, !1);
        return;
      case "select":
        tl("invalid", l), (a = c = n = null);
        for (u in e)
          if (e.hasOwnProperty(u) && ((i = e[u]), i != null))
            switch (u) {
              case "value":
                n = i;
                break;
              case "defaultValue":
                c = i;
                break;
              case "multiple":
                a = i;
              default:
                vl(l, t, u, i, e, null);
            }
        (t = n),
          (e = c),
          (l.multiple = !!a),
          t != null ? We(l, !!a, t, !1) : e != null && We(l, !!a, e, !0);
        return;
      case "textarea":
        tl("invalid", l), (n = u = a = null);
        for (c in e)
          if (e.hasOwnProperty(c) && ((i = e[c]), i != null))
            switch (c) {
              case "value":
                a = i;
                break;
              case "defaultValue":
                u = i;
                break;
              case "children":
                n = i;
                break;
              case "dangerouslySetInnerHTML":
                if (i != null) throw Error(o(91));
                break;
              default:
                vl(l, t, c, i, e, null);
            }
        qf(l, a, u, n);
        return;
      case "option":
        for (f in e)
          e.hasOwnProperty(f) &&
            ((a = e[f]), a != null) &&
            (f === "selected"
              ? (l.selected =
                  a && typeof a != "function" && typeof a != "symbol")
              : vl(l, t, f, a, e, null));
        return;
      case "dialog":
        tl("beforetoggle", l), tl("toggle", l), tl("cancel", l), tl("close", l);
        break;
      case "iframe":
      case "object":
        tl("load", l);
        break;
      case "video":
      case "audio":
        for (a = 0; a < mu.length; a++) tl(mu[a], l);
        break;
      case "image":
        tl("error", l), tl("load", l);
        break;
      case "details":
        tl("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        tl("error", l), tl("load", l);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (h in e)
          if (e.hasOwnProperty(h) && ((a = e[h]), a != null))
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, t));
              default:
                vl(l, t, h, a, e, null);
            }
        return;
      default:
        if (uc(t)) {
          for (E in e)
            e.hasOwnProperty(E) &&
              ((a = e[E]), a !== void 0 && Vi(l, t, E, a, e, void 0));
          return;
        }
    }
    for (i in e)
      e.hasOwnProperty(i) && ((a = e[i]), a != null && vl(l, t, i, a, e, null));
  }
  function T0(l, t, e, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null,
          n = null,
          c = null,
          i = null,
          f = null,
          h = null,
          E = null;
        for (b in e) {
          var M = e[b];
          if (e.hasOwnProperty(b) && M != null)
            switch (b) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                f = M;
              default:
                a.hasOwnProperty(b) || vl(l, t, b, null, a, M);
            }
        }
        for (var g in a) {
          var b = a[g];
          if (((M = e[g]), a.hasOwnProperty(g) && (b != null || M != null)))
            switch (g) {
              case "type":
                n = b;
                break;
              case "name":
                u = b;
                break;
              case "checked":
                h = b;
                break;
              case "defaultChecked":
                E = b;
                break;
              case "value":
                c = b;
                break;
              case "defaultValue":
                i = b;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (b != null) throw Error(o(137, t));
                break;
              default:
                b !== M && vl(l, t, g, b, a, M);
            }
        }
        ec(l, c, i, f, h, E, n, u);
        return;
      case "select":
        b = c = i = g = null;
        for (n in e)
          if (((f = e[n]), e.hasOwnProperty(n) && f != null))
            switch (n) {
              case "value":
                break;
              case "multiple":
                b = f;
              default:
                a.hasOwnProperty(n) || vl(l, t, n, null, a, f);
            }
        for (u in a)
          if (
            ((n = a[u]),
            (f = e[u]),
            a.hasOwnProperty(u) && (n != null || f != null))
          )
            switch (u) {
              case "value":
                g = n;
                break;
              case "defaultValue":
                i = n;
                break;
              case "multiple":
                c = n;
              default:
                n !== f && vl(l, t, u, n, a, f);
            }
        (t = i),
          (e = c),
          (a = b),
          g != null
            ? We(l, !!e, g, !1)
            : !!a != !!e &&
              (t != null ? We(l, !!e, t, !0) : We(l, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        b = g = null;
        for (i in e)
          if (
            ((u = e[i]),
            e.hasOwnProperty(i) && u != null && !a.hasOwnProperty(i))
          )
            switch (i) {
              case "value":
                break;
              case "children":
                break;
              default:
                vl(l, t, i, null, a, u);
            }
        for (c in a)
          if (
            ((u = a[c]),
            (n = e[c]),
            a.hasOwnProperty(c) && (u != null || n != null))
          )
            switch (c) {
              case "value":
                g = u;
                break;
              case "defaultValue":
                b = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(o(91));
                break;
              default:
                u !== n && vl(l, t, c, u, a, n);
            }
        Bf(l, g, b);
        return;
      case "option":
        for (var q in e)
          (g = e[q]),
            e.hasOwnProperty(q) &&
              g != null &&
              !a.hasOwnProperty(q) &&
              (q === "selected" ? (l.selected = !1) : vl(l, t, q, null, a, g));
        for (f in a)
          (g = a[f]),
            (b = e[f]),
            a.hasOwnProperty(f) &&
              g !== b &&
              (g != null || b != null) &&
              (f === "selected"
                ? (l.selected =
                    g && typeof g != "function" && typeof g != "symbol")
                : vl(l, t, f, g, a, b));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var V in e)
          (g = e[V]),
            e.hasOwnProperty(V) &&
              g != null &&
              !a.hasOwnProperty(V) &&
              vl(l, t, V, null, a, g);
        for (h in a)
          if (
            ((g = a[h]),
            (b = e[h]),
            a.hasOwnProperty(h) && g !== b && (g != null || b != null))
          )
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (g != null) throw Error(o(137, t));
                break;
              default:
                vl(l, t, h, g, a, b);
            }
        return;
      default:
        if (uc(t)) {
          for (var hl in e)
            (g = e[hl]),
              e.hasOwnProperty(hl) &&
                g !== void 0 &&
                !a.hasOwnProperty(hl) &&
                Vi(l, t, hl, void 0, a, g);
          for (E in a)
            (g = a[E]),
              (b = e[E]),
              !a.hasOwnProperty(E) ||
                g === b ||
                (g === void 0 && b === void 0) ||
                Vi(l, t, E, g, a, b);
          return;
        }
    }
    for (var m in e)
      (g = e[m]),
        e.hasOwnProperty(m) &&
          g != null &&
          !a.hasOwnProperty(m) &&
          vl(l, t, m, null, a, g);
    for (M in a)
      (g = a[M]),
        (b = e[M]),
        !a.hasOwnProperty(M) ||
          g === b ||
          (g == null && b == null) ||
          vl(l, t, M, g, a, b);
  }
  function Xd(l) {
    switch (l) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function A0() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var l = 0, t = 0, e = performance.getEntriesByType("resource"), a = 0;
        a < e.length;
        a++
      ) {
        var u = e[a],
          n = u.transferSize,
          c = u.initiatorType,
          i = u.duration;
        if (n && i && Xd(c)) {
          for (c = 0, i = u.responseEnd, a += 1; a < e.length; a++) {
            var f = e[a],
              h = f.startTime;
            if (h > i) break;
            var E = f.transferSize,
              M = f.initiatorType;
            E &&
              Xd(M) &&
              ((f = f.responseEnd), (c += E * (f < i ? 1 : (i - h) / (f - h))));
          }
          if ((--a, (t += (8 * (n + c)) / (u.duration / 1e3)), l++, 10 < l))
            break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection &&
      ((l = navigator.connection.downlink), typeof l == "number")
      ? l
      : 5;
  }
  var Ki = null,
    Ji = null;
  function Un(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Qd(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Zd(l, t) {
    if (l === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && t === "foreignObject" ? 0 : l;
  }
  function wi(l, t) {
    return (
      l === "textarea" ||
      l === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Wi = null;
  function M0() {
    var l = window.event;
    return l && l.type === "popstate"
      ? l === Wi
        ? !1
        : ((Wi = l), !0)
      : ((Wi = null), !1);
  }
  var Vd = typeof setTimeout == "function" ? setTimeout : void 0,
    _0 = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Kd = typeof Promise == "function" ? Promise : void 0,
    D0 =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Kd < "u"
          ? function (l) {
              return Kd.resolve(null).then(l).catch(O0);
            }
          : Vd;
  function O0(l) {
    setTimeout(function () {
      throw l;
    });
  }
  function ge(l) {
    return l === "head";
  }
  function Jd(l, t) {
    var e = t,
      a = 0;
    do {
      var u = e.nextSibling;
      if ((l.removeChild(e), u && u.nodeType === 8))
        if (((e = u.data), e === "/$" || e === "/&")) {
          if (a === 0) {
            l.removeChild(u), _a(t);
            return;
          }
          a--;
        } else if (
          e === "$" ||
          e === "$?" ||
          e === "$~" ||
          e === "$!" ||
          e === "&"
        )
          a++;
        else if (e === "html") hu(l.ownerDocument.documentElement);
        else if (e === "head") {
          (e = l.ownerDocument.head), hu(e);
          for (var n = e.firstChild; n; ) {
            var c = n.nextSibling,
              i = n.nodeName;
            n[xa] ||
              i === "SCRIPT" ||
              i === "STYLE" ||
              (i === "LINK" && n.rel.toLowerCase() === "stylesheet") ||
              e.removeChild(n),
              (n = c);
          }
        } else e === "body" && hu(l.ownerDocument.body);
      e = u;
    } while (e);
    _a(t);
  }
  function wd(l, t) {
    var e = l;
    l = 0;
    do {
      var a = e.nextSibling;
      if (
        (e.nodeType === 1
          ? t
            ? ((e._stashedDisplay = e.style.display),
              (e.style.display = "none"))
            : ((e.style.display = e._stashedDisplay || ""),
              e.getAttribute("style") === "" && e.removeAttribute("style"))
          : e.nodeType === 3 &&
            (t
              ? ((e._stashedText = e.nodeValue), (e.nodeValue = ""))
              : (e.nodeValue = e._stashedText || "")),
        a && a.nodeType === 8)
      )
        if (((e = a.data), e === "/$")) {
          if (l === 0) break;
          l--;
        } else (e !== "$" && e !== "$?" && e !== "$~" && e !== "$!") || l++;
      e = a;
    } while (e);
  }
  function $i(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var e = t;
      switch (((t = t.nextSibling), e.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          $i(e), lc(e);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (e.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(e);
    }
  }
  function U0(l, t, e, a) {
    for (; l.nodeType === 1; ) {
      var u = e;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden")) break;
      } else if (a) {
        if (!l[xa])
          switch (t) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (
                ((n = l.getAttribute("rel")),
                n === "stylesheet" && l.hasAttribute("data-precedence"))
              )
                break;
              if (
                n !== u.rel ||
                l.getAttribute("href") !==
                  (u.href == null || u.href === "" ? null : u.href) ||
                l.getAttribute("crossorigin") !==
                  (u.crossOrigin == null ? null : u.crossOrigin) ||
                l.getAttribute("title") !== (u.title == null ? null : u.title)
              )
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (
                ((n = l.getAttribute("src")),
                (n !== (u.src == null ? null : u.src) ||
                  l.getAttribute("type") !== (u.type == null ? null : u.type) ||
                  l.getAttribute("crossorigin") !==
                    (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  n &&
                  l.hasAttribute("async") &&
                  !l.hasAttribute("itemprop"))
              )
                break;
              return l;
            default:
              return l;
          }
      } else if (t === "input" && l.type === "hidden") {
        var n = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && l.getAttribute("name") === n) return l;
      } else return l;
      if (((l = At(l.nextSibling)), l === null)) break;
    }
    return null;
  }
  function N0(l, t, e) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if (
        ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") &&
          !e) ||
        ((l = At(l.nextSibling)), l === null)
      )
        return null;
    return l;
  }
  function Wd(l, t) {
    for (; l.nodeType !== 8; )
      if (
        ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") &&
          !t) ||
        ((l = At(l.nextSibling)), l === null)
      )
        return null;
    return l;
  }
  function ki(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function Fi(l) {
    return (
      l.data === "$!" ||
      (l.data === "$?" && l.ownerDocument.readyState !== "loading")
    );
  }
  function R0(l, t) {
    var e = l.ownerDocument;
    if (l.data === "$~") l._reactRetry = t;
    else if (l.data !== "$?" || e.readyState !== "loading") t();
    else {
      var a = function () {
        t(), e.removeEventListener("DOMContentLoaded", a);
      };
      e.addEventListener("DOMContentLoaded", a), (l._reactRetry = a);
    }
  }
  function At(l) {
    for (; l != null; l = l.nextSibling) {
      var t = l.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = l.data),
          t === "$" ||
            t === "$!" ||
            t === "$?" ||
            t === "$~" ||
            t === "&" ||
            t === "F!" ||
            t === "F")
        )
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return l;
  }
  var Ii = null;
  function $d(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "/$" || e === "/&") {
          if (t === 0) return At(l.nextSibling);
          t--;
        } else
          (e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&") ||
            t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function kd(l) {
    l = l.previousSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&") {
          if (t === 0) return l;
          t--;
        } else (e !== "/$" && e !== "/&") || t++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function Fd(l, t, e) {
    switch (((t = Un(e)), l)) {
      case "html":
        if (((l = t.documentElement), !l)) throw Error(o(452));
        return l;
      case "head":
        if (((l = t.head), !l)) throw Error(o(453));
        return l;
      case "body":
        if (((l = t.body), !l)) throw Error(o(454));
        return l;
      default:
        throw Error(o(451));
    }
  }
  function hu(l) {
    for (var t = l.attributes; t.length; ) l.removeAttributeNode(t[0]);
    lc(l);
  }
  var Mt = new Map(),
    Id = new Set();
  function Nn(l) {
    return typeof l.getRootNode == "function"
      ? l.getRootNode()
      : l.nodeType === 9
        ? l
        : l.ownerDocument;
  }
  var Ft = p.d;
  p.d = { f: j0, r: x0, D: H0, C: C0, L: B0, m: q0, X: G0, S: Y0, M: L0 };
  function j0() {
    var l = Ft.f(),
      t = En();
    return l || t;
  }
  function x0(l) {
    var t = Ke(l);
    t !== null && t.tag === 5 && t.type === "form" ? ho(t) : Ft.r(l);
  }
  var Ta = typeof document > "u" ? null : document;
  function Pd(l, t, e) {
    var a = Ta;
    if (a && typeof t == "string" && t) {
      var u = gt(t);
      (u = 'link[rel="' + l + '"][href="' + u + '"]'),
        typeof e == "string" && (u += '[crossorigin="' + e + '"]'),
        Id.has(u) ||
          (Id.add(u),
          (l = { rel: l, crossOrigin: e, href: t }),
          a.querySelector(u) === null &&
            ((t = a.createElement("link")),
            Zl(t, "link", l),
            ql(t),
            a.head.appendChild(t)));
    }
  }
  function H0(l) {
    Ft.D(l), Pd("dns-prefetch", l, null);
  }
  function C0(l, t) {
    Ft.C(l, t), Pd("preconnect", l, t);
  }
  function B0(l, t, e) {
    Ft.L(l, t, e);
    var a = Ta;
    if (a && l && t) {
      var u = 'link[rel="preload"][as="' + gt(t) + '"]';
      t === "image" && e && e.imageSrcSet
        ? ((u += '[imagesrcset="' + gt(e.imageSrcSet) + '"]'),
          typeof e.imageSizes == "string" &&
            (u += '[imagesizes="' + gt(e.imageSizes) + '"]'))
        : (u += '[href="' + gt(l) + '"]');
      var n = u;
      switch (t) {
        case "style":
          n = Aa(l);
          break;
        case "script":
          n = Ma(l);
      }
      Mt.has(n) ||
        ((l = O(
          {
            rel: "preload",
            href: t === "image" && e && e.imageSrcSet ? void 0 : l,
            as: t,
          },
          e
        )),
        Mt.set(n, l),
        a.querySelector(u) !== null ||
          (t === "style" && a.querySelector(yu(n))) ||
          (t === "script" && a.querySelector(gu(n))) ||
          ((t = a.createElement("link")),
          Zl(t, "link", l),
          ql(t),
          a.head.appendChild(t)));
    }
  }
  function q0(l, t) {
    Ft.m(l, t);
    var e = Ta;
    if (e && l) {
      var a = t && typeof t.as == "string" ? t.as : "script",
        u =
          'link[rel="modulepreload"][as="' + gt(a) + '"][href="' + gt(l) + '"]',
        n = u;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = Ma(l);
      }
      if (
        !Mt.has(n) &&
        ((l = O({ rel: "modulepreload", href: l }, t)),
        Mt.set(n, l),
        e.querySelector(u) === null)
      ) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(gu(n))) return;
        }
        (a = e.createElement("link")),
          Zl(a, "link", l),
          ql(a),
          e.head.appendChild(a);
      }
    }
  }
  function Y0(l, t, e) {
    Ft.S(l, t, e);
    var a = Ta;
    if (a && l) {
      var u = Je(a).hoistableStyles,
        n = Aa(l);
      t = t || "default";
      var c = u.get(n);
      if (!c) {
        var i = { loading: 0, preload: null };
        if ((c = a.querySelector(yu(n)))) i.loading = 5;
        else {
          (l = O({ rel: "stylesheet", href: l, "data-precedence": t }, e)),
            (e = Mt.get(n)) && Pi(l, e);
          var f = (c = a.createElement("link"));
          ql(f),
            Zl(f, "link", l),
            (f._p = new Promise(function (h, E) {
              (f.onload = h), (f.onerror = E);
            })),
            f.addEventListener("load", function () {
              i.loading |= 1;
            }),
            f.addEventListener("error", function () {
              i.loading |= 2;
            }),
            (i.loading |= 4),
            Rn(c, t, a);
        }
        (c = { type: "stylesheet", instance: c, count: 1, state: i }),
          u.set(n, c);
      }
    }
  }
  function G0(l, t) {
    Ft.X(l, t);
    var e = Ta;
    if (e && l) {
      var a = Je(e).hoistableScripts,
        u = Ma(l),
        n = a.get(u);
      n ||
        ((n = e.querySelector(gu(u))),
        n ||
          ((l = O({ src: l, async: !0 }, t)),
          (t = Mt.get(u)) && lf(l, t),
          (n = e.createElement("script")),
          ql(n),
          Zl(n, "link", l),
          e.head.appendChild(n)),
        (n = { type: "script", instance: n, count: 1, state: null }),
        a.set(u, n));
    }
  }
  function L0(l, t) {
    Ft.M(l, t);
    var e = Ta;
    if (e && l) {
      var a = Je(e).hoistableScripts,
        u = Ma(l),
        n = a.get(u);
      n ||
        ((n = e.querySelector(gu(u))),
        n ||
          ((l = O({ src: l, async: !0, type: "module" }, t)),
          (t = Mt.get(u)) && lf(l, t),
          (n = e.createElement("script")),
          ql(n),
          Zl(n, "link", l),
          e.head.appendChild(n)),
        (n = { type: "script", instance: n, count: 1, state: null }),
        a.set(u, n));
    }
  }
  function lr(l, t, e, a) {
    var u = (u = Y.current) ? Nn(u) : null;
    if (!u) throw Error(o(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string"
          ? ((t = Aa(e.href)),
            (e = Je(u).hoistableStyles),
            (a = e.get(t)),
            a ||
              ((a = { type: "style", instance: null, count: 0, state: null }),
              e.set(t, a)),
            a)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          e.rel === "stylesheet" &&
          typeof e.href == "string" &&
          typeof e.precedence == "string"
        ) {
          l = Aa(e.href);
          var n = Je(u).hoistableStyles,
            c = n.get(l);
          if (
            (c ||
              ((u = u.ownerDocument || u),
              (c = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              n.set(l, c),
              (n = u.querySelector(yu(l))) &&
                !n._p &&
                ((c.instance = n), (c.state.loading = 5)),
              Mt.has(l) ||
                ((e = {
                  rel: "preload",
                  as: "style",
                  href: e.href,
                  crossOrigin: e.crossOrigin,
                  integrity: e.integrity,
                  media: e.media,
                  hrefLang: e.hrefLang,
                  referrerPolicy: e.referrerPolicy,
                }),
                Mt.set(l, e),
                n || X0(u, l, e, c.state))),
            t && a === null)
          )
            throw Error(o(528, ""));
          return c;
        }
        if (t && a !== null) throw Error(o(529, ""));
        return null;
      case "script":
        return (
          (t = e.async),
          (e = e.src),
          typeof e == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = Ma(e)),
              (e = Je(u).hoistableScripts),
              (a = e.get(t)),
              a ||
                ((a = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                e.set(t, a)),
              a)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(o(444, l));
    }
  }
  function Aa(l) {
    return 'href="' + gt(l) + '"';
  }
  function yu(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function tr(l) {
    return O({}, l, { "data-precedence": l.precedence, precedence: null });
  }
  function X0(l, t, e, a) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (a.loading = 1)
      : ((t = l.createElement("link")),
        (a.preload = t),
        t.addEventListener("load", function () {
          return (a.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (a.loading |= 2);
        }),
        Zl(t, "link", e),
        ql(t),
        l.head.appendChild(t));
  }
  function Ma(l) {
    return '[src="' + gt(l) + '"]';
  }
  function gu(l) {
    return "script[async]" + l;
  }
  function er(l, t, e) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var a = l.querySelector('style[data-href~="' + gt(e.href) + '"]');
          if (a) return (t.instance = a), ql(a), a;
          var u = O({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null,
          });
          return (
            (a = (l.ownerDocument || l).createElement("style")),
            ql(a),
            Zl(a, "style", u),
            Rn(a, e.precedence, l),
            (t.instance = a)
          );
        case "stylesheet":
          u = Aa(e.href);
          var n = l.querySelector(yu(u));
          if (n) return (t.state.loading |= 4), (t.instance = n), ql(n), n;
          (a = tr(e)),
            (u = Mt.get(u)) && Pi(a, u),
            (n = (l.ownerDocument || l).createElement("link")),
            ql(n);
          var c = n;
          return (
            (c._p = new Promise(function (i, f) {
              (c.onload = i), (c.onerror = f);
            })),
            Zl(n, "link", a),
            (t.state.loading |= 4),
            Rn(n, e.precedence, l),
            (t.instance = n)
          );
        case "script":
          return (
            (n = Ma(e.src)),
            (u = l.querySelector(gu(n)))
              ? ((t.instance = u), ql(u), u)
              : ((a = e),
                (u = Mt.get(n)) && ((a = O({}, e)), lf(a, u)),
                (l = l.ownerDocument || l),
                (u = l.createElement("script")),
                ql(u),
                Zl(u, "link", a),
                l.head.appendChild(u),
                (t.instance = u))
          );
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((a = t.instance), (t.state.loading |= 4), Rn(a, e.precedence, l));
    return t.instance;
  }
  function Rn(l, t, e) {
    for (
      var a = e.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        u = a.length ? a[a.length - 1] : null,
        n = u,
        c = 0;
      c < a.length;
      c++
    ) {
      var i = a[c];
      if (i.dataset.precedence === t) n = i;
      else if (n !== u) break;
    }
    n
      ? n.parentNode.insertBefore(l, n.nextSibling)
      : ((t = e.nodeType === 9 ? e.head : e), t.insertBefore(l, t.firstChild));
  }
  function Pi(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin),
      l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy),
      l.title == null && (l.title = t.title);
  }
  function lf(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin),
      l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy),
      l.integrity == null && (l.integrity = t.integrity);
  }
  var jn = null;
  function ar(l, t, e) {
    if (jn === null) {
      var a = new Map(),
        u = (jn = new Map());
      u.set(e, a);
    } else (u = jn), (a = u.get(e)), a || ((a = new Map()), u.set(e, a));
    if (a.has(l)) return a;
    for (
      a.set(l, null), e = e.getElementsByTagName(l), u = 0;
      u < e.length;
      u++
    ) {
      var n = e[u];
      if (
        !(
          n[xa] ||
          n[Gl] ||
          (l === "link" && n.getAttribute("rel") === "stylesheet")
        ) &&
        n.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var c = n.getAttribute(t) || "";
        c = l + c;
        var i = a.get(c);
        i ? i.push(n) : a.set(c, [n]);
      }
    }
    return a;
  }
  function ur(l, t, e) {
    (l = l.ownerDocument || l),
      l.head.insertBefore(
        e,
        t === "title" ? l.querySelector("head > title") : null
      );
  }
  function Q0(l, t, e) {
    if (e === 1 || t.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        return t.rel === "stylesheet"
          ? ((l = t.disabled), typeof t.precedence == "string" && l == null)
          : !0;
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function nr(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function Z0(l, t, e, a) {
    if (
      e.type === "stylesheet" &&
      (typeof a.media != "string" || matchMedia(a.media).matches !== !1) &&
      (e.state.loading & 4) === 0
    ) {
      if (e.instance === null) {
        var u = Aa(a.href),
          n = t.querySelector(yu(u));
        if (n) {
          (t = n._p),
            t !== null &&
              typeof t == "object" &&
              typeof t.then == "function" &&
              (l.count++, (l = xn.bind(l)), t.then(l, l)),
            (e.state.loading |= 4),
            (e.instance = n),
            ql(n);
          return;
        }
        (n = t.ownerDocument || t),
          (a = tr(a)),
          (u = Mt.get(u)) && Pi(a, u),
          (n = n.createElement("link")),
          ql(n);
        var c = n;
        (c._p = new Promise(function (i, f) {
          (c.onload = i), (c.onerror = f);
        })),
          Zl(n, "link", a),
          (e.instance = n);
      }
      l.stylesheets === null && (l.stylesheets = new Map()),
        l.stylesheets.set(e, t),
        (t = e.state.preload) &&
          (e.state.loading & 3) === 0 &&
          (l.count++,
          (e = xn.bind(l)),
          t.addEventListener("load", e),
          t.addEventListener("error", e));
    }
  }
  var tf = 0;
  function V0(l, t) {
    return (
      l.stylesheets && l.count === 0 && Cn(l, l.stylesheets),
      0 < l.count || 0 < l.imgCount
        ? function (e) {
            var a = setTimeout(function () {
              if ((l.stylesheets && Cn(l, l.stylesheets), l.unsuspend)) {
                var n = l.unsuspend;
                (l.unsuspend = null), n();
              }
            }, 6e4 + t);
            0 < l.imgBytes && tf === 0 && (tf = 62500 * A0());
            var u = setTimeout(
              function () {
                if (
                  ((l.waitingForImages = !1),
                  l.count === 0 &&
                    (l.stylesheets && Cn(l, l.stylesheets), l.unsuspend))
                ) {
                  var n = l.unsuspend;
                  (l.unsuspend = null), n();
                }
              },
              (l.imgBytes > tf ? 50 : 800) + t
            );
            return (
              (l.unsuspend = e),
              function () {
                (l.unsuspend = null), clearTimeout(a), clearTimeout(u);
              }
            );
          }
        : null
    );
  }
  function xn() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) Cn(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        (this.unsuspend = null), l();
      }
    }
  }
  var Hn = null;
  function Cn(l, t) {
    (l.stylesheets = null),
      l.unsuspend !== null &&
        (l.count++,
        (Hn = new Map()),
        t.forEach(K0, l),
        (Hn = null),
        xn.call(l));
  }
  function K0(l, t) {
    if (!(t.state.loading & 4)) {
      var e = Hn.get(l);
      if (e) var a = e.get(null);
      else {
        (e = new Map()), Hn.set(l, e);
        for (
          var u = l.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ),
            n = 0;
          n < u.length;
          n++
        ) {
          var c = u[n];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") &&
            (e.set(c.dataset.precedence, c), (a = c));
        }
        a && e.set(null, a);
      }
      (u = t.instance),
        (c = u.getAttribute("data-precedence")),
        (n = e.get(c) || a),
        n === a && e.set(null, u),
        e.set(c, u),
        this.count++,
        (a = xn.bind(this)),
        u.addEventListener("load", a),
        u.addEventListener("error", a),
        n
          ? n.parentNode.insertBefore(u, n.nextSibling)
          : ((l = l.nodeType === 9 ? l.head : l),
            l.insertBefore(u, l.firstChild)),
        (t.state.loading |= 4);
    }
  }
  var Su = {
    $$typeof: pl,
    Provider: null,
    Consumer: null,
    _currentValue: N,
    _currentValue2: N,
    _threadCount: 0,
  };
  function J0(l, t, e, a, u, n, c, i, f) {
    (this.tag = 1),
      (this.containerInfo = l),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = kn(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = kn(0)),
      (this.hiddenUpdates = kn(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = u),
      (this.onCaughtError = n),
      (this.onRecoverableError = c),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = f),
      (this.incompleteTransitions = new Map());
  }
  function cr(l, t, e, a, u, n, c, i, f, h, E, M) {
    return (
      (l = new J0(l, t, e, c, f, h, E, M, i)),
      (t = 1),
      n === !0 && (t |= 24),
      (n = ot(3, null, null, t)),
      (l.current = n),
      (n.stateNode = l),
      (t = Hc()),
      t.refCount++,
      (l.pooledCache = t),
      t.refCount++,
      (n.memoizedState = { element: a, isDehydrated: e, cache: t }),
      Yc(n),
      l
    );
  }
  function ir(l) {
    return l ? ((l = ea), l) : ea;
  }
  function fr(l, t, e, a, u, n) {
    (u = ir(u)),
      a.context === null ? (a.context = u) : (a.pendingContext = u),
      (a = ce(t)),
      (a.payload = { element: e }),
      (n = n === void 0 ? null : n),
      n !== null && (a.callback = n),
      (e = ie(l, a, t)),
      e !== null && (ut(e, l, t), ka(e, l, t));
  }
  function sr(l, t) {
    if (((l = l.memoizedState), l !== null && l.dehydrated !== null)) {
      var e = l.retryLane;
      l.retryLane = e !== 0 && e < t ? e : t;
    }
  }
  function ef(l, t) {
    sr(l, t), (l = l.alternate) && sr(l, t);
  }
  function or(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Ne(l, 67108864);
      t !== null && ut(t, l, 67108864), ef(l, 67108864);
    }
  }
  function dr(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = ht();
      t = Fn(t);
      var e = Ne(l, t);
      e !== null && ut(e, l, t), ef(l, t);
    }
  }
  var Bn = !0;
  function w0(l, t, e, a) {
    var u = r.T;
    r.T = null;
    var n = p.p;
    try {
      (p.p = 2), af(l, t, e, a);
    } finally {
      (p.p = n), (r.T = u);
    }
  }
  function W0(l, t, e, a) {
    var u = r.T;
    r.T = null;
    var n = p.p;
    try {
      (p.p = 8), af(l, t, e, a);
    } finally {
      (p.p = n), (r.T = u);
    }
  }
  function af(l, t, e, a) {
    if (Bn) {
      var u = uf(a);
      if (u === null) Zi(l, t, a, qn, e), mr(l, a);
      else if (k0(u, l, t, e, a)) a.stopPropagation();
      else if ((mr(l, a), t & 4 && -1 < $0.indexOf(l))) {
        for (; u !== null; ) {
          var n = Ke(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (((n = n.stateNode), n.current.memoizedState.isDehydrated)) {
                  var c = Me(n.pendingLanes);
                  if (c !== 0) {
                    var i = n;
                    for (i.pendingLanes |= 2, i.entangledLanes |= 2; c; ) {
                      var f = 1 << (31 - ft(c));
                      (i.entanglements[1] |= f), (c &= ~f);
                    }
                    xt(n), (fl & 6) === 0 && ((bn = ct() + 500), ru(0));
                  }
                }
                break;
              case 31:
              case 13:
                (i = Ne(n, 2)), i !== null && ut(i, n, 2), En(), ef(n, 2);
            }
          if (((n = uf(a)), n === null && Zi(l, t, a, qn, e), n === u)) break;
          u = n;
        }
        u !== null && a.stopPropagation();
      } else Zi(l, t, a, null, e);
    }
  }
  function uf(l) {
    return (l = cc(l)), nf(l);
  }
  var qn = null;
  function nf(l) {
    if (((qn = null), (l = Ve(l)), l !== null)) {
      var t = j(l);
      if (t === null) l = null;
      else {
        var e = t.tag;
        if (e === 13) {
          if (((l = B(t)), l !== null)) return l;
          l = null;
        } else if (e === 31) {
          if (((l = X(t)), l !== null)) return l;
          l = null;
        } else if (e === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return (qn = l), null;
  }
  function rr(l) {
    switch (l) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Hr()) {
          case bf:
            return 2;
          case pf:
            return 8;
          case Mu:
          case Cr:
            return 32;
          case Ef:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var cf = !1,
    Se = null,
    be = null,
    pe = null,
    bu = new Map(),
    pu = new Map(),
    Ee = [],
    $0 =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
  function mr(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        Se = null;
        break;
      case "dragenter":
      case "dragleave":
        be = null;
        break;
      case "mouseover":
      case "mouseout":
        pe = null;
        break;
      case "pointerover":
      case "pointerout":
        bu.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        pu.delete(t.pointerId);
    }
  }
  function Eu(l, t, e, a, u, n) {
    return l === null || l.nativeEvent !== n
      ? ((l = {
          blockedOn: t,
          domEventName: e,
          eventSystemFlags: a,
          nativeEvent: n,
          targetContainers: [u],
        }),
        t !== null && ((t = Ke(t)), t !== null && or(t)),
        l)
      : ((l.eventSystemFlags |= a),
        (t = l.targetContainers),
        u !== null && t.indexOf(u) === -1 && t.push(u),
        l);
  }
  function k0(l, t, e, a, u) {
    switch (t) {
      case "focusin":
        return (Se = Eu(Se, l, t, e, a, u)), !0;
      case "dragenter":
        return (be = Eu(be, l, t, e, a, u)), !0;
      case "mouseover":
        return (pe = Eu(pe, l, t, e, a, u)), !0;
      case "pointerover":
        var n = u.pointerId;
        return bu.set(n, Eu(bu.get(n) || null, l, t, e, a, u)), !0;
      case "gotpointercapture":
        return (
          (n = u.pointerId), pu.set(n, Eu(pu.get(n) || null, l, t, e, a, u)), !0
        );
    }
    return !1;
  }
  function vr(l) {
    var t = Ve(l.target);
    if (t !== null) {
      var e = j(t);
      if (e !== null) {
        if (((t = e.tag), t === 13)) {
          if (((t = B(e)), t !== null)) {
            (l.blockedOn = t),
              Df(l.priority, function () {
                dr(e);
              });
            return;
          }
        } else if (t === 31) {
          if (((t = X(e)), t !== null)) {
            (l.blockedOn = t),
              Df(l.priority, function () {
                dr(e);
              });
            return;
          }
        } else if (t === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function Yn(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var e = uf(l.nativeEvent);
      if (e === null) {
        e = l.nativeEvent;
        var a = new e.constructor(e.type, e);
        (nc = a), e.target.dispatchEvent(a), (nc = null);
      } else return (t = Ke(e)), t !== null && or(t), (l.blockedOn = e), !1;
      t.shift();
    }
    return !0;
  }
  function hr(l, t, e) {
    Yn(l) && e.delete(t);
  }
  function F0() {
    (cf = !1),
      Se !== null && Yn(Se) && (Se = null),
      be !== null && Yn(be) && (be = null),
      pe !== null && Yn(pe) && (pe = null),
      bu.forEach(hr),
      pu.forEach(hr);
  }
  function Gn(l, t) {
    l.blockedOn === t &&
      ((l.blockedOn = null),
      cf ||
        ((cf = !0),
        y.unstable_scheduleCallback(y.unstable_NormalPriority, F0)));
  }
  var Ln = null;
  function yr(l) {
    Ln !== l &&
      ((Ln = l),
      y.unstable_scheduleCallback(y.unstable_NormalPriority, function () {
        Ln === l && (Ln = null);
        for (var t = 0; t < l.length; t += 3) {
          var e = l[t],
            a = l[t + 1],
            u = l[t + 2];
          if (typeof a != "function") {
            if (nf(a || e) === null) continue;
            break;
          }
          var n = Ke(e);
          n !== null &&
            (l.splice(t, 3),
            (t -= 3),
            ui(n, { pending: !0, data: u, method: e.method, action: a }, a, u));
        }
      }));
  }
  function _a(l) {
    function t(f) {
      return Gn(f, l);
    }
    Se !== null && Gn(Se, l),
      be !== null && Gn(be, l),
      pe !== null && Gn(pe, l),
      bu.forEach(t),
      pu.forEach(t);
    for (var e = 0; e < Ee.length; e++) {
      var a = Ee[e];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < Ee.length && ((e = Ee[0]), e.blockedOn === null); )
      vr(e), e.blockedOn === null && Ee.shift();
    if (((e = (l.ownerDocument || l).$$reactFormReplay), e != null))
      for (a = 0; a < e.length; a += 3) {
        var u = e[a],
          n = e[a + 1],
          c = u[Il] || null;
        if (typeof n == "function") c || yr(e);
        else if (c) {
          var i = null;
          if (n && n.hasAttribute("formAction")) {
            if (((u = n), (c = n[Il] || null))) i = c.formAction;
            else if (nf(u) !== null) continue;
          } else i = c.action;
          typeof i == "function" ? (e[a + 1] = i) : (e.splice(a, 3), (a -= 3)),
            yr(e);
        }
      }
  }
  function gr() {
    function l(n) {
      n.canIntercept &&
        n.info === "react-transition" &&
        n.intercept({
          handler: function () {
            return new Promise(function (c) {
              return (u = c);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function t() {
      u !== null && (u(), (u = null)), a || setTimeout(e, 20);
    }
    function e() {
      if (!a && !navigation.transition) {
        var n = navigation.currentEntry;
        n &&
          n.url != null &&
          navigation.navigate(n.url, {
            state: n.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var a = !1,
        u = null;
      return (
        navigation.addEventListener("navigate", l),
        navigation.addEventListener("navigatesuccess", t),
        navigation.addEventListener("navigateerror", t),
        setTimeout(e, 100),
        function () {
          (a = !0),
            navigation.removeEventListener("navigate", l),
            navigation.removeEventListener("navigatesuccess", t),
            navigation.removeEventListener("navigateerror", t),
            u !== null && (u(), (u = null));
        }
      );
    }
  }
  function ff(l) {
    this._internalRoot = l;
  }
  (Xn.prototype.render = ff.prototype.render =
    function (l) {
      var t = this._internalRoot;
      if (t === null) throw Error(o(409));
      var e = t.current,
        a = ht();
      fr(e, a, l, t, null, null);
    }),
    (Xn.prototype.unmount = ff.prototype.unmount =
      function () {
        var l = this._internalRoot;
        if (l !== null) {
          this._internalRoot = null;
          var t = l.containerInfo;
          fr(l.current, 2, null, l, null, null), En(), (t[Ze] = null);
        }
      });
  function Xn(l) {
    this._internalRoot = l;
  }
  Xn.prototype.unstable_scheduleHydration = function (l) {
    if (l) {
      var t = _f();
      l = { blockedOn: null, target: l, priority: t };
      for (var e = 0; e < Ee.length && t !== 0 && t < Ee[e].priority; e++);
      Ee.splice(e, 0, l), e === 0 && vr(l);
    }
  };
  var Sr = U.version;
  if (Sr !== "19.2.3") throw Error(o(527, Sr, "19.2.3"));
  p.findDOMNode = function (l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function"
        ? Error(o(188))
        : ((l = Object.keys(l).join(",")), Error(o(268, l)));
    return (
      (l = S(t)),
      (l = l !== null ? H(l) : null),
      (l = l === null ? null : l.stateNode),
      l
    );
  };
  var I0 = {
    bundleType: 0,
    version: "19.2.3",
    rendererPackageName: "react-dom",
    currentDispatcherRef: r,
    reconcilerVersion: "19.2.3",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Qn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Qn.isDisabled && Qn.supportsFiber)
      try {
        (Na = Qn.inject(I0)), (it = Qn);
      } catch {}
  }
  return (
    (Tu.createRoot = function (l, t) {
      if (!R(l)) throw Error(o(299));
      var e = !1,
        a = "",
        u = Mo,
        n = _o,
        c = Do;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (e = !0),
          t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (u = t.onUncaughtError),
          t.onCaughtError !== void 0 && (n = t.onCaughtError),
          t.onRecoverableError !== void 0 && (c = t.onRecoverableError)),
        (t = cr(l, 1, !1, null, null, e, a, null, u, n, c, gr)),
        (l[Ze] = t.current),
        Qi(l),
        new ff(t)
      );
    }),
    (Tu.hydrateRoot = function (l, t, e) {
      if (!R(l)) throw Error(o(299));
      var a = !1,
        u = "",
        n = Mo,
        c = _o,
        i = Do,
        f = null;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (a = !0),
          e.identifierPrefix !== void 0 && (u = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (n = e.onUncaughtError),
          e.onCaughtError !== void 0 && (c = e.onCaughtError),
          e.onRecoverableError !== void 0 && (i = e.onRecoverableError),
          e.formState !== void 0 && (f = e.formState)),
        (t = cr(l, 1, !0, t, e ?? null, a, u, f, n, c, i, gr)),
        (t.context = ir(null)),
        (e = t.current),
        (a = ht()),
        (a = Fn(a)),
        (u = ce(a)),
        (u.callback = null),
        ie(e, u, a),
        (e = a),
        (t.current.lanes = e),
        ja(t, e),
        xt(t),
        (l[Ze] = t.current),
        Qi(l),
        new Xn(t)
      );
    }),
    (Tu.version = "19.2.3"),
    Tu
  );
}
var Or;
function fv() {
  if (Or) return df.exports;
  Or = 1;
  function y() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(y);
      } catch (U) {
        console.error(U);
      }
  }
  return y(), (df.exports = iv()), df.exports;
}
var sv = fv();
const ov = "/sandbox/poc-subtext/",
  dv = "https://r2.alprielse.xyz";
function Nr(y) {
  return `${dv}/sandbox/poc-subtext/public${y}`;
}
function rv(y) {
  return `${Nr(y)}/video.mp4`;
}
function mv(y, U) {
  return `${Nr(y)}/screenshots/${U}`;
}
const Oa = [
  {
    id: "simon-kim",
    name: "The Cost of Ambition",
    description: "Simon Kim on entrepreneurship and sacrifice",
    basePath: "/examples/simon-kim",
    creator: {
      handle: "@simonkim",
      instagramUrl: "https://www.instagram.com/simonkim/",
    },
  },
  {
    id: "alex-ke",
    name: "Seattle Center",
    description: "Alex Ke at Seattle Center",
    basePath: "/examples/alex-ke",
    creator: {
      handle: "@westcoastcapone",
      instagramUrl: "https://www.instagram.com/westcoastcapone/",
    },
  },
];
async function vv(y) {
  const U = `${ov}${y.basePath.replace(/^\//, "")}`,
    _ = await fetch(`${U}/manifest.json`);
  if (!_.ok)
    throw new Error(`Failed to fetch example manifest: ${_.statusText}`);
  const o = await _.json(),
    R = rv(y.basePath),
    j = await fetch(R);
  if (!j.ok) throw new Error(`Failed to fetch example video: ${j.statusText}`);
  const B = await j.blob(),
    X = await Promise.all(
      o.screenshots.map(async D => {
        try {
          const S = await fetch(mv(y.basePath, D.filename));
          if (S.ok) {
            const H = await S.blob(),
              O = await hv(H);
            return { ...D, dataUrl: O };
          }
        } catch (S) {
          console.warn(`Failed to load screenshot ${D.filename}:`, S);
        }
        return D;
      })
    );
  return { manifest: { ...o, screenshots: X }, videoBlob: B };
}
function hv(y) {
  return new Promise((U, _) => {
    const o = new FileReader();
    (o.onloadend = () => U(o.result)), (o.onerror = _), o.readAsDataURL(y);
  });
}
function yv(y) {
  return Oa.find(U => U.id === y);
}
function gv({
  onFileSelected: y,
  onLoadExample: U,
  modelLoading: _,
  modelProgress: o,
}) {
  const [R, j] = K.useState(!1),
    [B, X] = K.useState(!1),
    D = K.useCallback(L => {
      L.preventDefault(), j(!0);
    }, []),
    S = K.useCallback(L => {
      L.preventDefault(), j(!1);
    }, []),
    H = K.useCallback(
      L => {
        L.preventDefault(), j(!1);
        const W = L.dataTransfer.files;
        if (W.length > 0) {
          const sl = W[0];
          sl.type.startsWith("video/") && y(sl);
        }
      },
      [y]
    ),
    O = K.useCallback(
      L => {
        const W = L.target.files;
        W && W.length > 0 && y(W[0]);
      },
      [y]
    );
  return T.jsxs("div", {
    className: "upload-screen",
    children: [
      T.jsxs("div", {
        className: "app-header",
        children: [
          T.jsx("h1", { className: "app-title", children: "Subtext" }),
          T.jsx("p", {
            className: "app-subtitle",
            children:
              "Reverse-engineering the storytelling in short-form videos",
          }),
        ],
      }),
      T.jsxs("div", {
        className: `upload-zone ${R ? "dragging" : ""}`,
        onDragOver: D,
        onDragLeave: S,
        onDrop: H,
        children: [
          T.jsx("div", {
            className: "upload-icon",
            children: T.jsxs("svg", {
              width: "64",
              height: "64",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.5",
              children: [
                T.jsx("path", {
                  d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
                }),
                T.jsx("polyline", { points: "17 8 12 3 7 8" }),
                T.jsx("line", { x1: "12", y1: "3", x2: "12", y2: "15" }),
              ],
            }),
          }),
          T.jsx("h2", { children: "Upload a video" }),
          T.jsx("p", {
            className: "upload-hint",
            children: "Drag and drop a video file here, or click to browse",
          }),
          T.jsx("p", {
            className: "upload-formats",
            children: "Supports MP4, WebM, MOV",
          }),
          T.jsxs("label", {
            className: "upload-button",
            children: [
              T.jsx("input", {
                type: "file",
                accept: "video/*",
                onChange: O,
                hidden: !0,
              }),
              "Choose File",
            ],
          }),
          Oa.length > 0 &&
            T.jsxs("div", {
              className: "example-section",
              children: [
                T.jsx("span", {
                  className: "example-divider",
                  children: "or try an example",
                }),
                T.jsx("div", {
                  className: "example-buttons",
                  children: Oa.map(L =>
                    T.jsx(
                      "div",
                      {
                        className: "example-item",
                        children: T.jsxs("button", {
                          className: "example-button",
                          onClick: () => {
                            X(!0), U(L.id);
                          },
                          disabled: B,
                          children: [
                            L.creator &&
                              T.jsx("a", {
                                href: L.creator.instagramUrl,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "example-creator-link",
                                onClick: W => W.stopPropagation(),
                                children: L.creator.handle,
                              }),
                            B ? "Loading..." : L.name,
                          ],
                        }),
                      },
                      L.id
                    )
                  ),
                }),
              ],
            }),
        ],
      }),
      T.jsx("div", {
        className: "model-status",
        children: _
          ? T.jsxs(T.Fragment, {
              children: [
                T.jsx("div", { className: "model-status-indicator loading" }),
                T.jsxs("span", {
                  children: ["Loading transcription model video... ", o, "%"],
                }),
              ],
            })
          : T.jsxs(T.Fragment, {
              children: [
                T.jsx("div", { className: "model-status-indicator ready" }),
                T.jsx("span", { children: "Transcription model ready" }),
              ],
            }),
      }),
    ],
  });
}
function Sv(y) {
  switch (y) {
    case "idle":
      return "Preparing...";
    case "loading-model":
      return "Loading transcription model...";
    case "extracting-audio":
      return "Extracting audio...";
    case "transcribing":
      return "Transcribing speech...";
    case "detecting-scenes":
      return "Detecting scene cuts...";
    case "generating-thumbnails":
      return "Generating thumbnails...";
    case "complete":
      return "Processing complete!";
    default:
      return "Processing...";
  }
}
function bv({
  modelLoaded: y,
  modelProgress: U,
  processingStage: _,
  processingProgress: o,
  onViewResults: R,
  error: j,
  isLoadingExample: B,
}) {
  const X = _ === "complete";
  return (
    K.useEffect(() => {
      X && R();
    }, [X, R]),
    j
      ? T.jsx("div", {
          className: "processing-screen",
          children: T.jsx("div", {
            className: "processing-container",
            children: T.jsxs("div", {
              className: "processing-error",
              children: [
                T.jsx("div", { className: "error-icon", children: "!" }),
                T.jsx("h2", { children: "Processing Failed" }),
                T.jsx("p", { children: j }),
              ],
            }),
          }),
        })
      : B
        ? T.jsx("div", {
            className: "processing-screen",
            children: T.jsx("div", {
              className: "processing-container",
              children: T.jsxs("div", {
                className: "example-loading",
                children: [
                  T.jsx("div", { className: "loading-spinner" }),
                  T.jsx("p", {
                    children: "Loading example (this may take a minute)...",
                  }),
                ],
              }),
            }),
          })
        : T.jsx("div", {
            className: "processing-screen",
            children: T.jsxs("div", {
              className: "processing-container",
              children: [
                T.jsx("h1", { children: "Analyzing Video" }),
                T.jsxs("div", {
                  className: "progress-section",
                  children: [
                    T.jsxs("div", {
                      className: "progress-item",
                      children: [
                        T.jsxs("div", {
                          className: "progress-header",
                          children: [
                            T.jsx("span", {
                              className: "progress-label",
                              children: "Transcription Model",
                            }),
                            T.jsx("span", {
                              className: "progress-value",
                              children: y ? "Ready" : `${U}%`,
                            }),
                          ],
                        }),
                        T.jsx("div", {
                          className: "progress-bar",
                          children: T.jsx("div", {
                            className: `progress-fill ${y ? "complete" : ""}`,
                            style: { width: y ? "100%" : `${U}%` },
                          }),
                        }),
                      ],
                    }),
                    T.jsxs("div", {
                      className: "progress-item",
                      children: [
                        T.jsxs("div", {
                          className: "progress-header",
                          children: [
                            T.jsx("span", {
                              className: "progress-label",
                              children: Sv(_),
                            }),
                            T.jsx("span", {
                              className: "progress-value",
                              children: X ? "Done" : `${o}%`,
                            }),
                          ],
                        }),
                        T.jsx("div", {
                          className: "progress-bar",
                          children: T.jsx("div", {
                            className: `progress-fill ${X ? "complete" : ""}`,
                            style: { width: `${o}%` },
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          })
  );
}
async function pv(y) {
  return new Promise((U, _) => {
    const o = document.createElement("video");
    (o.preload = "metadata"), (o.muted = !0), (o.playsInline = !0);
    const R = URL.createObjectURL(y);
    (o.src = R),
      (o.onloadedmetadata = () => {
        U({
          video: o,
          metadata: {
            duration: o.duration,
            width: o.videoWidth,
            height: o.videoHeight,
            filename: y.name,
          },
        });
      }),
      (o.onerror = () => {
        URL.revokeObjectURL(R), _(new Error("Failed to load video metadata"));
      });
  });
}
async function Ev(y, U) {
  U?.(0);
  const _ = new AudioContext({ sampleRate: 16e3 });
  try {
    U?.(10);
    const o = await y.arrayBuffer();
    U?.(30);
    const R = await _.decodeAudioData(o);
    U?.(60);
    const j = R.numberOfChannels,
      B = R.length,
      X = R.sampleRate;
    if (X === 16e3 && j === 1) return U?.(100), R.getChannelData(0);
    const D = new Float32Array(B);
    for (let S = 0; S < B; S++) {
      let H = 0;
      for (let O = 0; O < j; O++) H += R.getChannelData(O)[S];
      D[S] = H / j;
    }
    if ((U?.(80), X !== 16e3)) {
      const S = zv(D, X, 16e3);
      return U?.(100), S;
    }
    return U?.(100), D;
  } finally {
    await _.close();
  }
}
function zv(y, U, _) {
  const o = U / _,
    R = Math.round(y.length / o),
    j = new Float32Array(R);
  for (let B = 0; B < R; B++) {
    const X = B * o,
      D = Math.floor(X),
      S = Math.min(D + 1, y.length - 1),
      H = X - D;
    j[B] = y[D] * (1 - H) + y[S] * H;
  }
  return j;
}
function Da(y) {
  const U = Math.floor(y / 60),
    _ = y % 60;
  return `${U}:${_.toFixed(2).padStart(5, "0")}`;
}
const Tv = "video-analyzer-db",
  Av = 1,
  Te = "videos";
let Zn = null;
function yf() {
  return (
    Zn ||
    ((Zn = new Promise((y, U) => {
      const _ = indexedDB.open(Tv, Av);
      (_.onerror = () => U(_.error)),
        (_.onsuccess = () => y(_.result)),
        (_.onupgradeneeded = o => {
          const R = o.target.result;
          R.objectStoreNames.contains(Te) ||
            R.createObjectStore(Te, { keyPath: "id" }).createIndex(
              "createdAt",
              "createdAt",
              { unique: !1 }
            );
        });
    })),
    Zn)
  );
}
async function Mv(y, U, _) {
  const o = await yf(),
    R = `video-${Date.now()}`,
    j = { id: R, name: y, manifest: U, videoBlob: _, createdAt: Date.now() };
  return new Promise((B, X) => {
    const H = o.transaction([Te], "readwrite").objectStore(Te).add(j);
    (H.onsuccess = () => B(R)), (H.onerror = () => X(H.error));
  });
}
async function _v(y) {
  const U = await yf();
  return new Promise((_, o) => {
    const B = U.transaction([Te], "readonly").objectStore(Te).get(y);
    (B.onsuccess = () => _(B.result || null)), (B.onerror = () => o(B.error));
  });
}
async function Dv() {
  const y = await yf();
  return new Promise((U, _) => {
    const j = y.transaction([Te], "readonly").objectStore(Te).getAll();
    (j.onsuccess = () => U(j.result || [])), (j.onerror = () => _(j.error));
  });
}
function Ov({
  currentVideoId: y,
  currentVideoName: U,
  onSelectExample: _,
  onSelectStoredVideo: o,
  onBackToUpload: R,
}) {
  const [j, B] = K.useState(!1),
    [X, D] = K.useState([]);
  K.useEffect(() => {
    Dv().then(D);
  }, [j]);
  const S = (H, O) => {
    B(!1), H === "example" ? _(O) : o(O);
  };
  return T.jsxs("div", {
    className: "video-selector-toolbar",
    children: [
      T.jsx("button", {
        className: "back-button",
        onClick: R,
        title: "Back to upload",
        children: "←",
      }),
      T.jsxs("div", {
        className: "video-dropdown",
        children: [
          T.jsxs("button", {
            className: "dropdown-trigger",
            onClick: () => B(!j),
            children: [
              T.jsx("span", { className: "current-video-name", children: U }),
              T.jsx("svg", {
                className: `dropdown-arrow ${j ? "open" : ""}`,
                width: "12",
                height: "12",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                children: T.jsx("path", { d: "M6 9l6 6 6-6" }),
              }),
            ],
          }),
          j &&
            T.jsxs("div", {
              className: "dropdown-menu",
              children: [
                Oa.length > 0 &&
                  T.jsxs("div", {
                    className: "dropdown-section",
                    children: [
                      T.jsx("div", {
                        className: "dropdown-section-label",
                        children: "Examples",
                      }),
                      Oa.map(H =>
                        T.jsxs(
                          "button",
                          {
                            className: `dropdown-item ${y === H.id ? "active" : ""}`,
                            onClick: () => S("example", H.id),
                            children: [
                              T.jsx("span", {
                                className: "item-name",
                                children: H.name,
                              }),
                              H.creator &&
                                T.jsx("a", {
                                  href: H.creator.instagramUrl,
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                  className: "item-creator-link",
                                  onClick: O => O.stopPropagation(),
                                  children: H.creator.handle,
                                }),
                            ],
                          },
                          H.id
                        )
                      ),
                    ],
                  }),
                X.length > 0 &&
                  T.jsxs("div", {
                    className: "dropdown-section",
                    children: [
                      T.jsx("div", {
                        className: "dropdown-section-label",
                        children: "My Videos",
                      }),
                      X.map(H =>
                        T.jsxs(
                          "button",
                          {
                            className: `dropdown-item ${y === H.id ? "active" : ""}`,
                            onClick: () => S("stored", H.id),
                            children: [
                              T.jsx("span", {
                                className: "item-name",
                                children: H.name,
                              }),
                              T.jsx("span", {
                                className: "item-description",
                                children: new Date(
                                  H.createdAt
                                ).toLocaleDateString(),
                              }),
                            ],
                          },
                          H.id
                        )
                      ),
                    ],
                  }),
                Oa.length === 0 &&
                  X.length === 0 &&
                  T.jsx("div", {
                    className: "dropdown-empty",
                    children: "No videos available",
                  }),
              ],
            }),
        ],
      }),
    ],
  });
}
function Uv({
  manifest: y,
  videoUrl: U,
  currentVideoId: _,
  currentVideoName: o,
  onSelectExample: R,
  onSelectStoredVideo: j,
  onBackToUpload: B,
}) {
  const X = K.useRef(null),
    D = K.useRef(null),
    S = K.useRef(null),
    H = K.useRef(null),
    [O, L] = K.useState(0),
    [W, sl] = K.useState(y.video.duration),
    [ol, nl] = K.useState(!1),
    [bl, Wl] = K.useState(1),
    [pl, Vl] = K.useState(400),
    [Bl, Hl] = K.useState(180),
    $ = K.useRef(!1),
    El = K.useRef(!1);
  K.useEffect(() => {
    const r = X.current;
    if (!r) return;
    let p,
      N = 0;
    const Q = 50,
      J = () => {
        const zl = performance.now();
        zl - N >= Q && (L(r.currentTime), (N = zl)),
          (p = requestAnimationFrame(J));
      },
      s = () => {
        cancelAnimationFrame(p), (p = requestAnimationFrame(J));
      },
      z = () => {
        cancelAnimationFrame(p);
      },
      x = () => sl(r.duration),
      C = () => {
        nl(!0), s();
      },
      w = () => {
        nl(!1), z(), L(r.currentTime);
      },
      Y = () => {
        nl(!1), z(), L(r.duration);
      },
      F = () => {
        r.paused && L(r.currentTime);
      },
      Ul = () => {
        nl(!r.paused), L(r.currentTime), sl(r.duration);
      };
    return (
      r.addEventListener("durationchange", x),
      r.addEventListener("play", C),
      r.addEventListener("playing", C),
      r.addEventListener("pause", w),
      r.addEventListener("ended", Y),
      r.addEventListener("timeupdate", F),
      r.addEventListener("loadeddata", Ul),
      nl(!r.paused),
      r.paused || s(),
      () => {
        r.removeEventListener("durationchange", x),
          r.removeEventListener("play", C),
          r.removeEventListener("playing", C),
          r.removeEventListener("pause", w),
          r.removeEventListener("ended", Y),
          r.removeEventListener("timeupdate", F),
          r.removeEventListener("loadeddata", Ul),
          z();
      }
    );
  }, [U]),
    K.useEffect(() => {
      if (!D.current) return;
      const r = Fl();
      if (r >= 0) {
        const p = D.current.querySelector(`[data-index="${r}"]`);
        p && p.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, [O]),
    K.useEffect(() => {
      const r = p => {
        p.target instanceof HTMLInputElement ||
          p.target instanceof HTMLTextAreaElement ||
          (p.code === "Space" && (p.preventDefault(), Ol()));
      };
      return (
        window.addEventListener("keydown", r),
        () => window.removeEventListener("keydown", r)
      );
    }, []);
  const Kl = K.useCallback(
      r => {
        r.preventDefault(),
          ($.current = !0),
          (document.body.style.cursor = "col-resize"),
          (document.body.style.userSelect = "none");
        const p = r.clientX,
          N = pl,
          Q = s => {
            if (!$.current) return;
            const z = Math.max(200, Math.min(800, N + (s.clientX - p)));
            Vl(z);
          },
          J = () => {
            ($.current = !1),
              (document.body.style.cursor = ""),
              (document.body.style.userSelect = ""),
              document.removeEventListener("mousemove", Q),
              document.removeEventListener("mouseup", J);
          };
        document.addEventListener("mousemove", Q),
          document.addEventListener("mouseup", J);
      },
      [pl]
    ),
    _t = K.useCallback(
      r => {
        r.preventDefault(),
          (El.current = !0),
          (document.body.style.cursor = "row-resize"),
          (document.body.style.userSelect = "none");
        const p = r.clientY,
          N = Bl,
          Q = s => {
            if (!El.current) return;
            const z = Math.max(100, Math.min(400, N - (s.clientY - p)));
            Hl(z);
          },
          J = () => {
            (El.current = !1),
              (document.body.style.cursor = ""),
              (document.body.style.userSelect = ""),
              document.removeEventListener("mousemove", Q),
              document.removeEventListener("mouseup", J);
          };
        document.addEventListener("mousemove", Q),
          document.addEventListener("mouseup", J);
      },
      [Bl]
    ),
    Jl = r => {
      X.current && ((X.current.currentTime = r), L(r));
    },
    Ol = () => {
      const r = X.current;
      r &&
        (r.paused
          ? r.play().catch(p => {
              console.warn("Video play failed:", p);
            })
          : r.pause());
    },
    nt = r => {
      if (!S.current || !H.current) return;
      const p = H.current,
        N = S.current.getBoundingClientRect(),
        Q = r.clientX - N.left + p.scrollLeft,
        J = N.width * bl,
        s = Q / J;
      Jl(s * W);
    },
    Fl = () => y.transcript.findIndex(r => O >= r.start && O < r.end),
    $l = () => {
      for (let r = y.screenshots.length - 1; r >= 0; r--)
        if (O >= y.screenshots[r].timestamp) return r;
      return 0;
    };
  return T.jsxs("div", {
    className: "app",
    children: [
      T.jsx(Ov, {
        currentVideoId: _,
        currentVideoName: o,
        onSelectExample: R,
        onSelectStoredVideo: j,
        onBackToUpload: B,
      }),
      T.jsxs("div", {
        className: "main-content",
        children: [
          T.jsxs("div", {
            className: "panel transcript-panel",
            style: { width: pl },
            children: [
              T.jsx("h2", { children: "Transcript" }),
              T.jsx("div", {
                className: "transcript-list",
                ref: D,
                children:
                  y.transcript.length === 0
                    ? T.jsx("div", {
                        className: "transcript-empty",
                        children: "No speech detected in video",
                      })
                    : y.transcript.map((r, p) =>
                        T.jsxs(
                          "div",
                          {
                            "data-index": p,
                            className: `transcript-segment ${Fl() === p ? "active" : ""}`,
                            onClick: () => Jl(r.start),
                            children: [
                              T.jsx("span", {
                                className: "timestamp",
                                children: Da(r.start),
                              }),
                              T.jsx("span", {
                                className: "text",
                                children: r.text,
                              }),
                            ],
                          },
                          p
                        )
                      ),
              }),
            ],
          }),
          T.jsx("div", {
            className: "resize-handle resize-handle-horizontal",
            onMouseDown: Kl,
          }),
          T.jsxs("div", {
            className: "panel video-panel",
            children: [
              T.jsx("h2", { children: "Video" }),
              T.jsxs("div", {
                className: "video-container",
                children: [
                  T.jsx("video", { ref: X, src: U, onClick: Ol }),
                  T.jsxs("div", {
                    className: "video-controls",
                    children: [
                      T.jsx("button", {
                        onClick: Ol,
                        className: "play-button",
                        children: ol ? "⏸" : "▶",
                      }),
                      T.jsxs("span", {
                        className: "time-display",
                        children: [Da(O), " / ", Da(W)],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      T.jsx("div", {
        className: "resize-handle resize-handle-vertical",
        onMouseDown: _t,
      }),
      T.jsxs("div", {
        className: "panel timeline-panel",
        style: { height: Bl },
        children: [
          T.jsxs("h2", {
            children: ["Timeline (", y.screenshots.length, " cuts)"],
          }),
          T.jsxs("div", {
            className: "timeline-container",
            children: [
              T.jsx("div", {
                className: "timeline-scroll",
                ref: H,
                children: T.jsxs("div", {
                  className: "timeline",
                  ref: S,
                  onClick: nt,
                  style: { width: `${bl * 100}%` },
                  children: [
                    T.jsx("div", {
                      className: "timeline-playhead",
                      style: { left: `${(O / W) * 100}%` },
                    }),
                    T.jsx("div", {
                      className: "timeline-clips",
                      children: y.screenshots.map((r, p) => {
                        const N = r.timestamp,
                          Q =
                            p < y.screenshots.length - 1
                              ? y.screenshots[p + 1].timestamp
                              : W,
                          J = Q - N,
                          s = (N / W) * 100,
                          z = (J / W) * 100;
                        return T.jsx(
                          "div",
                          {
                            className: `timeline-clip ${$l() === p ? "active" : ""}`,
                            style: { left: `${s}%`, width: `${z}%` },
                            onClick: x => {
                              x.stopPropagation(), Jl(r.timestamp);
                            },
                            title: `Clip ${p + 1}: ${Da(N)} - ${Da(Q)}`,
                            children: T.jsx("div", {
                              className: "clip-thumbnail",
                              children: r.dataUrl
                                ? T.jsx("img", {
                                    src: r.dataUrl,
                                    alt: `Scene at ${Da(r.timestamp)}`,
                                    loading: "lazy",
                                  })
                                : T.jsx("div", {
                                    className: "clip-placeholder",
                                  }),
                            }),
                          },
                          p
                        );
                      }),
                    }),
                  ],
                }),
              }),
              T.jsx("div", {
                className: "timeline-toolbar",
                children: T.jsxs("div", {
                  className: "zoom-control",
                  children: [
                    T.jsxs("svg", {
                      className: "zoom-icon",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      children: [
                        T.jsx("circle", { cx: "11", cy: "11", r: "8" }),
                        T.jsx("path", { d: "M21 21l-4.35-4.35" }),
                        T.jsx("path", { d: "M8 11h6" }),
                      ],
                    }),
                    T.jsx("input", {
                      type: "range",
                      min: "1",
                      max: "10",
                      step: "0.5",
                      value: bl,
                      onChange: r => Wl(parseFloat(r.target.value)),
                      className: "zoom-slider",
                    }),
                    T.jsxs("svg", {
                      className: "zoom-icon",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      children: [
                        T.jsx("circle", { cx: "11", cy: "11", r: "8" }),
                        T.jsx("path", { d: "M21 21l-4.35-4.35" }),
                        T.jsx("path", { d: "M11 8v6M8 11h6" }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function Ur(y, U, _) {
  (y /= 255), (U /= 255), (_ /= 255);
  const o = Math.max(y, U, _),
    R = Math.min(y, U, _),
    j = o - R;
  let B = 0;
  const X = o === 0 ? 0 : j / o,
    D = o;
  if (o !== R) {
    switch (o) {
      case y:
        B = (U - _) / j + (U < _ ? 6 : 0);
        break;
      case U:
        B = (_ - y) / j + 2;
        break;
      case _:
        B = (y - U) / j + 4;
        break;
    }
    B /= 6;
  }
  return { h: B, s: X, v: D };
}
function Nv(y, U) {
  const _ = y.data,
    o = U.data;
  let R = 0,
    j = 0,
    B = 0;
  const X = 4;
  let D = 0;
  for (let W = 0; W < _.length; W += 4 * X) {
    const sl = Ur(_[W], _[W + 1], _[W + 2]),
      ol = Ur(o[W], o[W + 1], o[W + 2]);
    let nl = Math.abs(sl.h - ol.h);
    nl > 0.5 && (nl = 1 - nl),
      (R += nl * 255),
      (j += Math.abs(sl.s - ol.s) * 255),
      (B += Math.abs(sl.v - ol.v) * 255),
      D++;
  }
  const S = R / D,
    H = j / D,
    O = B / D;
  return (S + H + O) / 3;
}
async function Rv(y, U, _, o) {
  return new Promise((R, j) => {
    const B = () => {
      y.removeEventListener("seeked", B),
        o.drawImage(y, 0, 0, _.width, _.height);
      const X = o.getImageData(0, 0, _.width, _.height);
      R(X);
    };
    y.addEventListener("seeked", B),
      (y.currentTime = Math.min(U, y.duration - 0.001)),
      setTimeout(() => {
        y.removeEventListener("seeked", B), j(new Error("Seek timeout"));
      }, 5e3);
  });
}
async function jv(y, U = {}, _) {
  const { threshold: o = 27, minSceneLength: R = 0.5, sampleRate: j = 2 } = U,
    B = y.duration,
    X = 1 / j,
    D = [{ timestamp: 0, score: 0 }],
    S = document.createElement("canvas"),
    H = Math.min(1, 320 / y.videoWidth);
  (S.width = Math.floor(y.videoWidth * H)),
    (S.height = Math.floor(y.videoHeight * H));
  const O = S.getContext("2d", { willReadFrequently: !0 });
  if (!O) throw new Error("Could not get canvas context");
  let L = null,
    W = 0,
    sl = 0;
  const ol = Math.ceil(B / X);
  for (let nl = 0; nl < B; nl += X)
    try {
      const bl = await Rv(y, nl, S, O);
      if (L && nl - W >= R) {
        const Wl = Nv(bl, L);
        Wl >= o && (D.push({ timestamp: nl, score: Wl }), (W = nl));
      }
      (L = bl), sl++, _ && _(Math.round((sl / ol) * 100));
    } catch {
      sl++;
    }
  return D;
}
async function xv(y, U, _ = 160, o) {
  return new Promise((R, j) => {
    const B = y.videoHeight / y.videoWidth,
      X = Math.round(_ * B),
      D = document.createElement("canvas");
    (D.width = _), (D.height = X);
    const S = D.getContext("2d");
    if (!S) {
      j(new Error("Could not get canvas context"));
      return;
    }
    const H = Math.min(U, y.duration - 0.001),
      O = () => {
        S.drawImage(y, 0, 0, _, X);
        const W = D.toDataURL("image/jpeg", 0.8);
        R(W);
      },
      L = () => {
        y.removeEventListener("seeked", L),
          requestAnimationFrame(() => {
            O();
          });
      };
    if (Math.abs(y.currentTime - H) < 0.1) {
      requestAnimationFrame(() => {
        O();
      });
      return;
    }
    y.addEventListener("seeked", L),
      (y.currentTime = H),
      setTimeout(() => {
        y.removeEventListener("seeked", L);
        try {
          O();
        } catch {
          j(new Error("Thumbnail generation timeout"));
        }
      }, 5e3);
  });
}
function Hv() {
  const [y, U] = K.useState("upload"),
    [_, o] = K.useState(null),
    [R, j] = K.useState(!1),
    [B, X] = K.useState(0),
    [D, S] = K.useState("idle"),
    [H, O] = K.useState(0),
    [L, W] = K.useState(null),
    [sl, ol] = K.useState(null),
    [nl, bl] = K.useState(null),
    [Wl, pl] = K.useState(""),
    [Vl, Bl] = K.useState(!1),
    Hl = K.useRef(null),
    $ = K.useRef(null),
    El = K.useRef(null),
    Kl = K.useRef(!1);
  K.useEffect(() => {
    const p = new Worker(
      new URL(
        "/sandbox/poc-subtext/assets/whisper.worker-Dbr6Sit4.js",
        import.meta.url
      ),
      { type: "module" }
    );
    return (
      (p.onmessage = N => {
        const { type: Q } = N.data;
        Q === "progress"
          ? X(N.data.progress)
          : Q === "ready"
            ? (j(!0), (Kl.current = !0), X(100))
            : Q === "result"
              ? $.current &&
                ($.current(N.data.data),
                ($.current = null),
                (El.current = null))
              : Q === "error" &&
                El.current &&
                (El.current(new Error(N.data.error)),
                ($.current = null),
                (El.current = null));
      }),
      (Hl.current = p),
      p.postMessage({ type: "load" }),
      () => {
        p.terminate();
      }
    );
  }, []);
  const _t = K.useCallback(async p => {
      U("processing"), ol(null), O(0);
      try {
        const N = URL.createObjectURL(p);
        o(N), S("extracting-audio");
        const { video: Q, metadata: J } = await pv(p);
        await new Promise(Y => {
          Q.readyState >= 3 ? Y() : (Q.oncanplay = () => Y());
        }),
          O(5);
        const s = await Ev(p, Y => {
          O(5 + Y * 0.15);
        });
        Kl.current ||
          (S("loading-model"),
          await new Promise(Y => {
            const F = () => {
              Kl.current ? Y() : setTimeout(F, 100);
            };
            F();
          })),
          S("transcribing"),
          O(20);
        const z = await new Promise((Y, F) => {
          ($.current = Y),
            (El.current = F),
            Hl.current?.postMessage({ type: "transcribe", audio: s });
        });
        O(50), S("detecting-scenes");
        const x = await jv(Q, { threshold: 27, minSceneLength: 0.5 }, Y => {
          O(50 + Y * 0.3);
        });
        O(80), S("generating-thumbnails");
        const C = [];
        for (let Y = 0; Y < x.length; Y++) {
          const F = x[Y],
            Ul = await xv(Q, F.timestamp);
          O(80 + ((Y + 1) / x.length) * 20),
            C.push({
              index: Y,
              timestamp: F.timestamp,
              filename: `scene_${Y}.jpg`,
              dataUrl: Ul,
            });
        }
        const w = {
          video: {
            filename: J.filename,
            duration: J.duration,
            width: J.width,
            height: J.height,
          },
          transcript: z,
          screenshots: C,
        };
        W(w), pl(J.filename), S("complete"), O(100);
        try {
          const Y = p,
            F = await Mv(J.filename, w, Y);
          bl(F);
        } catch (Y) {
          console.warn("Failed to save video to IndexedDB:", Y);
        }
      } catch (N) {
        ol(
          N instanceof Error ? N.message : "An error occurred during processing"
        ),
          S("idle");
      }
    }, []),
    Jl = K.useCallback(
      p => {
        _t(p);
      },
      [_t]
    ),
    Ol = K.useCallback(() => {
      U("results");
    }, []),
    nt = K.useCallback(async p => {
      const N = yv(p);
      if (N) {
        U("processing"), ol(null), Bl(!0), S("idle"), O(0);
        try {
          const { manifest: Q, videoBlob: J } = await vv(N),
            s = URL.createObjectURL(J);
          o(s), W(Q), bl(p), pl(N.name), Bl(!1), S("complete"), O(100);
        } catch (Q) {
          ol(Q instanceof Error ? Q.message : "Failed to load example"),
            Bl(!1),
            S("idle");
        }
      }
    }, []),
    Fl = K.useCallback(
      async p => {
        nl !== p && (await nt(p), U("results"));
      },
      [nl, nt]
    ),
    $l = K.useCallback(
      async p => {
        if (nl !== p)
          try {
            const N = await _v(p);
            if (!N) {
              ol("Video not found");
              return;
            }
            const Q = URL.createObjectURL(N.videoBlob);
            o(Q), W(N.manifest), bl(N.id), pl(N.name), U("results");
          } catch (N) {
            ol(N instanceof Error ? N.message : "Failed to load video");
          }
      },
      [nl]
    ),
    r = K.useCallback(() => {
      U("upload");
    }, []);
  return y === "upload"
    ? T.jsx(gv, {
        onFileSelected: Jl,
        onLoadExample: nt,
        modelLoading: !R,
        modelProgress: B,
      })
    : y === "processing"
      ? T.jsx(bv, {
          modelLoaded: R,
          modelProgress: B,
          processingStage: D,
          processingProgress: H,
          onViewResults: Ol,
          error: sl,
          isLoadingExample: Vl,
        })
      : y === "results" && L && _
        ? T.jsx(Uv, {
            manifest: L,
            videoUrl: _,
            currentVideoId: nl,
            currentVideoName: Wl,
            onSelectExample: Fl,
            onSelectStoredVideo: $l,
            onBackToUpload: r,
          })
        : T.jsx("div", {
            className: "error",
            children: "Something went wrong",
          });
}
sv.createRoot(document.getElementById("root")).render(
  T.jsx(K.StrictMode, { children: T.jsx(Hv, {}) })
);
