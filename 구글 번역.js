/*
구글 번역
© 2020 Dark Tornado, All rights reserved.
/번역 [언어1] [언어2] [내용]
*/

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
    var cmd = msg.split(" ");
    if (cmd[0] == "/번역") {
        var data = org.jsoup.Jsoup.connect("http://translate.googleapis.com/translate_a/single")
            .data("client", "gtx")
            .data("sl", cmd[1])
            .data("tl", cmd[2])
            .data("dt", "t")
            .data("q", cmd.slice(3).join(" "))
            .data("&ie", "UTF-8")
            .data("oe", "UTF-8")
            .ignoreHttpErrors(true).ignoreContentType(true).post().wholeText();
        data = JSON.parse(data);
        var result = data[0][0][0];
        replier.reply("번역 결과 : " + result);
    }
}

