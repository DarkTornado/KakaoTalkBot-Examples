//비영리 목적 사용만 허용

response = (room, msg, sender, isGroupChat, replier) => {
    if (msg == "/투표율") {
        var data = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=제20대%20대통령선거%20투표율").get().select("div.percent_box");
        var result = data.select("strong.percent").text() + " (" + data.select("em.time").text() + ")";
        replier.reply(result);
    }
};