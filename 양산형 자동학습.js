/*
양산형 자동학습
© 2020 Dark Tornado, All rights reserved.
채팅 자동응답 봇, 메신저봇, 메신저봇R에서 작동하는 소스입니다

라이선스는 GPL 3.0이 적용되어 있고, 영리 목적으로 사용을 금하며, 원작자 표기를 강하게 권장합니다.

양산형 자동학습 Copyright (C) 2020 Dark Tornado
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
const preChat = {};

var file = new java.io.File(sdcard + "/자동학습/");
file.mkdirs();

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
    //도배 방지
    if (preChat[room] == msg) return;

    //배운 채팅 수 확인
    if (msg == "/학습수") {
        var file = new java.io.File(sdcard + "/자동학습/");
        replier.reply("[자동학습] " + file.list().length + "개의 채팅을 배웠습니다.");
    }

    //말하는 부분
    if (Math.floor(Math.random() * 25) == 0) {
        var chat = FileStream.read(sdcard + "/자동학습/" + msg + ".txt");
        if (chat != null) replier.reply("[자동학습] " + chat);
    }

    //배우는 부분
    if (preChat[room] != undefined) {
        FileStream.write(sdcard + "/자동학습/" + preChat[room] + ".txt", msg);
    }

    //직전 채팅 저장 방지	
    preChat[room] = msg;
}

