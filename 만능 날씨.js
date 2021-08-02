/*
만능 날씨
© 2021 Dark Tornado, All rights reserved.
라이선스 : CCL BY-NC 4.0

이론상 모든 카톡봇에서 돌아가는 소스로, 자바스크립트로 작성되어있습니다.
일부 지역의 날씨 정보를 기상청에서 받아와서 보여주는 소스입니다.
어느 앱과 작동 모습의 거의 동일하지만, 앱 다운로드 링크가 전송되지는 않습니다.

본 저작물은 '기상청'에서 공공누리 제1유형으로 개방한 '동네예보 RSS 서비스'을 이용하였으며,
해당 저작물은 '기상청(https://www.weather.go.kr/weather/lifenindustry/sevice_rss.jsp)'에서 무료로 사용할 수 있습니다.
*/

const ZoneID = {
    "서울": 1159068000,
    "부산": 2611053000,
    "춘천": 4211070500,
    "강릉": 4215052000,
    "인천": 2811058500,
    "수원": 4111356000,
    "청주": 4311374100,
    "홍성": 4480025600,
    "대전": 3017063000,
    "안동": 4514053000,
    "포항": 4711155000,
    "울산": 3111058500,
    "대구": 2714059000,
    "전주": 4511357000,
    "목포": 4611055400,
    "광주": 2917060200,
    "여수": 4613057000,
    "창원": 4812552000,
    "제주": 5011059000
};

function response(room, msg, sender, isGroupChat, replier) {
    if (msg == "만능 날씨") {
        replier("날씨는 이렇게 물어보세요.\n\n" +
            "\"예시) 만능 날씨 서울\"\n\n" +
            "위치 리스트\n" +
            "서울,부산,춘천,강릉,인천,수원,청주,홍성,대전,안동,포항,울산,대구,전주,목포,광주,여수,창원,제주");
    } else if (msg.startsWith("만능 날씨 ")) {
        var name = msg.replace("만능 날씨 ", "");
        if (!ZoneID.hasOwnProperty(name)) {
            replier.reply("해당 위치를 찾을 수 없어요");
            return;
        }
        var data = org.jsoup.Jsoup.connect("http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=" + ZoneID[name])
            .get();
        var time = data.select("pubDate").text();
        time = time.substring(time.indexOf(" ") + 1);
        var location = data.select("category").text();
        data = data.select("data").get(0);
        var status = data.select("wfKor").text();
        var tmp = data.select("temp").text();
        var hum = data.select("reh").text();

        var result = "현재날씨 \"" + status + "\"\n\n";
        result += "기온 - " + tmp + "도\n";
        result += "습도 - " + hum + "%\n\n";
        result += "기상청 측정시간 :\n";
        result += time + "\n\n";
        result += "기상청 측정위치 :\n";
        result += location;
        replier.reply(result);
    }
}
