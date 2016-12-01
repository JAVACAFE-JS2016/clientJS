/** 사용자의 입력 제한하기
 * InputFilter : <input> 태그를 위해 키눌림을 걸러내는 무간섭 코드
 *
 * 이 모듈은 문서 내에서 비표준 어트리뷰트인 allowed라는 어트리뷰트를 가지는 <input type="text"> 엘리먼트를 모두 찾는다
 * 이 모듈은 사용자가 allowed 어트리뷰트의 값으로 설정된 문자만 입력할 수 있게 하기 위해
 * 엘리먼트에 onkeypress 이벤트 처리기를 등록한다
 * 만약 <input> 엘리먼트에 messageid라는 어트리뷰트도 있다면 이 어트리뷰트의 값을 다른 문서 엘리먼트의 id로 사용한다
 * 만약  사용자가 허용되지 않은 문자를 입력하면 messageid 엘리먼트를 보여 준다
 * 사용자가 허용된 문자를 입력하면 messageid 엘리먼트를 숨긴다
 * 이 messageid 엘리먼트는 사용자에게 키눌림이 제한된 이유를 설명하려는 것이다
 * 일반적으로 이 엘리먼트는 CSS를 사용하여 초기에는 보이지 않게 스타일을 지정해야 한다
 *
 * 사용 예
 *  Zipcode:
 *  <input id="zip" type="text" allowed="0123456789" messaeid="zipwarn">
 *  <span id="zipwarn" style="color:red;visibility:hidden">Digits only</span>
 *
 *  IE처럼 addEventListener를 지원하지 않는 브라우저에서는 이 모듈이 등록하는 keypress 처리기가
 *  HTML에서 정의한 keypress 처리기를 덮어쓴다
 *
 *  이 모듈은 무간섭 모듈이다
 *  즉 이 모듈은 전역 네임스페이스에 심벌을 정의하지 않는다
 */

(function(){    // 모듈 전체는 익명 함수 내에 위치
    // 문서가 로딩을 끝내면 init()함수를 호출
    if(window.addEventListener) window.addEventListener("load", init, false);
    else if(window.attachEvent) window.attachEvent("onload", init);

    // 이벤트 처리기를 등록해야 하는 모든 <input> 태그를 찾음
    function init(){
        var inputtags = document.getElementsByTagName("input");
        for(var i=0; i < inputtags.length; i++){
            var tag = inputtags[i];
            console.log(tag);
            if(tag.type != "text") continue;    // 텍스트 필드만 대상
            var allowed = tag.getAttribute("allowed");
            if(!allowed) continue;  // allowed 어트리뷰트가 있는 것만 대상

            // 이 <input> 태그에 이벤트 처리기를 등록
            if(tag.addEventListener)
                tag.addEventListener("keypress", filter, false);
            else {
                // attachEvent를 사용하면 처리기를 호출했을 때 this 키워드가 올바른 값을 가지지 않기 때문에 attachEvent는 사용 안함
                tag.onkeypress = filter;
            }

        }
    }

    // 사용자의 입력을 걸러내는 keypress 처리기
    function filter(event){
        // 이벤트 객체와 문자 코드를 호환 가능한 방식으로 얻는다
        var e = event || window.event;
        var code = e.charCode || e.keyCode;

        // 눌린 키가 기능키라면 걸러내지 않는다
        if(e.charCode == 0) return true;    // 기능키(파이어폭스의 경우만
        if(e.ctrlKey || e.altKey) return true;
        if(code <32) return true;   // ASCII 제어 문자

        // 입력 엘리먼트에서 필요한 정보를 찾음
        var allowed = this.getAttribute("allowed"); // 허용된 문자들
        var messageElement = null;  // 보여 주거나 숨길 메시지
        var messageId = this.getAttribute("messageid"); // 메시지 id
        if(messageId)
            messageElement = document.getElementId(messageId);

        // 문자 코드를 문자로 변환
        var c = String.fromCharCode(code);

        // 이 문자가 허용된 문자 집합에 속하는 지 체크
        if(allowed.indexOf(c) != -1){
            // c가 허용된 문자라면 메시지를 숨김
            if(messageElement) messageElement.style.visibility = "hidden";
            return true;
        }else{
            // c가 허용된 문자가 아닐 때
            if(messageElement) messageElement.style.visibility = "visible";
            // keypress 이벤트를 거부
            if(e.preventDefault()) e.preventDefault();
            if(e.returnValue) e.returnValue = false;
            return false;
        }

    }
})();
