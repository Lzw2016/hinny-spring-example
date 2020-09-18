const log = LoggerFactory.getLogger(__filename);

// 基础数据类型
const t01 = function () {
    log.info("# Byte         -> {}", Interop.asJByte(1));
    log.info("# Short        -> {}", Interop.asJShort(123));
    log.info("# Int          -> {}", Interop.asJInt(123456));
    log.info("# Long         -> {}", Interop.asJLong(1234567890));
    log.info("# Double       -> {}", Interop.asJDouble(123456.789));
    log.info("# Boolean      -> {}", Interop.asJBoolean(false));
    log.info("# Char         -> {}", Interop.asJChar('a'));
    log.info("# String       -> {}", Interop.asJString('abc123456'));
    log.info("# Date         -> {}", Interop.asJDate('2020-07-31 22:02:12'));
    log.info("# BigDecimal   -> {}", Interop.asJBigInteger("1234567890123456789012345678901234567890"));
    log.info("# BigDecimal   -> {}", Interop.asJBigDecimal('1354741344987654323456765434567564564568989.564948989745189789454894894864'));
    return {success: true};
}

// Java集合类型
const t02 = function () {
    // 创建Java各种集合
    log.info("# List  -> {}", Interop.asJList("111", "222", "333"));
    log.info("# List  -> {}", Interop.asJList(["111", "222", "333"]));
    log.info("# List  -> {}", Interop.asJList([111, 222, 333]));
    log.info("# Set   -> {}", Interop.asJSet("111", "222", "333", "333"));
    log.info("# Set   -> {}", Interop.asJSet([111, 222, 333, 333], [444, 555, 666, 777]));
    log.info("# Map   -> {}", Interop.asJMap({a: "aaa", b: 123, c: false, d: 12.87}));
    // 操作集合API(操作方式与Java基本一致)
    const list = Interop.asJList("aaa");
    list.add("bbb");
    list.add("ccc");
    log.info("size={} | isEmpty={} | list={}", list.size(), list.isEmpty(), list);
    // 遍历集合
    for (let i = 0; i < list.size(); i++) {
        const item = list.get(i);
        log.info("{}# -> {}", i, item);
    }
    return {success: true};
}

// Date 对象
const t03 = function () {
    // Java 时间对象
    const jDate_1 = Interop.asJDate("2020-08-09 14:29:02.666"); // 通过字符串创建时间对象
    const jDate_2 = Interop.asJDate(new Date()); // 通过原生JS Date创建时间对象
    const jDate_3 = Interop.asJDate(1600072445679); // 通过时间搓创建时间对象
    log.info("jDate_1={} | jDate_2={} | jDate_3={}", jDate_1, jDate_2, jDate_3);
    // 调用Java原生时间对象API
    log.info("after      -> {}", jDate_1.after(jDate_2));
    log.info("before     -> {}", jDate_1.before(jDate_2));
    log.info("getTime    -> {}", jDate_1.getTime());
    log.info("getYear    -> {}", jDate_1.getYear() + 1900);
    log.info("getMonth   -> {}", jDate_1.getMonth());
    log.info("getDate    -> {}", jDate_1.getDate());
    log.info("getHours   -> {}", jDate_1.getHours());
    log.info("getMinutes -> {}", jDate_1.getMinutes());
    log.info("getSeconds -> {}", jDate_1.getSeconds());
    log.info("getDay     -> {}", jDate_1.getDay());
    log.info("compareTo  -> {}", jDate_1.compareTo(jDate_2));

    // JS 原生时间对象(不建议)
    const jDate_4 = new Date()
    log.info("jDate_4    -> {}", Interop.toJString(jDate_4));
    log.info("getFullYear-> {}", jDate_4.getFullYear());
    log.info("getTime    -> {}", jDate_4.getTime());
    return {success: true};
}

export {
    t01,
    t02,
    t03,
}
