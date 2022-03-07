/*
채팅 읽음 처리
© 2020-2022 Dark Tornado, All rights reserved.
라이선스 : Deep Dark License - Type C
사실상 쓰지 말라는 소스
*/

var chatCount = {};

function response(room, msg, sender, isGroupChat, _replier, ImageDB) {
    var replier = {};
    replier.reply = function(msg) {
        _replier.reply(msg);
        chatCount[room] = 0;
    };

    if (chatCount[room] == undefined) chatCount[room] = 0;
    chatCount[room]++;

    if (chatCount[room] >= 300) {
        replier.reply("채팅이 300개 쌓여 자동 읽음 처리합니다.");
        chatCount[room] = 0;
    }
    
    //나머지 소스
}
