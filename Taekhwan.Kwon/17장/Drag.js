/**
 * 문서 엘리먼트 드래그하기.
 * Drag.js : 절대 위치로 지정된 HTML 엘리먼트를 드래그한다
 *
 * 이 모듈에는 onmousedown 이벤트 처리기에서 호출되도록 설계된 단일 drag() 함수가 정의됨
 * 앞으로 생성되는 연속된 mousemove 이벤트는 주어진 엘리먼트를 움직인다
 * mouseup 이벤트는 드래그를 중지시킨다
 * 엘리먼트가 화면 밖으로 드래그될 때는 창이 스크롤되지 않는다
 *
 *      elementToDrag : mousedown 이벤트를 전달받은 엘리먼트이거나 엘리먼트를 포함하는 엘리먼트
 *                     이 엘리먼트는 절대적인 위치로 지정되어야 한다
 *                     이 엘리먼 트의 style.left와 style.top 값은 사용자가 드래그할 때마다 바귄다
 *
 *                     // 엘리먼트를 현재 마우스 위치로 이동시킨다
 *                     // 이때, 처음 마우스를 클릭했을 때의 오프셋을 필요한 만큼 적용


 *      event : mousedown 이벤트에 대한 Event 객체
 *
 */
function drag(elementToDrag, event){
    // 드래그가 시작되는 마우스 위치창 기반 자표계
    var startX = event.clientX, startY = event.clientY;

    // 드래그 될 엘리먼트의 본래 위치(문서 기반 좌표계).
    // elementToDrag는 절대적인 위치를 가지기 때문에 offsetParent가 문서 몸체라고 가정
    var origX = elementToDrag.offsetLeft, origY = elementToDrag.offsetTop;

    // 자표가 다른 좌표계를 통해 계산되긴 하지만 좌표들의 차이를 계산해낼 수 있기 때문에 moveHandler() 함수에서 사용
    // 스크롤바의 위치는 드래그를 하는 동안 바뀌지 않기 때문에 문제 없이 작동
    var deltaX = startX - origX, deltaY = startY - origY;

    // mousedown 이벤트 후에 발생될 mousemove와 mouseup 이벤트에 반응할 이벤트 처리기들을 등록
    if(document.addEventListener){  // DOM 레벨 2 이벤트 모델
        // 포착 이벤트 처리기를 등록
        document.addEventListener("mousemove", moveHandler, true);
        document.addEventListener("mouseup", upHandler, true);
    }else if(document.attachEvent){ // IE 5 이상
        elementToDrag.setCature();
        elementToDrag.attachEvent("onmousemove", moveHandler);
        elementToDrag.attachEvent("onmouseup", upHandler);
        // 마우스 포착에 실패하면 mouseup 이벤트라고 간주
        elementToDrag.attachEvent("onlosecapture", upHandler);
    }else{ // IE 4
        // IE에서는 attachEvnet()나 setCapture()를 사용할 수 없기 때문에 Document 객체에 대해 이벤트 처리기를
        // 직접 설정하고 마우스 이벤트가 거품처럼 위로 올라가길 기대
        var oldmoveHandler = document.onmousemove;
        var olduphandler = document.onmouseup;
        document.onmousemove = moveHandler;
        document.onmouseup = upHandler;
    }

    // 이 이벤트는 이미 처리됨
    if(event.stopPropagation) event.stopPropagation();
    else event.cancelBubble = true; // IE

    // 기본 동작 수행을 금지
    if(event.preventDefault) event.preventDefault();
    else event.returnValue = false; // IE

    /**
     * 다음은 엘리먼트가 드래그될 때 mousemove 이벤트를 감지하는 이벤트 처리기
     * 이 처리기가 하는 일은 엘리먼트를 이동시키는 것
     *
     */
    function moveHandler(e){
        if(!e) e= window.event;   // IE 이벤트 모델

        // 엘리먼트를 현재 마우스 위치로 이동시킨다
        // 이때, 처음 마우스를 클릭했을 때의 오프셋을 필요한 만큼 적용
        elementToDrag.style.left = (e.clientX - deltaX) + "px";
        elementToDrag.style.top = (e.clientY - deltaY) + "px";

        // 다른 쪽에서 이 이벤트를 볼 수 없게 함
        if(e.stopPropagation) e.stopPropagation();
        else e.cancelBubble;
    }

    /**
     * 다음은 드래그가 끝났을 때 발생하는 mouseup 이벤트를 포착하는 이벤트 처리기
     */
    function upHandler(e){
        if(!e) e = window.event;    // IE

        // 포착 이벤트 처리기를 등록 취소
        if (document.removeEventListener){ // DOM
            document.removeEventListener("mouseup", upHandler, true);
            document.removeEventListener("mousemove", moveHandler, true);

        }else if(document.detachEvent) {    // IE 5와 그 이후
            elementToDrag.detachEvent("onlosecapture", upHandler);
            elementToDrag.detachEvent("onmouseup", upHandler);
            elementToDrag.detachEvent("onmousemove", moveHandler);
            elementToDrag.releaseCapture();
        }else{  // IE 4
            // 원본 처리기가 존재하면 이를 복구
            docuemnt.onmouseup = olduphandler;
            document.onmousemove = oldmoveHandler;
        }

        // 이벤트가 더 전파되지 ㅇ낳게 한다
        if(e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;
    }

}