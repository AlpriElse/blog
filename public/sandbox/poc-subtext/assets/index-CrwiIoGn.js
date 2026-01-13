(function () {
  const N = document.createElement("link").relList;
  if (N && N.supports && N.supports("modulepreload")) return;
  for (const R of document.querySelectorAll('link[rel="modulepreload"]')) d(R);
  new MutationObserver(R => {
    for (const j of R)
      if (j.type === "childList")
        for (const C of j.addedNodes)
          C.tagName === "LINK" && C.rel === "modulepreload" && d(C);
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
  function d(R) {
    if (R.ep) return;
    R.ep = !0;
    const j = _(R);
    fetch(R.href, j);
  }
})();
var sf = { exports: {} },
  zu = {};
var br;
function P0() {
  if (br) return zu;
  br = 1;
  var g = Symbol.for("react.transitional.element"),
    N = Symbol.for("react.fragment");
  function _(d, R, j) {
    var C = null;
    if (
      (j !== void 0 && (C = "" + j),
      R.key !== void 0 && (C = "" + R.key),
      "key" in R)
    ) {
      j = {};
      for (var Q in R) Q !== "key" && (j[Q] = R[Q]);
    } else j = R;
    return (
      (R = j.ref),
      { $$typeof: g, type: d, key: C, ref: R !== void 0 ? R : null, props: j }
    );
  }
  return (zu.Fragment = N), (zu.jsx = _), (zu.jsxs = _), zu;
}
var pr;
function lv() {
  return pr || ((pr = 1), (sf.exports = P0())), sf.exports;
}
var A = lv(),
  of = { exports: {} },
  w = {};
var Er;
function tv() {
  if (Er) return w;
  Er = 1;
  var g = Symbol.for("react.transitional.element"),
    N = Symbol.for("react.portal"),
    _ = Symbol.for("react.fragment"),
    d = Symbol.for("react.strict_mode"),
    R = Symbol.for("react.profiler"),
    j = Symbol.for("react.consumer"),
    C = Symbol.for("react.context"),
    Q = Symbol.for("react.forward_ref"),
    D = Symbol.for("react.suspense"),
    S = Symbol.for("react.memo"),
    H = Symbol.for("react.lazy"),
    O = Symbol.for("react.activity"),
    G = Symbol.iterator;
  function K(o) {
    return o === null || typeof o != "object"
      ? null
      : ((o = (G && o[G]) || o["@@iterator"]),
        typeof o == "function" ? o : null);
  }
  var ol = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    dl = Object.assign,
    nl = {};
  function pl(o, E, x) {
    (this.props = o),
      (this.context = E),
      (this.refs = nl),
      (this.updater = x || ol);
  }
  (pl.prototype.isReactComponent = {}),
    (pl.prototype.setState = function (o, E) {
      if (typeof o != "object" && typeof o != "function" && o != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, o, E, "setState");
    }),
    (pl.prototype.forceUpdate = function (o) {
      this.updater.enqueueForceUpdate(this, o, "forceUpdate");
    });
  function Wl() {}
  Wl.prototype = pl.prototype;
  function El(o, E, x) {
    (this.props = o),
      (this.context = E),
      (this.refs = nl),
      (this.updater = x || ol);
  }
  var Ll = (El.prototype = new Wl());
  (Ll.constructor = El), dl(Ll, pl.prototype), (Ll.isPureReactComponent = !0);
  var Nl = Array.isArray;
  function Al() {}
  var W = { H: null, A: null, T: null, S: null },
    Dl = Object.prototype.hasOwnProperty;
  function kl(o, E, x) {
    var U = x.ref;
    return {
      $$typeof: g,
      type: o,
      key: E,
      ref: U !== void 0 ? U : null,
      props: x,
    };
  }
  function Ut(o, E) {
    return kl(o.type, E, o.props);
  }
  function ql(o) {
    return typeof o == "object" && o !== null && o.$$typeof === g;
  }
  function Rl(o) {
    var E = { "=": "=0", ":": "=2" };
    return (
      "$" +
      o.replace(/[=:]/g, function (x) {
        return E[x];
      })
    );
  }
  var Mt = /\/+/g;
  function Fl(o, E) {
    return typeof o == "object" && o !== null && o.key != null
      ? Rl("" + o.key)
      : E.toString(36);
  }
  function ul(o) {
    switch (o.status) {
      case "fulfilled":
        return o.value;
      case "rejected":
        throw o.reason;
      default:
        switch (
          (typeof o.status == "string"
            ? o.then(Al, Al)
            : ((o.status = "pending"),
              o.then(
                function (E) {
                  o.status === "pending" &&
                    ((o.status = "fulfilled"), (o.value = E));
                },
                function (E) {
                  o.status === "pending" &&
                    ((o.status = "rejected"), (o.reason = E));
                }
              )),
          o.status)
        ) {
          case "fulfilled":
            return o.value;
          case "rejected":
            throw o.reason;
        }
    }
    throw o;
  }
  function s(o, E, x, U, X) {
    var k = typeof o;
    (k === "undefined" || k === "boolean") && (o = null);
    var cl = !1;
    if (o === null) cl = !0;
    else
      switch (k) {
        case "bigint":
        case "string":
        case "number":
          cl = !0;
          break;
        case "object":
          switch (o.$$typeof) {
            case g:
            case N:
              cl = !0;
              break;
            case H:
              return (cl = o._init), s(cl(o._payload), E, x, U, X);
          }
      }
    if (cl)
      return (
        (X = X(o)),
        (cl = U === "" ? "." + Fl(o, 0) : U),
        Nl(X)
          ? ((x = ""),
            cl != null && (x = cl.replace(Mt, "$&/") + "/"),
            s(X, E, x, "", function (Ua) {
              return Ua;
            }))
          : X != null &&
            (ql(X) &&
              (X = Ut(
                X,
                x +
                  (X.key == null || (o && o.key === X.key)
                    ? ""
                    : ("" + X.key).replace(Mt, "$&/") + "/") +
                  cl
              )),
            E.push(X)),
        1
      );
    cl = 0;
    var Yl = U === "" ? "." : U + ":";
    if (Nl(o))
      for (var zl = 0; zl < o.length; zl++)
        (U = o[zl]), (k = Yl + Fl(U, zl)), (cl += s(U, E, x, k, X));
    else if (((zl = K(o)), typeof zl == "function"))
      for (o = zl.call(o), zl = 0; !(U = o.next()).done; )
        (U = U.value), (k = Yl + Fl(U, zl++)), (cl += s(U, E, x, k, X));
    else if (k === "object") {
      if (typeof o.then == "function") return s(ul(o), E, x, U, X);
      throw (
        ((E = String(o)),
        Error(
          "Objects are not valid as a React child (found: " +
            (E === "[object Object]"
              ? "object with keys {" + Object.keys(o).join(", ") + "}"
              : E) +
            "). If you meant to render a collection of children, use an array instead."
        ))
      );
    }
    return cl;
  }
  function z(o, E, x) {
    if (o == null) return o;
    var U = [],
      X = 0;
    return (
      s(o, U, "", "", function (k) {
        return E.call(x, k, X++);
      }),
      U
    );
  }
  function B(o) {
    if (o._status === -1) {
      var E = o._result;
      (E = E()),
        E.then(
          function (x) {
            (o._status === 0 || o._status === -1) &&
              ((o._status = 1), (o._result = x));
          },
          function (x) {
            (o._status === 0 || o._status === -1) &&
              ((o._status = 2), (o._result = x));
          }
        ),
        o._status === -1 && ((o._status = 0), (o._result = E));
    }
    if (o._status === 1) return o._result.default;
    throw o._result;
  }
  var J =
      typeof reportError == "function"
        ? reportError
        : function (o) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var E = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof o == "object" &&
                  o !== null &&
                  typeof o.message == "string"
                    ? String(o.message)
                    : String(o),
                error: o,
              });
              if (!window.dispatchEvent(E)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", o);
              return;
            }
            console.error(o);
          },
    $ = {
      map: z,
      forEach: function (o, E, x) {
        z(
          o,
          function () {
            E.apply(this, arguments);
          },
          x
        );
      },
      count: function (o) {
        var E = 0;
        return (
          z(o, function () {
            E++;
          }),
          E
        );
      },
      toArray: function (o) {
        return (
          z(o, function (E) {
            return E;
          }) || []
        );
      },
      only: function (o) {
        if (!ql(o))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return o;
      },
    };
  return (
    (w.Activity = O),
    (w.Children = $),
    (w.Component = pl),
    (w.Fragment = _),
    (w.Profiler = R),
    (w.PureComponent = El),
    (w.StrictMode = d),
    (w.Suspense = D),
    (w.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = W),
    (w.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (o) {
        return W.H.useMemoCache(o);
      },
    }),
    (w.cache = function (o) {
      return function () {
        return o.apply(null, arguments);
      };
    }),
    (w.cacheSignal = function () {
      return null;
    }),
    (w.cloneElement = function (o, E, x) {
      if (o == null)
        throw Error(
          "The argument must be a React element, but you passed " + o + "."
        );
      var U = dl({}, o.props),
        X = o.key;
      if (E != null)
        for (k in (E.key !== void 0 && (X = "" + E.key), E))
          !Dl.call(E, k) ||
            k === "key" ||
            k === "__self" ||
            k === "__source" ||
            (k === "ref" && E.ref === void 0) ||
            (U[k] = E[k]);
      var k = arguments.length - 2;
      if (k === 1) U.children = x;
      else if (1 < k) {
        for (var cl = Array(k), Yl = 0; Yl < k; Yl++)
          cl[Yl] = arguments[Yl + 2];
        U.children = cl;
      }
      return kl(o.type, X, U);
    }),
    (w.createContext = function (o) {
      return (
        (o = {
          $$typeof: C,
          _currentValue: o,
          _currentValue2: o,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (o.Provider = o),
        (o.Consumer = { $$typeof: j, _context: o }),
        o
      );
    }),
    (w.createElement = function (o, E, x) {
      var U,
        X = {},
        k = null;
      if (E != null)
        for (U in (E.key !== void 0 && (k = "" + E.key), E))
          Dl.call(E, U) &&
            U !== "key" &&
            U !== "__self" &&
            U !== "__source" &&
            (X[U] = E[U]);
      var cl = arguments.length - 2;
      if (cl === 1) X.children = x;
      else if (1 < cl) {
        for (var Yl = Array(cl), zl = 0; zl < cl; zl++)
          Yl[zl] = arguments[zl + 2];
        X.children = Yl;
      }
      if (o && o.defaultProps)
        for (U in ((cl = o.defaultProps), cl))
          X[U] === void 0 && (X[U] = cl[U]);
      return kl(o, k, X);
    }),
    (w.createRef = function () {
      return { current: null };
    }),
    (w.forwardRef = function (o) {
      return { $$typeof: Q, render: o };
    }),
    (w.isValidElement = ql),
    (w.lazy = function (o) {
      return { $$typeof: H, _payload: { _status: -1, _result: o }, _init: B };
    }),
    (w.memo = function (o, E) {
      return { $$typeof: S, type: o, compare: E === void 0 ? null : E };
    }),
    (w.startTransition = function (o) {
      var E = W.T,
        x = {};
      W.T = x;
      try {
        var U = o(),
          X = W.S;
        X !== null && X(x, U),
          typeof U == "object" &&
            U !== null &&
            typeof U.then == "function" &&
            U.then(Al, J);
      } catch (k) {
        J(k);
      } finally {
        E !== null && x.types !== null && (E.types = x.types), (W.T = E);
      }
    }),
    (w.unstable_useCacheRefresh = function () {
      return W.H.useCacheRefresh();
    }),
    (w.use = function (o) {
      return W.H.use(o);
    }),
    (w.useActionState = function (o, E, x) {
      return W.H.useActionState(o, E, x);
    }),
    (w.useCallback = function (o, E) {
      return W.H.useCallback(o, E);
    }),
    (w.useContext = function (o) {
      return W.H.useContext(o);
    }),
    (w.useDebugValue = function () {}),
    (w.useDeferredValue = function (o, E) {
      return W.H.useDeferredValue(o, E);
    }),
    (w.useEffect = function (o, E) {
      return W.H.useEffect(o, E);
    }),
    (w.useEffectEvent = function (o) {
      return W.H.useEffectEvent(o);
    }),
    (w.useId = function () {
      return W.H.useId();
    }),
    (w.useImperativeHandle = function (o, E, x) {
      return W.H.useImperativeHandle(o, E, x);
    }),
    (w.useInsertionEffect = function (o, E) {
      return W.H.useInsertionEffect(o, E);
    }),
    (w.useLayoutEffect = function (o, E) {
      return W.H.useLayoutEffect(o, E);
    }),
    (w.useMemo = function (o, E) {
      return W.H.useMemo(o, E);
    }),
    (w.useOptimistic = function (o, E) {
      return W.H.useOptimistic(o, E);
    }),
    (w.useReducer = function (o, E, x) {
      return W.H.useReducer(o, E, x);
    }),
    (w.useRef = function (o) {
      return W.H.useRef(o);
    }),
    (w.useState = function (o) {
      return W.H.useState(o);
    }),
    (w.useSyncExternalStore = function (o, E, x) {
      return W.H.useSyncExternalStore(o, E, x);
    }),
    (w.useTransition = function () {
      return W.H.useTransition();
    }),
    (w.version = "19.2.3"),
    w
  );
}
var zr;
function hf() {
  return zr || ((zr = 1), (of.exports = tv())), of.exports;
}
var V = hf(),
  df = { exports: {} },
  Tu = {},
  rf = { exports: {} },
  mf = {};
var Tr;
function ev() {
  return (
    Tr ||
      ((Tr = 1),
      (function (g) {
        function N(s, z) {
          var B = s.length;
          s.push(z);
          l: for (; 0 < B; ) {
            var J = (B - 1) >>> 1,
              $ = s[J];
            if (0 < R($, z)) (s[J] = z), (s[B] = $), (B = J);
            else break l;
          }
        }
        function _(s) {
          return s.length === 0 ? null : s[0];
        }
        function d(s) {
          if (s.length === 0) return null;
          var z = s[0],
            B = s.pop();
          if (B !== z) {
            s[0] = B;
            l: for (var J = 0, $ = s.length, o = $ >>> 1; J < o; ) {
              var E = 2 * (J + 1) - 1,
                x = s[E],
                U = E + 1,
                X = s[U];
              if (0 > R(x, B))
                U < $ && 0 > R(X, x)
                  ? ((s[J] = X), (s[U] = B), (J = U))
                  : ((s[J] = x), (s[E] = B), (J = E));
              else if (U < $ && 0 > R(X, B)) (s[J] = X), (s[U] = B), (J = U);
              else break l;
            }
          }
          return z;
        }
        function R(s, z) {
          var B = s.sortIndex - z.sortIndex;
          return B !== 0 ? B : s.id - z.id;
        }
        if (
          ((g.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var j = performance;
          g.unstable_now = function () {
            return j.now();
          };
        } else {
          var C = Date,
            Q = C.now();
          g.unstable_now = function () {
            return C.now() - Q;
          };
        }
        var D = [],
          S = [],
          H = 1,
          O = null,
          G = 3,
          K = !1,
          ol = !1,
          dl = !1,
          nl = !1,
          pl = typeof setTimeout == "function" ? setTimeout : null,
          Wl = typeof clearTimeout == "function" ? clearTimeout : null,
          El = typeof setImmediate < "u" ? setImmediate : null;
        function Ll(s) {
          for (var z = _(S); z !== null; ) {
            if (z.callback === null) d(S);
            else if (z.startTime <= s)
              d(S), (z.sortIndex = z.expirationTime), N(D, z);
            else break;
            z = _(S);
          }
        }
        function Nl(s) {
          if (((dl = !1), Ll(s), !ol))
            if (_(D) !== null) (ol = !0), Al || ((Al = !0), Rl());
            else {
              var z = _(S);
              z !== null && ul(Nl, z.startTime - s);
            }
        }
        var Al = !1,
          W = -1,
          Dl = 5,
          kl = -1;
        function Ut() {
          return nl ? !0 : !(g.unstable_now() - kl < Dl);
        }
        function ql() {
          if (((nl = !1), Al)) {
            var s = g.unstable_now();
            kl = s;
            var z = !0;
            try {
              l: {
                (ol = !1), dl && ((dl = !1), Wl(W), (W = -1)), (K = !0);
                var B = G;
                try {
                  t: {
                    for (
                      Ll(s), O = _(D);
                      O !== null && !(O.expirationTime > s && Ut());

                    ) {
                      var J = O.callback;
                      if (typeof J == "function") {
                        (O.callback = null), (G = O.priorityLevel);
                        var $ = J(O.expirationTime <= s);
                        if (((s = g.unstable_now()), typeof $ == "function")) {
                          (O.callback = $), Ll(s), (z = !0);
                          break t;
                        }
                        O === _(D) && d(D), Ll(s);
                      } else d(D);
                      O = _(D);
                    }
                    if (O !== null) z = !0;
                    else {
                      var o = _(S);
                      o !== null && ul(Nl, o.startTime - s), (z = !1);
                    }
                  }
                  break l;
                } finally {
                  (O = null), (G = B), (K = !1);
                }
                z = void 0;
              }
            } finally {
              z ? Rl() : (Al = !1);
            }
          }
        }
        var Rl;
        if (typeof El == "function")
          Rl = function () {
            El(ql);
          };
        else if (typeof MessageChannel < "u") {
          var Mt = new MessageChannel(),
            Fl = Mt.port2;
          (Mt.port1.onmessage = ql),
            (Rl = function () {
              Fl.postMessage(null);
            });
        } else
          Rl = function () {
            pl(ql, 0);
          };
        function ul(s, z) {
          W = pl(function () {
            s(g.unstable_now());
          }, z);
        }
        (g.unstable_IdlePriority = 5),
          (g.unstable_ImmediatePriority = 1),
          (g.unstable_LowPriority = 4),
          (g.unstable_NormalPriority = 3),
          (g.unstable_Profiling = null),
          (g.unstable_UserBlockingPriority = 2),
          (g.unstable_cancelCallback = function (s) {
            s.callback = null;
          }),
          (g.unstable_forceFrameRate = function (s) {
            0 > s || 125 < s
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (Dl = 0 < s ? Math.floor(1e3 / s) : 5);
          }),
          (g.unstable_getCurrentPriorityLevel = function () {
            return G;
          }),
          (g.unstable_next = function (s) {
            switch (G) {
              case 1:
              case 2:
              case 3:
                var z = 3;
                break;
              default:
                z = G;
            }
            var B = G;
            G = z;
            try {
              return s();
            } finally {
              G = B;
            }
          }),
          (g.unstable_requestPaint = function () {
            nl = !0;
          }),
          (g.unstable_runWithPriority = function (s, z) {
            switch (s) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                s = 3;
            }
            var B = G;
            G = s;
            try {
              return z();
            } finally {
              G = B;
            }
          }),
          (g.unstable_scheduleCallback = function (s, z, B) {
            var J = g.unstable_now();
            switch (
              (typeof B == "object" && B !== null
                ? ((B = B.delay),
                  (B = typeof B == "number" && 0 < B ? J + B : J))
                : (B = J),
              s)
            ) {
              case 1:
                var $ = -1;
                break;
              case 2:
                $ = 250;
                break;
              case 5:
                $ = 1073741823;
                break;
              case 4:
                $ = 1e4;
                break;
              default:
                $ = 5e3;
            }
            return (
              ($ = B + $),
              (s = {
                id: H++,
                callback: z,
                priorityLevel: s,
                startTime: B,
                expirationTime: $,
                sortIndex: -1,
              }),
              B > J
                ? ((s.sortIndex = B),
                  N(S, s),
                  _(D) === null &&
                    s === _(S) &&
                    (dl ? (Wl(W), (W = -1)) : (dl = !0), ul(Nl, B - J)))
                : ((s.sortIndex = $),
                  N(D, s),
                  ol || K || ((ol = !0), Al || ((Al = !0), Rl()))),
              s
            );
          }),
          (g.unstable_shouldYield = Ut),
          (g.unstable_wrapCallback = function (s) {
            var z = G;
            return function () {
              var B = G;
              G = z;
              try {
                return s.apply(this, arguments);
              } finally {
                G = B;
              }
            };
          });
      })(mf)),
    mf
  );
}
var Ar;
function av() {
  return Ar || ((Ar = 1), (rf.exports = ev())), rf.exports;
}
var vf = { exports: {} },
  wl = {};
var Mr;
function uv() {
  if (Mr) return wl;
  Mr = 1;
  var g = hf();
  function N(D) {
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
  var d = {
      d: {
        f: _,
        r: function () {
          throw Error(N(522));
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
  var C = g.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function Q(D, S) {
    if (D === "font") return "";
    if (typeof S == "string") return S === "use-credentials" ? S : "";
  }
  return (
    (wl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = d),
    (wl.createPortal = function (D, S) {
      var H =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!S || (S.nodeType !== 1 && S.nodeType !== 9 && S.nodeType !== 11))
        throw Error(N(299));
      return j(D, S, null, H);
    }),
    (wl.flushSync = function (D) {
      var S = C.T,
        H = d.p;
      try {
        if (((C.T = null), (d.p = 2), D)) return D();
      } finally {
        (C.T = S), (d.p = H), d.d.f();
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
        d.d.C(D, S));
    }),
    (wl.prefetchDNS = function (D) {
      typeof D == "string" && d.d.D(D);
    }),
    (wl.preinit = function (D, S) {
      if (typeof D == "string" && S && typeof S.as == "string") {
        var H = S.as,
          O = Q(H, S.crossOrigin),
          G = typeof S.integrity == "string" ? S.integrity : void 0,
          K = typeof S.fetchPriority == "string" ? S.fetchPriority : void 0;
        H === "style"
          ? d.d.S(D, typeof S.precedence == "string" ? S.precedence : void 0, {
              crossOrigin: O,
              integrity: G,
              fetchPriority: K,
            })
          : H === "script" &&
            d.d.X(D, {
              crossOrigin: O,
              integrity: G,
              fetchPriority: K,
              nonce: typeof S.nonce == "string" ? S.nonce : void 0,
            });
      }
    }),
    (wl.preinitModule = function (D, S) {
      if (typeof D == "string")
        if (typeof S == "object" && S !== null) {
          if (S.as == null || S.as === "script") {
            var H = Q(S.as, S.crossOrigin);
            d.d.M(D, {
              crossOrigin: H,
              integrity: typeof S.integrity == "string" ? S.integrity : void 0,
              nonce: typeof S.nonce == "string" ? S.nonce : void 0,
            });
          }
        } else S == null && d.d.M(D);
    }),
    (wl.preload = function (D, S) {
      if (
        typeof D == "string" &&
        typeof S == "object" &&
        S !== null &&
        typeof S.as == "string"
      ) {
        var H = S.as,
          O = Q(H, S.crossOrigin);
        d.d.L(D, H, {
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
          var H = Q(S.as, S.crossOrigin);
          d.d.m(D, {
            as: typeof S.as == "string" && S.as !== "script" ? S.as : void 0,
            crossOrigin: H,
            integrity: typeof S.integrity == "string" ? S.integrity : void 0,
          });
        } else d.d.m(D);
    }),
    (wl.requestFormReset = function (D) {
      d.d.r(D);
    }),
    (wl.unstable_batchedUpdates = function (D, S) {
      return D(S);
    }),
    (wl.useFormState = function (D, S, H) {
      return C.H.useFormState(D, S, H);
    }),
    (wl.useFormStatus = function () {
      return C.H.useHostTransitionStatus();
    }),
    (wl.version = "19.2.3"),
    wl
  );
}
var _r;
function nv() {
  if (_r) return vf.exports;
  _r = 1;
  function g() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(g);
      } catch (N) {
        console.error(N);
      }
  }
  return g(), (vf.exports = uv()), vf.exports;
}
var Dr;
function cv() {
  if (Dr) return Tu;
  Dr = 1;
  var g = av(),
    N = hf(),
    _ = nv();
  function d(l) {
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
  function C(l) {
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
  function Q(l) {
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
    if (j(l) !== l) throw Error(d(188));
  }
  function S(l) {
    var t = l.alternate;
    if (!t) {
      if (((t = j(l)), t === null)) throw Error(d(188));
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
        throw Error(d(188));
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
          if (!c) throw Error(d(189));
        }
      }
      if (e.alternate !== a) throw Error(d(190));
    }
    if (e.tag !== 3) throw Error(d(188));
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
    G = Symbol.for("react.element"),
    K = Symbol.for("react.transitional.element"),
    ol = Symbol.for("react.portal"),
    dl = Symbol.for("react.fragment"),
    nl = Symbol.for("react.strict_mode"),
    pl = Symbol.for("react.profiler"),
    Wl = Symbol.for("react.consumer"),
    El = Symbol.for("react.context"),
    Ll = Symbol.for("react.forward_ref"),
    Nl = Symbol.for("react.suspense"),
    Al = Symbol.for("react.suspense_list"),
    W = Symbol.for("react.memo"),
    Dl = Symbol.for("react.lazy"),
    kl = Symbol.for("react.activity"),
    Ut = Symbol.for("react.memo_cache_sentinel"),
    ql = Symbol.iterator;
  function Rl(l) {
    return l === null || typeof l != "object"
      ? null
      : ((l = (ql && l[ql]) || l["@@iterator"]),
        typeof l == "function" ? l : null);
  }
  var Mt = Symbol.for("react.client.reference");
  function Fl(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === Mt ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case dl:
        return "Fragment";
      case pl:
        return "Profiler";
      case nl:
        return "StrictMode";
      case Nl:
        return "Suspense";
      case Al:
        return "SuspenseList";
      case kl:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case ol:
          return "Portal";
        case El:
          return l.displayName || "Context";
        case Wl:
          return (l._context.displayName || "Context") + ".Consumer";
        case Ll:
          var t = l.render;
          return (
            (l = l.displayName),
            l ||
              ((l = t.displayName || t.name || ""),
              (l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef")),
            l
          );
        case W:
          return (
            (t = l.displayName || null), t !== null ? t : Fl(l.type) || "Memo"
          );
        case Dl:
          (t = l._payload), (l = l._init);
          try {
            return Fl(l(t));
          } catch {}
      }
    return null;
  }
  var ul = Array.isArray,
    s = N.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    z = _.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    B = { pending: !1, data: null, method: null, action: null },
    J = [],
    $ = -1;
  function o(l) {
    return { current: l };
  }
  function E(l) {
    0 > $ || ((l.current = J[$]), (J[$] = null), $--);
  }
  function x(l, t) {
    $++, (J[$] = l.current), (l.current = t);
  }
  var U = o(null),
    X = o(null),
    k = o(null),
    cl = o(null);
  function Yl(l, t) {
    switch ((x(k, t), x(X, l), x(U, null), t.nodeType)) {
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
    E(U), x(U, l);
  }
  function zl() {
    E(U), E(X), E(k);
  }
  function Ua(l) {
    l.memoizedState !== null && x(cl, l);
    var t = U.current,
      e = Zd(t, l.type);
    t !== e && (x(X, l), x(U, e));
  }
  function Au(l) {
    X.current === l && (E(U), E(X)),
      cl.current === l && (E(cl), (Su._currentValue = B));
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
                  var y = b;
                }
                Reflect.construct(l, [], M);
              } else {
                try {
                  M.call();
                } catch (b) {
                  y = b;
                }
                l.call(M.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (b) {
                y = b;
              }
              (M = l()) &&
                typeof M.catch == "function" &&
                M.catch(function () {});
            }
          } catch (b) {
            if (b && y && typeof b.stack == "string") return [b.stack, y.stack];
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
                  var p =
                    `
` + f[a].replace(" at new ", " at ");
                  return (
                    l.displayName &&
                      p.includes("<anonymous>") &&
                      (p = p.replace("<anonymous>", l.displayName)),
                    p
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
  function Nr(l, t) {
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
      do (t += Nr(l, e)), (e = l), (l = l.return);
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
    Wn = g.unstable_scheduleCallback,
    $n = g.unstable_cancelCallback,
    Rr = g.unstable_shouldYield,
    jr = g.unstable_requestPaint,
    nt = g.unstable_now,
    xr = g.unstable_getCurrentPriorityLevel,
    bf = g.unstable_ImmediatePriority,
    pf = g.unstable_UserBlockingPriority,
    Mu = g.unstable_NormalPriority,
    Hr = g.unstable_LowPriority,
    Ef = g.unstable_IdlePriority,
    Cr = g.log,
    Br = g.unstable_setDisableYieldValue,
    Na = null,
    ct = null;
  function It(l) {
    if (
      (typeof Cr == "function" && Br(l),
      ct && typeof ct.setStrictMode == "function")
    )
      try {
        ct.setStrictMode(Na, l);
      } catch {}
  }
  var it = Math.clz32 ? Math.clz32 : Gr,
    qr = Math.log,
    Yr = Math.LN2;
  function Gr(l) {
    return (l >>>= 0), l === 0 ? 32 : (31 - ((qr(l) / Yr) | 0)) | 0;
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
  function Lr(l, t, e, a, u, n) {
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
      var p = 31 - it(e),
        M = 1 << p;
      (i[p] = 0), (f[p] = -1);
      var y = h[p];
      if (y !== null)
        for (h[p] = null, p = 0; p < y.length; p++) {
          var b = y[p];
          b !== null && (b.lane &= -536870913);
        }
      e &= ~M;
    }
    a !== 0 && Tf(l, a, 0),
      n !== 0 && u === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(c & ~t));
  }
  function Tf(l, t, e) {
    (l.pendingLanes |= t), (l.suspendedLanes &= ~t);
    var a = 31 - it(t);
    (l.entangledLanes |= t),
      (l.entanglements[a] = l.entanglements[a] | 1073741824 | (e & 261930));
  }
  function Af(l, t) {
    var e = (l.entangledLanes |= t);
    for (l = l.entanglements; e; ) {
      var a = 31 - it(e),
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
    var l = z.p;
    return l !== 0 ? l : ((l = window.event), l === void 0 ? 32 : rr(l.type));
  }
  function Df(l, t) {
    var e = z.p;
    try {
      return (z.p = l), t();
    } finally {
      z.p = e;
    }
  }
  var Pt = Math.random().toString(36).slice(2),
    Ql = "__reactFiber$" + Pt,
    Il = "__reactProps$" + Pt,
    Ze = "__reactContainer$" + Pt,
    Pn = "__reactEvents$" + Pt,
    Qr = "__reactListeners$" + Pt,
    Zr = "__reactHandles$" + Pt,
    Of = "__reactResources$" + Pt,
    xa = "__reactMarker$" + Pt;
  function lc(l) {
    delete l[Ql], delete l[Il], delete l[Pn], delete l[Qr], delete l[Zr];
  }
  function Ve(l) {
    var t = l[Ql];
    if (t) return t;
    for (var e = l.parentNode; e; ) {
      if ((t = e[Ze] || e[Ql])) {
        if (
          ((e = t.alternate),
          t.child !== null || (e !== null && e.child !== null))
        )
          for (l = kd(l); l !== null; ) {
            if ((e = l[Ql])) return e;
            l = kd(l);
          }
        return t;
      }
      (l = e), (e = l.parentNode);
    }
    return null;
  }
  function Ke(l) {
    if ((l = l[Ql] || l[Ze])) {
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
    throw Error(d(33));
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
  function Gl(l) {
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
  var Vr = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    Rf = {},
    jf = {};
  function Kr(l) {
    return wn.call(jf, l)
      ? !0
      : wn.call(Rf, l)
        ? !1
        : Vr.test(l)
          ? (jf[l] = !0)
          : ((Rf[l] = !0), !1);
  }
  function Nu(l, t, e) {
    if (Kr(t))
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
  function ht(l) {
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
  function Jr(l, t, e) {
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
      l._valueTracker = Jr(l, t, "" + l[t]);
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
  var wr = /[\n"\\]/g;
  function yt(l) {
    return l.replace(wr, function (t) {
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
            (l.value = "" + ht(t))
          : l.value !== "" + ht(t) && (l.value = "" + ht(t))
        : (c !== "submit" && c !== "reset") || l.removeAttribute("value"),
      t != null
        ? ac(l, c, ht(t))
        : e != null
          ? ac(l, c, ht(e))
          : a != null && l.removeAttribute("value"),
      u == null && n != null && (l.defaultChecked = !!n),
      u != null &&
        (l.checked = u && typeof u != "function" && typeof u != "symbol"),
      i != null &&
      typeof i != "function" &&
      typeof i != "symbol" &&
      typeof i != "boolean"
        ? (l.name = "" + ht(i))
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
      (e = e != null ? "" + ht(e) : ""),
        (t = t != null ? "" + ht(t) : e),
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
      for (e = "" + ht(e), t = null, u = 0; u < l.length; u++) {
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
      ((t = "" + ht(t)), t !== l.value && (l.value = t), e == null)
    ) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = e != null ? "" + ht(e) : "";
  }
  function qf(l, t, e, a) {
    if (t == null) {
      if (a != null) {
        if (e != null) throw Error(d(92));
        if (ul(a)) {
          if (1 < a.length) throw Error(d(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), (t = e);
    }
    (e = ht(t)),
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
  var Wr = new Set(
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
        : typeof e != "number" || e === 0 || Wr.has(t)
          ? t === "float"
            ? (l.cssFloat = e)
            : (l[t] = ("" + e).trim())
          : (l[t] = e + "px");
  }
  function Gf(l, t, e) {
    if (t != null && typeof t != "object") throw Error(d(62));
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
  var $r = new Map([
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
    kr =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function xu(l) {
    return kr.test("" + l)
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
  function Xf(l) {
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
                'input[name="' + yt("" + t) + '"][type="radio"]'
              ),
                t = 0;
              t < e.length;
              t++
            ) {
              var a = e[t];
              if (a !== l && a.form === l.form) {
                var u = a[Il] || null;
                if (!u) throw Error(d(90));
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
  function Lf(l, t, e) {
    if (ic) return l(t, e);
    ic = !0;
    try {
      var a = l(t);
      return a;
    } finally {
      if (
        ((ic = !1),
        (ke !== null || Fe !== null) &&
          (En(), ke && ((t = ke), (l = Fe), (Fe = ke = null), Xf(t), l)))
      )
        for (t = 0; t < l.length; t++) Xf(l[t]);
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
    if (e && typeof e != "function") throw Error(d(231, t, typeof e));
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
    Fr = Pl(qa),
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
    Ir = O({}, Yu, { dataTransfer: 0 }),
    Pr = Pl(Ir),
    lm = O({}, qa, { relatedTarget: 0 }),
    rc = Pl(lm),
    tm = O({}, De, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    em = Pl(tm),
    am = O({}, De, {
      clipboardData: function (l) {
        return "clipboardData" in l ? l.clipboardData : window.clipboardData;
      },
    }),
    um = Pl(am),
    nm = O({}, De, { data: 0 }),
    Kf = Pl(nm),
    cm = {
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
    im = {
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
    fm = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function sm(l) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(l)
      : (l = fm[l])
        ? !!t[l]
        : !1;
  }
  function mc() {
    return sm;
  }
  var om = O({}, qa, {
      key: function (l) {
        if (l.key) {
          var t = cm[l.key] || l.key;
          if (t !== "Unidentified") return t;
        }
        return l.type === "keypress"
          ? ((l = Cu(l)), l === 13 ? "Enter" : String.fromCharCode(l))
          : l.type === "keydown" || l.type === "keyup"
            ? im[l.keyCode] || "Unidentified"
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
    dm = Pl(om),
    rm = O({}, Yu, {
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
    Jf = Pl(rm),
    mm = O({}, qa, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: mc,
    }),
    vm = Pl(mm),
    hm = O({}, De, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    ym = Pl(hm),
    gm = O({}, Yu, {
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
    Sm = Pl(gm),
    bm = O({}, De, { newState: 0, oldState: 0 }),
    pm = Pl(bm),
    Em = [9, 13, 27, 32],
    vc = Bt && "CompositionEvent" in window,
    Ga = null;
  Bt && "documentMode" in document && (Ga = document.documentMode);
  var zm = Bt && "TextEvent" in window && !Ga,
    wf = Bt && (!vc || (Ga && 8 < Ga && 11 >= Ga)),
    Wf = " ",
    $f = !1;
  function kf(l, t) {
    switch (l) {
      case "keyup":
        return Em.indexOf(t.keyCode) !== -1;
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
  function Tm(l, t) {
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
  function Am(l, t) {
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
  var Mm = {
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
    return t === "input" ? !!Mm[l.type] : t === "textarea";
  }
  function Pf(l, t, e, a) {
    ke ? (Fe ? Fe.push(a) : (Fe = [a])) : (ke = a),
      (t = On(t, "onChange")),
      0 < t.length &&
        ((e = new qu("onChange", "change", null, e, a)),
        l.push({ event: e, listeners: t }));
  }
  var Xa = null,
    La = null;
  function _m(l) {
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
    Xa && (Xa.detachEvent("onpropertychange", us), (La = Xa = null));
  }
  function us(l) {
    if (l.propertyName === "value" && Gu(La)) {
      var t = [];
      Pf(t, La, l, cc(l)), Lf(_m, t);
    }
  }
  function Dm(l, t, e) {
    l === "focusin"
      ? (as(), (Xa = t), (La = e), Xa.attachEvent("onpropertychange", us))
      : l === "focusout" && as();
  }
  function Om(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return Gu(La);
  }
  function Um(l, t) {
    if (l === "click") return Gu(t);
  }
  function Nm(l, t) {
    if (l === "input" || l === "change") return Gu(t);
  }
  function Rm(l, t) {
    return (l === t && (l !== 0 || 1 / l === 1 / t)) || (l !== l && t !== t);
  }
  var ft = typeof Object.is == "function" ? Object.is : Rm;
  function Qa(l, t) {
    if (ft(l, t)) return !0;
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
      if (!wn.call(t, u) || !ft(l[u], t[u])) return !1;
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
  var jm = Bt && "documentMode" in document && 11 >= document.documentMode,
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
    xm = Ue("transitionrun"),
    Hm = Ue("transitionstart"),
    Cm = Ue("transitioncancel"),
    vs = Ue("transitionend"),
    hs = new Map(),
    Ec =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  Ec.push("scrollEnd");
  function _t(l, t) {
    hs.set(l, t), _e(t, [l]);
  }
  var Xu =
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
    gt = [],
    ta = 0,
    zc = 0;
  function Lu() {
    for (var l = ta, t = (zc = ta = 0); t < l; ) {
      var e = gt[t];
      gt[t++] = null;
      var a = gt[t];
      gt[t++] = null;
      var u = gt[t];
      gt[t++] = null;
      var n = gt[t];
      if (((gt[t++] = null), a !== null && u !== null)) {
        var c = a.pending;
        c === null ? (u.next = u) : ((u.next = c.next), (c.next = u)),
          (a.pending = u);
      }
      n !== 0 && ys(e, u, n);
    }
  }
  function Qu(l, t, e, a) {
    (gt[ta++] = l),
      (gt[ta++] = t),
      (gt[ta++] = e),
      (gt[ta++] = a),
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
          ((u = 31 - it(e)),
          (l = n.hiddenUpdates),
          (a = l[u]),
          a === null ? (l[u] = [t]) : a.push(t),
          (t.lane = e | 536870912)),
        n)
      : null;
  }
  function Zu(l) {
    if (50 < du) throw ((du = 0), (ji = null), Error(d(185)));
    for (var t = l.return; t !== null; ) (l = t), (t = l.return);
    return l.tag === 3 ? l.stateNode : null;
  }
  var ea = {};
  function Bm(l, t, e, a) {
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
  function st(l, t, e, a) {
    return new Bm(l, t, e, a);
  }
  function Ac(l) {
    return (l = l.prototype), !(!l || !l.isReactComponent);
  }
  function qt(l, t) {
    var e = l.alternate;
    return (
      e === null
        ? ((e = st(l.tag, t, l.key, l.mode)),
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
      c = L0(l, e, U.current)
        ? 26
        : l === "html" || l === "head" || l === "body"
          ? 27
          : 5;
    else
      l: switch (l) {
        case kl:
          return (l = st(31, e, t, u)), (l.elementType = kl), (l.lanes = n), l;
        case dl:
          return Re(e.children, u, n, t);
        case nl:
          (c = 8), (u |= 24);
          break;
        case pl:
          return (
            (l = st(12, e, t, u | 2)), (l.elementType = pl), (l.lanes = n), l
          );
        case Nl:
          return (l = st(13, e, t, u)), (l.elementType = Nl), (l.lanes = n), l;
        case Al:
          return (l = st(19, e, t, u)), (l.elementType = Al), (l.lanes = n), l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case El:
                c = 10;
                break l;
              case Wl:
                c = 9;
                break l;
              case Ll:
                c = 11;
                break l;
              case W:
                c = 14;
                break l;
              case Dl:
                (c = 16), (a = null);
                break l;
            }
          (c = 29),
            (e = Error(d(130, l === null ? "null" : typeof l, ""))),
            (a = null);
      }
    return (
      (t = st(c, e, t, u)), (t.elementType = l), (t.type = a), (t.lanes = n), t
    );
  }
  function Re(l, t, e, a) {
    return (l = st(7, l, a, t)), (l.lanes = e), l;
  }
  function Mc(l, t, e) {
    return (l = st(6, l, null, t)), (l.lanes = e), l;
  }
  function Ss(l) {
    var t = st(18, null, null, 0);
    return (t.stateNode = l), t;
  }
  function _c(l, t, e) {
    return (
      (t = st(4, l.children !== null ? l.children : [], l.key, t)),
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
  function St(l, t) {
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
    bt = [],
    pt = 0,
    te = null,
    Nt = 1,
    Rt = "";
  function Yt(l, t) {
    (aa[ua++] = Va), (aa[ua++] = Ku), (Ku = l), (Va = t);
  }
  function ps(l, t, e) {
    (bt[pt++] = Nt), (bt[pt++] = Rt), (bt[pt++] = te), (te = l);
    var a = Nt;
    l = Rt;
    var u = 32 - it(a) - 1;
    (a &= ~(1 << u)), (e += 1);
    var n = 32 - it(t) + u;
    if (30 < n) {
      var c = u - (u % 5);
      (n = (a & ((1 << c) - 1)).toString(32)),
        (a >>= c),
        (u -= c),
        (Nt = (1 << (32 - it(t) + u)) | (e << u) | a),
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
      (te = bt[--pt]),
        (bt[pt] = null),
        (Rt = bt[--pt]),
        (bt[pt] = null),
        (Nt = bt[--pt]),
        (bt[pt] = null);
  }
  function Es(l, t) {
    (bt[pt++] = Nt),
      (bt[pt++] = Rt),
      (bt[pt++] = te),
      (Nt = t.id),
      (Rt = t.overflow),
      (te = l);
  }
  var Zl = null,
    Sl = null,
    al = !1,
    ee = null,
    Et = !1,
    Uc = Error(d(519));
  function ae(l) {
    var t = Error(
      d(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        ""
      )
    );
    throw (Ka(St(t, l)), Uc);
  }
  function zs(l) {
    var t = l.stateNode,
      e = l.type,
      a = l.memoizedProps;
    switch (((t[Ql] = l), (t[Il] = a), e)) {
      case "dialog":
        ll("cancel", t), ll("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        ll("load", t);
        break;
      case "video":
      case "audio":
        for (e = 0; e < mu.length; e++) ll(mu[e], t);
        break;
      case "source":
        ll("error", t);
        break;
      case "img":
      case "image":
      case "link":
        ll("error", t), ll("load", t);
        break;
      case "details":
        ll("toggle", t);
        break;
      case "input":
        ll("invalid", t),
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
        ll("invalid", t);
        break;
      case "textarea":
        ll("invalid", t), qf(t, a.value, a.defaultValue, a.children);
    }
    (e = a.children),
      (typeof e != "string" && typeof e != "number" && typeof e != "bigint") ||
      t.textContent === "" + e ||
      a.suppressHydrationWarning === !0 ||
      Xd(t.textContent, e)
        ? (a.popover != null && (ll("beforetoggle", t), ll("toggle", t)),
          a.onScroll != null && ll("scroll", t),
          a.onScrollEnd != null && ll("scrollend", t),
          a.onClick != null && (t.onclick = Ct),
          (t = !0))
        : (t = !1),
      t || ae(l, !0);
  }
  function Ts(l) {
    for (Zl = l.return; Zl; )
      switch (Zl.tag) {
        case 5:
        case 31:
        case 13:
          Et = !1;
          return;
        case 27:
        case 3:
          Et = !0;
          return;
        default:
          Zl = Zl.return;
      }
  }
  function na(l) {
    if (l !== Zl) return !1;
    if (!al) return Ts(l), (al = !0), !1;
    var t = l.tag,
      e;
    if (
      ((e = t !== 3 && t !== 27) &&
        ((e = t === 5) &&
          ((e = l.type),
          (e =
            !(e !== "form" && e !== "button") || wi(l.type, l.memoizedProps))),
        (e = !e)),
      e && Sl && ae(l),
      Ts(l),
      t === 13)
    ) {
      if (((l = l.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
        throw Error(d(317));
      Sl = $d(l);
    } else if (t === 31) {
      if (((l = l.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
        throw Error(d(317));
      Sl = $d(l);
    } else
      t === 27
        ? ((t = Sl), ge(l.type) ? ((l = Ii), (Ii = null), (Sl = l)) : (Sl = t))
        : (Sl = Zl ? Tt(l.stateNode.nextSibling) : null);
    return !0;
  }
  function je() {
    (Sl = Zl = null), (al = !1);
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
  var Rc = o(null),
    xe = null,
    Gt = null;
  function ue(l, t, e) {
    x(Rc, t._currentValue), (t._currentValue = e);
  }
  function Xt(l) {
    (l._currentValue = Rc.current), E(Rc);
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
        if (((c = u.return), c === null)) throw Error(d(341));
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
        if (c === null) throw Error(d(387));
        if (((c = c.memoizedProps), c !== null)) {
          var i = u.type;
          ft(u.pendingProps.value, c.value) ||
            (l !== null ? l.push(i) : (l = [i]));
        }
      } else if (u === cl.current) {
        if (((c = u.alternate), c === null)) throw Error(d(387));
        c.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (l !== null ? l.push(Su) : (l = [Su]));
      }
      u = u.return;
    }
    l !== null && xc(t, l, e, a), (t.flags |= 262144);
  }
  function Ju(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!ft(l.context._currentValue, l.memoizedValue)) return !0;
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
  function Vl(l) {
    return As(xe, l);
  }
  function wu(l, t) {
    return xe === null && He(l), As(l, t);
  }
  function As(l, t) {
    var e = t._currentValue;
    if (((t = { context: t, memoizedValue: e, next: null }), Gt === null)) {
      if (l === null) throw Error(d(308));
      (Gt = t),
        (l.dependencies = { lanes: 0, firstContext: t }),
        (l.flags |= 524288);
    } else Gt = Gt.next = t;
    return e;
  }
  var qm =
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
    Ym = g.unstable_scheduleCallback,
    Gm = g.unstable_NormalPriority,
    jl = {
      $$typeof: El,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Hc() {
    return { controller: new qm(), data: new Map(), refCount: 0 };
  }
  function Ja(l) {
    l.refCount--,
      l.refCount === 0 &&
        Ym(Gm, function () {
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
  function Lm(l, t) {
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
  var _s = s.S;
  s.S = function (l, t) {
    (od = nt()),
      typeof t == "object" &&
        t !== null &&
        typeof t.then == "function" &&
        Xm(l, t),
      _s !== null && _s(l, t);
  };
  var Ce = o(null);
  function Bc() {
    var l = Ce.current;
    return l !== null ? l : gl.pooledCache;
  }
  function Wu(l, t) {
    t === null ? x(Ce, Ce.current) : x(Ce, t.pool);
  }
  function Ds() {
    var l = Bc();
    return l === null ? null : { parent: jl._currentValue, pool: l };
  }
  var sa = Error(d(460)),
    qc = Error(d(474)),
    $u = Error(d(542)),
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
          if (((l = gl), l !== null && 100 < l.shellSuspendCounter))
            throw Error(d(482));
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
    if (qe === null) throw Error(d(459));
    var l = qe;
    return (qe = null), l;
  }
  function Rs(l) {
    if (l === sa || l === $u) throw Error(d(483));
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
    throw t.$$typeof === G
      ? Error(d(525))
      : ((l = Object.prototype.toString.call(t)),
        Error(
          d(
            31,
            l === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : l
          )
        ));
  }
  function js(l) {
    function t(m, r) {
      if (l) {
        var v = m.deletions;
        v === null ? ((m.deletions = [r]), (m.flags |= 16)) : v.push(r);
      }
    }
    function e(m, r) {
      if (!l) return null;
      for (; r !== null; ) t(m, r), (r = r.sibling);
      return null;
    }
    function a(m) {
      for (var r = new Map(); m !== null; )
        m.key !== null ? r.set(m.key, m) : r.set(m.index, m), (m = m.sibling);
      return r;
    }
    function u(m, r) {
      return (m = qt(m, r)), (m.index = 0), (m.sibling = null), m;
    }
    function n(m, r, v) {
      return (
        (m.index = v),
        l
          ? ((v = m.alternate),
            v !== null
              ? ((v = v.index), v < r ? ((m.flags |= 67108866), r) : v)
              : ((m.flags |= 67108866), r))
          : ((m.flags |= 1048576), r)
      );
    }
    function c(m) {
      return l && m.alternate === null && (m.flags |= 67108866), m;
    }
    function i(m, r, v, T) {
      return r === null || r.tag !== 6
        ? ((r = Mc(v, m.mode, T)), (r.return = m), r)
        : ((r = u(r, v)), (r.return = m), r);
    }
    function f(m, r, v, T) {
      var L = v.type;
      return L === dl
        ? p(m, r, v.props.children, T, v.key)
        : r !== null &&
            (r.elementType === L ||
              (typeof L == "object" &&
                L !== null &&
                L.$$typeof === Dl &&
                Be(L) === r.type))
          ? ((r = u(r, v.props)), $a(r, v), (r.return = m), r)
          : ((r = Vu(v.type, v.key, v.props, null, m.mode, T)),
            $a(r, v),
            (r.return = m),
            r);
    }
    function h(m, r, v, T) {
      return r === null ||
        r.tag !== 4 ||
        r.stateNode.containerInfo !== v.containerInfo ||
        r.stateNode.implementation !== v.implementation
        ? ((r = _c(v, m.mode, T)), (r.return = m), r)
        : ((r = u(r, v.children || [])), (r.return = m), r);
    }
    function p(m, r, v, T, L) {
      return r === null || r.tag !== 7
        ? ((r = Re(v, m.mode, T, L)), (r.return = m), r)
        : ((r = u(r, v)), (r.return = m), r);
    }
    function M(m, r, v) {
      if (
        (typeof r == "string" && r !== "") ||
        typeof r == "number" ||
        typeof r == "bigint"
      )
        return (r = Mc("" + r, m.mode, v)), (r.return = m), r;
      if (typeof r == "object" && r !== null) {
        switch (r.$$typeof) {
          case K:
            return (
              (v = Vu(r.type, r.key, r.props, null, m.mode, v)),
              $a(v, r),
              (v.return = m),
              v
            );
          case ol:
            return (r = _c(r, m.mode, v)), (r.return = m), r;
          case Dl:
            return (r = Be(r)), M(m, r, v);
        }
        if (ul(r) || Rl(r))
          return (r = Re(r, m.mode, v, null)), (r.return = m), r;
        if (typeof r.then == "function") return M(m, Fu(r), v);
        if (r.$$typeof === El) return M(m, wu(m, r), v);
        Iu(m, r);
      }
      return null;
    }
    function y(m, r, v, T) {
      var L = r !== null ? r.key : null;
      if (
        (typeof v == "string" && v !== "") ||
        typeof v == "number" ||
        typeof v == "bigint"
      )
        return L !== null ? null : i(m, r, "" + v, T);
      if (typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case K:
            return v.key === L ? f(m, r, v, T) : null;
          case ol:
            return v.key === L ? h(m, r, v, T) : null;
          case Dl:
            return (v = Be(v)), y(m, r, v, T);
        }
        if (ul(v) || Rl(v)) return L !== null ? null : p(m, r, v, T, null);
        if (typeof v.then == "function") return y(m, r, Fu(v), T);
        if (v.$$typeof === El) return y(m, r, wu(m, v), T);
        Iu(m, v);
      }
      return null;
    }
    function b(m, r, v, T, L) {
      if (
        (typeof T == "string" && T !== "") ||
        typeof T == "number" ||
        typeof T == "bigint"
      )
        return (m = m.get(v) || null), i(r, m, "" + T, L);
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case K:
            return (
              (m = m.get(T.key === null ? v : T.key) || null), f(r, m, T, L)
            );
          case ol:
            return (
              (m = m.get(T.key === null ? v : T.key) || null), h(r, m, T, L)
            );
          case Dl:
            return (T = Be(T)), b(m, r, v, T, L);
        }
        if (ul(T) || Rl(T)) return (m = m.get(v) || null), p(r, m, T, L, null);
        if (typeof T.then == "function") return b(m, r, v, Fu(T), L);
        if (T.$$typeof === El) return b(m, r, v, wu(r, T), L);
        Iu(r, T);
      }
      return null;
    }
    function q(m, r, v, T) {
      for (
        var L = null, il = null, Y = r, I = (r = 0), el = null;
        Y !== null && I < v.length;
        I++
      ) {
        Y.index > I ? ((el = Y), (Y = null)) : (el = Y.sibling);
        var fl = y(m, Y, v[I], T);
        if (fl === null) {
          Y === null && (Y = el);
          break;
        }
        l && Y && fl.alternate === null && t(m, Y),
          (r = n(fl, r, I)),
          il === null ? (L = fl) : (il.sibling = fl),
          (il = fl),
          (Y = el);
      }
      if (I === v.length) return e(m, Y), al && Yt(m, I), L;
      if (Y === null) {
        for (; I < v.length; I++)
          (Y = M(m, v[I], T)),
            Y !== null &&
              ((r = n(Y, r, I)),
              il === null ? (L = Y) : (il.sibling = Y),
              (il = Y));
        return al && Yt(m, I), L;
      }
      for (Y = a(Y); I < v.length; I++)
        (el = b(Y, m, I, v[I], T)),
          el !== null &&
            (l &&
              el.alternate !== null &&
              Y.delete(el.key === null ? I : el.key),
            (r = n(el, r, I)),
            il === null ? (L = el) : (il.sibling = el),
            (il = el));
      return (
        l &&
          Y.forEach(function (ze) {
            return t(m, ze);
          }),
        al && Yt(m, I),
        L
      );
    }
    function Z(m, r, v, T) {
      if (v == null) throw Error(d(151));
      for (
        var L = null, il = null, Y = r, I = (r = 0), el = null, fl = v.next();
        Y !== null && !fl.done;
        I++, fl = v.next()
      ) {
        Y.index > I ? ((el = Y), (Y = null)) : (el = Y.sibling);
        var ze = y(m, Y, fl.value, T);
        if (ze === null) {
          Y === null && (Y = el);
          break;
        }
        l && Y && ze.alternate === null && t(m, Y),
          (r = n(ze, r, I)),
          il === null ? (L = ze) : (il.sibling = ze),
          (il = ze),
          (Y = el);
      }
      if (fl.done) return e(m, Y), al && Yt(m, I), L;
      if (Y === null) {
        for (; !fl.done; I++, fl = v.next())
          (fl = M(m, fl.value, T)),
            fl !== null &&
              ((r = n(fl, r, I)),
              il === null ? (L = fl) : (il.sibling = fl),
              (il = fl));
        return al && Yt(m, I), L;
      }
      for (Y = a(Y); !fl.done; I++, fl = v.next())
        (fl = b(Y, m, I, fl.value, T)),
          fl !== null &&
            (l &&
              fl.alternate !== null &&
              Y.delete(fl.key === null ? I : fl.key),
            (r = n(fl, r, I)),
            il === null ? (L = fl) : (il.sibling = fl),
            (il = fl));
      return (
        l &&
          Y.forEach(function (I0) {
            return t(m, I0);
          }),
        al && Yt(m, I),
        L
      );
    }
    function yl(m, r, v, T) {
      if (
        (typeof v == "object" &&
          v !== null &&
          v.type === dl &&
          v.key === null &&
          (v = v.props.children),
        typeof v == "object" && v !== null)
      ) {
        switch (v.$$typeof) {
          case K:
            l: {
              for (var L = v.key; r !== null; ) {
                if (r.key === L) {
                  if (((L = v.type), L === dl)) {
                    if (r.tag === 7) {
                      e(m, r.sibling),
                        (T = u(r, v.props.children)),
                        (T.return = m),
                        (m = T);
                      break l;
                    }
                  } else if (
                    r.elementType === L ||
                    (typeof L == "object" &&
                      L !== null &&
                      L.$$typeof === Dl &&
                      Be(L) === r.type)
                  ) {
                    e(m, r.sibling),
                      (T = u(r, v.props)),
                      $a(T, v),
                      (T.return = m),
                      (m = T);
                    break l;
                  }
                  e(m, r);
                  break;
                } else t(m, r);
                r = r.sibling;
              }
              v.type === dl
                ? ((T = Re(v.props.children, m.mode, T, v.key)),
                  (T.return = m),
                  (m = T))
                : ((T = Vu(v.type, v.key, v.props, null, m.mode, T)),
                  $a(T, v),
                  (T.return = m),
                  (m = T));
            }
            return c(m);
          case ol:
            l: {
              for (L = v.key; r !== null; ) {
                if (r.key === L)
                  if (
                    r.tag === 4 &&
                    r.stateNode.containerInfo === v.containerInfo &&
                    r.stateNode.implementation === v.implementation
                  ) {
                    e(m, r.sibling),
                      (T = u(r, v.children || [])),
                      (T.return = m),
                      (m = T);
                    break l;
                  } else {
                    e(m, r);
                    break;
                  }
                else t(m, r);
                r = r.sibling;
              }
              (T = _c(v, m.mode, T)), (T.return = m), (m = T);
            }
            return c(m);
          case Dl:
            return (v = Be(v)), yl(m, r, v, T);
        }
        if (ul(v)) return q(m, r, v, T);
        if (Rl(v)) {
          if (((L = Rl(v)), typeof L != "function")) throw Error(d(150));
          return (v = L.call(v)), Z(m, r, v, T);
        }
        if (typeof v.then == "function") return yl(m, r, Fu(v), T);
        if (v.$$typeof === El) return yl(m, r, wu(m, v), T);
        Iu(m, v);
      }
      return (typeof v == "string" && v !== "") ||
        typeof v == "number" ||
        typeof v == "bigint"
        ? ((v = "" + v),
          r !== null && r.tag === 6
            ? (e(m, r.sibling), (T = u(r, v)), (T.return = m), (m = T))
            : (e(m, r), (T = Mc(v, m.mode, T)), (T.return = m), (m = T)),
          c(m))
        : e(m, r);
    }
    return function (m, r, v, T) {
      try {
        Wa = 0;
        var L = yl(m, r, v, T);
        return (oa = null), L;
      } catch (Y) {
        if (Y === sa || Y === $u) throw Y;
        var il = st(29, Y, null, m.mode);
        return (il.lanes = T), (il.return = m), il;
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
    if (((a = a.shared), (sl & 2) !== 0)) {
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
  function Xc(l, t) {
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
  var Lc = !1;
  function Fa() {
    if (Lc) {
      var l = fa;
      if (l !== null) throw l;
    }
  }
  function Ia(l, t, e, a) {
    Lc = !1;
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
      var p = l.alternate;
      p !== null &&
        ((p = p.updateQueue),
        (i = p.lastBaseUpdate),
        i !== c &&
          (i === null ? (p.firstBaseUpdate = h) : (i.next = h),
          (p.lastBaseUpdate = f)));
    }
    if (n !== null) {
      var M = u.baseState;
      (c = 0), (p = h = f = null), (i = n);
      do {
        var y = i.lane & -536870913,
          b = y !== i.lane;
        if (b ? (tl & y) === y : (a & y) === y) {
          y !== 0 && y === ia && (Lc = !0),
            p !== null &&
              (p = p.next =
                {
                  lane: 0,
                  tag: i.tag,
                  payload: i.payload,
                  callback: null,
                  next: null,
                });
          l: {
            var q = l,
              Z = i;
            y = t;
            var yl = e;
            switch (Z.tag) {
              case 1:
                if (((q = Z.payload), typeof q == "function")) {
                  M = q.call(yl, M, y);
                  break l;
                }
                M = q;
                break l;
              case 3:
                q.flags = (q.flags & -65537) | 128;
              case 0:
                if (
                  ((q = Z.payload),
                  (y = typeof q == "function" ? q.call(yl, M, y) : q),
                  y == null)
                )
                  break l;
                M = O({}, M, y);
                break l;
              case 2:
                ne = !0;
            }
          }
          (y = i.callback),
            y !== null &&
              ((l.flags |= 64),
              b && (l.flags |= 8192),
              (b = u.callbacks),
              b === null ? (u.callbacks = [y]) : b.push(y));
        } else
          (b = {
            lane: y,
            tag: i.tag,
            payload: i.payload,
            callback: i.callback,
            next: null,
          }),
            p === null ? ((h = p = b), (f = M)) : (p = p.next = b),
            (c |= y);
        if (((i = i.next), i === null)) {
          if (((i = u.shared.pending), i === null)) break;
          (b = i),
            (i = b.next),
            (b.next = null),
            (u.lastBaseUpdate = b),
            (u.shared.pending = null);
        }
      } while (!0);
      p === null && (f = M),
        (u.baseState = f),
        (u.firstBaseUpdate = h),
        (u.lastBaseUpdate = p),
        n === null && (u.shared.lanes = 0),
        (re |= c),
        (l.lanes = c),
        (l.memoizedState = M);
    }
  }
  function Hs(l, t) {
    if (typeof l != "function") throw Error(d(191, l));
    l.call(t);
  }
  function Cs(l, t) {
    var e = l.callbacks;
    if (e !== null)
      for (l.callbacks = null, l = 0; l < e.length; l++) Hs(e[l], t);
  }
  var da = o(null),
    Pu = o(0);
  function Bs(l, t) {
    (l = $t), x(Pu, l), x(da, t), ($t = l | t.baseLanes);
  }
  function Qc() {
    x(Pu, $t), x(da, da.current);
  }
  function Zc() {
    ($t = Pu.current), E(da), E(Pu);
  }
  var ot = o(null),
    zt = null;
  function fe(l) {
    var t = l.alternate;
    x(Ol, Ol.current & 1),
      x(ot, l),
      zt === null &&
        (t === null || da.current !== null || t.memoizedState !== null) &&
        (zt = l);
  }
  function Vc(l) {
    x(Ol, Ol.current), x(ot, l), zt === null && (zt = l);
  }
  function qs(l) {
    l.tag === 22
      ? (x(Ol, Ol.current), x(ot, l), zt === null && (zt = l))
      : se();
  }
  function se() {
    x(Ol, Ol.current), x(ot, ot.current);
  }
  function dt(l) {
    E(ot), zt === l && (zt = null), E(Ol);
  }
  var Ol = o(0);
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
  var Lt = 0,
    F = null,
    vl = null,
    xl = null,
    tn = !1,
    ra = !1,
    Ge = !1,
    en = 0,
    Pa = 0,
    ma = null,
    Qm = 0;
  function Ml() {
    throw Error(d(321));
  }
  function Kc(l, t) {
    if (t === null) return !1;
    for (var e = 0; e < t.length && e < l.length; e++)
      if (!ft(l[e], t[e])) return !1;
    return !0;
  }
  function Jc(l, t, e, a, u, n) {
    return (
      (Lt = n),
      (F = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (s.H = l === null || l.memoizedState === null ? Eo : ii),
      (Ge = !1),
      (n = e(a, u)),
      (Ge = !1),
      ra && (n = Gs(t, e, a, u)),
      Ys(l),
      n
    );
  }
  function Ys(l) {
    s.H = eu;
    var t = vl !== null && vl.next !== null;
    if (((Lt = 0), (xl = vl = F = null), (tn = !1), (Pa = 0), (ma = null), t))
      throw Error(d(300));
    l === null ||
      Hl ||
      ((l = l.dependencies), l !== null && Ju(l) && (Hl = !0));
  }
  function Gs(l, t, e, a) {
    F = l;
    var u = 0;
    do {
      if ((ra && (ma = null), (Pa = 0), (ra = !1), 25 <= u))
        throw Error(d(301));
      if (((u += 1), (xl = vl = null), l.updateQueue != null)) {
        var n = l.updateQueue;
        (n.lastEffect = null),
          (n.events = null),
          (n.stores = null),
          n.memoCache != null && (n.memoCache.index = 0);
      }
      (s.H = zo), (n = t(e, a));
    } while (ra);
    return n;
  }
  function Zm() {
    var l = s.H,
      t = l.useState()[0];
    return (
      (t = typeof t.then == "function" ? lu(t) : t),
      (l = l.useState()[0]),
      (vl !== null ? vl.memoizedState : null) !== l && (F.flags |= 1024),
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
    (Lt = 0), (xl = vl = F = null), (ra = !1), (Pa = en = 0), (ma = null);
  }
  function $l() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return xl === null ? (F.memoizedState = xl = l) : (xl = xl.next = l), xl;
  }
  function Ul() {
    if (vl === null) {
      var l = F.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = vl.next;
    var t = xl === null ? F.memoizedState : xl.next;
    if (t !== null) (xl = t), (vl = l);
    else {
      if (l === null)
        throw F.alternate === null ? Error(d(467)) : Error(d(310));
      (vl = l),
        (l = {
          memoizedState: vl.memoizedState,
          baseState: vl.baseState,
          baseQueue: vl.baseQueue,
          queue: vl.queue,
          next: null,
        }),
        xl === null ? (F.memoizedState = xl = l) : (xl = xl.next = l);
    }
    return xl;
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
      (t = F),
      (xl === null ? t.memoizedState : xl.next) === null &&
        ((t = t.alternate),
        (s.H = t === null || t.memoizedState === null ? Eo : ii)),
      l
    );
  }
  function un(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return lu(l);
      if (l.$$typeof === El) return Vl(l);
    }
    throw Error(d(438, String(l)));
  }
  function kc(l) {
    var t = null,
      e = F.updateQueue;
    if ((e !== null && (t = e.memoCache), t == null)) {
      var a = F.alternate;
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
      e === null && ((e = an()), (F.updateQueue = e)),
      (e.memoCache = t),
      (e = t.data[t.index]),
      e === void 0)
    )
      for (e = t.data[t.index] = Array(l), a = 0; a < l; a++) e[a] = Ut;
    return t.index++, e;
  }
  function Qt(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function nn(l) {
    var t = Ul();
    return Fc(t, vl, l);
  }
  function Fc(l, t, e) {
    var a = l.queue;
    if (a === null) throw Error(d(311));
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
        p = !1;
      do {
        var M = h.lane & -536870913;
        if (M !== h.lane ? (tl & M) === M : (Lt & M) === M) {
          var y = h.revertLane;
          if (y === 0)
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
              M === ia && (p = !0);
          else if ((Lt & y) === y) {
            (h = h.next), y === ia && (p = !0);
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
              (F.lanes |= y),
              (re |= y);
          (M = h.action),
            Ge && e(n, M),
            (n = h.hasEagerState ? h.eagerState : e(n, M));
        } else
          (y = {
            lane: M,
            revertLane: h.revertLane,
            gesture: h.gesture,
            action: h.action,
            hasEagerState: h.hasEagerState,
            eagerState: h.eagerState,
            next: null,
          }),
            f === null ? ((i = f = y), (c = n)) : (f = f.next = y),
            (F.lanes |= M),
            (re |= M);
        h = h.next;
      } while (h !== null && h !== t);
      if (
        (f === null ? (c = n) : (f.next = i),
        !ft(n, l.memoizedState) && ((Hl = !0), p && ((e = fa), e !== null)))
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
    var t = Ul(),
      e = t.queue;
    if (e === null) throw Error(d(311));
    e.lastRenderedReducer = l;
    var a = e.dispatch,
      u = e.pending,
      n = t.memoizedState;
    if (u !== null) {
      e.pending = null;
      var c = (u = u.next);
      do (n = l(n, c.action)), (c = c.next);
      while (c !== u);
      ft(n, t.memoizedState) || (Hl = !0),
        (t.memoizedState = n),
        t.baseQueue === null && (t.baseState = n),
        (e.lastRenderedState = n);
    }
    return [n, a];
  }
  function Xs(l, t, e) {
    var a = F,
      u = Ul(),
      n = al;
    if (n) {
      if (e === void 0) throw Error(d(407));
      e = e();
    } else e = t();
    var c = !ft((vl || u).memoizedState, e);
    if (
      (c && ((u.memoizedState = e), (Hl = !0)),
      (u = u.queue),
      ti(Zs.bind(null, a, u, l), [l]),
      u.getSnapshot !== t || c || (xl !== null && xl.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        va(9, { destroy: void 0 }, Qs.bind(null, a, u, e, t), null),
        gl === null)
      )
        throw Error(d(349));
      n || (Lt & 127) !== 0 || Ls(a, t, e);
    }
    return e;
  }
  function Ls(l, t, e) {
    (l.flags |= 16384),
      (l = { getSnapshot: t, value: e }),
      (t = F.updateQueue),
      t === null
        ? ((t = an()), (F.updateQueue = t), (t.stores = [l]))
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
      return !ft(l, e);
    } catch {
      return !0;
    }
  }
  function Ks(l) {
    var t = Ne(l, 2);
    t !== null && ut(t, l, 2);
  }
  function Pc(l) {
    var t = $l();
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
    return (l.baseState = e), Fc(l, vl, typeof a == "function" ? a : Qt);
  }
  function Vm(l, t, e, a, u) {
    if (sn(l)) throw Error(d(485));
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
      s.T !== null ? e(!0) : (n.isTransition = !1),
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
      var n = s.T,
        c = {};
      s.T = c;
      try {
        var i = e(u, a),
          f = s.S;
        f !== null && f(c, i), Ws(l, t, i);
      } catch (h) {
        li(l, t, h);
      } finally {
        n !== null && c.types !== null && (n.types = c.types), (s.T = n);
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
    if (al) {
      var e = gl.formState;
      if (e !== null) {
        l: {
          var a = F;
          if (al) {
            if (Sl) {
              t: {
                for (var u = Sl, n = Et; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break t;
                  }
                  if (((u = Tt(u.nextSibling)), u === null)) {
                    u = null;
                    break t;
                  }
                }
                (n = u.data), (u = n === "F!" || n === "F" ? u : null);
              }
              if (u) {
                (Sl = Tt(u.nextSibling)), (a = u.data === "F!");
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
      (e = $l()),
      (e.memoizedState = e.baseState = t),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Fs,
        lastRenderedState: t,
      }),
      (e.queue = a),
      (e = So.bind(null, F, a)),
      (a.dispatch = e),
      (a = Pc(!1)),
      (n = ci.bind(null, F, !1, a.queue)),
      (a = $l()),
      (u = { state: t, dispatch: null, action: l, pending: null }),
      (a.queue = u),
      (e = Vm.bind(null, F, u, n, e)),
      (u.dispatch = e),
      (a.memoizedState = l),
      [t, e, !1]
    );
  }
  function Ps(l) {
    var t = Ul();
    return lo(t, vl, l);
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
    t = Ul();
    var u = t.queue,
      n = u.dispatch;
    return (
      e !== t.memoizedState &&
        ((F.flags |= 2048),
        va(9, { destroy: void 0 }, Km.bind(null, u, e), null)),
      [a, n, l]
    );
  }
  function Km(l, t) {
    l.action = t;
  }
  function to(l) {
    var t = Ul(),
      e = vl;
    if (e !== null) return lo(t, e, l);
    Ul(), (t = t.memoizedState), (e = Ul());
    var a = e.queue.dispatch;
    return (e.memoizedState = l), [t, a, !1];
  }
  function va(l, t, e, a) {
    return (
      (l = { tag: l, create: e, deps: a, inst: t, next: null }),
      (t = F.updateQueue),
      t === null && ((t = an()), (F.updateQueue = t)),
      (e = t.lastEffect),
      e === null
        ? (t.lastEffect = l.next = l)
        : ((a = e.next), (e.next = l), (l.next = a), (t.lastEffect = l)),
      l
    );
  }
  function eo() {
    return Ul().memoizedState;
  }
  function cn(l, t, e, a) {
    var u = $l();
    (F.flags |= l),
      (u.memoizedState = va(
        1 | t,
        { destroy: void 0 },
        e,
        a === void 0 ? null : a
      ));
  }
  function fn(l, t, e, a) {
    var u = Ul();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    vl !== null && a !== null && Kc(a, vl.memoizedState.deps)
      ? (u.memoizedState = va(t, n, e, a))
      : ((F.flags |= l), (u.memoizedState = va(1 | t, n, e, a)));
  }
  function ao(l, t) {
    cn(8390656, 8, l, t);
  }
  function ti(l, t) {
    fn(2048, 8, l, t);
  }
  function Jm(l) {
    F.flags |= 4;
    var t = F.updateQueue;
    if (t === null) (t = an()), (F.updateQueue = t), (t.events = [l]);
    else {
      var e = t.events;
      e === null ? (t.events = [l]) : e.push(l);
    }
  }
  function uo(l) {
    var t = Ul().memoizedState;
    return (
      Jm({ ref: t, nextImpl: l }),
      function () {
        if ((sl & 2) !== 0) throw Error(d(440));
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
    var e = Ul();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    return t !== null && Kc(t, a[1]) ? a[0] : ((e.memoizedState = [l, t]), l);
  }
  function oo(l, t) {
    var e = Ul();
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
    return e === void 0 || ((Lt & 1073741824) !== 0 && (tl & 261930) === 0)
      ? (l.memoizedState = t)
      : ((l.memoizedState = e), (l = rd()), (F.lanes |= l), (re |= l), e);
  }
  function ro(l, t, e, a) {
    return ft(e, t)
      ? e
      : da.current !== null
        ? ((l = ai(l, e, a)), ft(l, t) || (Hl = !0), l)
        : (Lt & 42) === 0 || ((Lt & 1073741824) !== 0 && (tl & 261930) === 0)
          ? ((Hl = !0), (l.memoizedState = e))
          : ((l = rd()), (F.lanes |= l), (re |= l), t);
  }
  function mo(l, t, e, a, u) {
    var n = z.p;
    z.p = n !== 0 && 8 > n ? n : 8;
    var c = s.T,
      i = {};
    (s.T = i), ci(l, !1, t, e);
    try {
      var f = u(),
        h = s.S;
      if (
        (h !== null && h(i, f),
        f !== null && typeof f == "object" && typeof f.then == "function")
      ) {
        var p = Lm(f, a);
        tu(l, t, p, vt(l));
      } else tu(l, t, a, vt(l));
    } catch (M) {
      tu(l, t, { then: function () {}, status: "rejected", reason: M }, vt());
    } finally {
      (z.p = n),
        c !== null && i.types !== null && (c.types = i.types),
        (s.T = c);
    }
  }
  function wm() {}
  function ui(l, t, e, a) {
    if (l.tag !== 5) throw Error(d(476));
    var u = vo(l).queue;
    mo(
      l,
      u,
      t,
      B,
      e === null
        ? wm
        : function () {
            return ho(l), e(a);
          }
    );
  }
  function vo(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: B,
      baseState: B,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Qt,
        lastRenderedState: B,
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
      tu(l, t.next.queue, {}, vt());
  }
  function ni() {
    return Vl(Su);
  }
  function yo() {
    return Ul().memoizedState;
  }
  function go() {
    return Ul().memoizedState;
  }
  function Wm(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var e = vt();
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
  function $m(l, t, e) {
    var a = vt();
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
    var a = vt();
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
          if (((u.hasEagerState = !0), (u.eagerState = i), ft(i, c)))
            return Qu(l, t, u, 0), gl === null && Lu(), !1;
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
      if (t) throw Error(d(479));
    } else (t = Tc(l, e, a, 2)), t !== null && ut(t, l, 2);
  }
  function sn(l) {
    var t = l.alternate;
    return l === F || (t !== null && t === F);
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
    readContext: Vl,
    use: un,
    useCallback: Ml,
    useContext: Ml,
    useEffect: Ml,
    useImperativeHandle: Ml,
    useLayoutEffect: Ml,
    useInsertionEffect: Ml,
    useMemo: Ml,
    useReducer: Ml,
    useRef: Ml,
    useState: Ml,
    useDebugValue: Ml,
    useDeferredValue: Ml,
    useTransition: Ml,
    useSyncExternalStore: Ml,
    useId: Ml,
    useHostTransitionStatus: Ml,
    useFormState: Ml,
    useActionState: Ml,
    useOptimistic: Ml,
    useMemoCache: Ml,
    useCacheRefresh: Ml,
  };
  eu.useEffectEvent = Ml;
  var Eo = {
      readContext: Vl,
      use: un,
      useCallback: function (l, t) {
        return ($l().memoizedState = [l, t === void 0 ? null : t]), l;
      },
      useContext: Vl,
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
        var e = $l();
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
        var a = $l();
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
          (l = l.dispatch = $m.bind(null, F, l)),
          [a.memoizedState, l]
        );
      },
      useRef: function (l) {
        var t = $l();
        return (l = { current: l }), (t.memoizedState = l);
      },
      useState: function (l) {
        l = Pc(l);
        var t = l.queue,
          e = So.bind(null, F, t);
        return (t.dispatch = e), [l.memoizedState, e];
      },
      useDebugValue: ei,
      useDeferredValue: function (l, t) {
        var e = $l();
        return ai(e, l, t);
      },
      useTransition: function () {
        var l = Pc(!1);
        return (
          (l = mo.bind(null, F, l.queue, !0, !1)),
          ($l().memoizedState = l),
          [!1, l]
        );
      },
      useSyncExternalStore: function (l, t, e) {
        var a = F,
          u = $l();
        if (al) {
          if (e === void 0) throw Error(d(407));
          e = e();
        } else {
          if (((e = t()), gl === null)) throw Error(d(349));
          (tl & 127) !== 0 || Ls(a, t, e);
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
        var l = $l(),
          t = gl.identifierPrefix;
        if (al) {
          var e = Rt,
            a = Nt;
          (e = (a & ~(1 << (32 - it(a) - 1))).toString(32) + e),
            (t = "_" + t + "R_" + e),
            (e = en++),
            0 < e && (t += "H" + e.toString(32)),
            (t += "_");
        } else (e = Qm++), (t = "_" + t + "r_" + e.toString(32) + "_");
        return (l.memoizedState = t);
      },
      useHostTransitionStatus: ni,
      useFormState: Is,
      useActionState: Is,
      useOptimistic: function (l) {
        var t = $l();
        t.memoizedState = t.baseState = l;
        var e = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = e), (t = ci.bind(null, F, !0, e)), (e.dispatch = t), [l, t]
        );
      },
      useMemoCache: kc,
      useCacheRefresh: function () {
        return ($l().memoizedState = Wm.bind(null, F));
      },
      useEffectEvent: function (l) {
        var t = $l(),
          e = { impl: l };
        return (
          (t.memoizedState = e),
          function () {
            if ((sl & 2) !== 0) throw Error(d(440));
            return e.impl.apply(void 0, arguments);
          }
        );
      },
    },
    ii = {
      readContext: Vl,
      use: un,
      useCallback: so,
      useContext: Vl,
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
        var e = Ul();
        return ro(e, vl.memoizedState, l, t);
      },
      useTransition: function () {
        var l = nn(Qt)[0],
          t = Ul().memoizedState;
        return [typeof l == "boolean" ? l : lu(l), t];
      },
      useSyncExternalStore: Xs,
      useId: yo,
      useHostTransitionStatus: ni,
      useFormState: Ps,
      useActionState: Ps,
      useOptimistic: function (l, t) {
        var e = Ul();
        return Js(e, vl, l, t);
      },
      useMemoCache: kc,
      useCacheRefresh: go,
    };
  ii.useEffectEvent = uo;
  var zo = {
    readContext: Vl,
    use: un,
    useCallback: so,
    useContext: Vl,
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
      var e = Ul();
      return vl === null ? ai(e, l, t) : ro(e, vl.memoizedState, l, t);
    },
    useTransition: function () {
      var l = Ic(Qt)[0],
        t = Ul().memoizedState;
      return [typeof l == "boolean" ? l : lu(l), t];
    },
    useSyncExternalStore: Xs,
    useId: yo,
    useHostTransitionStatus: ni,
    useFormState: to,
    useActionState: to,
    useOptimistic: function (l, t) {
      var e = Ul();
      return vl !== null
        ? Js(e, vl, l, t)
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
      var a = vt(),
        u = ce(a);
      (u.payload = t),
        e != null && (u.callback = e),
        (t = ie(l, u, a)),
        t !== null && (ut(t, l, a), ka(t, l, a));
    },
    enqueueReplaceState: function (l, t, e) {
      l = l._reactInternals;
      var a = vt(),
        u = ce(a);
      (u.tag = 1),
        (u.payload = t),
        e != null && (u.callback = e),
        (t = ie(l, u, a)),
        t !== null && (ut(t, l, a), ka(t, l, a));
    },
    enqueueForceUpdate: function (l, t) {
      l = l._reactInternals;
      var e = vt(),
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
  function Xe(l, t) {
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
    Xu(l);
  }
  function _o(l) {
    console.error(l);
  }
  function Do(l) {
    Xu(l);
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
  function km(l, t, e, a, u) {
    if (
      ((e.flags |= 32768),
      a !== null && typeof a == "object" && typeof a.then == "function")
    ) {
      if (
        ((t = e.alternate),
        t !== null && ca(t, e, u, !0),
        (e = ot.current),
        e !== null)
      ) {
        switch (e.tag) {
          case 31:
          case 13:
            return (
              zt === null ? zn() : e.alternate === null && _l === 0 && (_l = 3),
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
        throw Error(d(435, e.tag));
      }
      return Ci(l, a, u), zn(), !1;
    }
    if (al)
      return (
        (t = ot.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = u),
            a !== Uc && ((l = Error(d(422), { cause: a })), Ka(St(l, e))))
          : (a !== Uc && ((t = Error(d(423), { cause: a })), Ka(St(t, e))),
            (l = l.current.alternate),
            (l.flags |= 65536),
            (u &= -u),
            (l.lanes |= u),
            (a = St(a, e)),
            (u = oi(l.stateNode, a, u)),
            Xc(l, u),
            _l !== 4 && (_l = 2)),
        !1
      );
    var n = Error(d(520), { cause: a });
    if (
      ((n = St(n, e)),
      ou === null ? (ou = [n]) : ou.push(n),
      _l !== 4 && (_l = 2),
      t === null)
    )
      return !0;
    (a = St(a, e)), (e = t);
    do {
      switch (e.tag) {
        case 3:
          return (
            (e.flags |= 65536),
            (l = u & -u),
            (e.lanes |= l),
            (l = oi(e.stateNode, a, l)),
            Xc(e, l),
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
              Xc(e, u),
              !1
            );
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var di = Error(d(461)),
    Hl = !1;
  function Kl(l, t, e, a) {
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
      l !== null && !Hl
        ? (Wc(l, t, u), Zt(l, t, u))
        : (al && i && Dc(t), (t.flags |= 1), Kl(l, t, a, u), t.child)
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
        if (((Hl = !1), (t.pendingProps = a = n), bi(l, u)))
          (l.flags & 131072) !== 0 && (Hl = !0);
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
    return Kl(l, t, u, e), t.child;
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
      (n = n === null ? null : { parent: jl._currentValue, pool: n }),
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
      dt(t),
      (t.memoizedState = null),
      l
    );
  }
  function Fm(l, t, e) {
    var a = t.pendingProps,
      u = (t.flags & 128) !== 0;
    if (((t.flags &= -129), l === null)) {
      if (al) {
        if (a.mode === "hidden")
          return (l = dn(t, a)), (t.lanes = 536870912), au(null, l);
        if (
          (Vc(t),
          (l = Sl)
            ? ((l = Wd(l, Et)),
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
                (Zl = t),
                (Sl = null)))
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
        else throw Error(d(558));
      else if (
        (Hl || ca(l, t, e, !1), (u = (e & l.childLanes) !== 0), Hl || u)
      ) {
        if (
          ((a = gl),
          a !== null && ((c = Mf(a, e)), c !== 0 && c !== n.retryLane))
        )
          throw ((n.retryLane = c), Ne(l, c), ut(a, l, c), di);
        zn(), (t = Bo(l, t, e));
      } else
        (l = n.treeContext),
          (Sl = Tt(c.nextSibling)),
          (Zl = t),
          (al = !0),
          (ee = null),
          (Et = !1),
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
      if (typeof e != "function" && typeof e != "object") throw Error(d(284));
      (l === null || l.ref !== e) && (t.flags |= 4194816);
    }
  }
  function ri(l, t, e, a, u) {
    return (
      He(t),
      (e = Jc(l, t, e, a, void 0, u)),
      (a = wc()),
      l !== null && !Hl
        ? (Wc(l, t, u), Zt(l, t, u))
        : (al && a && Dc(t), (t.flags |= 1), Kl(l, t, e, u), t.child)
    );
  }
  function qo(l, t, e, a, u, n) {
    return (
      He(t),
      (t.updateQueue = null),
      (e = Gs(t, a, e, u)),
      Ys(l),
      (a = wc()),
      l !== null && !Hl
        ? (Wc(l, t, n), Zt(l, t, n))
        : (al && a && Dc(t), (t.flags |= 1), Kl(l, t, e, n), t.child)
    );
  }
  function Yo(l, t, e, a, u) {
    if ((He(t), t.stateNode === null)) {
      var n = ea,
        c = e.contextType;
      typeof c == "object" && c !== null && (n = Vl(c)),
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
        (n.context = typeof c == "object" && c !== null ? Vl(c) : ea),
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
        f = Xe(e, i);
      n.props = f;
      var h = n.context,
        p = e.contextType;
      (c = ea), typeof p == "object" && p !== null && (c = Vl(p));
      var M = e.getDerivedStateFromProps;
      (p =
        typeof M == "function" ||
        typeof n.getSnapshotBeforeUpdate == "function"),
        (i = t.pendingProps !== i),
        p ||
          (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
            typeof n.componentWillReceiveProps != "function") ||
          ((i || h !== c) && Ao(t, n, a, c)),
        (ne = !1);
      var y = t.memoizedState;
      (n.state = y),
        Ia(t, a, n, u),
        Fa(),
        (h = t.memoizedState),
        i || y !== h || ne
          ? (typeof M == "function" && (fi(t, e, M, a), (h = t.memoizedState)),
            (f = ne || To(t, e, f, a, y, h, c))
              ? (p ||
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
        (p = Xe(e, c)),
        (n.props = p),
        (M = t.pendingProps),
        (y = n.context),
        (h = e.contextType),
        (f = ea),
        typeof h == "object" && h !== null && (f = Vl(h)),
        (i = e.getDerivedStateFromProps),
        (h =
          typeof i == "function" ||
          typeof n.getSnapshotBeforeUpdate == "function") ||
          (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
            typeof n.componentWillReceiveProps != "function") ||
          ((c !== M || y !== f) && Ao(t, n, a, f)),
        (ne = !1),
        (y = t.memoizedState),
        (n.state = y),
        Ia(t, a, n, u),
        Fa();
      var b = t.memoizedState;
      c !== M ||
      y !== b ||
      ne ||
      (l !== null && l.dependencies !== null && Ju(l.dependencies))
        ? (typeof i == "function" && (fi(t, e, i, a), (b = t.memoizedState)),
          (p =
            ne ||
            To(t, e, p, a, y, b, f) ||
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
                (c === l.memoizedProps && y === l.memoizedState) ||
                (t.flags |= 4),
              typeof n.getSnapshotBeforeUpdate != "function" ||
                (c === l.memoizedProps && y === l.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = a),
              (t.memoizedState = b)),
          (n.props = a),
          (n.state = b),
          (n.context = f),
          (a = p))
        : (typeof n.componentDidUpdate != "function" ||
            (c === l.memoizedProps && y === l.memoizedState) ||
            (t.flags |= 4),
          typeof n.getSnapshotBeforeUpdate != "function" ||
            (c === l.memoizedProps && y === l.memoizedState) ||
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
            : Kl(l, t, e, u),
          (t.memoizedState = n.state),
          (l = t.child))
        : (l = Zt(l, t, u)),
      l
    );
  }
  function Go(l, t, e, a) {
    return je(), (t.flags |= 256), Kl(l, t, e, a), t.child;
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
    return (l = l !== null ? l.childLanes & ~e : 0), t && (l |= mt), l;
  }
  function Xo(l, t, e) {
    var a = t.pendingProps,
      u = !1,
      n = (t.flags & 128) !== 0,
      c;
    if (
      ((c = n) ||
        (c =
          l !== null && l.memoizedState === null ? !1 : (Ol.current & 2) !== 0),
      c && ((u = !0), (t.flags &= -129)),
      (c = (t.flags & 32) !== 0),
      (t.flags &= -33),
      l === null)
    ) {
      if (al) {
        if (
          (u ? fe(t) : se(),
          (l = Sl)
            ? ((l = Wd(l, Et)),
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
                (Zl = t),
                (Sl = null)))
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
          (a = Error(d(419))),
          (a.stack = ""),
          (a.digest = c),
          Ka({ value: a, source: null, stack: null }),
          (t = gi(l, t, e));
      } else if (
        (Hl || ca(l, t, e, !1), (c = (e & l.childLanes) !== 0), Hl || c)
      ) {
        if (
          ((c = gl),
          c !== null && ((a = Mf(c, e)), a !== 0 && a !== f.retryLane))
        )
          throw ((f.retryLane = a), Ne(l, a), ut(c, l, a), di);
        ki(i) || zn(), (t = gi(l, t, e));
      } else
        ki(i)
          ? ((t.flags |= 192), (t.child = l.child), (t = null))
          : ((l = f.treeContext),
            (Sl = Tt(i.nextSibling)),
            (Zl = t),
            (al = !0),
            (ee = null),
            (Et = !1),
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
              ? ((f = jl._currentValue),
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
    return (l = st(22, l, null, t)), (l.lanes = 0), l;
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
  function Lo(l, t, e) {
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
    var c = Ol.current,
      i = (c & 2) !== 0;
    if (
      (i ? ((c = (c & 1) | 2), (t.flags |= 128)) : (c &= 1),
      x(Ol, c),
      Kl(l, t, a, e),
      (a = al ? Va : 0),
      !i && l !== null && (l.flags & 128) !== 0)
    )
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13) l.memoizedState !== null && Lo(l, e, t);
        else if (l.tag === 19) Lo(l, e, t);
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
    if (l !== null && t.child !== l.child) throw Error(d(153));
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
  function Im(l, t, e) {
    switch (t.tag) {
      case 3:
        Yl(t, t.stateNode.containerInfo),
          ue(t, jl, l.memoizedState.cache),
          je();
        break;
      case 27:
      case 5:
        Ua(t);
        break;
      case 4:
        Yl(t, t.stateNode.containerInfo);
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
              ? Xo(l, t, e)
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
          x(Ol, Ol.current),
          a)
        )
          break;
        return null;
      case 22:
        return (t.lanes = 0), Ho(l, t, e, t.pendingProps);
      case 24:
        ue(t, jl, l.memoizedState.cache);
    }
    return Zt(l, t, e);
  }
  function Zo(l, t, e) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps) Hl = !0;
      else {
        if (!bi(l, e) && (t.flags & 128) === 0) return (Hl = !1), Im(l, t, e);
        Hl = (l.flags & 131072) !== 0;
      }
    else (Hl = !1), al && (t.flags & 1048576) !== 0 && ps(t, Va, t.index);
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (((l = Be(t.elementType)), (t.type = l), typeof l == "function"))
            Ac(l)
              ? ((a = Xe(l, a)), (t.tag = 1), (t = Yo(null, t, l, a, e)))
              : ((t.tag = 0), (t = ri(null, t, l, a, e)));
          else {
            if (l != null) {
              var u = l.$$typeof;
              if (u === Ll) {
                (t.tag = 11), (t = Ro(null, t, l, a, e));
                break l;
              } else if (u === W) {
                (t.tag = 14), (t = jo(null, t, l, a, e));
                break l;
              }
            }
            throw ((t = Fl(l) || l), Error(d(306, t, "")));
          }
        }
        return t;
      case 0:
        return ri(l, t, t.type, t.pendingProps, e);
      case 1:
        return (a = t.type), (u = Xe(a, t.pendingProps)), Yo(l, t, a, u, e);
      case 3:
        l: {
          if ((Yl(t, t.stateNode.containerInfo), l === null))
            throw Error(d(387));
          a = t.pendingProps;
          var n = t.memoizedState;
          (u = n.element), Gc(l, t), Ia(t, a, null, e);
          var c = t.memoizedState;
          if (
            ((a = c.cache),
            ue(t, jl, a),
            a !== n.cache && xc(t, [jl], e, !0),
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
              (u = St(Error(d(424)), t)), Ka(u), (t = Go(l, t, a, e));
              break l;
            } else
              for (
                l = t.stateNode.containerInfo,
                  l.nodeType === 9
                    ? (l = l.body)
                    : (l = l.nodeName === "HTML" ? l.ownerDocument.body : l),
                  Sl = Tt(l.firstChild),
                  Zl = t,
                  al = !0,
                  ee = null,
                  Et = !0,
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
            Kl(l, t, a, e);
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
              : al ||
                ((e = t.type),
                (l = t.pendingProps),
                (a = Un(k.current).createElement(e)),
                (a[Ql] = t),
                (a[Il] = l),
                Jl(a, e, l),
                Gl(a),
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
            al &&
            ((a = t.stateNode = Fd(t.type, t.pendingProps, k.current)),
            (Zl = t),
            (Et = !0),
            (u = Sl),
            ge(t.type) ? ((Ii = u), (Sl = Tt(a.firstChild))) : (Sl = u)),
          Kl(l, t, t.pendingProps.children, e),
          rn(l, t),
          l === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          l === null &&
            al &&
            ((u = a = Sl) &&
              ((a = O0(a, t.type, t.pendingProps, Et)),
              a !== null
                ? ((t.stateNode = a),
                  (Zl = t),
                  (Sl = Tt(a.firstChild)),
                  (Et = !1),
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
            ((u = Jc(l, t, Zm, null, null, e)), (Su._currentValue = u)),
          rn(l, t),
          Kl(l, t, a, e),
          t.child
        );
      case 6:
        return (
          l === null &&
            al &&
            ((l = e = Sl) &&
              ((e = U0(e, t.pendingProps, Et)),
              e !== null
                ? ((t.stateNode = e), (Zl = t), (Sl = null), (l = !0))
                : (l = !1)),
            l || ae(t)),
          null
        );
      case 13:
        return Xo(l, t, e);
      case 4:
        return (
          Yl(t, t.stateNode.containerInfo),
          (a = t.pendingProps),
          l === null ? (t.child = Ye(t, null, a, e)) : Kl(l, t, a, e),
          t.child
        );
      case 11:
        return Ro(l, t, t.type, t.pendingProps, e);
      case 7:
        return Kl(l, t, t.pendingProps, e), t.child;
      case 8:
        return Kl(l, t, t.pendingProps.children, e), t.child;
      case 12:
        return Kl(l, t, t.pendingProps.children, e), t.child;
      case 10:
        return (
          (a = t.pendingProps),
          ue(t, t.type, a.value),
          Kl(l, t, a.children, e),
          t.child
        );
      case 9:
        return (
          (u = t.type._context),
          (a = t.pendingProps.children),
          He(t),
          (u = Vl(u)),
          (a = a(u)),
          (t.flags |= 1),
          Kl(l, t, a, e),
          t.child
        );
      case 14:
        return jo(l, t, t.type, t.pendingProps, e);
      case 15:
        return xo(l, t, t.type, t.pendingProps, e);
      case 19:
        return Qo(l, t, e);
      case 31:
        return Fm(l, t, e);
      case 22:
        return Ho(l, t, e, t.pendingProps);
      case 24:
        return (
          He(t),
          (a = Vl(jl)),
          l === null
            ? ((u = Bc()),
              u === null &&
                ((u = gl),
                (n = Hc()),
                (u.pooledCache = n),
                n.refCount++,
                n !== null && (u.pooledCacheLanes |= e),
                (u = n)),
              (t.memoizedState = { parent: a, cache: u }),
              Yc(t),
              ue(t, jl, u))
            : ((l.lanes & e) !== 0 && (Gc(l, t), Ia(t, null, null, e), Fa()),
              (u = l.memoizedState),
              (n = t.memoizedState),
              u.parent !== a
                ? ((u = { parent: a, cache: a }),
                  (t.memoizedState = u),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = u),
                  ue(t, jl, a))
                : ((a = n.cache),
                  ue(t, jl, a),
                  a !== u.cache && xc(t, [jl], e, !0))),
          Kl(l, t, t.pendingProps.children, e),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(d(156, t.tag));
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
    if (!al)
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
  function bl(l) {
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
  function Pm(l, t, e) {
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
        return bl(t), null;
      case 1:
        return bl(t), null;
      case 3:
        return (
          (e = t.stateNode),
          (a = null),
          l !== null && (a = l.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Xt(jl),
          zl(),
          e.pendingContext &&
            ((e.context = e.pendingContext), (e.pendingContext = null)),
          (l === null || l.child === null) &&
            (na(t)
              ? Vt(t)
              : l === null ||
                (l.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Nc())),
          bl(t),
          null
        );
      case 26:
        var u = t.type,
          n = t.memoizedState;
        return (
          l === null
            ? (Vt(t),
              n !== null ? (bl(t), Vo(t, n)) : (bl(t), pi(t, u, null, a, e)))
            : n
              ? n !== l.memoizedState
                ? (Vt(t), bl(t), Vo(t, n))
                : (bl(t), (t.flags &= -16777217))
              : ((l = l.memoizedProps),
                l !== a && Vt(t),
                bl(t),
                pi(t, u, l, a, e)),
          null
        );
      case 27:
        if (
          (Au(t),
          (e = k.current),
          (u = t.type),
          l !== null && t.stateNode != null)
        )
          l.memoizedProps !== a && Vt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(d(166));
            return bl(t), null;
          }
          (l = U.current),
            na(t) ? zs(t) : ((l = Fd(u, a, e)), (t.stateNode = l), Vt(t));
        }
        return bl(t), null;
      case 5:
        if ((Au(t), (u = t.type), l !== null && t.stateNode != null))
          l.memoizedProps !== a && Vt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(d(166));
            return bl(t), null;
          }
          if (((n = U.current), na(t))) zs(t);
          else {
            var c = Un(k.current);
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
            (n[Ql] = t), (n[Il] = a);
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
            l: switch ((Jl(n, u, a), u)) {
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
          bl(t),
          pi(t, t.type, l === null ? null : l.memoizedProps, t.pendingProps, e),
          null
        );
      case 6:
        if (l && t.stateNode != null) l.memoizedProps !== a && Vt(t);
        else {
          if (typeof a != "string" && t.stateNode === null) throw Error(d(166));
          if (((l = k.current), na(t))) {
            if (
              ((l = t.stateNode),
              (e = t.memoizedProps),
              (a = null),
              (u = Zl),
              u !== null)
            )
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            (l[Ql] = t),
              (l = !!(
                l.nodeValue === e ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                Xd(l.nodeValue, e)
              )),
              l || ae(t, !0);
          } else (l = Un(l).createTextNode(a)), (l[Ql] = t), (t.stateNode = l);
        }
        return bl(t), null;
      case 31:
        if (((e = t.memoizedState), l === null || l.memoizedState !== null)) {
          if (((a = na(t)), e !== null)) {
            if (l === null) {
              if (!a) throw Error(d(318));
              if (
                ((l = t.memoizedState),
                (l = l !== null ? l.dehydrated : null),
                !l)
              )
                throw Error(d(557));
              l[Ql] = t;
            } else
              je(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4);
            bl(t), (l = !1);
          } else
            (e = Nc()),
              l !== null &&
                l.memoizedState !== null &&
                (l.memoizedState.hydrationErrors = e),
              (l = !0);
          if (!l) return t.flags & 256 ? (dt(t), t) : (dt(t), null);
          if ((t.flags & 128) !== 0) throw Error(d(558));
        }
        return bl(t), null;
      case 13:
        if (
          ((a = t.memoizedState),
          l === null ||
            (l.memoizedState !== null && l.memoizedState.dehydrated !== null))
        ) {
          if (((u = na(t)), a !== null && a.dehydrated !== null)) {
            if (l === null) {
              if (!u) throw Error(d(318));
              if (
                ((u = t.memoizedState),
                (u = u !== null ? u.dehydrated : null),
                !u)
              )
                throw Error(d(317));
              u[Ql] = t;
            } else
              je(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4);
            bl(t), (u = !1);
          } else
            (u = Nc()),
              l !== null &&
                l.memoizedState !== null &&
                (l.memoizedState.hydrationErrors = u),
              (u = !0);
          if (!u) return t.flags & 256 ? (dt(t), t) : (dt(t), null);
        }
        return (
          dt(t),
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
              bl(t),
              null)
        );
      case 4:
        return zl(), l === null && Qi(t.stateNode.containerInfo), bl(t), null;
      case 10:
        return Xt(t.type), bl(t), null;
      case 19:
        if ((E(Ol), (a = t.memoizedState), a === null)) return bl(t), null;
        if (((u = (t.flags & 128) !== 0), (n = a.rendering), n === null))
          if (u) uu(a, !1);
          else {
            if (_l !== 0 || (l !== null && (l.flags & 128) !== 0))
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
                    x(Ol, (Ol.current & 1) | 2),
                    al && Yt(t, a.treeForkCount),
                    t.child
                  );
                }
                l = l.sibling;
              }
            a.tail !== null &&
              nt() > bn &&
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
                  !al)
              )
                return bl(t), null;
            } else
              2 * nt() - a.renderingStartTime > bn &&
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
            (a.renderingStartTime = nt()),
            (l.sibling = null),
            (e = Ol.current),
            x(Ol, u ? (e & 1) | 2 : e & 1),
            al && Yt(t, a.treeForkCount),
            l)
          : (bl(t), null);
      case 22:
      case 23:
        return (
          dt(t),
          Zc(),
          (a = t.memoizedState !== null),
          l !== null
            ? (l.memoizedState !== null) !== a && (t.flags |= 8192)
            : a && (t.flags |= 8192),
          a
            ? (e & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (bl(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : bl(t),
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
          l !== null && E(Ce),
          null
        );
      case 24:
        return (
          (e = null),
          l !== null && (e = l.memoizedState.cache),
          t.memoizedState.cache !== e && (t.flags |= 2048),
          Xt(jl),
          bl(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(d(156, t.tag));
  }
  function l0(l, t) {
    switch ((Oc(t), t.tag)) {
      case 1:
        return (
          (l = t.flags), l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 3:
        return (
          Xt(jl),
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
          if ((dt(t), t.alternate === null)) throw Error(d(340));
          je();
        }
        return (
          (l = t.flags), l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 13:
        if (
          (dt(t), (l = t.memoizedState), l !== null && l.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(d(340));
          je();
        }
        return (
          (l = t.flags), l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 19:
        return E(Ol), null;
      case 4:
        return zl(), null;
      case 10:
        return Xt(t.type), null;
      case 22:
      case 23:
        return (
          dt(t),
          Zc(),
          l !== null && E(Ce),
          (l = t.flags),
          l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 24:
        return Xt(jl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Ko(l, t) {
    switch ((Oc(t), t.tag)) {
      case 3:
        Xt(jl), zl();
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
        t.memoizedState !== null && dt(t);
        break;
      case 13:
        dt(t);
        break;
      case 19:
        E(Ol);
        break;
      case 10:
        Xt(t.type);
        break;
      case 22:
      case 23:
        dt(t), Zc(), l !== null && E(Ce);
        break;
      case 24:
        Xt(jl);
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
      ml(t, t.return, i);
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
              } catch (p) {
                ml(u, f, p);
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (p) {
      ml(t, t.return, p);
    }
  }
  function Jo(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var e = l.stateNode;
      try {
        Cs(t, e);
      } catch (a) {
        ml(l, l.return, a);
      }
    }
  }
  function wo(l, t, e) {
    (e.props = Xe(l.type, l.memoizedProps)), (e.state = l.memoizedState);
    try {
      e.componentWillUnmount();
    } catch (a) {
      ml(l, t, a);
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
      ml(l, t, u);
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
          ml(l, t, u);
        } finally {
          (l.refCleanup = null),
            (l = l.alternate),
            l != null && (l.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (u) {
          ml(l, t, u);
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
      ml(l, l.return, u);
    }
  }
  function Ei(l, t, e) {
    try {
      var a = l.stateNode;
      z0(a, l.type, e, t), (a[Il] = t);
    } catch (u) {
      ml(l, l.return, u);
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
      Jl(t, a, e), (t[Ql] = l), (t[Il] = e);
    } catch (n) {
      ml(l, l.return, n);
    }
  }
  var Kt = !1,
    Cl = !1,
    Ai = !1,
    Fo = typeof WeakSet == "function" ? WeakSet : Set,
    Xl = null;
  function t0(l, t) {
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
              p = 0,
              M = l,
              y = null;
            t: for (;;) {
              for (
                var b;
                M !== e || (u !== 0 && M.nodeType !== 3) || (i = c + u),
                  M !== n || (a !== 0 && M.nodeType !== 3) || (f = c + a),
                  M.nodeType === 3 && (c += M.nodeValue.length),
                  (b = M.firstChild) !== null;

              )
                (y = M), (M = b);
              for (;;) {
                if (M === l) break t;
                if (
                  (y === e && ++h === u && (i = c),
                  y === n && ++p === a && (f = c),
                  (b = M.nextSibling) !== null)
                )
                  break;
                (M = y), (y = M.parentNode);
              }
              M = b;
            }
            e = i === -1 || f === -1 ? null : { start: i, end: f };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (
      Ji = { focusedElem: l, selectionRange: e }, Bn = !1, Xl = t;
      Xl !== null;

    )
      if (
        ((t = Xl), (l = t.child), (t.subtreeFlags & 1028) !== 0 && l !== null)
      )
        (l.return = t), (Xl = l);
      else
        for (; Xl !== null; ) {
          switch (((t = Xl), (n = t.alternate), (l = t.flags), t.tag)) {
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
                  var q = Xe(e.type, u);
                  (l = a.getSnapshotBeforeUpdate(q, n)),
                    (a.__reactInternalSnapshotBeforeUpdate = l);
                } catch (Z) {
                  ml(e, e.return, Z);
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
              if ((l & 1024) !== 0) throw Error(d(163));
          }
          if (((l = t.sibling), l !== null)) {
            (l.return = t.return), (Xl = l);
            break;
          }
          Xl = t.return;
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
              ml(e, e.return, c);
            }
          else {
            var u = Xe(e.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              l.componentDidUpdate(u, t, l.__reactInternalSnapshotBeforeUpdate);
            } catch (c) {
              ml(e, e.return, c);
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
            ml(e, e.return, c);
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
              l !== null && ((e = o0.bind(null, e)), N0(l, e))));
        break;
      case 22:
        if (((a = e.memoizedState !== null || Kt), !a)) {
          (t = (t !== null && t.memoizedState !== null) || Cl), (u = Kt);
          var n = Cl;
          (Kt = a),
            (Cl = t) && !n ? Wt(l, e, (e.subtreeFlags & 8772) !== 0) : wt(l, e),
            (Kt = u),
            (Cl = n);
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
    if (ct && typeof ct.onCommitFiberUnmount == "function")
      try {
        ct.onCommitFiberUnmount(Na, e);
      } catch {}
    switch (e.tag) {
      case 26:
        Cl || jt(e, t),
          Jt(l, t, e),
          e.memoizedState
            ? e.memoizedState.count--
            : e.stateNode && ((e = e.stateNode), e.parentNode.removeChild(e));
        break;
      case 27:
        Cl || jt(e, t);
        var a = Tl,
          u = lt;
        ge(e.type) && ((Tl = e.stateNode), (lt = !1)),
          Jt(l, t, e),
          hu(e.stateNode),
          (Tl = a),
          (lt = u);
        break;
      case 5:
        Cl || jt(e, t);
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
              ml(e, t, n);
            }
          else
            try {
              Tl.removeChild(e.stateNode);
            } catch (n) {
              ml(e, t, n);
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
        oe(2, e, t), Cl || oe(4, e, t), Jt(l, t, e);
        break;
      case 1:
        Cl ||
          (jt(e, t),
          (a = e.stateNode),
          typeof a.componentWillUnmount == "function" && wo(e, t, a)),
          Jt(l, t, e);
        break;
      case 21:
        Jt(l, t, e);
        break;
      case 22:
        (Cl = (a = Cl) || e.memoizedState !== null), Jt(l, t, e), (Cl = a);
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
        ml(t, t.return, e);
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
        ml(t, t.return, e);
      }
  }
  function e0(l) {
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
        throw Error(d(435, l.tag));
    }
  }
  function yn(l, t) {
    var e = e0(l);
    t.forEach(function (a) {
      if (!e.has(a)) {
        e.add(a);
        var u = d0.bind(null, l, a);
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
        if (Tl === null) throw Error(d(160));
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
  var Dt = null;
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
          a & 512 && (Cl || e === null || jt(e, e.return)),
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
        var u = Dt;
        if (
          (tt(t, l),
          et(l),
          a & 512 && (Cl || e === null || jt(e, e.return)),
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
                          n[Ql] ||
                          n.namespaceURI === "http://www.w3.org/2000/svg" ||
                          n.hasAttribute("itemprop")) &&
                          ((n = u.createElement(a)),
                          u.head.insertBefore(
                            n,
                            u.querySelector("head > title")
                          )),
                        Jl(n, a, e),
                        (n[Ql] = l),
                        Gl(n),
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
                        Jl(n, a, e),
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
                        Jl(n, a, e),
                        u.head.appendChild(n);
                      break;
                    default:
                      throw Error(d(468, a));
                  }
                  (n[Ql] = l), Gl(n), (a = n);
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
          a & 512 && (Cl || e === null || jt(e, e.return)),
          e !== null && a & 4 && Ei(l, l.memoizedProps, e.memoizedProps);
        break;
      case 5:
        if (
          (tt(t, l),
          et(l),
          a & 512 && (Cl || e === null || jt(e, e.return)),
          l.flags & 32)
        ) {
          u = l.stateNode;
          try {
            $e(u, "");
          } catch (q) {
            ml(l, l.return, q);
          }
        }
        a & 4 &&
          l.stateNode != null &&
          ((u = l.memoizedProps), Ei(l, u, e !== null ? e.memoizedProps : u)),
          a & 1024 && (Ai = !0);
        break;
      case 6:
        if ((tt(t, l), et(l), a & 4)) {
          if (l.stateNode === null) throw Error(d(162));
          (a = l.memoizedProps), (e = l.stateNode);
          try {
            e.nodeValue = a;
          } catch (q) {
            ml(l, l.return, q);
          }
        }
        break;
      case 3:
        if (
          ((jn = null),
          (u = Dt),
          (Dt = Nn(t.containerInfo)),
          tt(t, l),
          (Dt = u),
          et(l),
          a & 4 && e !== null && e.memoizedState.isDehydrated)
        )
          try {
            _a(t.containerInfo);
          } catch (q) {
            ml(l, l.return, q);
          }
        Ai && ((Ai = !1), ud(l));
        break;
      case 4:
        (a = Dt),
          (Dt = Nn(l.stateNode.containerInfo)),
          tt(t, l),
          et(l),
          (Dt = a);
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
            (Sn = nt()),
          a & 4 &&
            ((a = l.updateQueue),
            a !== null && ((l.updateQueue = null), yn(l, a)));
        break;
      case 22:
        u = l.memoizedState !== null;
        var f = e !== null && e.memoizedState !== null,
          h = Kt,
          p = Cl;
        if (
          ((Kt = h || u),
          (Cl = p || f),
          tt(t, l),
          (Cl = p),
          (Kt = h),
          et(l),
          a & 8192)
        )
          l: for (
            t = l.stateNode,
              t._visibility = u ? t._visibility & -2 : t._visibility | 1,
              u && (e === null || f || Kt || Cl || Le(l)),
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
                      y =
                        M != null && M.hasOwnProperty("display")
                          ? M.display
                          : null;
                    i.style.display =
                      y == null || typeof y == "boolean" ? "" : ("" + y).trim();
                  }
                } catch (q) {
                  ml(f, f.return, q);
                }
              }
            } else if (t.tag === 6) {
              if (e === null) {
                f = t;
                try {
                  f.stateNode.nodeValue = u ? "" : f.memoizedProps;
                } catch (q) {
                  ml(f, f.return, q);
                }
              }
            } else if (t.tag === 18) {
              if (e === null) {
                f = t;
                try {
                  var b = f.stateNode;
                  u ? wd(b, !0) : wd(f.stateNode, !1);
                } catch (q) {
                  ml(f, f.return, q);
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
        if (e == null) throw Error(d(160));
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
            throw Error(d(161));
        }
      } catch (p) {
        ml(l, l.return, p);
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
  function Le(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          oe(4, t, t.return), Le(t);
          break;
        case 1:
          jt(t, t.return);
          var e = t.stateNode;
          typeof e.componentWillUnmount == "function" && wo(t, t.return, e),
            Le(t);
          break;
        case 27:
          hu(t.stateNode);
        case 26:
        case 5:
          jt(t, t.return), Le(t);
          break;
        case 22:
          t.memoizedState === null && Le(t);
          break;
        case 30:
          Le(t);
          break;
        default:
          Le(t);
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
              ml(a, a.return, h);
            }
          if (((a = n), (u = a.updateQueue), u !== null)) {
            var i = a.stateNode;
            try {
              var f = u.shared.hiddenCallbacks;
              if (f !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < f.length; u++)
                  Hs(f[u], i);
            } catch (h) {
              ml(a, a.return, h);
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
  function Ot(l, t, e, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) nd(l, t, e, a), (t = t.sibling);
  }
  function nd(l, t, e, a) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Ot(l, t, e, a), u & 2048 && nu(9, t);
        break;
      case 1:
        Ot(l, t, e, a);
        break;
      case 3:
        Ot(l, t, e, a),
          u & 2048 &&
            ((l = null),
            t.alternate !== null && (l = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== l && (t.refCount++, l != null && Ja(l)));
        break;
      case 12:
        if (u & 2048) {
          Ot(l, t, e, a), (l = t.stateNode);
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
            ml(t, t.return, f);
          }
        } else Ot(l, t, e, a);
        break;
      case 31:
        Ot(l, t, e, a);
        break;
      case 13:
        Ot(l, t, e, a);
        break;
      case 23:
        break;
      case 22:
        (n = t.stateNode),
          (c = t.alternate),
          t.memoizedState !== null
            ? n._visibility & 2
              ? Ot(l, t, e, a)
              : iu(l, t)
            : n._visibility & 2
              ? Ot(l, t, e, a)
              : ((n._visibility |= 2),
                ha(l, t, e, a, (t.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && Mi(c, t);
        break;
      case 24:
        Ot(l, t, e, a), u & 2048 && _i(t.alternate, t);
        break;
      default:
        Ot(l, t, e, a);
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
          var p = c.stateNode;
          c.memoizedState !== null
            ? p._visibility & 2
              ? ha(n, c, i, f, u)
              : iu(n, c)
            : ((p._visibility |= 2), ha(n, c, i, f, u)),
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
            Q0(e, Dt, l.memoizedState, l.memoizedProps);
        break;
      case 5:
        ya(l, t, e);
        break;
      case 3:
      case 4:
        var a = Dt;
        (Dt = Nn(l.stateNode.containerInfo)), ya(l, t, e), (Dt = a);
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
          (Xl = a), sd(a, l);
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
          (Xl = a), sd(a, l);
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
    for (; Xl !== null; ) {
      var e = Xl;
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
      if (((a = e.child), a !== null)) (a.return = e), (Xl = a);
      else
        l: for (e = l; Xl !== null; ) {
          a = Xl;
          var u = a.sibling,
            n = a.return;
          if ((Po(a), a === e)) {
            Xl = null;
            break l;
          }
          if (u !== null) {
            (u.return = n), (Xl = u);
            break l;
          }
          Xl = n;
        }
    }
  }
  var a0 = {
      getCacheForType: function (l) {
        var t = Vl(jl),
          e = t.data.get(l);
        return e === void 0 && ((e = l()), t.data.set(l, e)), e;
      },
      cacheSignal: function () {
        return Vl(jl).controller.signal;
      },
    },
    u0 = typeof WeakMap == "function" ? WeakMap : Map,
    sl = 0,
    gl = null,
    P = null,
    tl = 0,
    rl = 0,
    rt = null,
    de = !1,
    ga = !1,
    Di = !1,
    $t = 0,
    _l = 0,
    re = 0,
    Qe = 0,
    Oi = 0,
    mt = 0,
    Sa = 0,
    ou = null,
    at = null,
    Ui = !1,
    Sn = 0,
    od = 0,
    bn = 1 / 0,
    pn = null,
    me = null,
    Bl = 0,
    ve = null,
    ba = null,
    kt = 0,
    Ni = 0,
    Ri = null,
    dd = null,
    du = 0,
    ji = null;
  function vt() {
    return (sl & 2) !== 0 && tl !== 0 ? tl & -tl : s.T !== null ? Yi() : _f();
  }
  function rd() {
    if (mt === 0)
      if ((tl & 536870912) === 0 || al) {
        var l = Du;
        (Du <<= 1), (Du & 3932160) === 0 && (Du = 262144), (mt = l);
      } else mt = 536870912;
    return (l = ot.current), l !== null && (l.flags |= 32), mt;
  }
  function ut(l, t, e) {
    ((l === gl && (rl === 2 || rl === 9)) || l.cancelPendingCommit !== null) &&
      (pa(l, 0), he(l, tl, mt, !1)),
      ja(l, e),
      ((sl & 2) === 0 || l !== gl) &&
        (l === gl &&
          ((sl & 2) === 0 && (Qe |= e), _l === 4 && he(l, tl, mt, !1)),
        xt(l));
  }
  function md(l, t, e) {
    if ((sl & 6) !== 0) throw Error(d(327));
    var a = (!e && (t & 127) === 0 && (t & l.expiredLanes) === 0) || Ra(l, t),
      u = a ? i0(l, t) : Hi(l, t, !0),
      n = a;
    do {
      if (u === 0) {
        ga && !a && he(l, t, 0, !1);
        break;
      } else {
        if (((e = l.current.alternate), n && !n0(e))) {
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
              throw Error(d(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              he(a, t, mt, !de);
              break l;
            case 2:
              at = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(d(329));
          }
          if ((t & 62914560) === t && ((u = Sn + 300 - nt()), 10 < u)) {
            if ((he(a, t, mt, !de), Uu(a, 0, !0) !== 0)) break l;
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
                  mt,
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
          vd(a, e, at, pn, Ui, t, mt, Qe, Sa, de, n, null, -0, 0);
        }
      }
      break;
    } while (!0);
    xt(l);
  }
  function vd(l, t, e, a, u, n, c, i, f, h, p, M, y, b) {
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
        (n & 62914560) === n ? Sn - nt() : (n & 4194048) === n ? od - nt() : 0;
      if (((q = Z0(M, q)), q !== null)) {
        (kt = n),
          (l.cancelPendingCommit = q(
            zd.bind(null, l, t, n, e, a, u, c, i, f, p, M, null, y, b)
          )),
          he(l, n, c, !h);
        return;
      }
    }
    zd(l, t, n, e, a, u, c, i, f);
  }
  function n0(l) {
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
            if (!ft(n(), u)) return !1;
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
      var n = 31 - it(u),
        c = 1 << n;
      (a[n] = -1), (u &= ~c);
    }
    e !== 0 && Tf(l, e, t);
  }
  function En() {
    return (sl & 6) === 0 ? (ru(0), !1) : !0;
  }
  function xi() {
    if (P !== null) {
      if (rl === 0) var l = P.return;
      else (l = P), (Gt = xe = null), $c(l), (oa = null), (Wa = 0), (l = P);
      for (; l !== null; ) Ko(l.alternate, l), (l = l.return);
      P = null;
    }
  }
  function pa(l, t) {
    var e = l.timeoutHandle;
    e !== -1 && ((l.timeoutHandle = -1), M0(e)),
      (e = l.cancelPendingCommit),
      e !== null && ((l.cancelPendingCommit = null), e()),
      (kt = 0),
      xi(),
      (gl = l),
      (P = e = qt(l.current, null)),
      (tl = t),
      (rl = 0),
      (rt = null),
      (de = !1),
      (ga = Ra(l, t)),
      (Di = !1),
      (Sa = mt = Oi = Qe = re = _l = 0),
      (at = ou = null),
      (Ui = !1),
      (t & 8) !== 0 && (t |= t & 32);
    var a = l.entangledLanes;
    if (a !== 0)
      for (l = l.entanglements, a &= t; 0 < a; ) {
        var u = 31 - it(a),
          n = 1 << u;
        (t |= l[u]), (a &= ~n);
      }
    return ($t = t), Lu(), e;
  }
  function hd(l, t) {
    (F = null),
      (s.H = eu),
      t === sa || t === $u
        ? ((t = Ns()), (rl = 3))
        : t === qc
          ? ((t = Ns()), (rl = 4))
          : (rl =
              t === di
                ? 8
                : t !== null &&
                    typeof t == "object" &&
                    typeof t.then == "function"
                  ? 6
                  : 1),
      (rt = t),
      P === null && ((_l = 1), on(l, St(t, l.current)));
  }
  function yd() {
    var l = ot.current;
    return l === null
      ? !0
      : (tl & 4194048) === tl
        ? zt === null
        : (tl & 62914560) === tl || (tl & 536870912) !== 0
          ? l === zt
          : !1;
  }
  function gd() {
    var l = s.H;
    return (s.H = eu), l === null ? eu : l;
  }
  function Sd() {
    var l = s.A;
    return (s.A = a0), l;
  }
  function zn() {
    (_l = 4),
      de || ((tl & 4194048) !== tl && ot.current !== null) || (ga = !0),
      ((re & 134217727) === 0 && (Qe & 134217727) === 0) ||
        gl === null ||
        he(gl, tl, mt, !1);
  }
  function Hi(l, t, e) {
    var a = sl;
    sl |= 2;
    var u = gd(),
      n = Sd();
    (gl !== l || tl !== t) && ((pn = null), pa(l, t)), (t = !1);
    var c = _l;
    l: do
      try {
        if (rl !== 0 && P !== null) {
          var i = P,
            f = rt;
          switch (rl) {
            case 8:
              xi(), (c = 6);
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              ot.current === null && (t = !0);
              var h = rl;
              if (((rl = 0), (rt = null), Ea(l, i, f, h), e && ga)) {
                c = 0;
                break l;
              }
              break;
            default:
              (h = rl), (rl = 0), (rt = null), Ea(l, i, f, h);
          }
        }
        c0(), (c = _l);
        break;
      } catch (p) {
        hd(l, p);
      }
    while (!0);
    return (
      t && l.shellSuspendCounter++,
      (Gt = xe = null),
      (sl = a),
      (s.H = u),
      (s.A = n),
      P === null && ((gl = null), (tl = 0), Lu()),
      c
    );
  }
  function c0() {
    for (; P !== null; ) bd(P);
  }
  function i0(l, t) {
    var e = sl;
    sl |= 2;
    var a = gd(),
      u = Sd();
    gl !== l || tl !== t
      ? ((pn = null), (bn = nt() + 500), pa(l, t))
      : (ga = Ra(l, t));
    l: do
      try {
        if (rl !== 0 && P !== null) {
          t = P;
          var n = rt;
          t: switch (rl) {
            case 1:
              (rl = 0), (rt = null), Ea(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (Os(n)) {
                (rl = 0), (rt = null), pd(t);
                break;
              }
              (t = function () {
                (rl !== 2 && rl !== 9) || gl !== l || (rl = 7), xt(l);
              }),
                n.then(t, t);
              break l;
            case 3:
              rl = 7;
              break l;
            case 4:
              rl = 5;
              break l;
            case 7:
              Os(n)
                ? ((rl = 0), (rt = null), pd(t))
                : ((rl = 0), (rt = null), Ea(l, t, n, 7));
              break;
            case 5:
              var c = null;
              switch (P.tag) {
                case 26:
                  c = P.memoizedState;
                case 5:
                case 27:
                  var i = P;
                  if (c ? nr(c) : i.stateNode.complete) {
                    (rl = 0), (rt = null);
                    var f = i.sibling;
                    if (f !== null) P = f;
                    else {
                      var h = i.return;
                      h !== null ? ((P = h), Tn(h)) : (P = null);
                    }
                    break t;
                  }
              }
              (rl = 0), (rt = null), Ea(l, t, n, 5);
              break;
            case 6:
              (rl = 0), (rt = null), Ea(l, t, n, 6);
              break;
            case 8:
              xi(), (_l = 6);
              break l;
            default:
              throw Error(d(462));
          }
        }
        f0();
        break;
      } catch (p) {
        hd(l, p);
      }
    while (!0);
    return (
      (Gt = xe = null),
      (s.H = a),
      (s.A = u),
      (sl = e),
      P !== null ? 0 : ((gl = null), (tl = 0), Lu(), _l)
    );
  }
  function f0() {
    for (; P !== null && !Rr(); ) bd(P);
  }
  function bd(l) {
    var t = Zo(l.alternate, l, $t);
    (l.memoizedProps = l.pendingProps), t === null ? Tn(l) : (P = t);
  }
  function pd(l) {
    var t = l,
      e = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = qo(e, t, t.pendingProps, t.type, void 0, tl);
        break;
      case 11:
        t = qo(e, t, t.pendingProps, t.type.render, t.ref, tl);
        break;
      case 5:
        $c(t);
      default:
        Ko(e, t), (t = P = gs(t, $t)), (t = Zo(e, t, $t));
    }
    (l.memoizedProps = l.pendingProps), t === null ? Tn(l) : (P = t);
  }
  function Ea(l, t, e, a) {
    (Gt = xe = null), $c(t), (oa = null), (Wa = 0);
    var u = t.return;
    try {
      if (km(l, u, t, e, tl)) {
        (_l = 1), on(l, St(e, l.current)), (P = null);
        return;
      }
    } catch (n) {
      if (u !== null) throw ((P = u), n);
      (_l = 1), on(l, St(e, l.current)), (P = null);
      return;
    }
    t.flags & 32768
      ? (al || a === 1
          ? (l = !0)
          : ga || (tl & 536870912) !== 0
            ? (l = !1)
            : ((de = l = !0),
              (a === 2 || a === 9 || a === 3 || a === 6) &&
                ((a = ot.current),
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
      var e = Pm(t.alternate, t, $t);
      if (e !== null) {
        P = e;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        P = t;
        return;
      }
      P = t = l;
    } while (t !== null);
    _l === 0 && (_l = 5);
  }
  function Ed(l, t) {
    do {
      var e = l0(l.alternate, l);
      if (e !== null) {
        (e.flags &= 32767), (P = e);
        return;
      }
      if (
        ((e = l.return),
        e !== null &&
          ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null)),
        !t && ((l = l.sibling), l !== null))
      ) {
        P = l;
        return;
      }
      P = l = e;
    } while (l !== null);
    (_l = 6), (P = null);
  }
  function zd(l, t, e, a, u, n, c, i, f) {
    l.cancelPendingCommit = null;
    do An();
    while (Bl !== 0);
    if ((sl & 6) !== 0) throw Error(d(327));
    if (t !== null) {
      if (t === l.current) throw Error(d(177));
      if (
        ((n = t.lanes | t.childLanes),
        (n |= zc),
        Lr(l, e, n, c, i, f),
        l === gl && ((P = gl = null), (tl = 0)),
        (ba = t),
        (ve = l),
        (kt = e),
        (Ni = n),
        (Ri = u),
        (dd = a),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((l.callbackNode = null),
            (l.callbackPriority = 0),
            r0(Mu, function () {
              return Dd(), null;
            }))
          : ((l.callbackNode = null), (l.callbackPriority = 0)),
        (a = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || a)
      ) {
        (a = s.T), (s.T = null), (u = z.p), (z.p = 2), (c = sl), (sl |= 4);
        try {
          t0(l, t, e);
        } finally {
          (sl = c), (z.p = u), (s.T = a);
        }
      }
      (Bl = 1), Td(), Ad(), Md();
    }
  }
  function Td() {
    if (Bl === 1) {
      Bl = 0;
      var l = ve,
        t = ba,
        e = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || e) {
        (e = s.T), (s.T = null);
        var a = z.p;
        z.p = 2;
        var u = sl;
        sl |= 4;
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
                p = f.end;
              if ((p === void 0 && (p = h), "selectionStart" in i))
                (i.selectionStart = h),
                  (i.selectionEnd = Math.min(p, i.value.length));
              else {
                var M = i.ownerDocument || document,
                  y = (M && M.defaultView) || window;
                if (y.getSelection) {
                  var b = y.getSelection(),
                    q = i.textContent.length,
                    Z = Math.min(f.start, q),
                    yl = f.end === void 0 ? Z : Math.min(f.end, q);
                  !b.extend && Z > yl && ((c = yl), (yl = Z), (Z = c));
                  var m = cs(i, Z),
                    r = cs(i, yl);
                  if (
                    m &&
                    r &&
                    (b.rangeCount !== 1 ||
                      b.anchorNode !== m.node ||
                      b.anchorOffset !== m.offset ||
                      b.focusNode !== r.node ||
                      b.focusOffset !== r.offset)
                  ) {
                    var v = M.createRange();
                    v.setStart(m.node, m.offset),
                      b.removeAllRanges(),
                      Z > yl
                        ? (b.addRange(v), b.extend(r.node, r.offset))
                        : (v.setEnd(r.node, r.offset), b.addRange(v));
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
              var T = M[i];
              (T.element.scrollLeft = T.left), (T.element.scrollTop = T.top);
            }
          }
          (Bn = !!Ki), (Ji = Ki = null);
        } finally {
          (sl = u), (z.p = a), (s.T = e);
        }
      }
      (l.current = t), (Bl = 2);
    }
  }
  function Ad() {
    if (Bl === 2) {
      Bl = 0;
      var l = ve,
        t = ba,
        e = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || e) {
        (e = s.T), (s.T = null);
        var a = z.p;
        z.p = 2;
        var u = sl;
        sl |= 4;
        try {
          Io(l, t.alternate, t);
        } finally {
          (sl = u), (z.p = a), (s.T = e);
        }
      }
      Bl = 3;
    }
  }
  function Md() {
    if (Bl === 4 || Bl === 3) {
      (Bl = 0), jr();
      var l = ve,
        t = ba,
        e = kt,
        a = dd;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Bl = 5)
        : ((Bl = 0), (ba = ve = null), _d(l, l.pendingLanes));
      var u = l.pendingLanes;
      if (
        (u === 0 && (me = null),
        In(e),
        (t = t.stateNode),
        ct && typeof ct.onCommitFiberRoot == "function")
      )
        try {
          ct.onCommitFiberRoot(Na, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (a !== null) {
        (t = s.T), (u = z.p), (z.p = 2), (s.T = null);
        try {
          for (var n = l.onRecoverableError, c = 0; c < a.length; c++) {
            var i = a[c];
            n(i.value, { componentStack: i.stack });
          }
        } finally {
          (s.T = t), (z.p = u);
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
    if (Bl !== 5) return !1;
    var l = ve,
      t = Ni;
    Ni = 0;
    var e = In(kt),
      a = s.T,
      u = z.p;
    try {
      (z.p = 32 > e ? 32 : e), (s.T = null), (e = Ri), (Ri = null);
      var n = ve,
        c = kt;
      if (((Bl = 0), (ba = ve = null), (kt = 0), (sl & 6) !== 0))
        throw Error(d(331));
      var i = sl;
      if (
        ((sl |= 4),
        fd(n.current),
        nd(n, n.current, c, e),
        (sl = i),
        ru(0, !1),
        ct && typeof ct.onPostCommitFiberRoot == "function")
      )
        try {
          ct.onPostCommitFiberRoot(Na, n);
        } catch {}
      return !0;
    } finally {
      (z.p = u), (s.T = a), _d(l, t);
    }
  }
  function Od(l, t, e) {
    (t = St(e, t)),
      (t = oi(l.stateNode, t, 2)),
      (l = ie(l, t, 2)),
      l !== null && (ja(l, 2), xt(l));
  }
  function ml(l, t, e) {
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
            (l = St(e, l)),
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
      a = l.pingCache = new u0();
      var u = new Set();
      a.set(t, u);
    } else (u = a.get(t)), u === void 0 && ((u = new Set()), a.set(t, u));
    u.has(e) ||
      ((Di = !0), u.add(e), (l = s0.bind(null, l, t, e)), t.then(l, l));
  }
  function s0(l, t, e) {
    var a = l.pingCache;
    a !== null && a.delete(t),
      (l.pingedLanes |= l.suspendedLanes & e),
      (l.warmLanes &= ~e),
      gl === l &&
        (tl & e) === e &&
        (_l === 4 || (_l === 3 && (tl & 62914560) === tl && 300 > nt() - Sn)
          ? (sl & 2) === 0 && pa(l, 0)
          : (Oi |= e),
        Sa === tl && (Sa = 0)),
      xt(l);
  }
  function Ud(l, t) {
    t === 0 && (t = zf()), (l = Ne(l, t)), l !== null && (ja(l, t), xt(l));
  }
  function o0(l) {
    var t = l.memoizedState,
      e = 0;
    t !== null && (e = t.retryLane), Ud(l, e);
  }
  function d0(l, t) {
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
        throw Error(d(314));
    }
    a !== null && a.delete(t), Ud(l, e);
  }
  function r0(l, t) {
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
      Bi || ((Bi = !0), v0());
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
              (n = (1 << (31 - it(42 | l) + 1)) - 1),
                (n &= u & ~(c & ~i)),
                (n = n & 201326741 ? (n & 201326741) | 1 : n ? n | 2 : 0);
            }
            n !== 0 && ((e = !0), xd(a, n));
          } else
            (n = tl),
              (n = Uu(
                a,
                a === gl ? n : 0,
                a.cancelPendingCommit !== null || a.timeoutHandle !== -1
              )),
              (n & 3) === 0 || Ra(a, n) || ((e = !0), xd(a, n));
          a = a.next;
        }
      while (e);
      qi = !1;
    }
  }
  function m0() {
    Nd();
  }
  function Nd() {
    _n = Bi = !1;
    var l = 0;
    ye !== 0 && A0() && (l = ye);
    for (var t = nt(), e = null, a = Mn; a !== null; ) {
      var u = a.next,
        n = Rd(a, t);
      n === 0
        ? ((a.next = null),
          e === null ? (Mn = u) : (e.next = u),
          u === null && (za = e))
        : ((e = a), (l !== 0 || (n & 3) !== 0) && (_n = !0)),
        (a = u);
    }
    (Bl !== 0 && Bl !== 5) || ru(l), ye !== 0 && (ye = 0);
  }
  function Rd(l, t) {
    for (
      var e = l.suspendedLanes,
        a = l.pingedLanes,
        u = l.expirationTimes,
        n = l.pendingLanes & -62914561;
      0 < n;

    ) {
      var c = 31 - it(n),
        i = 1 << c,
        f = u[c];
      f === -1
        ? ((i & e) === 0 || (i & a) !== 0) && (u[c] = Xr(i, t))
        : f <= t && (l.expiredLanes |= i),
        (n &= ~i);
    }
    if (
      ((t = gl),
      (e = tl),
      (e = Uu(
        l,
        l === t ? e : 0,
        l.cancelPendingCommit !== null || l.timeoutHandle !== -1
      )),
      (a = l.callbackNode),
      e === 0 ||
        (l === t && (rl === 2 || rl === 9)) ||
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
    if (Bl !== 0 && Bl !== 5)
      return (l.callbackNode = null), (l.callbackPriority = 0), null;
    var e = l.callbackNode;
    if (An() && l.callbackNode !== e) return null;
    var a = tl;
    return (
      (a = Uu(
        l,
        l === gl ? a : 0,
        l.cancelPendingCommit !== null || l.timeoutHandle !== -1
      )),
      a === 0
        ? null
        : (md(l, a, t),
          Rd(l, nt()),
          l.callbackNode != null && l.callbackNode === e
            ? jd.bind(null, l)
            : null)
    );
  }
  function xd(l, t) {
    if (An()) return null;
    md(l, t, !0);
  }
  function v0() {
    _0(function () {
      (sl & 6) !== 0 ? Wn(bf, m0) : Nd();
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
  function h0(l, t, e, a, u) {
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
    var Xi = Ec[Gi],
      y0 = Xi.toLowerCase(),
      g0 = Xi[0].toUpperCase() + Xi.slice(1);
    _t(y0, "on" + g0);
  }
  _t(ds, "onAnimationEnd"),
    _t(rs, "onAnimationIteration"),
    _t(ms, "onAnimationStart"),
    _t("dblclick", "onDoubleClick"),
    _t("focusin", "onFocus"),
    _t("focusout", "onBlur"),
    _t(xm, "onTransitionRun"),
    _t(Hm, "onTransitionStart"),
    _t(Cm, "onTransitionCancel"),
    _t(vs, "onTransitionEnd"),
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
    S0 = new Set(
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
            } catch (p) {
              Xu(p);
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
            } catch (p) {
              Xu(p);
            }
            (u.currentTarget = null), (n = f);
          }
      }
    }
  }
  function ll(l, t) {
    var e = t[Pn];
    e === void 0 && (e = t[Pn] = new Set());
    var a = l + "__bubble";
    e.has(a) || (qd(t, l, 2, !1), e.add(a));
  }
  function Li(l, t, e) {
    var a = 0;
    t && (a |= 4), qd(e, l, a, t);
  }
  var Dn = "_reactListening" + Math.random().toString(36).slice(2);
  function Qi(l) {
    if (!l[Dn]) {
      (l[Dn] = !0),
        Uf.forEach(function (e) {
          e !== "selectionchange" && (S0.has(e) || Li(e, !1, l), Li(e, !0, l));
        });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[Dn] || ((t[Dn] = !0), Li("selectionchange", !1, t));
    }
  }
  function qd(l, t, e, a) {
    switch (rr(t)) {
      case 2:
        var u = J0;
        break;
      case 8:
        u = w0;
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
    Lf(function () {
      var h = n,
        p = cc(e),
        M = [];
      l: {
        var y = hs.get(l);
        if (y !== void 0) {
          var b = qu,
            q = l;
          switch (l) {
            case "keypress":
              if (Cu(e) === 0) break l;
            case "keydown":
            case "keyup":
              b = dm;
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
              b = Pr;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              b = vm;
              break;
            case ds:
            case rs:
            case ms:
              b = em;
              break;
            case vs:
              b = ym;
              break;
            case "scroll":
            case "scrollend":
              b = Fr;
              break;
            case "wheel":
              b = Sm;
              break;
            case "copy":
            case "cut":
            case "paste":
              b = um;
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
              b = pm;
          }
          var Z = (t & 4) !== 0,
            yl = !Z && (l === "scroll" || l === "scrollend"),
            m = Z ? (y !== null ? y + "Capture" : null) : y;
          Z = [];
          for (var r = h, v; r !== null; ) {
            var T = r;
            if (
              ((v = T.stateNode),
              (T = T.tag),
              (T !== 5 && T !== 26 && T !== 27) ||
                v === null ||
                m === null ||
                ((T = Ca(r, m)), T != null && Z.push(vu(r, T, v))),
              yl)
            )
              break;
            r = r.return;
          }
          0 < Z.length &&
            ((y = new b(y, q, null, e, p)), M.push({ event: y, listeners: Z }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (
            ((y = l === "mouseover" || l === "pointerover"),
            (b = l === "mouseout" || l === "pointerout"),
            y &&
              e !== nc &&
              (q = e.relatedTarget || e.fromElement) &&
              (Ve(q) || q[Ze]))
          )
            break l;
          if (
            (b || y) &&
            ((y =
              p.window === p
                ? p
                : (y = p.ownerDocument)
                  ? y.defaultView || y.parentWindow
                  : window),
            b
              ? ((q = e.relatedTarget || e.toElement),
                (b = h),
                (q = q ? Ve(q) : null),
                q !== null &&
                  ((yl = j(q)),
                  (Z = q.tag),
                  q !== yl || (Z !== 5 && Z !== 27 && Z !== 6)) &&
                  (q = null))
              : ((b = null), (q = h)),
            b !== q)
          ) {
            if (
              ((Z = Vf),
              (T = "onMouseLeave"),
              (m = "onMouseEnter"),
              (r = "mouse"),
              (l === "pointerout" || l === "pointerover") &&
                ((Z = Jf),
                (T = "onPointerLeave"),
                (m = "onPointerEnter"),
                (r = "pointer")),
              (yl = b == null ? y : Ha(b)),
              (v = q == null ? y : Ha(q)),
              (y = new Z(T, r + "leave", b, e, p)),
              (y.target = yl),
              (y.relatedTarget = v),
              (T = null),
              Ve(p) === h &&
                ((Z = new Z(m, r + "enter", q, e, p)),
                (Z.target = v),
                (Z.relatedTarget = yl),
                (T = Z)),
              (yl = T),
              b && q)
            )
              t: {
                for (Z = b0, m = b, r = q, v = 0, T = m; T; T = Z(T)) v++;
                T = 0;
                for (var L = r; L; L = Z(L)) T++;
                for (; 0 < v - T; ) (m = Z(m)), v--;
                for (; 0 < T - v; ) (r = Z(r)), T--;
                for (; v--; ) {
                  if (m === r || (r !== null && m === r.alternate)) {
                    Z = m;
                    break t;
                  }
                  (m = Z(m)), (r = Z(r));
                }
                Z = null;
              }
            else Z = null;
            b !== null && Yd(M, y, b, Z, !1),
              q !== null && yl !== null && Yd(M, yl, q, Z, !0);
          }
        }
        l: {
          if (
            ((y = h ? Ha(h) : window),
            (b = y.nodeName && y.nodeName.toLowerCase()),
            b === "select" || (b === "input" && y.type === "file"))
          )
            var il = ls;
          else if (If(y))
            if (ts) il = Nm;
            else {
              il = Om;
              var Y = Dm;
            }
          else
            (b = y.nodeName),
              !b ||
              b.toLowerCase() !== "input" ||
              (y.type !== "checkbox" && y.type !== "radio")
                ? h && uc(h.elementType) && (il = ls)
                : (il = Um);
          if (il && (il = il(l, h))) {
            Pf(M, il, e, p);
            break l;
          }
          Y && Y(l, y, h),
            l === "focusout" &&
              h &&
              y.type === "number" &&
              h.memoizedProps.value != null &&
              ac(y, "number", y.value);
        }
        switch (((Y = h ? Ha(h) : window), l)) {
          case "focusin":
            (If(Y) || Y.contentEditable === "true") &&
              ((Pe = Y), (Sc = h), (Za = null));
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
            (bc = !1), ss(M, e, p);
            break;
          case "selectionchange":
            if (jm) break;
          case "keydown":
          case "keyup":
            ss(M, e, p);
        }
        var I;
        if (vc)
          l: {
            switch (l) {
              case "compositionstart":
                var el = "onCompositionStart";
                break l;
              case "compositionend":
                el = "onCompositionEnd";
                break l;
              case "compositionupdate":
                el = "onCompositionUpdate";
                break l;
            }
            el = void 0;
          }
        else
          Ie
            ? kf(l, e) && (el = "onCompositionEnd")
            : l === "keydown" &&
              e.keyCode === 229 &&
              (el = "onCompositionStart");
        el &&
          (wf &&
            e.locale !== "ko" &&
            (Ie || el !== "onCompositionStart"
              ? el === "onCompositionEnd" && Ie && (I = Qf())
              : ((le = p),
                (sc = "value" in le ? le.value : le.textContent),
                (Ie = !0))),
          (Y = On(h, el)),
          0 < Y.length &&
            ((el = new Kf(el, l, null, e, p)),
            M.push({ event: el, listeners: Y }),
            I ? (el.data = I) : ((I = Ff(e)), I !== null && (el.data = I)))),
          (I = zm ? Tm(l, e) : Am(l, e)) &&
            ((el = On(h, "onBeforeInput")),
            0 < el.length &&
              ((Y = new Kf("onBeforeInput", "beforeinput", null, e, p)),
              M.push({ event: Y, listeners: el }),
              (Y.data = I))),
          h0(M, l, h, e, p);
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
  function b0(l) {
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
  var p0 = /\r\n?/g,
    E0 = /\u0000|\uFFFD/g;
  function Gd(l) {
    return (typeof l == "string" ? l : "" + l)
      .replace(
        p0,
        `
`
      )
      .replace(E0, "");
  }
  function Xd(l, t) {
    return (t = Gd(t)), Gd(l) === t;
  }
  function hl(l, t, e, a, u, n) {
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
              ? (t !== "input" && hl(l, t, "name", u.name, u, null),
                hl(l, t, "formEncType", u.formEncType, u, null),
                hl(l, t, "formMethod", u.formMethod, u, null),
                hl(l, t, "formTarget", u.formTarget, u, null))
              : (hl(l, t, "encType", u.encType, u, null),
                hl(l, t, "method", u.method, u, null),
                hl(l, t, "target", u.target, u, null)));
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
        a != null && ll("scroll", l);
        break;
      case "onScrollEnd":
        a != null && ll("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(d(61));
          if (((e = a.__html), e != null)) {
            if (u.children != null) throw Error(d(60));
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
        ll("beforetoggle", l), ll("toggle", l), Nu(l, "popover", a);
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
          ((e = $r.get(e) || e), Nu(l, e, a));
    }
  }
  function Vi(l, t, e, a, u, n) {
    switch (e) {
      case "style":
        Gf(l, a, n);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(d(61));
          if (((e = a.__html), e != null)) {
            if (u.children != null) throw Error(d(60));
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
        a != null && ll("scroll", l);
        break;
      case "onScrollEnd":
        a != null && ll("scrollend", l);
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
  function Jl(l, t, e) {
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
        ll("error", l), ll("load", l);
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
                  throw Error(d(137, t));
                default:
                  hl(l, t, n, c, e, null);
              }
          }
        u && hl(l, t, "srcSet", e.srcSet, e, null),
          a && hl(l, t, "src", e.src, e, null);
        return;
      case "input":
        ll("invalid", l);
        var i = (n = c = u = null),
          f = null,
          h = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var p = e[a];
            if (p != null)
              switch (a) {
                case "name":
                  u = p;
                  break;
                case "type":
                  c = p;
                  break;
                case "checked":
                  f = p;
                  break;
                case "defaultChecked":
                  h = p;
                  break;
                case "value":
                  n = p;
                  break;
                case "defaultValue":
                  i = p;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (p != null) throw Error(d(137, t));
                  break;
                default:
                  hl(l, t, a, p, e, null);
              }
          }
        Cf(l, n, i, f, h, c, u, !1);
        return;
      case "select":
        ll("invalid", l), (a = c = n = null);
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
                hl(l, t, u, i, e, null);
            }
        (t = n),
          (e = c),
          (l.multiple = !!a),
          t != null ? We(l, !!a, t, !1) : e != null && We(l, !!a, e, !0);
        return;
      case "textarea":
        ll("invalid", l), (n = u = a = null);
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
                if (i != null) throw Error(d(91));
                break;
              default:
                hl(l, t, c, i, e, null);
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
              : hl(l, t, f, a, e, null));
        return;
      case "dialog":
        ll("beforetoggle", l), ll("toggle", l), ll("cancel", l), ll("close", l);
        break;
      case "iframe":
      case "object":
        ll("load", l);
        break;
      case "video":
      case "audio":
        for (a = 0; a < mu.length; a++) ll(mu[a], l);
        break;
      case "image":
        ll("error", l), ll("load", l);
        break;
      case "details":
        ll("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        ll("error", l), ll("load", l);
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
                throw Error(d(137, t));
              default:
                hl(l, t, h, a, e, null);
            }
        return;
      default:
        if (uc(t)) {
          for (p in e)
            e.hasOwnProperty(p) &&
              ((a = e[p]), a !== void 0 && Vi(l, t, p, a, e, void 0));
          return;
        }
    }
    for (i in e)
      e.hasOwnProperty(i) && ((a = e[i]), a != null && hl(l, t, i, a, e, null));
  }
  function z0(l, t, e, a) {
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
          p = null;
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
                a.hasOwnProperty(b) || hl(l, t, b, null, a, M);
            }
        }
        for (var y in a) {
          var b = a[y];
          if (((M = e[y]), a.hasOwnProperty(y) && (b != null || M != null)))
            switch (y) {
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
                p = b;
                break;
              case "value":
                c = b;
                break;
              case "defaultValue":
                i = b;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (b != null) throw Error(d(137, t));
                break;
              default:
                b !== M && hl(l, t, y, b, a, M);
            }
        }
        ec(l, c, i, f, h, p, n, u);
        return;
      case "select":
        b = c = i = y = null;
        for (n in e)
          if (((f = e[n]), e.hasOwnProperty(n) && f != null))
            switch (n) {
              case "value":
                break;
              case "multiple":
                b = f;
              default:
                a.hasOwnProperty(n) || hl(l, t, n, null, a, f);
            }
        for (u in a)
          if (
            ((n = a[u]),
            (f = e[u]),
            a.hasOwnProperty(u) && (n != null || f != null))
          )
            switch (u) {
              case "value":
                y = n;
                break;
              case "defaultValue":
                i = n;
                break;
              case "multiple":
                c = n;
              default:
                n !== f && hl(l, t, u, n, a, f);
            }
        (t = i),
          (e = c),
          (a = b),
          y != null
            ? We(l, !!e, y, !1)
            : !!a != !!e &&
              (t != null ? We(l, !!e, t, !0) : We(l, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        b = y = null;
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
                hl(l, t, i, null, a, u);
            }
        for (c in a)
          if (
            ((u = a[c]),
            (n = e[c]),
            a.hasOwnProperty(c) && (u != null || n != null))
          )
            switch (c) {
              case "value":
                y = u;
                break;
              case "defaultValue":
                b = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(d(91));
                break;
              default:
                u !== n && hl(l, t, c, u, a, n);
            }
        Bf(l, y, b);
        return;
      case "option":
        for (var q in e)
          (y = e[q]),
            e.hasOwnProperty(q) &&
              y != null &&
              !a.hasOwnProperty(q) &&
              (q === "selected" ? (l.selected = !1) : hl(l, t, q, null, a, y));
        for (f in a)
          (y = a[f]),
            (b = e[f]),
            a.hasOwnProperty(f) &&
              y !== b &&
              (y != null || b != null) &&
              (f === "selected"
                ? (l.selected =
                    y && typeof y != "function" && typeof y != "symbol")
                : hl(l, t, f, y, a, b));
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
        for (var Z in e)
          (y = e[Z]),
            e.hasOwnProperty(Z) &&
              y != null &&
              !a.hasOwnProperty(Z) &&
              hl(l, t, Z, null, a, y);
        for (h in a)
          if (
            ((y = a[h]),
            (b = e[h]),
            a.hasOwnProperty(h) && y !== b && (y != null || b != null))
          )
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (y != null) throw Error(d(137, t));
                break;
              default:
                hl(l, t, h, y, a, b);
            }
        return;
      default:
        if (uc(t)) {
          for (var yl in e)
            (y = e[yl]),
              e.hasOwnProperty(yl) &&
                y !== void 0 &&
                !a.hasOwnProperty(yl) &&
                Vi(l, t, yl, void 0, a, y);
          for (p in a)
            (y = a[p]),
              (b = e[p]),
              !a.hasOwnProperty(p) ||
                y === b ||
                (y === void 0 && b === void 0) ||
                Vi(l, t, p, y, a, b);
          return;
        }
    }
    for (var m in e)
      (y = e[m]),
        e.hasOwnProperty(m) &&
          y != null &&
          !a.hasOwnProperty(m) &&
          hl(l, t, m, null, a, y);
    for (M in a)
      (y = a[M]),
        (b = e[M]),
        !a.hasOwnProperty(M) ||
          y === b ||
          (y == null && b == null) ||
          hl(l, t, M, y, a, b);
  }
  function Ld(l) {
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
  function T0() {
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
        if (n && i && Ld(c)) {
          for (c = 0, i = u.responseEnd, a += 1; a < e.length; a++) {
            var f = e[a],
              h = f.startTime;
            if (h > i) break;
            var p = f.transferSize,
              M = f.initiatorType;
            p &&
              Ld(M) &&
              ((f = f.responseEnd), (c += p * (f < i ? 1 : (i - h) / (f - h))));
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
  function A0() {
    var l = window.event;
    return l && l.type === "popstate"
      ? l === Wi
        ? !1
        : ((Wi = l), !0)
      : ((Wi = null), !1);
  }
  var Vd = typeof setTimeout == "function" ? setTimeout : void 0,
    M0 = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Kd = typeof Promise == "function" ? Promise : void 0,
    _0 =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Kd < "u"
          ? function (l) {
              return Kd.resolve(null).then(l).catch(D0);
            }
          : Vd;
  function D0(l) {
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
  function O0(l, t, e, a) {
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
      if (((l = Tt(l.nextSibling)), l === null)) break;
    }
    return null;
  }
  function U0(l, t, e) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if (
        ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") &&
          !e) ||
        ((l = Tt(l.nextSibling)), l === null)
      )
        return null;
    return l;
  }
  function Wd(l, t) {
    for (; l.nodeType !== 8; )
      if (
        ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") &&
          !t) ||
        ((l = Tt(l.nextSibling)), l === null)
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
  function N0(l, t) {
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
  function Tt(l) {
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
          if (t === 0) return Tt(l.nextSibling);
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
        if (((l = t.documentElement), !l)) throw Error(d(452));
        return l;
      case "head":
        if (((l = t.head), !l)) throw Error(d(453));
        return l;
      case "body":
        if (((l = t.body), !l)) throw Error(d(454));
        return l;
      default:
        throw Error(d(451));
    }
  }
  function hu(l) {
    for (var t = l.attributes; t.length; ) l.removeAttributeNode(t[0]);
    lc(l);
  }
  var At = new Map(),
    Id = new Set();
  function Nn(l) {
    return typeof l.getRootNode == "function"
      ? l.getRootNode()
      : l.nodeType === 9
        ? l
        : l.ownerDocument;
  }
  var Ft = z.d;
  z.d = { f: R0, r: j0, D: x0, C: H0, L: C0, m: B0, X: Y0, S: q0, M: G0 };
  function R0() {
    var l = Ft.f(),
      t = En();
    return l || t;
  }
  function j0(l) {
    var t = Ke(l);
    t !== null && t.tag === 5 && t.type === "form" ? ho(t) : Ft.r(l);
  }
  var Ta = typeof document > "u" ? null : document;
  function Pd(l, t, e) {
    var a = Ta;
    if (a && typeof t == "string" && t) {
      var u = yt(t);
      (u = 'link[rel="' + l + '"][href="' + u + '"]'),
        typeof e == "string" && (u += '[crossorigin="' + e + '"]'),
        Id.has(u) ||
          (Id.add(u),
          (l = { rel: l, crossOrigin: e, href: t }),
          a.querySelector(u) === null &&
            ((t = a.createElement("link")),
            Jl(t, "link", l),
            Gl(t),
            a.head.appendChild(t)));
    }
  }
  function x0(l) {
    Ft.D(l), Pd("dns-prefetch", l, null);
  }
  function H0(l, t) {
    Ft.C(l, t), Pd("preconnect", l, t);
  }
  function C0(l, t, e) {
    Ft.L(l, t, e);
    var a = Ta;
    if (a && l && t) {
      var u = 'link[rel="preload"][as="' + yt(t) + '"]';
      t === "image" && e && e.imageSrcSet
        ? ((u += '[imagesrcset="' + yt(e.imageSrcSet) + '"]'),
          typeof e.imageSizes == "string" &&
            (u += '[imagesizes="' + yt(e.imageSizes) + '"]'))
        : (u += '[href="' + yt(l) + '"]');
      var n = u;
      switch (t) {
        case "style":
          n = Aa(l);
          break;
        case "script":
          n = Ma(l);
      }
      At.has(n) ||
        ((l = O(
          {
            rel: "preload",
            href: t === "image" && e && e.imageSrcSet ? void 0 : l,
            as: t,
          },
          e
        )),
        At.set(n, l),
        a.querySelector(u) !== null ||
          (t === "style" && a.querySelector(yu(n))) ||
          (t === "script" && a.querySelector(gu(n))) ||
          ((t = a.createElement("link")),
          Jl(t, "link", l),
          Gl(t),
          a.head.appendChild(t)));
    }
  }
  function B0(l, t) {
    Ft.m(l, t);
    var e = Ta;
    if (e && l) {
      var a = t && typeof t.as == "string" ? t.as : "script",
        u =
          'link[rel="modulepreload"][as="' + yt(a) + '"][href="' + yt(l) + '"]',
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
        !At.has(n) &&
        ((l = O({ rel: "modulepreload", href: l }, t)),
        At.set(n, l),
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
          Jl(a, "link", l),
          Gl(a),
          e.head.appendChild(a);
      }
    }
  }
  function q0(l, t, e) {
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
            (e = At.get(n)) && Pi(l, e);
          var f = (c = a.createElement("link"));
          Gl(f),
            Jl(f, "link", l),
            (f._p = new Promise(function (h, p) {
              (f.onload = h), (f.onerror = p);
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
  function Y0(l, t) {
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
          (t = At.get(u)) && lf(l, t),
          (n = e.createElement("script")),
          Gl(n),
          Jl(n, "link", l),
          e.head.appendChild(n)),
        (n = { type: "script", instance: n, count: 1, state: null }),
        a.set(u, n));
    }
  }
  function G0(l, t) {
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
          (t = At.get(u)) && lf(l, t),
          (n = e.createElement("script")),
          Gl(n),
          Jl(n, "link", l),
          e.head.appendChild(n)),
        (n = { type: "script", instance: n, count: 1, state: null }),
        a.set(u, n));
    }
  }
  function lr(l, t, e, a) {
    var u = (u = k.current) ? Nn(u) : null;
    if (!u) throw Error(d(446));
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
              At.has(l) ||
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
                At.set(l, e),
                n || X0(u, l, e, c.state))),
            t && a === null)
          )
            throw Error(d(528, ""));
          return c;
        }
        if (t && a !== null) throw Error(d(529, ""));
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
        throw Error(d(444, l));
    }
  }
  function Aa(l) {
    return 'href="' + yt(l) + '"';
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
        Jl(t, "link", e),
        Gl(t),
        l.head.appendChild(t));
  }
  function Ma(l) {
    return '[src="' + yt(l) + '"]';
  }
  function gu(l) {
    return "script[async]" + l;
  }
  function er(l, t, e) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var a = l.querySelector('style[data-href~="' + yt(e.href) + '"]');
          if (a) return (t.instance = a), Gl(a), a;
          var u = O({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null,
          });
          return (
            (a = (l.ownerDocument || l).createElement("style")),
            Gl(a),
            Jl(a, "style", u),
            Rn(a, e.precedence, l),
            (t.instance = a)
          );
        case "stylesheet":
          u = Aa(e.href);
          var n = l.querySelector(yu(u));
          if (n) return (t.state.loading |= 4), (t.instance = n), Gl(n), n;
          (a = tr(e)),
            (u = At.get(u)) && Pi(a, u),
            (n = (l.ownerDocument || l).createElement("link")),
            Gl(n);
          var c = n;
          return (
            (c._p = new Promise(function (i, f) {
              (c.onload = i), (c.onerror = f);
            })),
            Jl(n, "link", a),
            (t.state.loading |= 4),
            Rn(n, e.precedence, l),
            (t.instance = n)
          );
        case "script":
          return (
            (n = Ma(e.src)),
            (u = l.querySelector(gu(n)))
              ? ((t.instance = u), Gl(u), u)
              : ((a = e),
                (u = At.get(n)) && ((a = O({}, e)), lf(a, u)),
                (l = l.ownerDocument || l),
                (u = l.createElement("script")),
                Gl(u),
                Jl(u, "link", a),
                l.head.appendChild(u),
                (t.instance = u))
          );
        case "void":
          return null;
        default:
          throw Error(d(443, t.type));
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
          n[Ql] ||
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
  function L0(l, t, e) {
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
  function Q0(l, t, e, a) {
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
            Gl(n);
          return;
        }
        (n = t.ownerDocument || t),
          (a = tr(a)),
          (u = At.get(u)) && Pi(a, u),
          (n = n.createElement("link")),
          Gl(n);
        var c = n;
        (c._p = new Promise(function (i, f) {
          (c.onload = i), (c.onerror = f);
        })),
          Jl(n, "link", a),
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
  function Z0(l, t) {
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
            0 < l.imgBytes && tf === 0 && (tf = 62500 * T0());
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
        t.forEach(V0, l),
        (Hn = null),
        xn.call(l));
  }
  function V0(l, t) {
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
    $$typeof: El,
    Provider: null,
    Consumer: null,
    _currentValue: B,
    _currentValue2: B,
    _threadCount: 0,
  };
  function K0(l, t, e, a, u, n, c, i, f) {
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
  function cr(l, t, e, a, u, n, c, i, f, h, p, M) {
    return (
      (l = new K0(l, t, e, c, f, h, p, M, i)),
      (t = 1),
      n === !0 && (t |= 24),
      (n = st(3, null, null, t)),
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
      var t = vt();
      t = Fn(t);
      var e = Ne(l, t);
      e !== null && ut(e, l, t), ef(l, t);
    }
  }
  var Bn = !0;
  function J0(l, t, e, a) {
    var u = s.T;
    s.T = null;
    var n = z.p;
    try {
      (z.p = 2), af(l, t, e, a);
    } finally {
      (z.p = n), (s.T = u);
    }
  }
  function w0(l, t, e, a) {
    var u = s.T;
    s.T = null;
    var n = z.p;
    try {
      (z.p = 8), af(l, t, e, a);
    } finally {
      (z.p = n), (s.T = u);
    }
  }
  function af(l, t, e, a) {
    if (Bn) {
      var u = uf(a);
      if (u === null) Zi(l, t, a, qn, e), mr(l, a);
      else if ($0(u, l, t, e, a)) a.stopPropagation();
      else if ((mr(l, a), t & 4 && -1 < W0.indexOf(l))) {
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
                      var f = 1 << (31 - it(c));
                      (i.entanglements[1] |= f), (c &= ~f);
                    }
                    xt(n), (sl & 6) === 0 && ((bn = nt() + 500), ru(0));
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
          if (((l = C(t)), l !== null)) return l;
          l = null;
        } else if (e === 31) {
          if (((l = Q(t)), l !== null)) return l;
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
        switch (xr()) {
          case bf:
            return 2;
          case pf:
            return 8;
          case Mu:
          case Hr:
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
    W0 =
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
  function $0(l, t, e, a, u) {
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
          if (((t = C(e)), t !== null)) {
            (l.blockedOn = t),
              Df(l.priority, function () {
                dr(e);
              });
            return;
          }
        } else if (t === 31) {
          if (((t = Q(e)), t !== null)) {
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
  function k0() {
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
        g.unstable_scheduleCallback(g.unstable_NormalPriority, k0)));
  }
  var Xn = null;
  function yr(l) {
    Xn !== l &&
      ((Xn = l),
      g.unstable_scheduleCallback(g.unstable_NormalPriority, function () {
        Xn === l && (Xn = null);
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
  (Ln.prototype.render = ff.prototype.render =
    function (l) {
      var t = this._internalRoot;
      if (t === null) throw Error(d(409));
      var e = t.current,
        a = vt();
      fr(e, a, l, t, null, null);
    }),
    (Ln.prototype.unmount = ff.prototype.unmount =
      function () {
        var l = this._internalRoot;
        if (l !== null) {
          this._internalRoot = null;
          var t = l.containerInfo;
          fr(l.current, 2, null, l, null, null), En(), (t[Ze] = null);
        }
      });
  function Ln(l) {
    this._internalRoot = l;
  }
  Ln.prototype.unstable_scheduleHydration = function (l) {
    if (l) {
      var t = _f();
      l = { blockedOn: null, target: l, priority: t };
      for (var e = 0; e < Ee.length && t !== 0 && t < Ee[e].priority; e++);
      Ee.splice(e, 0, l), e === 0 && vr(l);
    }
  };
  var Sr = N.version;
  if (Sr !== "19.2.3") throw Error(d(527, Sr, "19.2.3"));
  z.findDOMNode = function (l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function"
        ? Error(d(188))
        : ((l = Object.keys(l).join(",")), Error(d(268, l)));
    return (
      (l = S(t)),
      (l = l !== null ? H(l) : null),
      (l = l === null ? null : l.stateNode),
      l
    );
  };
  var F0 = {
    bundleType: 0,
    version: "19.2.3",
    rendererPackageName: "react-dom",
    currentDispatcherRef: s,
    reconcilerVersion: "19.2.3",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Qn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Qn.isDisabled && Qn.supportsFiber)
      try {
        (Na = Qn.inject(F0)), (ct = Qn);
      } catch {}
  }
  return (
    (Tu.createRoot = function (l, t) {
      if (!R(l)) throw Error(d(299));
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
      if (!R(l)) throw Error(d(299));
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
        (a = vt()),
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
        new Ln(t)
      );
    }),
    (Tu.version = "19.2.3"),
    Tu
  );
}
var Or;
function iv() {
  if (Or) return df.exports;
  Or = 1;
  function g() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(g);
      } catch (N) {
        console.error(N);
      }
  }
  return g(), (df.exports = cv()), df.exports;
}
var fv = iv();
const sv = "/sandbox/poc-subtext/",
  ov = "https://r2.alprielse.xyz";
function dv(g) {
  return `${ov}/sandbox/poc-subtext/public${g}/video.mp4`;
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
async function rv(g) {
  const N = `${sv}${g.basePath.replace(/^\//, "")}`,
    _ = await fetch(`${N}/manifest.json`);
  if (!_.ok)
    throw new Error(`Failed to fetch example manifest: ${_.statusText}`);
  const d = await _.json(),
    R = dv(g.basePath),
    j = await fetch(R);
  if (!j.ok) throw new Error(`Failed to fetch example video: ${j.statusText}`);
  const C = await j.blob(),
    Q = await Promise.all(
      d.screenshots.map(async D => {
        try {
          const S = await fetch(`${N}/screenshots/${D.filename}`);
          if (S.ok) {
            const H = await S.blob(),
              O = await mv(H);
            return { ...D, dataUrl: O };
          }
        } catch (S) {
          console.warn(`Failed to load screenshot ${D.filename}:`, S);
        }
        return D;
      })
    );
  return { manifest: { ...d, screenshots: Q }, videoBlob: C };
}
function mv(g) {
  return new Promise((N, _) => {
    const d = new FileReader();
    (d.onloadend = () => N(d.result)), (d.onerror = _), d.readAsDataURL(g);
  });
}
function vv(g) {
  return Oa.find(N => N.id === g);
}
function hv({
  onFileSelected: g,
  onLoadExample: N,
  modelLoading: _,
  modelProgress: d,
}) {
  const [R, j] = V.useState(!1),
    [C, Q] = V.useState(!1),
    D = V.useCallback(G => {
      G.preventDefault(), j(!0);
    }, []),
    S = V.useCallback(G => {
      G.preventDefault(), j(!1);
    }, []),
    H = V.useCallback(
      G => {
        G.preventDefault(), j(!1);
        const K = G.dataTransfer.files;
        if (K.length > 0) {
          const ol = K[0];
          ol.type.startsWith("video/") && g(ol);
        }
      },
      [g]
    ),
    O = V.useCallback(
      G => {
        const K = G.target.files;
        K && K.length > 0 && g(K[0]);
      },
      [g]
    );
  return A.jsxs("div", {
    className: "upload-screen",
    children: [
      A.jsxs("div", {
        className: "app-header",
        children: [
          A.jsx("h1", { className: "app-title", children: "Subtext" }),
          A.jsx("p", {
            className: "app-subtitle",
            children:
              "Reverse-engineering the storytelling in short-form videos",
          }),
        ],
      }),
      A.jsxs("div", {
        className: `upload-zone ${R ? "dragging" : ""}`,
        onDragOver: D,
        onDragLeave: S,
        onDrop: H,
        children: [
          A.jsx("div", {
            className: "upload-icon",
            children: A.jsxs("svg", {
              width: "64",
              height: "64",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.5",
              children: [
                A.jsx("path", {
                  d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
                }),
                A.jsx("polyline", { points: "17 8 12 3 7 8" }),
                A.jsx("line", { x1: "12", y1: "3", x2: "12", y2: "15" }),
              ],
            }),
          }),
          A.jsx("h2", { children: "Upload a video" }),
          A.jsx("p", {
            className: "upload-hint",
            children: "Drag and drop a video file here, or click to browse",
          }),
          A.jsx("p", {
            className: "upload-formats",
            children: "Supports MP4, WebM, MOV",
          }),
          A.jsxs("label", {
            className: "upload-button",
            children: [
              A.jsx("input", {
                type: "file",
                accept: "video/*",
                onChange: O,
                hidden: !0,
              }),
              "Choose File",
            ],
          }),
          Oa.length > 0 &&
            A.jsxs("div", {
              className: "example-section",
              children: [
                A.jsx("span", {
                  className: "example-divider",
                  children: "or try an example",
                }),
                A.jsx("div", {
                  className: "example-buttons",
                  children: Oa.map(G =>
                    A.jsx(
                      "div",
                      {
                        className: "example-item",
                        children: A.jsxs("button", {
                          className: "example-button",
                          onClick: () => {
                            Q(!0), N(G.id);
                          },
                          disabled: C,
                          children: [
                            G.creator &&
                              A.jsx("a", {
                                href: G.creator.instagramUrl,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "example-creator-link",
                                onClick: K => K.stopPropagation(),
                                children: G.creator.handle,
                              }),
                            C ? "Loading..." : G.name,
                          ],
                        }),
                      },
                      G.id
                    )
                  ),
                }),
              ],
            }),
        ],
      }),
      A.jsx("div", {
        className: "model-status",
        children: _
          ? A.jsxs(A.Fragment, {
              children: [
                A.jsx("div", { className: "model-status-indicator loading" }),
                A.jsxs("span", {
                  children: ["Loading transcription model video... ", d, "%"],
                }),
              ],
            })
          : A.jsxs(A.Fragment, {
              children: [
                A.jsx("div", { className: "model-status-indicator ready" }),
                A.jsx("span", { children: "Transcription model ready" }),
              ],
            }),
      }),
    ],
  });
}
function yv(g) {
  switch (g) {
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
function gv({
  modelLoaded: g,
  modelProgress: N,
  processingStage: _,
  processingProgress: d,
  onViewResults: R,
  error: j,
}) {
  const C = _ === "complete";
  return (
    V.useEffect(() => {
      C && R();
    }, [C, R]),
    j
      ? A.jsx("div", {
          className: "processing-screen",
          children: A.jsx("div", {
            className: "processing-container",
            children: A.jsxs("div", {
              className: "processing-error",
              children: [
                A.jsx("div", { className: "error-icon", children: "!" }),
                A.jsx("h2", { children: "Processing Failed" }),
                A.jsx("p", { children: j }),
              ],
            }),
          }),
        })
      : A.jsx("div", {
          className: "processing-screen",
          children: A.jsxs("div", {
            className: "processing-container",
            children: [
              A.jsx("h1", { children: "Analyzing Video" }),
              A.jsxs("div", {
                className: "progress-section",
                children: [
                  A.jsxs("div", {
                    className: "progress-item",
                    children: [
                      A.jsxs("div", {
                        className: "progress-header",
                        children: [
                          A.jsx("span", {
                            className: "progress-label",
                            children: "Transcription Model",
                          }),
                          A.jsx("span", {
                            className: "progress-value",
                            children: g ? "Ready" : `${N}%`,
                          }),
                        ],
                      }),
                      A.jsx("div", {
                        className: "progress-bar",
                        children: A.jsx("div", {
                          className: `progress-fill ${g ? "complete" : ""}`,
                          style: { width: g ? "100%" : `${N}%` },
                        }),
                      }),
                    ],
                  }),
                  A.jsxs("div", {
                    className: "progress-item",
                    children: [
                      A.jsxs("div", {
                        className: "progress-header",
                        children: [
                          A.jsx("span", {
                            className: "progress-label",
                            children: yv(_),
                          }),
                          A.jsx("span", {
                            className: "progress-value",
                            children: C ? "Done" : `${d}%`,
                          }),
                        ],
                      }),
                      A.jsx("div", {
                        className: "progress-bar",
                        children: A.jsx("div", {
                          className: `progress-fill ${C ? "complete" : ""}`,
                          style: { width: `${d}%` },
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
async function Sv(g) {
  return new Promise((N, _) => {
    const d = document.createElement("video");
    (d.preload = "metadata"), (d.muted = !0), (d.playsInline = !0);
    const R = URL.createObjectURL(g);
    (d.src = R),
      (d.onloadedmetadata = () => {
        N({
          video: d,
          metadata: {
            duration: d.duration,
            width: d.videoWidth,
            height: d.videoHeight,
            filename: g.name,
          },
        });
      }),
      (d.onerror = () => {
        URL.revokeObjectURL(R), _(new Error("Failed to load video metadata"));
      });
  });
}
async function bv(g, N) {
  N?.(0);
  const _ = new AudioContext({ sampleRate: 16e3 });
  try {
    N?.(10);
    const d = await g.arrayBuffer();
    N?.(30);
    const R = await _.decodeAudioData(d);
    N?.(60);
    const j = R.numberOfChannels,
      C = R.length,
      Q = R.sampleRate;
    if (Q === 16e3 && j === 1) return N?.(100), R.getChannelData(0);
    const D = new Float32Array(C);
    for (let S = 0; S < C; S++) {
      let H = 0;
      for (let O = 0; O < j; O++) H += R.getChannelData(O)[S];
      D[S] = H / j;
    }
    if ((N?.(80), Q !== 16e3)) {
      const S = pv(D, Q, 16e3);
      return N?.(100), S;
    }
    return N?.(100), D;
  } finally {
    await _.close();
  }
}
function pv(g, N, _) {
  const d = N / _,
    R = Math.round(g.length / d),
    j = new Float32Array(R);
  for (let C = 0; C < R; C++) {
    const Q = C * d,
      D = Math.floor(Q),
      S = Math.min(D + 1, g.length - 1),
      H = Q - D;
    j[C] = g[D] * (1 - H) + g[S] * H;
  }
  return j;
}
function Da(g) {
  const N = Math.floor(g / 60),
    _ = g % 60;
  return `${N}:${_.toFixed(2).padStart(5, "0")}`;
}
const Ev = "video-analyzer-db",
  zv = 1,
  Te = "videos";
let Zn = null;
function yf() {
  return (
    Zn ||
    ((Zn = new Promise((g, N) => {
      const _ = indexedDB.open(Ev, zv);
      (_.onerror = () => N(_.error)),
        (_.onsuccess = () => g(_.result)),
        (_.onupgradeneeded = d => {
          const R = d.target.result;
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
async function Tv(g, N, _) {
  const d = await yf(),
    R = `video-${Date.now()}`,
    j = { id: R, name: g, manifest: N, videoBlob: _, createdAt: Date.now() };
  return new Promise((C, Q) => {
    const H = d.transaction([Te], "readwrite").objectStore(Te).add(j);
    (H.onsuccess = () => C(R)), (H.onerror = () => Q(H.error));
  });
}
async function Av(g) {
  const N = await yf();
  return new Promise((_, d) => {
    const C = N.transaction([Te], "readonly").objectStore(Te).get(g);
    (C.onsuccess = () => _(C.result || null)), (C.onerror = () => d(C.error));
  });
}
async function Mv() {
  const g = await yf();
  return new Promise((N, _) => {
    const j = g.transaction([Te], "readonly").objectStore(Te).getAll();
    (j.onsuccess = () => N(j.result || [])), (j.onerror = () => _(j.error));
  });
}
function _v({
  currentVideoId: g,
  currentVideoName: N,
  onSelectExample: _,
  onSelectStoredVideo: d,
  onBackToUpload: R,
}) {
  const [j, C] = V.useState(!1),
    [Q, D] = V.useState([]);
  V.useEffect(() => {
    Mv().then(D);
  }, [j]);
  const S = (H, O) => {
    C(!1), H === "example" ? _(O) : d(O);
  };
  return A.jsxs("div", {
    className: "video-selector-toolbar",
    children: [
      A.jsx("button", {
        className: "back-button",
        onClick: R,
        title: "Back to upload",
        children: "←",
      }),
      A.jsxs("div", {
        className: "video-dropdown",
        children: [
          A.jsxs("button", {
            className: "dropdown-trigger",
            onClick: () => C(!j),
            children: [
              A.jsx("span", { className: "current-video-name", children: N }),
              A.jsx("svg", {
                className: `dropdown-arrow ${j ? "open" : ""}`,
                width: "12",
                height: "12",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                children: A.jsx("path", { d: "M6 9l6 6 6-6" }),
              }),
            ],
          }),
          j &&
            A.jsxs("div", {
              className: "dropdown-menu",
              children: [
                Oa.length > 0 &&
                  A.jsxs("div", {
                    className: "dropdown-section",
                    children: [
                      A.jsx("div", {
                        className: "dropdown-section-label",
                        children: "Examples",
                      }),
                      Oa.map(H =>
                        A.jsxs(
                          "button",
                          {
                            className: `dropdown-item ${g === H.id ? "active" : ""}`,
                            onClick: () => S("example", H.id),
                            children: [
                              A.jsx("span", {
                                className: "item-name",
                                children: H.name,
                              }),
                              H.creator &&
                                A.jsx("a", {
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
                Q.length > 0 &&
                  A.jsxs("div", {
                    className: "dropdown-section",
                    children: [
                      A.jsx("div", {
                        className: "dropdown-section-label",
                        children: "My Videos",
                      }),
                      Q.map(H =>
                        A.jsxs(
                          "button",
                          {
                            className: `dropdown-item ${g === H.id ? "active" : ""}`,
                            onClick: () => S("stored", H.id),
                            children: [
                              A.jsx("span", {
                                className: "item-name",
                                children: H.name,
                              }),
                              A.jsx("span", {
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
                  Q.length === 0 &&
                  A.jsx("div", {
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
function Dv({
  manifest: g,
  videoUrl: N,
  currentVideoId: _,
  currentVideoName: d,
  onSelectExample: R,
  onSelectStoredVideo: j,
  onBackToUpload: C,
}) {
  const Q = V.useRef(null),
    D = V.useRef(null),
    S = V.useRef(null),
    H = V.useRef(null),
    [O, G] = V.useState(0),
    [K, ol] = V.useState(g.video.duration),
    [dl, nl] = V.useState(!1),
    [pl, Wl] = V.useState(1),
    [El, Ll] = V.useState(400),
    [Nl, Al] = V.useState(180),
    W = V.useRef(!1),
    Dl = V.useRef(!1);
  V.useEffect(() => {
    const s = Q.current;
    if (!s) return;
    let z,
      B = 0;
    const J = 50,
      $ = () => {
        const zl = performance.now();
        zl - B >= J && (G(s.currentTime), (B = zl)),
          (z = requestAnimationFrame($));
      },
      o = () => {
        cancelAnimationFrame(z), (z = requestAnimationFrame($));
      },
      E = () => {
        cancelAnimationFrame(z);
      },
      x = () => ol(s.duration),
      U = () => {
        nl(!0), o();
      },
      X = () => {
        nl(!1), E(), G(s.currentTime);
      },
      k = () => {
        nl(!1), E(), G(s.duration);
      },
      cl = () => {
        s.paused && G(s.currentTime);
      },
      Yl = () => {
        nl(!s.paused), G(s.currentTime), ol(s.duration);
      };
    return (
      s.addEventListener("durationchange", x),
      s.addEventListener("play", U),
      s.addEventListener("playing", U),
      s.addEventListener("pause", X),
      s.addEventListener("ended", k),
      s.addEventListener("timeupdate", cl),
      s.addEventListener("loadeddata", Yl),
      nl(!s.paused),
      s.paused || o(),
      () => {
        s.removeEventListener("durationchange", x),
          s.removeEventListener("play", U),
          s.removeEventListener("playing", U),
          s.removeEventListener("pause", X),
          s.removeEventListener("ended", k),
          s.removeEventListener("timeupdate", cl),
          s.removeEventListener("loadeddata", Yl),
          E();
      }
    );
  }, [N]),
    V.useEffect(() => {
      if (!D.current) return;
      const s = Fl();
      if (s >= 0) {
        const z = D.current.querySelector(`[data-index="${s}"]`);
        z && z.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, [O]),
    V.useEffect(() => {
      const s = z => {
        z.target instanceof HTMLInputElement ||
          z.target instanceof HTMLTextAreaElement ||
          (z.code === "Space" && (z.preventDefault(), Rl()));
      };
      return (
        window.addEventListener("keydown", s),
        () => window.removeEventListener("keydown", s)
      );
    }, []);
  const kl = V.useCallback(
      s => {
        s.preventDefault(),
          (W.current = !0),
          (document.body.style.cursor = "col-resize"),
          (document.body.style.userSelect = "none");
        const z = s.clientX,
          B = El,
          J = o => {
            if (!W.current) return;
            const E = Math.max(200, Math.min(800, B + (o.clientX - z)));
            Ll(E);
          },
          $ = () => {
            (W.current = !1),
              (document.body.style.cursor = ""),
              (document.body.style.userSelect = ""),
              document.removeEventListener("mousemove", J),
              document.removeEventListener("mouseup", $);
          };
        document.addEventListener("mousemove", J),
          document.addEventListener("mouseup", $);
      },
      [El]
    ),
    Ut = V.useCallback(
      s => {
        s.preventDefault(),
          (Dl.current = !0),
          (document.body.style.cursor = "row-resize"),
          (document.body.style.userSelect = "none");
        const z = s.clientY,
          B = Nl,
          J = o => {
            if (!Dl.current) return;
            const E = Math.max(100, Math.min(400, B - (o.clientY - z)));
            Al(E);
          },
          $ = () => {
            (Dl.current = !1),
              (document.body.style.cursor = ""),
              (document.body.style.userSelect = ""),
              document.removeEventListener("mousemove", J),
              document.removeEventListener("mouseup", $);
          };
        document.addEventListener("mousemove", J),
          document.addEventListener("mouseup", $);
      },
      [Nl]
    ),
    ql = s => {
      Q.current && ((Q.current.currentTime = s), G(s));
    },
    Rl = () => {
      const s = Q.current;
      s &&
        (s.paused
          ? s.play().catch(z => {
              console.warn("Video play failed:", z);
            })
          : s.pause());
    },
    Mt = s => {
      if (!S.current || !H.current) return;
      const z = H.current,
        B = S.current.getBoundingClientRect(),
        J = s.clientX - B.left + z.scrollLeft,
        $ = B.width * pl,
        o = J / $;
      ql(o * K);
    },
    Fl = () => g.transcript.findIndex(s => O >= s.start && O < s.end),
    ul = () => {
      for (let s = g.screenshots.length - 1; s >= 0; s--)
        if (O >= g.screenshots[s].timestamp) return s;
      return 0;
    };
  return A.jsxs("div", {
    className: "app",
    children: [
      A.jsx(_v, {
        currentVideoId: _,
        currentVideoName: d,
        onSelectExample: R,
        onSelectStoredVideo: j,
        onBackToUpload: C,
      }),
      A.jsxs("div", {
        className: "main-content",
        children: [
          A.jsxs("div", {
            className: "panel transcript-panel",
            style: { width: El },
            children: [
              A.jsx("h2", { children: "Transcript" }),
              A.jsx("div", {
                className: "transcript-list",
                ref: D,
                children:
                  g.transcript.length === 0
                    ? A.jsx("div", {
                        className: "transcript-empty",
                        children: "No speech detected in video",
                      })
                    : g.transcript.map((s, z) =>
                        A.jsxs(
                          "div",
                          {
                            "data-index": z,
                            className: `transcript-segment ${Fl() === z ? "active" : ""}`,
                            onClick: () => ql(s.start),
                            children: [
                              A.jsx("span", {
                                className: "timestamp",
                                children: Da(s.start),
                              }),
                              A.jsx("span", {
                                className: "text",
                                children: s.text,
                              }),
                            ],
                          },
                          z
                        )
                      ),
              }),
            ],
          }),
          A.jsx("div", {
            className: "resize-handle resize-handle-horizontal",
            onMouseDown: kl,
          }),
          A.jsxs("div", {
            className: "panel video-panel",
            children: [
              A.jsx("h2", { children: "Video" }),
              A.jsxs("div", {
                className: "video-container",
                children: [
                  A.jsx("video", { ref: Q, src: N, onClick: Rl }),
                  A.jsxs("div", {
                    className: "video-controls",
                    children: [
                      A.jsx("button", {
                        onClick: Rl,
                        className: "play-button",
                        children: dl ? "⏸" : "▶",
                      }),
                      A.jsxs("span", {
                        className: "time-display",
                        children: [Da(O), " / ", Da(K)],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      A.jsx("div", {
        className: "resize-handle resize-handle-vertical",
        onMouseDown: Ut,
      }),
      A.jsxs("div", {
        className: "panel timeline-panel",
        style: { height: Nl },
        children: [
          A.jsxs("h2", {
            children: ["Timeline (", g.screenshots.length, " cuts)"],
          }),
          A.jsxs("div", {
            className: "timeline-container",
            children: [
              A.jsx("div", {
                className: "timeline-scroll",
                ref: H,
                children: A.jsxs("div", {
                  className: "timeline",
                  ref: S,
                  onClick: Mt,
                  style: { width: `${pl * 100}%` },
                  children: [
                    A.jsx("div", {
                      className: "timeline-playhead",
                      style: { left: `${(O / K) * 100}%` },
                    }),
                    A.jsx("div", {
                      className: "timeline-clips",
                      children: g.screenshots.map((s, z) => {
                        const B = s.timestamp,
                          J =
                            z < g.screenshots.length - 1
                              ? g.screenshots[z + 1].timestamp
                              : K,
                          $ = J - B,
                          o = (B / K) * 100,
                          E = ($ / K) * 100;
                        return A.jsx(
                          "div",
                          {
                            className: `timeline-clip ${ul() === z ? "active" : ""}`,
                            style: { left: `${o}%`, width: `${E}%` },
                            onClick: x => {
                              x.stopPropagation(), ql(s.timestamp);
                            },
                            title: `Clip ${z + 1}: ${Da(B)} - ${Da(J)}`,
                            children: A.jsx("div", {
                              className: "clip-thumbnail",
                              children: s.dataUrl
                                ? A.jsx("img", {
                                    src: s.dataUrl,
                                    alt: `Scene at ${Da(s.timestamp)}`,
                                    loading: "lazy",
                                  })
                                : A.jsx("div", {
                                    className: "clip-placeholder",
                                  }),
                            }),
                          },
                          z
                        );
                      }),
                    }),
                  ],
                }),
              }),
              A.jsx("div", {
                className: "timeline-toolbar",
                children: A.jsxs("div", {
                  className: "zoom-control",
                  children: [
                    A.jsxs("svg", {
                      className: "zoom-icon",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      children: [
                        A.jsx("circle", { cx: "11", cy: "11", r: "8" }),
                        A.jsx("path", { d: "M21 21l-4.35-4.35" }),
                        A.jsx("path", { d: "M8 11h6" }),
                      ],
                    }),
                    A.jsx("input", {
                      type: "range",
                      min: "1",
                      max: "10",
                      step: "0.5",
                      value: pl,
                      onChange: s => Wl(parseFloat(s.target.value)),
                      className: "zoom-slider",
                    }),
                    A.jsxs("svg", {
                      className: "zoom-icon",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      children: [
                        A.jsx("circle", { cx: "11", cy: "11", r: "8" }),
                        A.jsx("path", { d: "M21 21l-4.35-4.35" }),
                        A.jsx("path", { d: "M11 8v6M8 11h6" }),
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
function Ur(g, N, _) {
  (g /= 255), (N /= 255), (_ /= 255);
  const d = Math.max(g, N, _),
    R = Math.min(g, N, _),
    j = d - R;
  let C = 0;
  const Q = d === 0 ? 0 : j / d,
    D = d;
  if (d !== R) {
    switch (d) {
      case g:
        C = (N - _) / j + (N < _ ? 6 : 0);
        break;
      case N:
        C = (_ - g) / j + 2;
        break;
      case _:
        C = (g - N) / j + 4;
        break;
    }
    C /= 6;
  }
  return { h: C, s: Q, v: D };
}
function Ov(g, N) {
  const _ = g.data,
    d = N.data;
  let R = 0,
    j = 0,
    C = 0;
  const Q = 4;
  let D = 0;
  for (let K = 0; K < _.length; K += 4 * Q) {
    const ol = Ur(_[K], _[K + 1], _[K + 2]),
      dl = Ur(d[K], d[K + 1], d[K + 2]);
    let nl = Math.abs(ol.h - dl.h);
    nl > 0.5 && (nl = 1 - nl),
      (R += nl * 255),
      (j += Math.abs(ol.s - dl.s) * 255),
      (C += Math.abs(ol.v - dl.v) * 255),
      D++;
  }
  const S = R / D,
    H = j / D,
    O = C / D;
  return (S + H + O) / 3;
}
async function Uv(g, N, _, d) {
  return new Promise((R, j) => {
    const C = () => {
      g.removeEventListener("seeked", C),
        d.drawImage(g, 0, 0, _.width, _.height);
      const Q = d.getImageData(0, 0, _.width, _.height);
      R(Q);
    };
    g.addEventListener("seeked", C),
      (g.currentTime = Math.min(N, g.duration - 0.001)),
      setTimeout(() => {
        g.removeEventListener("seeked", C), j(new Error("Seek timeout"));
      }, 5e3);
  });
}
async function Nv(g, N = {}, _) {
  const { threshold: d = 27, minSceneLength: R = 0.5, sampleRate: j = 2 } = N,
    C = g.duration,
    Q = 1 / j,
    D = [{ timestamp: 0, score: 0 }],
    S = document.createElement("canvas"),
    H = Math.min(1, 320 / g.videoWidth);
  (S.width = Math.floor(g.videoWidth * H)),
    (S.height = Math.floor(g.videoHeight * H));
  const O = S.getContext("2d", { willReadFrequently: !0 });
  if (!O) throw new Error("Could not get canvas context");
  let G = null,
    K = 0,
    ol = 0;
  const dl = Math.ceil(C / Q);
  for (let nl = 0; nl < C; nl += Q)
    try {
      const pl = await Uv(g, nl, S, O);
      if (G && nl - K >= R) {
        const Wl = Ov(pl, G);
        Wl >= d && (D.push({ timestamp: nl, score: Wl }), (K = nl));
      }
      (G = pl), ol++, _ && _(Math.round((ol / dl) * 100));
    } catch {
      ol++;
    }
  return D;
}
async function Rv(g, N, _ = 160, d) {
  return new Promise((R, j) => {
    const C = g.videoHeight / g.videoWidth,
      Q = Math.round(_ * C),
      D = document.createElement("canvas");
    (D.width = _), (D.height = Q);
    const S = D.getContext("2d");
    if (!S) {
      j(new Error("Could not get canvas context"));
      return;
    }
    const H = Math.min(N, g.duration - 0.001),
      O = () => {
        S.drawImage(g, 0, 0, _, Q);
        const K = D.toDataURL("image/jpeg", 0.8);
        R(K);
      },
      G = () => {
        g.removeEventListener("seeked", G),
          requestAnimationFrame(() => {
            O();
          });
      };
    if (Math.abs(g.currentTime - H) < 0.1) {
      requestAnimationFrame(() => {
        O();
      });
      return;
    }
    g.addEventListener("seeked", G),
      (g.currentTime = H),
      setTimeout(() => {
        g.removeEventListener("seeked", G);
        try {
          O();
        } catch {
          j(new Error("Thumbnail generation timeout"));
        }
      }, 5e3);
  });
}
function jv() {
  const [g, N] = V.useState("upload"),
    [_, d] = V.useState(null),
    [R, j] = V.useState(!1),
    [C, Q] = V.useState(0),
    [D, S] = V.useState("idle"),
    [H, O] = V.useState(0),
    [G, K] = V.useState(null),
    [ol, dl] = V.useState(null),
    [nl, pl] = V.useState(null),
    [Wl, El] = V.useState(""),
    Ll = V.useRef(null),
    Nl = V.useRef(null),
    Al = V.useRef(null),
    W = V.useRef(!1);
  V.useEffect(() => {
    const ul = new Worker(
      new URL(
        "/sandbox/poc-subtext/assets/whisper.worker-Dbr6Sit4.js",
        import.meta.url
      ),
      { type: "module" }
    );
    return (
      (ul.onmessage = s => {
        const { type: z } = s.data;
        z === "progress"
          ? Q(s.data.progress)
          : z === "ready"
            ? (j(!0), (W.current = !0), Q(100))
            : z === "result"
              ? Nl.current &&
                (Nl.current(s.data.data),
                (Nl.current = null),
                (Al.current = null))
              : z === "error" &&
                Al.current &&
                (Al.current(new Error(s.data.error)),
                (Nl.current = null),
                (Al.current = null));
      }),
      (Ll.current = ul),
      ul.postMessage({ type: "load" }),
      () => {
        ul.terminate();
      }
    );
  }, []);
  const Dl = V.useCallback(async ul => {
      N("processing"), dl(null), O(0);
      try {
        const s = URL.createObjectURL(ul);
        d(s), S("extracting-audio");
        const { video: z, metadata: B } = await Sv(ul);
        await new Promise(U => {
          z.readyState >= 3 ? U() : (z.oncanplay = () => U());
        }),
          O(5);
        const J = await bv(ul, U => {
          O(5 + U * 0.15);
        });
        W.current ||
          (S("loading-model"),
          await new Promise(U => {
            const X = () => {
              W.current ? U() : setTimeout(X, 100);
            };
            X();
          })),
          S("transcribing"),
          O(20);
        const $ = await new Promise((U, X) => {
          (Nl.current = U),
            (Al.current = X),
            Ll.current?.postMessage({ type: "transcribe", audio: J });
        });
        O(50), S("detecting-scenes");
        const o = await Nv(z, { threshold: 27, minSceneLength: 0.5 }, U => {
          O(50 + U * 0.3);
        });
        O(80), S("generating-thumbnails");
        const E = [];
        for (let U = 0; U < o.length; U++) {
          const X = o[U],
            k = await Rv(z, X.timestamp);
          O(80 + ((U + 1) / o.length) * 20),
            E.push({
              index: U,
              timestamp: X.timestamp,
              filename: `scene_${U}.jpg`,
              dataUrl: k,
            });
        }
        const x = {
          video: {
            filename: B.filename,
            duration: B.duration,
            width: B.width,
            height: B.height,
          },
          transcript: $,
          screenshots: E,
        };
        K(x), El(B.filename), S("complete"), O(100);
        try {
          const U = ul,
            X = await Tv(B.filename, x, U);
          pl(X);
        } catch (U) {
          console.warn("Failed to save video to IndexedDB:", U);
        }
      } catch (s) {
        dl(
          s instanceof Error ? s.message : "An error occurred during processing"
        ),
          S("idle");
      }
    }, []),
    kl = V.useCallback(
      ul => {
        Dl(ul);
      },
      [Dl]
    ),
    Ut = V.useCallback(() => {
      N("results");
    }, []),
    ql = V.useCallback(async ul => {
      const s = vv(ul);
      if (s) {
        N("processing"), dl(null), S("loading-model"), O(0);
        try {
          O(10);
          const { manifest: z, videoBlob: B } = await rv(s);
          O(80);
          const J = URL.createObjectURL(B);
          d(J), K(z), pl(ul), El(s.name), S("complete"), O(100);
        } catch (z) {
          dl(z instanceof Error ? z.message : "Failed to load example"),
            S("idle");
        }
      }
    }, []),
    Rl = V.useCallback(
      async ul => {
        nl !== ul && (await ql(ul), N("results"));
      },
      [nl, ql]
    ),
    Mt = V.useCallback(
      async ul => {
        if (nl !== ul)
          try {
            const s = await Av(ul);
            if (!s) {
              dl("Video not found");
              return;
            }
            const z = URL.createObjectURL(s.videoBlob);
            d(z), K(s.manifest), pl(s.id), El(s.name), N("results");
          } catch (s) {
            dl(s instanceof Error ? s.message : "Failed to load video");
          }
      },
      [nl]
    ),
    Fl = V.useCallback(() => {
      N("upload");
    }, []);
  return g === "upload"
    ? A.jsx(hv, {
        onFileSelected: kl,
        onLoadExample: ql,
        modelLoading: !R,
        modelProgress: C,
      })
    : g === "processing"
      ? A.jsx(gv, {
          modelLoaded: R,
          modelProgress: C,
          processingStage: D,
          processingProgress: H,
          onViewResults: Ut,
          error: ol,
        })
      : g === "results" && G && _
        ? A.jsx(Dv, {
            manifest: G,
            videoUrl: _,
            currentVideoId: nl,
            currentVideoName: Wl,
            onSelectExample: Rl,
            onSelectStoredVideo: Mt,
            onBackToUpload: Fl,
          })
        : A.jsx("div", {
            className: "error",
            children: "Something went wrong",
          });
}
fv.createRoot(document.getElementById("root")).render(
  A.jsx(V.StrictMode, { children: A.jsx(jv, {}) })
);
