/*
기기에 저장된 연락처 목록 가지고오기
© 2021 Dark Tornado, All rights reserved.
라이선스 : CCL BY-NC 4.0
Nusty의 부가 기능인 메신저 도구에서 구동되는 소스입니다.
*/

getAllContact = () => {
    var cursor = Api.getContext().getContentResolver().query(android.provider.ContactsContract.CommonDataKinds.Phone.CONTENT_URI, null, null, null, null);
    var result = [];
    cursor.moveToFirst();
    var data = {};
    data.name = cursor.getString(cursor.getColumnIndex(android.provider.ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME));
    data.number = cursor.getString(cursor.getColumnIndex(android.provider.ContactsContract.CommonDataKinds.Phone.NUMBER));
    result.push(data);
    while (cursor.moveToNext()) {
        var data = {};
        data.name = cursor.getString(cursor.getColumnIndex(android.provider.ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME));
        data.number = cursor.getString(cursor.getColumnIndex(android.provider.ContactsContract.CommonDataKinds.Phone.NUMBER));
        result.push(data);
    }
    return result;
}
