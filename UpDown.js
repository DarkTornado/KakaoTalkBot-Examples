/*
업다운 미니게임
© 2021 Dark Tornado, All rights reserved.
가이드라인 : 해당 소스코드를 통한 금전적인 이익을 얻는 것을 금지합니다. 가이드라인은 라이선스보다 우선적으로 적용됩니다.
라이선스 : AGPL 3.0
채팅 자동응답 봇, 메신저봇, 메신저봇R에서 구동되는 소스입니다.
*/

var numbers = {};

function response(room, msg, sender, isGroupChat, replier) {
    var cmd = msg.split(" ");
    
    if (cmd[0] == "/업다운시작") {
        if (numbers.hasOwnProperty(room)) {
            replier.reply("이미 업다운 게임이 진행중이에요.");
        } else {
            var max = Number(cmd[1]);
            if (isNaN(max)) max = 0;
            if (max <= 0) max = 100;
            numbers[room] = Math.floor(Math.random() * max) + 1;
            replier.reply("업다운 게임이 시작되었어요.\n범위 : 1 ~ " + max);
        }
    }

    if (cmd[0] == "/업다운종료") {
        if (numbers.hasOwnProperty(room)) {
            delete numbers[room];
            replier.reply("진행중인 업다운 게임을 종료했어요.");
        } else {
            replier.reply("진행중인 업다운 게임이 없어요.");
        }

    }

    if (cmd[0] == "/업다운도움말") {
        replier.reply("/업다운시작 [수] - 업다운 게임을 시작해요.\n" +
            "/업다운종료 - 진행 중인 업다운 게임을 멈줘요.\n" +
            "/업다운 [수] 해당 수가 정답인지 확인해요.");
    }

    if (cmd[0] == "/업다운") {
        if (!numbers.hasOwnProperty(room)) return;
        var input = Number(cmd[1]);
        if (numbers[room] == input) {
            delete numbers[room];
            replier.reply(sender + "님이 정답을 맟주어, 업다운 게임이 종료되었어요.");
        } else if (numbers[room] > input) {
            replier.reply("업");
        } else {
            replier.reply("다운");
        }
    }

}
