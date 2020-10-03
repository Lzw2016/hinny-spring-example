import {HttpRouter, MediaType} from "@hinny/mvc";
import {mateDataManage, TableColumn, TableSchema} from "@hinny/meta-data";
import {stringUtils} from "@hinny/core";

const mateDataService = mateDataManage.getDefault();
if (mateDataService.getDataBaseSummaryList().isEmpty()) {
    mateDataService.reload();
}

// 获取表注释
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

// 获取表名称
const getTableName = function (tableSchema: TableSchema) {
    return stringUtils.underlineToCamel(tableSchema.getTableName(), true);
}

// 获取字段注释
const getFieldComment = function (column: TableColumn) {
    return stringUtils.trim(column.getComment());
}

// 获取字段名称
const getFieldName = function (column: TableColumn) {
    return stringUtils.underlineToCamel(column.getColumnName());
}

// 字段类型映射
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

// 获取字段类型
const getFieldType = function (column: TableColumn) {
    return FieldTypeMapper[column.getMappedClass().getName()] ?? column.getMappedClass().getName();
}

// 获取 TS interface 代码
const getInterfaceCode = function (tableSchema: TableSchema): JString {
    const columnList = tableSchema.getColumnList();
    const codeArray: JString[] = [];
    codeArray.push(`/** ${getTableComment(tableSchema)} */`);
    codeArray.push(`export interface ${getTableName(tableSchema)} {`);
    for (let i = 0; i < columnList.size(); i++) {
        const column = columnList.get(i);
        codeArray.push(`    /** ${getFieldComment(column)} */`);
        codeArray.push(`    ${getFieldName(column)}: ${getFieldType(column)};`);
    }
    codeArray.push(`}`);
    return codeArray.join("\n");
}

// 生成 interface 代码
const generateInterfaceCode = function (): JString {
    const codeArray: JString[] = [];
    const dataBaseSummaryJList = mateDataService.getDataBaseSummaryList();
    for (let i = 0; i < dataBaseSummaryJList.size(); i++) {
        const dataBaseSummary = dataBaseSummaryJList.get(i);
        if (stringUtils.equals("information_schema", dataBaseSummary.getSchemaName())) {
            continue;
        }
        const tableList = dataBaseSummary.getTableList()
        for (let j = 0; j < tableList.size(); j++) {
            const tableSchema = tableList.get(j);
            const code = getInterfaceCode(tableSchema);
            codeArray.push(stringUtils.trim(code));
            codeArray.push("");
        }
    }
    return codeArray.join("\n");
}

// 生成表名称变量
const generateTableName = function (): JString {
    const codeArray: JString[] = [];
    const dataBaseSummaryJList = mateDataService.getDataBaseSummaryList();
    for (let i = 0; i < dataBaseSummaryJList.size(); i++) {
        const dataBaseSummary = dataBaseSummaryJList.get(i);
        if (stringUtils.equals("information_schema", dataBaseSummary.getSchemaName())) {
            continue;
        }
        const dbName = dataBaseSummary.getSchemaName().replace("-", "_");
        codeArray.push(`export const ${stringUtils.underlineToCamel(dbName)} = {`);
        const tableList = dataBaseSummary.getTableList()
        for (let j = 0; j < tableList.size(); j++) {
            const tableSchema = tableList.get(j);
            codeArray.push(`    /** ${getTableComment(tableSchema)} */`);
            codeArray.push(`    ${stringUtils.underlineToCamel(tableSchema.getTableName())}: "${tableSchema.getTableName()}",`);
        }
        codeArray.push(`}`);
        codeArray.push("");
    }
    return codeArray.join("\n");
}

// 获取表文档
const getTableDoc = function (tableSchema: TableSchema): JString {
    const columnList = tableSchema.getColumnList();
    const codeArray: JString[] = [];
    codeArray.push(`| **序号** | **名称** | **类型** | **非空** | **唯一** | **默认值** | **其他** | **说明** |`);
    codeArray.push(`| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |`);
    for (let i = 0; i < columnList.size(); i++) {
        const column = columnList.get(i);
        const row = `| ${(i + 1)} `
            + `| ${column.getColumnName()} `
            + `| ${column.getDataType()}${column.getWidth()} `
            + `| ${column.getNotNull() ? 'not_null' : ''} `
            + `| ${column.getPartOfUniqueIndex() ? 'unique' : ''} `
            + `| ${column.getDefaultValue()} `
            + `| ${column.getPartOfPrimaryKey() ? '`primary_key`' : ''} ${column.getAutoIncrement() ? '`auto_increment`' : ''} ${column.getPartOfIndex() ? '`index`' : ''} `
            + `| ${column.getComment()} |`;
        codeArray.push(row);
    }
    return codeArray.join("\n");
}

// 生成 Markdown 文档
const generateMarkdownDoc = function (): JString {
    const codeArray: JString[] = [];
    const dataBaseSummaryJList = mateDataService.getDataBaseSummaryList();
    for (let i = 0; i < dataBaseSummaryJList.size(); i++) {
        const dataBaseSummary = dataBaseSummaryJList.get(i);
        if (stringUtils.equals("information_schema", dataBaseSummary.getSchemaName())) {
            continue;
        }
        const tableList = dataBaseSummary.getTableList()
        codeArray.push(`# ${dataBaseSummary.getSchemaName()} (表数量:${tableList.size()})`);
        for (let j = 0; j < tableList.size(); j++) {
            const tableSchema = tableList.get(j);
            codeArray.push(`### ${(j+1)}.${tableSchema.getTableName()}(${getTableComment(tableSchema)})`);
            const code = getTableDoc(tableSchema);
            codeArray.push(code);
            codeArray.push('');
        }
        codeArray.push('------------\n');
    }
    return codeArray.join("\n");
}

const t01: HttpRouter = {
    get: ctx => {
        return mateDataService.getTableSchema("clever-template", "hyb_orders");
    },
}

const t02: HttpRouter = {
    get: ctx => {
        const code = generateInterfaceCode();
        const {response} = ctx;
        response.setContentType(MediaType.Plain);
        response.getWriter().print(code);
    },
}

const t03: HttpRouter = {
    get: ctx => {
        const code = generateTableName();
        const {response} = ctx;
        response.setContentType(MediaType.Plain);
        response.getWriter().print(code);
    },
}

const t04: HttpRouter = {
    get: ctx => {
        const code = generateMarkdownDoc();
        const {response} = ctx;
        response.setContentType(MediaType.Plain);
        response.getWriter().print(code);
    },
}

export {
    t01,
    t02,
    t03,
    t04,
}
