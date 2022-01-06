/*
네이버 날씨 파싱
© 2021 Dark Tornado, All rights reserved.
가이드라인 : 해당 소스코드를 통한 금전적인 이익을 얻는 것을 금지합니다. 가이드라인은 라이선스보다 우선적으로 적용됩니다.
라이선스 : GPL 3.0 (https://github.com/DarkTornado/KakaoTalkBot-Examples/blob/master/LICENSE-GPL3.0)
채팅 자동응답 봇, 메신저봇, 메신저봇R에서 구동되는 소스입니다.
*/

function getNaverWeather(loc) {
    try {
        var url = Utils.parse("https://m.search.naver.com/search.naver?query=" + loc.replace(/ /g, "+") + "+날씨")
            .select("a.csm_more").attr("href");
        var data = Utils.parse(url).select("ul.week_list > li");
        var result = [];
        var days = ["오늘", "내일", "모래", "글피"];
        for (var n = 0; n < days.length; n++) {
            var info = data.get(n).select("span");
            result[n] = "[" + days[n] + " 날씨]\n";
            result[n] += "상태 : " + info.get(2).attr("data-wetr-txt") + " -> ";
            result[n] += info.get(7).attr("data-wetr-txt") + "\n";
            result[n] += "강수확률 : " + info.get(4).ownText() + " -> ";
            result[n] += info.get(9).ownText() + "\n";
            var tmp = data.get(n).select("strong.temperature").select("span");
            tmp = (tmp.get(0).ownText() + " ~ " + tmp.get(3).ownText()).replace(/°/g, "℃");
            result[n] += "온도 : " + tmp;
            return result;
        }
    } catch (e) {
        Log.error(loc + "날씨 정보 뜯어오기 실패\n" + e);
        return null;
    }
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
    var cmd = msg.split(" ")[0];
    var data = msg.replace(cmd + " ", "");

    if (cmd == "/날씨") {
        var result = getNaverWeather(data);
        if (result == null) replier.reply("날씨 정보 불러오기 실패");
        else replier.reply(data + "의 날씨 정보입니다\n\n" + result.shift() + "\u200b".repeat(500) + "\n\n" + result.join("\n\n"));
    }
}

