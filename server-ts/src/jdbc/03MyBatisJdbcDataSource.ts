import {mybatisJdbcDatabase} from "@hinny/data-jdbc";

const log = LoggerFactory.getLogger(__filename);
const mybatis = mybatisJdbcDatabase.getDefault();

// 使用MyBatis规范的Mapper.xml文件创建动态SQL语句
const t01 = function () {
    // 直接查询
    let listData = mybatis.queryList("jdbc.03MyBatisJdbcDataSource.t01")
    log.info("listData.get(0) --> {}", listData.get(0));
    // 使用参数
    listData = mybatis.queryList("jdbc.03MyBatisJdbcDataSource.t01", {
        payStatus: 1,
        orderCodeList: Interop.asJList('20200916111329489', '20200916102812130'),
    });
    log.info("listData.get(0) --> {}", listData.get(0));
    return {success: true};
}

// 实体类概念
interface Orders {
    // 订单ID
    orderId: JLong;
    // 订单编号
    orderCode: JString;
    // 订单状态(-3=待审核 / -2=待支付 / -1=待处理 / 0=已接单 / 1=已出库 / 2=已签收 / 3=已驳回 4=拒收 5=已取消)
    status: JInt;
    // 会员id
    customId: JLong;
    // 收货人姓名
    shipName: JString;
    // 收货地址
    shipAddr: JString;
    // 支付金额
    payAmount: JBigDecimal;
}

// 使用实体类
const t02 = function () {
    const listData = mybatis.queryList<Orders>("jdbc.03MyBatisJdbcDataSource.t01", {
        payStatus: 1,
        orderCodeList: Interop.asJList('20200916111329489', '20200916102812130'),
    });
    log.info("payAmount --> {} | type={}", listData.get(0).payAmount, listData.get(0).payAmount.getClass());
    return {success: true};
}

export {
    t01,
    t02,
}
