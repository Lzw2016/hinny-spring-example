import {HttpRouter} from "@hinny/mvc";
import {commonUtils} from "@hinny/core";

const log = LoggerFactory.getLogger(__filename);

// 数据绑定
const t01: HttpRouter = {
    get: ctx => {
        // 定义数据结构以及类型
        const data = {
            a: "",
            b: 0,
            c: false,
            d: Interop.asJBigDecimal("0.00"),
            e: commonUtils.now(),
        }
        // 填充数据
        ctx.request.fillFromAny(data);
        log.info("data -> {}", data);
        return data;
    },
}

// 数据绑定并验证
const t02: HttpRouter = {
    get: ctx => {
        // 定义数据结构以及类型
        const data = {
            a: "",
            b: 0,
            c: false,
            d: Interop.asJBigDecimal("0.00"),
            e: commonUtils.now(),
        }
        // 填充而且验证数据
        ctx.request.fillAndValidatedFromAny(data, {
            a: {notBlank: true, length: {max: 3}},
            b: {notNull: true, range: {min: 100}},
            d: {notNull: true, digits: {fraction: 3}},
            e: {futureDate: true},
        });
        return data;
    },
}

// 数据绑定其他API
const t03: HttpRouter = {
    get: ctx => {
        // 定义数据结构以及类型
        const data = {
            a: "",
            b: 0,
            c: false,
            d: Interop.asJBigDecimal("0.00"),
            e: commonUtils.now(),
        }
        // 保留数据默认值
        ctx.request.fillFromAny(data, false);
        // 从Params中填充数据
        ctx.request.fillFromParams(data);
        // 从Body中填充数据
        ctx.request.fillFromBody(data);
        return data;
    },
}

export {
    t01,
    t02,
    t03,
}
