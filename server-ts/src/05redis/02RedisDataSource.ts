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

interface RedisValue3 {
    a: JInt;
    b: JDouble;
    c: JBoolean;
    d: JString;
}

const t03: HttpRouter = {
    get: ctx => {
        const key = "string_key_4";
        const hashKeys = Interop.asJList<JString>();
        for (let i = 0; i < 10; i++) {
            const hashKey = `hashKeys-${i}`;
            redis.hPut<JString, RedisValue3>(key, hashKey, {a: i, b: i + 0.003, c: i % 2 === 0, d: `${i}-abc`});
            hashKeys.add(hashKey);
        }
        redis.kExpire(key, 1000 * 60);
        return redis.hMultiGet(key, hashKeys);
    },
}

const t04: HttpRouter = {
    get: ctx => {
        const key = "string_key_5";
        for (let i = 0; i < 10; i++) {
            redis.lRightPush<RedisValue3>(key, {a: i, b: i + 0.003, c: i % 2 === 0, d: `${i}-abc`});
        }
        redis.kExpire(key, 1000 * 60);
        return redis.lRange(key, 0, redis.lSize(key));
    },
}

const t05: HttpRouter = {
    get: ctx => {
        const key = "string_key_6";
        for (let i = 0; i < 10; i++) {
            // TODO Identifier is not executable or instantiable
            redis.sAdd<RedisValue3>(key, {a: i, b: i + 0.003, c: i % 2 === 0, d: `${i}-abc`});
        }
        redis.kExpire(key, 1000 * 60);
        return redis.sMembers(key);
    },
}

const t06: HttpRouter = {
    get: ctx => {
        const key = "string_key_7";
        for (let i = 0; i < 10; i++) {
            redis.zsAdd<RedisValue3>(key, {a: i, b: i + 0.003, c: i % 2 === 0, d: `${i}-abc`}, i);
        }
        redis.kExpire(key, 1000 * 60);
        redis.zsScan<RedisValue3>(key, redis.zsSize(key), "*", item => {
            log.info("Score={} | Value={}", item.getScore(), item.getValue());
        });
        return redis.zsRange(key, 0, redis.zsSize(key));
    },
}

const t07: HttpRouter = {
    get: ctx => {
        const key = "string_key_8";
        const counts = Interop.asJList<JLong>();
        for (let i = 0; i < 10; i++) {
            let count = redis.hyperLogLogAdd<JString>(key, `${i}-abc`);
            counts.add(count);
            count = redis.hyperLogLogAdd<JString>(key, `${i}-abc`);
            counts.add(count);
        }
        redis.kExpire(key, 1000 * 60);
        // TODO hyperLogLog 怎么使用
        return counts;
    },
}

const t08: HttpRouter = {
    get: ctx => {
        const key1 = "string_key_9";
        const res1 = redis.geoAdd<JString>(key1, 0, 0, "aaa");
        log.info("res1={}", res1);
        const res2 = redis.geoAdd<JString>(key1, 30, 30, "bbb");
        log.info("res2={}", res2);
        redis.kExpire(key1, 1000 * 60);
        const distance = redis.geoDistance<JString>(key1, "aaa", "bbb");
        log.info("distance -> Abbreviation = {} | Multiplier = {}", distance.getMetric().getAbbreviation(), distance.getMetric().getMultiplier());
        return distance;
    },
}

export {
    t01,
    t02,
    t03,
    t04,
    t05,
    t06,
    t07,
    t08,
};
