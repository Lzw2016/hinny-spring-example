import {mybatisJdbcDatabase} from "@hinny/data-jdbc";
import {HttpRouter} from "@hinny/mvc";

const mybatis = mybatisJdbcDatabase.getDefault();

// 简单查询
const t01: HttpRouter = {
    get: ctx => {
        const paramsMap = ctx.request.getRequestData();
        return mybatis.queryList("mvc.05CURD.t01", paramsMap)
    },
}

// 单表查询
const t02: HttpRouter = {
    get: ctx => {
        const paramsMap = ctx.request.getRequestData();
        paramsMap.orderId = Interop.asJLong("1073511774536904706");
        return mybatis.queryTableList("hyb_orders_items", paramsMap);
    },
}

// 排序查询
const t03: HttpRouter = {
    get: ctx => {
        const paramsMap = ctx.request.getRequestData();
        const queryBySort = ctx.request.getQueryBySort();
        queryBySort.fieldsMapping = {
            status: "status",
            deliveryTime: "delivery_time",
            orderAmount: "order_amount",
        }
        return mybatis.queryBySort("mvc.05CURD.t01", queryBySort, paramsMap);
    },
}

// 分页排序查询
const t04: HttpRouter = {
    get: ctx => {
        const paramsMap = ctx.request.getRequestData();
        const queryByPage = ctx.request.getQueryByPage();
        queryByPage.fieldsMapping = {
            status: "status",
            deliveryTime: "delivery_time",
            orderAmount: "order_amount",
        }
        return mybatis.queryByPage("mvc.05CURD.t04", queryByPage, paramsMap);
    }
};

export {
    t01,
    t02,
    t03,
    t04,
}