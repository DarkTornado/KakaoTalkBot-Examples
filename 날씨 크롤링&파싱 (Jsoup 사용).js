/*
날씨 크롤링&파싱 (Jsoup 라이브러리 사용)
© 2020 Dark Tornado, All rights reserved.

Jsoup 라이브러리를 포함하고 있는 카톡봇에서 돌아가며, Utils 객체가 없다면 알아서 만드세요(?).

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
*/


Utils.getWeather = function(pos) {
    try {
        var data = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=" + pos.replace(/ /g, "+") + "+날씨").get();
        data = data.select("div.weather_info");
        var status = data.select("div.weather_main").get(0).text();
        var temp = data.select("strong");
        var tempCurrent = temp.get(0).text();
        var tempMax = temp.get(1).text();
        var tempMin = temp.get(2).text();
        var tempWind = temp.get(3).text();
        var table = data.select("span.figure_text");
        if (table.size() == 6) {
            var dust = table.get(1).text();
            var hum = table.get(4).text();
        } else {
            var dust = table.get(0).text();
            var hum = table.get(3).text();
        }
        var result = "상태 : " + status + "\n";
        result += tempCurrent.replace("온도", "온도 : ") + "\n";
        result += "체감 온도 : " + tempWind + "\n";
        result += "최고 기온 : " + tempMax + "\n";
        result += "최저 기온 : " + tempMin + "\n";
        result += "습도 : " + hum + "\n";
        result += "미세먼지 : " + dust;
        return result.replace(/°/g, "℃");
    } catch (e) {
        return null;
    }
};

function response(room, msg, sender, isGroupChat, replier) {
    var cmd = msg.split(" ")[0];
    var data = msg.replace(cmd + " ", "");
    if (cmd == "/날씨") {
        var result = Utils.getWeather(data);
        if (result == null) replier.reply(data + "의 날씨 정보를 불러올 수 없습니다.");
        else replier.reply("[" + data + " 날씨 정보]\n" + result);
    }
}

