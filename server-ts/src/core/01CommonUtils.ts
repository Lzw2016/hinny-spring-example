import {commonUtils, stringUtils} from '@hinny/core';

const log = LoggerFactory.getLogger(__filename);

// 基础工具
const t01 = function () {
    const str_1 = "aaa";
    const str_2 = "bbb";
    const str_3 = stringUtils.getStringFromByte(stringUtils.getByteFromString(str_2));
    const num = 123;
    log.info("str_1={} | str_2={} | str_3={} | num={}", str_1, str_2, str_3, num);

    // 休眠一段时间
    commonUtils.sleep(3000);
    // 获取当前时间搓(毫秒)
    log.info("currentTimeMillis -->{}", commonUtils.currentTimeMillis());
    // 获取当前时间 Date
    log.info("now               -->{} | {}", commonUtils.now(), commonUtils.now().getTime());
    // 比较对象是否相同/相等
    log.info("equals            -->{} | {}", commonUtils.equals(str_1, str_2), commonUtils.equals(str_2, str_3));
    log.info("same              -->{} | {} | {}", commonUtils.same(str_1, str_2), commonUtils.same(str_2, str_3), commonUtils.same(str_3, str_3));
    // 获取对象的hashCode
    log.info("hashCode          -->{} | {}", commonUtils.hashCode(str_1), commonUtils.hashCode(str_2));
    // 获取对象的真实类型
    log.info("hashCode          -->{} | {}", commonUtils.getClass(str_1).getName(), commonUtils.getClassName(num));
    return {success: true};
}

export {
    t01,
}