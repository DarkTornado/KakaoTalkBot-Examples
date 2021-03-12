###
메이플스토리 실방무 계산기
© 2021 Dark Tornado, All rights reserved.
라이선스 : BSD-3-Clause License
###

response = (room, msg, sender, isGroupChat, replier, ImageDB, packageName) -> 
    cmd = msg.split " "
    if cmd[0] is "/실방무"
        result = Number cmd[1]
        for n in [2..cmd.length-1]
            result += (100 - result) * Number cmd[n] / 100
        replier.reply "계산 결과 : " + Math.ceil result
