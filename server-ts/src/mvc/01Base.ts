// import { LoggerFactory } from "@hinny/core";
import {mybatisJdbcDatabase} from "@hinny/data-jdbc";
import {HttpRouter} from "@hinny/mvc";

const log = LoggerFactory.getLogger(__filename);
const mybatis = mybatisJdbcDatabase.getDefault();

interface OrderDetailDistinct {
    id: JLong,
    storeNo: JString,
    orderCode: JString,
    storeProdNo: JString,
    erpNo: JString,
    prodName: JString,
    prodSpecification: JString,
    packageUnit: JString,
    manufacture: JString,
    frontPic: JString,
    merchandiseNumber: JBigDecimal,
    outNumber: JBigDecimal,
    noOutNumber: JBigDecimal,
    goodsStatus: JBigDecimal,
    memberPrice: JBigDecimal,
    averagePrice: JBigDecimal,
    createAt: JSqlDate,
    updateAt: JSqlDate,
}

const tmp: HttpRouter = {
    get: ctx => {
        // mybatis.queryList("sql.select-01", ctx.request.getRequestData());
        const entity = mybatis.queryTableEntity<OrderDetailDistinct>(
            "tb_order_detail_distinct",
            {
                id: "1107982724040765441",
                storeProdNo: "1089710052089581571",
            },
        );
        log.info("storeNo -> {}", entity.storeNo);

        return entity;
        // return mybatis.queryList("sql.select-01", {
        //     // storeNo: '1089704947936186369',
        //     orderCodeList: Interop.asJList('hubei0XS00000037', 'hubei0XS00000038', 'hubei0XS00000040'),
        // });
    },

    put: ctx => {
        const array: OrderDetailDistinct[] = [];
        mybatis.query<OrderDetailDistinct>("01Base.select-01", row => {
            log.info("storeNo -> {}", row.getRowData().storeNo)
            array.push(row.getRowData());
        });
        return array;
    }
}

const t01: HttpRouter = {
    get: ctx => {
        const {request} = ctx;
        const data = {
            a: "",
        };
        request.fillAndValidatedFromAny(data, {
            a: {notBlank: true, length: {max: 3}}
        });
        return data;
    },
}

export {
    tmp,
    t01,
}