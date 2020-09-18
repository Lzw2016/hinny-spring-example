import {HttpRouter, MediaType} from "@hinny/mvc";
import {BarcodeFormat, imageValidateUtils, zxingUtils} from "@hinny/core";

const log = LoggerFactory.getLogger(__filename);

// 文件上传
const t01: HttpRouter = {
    get: ctx => {
        const {request} = ctx;
        const allFiles = request.getAllUploadFiles();
        const iterator = allFiles.entrySet().iterator();
        const res = [];
        while (iterator.hasNext()) {
            const entry = iterator.next();
            const paramsName = entry.getKey();
            const files = entry.getValue();
            for (let i = 0; i < files.size(); i++) {
                const file = files.get(i);
                log.info("--> paramsName={} | file.getOriginalFilename={} | file.getSize={}", paramsName, file.getOriginalFilename(), file.getSize());
                res.push({paramsName, name: file.getName(), size: file.getSize(), originalFilename: file.getOriginalFilename()});
            }
        }
        return res;
    },

    post: ctx => {
        const {request} = ctx;
        const file = request.getFirstUploadFile();
        return {name: file.getName(), size: file.getSize(), originalFilename: file.getOriginalFilename()};
    }
}

// 文件下载
const t02: HttpRouter = {
    get: ctx => {
        const {response} = ctx;
        const data = zxingUtils.createImage("123456abc", BarcodeFormat.QR_CODE);
        response.setDownloadFileName("二维码.jpg");
        response.getOutputStream().write(data);
    }
}

// 图片直接用浏览器打开
const t03: HttpRouter = {
    get: ctx => {
        const {response} = ctx;
        const data = imageValidateUtils.createImage("1234");
        // const data = zxingUtils.createImage("123456abc", BarcodeFormat.QR_CODE);
        response.setContentType(MediaType.Png);
        response.getOutputStream().write(data);
    }
}

export {
    t01,
    t02,
    t03,
}