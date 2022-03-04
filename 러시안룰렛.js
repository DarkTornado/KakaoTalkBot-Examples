/*
러시안 룰렛
© 2022 Dark Tornado, All rights reserved.
라이선스 : CCL BY-NC 4.0
*/

var enabled = false;
var participants = [];

function response(room, msg, sender, isGroupChat, replier) {
    if (msg == "/러시안룰렛") {
        if (enabled) {
            replier.reply("이미 러시안룰렛이 진행중입니다.");
        } else {
            replier.reply("러시안룰렛이 시작되었어요. 참여를 원하시면 '/참여'를, 참여자들이 다 모였으면 '/시작'을 입력해주세요.");
            participants = [];
            enabled = true;
        }
    }
    if (!enabled) return;
    if (msg == "/참여" || msg == "/참가") {
        if (participants.length == 6) {
            replier.reply("이미 참여자가 모두 찼습니다.");
        } else if (participants.includes(sender)) {
            replier.reply(sender + "님은 이미 참여하셨습니다.");
        } else {
            participants.push(sender);
            replier.reply(sender + "님께서 참여하셨습니다.");
        }
    }
    if (msg == "/시작") {
        if (participants.length == 0) {
            replier.reply("참여자가 없어서 시작할 수 없습니다.");
        } else {
            var bullet = Math.floor(Math.random() * 6);
            var died, result = [], index = 0;
            for (var n = 0; n < 6; n++) {
                if (participants.length == 0) {
                    result[n] = "생존자가 없어서 중단";
                    break;
                }
                if (bullet == n) {
                    result[n] = (n + 1) + "회: " + participants[index] + " 사망 ☚";
                    died = participants[index];
                    participants.splice(index, 1);
                } else {
                    result[n] = (n + 1) + "회: " + participants[index] + " 생존";
                }
                index++;
                if (index >= participants.length) index = 0;
            }
            replier.reply(died + "님께서 사망하셨습니다\n----------\n" + result.join("\n"));
            enabled = false;
        }
    }
}
