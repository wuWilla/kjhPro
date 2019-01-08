const fs = require("fs");
const path = require("path");
const multer = require("koa-multer");
const router = require("koa-router")();

class Main {
  constructor () {
    this.pathMapping = new Map();
    this.uploadMapping = new Map();
  }
  asyncReaddir (dir) {
    return new Promise((resolve, reject) => {
      fs.readdir(dir, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    });
  }
  koaRouterFunctionFactory (params, paramsCanBeNull, method, result) {
    return function (ctx, next) {
      let requestParams = method.toUpperCase().trim() === "GET" ? ctx.request.query : ctx.request.body;
      if (params) {
        for (let i = 0; i < params.length; i++) {
          let temp = requestParams[params[i]];
          if ((temp === null || temp === undefined || temp === "") && (!paramsCanBeNull || !paramsCanBeNull.includes(params[i]))) {
            ctx.response.body = `
              参数错误，错误参数为${params[i]},
              获取到的参数值为${temp},
              接收到的参数为${JSON.stringify(requestParams)}，
              期待的参数列表为${params},
              可为空的参数为${paramsCanBeNull}
            `;
            return;
          }
        }
      }
      ctx.state = 200;
      ctx.response.body = JSON.stringify(result);
    };
  }
  addJsonMapping () {
    for (let key of this.pathMapping.keys()) {
      if (key.startsWith("GET ")) {
        const path = key.slice(4);
        console.log("GET:" + path);
        router.get(path, this.pathMapping.get(key));
      } else if (key.startsWith("POST ")) {
        const path = key.slice(5);
        console.log("POST:" + path);
        router.post(path, this.pathMapping.get(key));
      } else if (key.startsWith("PUT ")) {
        const path = key.slice(4);
        console.log("PUT:" + path);
        router.put(path, this.pathMapping.get(key));
      } else if (key.startsWith("DELETE ")) {
        const path = key.slice(7);
        console.log("DELETE:" + path);
        router.delete(path, this.pathMapping.get(key));
      } else if (key.startsWith("HEAD ")) {
        const path = key.slice(5);
        console.log("HEAD:" + path);
        router.head(path, this.pathMapping.get(key));
      } else {
        throw new Error("invalid request method name");
      }
    }
  }
  addUploadMapping () {
    for (let key of this.uploadMapping.keys()) {
      const value = this.uploadMapping.get(key);
      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, `./${value.serverSaveFilePath}` || "./file");
        },
        filename: function (req, file, cb) {
          const fileFormat = (file.originalname).split(".");
          cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
        }
      });
      const uploadImg = multer({storage: storage});
      router.post(key, uploadImg.single("file"), async (ctx, next) => {
        const result = value.result;
        const url = `http://127.0.0.1:4355/${value.serverSaveFilePath}/${ctx.req.file.filename}`;
        const urlInResultPath = value.responseUrlInResultPath || ["data"];
        let currentObj = result;
        for (let i = 0; i < urlInResultPath.length; i++) {
          currentObj = currentObj[urlInResultPath[i]];
        }
        const urlName = value.urlName || "url";
        currentObj[urlName] = url;
        ctx.body = result;
      });
      console.log(`register upload URL mapping: POST ${key}`);
    }
  }
  addStaticRouter () {
    router.get("/*", async (ctx, next) => {
      if (ctx.path.endsWith(".jpg") || ctx.path.endsWith(".png") || ctx.path.endsWith(".gif")) {
        const rootPathArray = __dirname.split("\\");
        const imageType = ctx.path.slice(ctx.path.indexOf(".") + 1);
        const rootPath = path.join(...rootPathArray);
        ctx.response.set("Content-Type", `image/${imageType}`);
        ctx.body = fs.createReadStream(rootPath + ctx.path);
      } else {
        await next();
      }
    });
  }
  async init (needStatic = true, dir = "./apiJson") {
    const files = await this.asyncReaddir(dir);
    for (let i = 0; i < files.length; i++) {
      if (files[i].endsWith(".json")) {
        const fileJson = await require(`.${dir}/${files[i]}`);
        if (!fileJson.length || fileJson.length === 0) {
          continue;
        }
        for (let y = 0; y < fileJson.length; y++) {
          const type = fileJson[y].type || "json";
          if (type === "json") {
            this.pathMapping.set(
              `${fileJson[y].method.toUpperCase().trim()} ${fileJson[y].path}`,
              this.koaRouterFunctionFactory(fileJson[y].params, fileJson[y].paramsCanBeNull, fileJson[y].method, fileJson[y].result)
            );
          } else {
            this.uploadMapping.set(
              fileJson[y].path,
              {
                result: fileJson[y].result,
                serverSaveFilePath: fileJson[y].serverSaveFilePath,
                responseUrlInResultPath: fileJson[y].responseUrlInResultPath,
                urlName: fileJson[y].urlName
              }
            );
          }
        }
      }
    }
    this.addJsonMapping();
    if (this.uploadMapping.size > 0) {
      this.addUploadMapping();
    }
    if (needStatic) {
      this.addStaticRouter();
    }
    return router.routes();
  }
}

module.exports = new Main();
