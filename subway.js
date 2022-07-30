/*
다음에서 전철 도착정보 뜯어오기
© 2022 Dark Tornado, All rights reserved.
라이선스 : CCL BY-NC 4.0 (저작자 표시 필수, 비영리 사용만 허용)
*/

const getStationArrival = (input) => {
    const url = 'https://m.search.daum.net/search?w=tot&q=' + input.replace(/ /g, '%20');
    let data = org.jsoup.Jsoup.connect(url).get();
    data = data.select('div.area_info');
    const result = [];
    for (let n = 0; n < 2; n++) {
        let datum = data.get(n);
        Log.i(data.get(n))
        let dir = datum.select('strong').text().trim();
        if (dir == '-') continue;
        if (dir.endsWith('행')) dir = dir.slice(0, -1) + ' 방면'
        let time = datum.select('span.wsn').get(n).text().trim();
        result.push(dir + ' : ' + time);
    }
    return result.join('\n');
};

const response = (room, msg, sender, isGroupChat, replier) => {
    const cmd = msg.split(' ')[0];
    const data = msg.replace(cmd + ' ', '');
    if (cmd == '/전철') {
        const result = getStationArrival(data);
        if (result == null) replier.reply('해당 역을 찾을 수 없거나, 운행 정보를 찾을 수 없어요');
        else replier.reply('[' + data + ' 도착 정보]\n\n' + result);
    }
};

