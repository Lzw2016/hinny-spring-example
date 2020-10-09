import {mateDataManage, TableColumn, TableSchema} from "@hinny/meta-data";
import {stringUtils} from "@hinny/core";
import {DataBaseSummary} from "@hinny/meta-data/model/DataBaseSummary";

// 初始化数据库元数据
const mateDataService = mateDataManage.getDefault();
if (mateDataService.getDataBaseSummaryList().isEmpty()) {
    mateDataService.reload();
}

const systemSchema = {
    informationSchema: "information_schema",
    mysql: "mysql",
};

/** 获取数据库名称 */
const getDataBaseName = function (dataBaseSummary: DataBaseSummary): JString {
    const dbName = dataBaseSummary.getSchemaName().replace("-", "_");
    return stringUtils.underlineToCamel(stringUtils.lowerCase(dbName));
}

/** 获取表注释 */
const getTableComment = function (tableSchema: TableSchema) {
    let comment = stringUtils.trim(tableSchema.getDescription());
    if (stringUtils.isBlank(comment)) {
        comment = tableSchema.getAttributes().get("TABLE_COMMENT");
    }
    if (stringUtils.isBlank(comment)) {
        comment = "";
    }
    return comment;
}

/** 获取表名称 */
const getTableName = function (tableSchema: TableSchema) {
    return stringUtils.underlineToCamel(stringUtils.lowerCase(tableSchema.getTableName()), true);
}

/** 获取字段注释 */
const getFieldComment = function (column: TableColumn) {
    return stringUtils.trim(column.getComment());
}

/** 获取字段名称 */
const getFieldName = function (column: TableColumn) {
    return stringUtils.underlineToCamel(stringUtils.lowerCase(column.getColumnName()));
}

/** 字段类型映射 */
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

/** 获取字段类型 */
const getFieldType = function (column: TableColumn) {
    return FieldTypeMapper[column.getMappedClass().getName()] ?? column.getMappedClass().getName();
}

export {
    mateDataService,
    systemSchema,
    getDataBaseName,
    getTableComment,
    getTableName,
    getFieldComment,
    getFieldName,
    getFieldType,
}