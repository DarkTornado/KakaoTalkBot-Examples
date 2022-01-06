/*
다음 날씨 파싱
© 2020 Dark Tornado, All rights reserved.
라이선스 : GPL 3.0 (https://github.com/DarkTornado/KakaoTalkBot-Examples/blob/master/LICENSE-GPL3.0)
채팅 자동응답 봇, 메신저봇, 메신저봇R에서 구동되는 소스입니다.
*/

Utils.getWeather = function(pos) {
    try {
        var data = org.jsoup.Jsoup.connect("https://m.search.daum.net/search?q=날씨%20" + pos.replace(" ", "%20")).get();
        data = data.select("div#weatherPanels").select("div.wrap_pannel").get(0);

        /*상태*/
        var status = data.select("p.desc_main").text().split(", 어제")[0];

        /*온도*/
        var temp = data.select("em.txt_temp").first().ownText();

        /*미세먼지 & 초미세먼지*/
        var data2 = data.select("ul.list_detail").select("li");
        var dust = data2.get(1).select("span.txt_state").text() + " (" + data2.get(1).select("span.txt_num").first().ownText() + "μg/m³)";
        var dust2 = data2.get(0).select("span.txt_state").text() + " (" + data2.get(0).select("span.txt_num").first().ownText() + "μg/m³)";

        /*강수 확률*/
        data2 = data.select("div.area_rain").select("li");
        var rain = "정보 없음";
        for (var n = 0; n < data2.size(); n++) {
            if (data2.get(n).attr("class").includes(" on")) {
                rain = data2.get(n).select("span.txt_emph").text();
                break;
            }
        }

        /*풍속 & 풍향*/
        data2 = data.select("div.area_wind").select("li");
        var windSpeed = "정보 없음";
        var windDir = "정보 없음";
        for (var n = 0; n < data2.size(); n++) {
            if (data2.get(n).attr("class") == "on") {
                windDir = data2.get(n).select("span.ico_wind").text();
                windSpeed = data2.get(n).select("span.txt_num").first().ownText();
                break;
            }
        }

        /*습도*/
        data2 = data.select("div.area_damp").select("li");
        var hum = "정보 없음";
        for (var n = 0; n < data2.size(); n++) {
            if (data2.get(n).attr("class") == "on") {
                hum = data2.get(n).select("span.txt_num").text();
                break;
            }
        }

        return "상태 : " + status +
            "\n온도 : " + temp + "℃" +
            "\n습도 : " + hum +
            "\n바람 : " + windDir + ", " + windSpeed + "m/s" +
            "\n강수확률 : " + rain +
            "\n미세먼지 : " + dust +
            "\n초미세먼지 : " + dust2;
    } catch (e) {
        Log.info("날씨 정보 불러오기 실패\n" + e);
        return null;
    }
};

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
    var cmd = msg.split(" ")[0];
    var data = msg.replace(cmd + " ", "");
    if (cmd == "/날씨") {
        var result = Utils.getWeather(data);
        if (result == null) replier.reply("날씨 정보 불러오기 실패");
        else replier.reply("[" + data + " 날씨 정보]\n" + result);
    }
}

