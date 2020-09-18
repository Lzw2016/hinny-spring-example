import {jdbcDatabase} from "@hinny/data-jdbc";
import {commonUtils} from "@hinny/core";

const log = LoggerFactory.getLogger(module.filename);
const jdbc = jdbcDatabase.getDefault();

// 数据源状态
const t01 = function () {
    log.info("getDbType --> {}", jdbc.getDbType());
    log.info("getInfo   --> {}", jdbc.getInfo());
    log.info("getStatus --> {}", jdbc.getStatus());
    return {success: true};
}

// 简单CURD
const t02 = function () {
    const sql_1 = 'select * from hyb_orders_items limit 3';
    const sql_2 = 'select * from hyb_orders_items where order_id=:orderId';
    // 查询
    log.info("queryList --> {}", [jdbc.queryList(sql_1)])
    log.info("queryList --> {}", [jdbc.queryList(sql_2, {orderId: Interop.asJLong("1073511774536904706")})])
    // 更新
    const sql_3 = 'update hyb_orders_items set update_at=:updateAt where order_id=:orderId and order_item_id=:orderItemId';
    log.info("update    --> {}", jdbc.update(
        sql_3,
        {
            updateAt: commonUtils.now(),
            orderId: Interop.asJLong("1073511774536904706"),
            orderItemId: Interop.asJLong("1073522178110394370"),
        }
    ));
    // 删除
    const sql_4 = 'delete from hyb_orders_items where order_id=:orderId and update_at>:updateAt';
    log.info("update(del)--> {}", jdbc.update(
        sql_4,
        {
            updateAt: commonUtils.now(),
            orderId: Interop.asJLong("1073511774536904706"),
        }
    ));
    return {success: true};
}

// 单表操作CURD
const t03 = function () {
    const tableName = 'hyb_orders_items';
    // 查询
    const list = jdbc.queryTableList(tableName, {orderId: Interop.asJLong("1073511774536904706")});
    log.info("queryTableList  --> {}", [list]);
    const row = jdbc.queryTableMap(
        tableName,
        {
            orderId: Interop.asJLong("1073511774536904706"),
            orderItemId: Interop.asJLong("1073522178110394370"),
        }
    );
    log.info("queryTableMap   --> {}", row)
    // 更新
    let count = jdbc.updateTable(
        tableName,
        {
            updateAt: commonUtils.now(),
        },
        {
            orderId: Interop.asJLong("1073511774536904706"),
            orderItemId: Interop.asJLong("1073522178110394370"),
        }
    );
    log.info("updateTable   --> {}", count);
    // 删除
    count = jdbc.deleteTable(
        tableName,
        {
            orderId: Interop.asJLong("1073511774536904706"),
            orderItemId: Interop.asJLong("1073522178110394370"),
            updateAt: commonUtils.now(),
        }
    );
    log.info("deleteTable   --> {}", count);
    return {success: true};
}

// 其他操作
const t04 = function () {
    // 使用游标读取数据
    const sql_1 = 'select * from hyb_orders_items limit :limit';
    jdbc.query(sql_1, {limit: 100}, row => {
        log.info("{}# --> {}", row.getRowCount(), row.getRowData());
    });
    // 批量更新
    const sql_2 = 'update hyb_orders_items set update_at=:updateAt where order_item_id=:orderItemId';
    const counts = jdbc.batchUpdate(sql_2, [
        {orderItemId: Interop.asJLong("1073522178110394370"), updateAt: commonUtils.now()},
        {orderItemId: Interop.asJLong("1"), updateAt: commonUtils.now()},
        {orderItemId: Interop.asJLong("2"), updateAt: commonUtils.now()},
        {orderItemId: Interop.asJLong("3"), updateAt: commonUtils.now()},
    ]);
    log.info("batchUpdate   --> {}", [counts]);
    // 开启事务(支持事务嵌套)
    jdbc.beginTX(status => {
        log.info("isRollbackOnly -> {}", status.isRollbackOnly());
        log.info("update --> {}", jdbc.update("update hyb_orders_items set update_at=now() where order_item_id=1073522178110394370"));
    });
    jdbc.beginReadOnlyTX(status => {
        log.info("isRollbackOnly -> {}", status.isRollbackOnly());
        log.info("queryCount --> {}", jdbc.queryCount("select * from hyb_orders_items"));
    });
    return {success: true};
}

export {
    t01,
    t02,
    t03,
    t04,
}