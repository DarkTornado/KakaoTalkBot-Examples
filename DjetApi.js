/*
DjetApi (대전 도시철도 운행 정보 가져오기)
© 2019 Dark Tornado, All rights reserved.
이론상 모든 카톡봇에서 돌아가는 소스로, 자바스크립트로 작성되어있습니다.
본인이 만든거라고 뻥치고 다니면 싸대기 퍽퍽.

MIT License
Copyright (c) 2018 Dark Tornado. All rights reserved.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Djet.getMetroInfo(역_이름);
  -> 해당 역의 열차 도착정보를 가져옴
Djet.getStationList();
  -> 대전 도시철도의 역 목록을 가져옴
*/

//API 부분
const Djet = {
    stas: ["판암", "신흥", "대동", "대전역", "중앙로", "중구청", "서대전네거리", "오룡", "용문", "탄방", "시청", "정부청사", "갈마", "월평", "갑천", "유성온천", "구암", "현충원", "월드컵경기장", "노은", "지족", "반석"],
    getMetroInfo: function(sta) {
        try {
            var result = [];
            var data = Utils.getWebText("https://m.search.naver.com/search.naver?query=대전1호선%20" + sta);
            data = data.split("station_departure_area\">")[1].replace(/<[^>]+>/g, "").split("열차시간")[0].trim()
            if (data.indexOf("      ") == -1) var cc = [data.replace("&nbsp; 정보 없음   ", "")];
            else var cc = data.split("      ");
            for (var n = 0; n < cc.length; n++) {
                if (cc[n].indexOf("nbsp") != -1) continue;
                cc[n] = Djet.dataProcess(cc[n]);
                result.push(cc[n]);
            }
            return result.join("\n\n");
        } catch (e) {
            return null;
        }
    },
    dataProcess: function(data) {
        data = data.replace("행 ", " 방면 ").split("   ");
        data[1] = data[1].trim().split(" ");
        data[1] = data[1][0] + " 뒤 도착, (" + data[1][2] + ")";
        data[2] = data[2].trim().split(" ");
        data[2] = data[2][0] + " 뒤 도착, (" + data[2][2] + ")";
        return data.join("\n");
    },
    getStationList: function() {
        return Djet.stas;
    }

}

//예제 부분
function response(room, msg, sender, isGroupChat, replier) {
    var cmd = msg.split(" ")[0];
    var data = msg.replace(cmd + " ", "");
    if (msg == "/대전") {
        replier.reply("[대전 도시철도 역 목록]" + "\u200b".repeat(1000) + "\n\n" + Djet.getStationList().join("\n"));
    } else if (cmd == "/대전") {
        var result = Djet.getMetroInfo(data);
        if (result == null) replier.reply("정보 불러오기 실패");
        else replier.reply("[전철 도착 정보 : " + data + "]\n\n" + result);
    }
}

