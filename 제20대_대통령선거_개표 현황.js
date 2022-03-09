//비영리 목적 사용만 허용

response = (room, msg, sender, isGroupChat, replier) => {
    if (msg == "/개표") {
        var data = org.jsoup.Jsoup.connect("https://m.search.daum.net/search?w=tot&q=개표").get().select("div#jupBECColl");
        var result = data.select("span.txt_info").get(0).text() + "\n\n";
        data = data.select("div.list_rank").select("li");
        for (var n = 0; n < data.length; n++) {
            var datum = data.get(n);
            result += (n + 1) + "위. " + datum.select("span.tit-g").text() +
                " (" + datum.select("span.txt_party").text() + ")" +
                " : " + datum.select("strong").text() + "%\n";
        }
        replier.reply(result.trim());
    }
};