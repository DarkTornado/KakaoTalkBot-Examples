# KakaoTalk Bot Examples Source
© 2018-2022 Dark Tornado, All rights reserved.

## 개요
 - 카카오톡 봇 예제 소스들입니다.

## 라이선스
- 소스 파일에 주석으로 명시되어있습니다.

## 호환성
 - 소스마다 다릅니다.
 - 어느 봇과 호환되는지는 주석에 쓰여있으며, 딱히 특별한 내용이 없다면 ~~해당 소스가 작성된 시점을 기준으로~~ 대부분의 카톡봇들과 호환된다는 뜻입니다.
 - 다음 앱들은 기본적으로 [만동이님이 만드신 카카오톡 봇](https://github.com/BackupDead/ScriptableKakaoBot)이 원작(?)입니다.
 
### [채팅 자동응답 봇](https://play.google.com/store/apps/details?id=com.darktornado.chatbot) (초록봇/닼토봇/채자봇)
 - Dark Tornado~~내~~가 만든 봇 구동 앱입니다.
 - 아이콘이 초록색인 앱입니다.
 - 자바스크립트와 커피스크립트, 루아, Visual Basic, 라코스크립트, IceBlock.js를 지원합니다. ~~단순 자동응답도 지원합니다~~
 - 패키지명이 수정된 카카오톡으로 봇을 돌리는 것을 지원합니다. 카카오톡 말고도 일부 다른 메신저들도 지원은 합니다.
 - 봇 여러개를 만들 수 있으며, 다른 봇에 있는 객체 및 단순 자동응답에 있는 변수에 에 접근할 수 있습니다.
 - 소스의 일부를 분리시킨 뒤, #include 전처리기를 사용하여 리로드 시 포함시킬 수 있습니다.
 - require(); 함수를 사용하여 모듈을 로드하여 사용할 수 있습니다.
 - Jsoup 라이브러리가 내장되어 있습니다.
 
### [Nusty](https://play.google.com/store/apps/details?id=com.darktornado.nusty) 내장 챗봇
- Nusty 안에 내장된 기능입니다.
- 채팅 자동응답 봇의 약간 상위호환이였던 자동응답 구동 기능으로, 경량화 버전인 [메신저 도구](https://github.com/DarkTornado/MessangerUtils)로 대체되었습니다.
- 지금은 더 경량화 버전으로 바뀌는 중입니다.
 
 ### [메신저봇R](https://play.google.com/store/apps/details?id=com.xfl.msgbot) (메봇/메봇R)
 - [Violet XF](https://blog.naver.com/mir99712)님이 만드신 봇 구동 앱으로, 메신저봇의 리펙토링 버전입니다.
 - 아이콘이 주황색같은 노란색인 앱입니다.
 - 자바스크립트를 지원하며, 카카오톡 말고도 일부 다른 메신저들도 지원합니다.
 - 패키지명이 수정된 카카오톡으로 봇을 돌리는 것을 지원합니다.
 - 봇 여러개를 만들 수 있으며, 다른 봇에 있는 객체에 접근할 수 있습니다.
 - require(); 함수를 사용하여 모듈을 로드하여 사용할 수 있습니다.
 - Jsoup 라이브러리가 내장되어 있습니다.
 
<s>
 
 ### [메신저봇](https://play.google.com/store/apps/details?id=com.xfl.kakaotalkbot) (바렛봇/메봇/구메봇)
 - [Violet XF](https://blog.naver.com/mir99712)님이 만드신 봇 구동 앱으로, 젤브봇이 기반입니다.
 - 아이콘이 파란색인 앱입니다.
 - 자바스크립트를 지원하며, 카카오톡 말고도 일부 다른 메신저들도 지원합니다.
 - 패키지명이 수정된 카카오톡으로 봇을 돌리는 것을 지원합니다.
 - 봇 여러개를 만들 수 있으며, 다른 봇에 있는 객체에 접근할 수 있습니다.
 - Jsoup 라이브러리가 내장되어 있습니다.
 - <b>더 이상 Play 스토어에 뜨지 않습니다.</b>

### [젤브봇](https://play.google.com/store/apps/details?id=be.zvz.newskbot)
 - [JellyBrick](https://github.com/JellyBrick)님이 만드신 카카오톡 봇 구동 앱입니다.
 - 아이콘이 보라색인 앱입니다.
 - 자바스크립트와 타입스크립트를 지원합니다.
 - 이벤트 리스너를 동적으로 등록 및 해제할 수 있으며, 수용봇용 소스를 구동할 수 있습니다.
 - <b>Play 스토어에서 사실상 삭제</b>
  
### [수용봇](https://play.google.com/store/apps/details?id=com.suyong.kakaobot)
 - [수용](https://github.com/Su-Yong)님이 만드신 카카오톡 봇 구동 앱입니다.
 - 아이콘이 거의 흰색입니다.
 - 자바스크립트를 지원합니다.
 - 이 봇에서 작동하는 소스는 여기서는 다루지 않습니다.
 - 봇 여러개를 만들 수 있습니다.
 - <b>Play 스토어에서 사실상 삭제</b>

### [넨카봇](https://play.google.com/store/apps/details?id=com.suyong.kakaobot)
 - [Nenka](https://github.com/NenkaLab)님이 만드신 카카오톡 봇 구동 앱으로, 수용봇이 기반입니다.
 - 아이콘이 거의 흰색입니다.
 - 자바스크립트를 지원합니다.
 - 이 봇에서 작동하는 소스는 여기서는 다루지 않습니다.
 - 봇 여러개를 만들 수 있습니다.
 - <b>Play 스토어에서 사실상 삭제</b>
 
</s>

## 기타
- [Fork 기능을 사용하지 않고, 이 repository의 소스를 훔쳐가서 만든 repository](https://github.com/jujinesy/DarkTornado_KakaoTalkBot-Examples)가 존재합니다.
- 훔쳐간 repository의 원본에 수정사항이 발생하면 본인의 repository도 수정하지만, 이런식으로 본인에게 불리한 내용이 작성되는 경우는 훔쳐간 repository에 반영하지 않습니다.
