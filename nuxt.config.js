const webpack = require("webpack")
const MomentLocalesPlugin = require("moment-locales-webpack-plugin")

module.exports = {
  mode: "spa",
  head: {
    htmlAttrs: {
      lang: "ja",
      prefix: "og:http://ogp.me/ns#"
    },
    title: "Ayatori",
    meta: [
      { charset: "utf-8" },
      { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "msapplication-TileColor", content: "#da532c" },
      { name: "msapplication-config", content: "/favicon/broserconfig.xml" },
      { name: "theme-color", content: "#ffffff" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon/favicon.ico" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon/apple-touch-icon.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon/favicon-16x16.png" },
      { rel: "mask-icon", href: "/favicon/safari-pinned-tab.svg", color: "#5bbad5" },
      { rel: "shortcut icon", href: "/favicon/favicon.ico" },
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css", integrity: "sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU=", crossorigin: "anonymous" },
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/fork-awesome/1.1.7/css/fork-awesome.min.css", integrity: "sha256-gsmEoJAws/Kd3CjuOQzLie5Q3yshhvmo7YNtBG7aaEY=", crossorigin: "anonymous" },
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/pretty-checkbox/3.0.0/pretty-checkbox.min.css", integrity: "sha256-KCHcsGm2E36dSODOtMCcBadNAbEUW5m+1xLId7xgLmw=", crossorigin: "anonymous" },
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css", integrity: "sha256-siyOpF/pBWUPgIcQi17TLBkjvNgNQArcmwJB8YvkAgg=", crossorigin: "anonymous" },
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/TableExport/5.2.0/css/tableexport.min.css", integrity: "sha256-ljRB06PkvKJLniqOfPxxNfnIGgtF3gSWnLqYuFhWoDY=", crossorigin: "anonymous" },
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css", integrity: "sha256-iq5ygGJ7021Pi7H5S+QAUXCPUfaBzfqeplbg/KlEssg=", crossorigin: "anonymous" }
    ],
    script: [
      { src: "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js", integrity: "sha256-FPJJt8nA+xL4RU6/gsriA8p8xAeLGatoyTjldvQKGdE=", crossorigin: "anonymous" },
      { src: "https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js", integrity: "sha256-JuQeAGbk9rG/EoRMixuy5X8syzICcvB0dj3KindZkY0=", crossorigin: "anonymous" },
      { src: "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js", integrity: "sha256-Uv9BNBucvCPipKQ2NS9wYpJmi8DTOEfTA/nH2aoJALw=", crossorigin: "anonymous" }
    ]
  },
  loading: false,
  css: [
    "@/assets/css/bootstrap.min.css"
  ],
  plugins: [
    { src: "@/plugins/clientOnly.client.js", ssr: false }
  ],
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/proxy"
  ],
  axios: {
    proxy: true,
    retry: true
  },
  proxy: {
    "/cors": { target: "http://utanohi.everyday.jp/", pathRewrite: {
      "^/cors/index.php" : "/index.php",
      "^/cors/open.php" : "/open.php",
      "^/cors/page.php" : "/page.php"
    }},
    "/api": "https://kuromoji-now.paithiov909.now.sh/"
  },
  build: {
    extractCSS: true,
    plugins: [
      new webpack.ProvidePlugin({
          "$": "jquery",
          "jQuery": "jquery",
          "window.jQuery": "jquery",
          "_": "underscore",
          "List": "list.js",
          "ClipboardJS": "clipboard",
          "moment": "moment"
      }),
      new MomentLocalesPlugin({
        localesToKeep: ["ja"]
      })
    ],
    /*
    ** You can extend webpack config here
    */
    extend (config, { isClient }) {
      if (isClient) {
        config.target = "electron-renderer"
      }
    }
  },
  dev: process.env.NODE_ENV === "DEV"
}
