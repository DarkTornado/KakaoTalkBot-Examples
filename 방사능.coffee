###
전국 방사능 정보
© 2020 Dark Tornado, All rights reserved.
라이선스 : BSD-3-Clause License
###

response = (room, msg, sender, isGroupChat, replier, ImageDB, packageName) -> 
    if msg is "/방사능"
        data = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=방사능").get().select("table.table_list").select "td"
        result = []
        for n in [0 .. data.size() - 1]
            result[n] = data.get(n).text().replace " ", " : "
        replier.reply "[전국 방사능 정보]\n\n" + result.join "\n"
