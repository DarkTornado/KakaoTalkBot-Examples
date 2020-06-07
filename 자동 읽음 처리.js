/*
채팅 읽음 처리
© 2020 Dark Tornado, All rights reserved.
*/

var chatCount = {};

function response(room, msg, sender, isGroupChat, replier, ImageDB) {
    if (chatCount[room] == undefined) chatCount[room] = 0;
    chatCount[room]++;
    if (chatCount[room] >= 300) {
        replier.reply("채팅이 300개 쌓여 자동 읽음 처리합니다.");
        chatCount[room] = 0;
    }
}


