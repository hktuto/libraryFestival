globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'node:http';
import { Server } from 'node:https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseStatus, setResponseHeader, getRequestHeaders, createError, createApp, createRouter as createRouter$1, toNodeListener, fetchWithEvent, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { klona } from 'klona';
import defu, { defuFn } from 'defu';
import { hash } from 'ohash';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage, prefixStorage } from 'unstorage';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {}
};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const _sharedRuntimeConfig = _deepFreeze(
  _applyEnv(klona(_inlineRuntimeConfig))
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  _applyEnv(runtimeConfig);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _getEnv(key) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function _applyEnv(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = _getEnv(subKey);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      _applyEnv(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
  return obj;
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

storage.mount('/assets', assets$1);

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver, shouldInvalidateCache) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry)) {
          useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(key, () => fn(...args), shouldInvalidateCache);
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return key.replace(/[^\dA-Za-z]/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const key = await opts.getKey?.(event);
      if (key) {
        return escapeKey(key);
      }
      const url = event.node.req.originalUrl || event.node.req.url;
      const friendlyName = escapeKey(decodeURI(parseURL(url).pathname)).slice(
        0,
        16
      );
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [opts.integrity, handler]
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const reqProxy = cloneWithProxy(incomingEvent.node.req, { headers: {} });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
      headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString();
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      event.node.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: $fetch.raw,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.node.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(path, useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('../error-500.mjs');
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  event.node.res.end(await res.text());
});

const assets = {
  "/_nuxt/_plugin-vue_export-helper.c27b6911.js": {
    "type": "application/javascript",
    "etag": "\"5b-eFCz/UrraTh721pgAl0VxBNR1es\"",
    "mtime": "2023-08-17T13:20:07.109Z",
    "size": 91,
    "path": "../public/_nuxt/_plugin-vue_export-helper.c27b6911.js"
  },
  "/_nuxt/booklist.23e110d5.js": {
    "type": "application/javascript",
    "etag": "\"70e-/O7w45UNWKPLWfoywkvCs4/97nI\"",
    "mtime": "2023-08-17T13:20:07.109Z",
    "size": 1806,
    "path": "../public/_nuxt/booklist.23e110d5.js"
  },
  "/_nuxt/booklist.d5a32522.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"67b-ROuEGEqDUOXjsugJgnHgBRWELzY\"",
    "mtime": "2023-08-17T13:20:07.108Z",
    "size": 1659,
    "path": "../public/_nuxt/booklist.d5a32522.css"
  },
  "/_nuxt/entry.2118a109.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"363-JveBhRjW9MD8W4cnXw2ie1xvSMg\"",
    "mtime": "2023-08-17T13:20:07.108Z",
    "size": 867,
    "path": "../public/_nuxt/entry.2118a109.css"
  },
  "/_nuxt/entry.4da6be06.js": {
    "type": "application/javascript",
    "etag": "\"25d0d-Wqi+rNc6Ug+TAttFjl6aVgs1r8k\"",
    "mtime": "2023-08-17T13:20:07.108Z",
    "size": 154893,
    "path": "../public/_nuxt/entry.4da6be06.js"
  },
  "/_nuxt/error-404.37afb329.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-ByFsBrvVlyo8rkr1MFmM0O7O1IU\"",
    "mtime": "2023-08-17T13:20:07.107Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.37afb329.css"
  },
  "/_nuxt/error-404.80796bab.js": {
    "type": "application/javascript",
    "etag": "\"1998-9ovKkH54+a5yr3eLqQR/b4AnG00\"",
    "mtime": "2023-08-17T13:20:07.107Z",
    "size": 6552,
    "path": "../public/_nuxt/error-404.80796bab.js"
  },
  "/_nuxt/error-500.7fd56d89.js": {
    "type": "application/javascript",
    "etag": "\"786-BYA74Og1Tmaz9Ogm+XChnLpF6Ec\"",
    "mtime": "2023-08-17T13:20:07.107Z",
    "size": 1926,
    "path": "../public/_nuxt/error-500.7fd56d89.js"
  },
  "/_nuxt/error-500.b7351e05.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-MYG3JJRjHaBMiPwIKSogK0Nv5vY\"",
    "mtime": "2023-08-17T13:20:07.107Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.b7351e05.css"
  },
  "/_nuxt/error-component.041533ad.js": {
    "type": "application/javascript",
    "etag": "\"4b2-BP/o/bsnc65zF+NjjQP4vGm7FY4\"",
    "mtime": "2023-08-17T13:20:07.107Z",
    "size": 1202,
    "path": "../public/_nuxt/error-component.041533ad.js"
  },
  "/_nuxt/game.43722512.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"17c4-2nOUfuWghLUM3mz7soDlQ/eaw1E\"",
    "mtime": "2023-08-17T13:20:07.106Z",
    "size": 6084,
    "path": "../public/_nuxt/game.43722512.css"
  },
  "/_nuxt/game.79e47477.js": {
    "type": "application/javascript",
    "etag": "\"72b4-jM5WtHAUGiHZB8MbBcJ2AZ2bHQU\"",
    "mtime": "2023-08-17T13:20:07.106Z",
    "size": 29364,
    "path": "../public/_nuxt/game.79e47477.js"
  },
  "/_nuxt/game.94c5ccac.js": {
    "type": "application/javascript",
    "etag": "\"18cc-/GpetfCrywLZhzkY3PCwgS94HzM\"",
    "mtime": "2023-08-17T13:20:07.106Z",
    "size": 6348,
    "path": "../public/_nuxt/game.94c5ccac.js"
  },
  "/_nuxt/index.b166c094.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4c0-zNKEt7XpPXTRoi94YqtkKDk+ubg\"",
    "mtime": "2023-08-17T13:20:07.105Z",
    "size": 1216,
    "path": "../public/_nuxt/index.b166c094.css"
  },
  "/_nuxt/index.b3315249.js": {
    "type": "application/javascript",
    "etag": "\"5eb-4k1JPH2avUdp6Bbkc1PB6tTHyUo\"",
    "mtime": "2023-08-17T13:20:07.105Z",
    "size": 1515,
    "path": "../public/_nuxt/index.b3315249.js"
  },
  "/_nuxt/intro.261e286e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3a5-QtW2ct68n0h9Wz/s3mtcj7NFCV4\"",
    "mtime": "2023-08-17T13:20:07.105Z",
    "size": 933,
    "path": "../public/_nuxt/intro.261e286e.css"
  },
  "/_nuxt/intro.5caaa4fa.js": {
    "type": "application/javascript",
    "etag": "\"413-ziu5baMg4AdBJsoKD1K5fvQD6H4\"",
    "mtime": "2023-08-17T13:20:07.105Z",
    "size": 1043,
    "path": "../public/_nuxt/intro.5caaa4fa.js"
  },
  "/_nuxt/shelf.9933c4bd.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1f5-5dxeefmZ9+PHR1CSDwqOwwKMINI\"",
    "mtime": "2023-08-17T13:20:07.105Z",
    "size": 501,
    "path": "../public/_nuxt/shelf.9933c4bd.css"
  },
  "/_nuxt/shelf.9a015150.js": {
    "type": "application/javascript",
    "etag": "\"75d-SnahcW8eoD175Qht+JWZYZxCXFk\"",
    "mtime": "2023-08-17T13:20:07.104Z",
    "size": 1885,
    "path": "../public/_nuxt/shelf.9a015150.js"
  },
  "/character/Hailey.png": {
    "type": "image/png",
    "etag": "\"2de45-cthv0zvvhd/FI4u3LM51jQG4nRk\"",
    "mtime": "2023-08-17T13:20:07.122Z",
    "size": 187973,
    "path": "../public/character/Hailey.png"
  },
  "/character/Tai Keung.png": {
    "type": "image/png",
    "etag": "\"2af85-T3wYSconWa1guycu+ONG1ZAnGUg\"",
    "mtime": "2023-08-17T13:20:07.122Z",
    "size": 176005,
    "path": "../public/character/Tai Keung.png"
  },
  "/character/jenny.png": {
    "type": "image/png",
    "etag": "\"3294e-SAwNElbb/bdKn0/YnPHKUE5J6wg\"",
    "mtime": "2023-08-17T13:20:07.121Z",
    "size": 207182,
    "path": "../public/character/jenny.png"
  },
  "/character/sing.png": {
    "type": "image/png",
    "etag": "\"23c09-5qz+f4FJg7j/Ufb3mH3UPBvXKUU\"",
    "mtime": "2023-08-17T13:20:07.120Z",
    "size": 146441,
    "path": "../public/character/sing.png"
  },
  "/images/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-mJm0BgX13PnXiqOru1hBExNlCEE\"",
    "mtime": "2023-08-17T13:20:07.120Z",
    "size": 6148,
    "path": "../public/images/.DS_Store"
  },
  "/images/close.svg": {
    "type": "image/svg+xml",
    "etag": "\"1de-nQJzJqYLeWwimWw7irIoYsrrdtI\"",
    "mtime": "2023-08-17T13:20:07.114Z",
    "size": 478,
    "path": "../public/images/close.svg"
  },
  "/images/logoEN.svg": {
    "type": "image/svg+xml",
    "etag": "\"34ba-r/ROLQVx29qhpkZmcj+MrH1UHVw\"",
    "mtime": "2023-08-17T13:20:07.114Z",
    "size": 13498,
    "path": "../public/images/logoEN.svg"
  },
  "/images/logoHK.svg": {
    "type": "image/svg+xml",
    "etag": "\"2826-opXbGPliQUqAyLnK8CzRU1H9BDs\"",
    "mtime": "2023-08-17T13:20:07.113Z",
    "size": 10278,
    "path": "../public/images/logoHK.svg"
  },
  "/images/logo_purple.svg": {
    "type": "image/svg+xml",
    "etag": "\"27ed-sasJmSVuZJXxy6grttw1tYrEMYk\"",
    "mtime": "2023-08-17T13:20:07.113Z",
    "size": 10221,
    "path": "../public/images/logo_purple.svg"
  },
  "/images/logo_purpleEN.svg": {
    "type": "image/svg+xml",
    "etag": "\"322b-ci6f8sTsq0ELUQYrW8fSSJAVjVI\"",
    "mtime": "2023-08-17T13:20:07.113Z",
    "size": 12843,
    "path": "../public/images/logo_purpleEN.svg"
  },
  "/images/selected.svg": {
    "type": "image/svg+xml",
    "etag": "\"1a3-L0+wZ04KQNqXY93F/O8RCl8OPFY\"",
    "mtime": "2023-08-17T13:20:07.112Z",
    "size": 419,
    "path": "../public/images/selected.svg"
  },
  "/images/shelf_bg1.png": {
    "type": "image/png",
    "etag": "\"9adc-hQGkHHfuANbtvHwGRPS7v2z7Jrw\"",
    "mtime": "2023-08-17T13:20:07.112Z",
    "size": 39644,
    "path": "../public/images/shelf_bg1.png"
  },
  "/images/shelf_bg2.png": {
    "type": "image/png",
    "etag": "\"8a85-u8KTViSY8iTc7nVGDqYiTAdCLTY\"",
    "mtime": "2023-08-17T13:20:07.111Z",
    "size": 35461,
    "path": "../public/images/shelf_bg2.png"
  },
  "/images/stock.svg": {
    "type": "image/svg+xml",
    "etag": "\"1503-baMVjcIaA18wdyL3fsIBMw9rub0\"",
    "mtime": "2023-08-17T13:20:07.110Z",
    "size": 5379,
    "path": "../public/images/stock.svg"
  },
  "/images/books/0.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c5-Pzz/Blc2eYnWDBBqNvp1M+dE/OE\"",
    "mtime": "2023-08-17T13:20:07.119Z",
    "size": 965,
    "path": "../public/images/books/0.svg"
  },
  "/images/books/1.svg": {
    "type": "image/svg+xml",
    "etag": "\"423-CW9dIb7IBip0OoS3oj3msf5OTbs\"",
    "mtime": "2023-08-17T13:20:07.119Z",
    "size": 1059,
    "path": "../public/images/books/1.svg"
  },
  "/images/books/2.svg": {
    "type": "image/svg+xml",
    "etag": "\"29c-yJWkaH4KKZPXfhSSaaNFceHmeqE\"",
    "mtime": "2023-08-17T13:20:07.119Z",
    "size": 668,
    "path": "../public/images/books/2.svg"
  },
  "/images/books/3.svg": {
    "type": "image/svg+xml",
    "etag": "\"3da-axcw8rtvGsAecujG+kK/UZGjzVc\"",
    "mtime": "2023-08-17T13:20:07.118Z",
    "size": 986,
    "path": "../public/images/books/3.svg"
  },
  "/images/books/4.svg": {
    "type": "image/svg+xml",
    "etag": "\"405-f5PWIQvxB+/4LErVa3isCUncVgQ\"",
    "mtime": "2023-08-17T13:20:07.118Z",
    "size": 1029,
    "path": "../public/images/books/4.svg"
  },
  "/images/books/5.svg": {
    "type": "image/svg+xml",
    "etag": "\"fe8-0FGxxWf1TAE0uPXQaDb/OD6kg7A\"",
    "mtime": "2023-08-17T13:20:07.118Z",
    "size": 4072,
    "path": "../public/images/books/5.svg"
  },
  "/images/books/6.svg": {
    "type": "image/svg+xml",
    "etag": "\"855-4zwe81Q8mUKxRrjWPTiHfL25ClU\"",
    "mtime": "2023-08-17T13:20:07.118Z",
    "size": 2133,
    "path": "../public/images/books/6.svg"
  },
  "/images/books/7.svg": {
    "type": "image/svg+xml",
    "etag": "\"122f-PV+/NQKX6cduf5Ljz2YsI82u49o\"",
    "mtime": "2023-08-17T13:20:07.117Z",
    "size": 4655,
    "path": "../public/images/books/7.svg"
  },
  "/images/books/8.svg": {
    "type": "image/svg+xml",
    "etag": "\"15dc-9WhmPwSgEEPitik2GxtNBu0dAf0\"",
    "mtime": "2023-08-17T13:20:07.117Z",
    "size": 5596,
    "path": "../public/images/books/8.svg"
  },
  "/images/books/9.svg": {
    "type": "image/svg+xml",
    "etag": "\"1000-F0b6zT3vQTWMAPCH97fc6f6EDrQ\"",
    "mtime": "2023-08-17T13:20:07.116Z",
    "size": 4096,
    "path": "../public/images/books/9.svg"
  },
  "/images/books/r0.svg": {
    "type": "image/svg+xml",
    "etag": "\"499-1lUX56H6Zx4YeYoKSzRCexbesRg\"",
    "mtime": "2023-08-17T13:20:07.116Z",
    "size": 1177,
    "path": "../public/images/books/r0.svg"
  },
  "/images/books/r1.svg": {
    "type": "image/svg+xml",
    "etag": "\"526-+3CeoFLZ+rL8L2VLm6I8WmQzeic\"",
    "mtime": "2023-08-17T13:20:07.116Z",
    "size": 1318,
    "path": "../public/images/books/r1.svg"
  },
  "/images/books/r2.svg": {
    "type": "image/svg+xml",
    "etag": "\"396-+nKupJnLPeyOclb61qSIzGOegy0\"",
    "mtime": "2023-08-17T13:20:07.115Z",
    "size": 918,
    "path": "../public/images/books/r2.svg"
  },
  "/images/books/r3.svg": {
    "type": "image/svg+xml",
    "etag": "\"4b4-6Qqfw5Cfd2OpasOXWBZ9IvAb+GM\"",
    "mtime": "2023-08-17T13:20:07.115Z",
    "size": 1204,
    "path": "../public/images/books/r3.svg"
  },
  "/images/books/r4.svg": {
    "type": "image/svg+xml",
    "etag": "\"4e6-s4NU4va7aSJHB0fIVxEhkTGooEw\"",
    "mtime": "2023-08-17T13:20:07.115Z",
    "size": 1254,
    "path": "../public/images/books/r4.svg"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.node.req.method && !METHODS.has(event.node.req.method)) {
    return;
  }
  let id = decodeURIComponent(
    withLeadingSlash(
      withoutTrailingSlash(parseURL(event.node.req.url).pathname)
    )
  );
  let asset;
  const encodingHeader = String(
    event.node.req.headers["accept-encoding"] || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    event.node.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.node.res.removeHeader("cache-control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.node.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  const ifModifiedSinceH = event.node.req.headers["if-modified-since"];
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  if (asset.type && !event.node.res.getHeader("Content-Type")) {
    event.node.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.node.res.getHeader("ETag")) {
    event.node.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.node.res.getHeader("Last-Modified")) {
    event.node.res.setHeader("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.node.res.getHeader("Content-Encoding")) {
    event.node.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.node.res.getHeader("Content-Length")) {
    event.node.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_AaGzHk = () => import('../handlers/renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_AaGzHk, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_AaGzHk, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || {};
      const envContext = event.node.req.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: $fetch });
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on(
    "unhandledRejection",
    (err) => console.error("[nitro] [dev] [unhandledRejection] " + err)
  );
  process.on(
    "uncaughtException",
    (err) => console.error("[nitro] [dev] [uncaughtException] " + err)
  );
}
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
