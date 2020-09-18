import {assertUtils} from '@hinny/core';

const log = LoggerFactory.getLogger(__filename);

const t01 = function () {
    let num: JInt | null = 6;
    try {
        assertUtils.isTrue(num > 7, "num必须要大于7");
    } catch (e) {
        log.info("num > 7 | ", e);
    }
    try {
        assertUtils.isFalse(num < 6, "num必须要小于6");
    } catch (e) {
        log.info("num < 6 | ", e);
    }
    try {
        assertUtils.isNull(num, "num必须为空");
    } catch (e) {
        log.info("num isNull | ", e);
    }
    try {
        num = null;
        assertUtils.notNull(num, "num必须为空");
    } catch (e) {
        log.info("num notNull | ", e);
    }
    let str: JString | null = " \t ";
    try {
        assertUtils.hasText(str, "str必须要有内容");
    } catch (e) {
        log.info("str hasText | ", e);
    }
    try {
        str = "";
        assertUtils.hasLength(str, "str的长度必须大于0");
    } catch (e) {
        log.info("str hasLength | ", e);
    }
    try {
        str = "abcd";
        assertUtils.doesNotContain(str, "b", "字符串不能包含字符'b'");
    } catch (e) {
        log.info("str doesNotContain b | ", e);
    }
    try {
        assertUtils.notEmpty([], "数组不能为空");
    } catch (e) {
        log.info("notEmpty | ", e);
    }
    try {
        assertUtils.noNullElements([1, 2, null, 5, 6], "数组不能包含null元素");
    } catch (e) {
        log.info("noNullElements | ", e);
    }
    return {success: true};
}

export {
    t01,
}