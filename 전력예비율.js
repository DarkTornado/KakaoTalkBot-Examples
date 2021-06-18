function getElectricity() {
    var data = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=전력예비율").get().select("div.status_box");
    var result = "상태 : " + data.select("span.u_hc").text();
    result += "\n공급예비율 : " + data.select("span.figure").text();
    data = data.select("div.lst_energy").select("span");
    result += "\n공급예비력 : " + data.get(0).text();
    result += "\n공급능력 : " + data.get(1).text();
    result += "\n현재부하 : " + data.get(2).text();
    return result;
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
    if (msg == "/전력량") {
        var result = getElectricity();
        replier.reply(result);
    }
}
