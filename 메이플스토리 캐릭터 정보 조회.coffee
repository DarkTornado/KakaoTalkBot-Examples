###
메이플스토리 캐릭터 정보 조회
© 2020 Dark Tornado, All rights reserved.
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

Utils.getMapleInfo = (name) ->
  try
    data = org.jsoup.Jsoup.connect("https://maple.gg/u/" + name).get().select("div.col-lg-8")
    info = data.select "li.user-summary-item"
    lv = info.get(0).text().replace("Lv.", "")
    job = info.get(1).text()
    pri = info.get(2).text().replace("인기도 ", "")
    return [lv, job, pri]
  catch
    null

response = (room, msg, sender, isGroupChat, replier, ImageDB, packageName) ->
  cmd = msg.split(" ")[0]
  data = msg.replace cmd + " ", ""
  if cmd is "/메이플스토리"
    result = Utils.getMapleInfo data
    if result is null
      replier.reply "캐릭터를 찾을 수 없습니다."
    else
      replier.reply "[메이플스토리 캐릭터 정보]\n"+
        "이름 : " + data + 
        "\n레벨 : " + result[0] + 
        "\n직업 : " + result[1] + 
        "\n인기도 : " + result[2] + 
        "\nhttps://maple.gg/u/" + data

