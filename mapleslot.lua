-- 777은 안나오는 메이플식 슬롯머신

function response(room, msg, sender, isGroupChat, replier)
    if msg == "/슬롯머신" then
        local num = math.random(1, 7).." "..math.random(1, 7)
        if num == "7 7" then
            replier:reply("결과: "..num.." "..math.random(1, 6))
        else
            replier:reply("결과: "..num.." "..math.random(1, 7))
        end
    end
end
