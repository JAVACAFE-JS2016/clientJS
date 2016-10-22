/**
 * URL에서 전달인자 추출하기
 * location : Location 객체에 대한 참조. Location 객체는 현재 창 안에 표시된 문서의 URL을 나타냄
 * location.search : URL의 질의 문자열의 ?로 시작하는 부분이 있다면 그 부분을 저장
 */

function getArgs(){
    var args = new Object();
    var query = location.search.substring(1);       // 질의 문자열을 얻어온다
    var pairs = query.split("&");                   // & 위치에서 분리한다
    for(var i=0; i< pairs.length;i++){
        var pos = pairs[i].indexOf('=');            // "이름=값"을 찾는다
        if(pos == -1 ) continue;                    // 찾지 못했다면 건너뛴다
        var argname = pairs[i].substring(0,pos);    // 이름을 추출한다
        var value = pairs[i].substring(pos + 1);    // 값을 추출한다
        value = decodeURIComponent(value);          // 필요하다면 디코딩을 수행한다
        args[argname] = value;                      // 객체의 프로퍼티를 저장한다
    }
    return args;
}