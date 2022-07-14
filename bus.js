/*
카카오맵에서 버스 위치 뜯어오기
© 2022 Dark Tornado, All rights reserved.
라이선스 : CCL BY-NC 4.0 (저작자 표시 필수, 비영리 사용만 허용)
*/

function Bus(bus) {
    this.bus = bus;
    this.id = getBusId();

    function getBusId() {
        try {
            const url = 'https://m.map.kakao.com/actions/searchView?q=' + encodeURI(bus + ' 버스');
            const data = Utils.parse(url);
            const busId = data.select('div.search_result_bus_body').select('li').attr('data-id');
            return busId;
        } catch (e) {
            Log.e(e);
            return null;
        }
    }
}

Bus.prototype = {};
Bus.prototype.getBusId = function() {
    return this.id;
};
Bus.prototype.getLocation = function() {
    try {
        const url = 'https://m.map.kakao.com/actions/busDetailInfo?busId=' + this.id + '&q=' + this.bus;
        let data = Utils.parse(url);
        data = data.select('ul.list_situation').select('span.screen_out');
        const result = [];
        for (let n = 0; n < data.size(); n++) {
            let datum = data.get(n).text().split(':');
            result[n] = datum[1].split(', ')[0].trim() + '\n ┗ 정류장 ID: ' + datum[2].trim();
        }
        return result;
    } catch (e) {
        Log.e(e);
        return null;
    }
};

function response(room, msg, sender, isGroupChat, replier) {
    const cmd = msg.split(' ')[0];
    const data = msg.replace(cmd + ' ', '');
    if (cmd === '/버스') {
        const bus = new Bus(data);
        if (bus.getBusId() === null) {
            replier.reply('해당 버스를 찾을 수 없어요');
        } else {
            const result = bus.getLocation();
            if (result.length == 0) replier.reply('운행중인 버스가 없어요');
            else replier.reply('[' + data + ' 버스 정보]\n\n' + result.join('\n\n'));
        }
    }
}

