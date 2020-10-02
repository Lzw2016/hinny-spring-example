import {HttpRouter, MediaType} from "@hinny/mvc";
import {mateDataManage} from "@hinny/meta-data";
import {TableSchema} from "@hinny/meta-data/dist/model/TableSchema";
import {stringUtils} from "@hinny/core";

const mateDataService = mateDataManage.getDefault();
if (mateDataService.getDataBaseSummaryList().isEmpty()) {
    mateDataService.reload();
}

const getInterfaceCode = function (tableSchema: TableSchema): JString {
    const columnList = tableSchema.getColumnList();
    const codeArray: JString[] = [];
    codeArray.push(`interface ${tableSchema.getTableName()} {`);
    for (let i = 0; i < columnList.size(); i++) {
        const column = columnList.get(i);
        codeArray.push(`    /** ${column.getComment()} */`);
        codeArray.push(`    ${column.getColumnName()}: ${column.getMappedClass().getSimpleName()};`);
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
                codeArray.push("\n\n");
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
