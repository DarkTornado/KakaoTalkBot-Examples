/*
코로나 확진자/사망자 정보
© 2022 Dark Tornado, All rights reserved.
라이선스 : CCL BY-NC 4.0
*/

function response(room, msg, sender, isGroupChat, replier) {
    if (msg == "/코로나") {
        var data = org.jsoup.Jsoup.connect("http://ncov.mohw.go.kr/")
            .get();
        var data0 = data.select("div.occurrenceStatus");
        data = data.select("tbody").select("td");
        var died = data.get(0).text();
        var conf = data.get(3).text();
        data = data0.select("div.occur_num").select("div.box");
        var diedTotal = data.get(0).ownText();
        var confTotal = data.get(1).ownText();
        replier.reply("[코로나 확진 정보]\n" +
            "확진 : " + confTotal + "명 (+" + conf + ")\n" +
            "사망 : " + diedTotal + "명 (+" + died + ")");
    }
}
