###
서해선 도착 정보 가져오기
© 2019 Dark Tornado, All rights reserved.
아이콘이 초록색인 카톡봇에서 돌아가는 소스로, 커피스크립트로 작성되어있습니다.

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
###

stas = ["소사역", "소새울역", "시흥대야역", "신천역", "신현역", "시흥시청역", "시흥능곡역", "달미역", "선부역", "초지역", "원곡역", "원시역"]

getStationInfo = (sta) -> 
    data = Utils.getWebText "https://m.search.naver.com/search.naver?query=서해선%20"+sta
    data = data.split("station_departure_area\">")[1].replace(/<[^>]+>/g,"").split("열차시간")[0].trim()
    data = data.replace(/ /g, "")
    cc = data.split "행"
    return [null, cc[1].split("분")[0]] if sta is "소사역"
    return [cc[1].split("분")[0], null] if sta is "원시역"
    return [cc[1].split("분")[0], cc[2].split("분")[0]]

response = (room, msg, sender, isGroupChat, replier, ImageDB) -> 
    cmd = msg.split(" ")[0]
    data = msg.replace cmd + " ", ""
    if msg is "/서해선"
        replier.reply "[역 목록]\n\n" + stas.join "\n"
    else if cmd is "/서해선"
        results = getStationInfo data
        result = ""
        result +="소사행 : "+results[0]+ "분 뒤 도착.\n" if results[0] isnt null
        result +="원시행 : "+results[1]+ "분 뒤 도착.\n" if results[1] isnt null
        replier.reply "[" + data+" 정보]\n" + result.trim()

