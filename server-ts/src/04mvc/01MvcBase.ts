import {HttpHandle, HttpRouter, MediaType} from "@hinny/mvc";
import {cookieUtils, iDGenerateUtils} from "@hinny/core";

const log = LoggerFactory.getLogger(__filename);

// 处理Http请求(HttpHandle 会会处理所有Http请求: get、post、put)
const t01: HttpHandle = ctx => {
    const {request} = ctx;
    log.info("url --> {}", request.getRequestURL());
    // 各种业务逻辑
    // ...
    // 返回数据
    const data = {a: "aaa", b: 123};
    return {success: true, data};
};

// 处理特定请求
const t02: HttpRouter = {
    get: ctx => {
        return {success: true, method: "get"};
    },
    post: ctx => {
        return {success: true, method: "post"};
    },
}

// 读取HTTP请求 params、body、header
const t03: HttpHandle = ctx => {
    const {request} = ctx;
    // params数据
    const a = request.getParameter("a");
    const params = request.getParameterMap();
    // body数据
    const body = request.getBody();
    // header数据
    const host = request.getHeader("Host");
    const headerNames = request.getHeaderNames();
    return {a, params, body, host, headerNames};
}

// 设置HTTP响应数据
const t04: HttpHandle = ctx => {
    const {response} = ctx;
    response.addHeader("a-123", iDGenerateUtils.shortUuid());
    cookieUtils.setCookieForRooPath(response.originalResponse(), "b-123", iDGenerateUtils.uuid());
    response.setContentType(MediaType.Plain);
    response.getWriter().println("111");
    response.getWriter().println("222");
    response.getWriter().println("333");
    response.getWriter().println("aaa");
    response.getWriter().println("bbb");
    response.getWriter().println("ccc");
}

// Servlet API 使用
const t05: HttpHandle = ctx => {
    const {request} = ctx;
    let {session} = ctx;
    if (session == null) {
        session = request.getSession(true);
    }
    let count = session.getAttribute<JInt>("count") ?? 0;
    count++;
    session.setAttribute("count", count);
    return {count};
}

export {
    t01,
    t02,
    t03,
    t04,
    t05,
}