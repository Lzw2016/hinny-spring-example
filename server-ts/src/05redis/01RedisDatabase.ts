import {HttpRouter} from "@hinny/mvc";
import {redisDatabase} from "@hinny/data-redis";

const t01: HttpRouter = {
    get: ctx => {
        return redisDatabase.allInfos();
    },
};

const t02: HttpRouter = {
    get: ctx => {
        return redisDatabase.allStatus();
    },
};

export {
    t01,
    t02,
};
