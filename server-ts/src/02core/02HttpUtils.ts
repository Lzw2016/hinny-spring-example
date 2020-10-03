import {HttpMethod, httpUtils} from '@hinny/core';

const log = LoggerFactory.getLogger(__filename);

interface HttpRes {
    success: JBoolean;
    msg: JString;
    data: JMap<JString, JString>;
}

// 发送Http请求
const t01 = function () {
    const url = "http://www.jk.com/search/merchandise";
    // 返回字符串
    const res_1 = httpUtils.getStr(url, {keyWord: "轮椅"});
    log.info("res_1  -> {}", res_1);

    // 返回Map对象
    const res_2 = httpUtils.getMap(url, {keyWord: "体温计"});
    log.info("res_2 -> size={} | data={}", res_2.size(), res_2.get("data"));
    // Map转JS对象
    const jsRes = Interop.fromJMap<HttpRes>(res_2);
    log.info("jsRes  -> size={} | {}", jsRes.data.size(), jsRes.data.get("prodNameList"));

    // 发送POST请求，设置body、params、headers
    const res_3 = httpUtils.postMap(
        "https://houtai.baidu.com/api/mock2/page/initData",
        {
            a: "a",
            b: 1
        },
        {
            keyWord: "体温计"
        },
        {
            token: "1212a12b2343c34897d3434"
        },
    );
    log.info("res_3  -> {}", res_3);
    return {success: true};
}

// 需要获取响应详细信息 status、headers、body等信息
const t02 = function () {
    const url = "http://www.jk.com/search/merchandise";
    const res = httpUtils.execRequest(HttpMethod.GET, url, null, {keyWord: "体温计"}, {});
    log.info("getStatus         -> {}", res.getStatus());
    log.info("getStatusMessage  -> {}", res.getStatusMessage());
    log.info("getBody           -> {}", res.getBody());
    log.info("getHeaders        -> {}", res.getHeaders());
    log.info("isRedirect        -> {}", res.isRedirect());
    log.info("isSuccessful      -> {}", res.isSuccessful());
    log.info("getHeaderNames    -> {}", res.getHeaderNames());
    log.info("getBodyMap        -> {}", res.getBodyMap());
    log.info("getFirstHeader    -> {}", res.getFirstHeader("set-cookie"));
    return {success: true};
}

export {
    t01,
    t02,
}