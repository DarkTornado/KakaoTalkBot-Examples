###
노양심 가위바위보
© 2021 Dark Tornado, All rights reserved.
라이선스 : CCL BY-NC 4.0
###

response = (room, msg, sender, isGroupChat, replier, ImageDB, packageName) -> 
    cmd = msg.split " "
    if cmd[0] is "/가위바위보"
        types = 
            "가위": "바위"
            "바위": "보"
            "보": "가위"
        replier.reply types[cmd[1]] + "\n봇이 이겼습니다." if types.hasOwnProperty(cmd[1])
