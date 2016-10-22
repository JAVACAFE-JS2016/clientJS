/**
 * 탐색 표시줄에 붙은 Back 버튼을 클릭했을 때 호출
 */
function back(){
    //폼의 URL 입력 필드를 비움
    document.navbar.url.value ="";

    // 이전 페이지로 이동하기 위해 "main" 프레임의 History 객체를 사용
    // 동일 출처 정책의 훼방을 경계
    try{
        parent.main.history.back();
    }catch(e){
        alert("동일 출처 정책이 History.back() 호출을 차단했습니다: " + e.message);
    }

    /*
     할 수 있다면 뒤로 이동한 문서의 URL을 표시
     updateURL() 함수가 성공적으로 호출되도록 이 함수의 호출을 뒤로 미룸
     */
    setTimeout(updateURL, 1000);

}
/**
 * 탐색 표시줄에 붙은 Forward 버튼을 클릭했을 때 호출
 */
function forward(){
    document.navbar.url.value ="";
    try{
        parent.main.history.forward();
    }catch(e) {
        alert("동일출처 정책이 History.forward() 호출을 차단했습니다: "+ e.message);
    }
    setTimeout(updateURL, 1000);
}

/**
 *  updateURL()은 URL 텍스트 입력 필드를 갱신하며 back()과 forward()에 의해 사용됨
 동일 출처 정책에 의해 main 프레임의 location 프로퍼티에 접근하는 것이 실패할 수 있음
 */
function updateURL(){
    try{
        document.navbar.url.value = parent.main.location.href;
    }catch(e){
        document.navbar.url.value = "<동일 출처 정책에 의해 URL 접근이 거부되었음>";
    }
}

/**
 *  URL이 "http://"로 시작하지 않을 때 이를 덧붙여주기 위함 함수
 */
function fixup(url){
    if(url.substring(0,7) != "http://") url = "http://" + url;
    return url;
}

/**
 * 탐색 표시줄의 GO 버튼에 의해 호출되거나 사용자가 폼을 제출할 때 호출
 */
function go(){
    // 지정된 URL의 문서를 main 프레임 안으로 불러옴
    parent.main.location = fixup(document.navbar.url.value);
    // 해당 행위는 거절 당함 : Refused to display 'http://www.naver.com/' in a frame because it set 'X-Frame-Options' to 'SAMEORIGIN'.
}

/**
 * 사용자가 지정한 URL을 새 창에 표시
 */
function displayInNewWindow(){
    /*
     여기서 일반적인 모든 요소를 지닌 창을 열게 됨
     open()에는 단순히 URL 전달인자만을 넘겨준다 이 창이 한번 여리고 나면
     탐색 표시줄은 이 창에 대해 어떠한 제어도 할 수 없음
     */
    window.open(fixup(document.navbar.url.value));
}