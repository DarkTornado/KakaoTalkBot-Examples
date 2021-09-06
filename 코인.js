/*
암호화페 정보
© 2021 Dark Tornado, All rights reserved.
라이선스 : CCL BY-NC 4.0
업비트에서 암호화페 가격 정보를 뜯어와요
*/

function getCoinMark(name) {
    var data = Utils.parse("https://api.upbit.com/v1/market/all").text();
    data = JSON.parse(data);
    for (var n = 0; n < data.length; n++) {
        if (data[n].market.startsWith("KRW-") && data[n].korean_name == name) return data[n].market;
    }
    return null;
};

function response(room, msg, sender, isGroupChat, replier) {
    var cmd = msg.split(" ");
    if (cmd[0] == "/코인") {
        var mark = getCoinMark(cmd[1]);
        if (mark == null) {
            replier.reply(cmd[1] + "(이)라는 암호화폐를 찾을 수 없습니다.");
        } else {
            var data = Utils.parse("https://api.upbit.com/v1/ticker?markets=" + mark).text();
            data = JSON.parse(data);
            replier.reply("현재 " + cmd[1] + " 시세는 " + data[0].trade_price + "원입니다.");
        }
    }
}

