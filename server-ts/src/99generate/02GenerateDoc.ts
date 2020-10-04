import {TableSchema} from "@hinny/meta-data";
import {stringUtils} from "@hinny/core";
import {getTableComment, mateDataService, systemSchema} from "./00Common";
import {HttpRouter, MediaType} from "@hinny/mvc";

/** 获取表文档 */
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

/** 生成 Markdown 文档 */
const generateMarkdownDoc = function (): JString {
    const codeArray: JString[] = [];
    const dataBaseSummaryJList = mateDataService.getDataBaseSummaryList();
    for (let i = 0; i < dataBaseSummaryJList.size(); i++) {
        const dataBaseSummary = dataBaseSummaryJList.get(i);
        if (stringUtils.equals(systemSchema.informationSchema, dataBaseSummary.getSchemaName())) {
            continue;
        }
        const tableList = dataBaseSummary.getTableList()
        codeArray.push(`# ${dataBaseSummary.getSchemaName()} (表数量:${tableList.size()})`);
        for (let j = 0; j < tableList.size(); j++) {
            const tableSchema = tableList.get(j);
            codeArray.push(`### ${(j + 1)}.${tableSchema.getTableName()}(${getTableComment(tableSchema)})`);
            const code = getTableDoc(tableSchema);
            codeArray.push(code);
            codeArray.push('');
        }
        codeArray.push('------------\n');
    }
    return codeArray.join("\n");
}

// -------------------------------------------------------------------------------------------------------------------------------------------

const t01: HttpRouter = {
    get: ctx => {
        const code = generateMarkdownDoc();
        const {response} = ctx;
        response.setContentType(MediaType.Plain);
        response.getWriter().print(code);
    },
}

export {
    t01,
}