import {HttpRouter} from "@hinny/mvc";
import {redisDatabase} from "@hinny/data-redis";
import {commonUtils} from "@hinny/core";

const redis = redisDatabase.getDefault();
const log = LoggerFactory.getLogger(__filename);

// k***()           Key 操作
// v***()           String 操作
// h***()           Hash 操作
// l***()           List 操作
// s***()           Set 操作
// zs***()          Sorted Set 操作
// hyperLogLog***() HyperLogLog  操作
// geo***()         Geo 操作

interface RedisValue {
    a: JInt;
    b: JDouble;
    c: JBoolean;
    d: JString;
    e: JBigDecimal;
    f: JDate;
}

const t01: HttpRouter = {
    get: ctx => {
        redis.vSet<JString>("string_key_0", "123abc", 1000 * 60);
        redis.vSet<RedisValue>(
            "string_key_2",
            {a: 1, b: 2.002, c: true, d: "abcde", e: Interop.asJBigDecimal("123.456"), f: commonUtils.now()},
            1000 * 60
        );
        const a = redis.vGet<JString>("string_key_0");
        const b = redis.vGet<RedisValue>("string_key_2");
        const c = {a: b.a, b: b.b, c: b.c, d: b.d, e: b.e, f: b.f};
        log.info("ClassName -> {}", commonUtils.getClassName(b));
        const iterator = (b as any as JMap<JString, any>).entrySet().iterator();
        while (iterator.hasNext()) {
            const entry = iterator.next();
            log.info(
                "key -> {} | value -> {} | value ClassName -> {}",
                entry.getKey(),
                entry.getValue(),
                commonUtils.getClassName(entry.getValue())
            );
        }
        return {a, b, c};
    },
};

interface RedisValue2 {
    a: number;
    b: boolean;
    c: string;
    d: Date;

    [key: string]: any;
}

const t02: HttpRouter = {
    get: ctx => {
        redis.vSet<string>(
            "string_key_3",
            JSON.stringify({a: 1, b: true, c: "abc", d: new Date()}),
            1000 * 60
        );
        const a = redis.vGet<string>("string_key_3");
        const b = JSON.parse(a) as RedisValue2;
        const c = {a: b.a, b: b.b, c: b.c, d: b.d};
        for (let key in b) {
            // noinspection JSUnfilteredForInLoop
            const value = b[key];
            // noinspection JSUnfilteredForInLoop
            log.info("key -> {} | value -> {} | typeof value -> {}", key, value, typeof value);
        }
        return {a, b, c};
    },
};

export {
    t01,
    t02,
};
