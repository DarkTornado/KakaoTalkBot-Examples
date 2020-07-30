/*
가사로 노래 정보 검색
© 2020 Dark Tornado, All rights reserved.

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

function getSongByLyric(name) {
    try {
        var url = "https://m.music.naver.com/search/search.nhn?target=lyric&query=" + name.replace(/ /g, "%20");
        var data = org.jsoup.Jsoup.connect(url).ignoreContentType(true).get();
        data = data.select("div.search_result").select("section").select("li");
        var result = [];
        for (var n = 0; n < data.size(); n++) {
            var dd = data.get(n);
            var title = dd.select("div.tit").text();
            var singer = dd.select("div.stit").text();
            result.push(singer + " - " + title);
        }
        return result;
    } catch (e) {
        return null;
    }
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
    var cmd = msg.split(" ")[0];
    var data = msg.replace(cmd + " ", "");
    if (cmd == "/가사") {
        var result = getSongByLyric(data);
        if (result == null || result.length == 0) {
            replier.reply("검색 결과가 없습니다.");
        } else if (result.length > 3) {
            replier.reply("[검색 결과 " + result.length + "건]" + "\u200b".repeat(1000) + "\n\n" + result.join("\n\n"));
        } else {
            replier.reply("[검색 결과 " + result.length + "건]\n\n" + result.join("\n\n"));
        }

    }
}

