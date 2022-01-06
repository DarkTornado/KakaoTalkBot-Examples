/*
날씨 정보
© 2020 Dark Tornado, All rights reserved.
Jsoup 라이브러리를 포함하고 있는 봇 구동 앱에서 돌아가며, Utils 객체가 없다면 알아서 만드세요(?).
라이선스는 LGPL 3.0이며, 영리 목적으로 사용을 금하며, 원작자 표기를 강하게 권장합니다.

one line to give the library's name and an idea of what it does.
Copyright (C) 2020  Dark Tornado

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
*/

Utils.getWeather = function(pos) {
    try {
        var data = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=" + pos.replace(/ /g, "+") + "+날씨").get();
        data = data.select("div.status_wrap");
        var temp = data.select("strong").get(0).text();
        temp = temp.replace("현재 온도", "온도 : ").replace("°", "℃");
        var hum = data.select("li.type_humidity").select("span").get(0).text();
        var state = data.select("div.weather_main").get(0).text();
        var dust = data.select("li.sign1").get(0);
        dust = dust.select("span.figure_text").text() + " (" + dust.select("span.figure_result").text() + ")";
        var result = "상태 : " + state + "\n" + temp + "\n습도 : " + hum + "%\n미세먼지 : " + dust;
        return result;
    } catch (e) {
        Log.error("날씨 정보 불러오기 실패\n" + e);
        return null;
    }
};

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
    var cmd = msg.split(" ")[0];
    var data = msg.replace(cmd + " ", "");
    if (cmd == "/날씨") {
        var result = Utils.getWeather(data);
        if (result == null) replier.reply("날씨 정보 불러오기 실패");
        else replier.reply("[" + data + " 날씨 정보]\n" + result);
    }
}

