/*
메이플스토리 캐릭터 정보 조회 (멮gg 크롤링)
© 2020-2022 Dark Tornado, All rights reserved.
라이선스 : GPL 3.0 (https://github.com/DarkTornado/KakaoTalkBot-Examples/blob/master/LICENSE-GPL3.0)
*/

const kalingModule = require('kaling').Kakao();
const Kakao = new kalingModule;
Kakao.init("Javascript key", "domain");
Kakao.login("id", "password");


function getMapleData(name) {
    try {
        var data = org.jsoup.Jsoup.connect("https://maple.gg/u/" + name).get();
        var result = {};
        result.image = data.select("img.character-image").get(0).attr("src");
        result.rank = data.select("div[class=col-lg-2 col-md-4 col-sm-4 col-6 mt-3]").get(0).select("span").text();
        data = data.select("div.col-lg-8");
        result.name = data.select("b").get(0).text();
        result.server = data.select("img").attr("alt");
        data = data.select("li.user-summary-item");
        result.level = data.get(0).text();
        result.job = data.get(1).text();
        result.error = false;
        return result;
    } catch (e) {
        var result = {};
        result.error = true;
        result.errorMsg = e;
        return result;
    }
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
    var cmd = msg.split(" ");
    if (cmd[0] == "/메") {
        var result = getMapleData(cmd[1]); //어차피 멮 닉네임에 띄어쓰기 못넣음
        if (result.error) replier.reply("해당 캐릭터를 찾을 수 없습니다.");
        else Kakao.send(room, {
            "link_ver": "4.0",
            "template_object": {
                "object_type": "feed",
                "button_title": "",
                "content": {
                    "title": result.level + " " + result.name,
                    "image_url": result.image,
                    "link": {},
                    "description": "서버 : " + result.server + ", 직업 : " + result.job + "\n랭킹 : " + result.rank,
                },
                "buttons": [{
                    "title": "",
                    "link": {}
                }]

            }
        });
    }
}

