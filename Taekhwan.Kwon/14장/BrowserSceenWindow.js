/**
 * Window
 * screen : 사용자의 디스플레이 해상도와 표현 가능한 색 수 등의 정보를 담은 Screen 객체
 *
 * 화면좌표(screen coordinates) : 데스크탑 상에서 브라우저 창이 떠 있는 위치 좌측 상단 모서리에서 상대적으로 계산
 * 창 좌표(window coordinates) : 웹 브라우저의 뷰포트 안의 위치 뷰포트의 좌측 상단 모서리에서 상대적으로 계산
 * 문서 좌표(document coordinates) : HTML 문서 안의 위치 문서의 좌측 상단 모서리에서 상태적으로 계산
 *                              문서가 화면 표시 영역보다 길거나 넓을 수 있음 이 경우 스크롤바 필요
 *
 * getWindowX/Y : 화면 상의 브라우저 창이 띄워진 위치를 반환
 * getViewportWidth/Height : 브라우저의 뷰포트 영역(화상 표시 영역)의 크기 반환
 * getDocumentWidth/Height : 문서의 크기를 반환
 * getHorizontalScroll : 수평 스크롤바의 위치를 반환
 * getVerticalScroll : 수직 스크롤바의 위치를 반환
 *
 * 브라우저의 종류에 상관없이 브라우저 창의 크기를 반환하기 위한 방법은 없음
 */

var Geometry = {};

if(window.screenLeft) { // IE 등의 브라우저
    Geometry.getWindowX = function(){ return window.screenLeft;};
    Geometry.getWindowY = function(){ return window.screenTop;};

}else if(window.screenX){ // 파이어폭스 등의 브라우저
    Geometry.getWindowX = function(){ return window.screenX;};
    Geometry.getWindowY = function(){ return window.screenY;};
}

if (window.innerWidth){ // IE를 제외한 모든 브라우저
    Geometry.getViewportWidth       = function() {return window.innerWidth;};
    Geometry.getViewportHeight      = function() {return window.innerHeight;};
    Geometry.getHorizontalScroll    = function() {return window.pageXOffset;};
    Geometry.getVerticalScroll      = function() {return window.pageYOffset;};
}else if(document.documentElement && document.documentElement.clientWidth){
    // DOCTYPE이 존재할 때의 IE6
    Geometry.getViewportWidth       = function() {return document.documentElement.clientWidth;};
    Geometry.getViewportHeight      = function() {return document.documentElement.clientHeight;};
    Geometry.getHorizontalScroll    = function() {return document.documentElement.scrollLeft;};
    Geometry.getVerticalScroll      = function() {return document.documentElement.scrollTop;};
}else if(document.body.clientWidth){
    // IE4, IE5, DOCTYPE이 없을 때의 IE6
    Geometry.getViewportWidth       = function() {return document.body.clientWidth;};
    Geometry.getViewportHeight      = function() {return document.body.clientHeight;};
    Geometry.getHorizontalScroll    = function() {return document.body.scrollLeft;};
    Geometry.getVerticalScroll      = function() {return document.body.scrollTop;};

}
// 이 함수는 문서의 크기를 반환
// 브라우저 창과 직접적으로 관련이 있는 것은 아니지만 이곳에 함께 정의하는 것이 유용
if(document.documentElement && document.documentElement.scrollWidth){
    Geometry.getDocumentWidth   = function() {return document.documentElement.scrollWidth;};
    Geometry.getDocumentHeight  = function() {return document.documentElement.scrollHeight;};
}else if(document.body.scrollWidth){
    Geometry.getDocumentWidth   = function() {return document.body.scrollWidth;};
    Geometry.getDocumentHeight  = function() {return document.body.scrollHeight;};
}
