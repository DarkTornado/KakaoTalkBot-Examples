/*
군가 노래방 번호
© 2019 Dark Tornado, All rights reserved.
모든 카톡봇에서 돌아가는 소스로, 자바스크립트로 작성되어있습니다.
*/

const WarSong = {};
WarSong.list = {};
WarSong.list["가자! 가자!"] = [15212, 69565];
WarSong.list["검은 베레모"] = [null, 86088];
WarSong.list["공군가"] = [5059, 4574];
WarSong.list["나가자 해병대"] = [16639, 4577];
WarSong.list["나의 전우야"] = [15211, 69566];
WarSong.list["너를 사랑해 나를 사랑해"] = [15210, 69567];
WarSong.list["대한민국상이군경회가"] = [5015, 4689];
WarSong.list["멸공의 횃불"] = [39302, 1741];
WarSong.list["민방위의 노래"] = [19122, 4584];
WarSong.list["부라보해병"] = [5063, null];
WarSong.list["예비군가"] = [5056, null];
WarSong.list["육군가"] = [18189, 1731];
WarSong.list["전선을 간다"] = [null, 1730];
WarSong.list["진군가"] = [18861, 1729];
WarSong.list["진짜 사나이"] = [5051, 1759];
WarSong.list["친구가 불러주는 진짜사나이"] = [15213, 69568];
WarSong.list["해군가"] = [18188, 4573];
WarSong.list["해병가"] = [13298, 3835];
WarSong.list["해병대의노래"] = [5060, null];
WarSong.list["행군의 아침"] = [19124, null];
WarSong.list["휘날리는 태극기"] = [19123, 1740];

WarSong.search = function(str) {
    var result = [];
    for (var key in WarSong.list) {
        if (key.includes(str)) result.push("[" + key + "]\n금영 : " + (WarSong.list[key][1] != null ? WarSong.list[key][1] : "정보없음") + "\n태진 : " + (WarSong.list[key][0] != null ? WarSong.list[key][0] : "정보없음"));
    }
    if (result.length == 0) return null;
    return result;
};

function response(room, msg, sender, isGroupChat, replier, ImageDB) {
    msg = msg.trim();
    var cmd = msg.split(" ")[0];
    var data = msg.replace(cmd + " ", "");
    if (cmd == "/군가") {
        var result = WarSong.search(data);
        if (result == null) replier.reply("검색 결과가 없습니다.");
        else replier.reply("검색 결과가 " + result.length + "개 있습니다.\n\n" + result.join("\n\n"));
    }
}

