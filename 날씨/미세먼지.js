/*
네이버에서 미세먼지 정보 뜯어오기
© 2021 Dark Tornado, All rights reserved.
라이선스 : GPL 3.0 (https://github.com/DarkTornado/KakaoTalkBot-Examples/blob/master/LICENSE-GPL3.0)
채팅 자동응답 봇, 메신저봇, 메신저봇R에서 구동되는 소스입니다.
*/

response = (room, msg, sender, isGroupChat, replier) => {
    var cmd = msg.split(" ")[0];
    var data = msg.replace(cmd + " ", "");

    if (cmd == "/먼지") {
        data = org.jsoup.Jsoup.connect("https://search.naver.com/search.naver?query=" + data.replace(/ /g, "+") + "+날씨")
            .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36")
            .get().select("dl.indicator").get(0).select("dd");
        var dust = data.get(0).text().replace("㎍/㎥", "μg/m³ (") + ")";
        var dust2 = data.get(1).text().replace("㎍/㎥", "μg/m³ (") + ")";
        var ozone = data.get(2).text().replace("ppm", "ppm (") + ")";
        replier.reply("미세먼지: " + dust + "\n초미세먼지: " + dust2 + "\n오존: " + ozone);
    }

}
