/*
맛집 정보
© 2021 Dark Tornado, All rights reserved.
라이선스 : CCL BY-NC 4.0
카카오맵에서 맛집 정보를 뜯어와요
*/

response = (room, msg, sender, isGroupChat, replier) => {
    var cmd = msg.split(" ");
    if (cmd[0] == "/맛집") {
        cmd.shift();
        var data = Utils.parse("https://m.map.kakao.com/actions/searchView?q=" + cmd.join("%20") + "%20맛집")
            .select("li.search_item.base");
        var result = "[맛집 리스트]\n\n";
        for (var n = 0; n < data.size(); n++) {
            var datum = data.get(n);
            result += (n + 1) + ". " + datum.attr("data-title") + "\n";
            result += "주소 : " + datum.select("span.txt_g").text() + "\n";
            result += "지도 : https://place.map.kakao.com/m/" + datum.attr("data-id");
            if (n == 1) result += "\u200b".repeat(500);
            result += "\n\n";
        }
        replier.reply(result.trim());
    }
}