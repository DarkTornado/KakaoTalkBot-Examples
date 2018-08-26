/*
아이카
© 2018 Dark Tornado, All rights reserved.

마이카 소스는 공유하지 않는데, 아이카 소스는 공개합니다(?).
Project M의 2번째 오픈 소스인 미세키가 기반입니다.
어차피 미세키 내가 만든거니까 원작자 안밝혀도 되겠지(?). (이미 간접적으로 밝힌건 기분탓)

Jelly Brick님이 만드신 카카오톡 봇, Violet XF님이 만드신 메신저 봇과 호환됩니다.

아이카에는 GPL 3.0이 적용되어있습니다.

    <one line to give the program's name and a brief idea of what it does.>
    Project EA Copyright (C) 2018  Dark Tornado
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

/*상수 선언*/
const sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath(); //내장메모리 최상위 경로
const COMPRESS = "​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​"; //전체보기 만들기용 투명문자 1000개

/*상수 (객체) 선언*/
const Miseki = {}; //미세키 관련 객체
const DB = {}; //파일 입/출력용 객제인데, 이름이 DB인건 기분탓
const preChat = {}; //도배 방지 구현용
const lastSender = {}; //보낸 사람 구분용
const botOn = {}; //봇 on/off 관련 객체

/*Miseki 객체*/
Miseki.checkWord = function(que, msg) { //적당히 비슷한 말인지 비교
    var data = msg.split(" "); //수신된 채팅의 어절들 중
    var flag = false;
    if (Math.floor(Math.random() * 2) == 0) flag = true; //50% 확률로 이미 한 개가 포함되어 있다고 가정
    for (var n = 0; n < data.length; n++) { //두 개 이상이 저장된 채팅들에 포함되어 있다면,
        if (que.indexOf(data[n]) != -1) {
            if (flag) return true; //대강 비슷하다고 판단
            else flag = true;
        }
    }
    return false; //아님 말고
};
Miseki.getReply = function(room, msg) { //수신된 채팅에 대한 적당한 답변 반환
    var data = DB.readData(room); //저장된 채팅들을 불러옴
    if (data != null && Math.floor(Math.random() * 20) == 0) { //저장된 채팅이 없거나, 5% 확률이 터진게 아니면, 작동 안함
        data = data.split("\n"); //냥
        var result = []; //비슷한 말들이 들어갈 배열
        for (var n = 0; n < data.length - 1; n++) { //적당하다 싶은 녀석들을
            if (Miseki.checkWord(data[n], msg)) result.push(data[n + 1]); //배열에 추가
        }
        if (result[0] != null) return result[Math.floor(Math.random() * result.length)]; //배열이 빈게 아니라면 아무거나 하나 반환
    }
    return null; //일치하는게 없거나, 저장된 채팅이 없거나, 발동할 확률(?)이 아니면, null 반환
};
Miseki.isValidData = function(msg) { //배울 만한 채팅인지 구분하는 함수
    if (msg.charAt(0) == "#") return; //해시태그(#으로 시작)는 학습 X.
    var noStudy = ["\n"]; //엔터가 포함된건 학습 X. 비속어 필터링 등도 여기다가 넣으면 이상한 말은 안배움
    for (var n = 0; n < noStudy.length; n++) {
        if (msg.indexOf(noStudy[n]) != -1) return false;
    }
    return true;
};

/*DB 객체*/
DB.createDir = function() { //배운 채팅들이 저장될 폴더를 만드는 함수
    var folder = new java.io.File(sdcard + "/Aika/"); //File 인스턴스 생성
    folder.mkdirs(); //폴더 생성
};
DB.saveData = function(name, msg) { //파일에 내용을 저장하는 함수
    try { //사실, 나도 어디서 긁어와서 이곳저곳에서 사용하는 거임
        var file = new java.io.File(sdcard + "/Aika/" + name + ".txt");
        var fos = new java.io.FileOutputStream(file);
        var str = new java.lang.String(msg);
        fos.write(str.getBytes());
        fos.close();
    } catch (e) {
        Log.debug(e + ", " + e.lineNumber);
    }
};
DB.readData = function(name) { //파일에 저장된 내용을 불러오는 함수
    try { //사실, 나도 어디서 긁어와서 이곳저곳에서 사용하는 거임
        var file = new java.io.File(sdcard + "/Aika/" + name + ".txt");
        if (!file.exists()) return null;
        var fis = new java.io.FileInputStream(file);
        var isr = new java.io.InputStreamReader(fis);
        var br = new java.io.BufferedReader(isr);
        var str = br.readLine();
        var line = "";
        while ((line = br.readLine()) != null) {
            str += "\n" + line;
        }
        fis.close();
        isr.close();
        br.close();
        return str;
    } catch (e) {
        Log.debug(e + ", " + e.lineNumber);
    }
};

/*Utils 객체 확장*/
Utils.getDustData = function() { //전국 미세먼지 정보 가져오는 함수
    try {
        var data = Utils.getTextFromWeb("https://m.search.naver.com/search.naver?query=미세먼지");
        data = data.split("미세먼지</strong>")[1].split("예측영상")[0].replace(/(<([^>]+)>)/g, "");
        data = data.split("단위")[0].trim().split("   ");
        for (var n = 0; n < data.length; n++) {
            var cc = data[n].trim().split(" ");
            data[n] = cc[0] + " : " + Utils.dustLevel(Number(cc[1])) + " (" + cc[1] + "μg/m³)";
        }
        var data2 = data.shift();
        data.sort();
        data.unshift(data2);
        return data.join("\n");
    } catch (e) {
        Log.debug("미세먼지 정보 불러오기 실패\n오류: " + e + "\n위치: " + e.lineNumber);
        return "미세먼지 정보 불러오기 실패\n오류: " + e;
    }
};
Utils.dustLevel = function(value) {
    if (value <= 30) return "좋음";
    if (value <= 80) return "보통";
    if (value <= 150) return "나쁨";
    return "매우나쁨";
};
Utils.getTextFromWeb: function(url) {
    try {
        var url = new java.net.URL(url);
        var con = url.openConnection();
        if (con != null) {
            con.setConnectTimeout(5000);
            con.setUseCaches(false);
            var isr = new java.io.InputStreamReader(con.getInputStream());
            var br = new java.io.BufferedReader(isr);
            var str = br.readLine();
            var line = "";
            while ((line = br.readLine()) != null) {
                str += "\n" + line;
            }
            isr.close();
            br.close();
            con.disconnect();
        }
        return str.toString();
    } catch (e) {
        Log.debug(e);
    }
};

/*전역에서 실행할 것들*/
DB.createDir(); //폴더 생성

/*response 부분*/
function response(room, msg, sender, isGroupChat, replier) {
    /*모르면 골롬*/
    msg = msg.trim();
    sender = sender.trim();
    room = room.trim();

    /*도배 방지, 1:1 채팅방 필터링*/
    if (!isGroupChat) return; //단체 채팅방에서만 작동
    if (preChat[room] == msg) return; //동일한 채팅이 두 번 이상 연속으로 수신되면, 가볍게 무시
    preChat[room] = msg;

    /*명령어 처리*/
    procCmd(room, msg, sender, replier);

    /*봇 on/off 설정*/
    if (botOn[room] == undefined) { // 해당 채팅방의 on/off 여부가 결정되어있지 않으면 on으로 설정
        botOn[room] = true;
    }
    if (botOn[room] == false) { //봇이 꺼진 경우 작동 X
        return;
    }

    /*반응 안할 채팅들*/
    var noReply = [".", "사진", "동영상", "음성메시지", "카카오톡 프로필", "(이모티콘)", "카카오링크 이미지"];
    for (var n = 0; n < noReply.length; n++) {
        if (msg == noReply[n]) return;
    }

    /*본인 이름 부르면 반응*/
    if (["아이카", "아이카상", "아이카쨩", "아이카야", "Aika", "あいか", "アイカ"].indexOf(msg) != -1) { //아이카, 아이카상, 아이카쨩, 아이카야, Aika, あいか, アイカ에 반응
        switch (Math.floor(Math.random() * 9)) {
            case 0:
            case 1:
            case 2:
                replier.reply("왜 오신거죠?");
                break;
            case 3:
            case 4:
                replier.reply("꿀꿀 시끄럽네요.");
                break;
            case 5:
            case 6:
                replier.reply("더...더러워.");
                break;
        }
    }

    /*동생 본인 이름 부르면 반응*/
    if (msg == "마이카" && Math.floor(Math.random() * 3) ! = 0) {
        replier.reply("마이카는 내 동생인데..."); //카톡봇으로는 마이카가 먼저 나온건 기분탓
        if (Math.floor(Math.random() * 3) == 0) {
            java.lang.Thread.sleep(1500); //딜레이
            replier.reply("근데, 카톡봇으로는 마이카카 먼저 나온건 비밀이에요.");
        }
    }

    /*적당한 채팅 하나 가져와서 답장(?)하는 부분*/
    var chat = Miseki.getReply(room, msg);
    if (chat != null) replier.reply(chat);

    /*채팅을 학습하는 부분*/
    if (Miseki.isValidData(msg)) { //배울 만한 채팅인 경우,
        var data = DB.readData(room); //배운 채팅 목록을 가져옴
        if (data == null) { //이미 배운게 있다면
            DB.saveData(room, msg); //새로 저장
        } else { //아니면,
            if (lastSender[room] == sender) { //같은 사람이 연속으로 채팅을 한 경우,
                DB.saveData(room, data + " " + msg); //같은 채팅으로 분류
            } else { //아니면,
                DB.saveData(room, data + "\n" + msg); //다른 채팅으로 분류
            }
        }
    }
    lastSender[room] = sender;
}

/*명령어 처리*/
function procCmd(room, cmd, sender, replier) {
    /*봇 키는 명령어*/
    if (cmd == "/on") { //봇을 키는 명령어는 꺼진 상테에서도 작동
        replier.reply("아이카 활성화");
        botOn[room] = true;
    }

    if (botOn[room] == false) { //봇이 꺼진 경우 작동 X
        return;
    }

    /*봇 끄는 명령어*/
    if (cmd == "/off") {
        replier.reply("아이카 비활성화");
        botOn[room] = false;
    }

    /*배운 채팅 수를 확인하는 명령어*/
    if (cmd == "/DB") {
        var data = DB.readData(room);
        if (data == null) replier.reply("0개");
        else replier.reply(data.split("\n").length + "개");
    }

    /*생존 확인(?)용 명령어*/
    if (cmd == "/아이카") {
        replier.reply("봇 이름 : 아이카\n제작자 : Dark Tornado\n라이선스 : GPL 3.0\n\n 이 봇은 Project M - Miseki의 소스가 사용되었습니다.");
    }

    /*도움말*/
    if (cmd == "/도움말") {
        replier.reply("봇 이름 : 아이카\n제작자 : Dark Tornado\n라이선스 : GPL 3.0" + COMPRESS + "\n\n 마이카처럼 그냥 떠들라고 만든 봇입니다. 마이카 소스를 공유할 생각이 없는 관계로 만든게 아이카입니다. 명령어 목록은 '/아이카 명령어'로 확인하실 수 있습니다.\n 이 봇은 Project M - Miseki의 소스가 사용되었습니다. 아이카의 소스 코드는 개발자의 깃허브에 공개되어 있습니다.\n\n깃허브 : https://github.com/DarkTornado/KakaoTalkBot-Examples/blob/master/아이카.js");
    }

    /*아이카 명령어 목록*/
    if (cmd == "/아이카 명령어") {
        replier.reply("[아이카 명령어 목록]" + COMPRESS + "\n\n" +
            "/아이카 - 생존 확인용 명령어(?)입니다.\n" +
            "/도움말 - 도움말 같은걸 띄웁니다.\n" +
            "/on - 해당 채팅방에서 아이카를 활성화시킵니다.\n" +
            "/off - 해당 채팅방에서 아이카를 비활성화시킵니다.\n" +
            "/DB - 해당 채팅방에서 아이카가 학습한 말들의 수를 불러옵니다.\n" +
            "/아이카 명령어 - 아이카의 명령어 목록을 띄웁니다.\n" +
            "/미세먼지 - 현재 전국 미세먼지 현황을 띄웁니다.\n" +
            "/주사위 - 주사위를 던집니다.\n" +
            "\n 아이카도 마아카처럼 사람처럼 떠들라고 만든 녀석(?)이라 명령어가 그리 많지 않습니다.");
    }

    /*미세먼지*/
    if (cmd == "/미세먼지") {
        replier.reply("[미세먼지 정보]\n" + Utils.getDustData());
    }

    /*주사위*/
    if (cmd == "/주사위") {
        var icon = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
        replier.reply(icon[Math.floor(Math.random() * 6)]);
    }
}

