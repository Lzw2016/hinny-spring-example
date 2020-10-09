import {jdbcDatabase, mybatisJdbcDatabase} from "@hinny/data-jdbc";
import {HttpRouter} from "@hinny/mvc";
import {BuiltinFormats, ExcelDataType, excelUtils, IndexedColors} from "@hinny/core";

const jdbc = jdbcDatabase.getDefault();
const mybatis = mybatisJdbcDatabase.getDefault();

// 定义导出实体
interface ExcelEntity {
    /** 订单编号 */
    orderCode: JString;
    /** 收货人姓名 */
    shipName: JString;
    /** 地址 */
    shipAddr: JString;
    /** 手机号 */
    shipMobile: JString;
    /** 支付金额 */
    payAmount: JBigDecimal;
    /** 运费 */
    freightAmount: JBigDecimal;
    /** 订单总额 */
    orderAmount: JBigDecimal;
}

// Excel导出
const t01: HttpRouter = {
    get: ctx => {
        const {request, response} = ctx;
        const sql = "select * from hyb_orders limit :limit";
        const listData = jdbc.queryList(sql, {
            limit: request.getParameter("limit") ?? 60,
        });
        excelUtils.write<ExcelEntity>({
            request: request.originalRequest(),
            response: response.originalResponse(),
            fileName: "订单数据导出",
            sheetName: "订单数据",
            columns: {
                orderCode: {column: "订单编号", columnWidth: 25},
                shipName: {column: "收货人姓名", columnWidth: 15},
                shipAddr: {column: "收货地址", columnWidth: 65},
                shipMobile: {column: "手机号", columnWidth: 15},
                payAmount: {column: "支付金额", columnWidth: 12, contentStyle: {dataFormat: BuiltinFormats.Fmt_7}},
                freightAmount: {column: "运费", columnWidth: 10, contentStyle: {dataFormat: BuiltinFormats.Fmt_7}},
                orderAmount: {column: "订单总额", columnWidth: 12, contentStyle: {dataFormat: BuiltinFormats.Fmt_8}, contentFontStyle: {color: IndexedColors.RED}},
            },
        }, listData);
    }
}

// Excel导入
const t02: HttpRouter = {
    get: ctx => {
        const {request} = ctx;
        const excelData = excelUtils.read<ExcelEntity>({
            request: request.originalRequest(),
            columns: {
                orderCode: {column: "订单编号", dataType: ExcelDataType.JString},
                shipName: {column: "收货人姓名", dataType: ExcelDataType.JString},
                shipAddr: {column: "收货地址", dataType: ExcelDataType.JString},
                shipMobile: {column: "手机号", dataType: ExcelDataType.JString},
                payAmount: {column: "支付金额", dataType: ExcelDataType.JBigDecimal},
                freightAmount: {column: "运费", dataType: ExcelDataType.JBigDecimal},
                orderAmount: {column: "订单总额", dataType: ExcelDataType.JBigDecimal},
            }
        });
        return excelData.getFirstExcelData();
    },
}

// Excel导出
const t03: HttpRouter = {
    get: ctx => {
        const {request, response} = ctx;
        const listData = mybatis.queryList<ExcelEntity>("mvc.04ExcelImportExport.t03", {
            limit: request.getParameter("limit") ?? 60,
        });
        excelUtils.write({
            request: request.originalRequest(),
            response: response.originalResponse(),
            fileName: "订单数据导出",
            sheetName: "订单数据",
            columns: {
                orderCode: {column: "订单编号", columnWidth: 25},
                shipName: {column: "收货人姓名", columnWidth: 15},
                shipAddr: {column: "收货地址", columnWidth: 65},
                shipMobile: {column: "手机号", columnWidth: 15},
                payAmount: {column: "支付金额", columnWidth: 12, contentStyle: {dataFormat: BuiltinFormats.Fmt_7}},
                freightAmount: {column: "运费", columnWidth: 10, contentStyle: {dataFormat: BuiltinFormats.Fmt_7}},
                orderAmount: {column: "订单总额", columnWidth: 12, contentStyle: {dataFormat: BuiltinFormats.Fmt_8}, contentFontStyle: {color: IndexedColors.RED}},
            },
        }, listData);
    }
}

export {
    t01,
    t02,
    t03,
}

