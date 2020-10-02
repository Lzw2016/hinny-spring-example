import {HttpRouter, MediaType} from "@hinny/mvc";
import {mateDataManage, TableColumn, TableSchema} from "@hinny/meta-data";
import {stringUtils} from "@hinny/core";

const mateDataService = mateDataManage.getDefault();
if (mateDataService.getDataBaseSummaryList().isEmpty()) {
    mateDataService.reload();
}

const getInterfaceName = function (tableSchema: TableSchema) {
    return stringUtils.underlineToCamel(tableSchema.getTableName(), true);
}

const getFieldComment = function (column: TableColumn) {
    return stringUtils.trim(column.getComment());
}

const getFieldName = function (column: TableColumn) {
    return stringUtils.underlineToCamel(column.getColumnName());
}

const FieldTypeMapper: { [name in JString]: JString } = {
    "java.lang.Byte": "JByte",
    "java.lang.Short": "JShort",
    "java.lang.Integer": "JInt",
    "java.lang.Long": "JLong",
    "java.lang.Float": "JFloat",
    "java.lang.Double": "JDouble",
    "java.lang.Boolean": "JBoolean",
    "java.lang.Char": "JChar",
    "java.lang.String": "JString",
    "java.math.BigDecimal": "JBigDecimal",
    "java.math.BigInteger": "JBigInteger",
    "java.util.Date": "JSqlDate",
    "java.sql.Date": "JSqlDate",
    "java.sql.Time": "JSqlTime",
    "java.sql.Timestamp": "JSqlTimestamp",
}

const getFieldType = function (column: TableColumn) {
    return FieldTypeMapper[column.getMappedClass().getName()] ?? column.getMappedClass().getName();
}

const getInterfaceCode = function (tableSchema: TableSchema): JString {
    const columnList = tableSchema.getColumnList();
    const codeArray: JString[] = [];
    codeArray.push(`interface ${getInterfaceName(tableSchema)} {`);
    for (let i = 0; i < columnList.size(); i++) {
        const column = columnList.get(i);
        codeArray.push(`    /** ${getFieldComment(column)} */`);
        codeArray.push(`    ${getFieldName(column)}: ${getFieldType(column)};`);
    }
    codeArray.push(`}`);
    return codeArray.join("\n");
}

const t01: HttpRouter = {
    get: ctx => {
        return mateDataService.getTableSchema("clever-template", "hyb_orders");
    },
}

const t02: HttpRouter = {
    get: ctx => {
        const codeArray: JString[] = [];
        const dataBaseSummaryJList = mateDataService.getDataBaseSummaryList();
        for (let i = 0; i < dataBaseSummaryJList.size(); i++) {
            const dataBaseSummary = dataBaseSummaryJList.get(i);
            const tableList = dataBaseSummary.getTableList()
            for (let j = 0; j < tableList.size(); j++) {
                const tableSchema = tableList.get(j);
                const code = getInterfaceCode(tableSchema);
                codeArray.push(stringUtils.trim(code));
                codeArray.push("");
            }
        }
        const {response} = ctx;
        response.setContentType(MediaType.Plain);
        response.getWriter().print(codeArray.join("\n"));
    },
}

export {
    t01,
    t02,
}
