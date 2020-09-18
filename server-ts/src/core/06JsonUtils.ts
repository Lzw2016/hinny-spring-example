import {commonUtils, jsonUtils} from '@hinny/core';

const log = LoggerFactory.getLogger(__filename);

const map = {
    a: "aaa",
    b: "bbb",
    c: 333,
    d: "ccc",
    e: false,
    f: Interop.asJDate(new Date()),
}
const xml = `
    <apps>
        <app>
            <id>1</id>
            <name>Google Maps</name> 
            <virsion>1.0</virsion> 
        </app> 
        <app> 
            <id>2</id> 
            <name>Chrome</name> 
          <version>2.1</version> 
       </app> 
        <app> 
          <id>3</id> 
           <name>Google Play</name> 
          <version>2.3</version> 
        </app> 
    </apps>
    `;

// Json 序列化反序列化操作
const t01 = function () {
    log.info("map       -->{}", map);
    let json = jsonUtils.toJson(map);
    log.info("toJson    -->{}", json);
    log.info("toMap     -->{}", jsonUtils.toMap(json).get("a"));

    // 使用原生JS方法得到json (不建议)
    json = JSON.stringify(map);
    log.info("toJson    -->{}", json);
    log.info("parse     -->{} | f={} | f type={}", JSON.parse(json), JSON.parse(json).f, commonUtils.getClassName(JSON.parse(json).f));
    return {success: true};
}

// 其他操作
const t02 = function () {
    log.info("toJsonP   -->{}", jsonUtils.toJsonP("jsonp", map));
    log.info("update    -->{}", jsonUtils.update("{a:1,b:2}", map));
    log.info("map       -->{}", map);
    const json = jsonUtils.xmlToJson(xml)
    log.info("xmlToJson -->{}", json);
    log.info("jsonToXml -->{}", jsonUtils.jsonToXml(json));
    return {success: true};
}

export {
    t01,
    t02,
}