###
팝콘봇
© 2018 Dark Tornado, All rights reserved.
마이카에 있던 임시 팝콘봇에서 분리된 버전으로, MIT License가 적용되어있습니다.

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

store = [];

response = (room, msg, sender, isGroupChat, replier, ImageDB) -> 
    if msg is "/팝콘 on"
        store.push room
        replier.reply "팝콘봇이 활성화되었습니다"
    else if msg is "/팝콘 off"
        store.splice store.indexOf(room), 1
        replier.reply "팝콘봇이 비활성화되었습니다"
    
    if store.indexOf(room) != -1
        if msg is "/도움말"
            replier.reply "[임시 팝콘봇]\n/팝콘 - 팝콘을 팔기 싫습니다.\n/콜라 - 콜라를 팔기 싫습니다.\n/팝콘 on - 팝콘봇 활성화.\n/팝콘 off - 팝콘봇 비활성화."
        else if msg is "/팝콘"
            rr = Math.floor Math.random() * 4
            if rr is 0
                replier.reply "또 오셨어요?"
                java.lang.Thread.sleep 1000
                replier.reply "저쪽에서 방해가 되지 않도록 잠자코 있으세요"
            else if rr is 1
                replier.reply "또 오셨어요? 앞으로 오지 마세요."
            else
                replier.reply "내가 먹을겁니다. 안팔아요."
        else if msg is "/콜라"
            rr = Math.floor Math.random() * 4
            if rr is 0
                replier.reply "혹시, 묶이는거 좋아하세요?"
            else if rr is 1
                replier.reply "꿀꿀 시끄럽네요."
            else
                replier.reply "내가 마실겁니다. 안팔아요."
