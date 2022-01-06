/*
다음 세계 날씨 파싱
© 2020-2021 Dark Tornado, All rights reserved.
라이선스 : GPL 3.0 (https://github.com/DarkTornado/KakaoTalkBot-Examples/blob/master/LICENSE-GPL3.0)
채팅 자동응답 봇, 메신저봇, 메신저봇R에서 구동되는 소스입니다.
*/


getGlobalWeather = (loc) => {
    try {
        var data0 = Utils.parse("https://m.search.daum.net/search?w=tot&q=" + loc + "+날씨").select("div.cont_divider");
        var data = data0.select("div.area_today").select("span");

        /* 상태 & 기온 */
        var result = "상태 : " + data.get(0).text() + "\n";
        result += data.get(3).text().replace("온도 ↓", "기온 : ") + "\n";
        result += data.get(5).text().replace("온도 ↓", "기온 : ") + "\n";

        /* 습도 & 풍속 */
        var data = data0.select("ul.list_etc").select("li");
        result += data.get(1).text().replace(" ", " : ") + "\n";
        result += data.get(0).text().replace(" ", " : ");

        return result.replace(/˚/g, "℃");
    } catch (e) {
        return null;
    }
}

response = (room, msg, sender, isGroupChat, replier) => {
    var cmds = msg.split(" ");
    if (cmds[0] == "/날씨") {
        var data = getGlobalWeather(cmds[1]);
        if (data == null) replier.reply("날씨 정보 불러오기 실패");
        else replier.reply("[" + cmds[1] + " 날씨 정보]\n\n" + data);
    }
}

