/*
DtroApi (대구 도시철도 운행 정보 가져오기)
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

Dtro.getMetroInfo(노선명, 역_이름);
  -> 해당 노선에 있는 해당 역의 열차 도착정보를 가져옴
Dtro.getStationList(노선명);
  -> 해당 노선의 역 목록을 가져옴
  
*/

//API 부분
const Dtro = {
    stas: [
        ["설화명곡", "화원", "대곡", "진천", "월배", "상인", "월촌", "송현", "서부정류장", "대명", "안지랑", "현충로", "영대병원", "교대", "명덕", "반월당", "중앙로", "대구역", "칠성시장", "신천", "동대구역", "동구청", "아양교", "동촌", "해안", "방촌", "용계", "율하", "신기", "반야월", "각산", "안심"],
        ["문양", "다사", "대실", "강창", "계명대", "성서산업단지", "이곡", "용산", "죽전", "감삼", "두류", "내당", "반고개", "청라언덕", "반월당", "경대병원", "대구은행", "범어", "수성구청", "만촌", "담티", "연호", "대공원", "고산", "신매", "사월", "정평", "임당", "영남대"],
        ["칠곡경대병원", "학정", "팔거", "동천", "칠곡운암", "구암", "태전", "매천", "매천시장", "팔달", "공단", "만평", "팔달시장", "원대", "북구청", "달성공원", "서문시장", "청라언덕", "남산", "명덕", "건들바위", "대봉교", "수성시장", "수성구민운동장", "어린이회관", "황금", "수성못", "지산", "범물", "용지"]
    ],
    COMPRESS: "​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​",
    getDataFormWeb: function(url) {
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
            return str + "";
        } catch (e) {
            //Log.debug(e);
        }
    },
    getMetroInfo: function(line, sta) {
        try {
            var results = [];
            var data = Dtro.getDataFormWeb("https://m.search.naver.com/search.naver?query=대구" + line + "호선%20" + sta);
            data = data.split("station_departure_area\">")[1].replace(/<[^>]+>/g, "").split("열차시간")[0].trim()
            if (data.indexOf("      ") == -1) var cc = [data.replace("&nbsp; 정보 없음   ", "")];
            else var cc = data.split("      ");
            for (var n = 0; n < cc.length; n++) {
                if (cc[n].indexOf("nbsp") != -1) continue;
                cc[n] = Dtro.dataProcess(cc[n]);
                result = {
                    direction: cc[n][0],
                    data: []
                };
                for (var m = 1; m < cc[n].length; m++) {
                    result.data.push(cc[n][m]);
                }
                results.push(result);
            }
            return results;
        } catch (e) {
            return null;
        }
    },
    dataProcess: function(data) {
        data = data.replace("행 ", " ").split("   ");
        data[1] = data[1].trim().split(" ");
        data[1] = data[1][0] + " 뒤 도착, (" + data[1][2] + ")";
        data[2] = data[2].trim().split(" ");
        data[2] = data[2][0] + " 뒤 도착, (" + data[2][2] + ")";
        return data;
    },
    getStationList: function(line) {
        return Dtro.stas[line - 1];
    }

}

//예제 부분
function response(room, msg, sender, isGroupChat, replier) {
    var cmd = msg.split(" ")[0];
    var data = msg.replace(cmd + " ", "");
    if (msg == "/대구") {
        replier.reply("[대구 도시철도 정보 도움말]" + Dtro.COMPRESS + "\n\n/대구 [노선명] - 해당 노선의 역 목록 출력.\n/대구 [노선명] [역] - 해당 노선에 있는 해당 역의 열차 도착 정보 출력.");
    } else if (cmd == "/대구") {
        switch (data) {
            case "1":
            case "1호선":
                replier.reply("[대구 호선 역 목록]" + Dtro.COMPRESS + "\n\n" + Dtro.getStationList(1).join("\n"));
                break;
            case "2":
            case "2호선":
                replier.reply("[대구 2호선 역 목록]" + Dtro.COMPRESS + "\n\n" + Dtro.getStationList(2).join("\n"));
                break;
            case "3":
            case "3호선":
                replier.reply("[대구 3호선 역 목록]" + Dtro.COMPRESS + "\n\n" + Dtro.getStationList(3).join("\n"));
                break;
            default:
                var data2 = data.split(" ");
                var result = "";
                var info = Dtro.getMetroInfo(data2[0].replace("호선", ""), data2[1]);
                if (info == null) {
                    replier.reply("정보 불러오기 실패");
                } else {
                    var result = "";
                    for (var n = 0; n < info.length; n++) {
                        result += info[n].direction + " 방면\n";
                        result += info[n].data.join("\n") + "\n\n";
                    }
                    replier.reply("[전철 도착 정보 : " + data2[1] + "]\n\n" + result.trim());
                }
        }
    }
}

