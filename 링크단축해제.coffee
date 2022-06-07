# CCL BY-NC 4.0

response = (room, msg, sender, isGroupChat, replier) ->
    cmd = msg.split ' '
    if cmd[0] is '/해제'
        url = org.jsoup.Jsoup.connect(cmd[1])
        .followRedirects(false).execute().header('location')
        if url is null 
            replier.reply '단축되지 않은 링크입니다'
        else 
            replier.reply '단축 주소 : ' + cmd[1] + '\n원본 주소 : ' + url
