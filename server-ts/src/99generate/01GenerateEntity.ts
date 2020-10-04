import {HttpRouter, MediaType} from "@hinny/mvc";
import {TableSchema} from "@hinny/meta-data";
import {stringUtils} from "@hinny/core";
import {getDataBaseName, getFieldComment, getFieldName, getFieldType, getTableComment, getTableName, mateDataService, systemSchema} from "./00Common";

/** 生成表名称变量 */
const generateTableName = function (): JString {
    const codeArray: JString[] = [];
    const dataBaseSummaryJList = mateDataService.getDataBaseSummaryList();
    for (let i = 0; i < dataBaseSummaryJList.size(); i++) {
        const dataBaseSummary = dataBaseSummaryJList.get(i);
        if (stringUtils.equalsIgnoreCase(systemSchema.informationSchema, dataBaseSummary.getSchemaName())) {
            continue;
        }
        codeArray.push(`export const ${getDataBaseName(dataBaseSummary)} = {`);
        const tableList = dataBaseSummary.getTableList()
        for (let j = 0; j < tableList.size(); j++) {
            const tableSchema = tableList.get(j);
            codeArray.push(`    /** ${getTableComment(tableSchema)} */`);
            codeArray.push(`    ${getTableName(tableSchema)}: "${tableSchema.getTableName()}",`);
        }
        codeArray.push(`}`);
        codeArray.push("");
    }
    return codeArray.join("\n");
}

/** 获取 TS interface 代码 */
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

/** 生成 interface 代码 */
const generateInterfaceCode = function (): JString {
    const codeArray: JString[] = [];
    const dataBaseSummaryJList = mateDataService.getDataBaseSummaryList();
    for (let i = 0; i < dataBaseSummaryJList.size(); i++) {
        const dataBaseSummary = dataBaseSummaryJList.get(i);
        if (stringUtils.equalsIgnoreCase(systemSchema.informationSchema, dataBaseSummary.getSchemaName())) {
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

// -------------------------------------------------------------------------------------------------------------------------------------------

const t01: HttpRouter = {
    get: ctx => {
        const code = generateTableName();
        const {response} = ctx;
        response.setContentType(MediaType.Plain);
        response.getWriter().print(code);
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
        const {response} = ctx;
        response.setContentType(MediaType.Plain);
        response.getWriter().print(generateTableName());
        response.getWriter().println();
        response.getWriter().print(generateInterfaceCode());
    },
}

export {
    t01,
    t02,
    t03,
}