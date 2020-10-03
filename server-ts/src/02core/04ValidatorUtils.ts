import {ValidatorRule, validatorUtils} from '@hinny/core';

const log = LoggerFactory.getLogger(__filename);

interface DataEntity {
    str: JString;
    bool: JBoolean;
    num: JLong;
}

// 校验规则
const validateRule: ValidatorRule<DataEntity> = {
    str: {length: {min: 10, max: 20}},
    bool: {notNull: true, equals: true},
    num: {range: {min: 0, max: 666}},
};

// 校验数据-获取校验结果
const t01 = function () {
    const data: DataEntity = {
        str: "aaa",
        bool: <any>null,
        num: 123,
    }
    // 验证数据
    const res_1 = validatorUtils.valid(data, validateRule);
    log.info("hasError  -> {}", res_1.hasError());
    log.info("getErrors -> {}", [res_1.getErrors()]);

    // 快速校验,只要有一个错误就返回
    const res_2 = validatorUtils.valid(data, validateRule, true);
    log.info("hasError  -> {}", res_2.hasError());
    log.info("getErrors -> {}", [res_2.getErrors()]);
    return {success: true};
}

// 如果错误直接抛出异常
const t02 = function () {
    const data: DataEntity = {
        str: "aaa",
        bool: true,
        num: 667,
    }
    try {
        validatorUtils.validated(data, validateRule);
    } catch (e) {
        log.info("--> 校验失败", e);
    }
    return {success: true};
}

export {
    t01,
    t02,
}