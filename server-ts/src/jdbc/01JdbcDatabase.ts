import {jdbcDatabase} from "@hinny/data-jdbc";

const log = LoggerFactory.getLogger(__filename);

// 管理数据源
const t01 = function () {
    // 获取所有的数据源名称
    const allNames = jdbcDatabase.allNames();
    log.info("allNames --> {}", allNames);

    // 获取数据源信息
    const iterator = allNames.iterator();
    while (iterator.hasNext()) {
        const name = iterator.next();
        log.info("[{}] getDataSource--> {}", name, jdbcDatabase.getDataSource(name)?.getClass().getName());
        log.info("[{}] hasDataSource--> {}", name, jdbcDatabase.hasDataSource(name));
        log.info("[{}]       getInfo--> {}", name, jdbcDatabase.getInfo(name));
        log.info("[{}]     getStatus--> {}", name, jdbcDatabase.getStatus(name));
    }
    return {success: true};
}

export {
    t01,
}