// log4j 对象
const t01 = function () {
    const log = LoggerFactory.getLogger("my_logger");
    // 输出5种不同的日志级别
    log.trace("trace 日志");
    log.debug("debug 日志");
    log.info("info 日志");
    log.warn("warn 日志");
    log.error("error 日志");
    // 输出变量 (日志对象的使用与 log4j 相同)
    log.info("10 * 10 + 50 = {} | 150/3 = {} | 字符串变量: {}", (10 * 10 + 50), 150 / 3, "123aaa");
    // 使用当前文件名作为Logger的名称
    const log2 = LoggerFactory.getLogger(__filename);
    log2.info("当前文件名：{} | 当前文件夹名称：{}", __filename, __dirname);
    return {success: true};
}

// 使用原生 console (不建议)
const t02 = function () {
    // 原生 console 对象的使用与 nodejs 一致
    console.log("输出日志。。。。。。");
    console.log("10 * 10 + 50 = ", (10 * 10 + 50), " | 150/3 = ", 150 / 3, " | 字符串变量: ", "123aaa");
    // 原生 console 对象的计时功能
    let sum = 0
    console.time("flag1");
    for (let i = 0; i < 1000; i++) {
        sum += i;
    }
    console.timeLog("flag1", "计时1 | sum = ", sum);
    for (let i = 0; i < 10000; i++) {
        sum += i;
    }
    console.timeLog("flag1", "计时2 | sum = ", sum);
    console.timeEnd("flag1")
    return {success: true};
}

export {
    t01,
    t02,
}