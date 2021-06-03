/*
급식봇 (네이버에서 학교 급식 정보 크롤링)
© 2021 Dark Tornado, All rights reserved.
라이선스 : CCL BY-NC 4.0
사용 예) /급식 [학교이름]
*/

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
    var cmd = msg.split(" ");
    if (cmd[0] == "/급식") {
        var data = Utils.parse("https://m.search.naver.com/search.naver?query=" + cmd[1] + "%20급식");
        data = data.select("ul.list_scroll.menu_scroll").select("li.bx_list._item");
        var day = new Date();
        var today = (day.getMonth() + 1) + "월 " + day.getDate() + "일";
        var result = [];
        for (var n = 0; n < data.size(); n++) {
            var datum = data.get(n);
            var date = datum.select("strong").text();
            if (date.startsWith(today)) {
                var meal = "---" + date + "---\n" + datum.select("ul").select("li").text().replace(/[0-9.]/g, "").replace(/ /g, "\n");
                if (date.includes("아침")) result[0] = meal;
                if (date.includes("점심")) result[1] = meal;
                if (date.includes("저녁")) result[2] = meal;
            }
        }
        result = result.join("\n\n").trim();
        replier.reply(result ? result : "학교 또는 급식 정보를 찾을 수 없어요.");
    }
}
