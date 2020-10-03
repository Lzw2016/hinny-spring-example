import {stringUtils} from '@hinny/core';

const log = LoggerFactory.getLogger(__filename);

// 常规字符串操作
const t01 = function () {
    log.info("isNotBlank --> {} | {} | {}", stringUtils.isNotBlank(""), stringUtils.isNotBlank(" \t "), stringUtils.isNotBlank(" a "));
    log.info("replace    --> {}", stringUtils.replace("aabbcc|aabbcc", "bb", "哈哈"));
    log.info("split      --> {}", [stringUtils.split("aabbcc|ddeeff", "|")]);
    log.info("contains   --> {} | {}", stringUtils.contains("aabbcc|ddeeff", 'deef'), stringUtils.contains("aabbcc|ddeeff", '123'));
    log.info("indexOf    --> {}", stringUtils.indexOf("abcdefg", "de"));
    log.info("upperCase  --> {} ", stringUtils.upperCase("abc"));
    log.info("repeat     --> {} ", stringUtils.repeat("a", 10));
    log.info("trim       --> {}| ", stringUtils.trim("  abc \t"));
    return {success: true};
}

// 其他操作
const t02 = function () {
    // 删除html标签
    const html = `
    <html lang="zh">
        <head>
            <meta charset="gbk">
            <title>彼岸桌面壁纸</title>
            <meta name="keywords" content="1080桌面壁纸">
            <meta http-equiv="x-ua-compatible" content="ie=7">
            <script src="//hm.baidu.com/hm.js?14b14198b6e26157b7eba06b390ab763"></script>
        </head>
        <body>
            <div class="head">
                <a href="http://www.netbian.com/" class="logo" title="壁纸">壁纸</a>
            </div>
        </body>
    </html>
    `;
    log.info("delHTMLTag           -->{}", stringUtils.delHTMLTag(html));
    // 其他操作
    const str = "abbreviate";
    log.info("objectToString       -->{}", stringUtils.objectToString(123, ""));
    log.info("isAnyEmpty           -->{}", stringUtils.isAnyEmpty([str, '']));
    log.info("truncate             -->{}", stringUtils.truncate(stringUtils.trim("   str   123123165    "), 6));
    log.info("truncate             -->{}", stringUtils.truncate("   str   123123165    ", 9, 4));
    log.info("strip                -->{}", stringUtils.strip("   str   123123165    "));
    log.info("strip                -->{}", stringUtils.strip("   str   123123165    ", " str"));
    log.info("stripAll             -->{}", [stringUtils.stripAll(["   str   123123165    ", "    str   "])]);
    log.info("stripAll             -->{}", [stringUtils.stripAll(["   str   123123165    ", "    str   "], " str")]);
    log.info("equals               -->{}", stringUtils.equals("str", "st4"));
    log.info("compare              -->{}", stringUtils.compare("str", "str123"));
    log.info("indexOf              -->{}", stringUtils.indexOf("sstrfjkdgvnkldstr", "str"));
    log.info("lastIndexOf          -->{}", stringUtils.lastIndexOf("sstrfjkdgvnkldstr", "str"));
    log.info("contains             -->{}", stringUtils.contains("sstrfjkdgvnkldstr", "str"));
    log.info("indexOfAnyBut        -->{}", stringUtils.indexOfAnyBut("sstrfjkdgvnkldstr", "str"));
    log.info("containsOnly         -->{}", stringUtils.containsOnly("sstrfjkdgvnkldstr", [Interop.asJChar('s')]));
    log.info("containsNone         -->{}", stringUtils.containsNone("sstrfjkdgvnkldstr", [Interop.asJChar('p')]));
    log.info("subString            -->{}", stringUtils.substring("sstrfjkdgvnkldstr", 2, 5));
    log.info("right                -->{}", stringUtils.right("sstrfjkdgvnkldstr", 2));
    log.info("substringBefore      -->{}", stringUtils.substringBefore("sstrfjkdgvnkldstr", "t"));
    log.info("split                -->{}", [stringUtils.split("a.b.bfd.bfgdb.bfdbdf.bdfbdfd.fdsa.fh.ytj.yu", '.')]);
    log.info("splitByWholeSeparator-->{}", [stringUtils.splitByWholeSeparator("ab-!-cd-!-ef", "-!-")]);
    log.info("join                 -->{}", stringUtils.join([null, "", "a"]));
    log.info("deleteWhitespace     -->{}", stringUtils.deleteWhitespace("   ab  c  "));
    log.info("removeStart          -->{}", stringUtils.removeStart("www.domain.com", "www."));
    log.info("replaceOnce          -->{}", stringUtils.replaceOnce("aba", "a", "z"));
    log.info("replaceChars         -->{}", stringUtils.replaceChars("abcba", 'b', 'y'));
    log.info("overlay              -->{}", stringUtils.overlay("abcdef", "zzzz", -2, -3));
    log.info("chomp                -->{}", stringUtils.chomp("abc\n\rabc"));
    log.info("repeat               -->{}", stringUtils.repeat("ab", 2));
    log.info("rightPad             -->{}", stringUtils.rightPad("bat", -1));
    log.info("length               -->{}", stringUtils.length("sstrfjkdgvnkldstr"));
    log.info("center               -->{}", stringUtils.center("a", 4));
    log.info("upperCase            -->{}", stringUtils.upperCase("aBc"));
    log.info("countMatches         -->{}", stringUtils.countMatches("abba", "ab"));
    log.info("isAlpha              -->{}", stringUtils.isAlpha("ab  b"));
    log.info("isNumeric            -->{}", stringUtils.isNumeric("123"));
    log.info("getDigits            -->{}", stringUtils.getDigits("(541) 754-3010"));
    log.info("defaultString        -->{}", stringUtils.defaultString("bat"));
    log.info("firstNonBlank        -->{}", stringUtils.firstNonBlank([null as any, "xyz", "abc"]));
    log.info("rotate               -->{}", stringUtils.rotate("abcdefg", -9));
    log.info("reverse              -->{}", stringUtils.reverse("abcdefg"));
    log.info("abbreviate           -->{}", stringUtils.abbreviate("abcdefg", 4));
    log.info("difference           -->{}", stringUtils.difference("abcde", "abxyz"));
    log.info("indexOfDifference    -->{}", stringUtils.indexOfDifference("abcde", "abxyz"));
    log.info("startsWith           -->{}", stringUtils.startsWith("abcdef", "abc"));
    log.info("endsWith             -->{}", stringUtils.endsWith("abcdef", "def"));
    log.info("wrap                 -->{}", stringUtils.wrap("ab", 'x'));
    log.info("wrapIfMissing        -->{}", stringUtils.wrapIfMissing("a/b/c/", '/'));
    log.info("unwrap               -->{}", stringUtils.unwrap("A#", "#"));
    log.info("toCodePoJInts        -->{}", stringUtils.toCodePoints(null as any));
    return {success: true};
}

export {
    t01,
    t02,
}