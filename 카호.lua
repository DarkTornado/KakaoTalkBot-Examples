--[[
카호
version 1.0
© 2018 Dark Tornado, All rights reserved.

Dark Tornado가 만든 카카오톡 봇과 호환됩니다.

카호에는 MIT License가 적용되어있습니다.

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
]]

sdcard = File.getSdcardPath()
preChat = {}
botOn = {}
version = "1.0"
chatLog = {}
kill = false

function readChat(room, name, manual)
    if manual then
        return File.read(sdcard .. "/Kaho_Learn/" .. room .. "/" .. name .. ".txt")
    else
        return File.read(sdcard .. "/Kaho/" .. room .. "/" .. name .. ".txt")
    end
end

function saveChat(room, name, value, manual)
    if manual then
        File.createFolder(sdcard .. "/Kaho_Learn/" .. room)
        File.save(sdcard .. "/Kaho_Learn/" .. room .. "/" .. name .. ".txt", value)
    else
        File.createFolder(sdcard .. "/Kaho/" .. room)
        File.save(sdcard .. "/Kaho/" .. room .. "/" .. name .. ".txt", value)
    end
end

function getChatCount(room, manual)
    if manual then
        return File.getFileCount(sdcard .. "/Kaho_Learn/" .. room)
    else
        return File.getFileCount(sdcard .. "/Kaho/" .. room)
    end
end

function isAdmin(name)
    if name == "여기다가 관리자 닉네임 입력" then
        return true
    else
        return false
    end
end

function onLoaded()
    File.createFolder(sdcard .. "/Kaho/")
    File.createFolder(sdcard .. "/Kaho_Learn/")
end

function response(room, msg, sender, isGroupChat, replier, ImageDB)
    --관리자용 명령어
    if isAdmin(sender) then
        procCmd(room, msg, sender, replier)
    end
    
    --관리자용 on/off
    if(kill) then
        return
    end
    
    --단체 채팅방에서만 작동
    if isGroupChat == false then
        return
    end
    
    --도배 방지
    if preChat[room] == msg then
        return
    end
    
    --자동 활성화
    if botOn[room] == nil then
        botOn[room] = true
    end
    
    --명령어 (봇이 꺼져있어도 작동)
    if msg == "/카호" then
        replier:reply("봇 이름 : 카호\n버전 : " .. version .. "\n제작자 : Dark Tornado\n라이선스 : MIT License\n수동학습 DB : " .. getChatCount(room, true) .. "개\n자동학습 DB : " .. getChatCount(room) .. "개")
    end
    if msg == "/k on" then
        replier:reply("카호 활성화")
        botOn[room] = true
    elseif msg == "/k off" then
        replier:reply("카호 비활성화")
        botOn[room] = false
    end
    
    --봇이 꺼져있으면 이 이하는 작동 X
    if botOn[room] == false then
        return
    end
    
    --명령어 (봇이 켜져있어야 작동)
    local cmd = msg:split(" ")[1]
    local data = msg:gsub(cmd .. " ", "")
    
    if msg == "/도움말" then
        local rr = math.random(0, 3)
        if rr == 0 then
            replier:reply("내..내가 왜 너를 도와주어야 하지?")
        else
            replier:reply("봇 이름 : 카호\n버전 : " .. version .. "\n제작자 : Dark Tornado\n\n 갑자기 삘이 와서 대충(?) 만든 봇입니다. 동일한 채팅이 두 번 이상 연속으로 수신되면 도배로 간주, 가볍게 무시합니다.\n 명령어 목록은 '/카호 명령어'를 사용해주세요.")
        end
    end
    if msg == "/카호 명령어" then
        local rr = math.random(0, 3)
        if rr == 0 then
            replier:reply("내..내가 왜 명령어를 알려주어야 하지?")
        else
            replier:reply("[카호 명령어 목록]" .. Utils.compress() .. "\n\n/카호 : 생존 확인용 명령어(?)입니다.\n/도움말 : 도움말 같은걸 띄웁니다.\n/검색 [검색어] : 해당 검색어를 네이버에 검색해줄지도 모릅니다.\n/따라하기 [따라할 말] : 해당 말을 따라할지도 모릅니다.\n가르치기 [질문]=[대답] : 특정 말을 가르칩니다.\n/k on : 카호 활성화\n/k off : 카호 비활성화\n/log : 카호가 떠든 로그 확인\n/DB : 카호가 얼마나 많이 배웠는지 확인.")
        end
    end
    if cmd == "/검색" then
        replier:reply("따..딱히 찾아주고 싶지는 않지만, 일이니까...\nhttps://m.search.naver.com/search.naver?query=" .. data:gsub(" ", "%%20"))
    end
    if cmd == "/따라하기" then
        local rr = math.random(0, 3)
        if rr == 0 then
            replier:reply("내, 내가 왜 너의 말을 따라해야 하지..?")
        else
            replier:reply(data)
            if chatLog[room] == nil then
                chatLog[room] = "sender: " .. sender .. "\nmsg: " .. msg .. "\nreply: " .. data .. "\ntype: 따라하기"
            else
                chatLog[room] = chatLog[room] .. "\n\nsender: " .. sender .. "\nmsg: " .. msg .. "\nreply: " .. data .. "\ntype: 따라하기"
            end
        end
    end
    
    if msg == "/DB" then
        replier:reply("수동학습 DB : " .. getChatCount(room, true) .. "개\n자동학습 DB : " .. getChatCount(room) .. "개")
    end
    if msg == "/log" then
        if chatLog[room] == nil then
            replier:reply("저장된 로그가 없습니다.")
        else
            replier:reply("[Kaho Log]" .. Utils.compress() .. "\n\n" .. chatLog[room])
        end
    end
    
    --수동 학습 (배우는 부분)
    if cmd == "/가르치기" then
        local chat = data:split("=")
        saveData(room, chat[1], chat[2], true)
        replier:reply(chat[1] .. "(이)라고 하면, " .. chat[2] .. "(이)라고 하도록 배웠습니다.")
    end
    
    --본인 이름 부르면 반응
    if msg == "카호" then
        local rr = math.random(0, 3)
        if rr == 0 then
            replier:reply("따, 딱히 걱정 같은 거 한 적 없거든!")
        elseif rr == 1 then
            replier:reply("너희한테 반응 같은 걸... 할 리가 없잖아.")
        elseif rr == 2 then
            replier:reply("Sweet!")
        end
    end
    
    --자동 학습 (반응 안할 것들 거르는 부분)
    local skip = {"사진", "동영상", "(이모티콘)", "음성메시지", "카카오톡 프로필"}
    for n = 1, 5, 1 do
        if msg == skip[n] then
            return
        end
    end
    
    --자동 학습 (배우는 부분)
    if preChat[room] ~= nil then
        saveChat(room, preChat[room], msg)
    end
    
    --수동 학습 (말하는 부분)
    local noReplied = true
    if math.random(0, 3) == 0 then
        local chat = readChat(room, msg, true)
        if chat ~= nil then
            replier:reply(chat)
            if chatLog[room] == nil then
                chatLog[room] = "sender: " .. sender .. "\nmsg: " .. msg .. "\nreply: " .. chat .. "\ntype: 수동 학습"
            else
                chatLog[room] = chatLog[room] .. "\n\nsender: " .. sender .. "\nmsg: " .. msg .. "\nreply: " .. chat .. "\ntype: 수동 학습"
            end
        end
    end
    
    --자동 학습 (말하는 부분)
    if noReplied and math.random(0, 19) == 0 then
        local chat = readChat(room, msg)
        if chat ~= nil then
            replier:reply(chat)
            if chatLog[room] == nil then
                chatLog[room] = "sender: " .. sender .. "\nmsg: " .. msg .. "\nreply: " .. chat .. "\ntype: 자동 학습"
            else
                chatLog[room] = chatLog[room] .. "\n\nsender: " .. sender .. "\nmsg: " .. msg .. "\nreply: " .. chat .. "\ntype: 자동 학습"
            end
        end
    end
    
    --나머지
    preChat[room] = msg
    
end

function procCmd(room, msg, sender, replier)
    if msg == "/kill" then
        kill = true
        replier.reply("카호 사망")
    end
    if msg == "/revival" then
        kill = false
        replier.reply("카호 부활")
    end
end

