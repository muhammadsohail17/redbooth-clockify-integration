[1mdiff --git a/.env b/.env[m
[1mindex 328b5e8..e094040 100644[m
[1m--- a/.env[m
[1m+++ b/.env[m
[36m@@ -1,6 +1,7 @@[m
[31m-MONGODB_URI='mongodb://127.0.0.1:27017/timesheet'[m
[31m-DB_NAME = timesheet[m
[32m+[m[32mMONGODB_URI=mongodb://127.0.0.1:27017/timesheet[m
[32m+[m[32mDB_NAME=timesheet[m
 PORT=3000[m
[32m+[m[32mNEXTAUTH_SECRET=uqb4UAoblQSE10hS0pH/ZeD+636aa/h6rLeZSWYwetg=[m
 CURRENCY='CURRENCY_SYMBOL_HERE'[m
 NEXT_PUBLIC_INVOICE_COMPANY_NAME='COMPANY_NAME'[m
[31m-NEXT_PUBLIC_INVOICE_COMPANY_ADDRESS='COMPANY_ADDRESS'[m
\ No newline at end of file[m
[32m+[m[32mNEXT_PUBLIC_INVOICE_COMPANY_ADDRESS='COMPANY_ADDRESS'[m
[1mdiff --git a/package-lock.json b/package-lock.json[m
[1mindex de9a61d..80eeed4 100644[m
[1m--- a/package-lock.json[m
[1m+++ b/package-lock.json[m
[36m@@ -13,6 +13,7 @@[m
         "mongodb": "^5.6.0",[m
         "mongoose": "^7.3.0",[m
         "next": "13.4.6",[m
[32m+[m[32m        "next-auth": "^4.22.1",[m
         "postcss": "8.4.24",[m
         "react": "18.2.0",[m
         "react-dom": "18.2.0",[m
[36m@@ -30,6 +31,17 @@[m
         "url": "https://github.com/sponsors/sindresorhus"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/@babel/runtime": {[m
[32m+[m[32m      "version": "7.22.5",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.22.5.tgz",[m
[32m+[m[32m      "integrity": "sha512-ecjvYlnAaZ/KVneE/OdKYBYfgXV3Ptu6zQWmgEF7vwKhQnvVS6bjMD2XYgj+SNvQ1GfK/pjgokfPkC/2CO8CuA==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "regenerator-runtime": "^0.13.11"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=6.9.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/@jridgewell/gen-mapping": {[m
       "version": "0.3.3",[m
       "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.3.tgz",[m
[36m@@ -250,6 +262,14 @@[m
         "node": ">= 8"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/@panva/hkdf": {[m
[32m+[m[32m      "version": "1.1.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@panva/hkdf/-/hkdf-1.1.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-dhPeilub1NuIG0X5Kvhh9lH4iW3ZsHlnzwgwbOlgwQ2wG1IqFzsgHqmKPk3WzsdWAeaxKJxgM0+W433RmN45GA==",[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://github.com/sponsors/panva"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/@swc/helpers": {[m
       "version": "0.5.1",[m
       "resolved": "https://registry.npmjs.org/@swc/helpers/-/helpers-0.5.1.tgz",[m
[36m@@ -522,6 +542,14 @@[m
       "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",[m
       "integrity": "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg=="[m
     },[m
[32m+[m[32m    "node_modules/cookie": {[m
[32m+[m[32m      "version": "0.5.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.5.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-YZ3GUyn/o8gfKJlnlX7g7xq4gyO6OSuhGPKaaGssGB2qgDUS0gPgtTvoyZLTt9Ab6dC4hfc9dV5arkvc/OCmrw==",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.6"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/cssesc": {[m
       "version": "3.0.0",[m
       "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz",[m
[36m@@ -824,6 +852,14 @@[m
         "jiti": "bin/jiti.js"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/jose": {[m
[32m+[m[32m      "version": "4.14.4",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/jose/-/jose-4.14.4.tgz",[m
[32m+[m[32m      "integrity": "sha512-j8GhLiKmUAh+dsFXlX1aJCbt5KMibuKb+d7j1JaOJG6s2UjX1PQlW+OKB/sD4a/5ZYF4RcmYmLSndOoU3Lt/3g==",[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://github.com/sponsors/panva"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/js-tokens": {[m
       "version": "4.0.0",[m
       "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",[m
[36m@@ -861,6 +897,17 @@[m
         "loose-envify": "cli.js"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/lru-cache": {[m
[32m+[m[32m      "version": "6.0.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-6.0.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-Jo6dJ04CmSjuznwJSS3pUeWmd/H0ffTlkXXgwZi+eq1UCmqQwCh+eLsYOYCwY991i2Fah4h1BEMCx4qThGbsiA==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "yallist": "^4.0.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=10"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/memory-pager": {[m
       "version": "1.5.0",[m
       "resolved": "https://registry.npmjs.org/memory-pager/-/memory-pager-1.5.0.tgz",[m
[36m@@ -1080,6 +1127,33 @@[m
         }[m
       }[m
     },[m
[32m+[m[32m    "node_modules/next-auth": {[m
[32m+[m[32m      "version": "4.22.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/next-auth/-/next-auth-4.22.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-NTR3f6W7/AWXKw8GSsgSyQcDW6jkslZLH8AiZa5PQ09w1kR8uHtR9rez/E9gAq/o17+p0JYHE8QjF3RoniiObA==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@babel/runtime": "^7.20.13",[m
[32m+[m[32m        "@panva/hkdf": "^1.0.2",[m
[32m+[m[32m        "cookie": "^0.5.0",[m
[32m+[m[32m        "jose": "^4.11.4",[m
[32m+[m[32m        "oauth": "^0.9.15",[m
[32m+[m[32m        "openid-client": "^5.4.0",[m
[32m+[m[32m        "preact": "^10.6.3",[m
[32m+[m[32m        "preact-render-to-string": "^5.1.19",[m
[32m+[m[32m        "uuid": "^8.3.2"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "next": "^12.2.5 || ^13",[m
[32m+[m[32m        "nodemailer": "^6.6.5",[m
[32m+[m[32m        "react": "^17.0.2 || ^18",[m
[32m+[m[32m        "react-dom": "^17.0.2 || ^18"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependenciesMeta": {[m
[32m+[m[32m        "nodemailer": {[m
[32m+[m[32m          "optional": true[m
[32m+[m[32m        }[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/next/node_modules/postcss": {[m
       "version": "8.4.14",[m
       "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.4.14.tgz",[m
[36m@@ -1124,6 +1198,11 @@[m
         "node": ">=0.10.0"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/oauth": {[m
[32m+[m[32m      "version": "0.9.15",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/oauth/-/oauth-0.9.15.tgz",[m
[32m+[m[32m      "integrity": "sha512-a5ERWK1kh38ExDEfoO6qUHJb32rd7aYmPHuyCu3Fta/cnICvYmgd2uhuKXvPD+PXB+gCEYYEaQdIRAjCOwAKNA=="[m
[32m+[m[32m    },[m
     "node_modules/object-assign": {[m
       "version": "4.1.1",[m
       "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",[m
[36m@@ -1140,6 +1219,14 @@[m
         "node": ">= 6"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/oidc-token-hash": {[m
[32m+[m[32m      "version": "5.0.3",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/oidc-token-hash/-/oidc-token-hash-5.0.3.tgz",[m
[32m+[m[32m      "integrity": "sha512-IF4PcGgzAr6XXSff26Sk/+P4KZFJVuHAJZj3wgO3vX2bMdNVp/QXTP3P7CEm9V1IdG8lDLY3HhiqpsE/nOwpPw==",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": "^10.13.0 || >=12.0.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/once": {[m
       "version": "1.4.0",[m
       "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",[m
[36m@@ -1148,6 +1235,28 @@[m
         "wrappy": "1"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/openid-client": {[m
[32m+[m[32m      "version": "5.4.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/openid-client/-/openid-client-5.4.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-lIhsdPvJ2RneBm