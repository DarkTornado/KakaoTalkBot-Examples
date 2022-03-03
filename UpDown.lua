--[[
업다운 미니게임
© 2022 Dark Tornado, All rights reserved.
라이선스 : CCL BY-NC 4.0
]]

number = -1

function response(room, msg, sender, isGroupChat, replier)
    cmd = msg:split(' ')
    
    if cmd[1] == '/업다운시작' then
        if number > 0 then
            replier:reply('이미 업다운 게임이 진행중이에요.')
        else
            local max = tonumber(cmd[2])
            if max <= 0 then
                max = 100
            end
            number = math.random(1, max)
            replier:reply('업다운 게임이 시작되었어요.\n범위 : 1 ~ ' .. max)
        end
    end

    if msg == '/업다운종료' then
        if number > 0 then
            replier:reply('업다운 게임을 종료했어요.')
            number = -1;
        else
            replier:reply('진행중인 업다운 게임이 없어요.')
        end
    end

    if msg == '/업다운도움말' then
        replier:reply('[업다운 게임 도움말]\n' ..
            '/업다운시작 [수] - 업다운 게임을 시작해요.\n' ..
            '/업다운종료 - 진행 중인 업다운 게임을 멈줘요.\n' ..
            '/업다운 [수] - 해당 수가 정답인지 확인해요.\n' ..
            '/업다운정답 - 업다운 정답을 출력하고 진행 중인 업다운 게임을 멈줘요.')
    end

    if cmd[1] == '/업다운' then
        local input = tonumber(cmd[2])
        if number == input then
            number = -1
            replier:reply(sender .. '님이 정답을 맟주어, 업다운 게임이 종료되었어요.')
        elseif number > input then
            replier:reply('업')
        else 
            replier:reply('다운')
        end
    end
    
    if msg == '/업다운정답' then
        if number > 0 then
            replier:reply('정답은 ' .. number .. '(이)였어요.\n업다운 게임을 종료했어요.')
            number = -1;
        else
            replier:reply('진행중인 업다운 게임이 없어요.')
        end
    end
end
