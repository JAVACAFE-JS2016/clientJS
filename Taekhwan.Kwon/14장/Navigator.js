/**
 * navigator : Navigator 객체 브라우저의 버전 출력 가능한 데이터 포멧들의 목록 등 웹 브라우저 전반에 대한 정보
 * navigator.appName : 웹 브라우저의 간단한 이름
 * navigator.appVersion : 브라우저의 버전 숫자 또는 버전과 관련된 기타 정보
 * navigator.userAgent : 브라우저가 USER-AGENT HTTP 헤더에 넣어 전송하는 문자열
 * navigator.appCodeName : 브라우저의 코드 네임
 * navigator.platform : 브라우저가 실행되고 있는 하드웨어 플랫폼
 */

function navigatorInfo(){
    var brower = "BROWSER INFORMATION\n";
    for(var propname in window.navigator){
        brower += propname + ":" + navigator[propname] + "\n";
    }
    alert(brower);
}

/**
 * 브라우저 벤더와 버전 확인하기
 */
var brower = {
    version: parseInt(navigator.appVersion),
    isNetscape : navigator.appName.indexOf("Netscape") != -1,
    isMicrosoft : navigator.appName.indexOf("Microsoft") != -1
};