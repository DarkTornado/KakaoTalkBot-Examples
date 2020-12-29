/*
자동읽음
© 2020 Dark Tornado, All rights reserved.
채팅 자동응답 봇 3.9 이상, 메신저봇R 0.7.23a 이상에서 작동하는 소스에요
*/

const count = {};

function response(room, msg, sender, isGroupChat, replier) {
    if (count[room] === undefined) {
        count[room] = 0;
    }
    count[room]++;
    if (count[room] == 300) {
        replier.markAsRead();
        count[room] = 0;
    }
}

