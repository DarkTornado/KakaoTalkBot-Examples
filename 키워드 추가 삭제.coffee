###
키워드 추가/삭제
© 2018 Dark Tornado, All rights reserved.
닼토봇 & Nusty 내장 카톡봇용 소스입니다.
라이선스는 딱히 없는데, 이 소스르 팔고 다니면 싸대기 퍽퍽.

/추가 키::값
/삭제 키
###

path = File.getSdcardPath() + "/키워드 목록/"

onLoaded = (ctx) -> 
    File.createFolder(path);

response = (room, msg, sender, isGroupChat, replier, ImageDB) ->
    cmd = msg.split(" ")[0]
    data = msg.replace cmd + " ", ""

    #키워드 추가
    if cmd is "/추가"
        chat = data.split "::"
        File.save path + chat[0] + ".txt", chat[1]
        replier.reply "키워드가 추가되었습니다."

    #키워드 삭제
    if cmd is "/삭제"
        File.remove path + data + ".txt"
        replier.reply "키워드가 삭제되었습니다."
    
    #추가된 키워드 말하기
    chat = File.read path + data + ".txt"
    replier.reply chat if chat isnt null
