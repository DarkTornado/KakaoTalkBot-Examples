/*
다음 날씨 파싱
© 2020-2021 Dark Tornado, All rights reserved.
라이선스 : Deek Dark License - Type C
채팅 자동응답 봇, 메신저봇, 메신저봇R에서 구동되는 소스입니다.
*/

getWeather = (loc) => {
    try {
        var data0 = Utils.parse("https://m.search.daum.net/search?w=tot&q=" + loc.replace(/ /g, "+") + "+날씨")
            .select("div[id=weatherPanels]");
        var result = "[" + loc + " 날씨]\n";
        var data = data0.get(0);
        result += "상태 : " + data.select("p").text().split(", 어제")[0] + "\n";
        result += "온도 : " + data.select("em.txt_temp").get(0).ownText() + "℃\n";
        data = data.select("dd");
        result += "습도 : " + data.get(0).text() + "\n";
        result += "바람 : " + data0.select("dt").get(1).text();
        result += ", " + data.get(1).text() + "\n";
        data = data0.select("ul.list_detail").select("li").get(1).select("span");
        result += "미세먼지 : " + data.get(2).text();
        result += " (" + data.get(3).ownText() + "μg/m³)";
        return result;
    } catch (e) {
        return null;
    }
};

response = (room, msg, sender, isGroupChat, replier) => {
    var cmd = msg.split(" ");
    if (cmd[0] == "/날씨") {
        cmd.shift();
        var result = getWeather(cmd.join(" "));
        if (result == null) replier.reply("날씨 정보 불러오기 실패");
        else replier.reply(result);
    }
}

