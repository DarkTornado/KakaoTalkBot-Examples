###
간단한 네이버 날씨 파싱
© 2021 Dark Tornado, All rights reserved.
라이선스 : CCL BY-NC 4.0
###

response = (room, msg, sender, isGroupChat, replier, ImageDB, packageName) -> 
    cmd = msg.split " "
    if cmd[0] is "/날씨"
        try
            cmd.shift();
            data0 = Utils.parse "https://m.search.naver.com/search.naver?query=" + cmd.join("%20") + "%20날씨"
            data = data0.select "li.today"
            info = data.select "span.blind"  
            result = "상태 : " + info.get(0).text() + " -> " + info.get(1).text() + "\n"
            result += "온도 : " + data.select("strong.temperature").get(0).ownText().replace("°", "℃ ~").replace("°", "℃") + "\n"
            result += "습도 : " + data0.select("li.type_humidity").select("span.figure_result").text() + "%\n"
            result += "강수확률 : " + data.select("span.weather_percent").text().replace(" ", " -> ") + "\n"
            result += "바람 : " + data0.select("li.type_wind").select("span").text().replace(" ", "").replace(" ", ", ")
            replier.reply "[" + cmd.join(" ") + " 날씨 정보]\n" + result
        catch
            replier.reply "날씨 정보 불러오기 실패"
