/**
 * Geometry.js : 창 문서의 위치와 크기를 알기 위한 이식 가능한 함수
 *
 * 이 모듈은 창 문서의 위치와 크기를 알기 위한 함수들을 정의한다
 *
 * getWindowX/Y() : 화면 상에서 브라우저 창이 띄워진 위치를 반환
 * getViewportWidth/Height() : 브라우저의 뷰포트 영역의 크기를 반환
 * getDocumentWidth/Height() : 문서의 크기를 반환
 * getHorizontalScroll() : 수평 스크롤바의 위치를 반환
 * getVerticalScroll() : 수직 스크롤바의 위치를 반환
 *
 * 중요 : 이 모듈들을 문서의 <head> 부분 대신 <body> 부분에 포함되어야 함
 *
 */

var Geometry = {};

if (window.screenLeft){
    Geometry.getWindowX = function() { return window.screenLeft;};
    Geometry.getWindowY = function() { return window.screenTop;};
}else if(window.screenX) { // 파이어폭스 등의 브라우저
    Geometry.getWindowX = function() { return window.screenX;};
    Geometry.getWindowY = function() { return window.screenY;};
}

if (window.innerWidth){ // IE를 제외한 모든 브라우저
    Geometry.getViewportWidth = function() { return window.innerWidth;};
    Geometry.getViewportHeight = function() { return window.innerHeight;};
    Geometry.getHorizontalScroll = function() { return window.pageXOffset;};
    Geometry.getVerticalScroll = function() { return window.pageYOffset;};

}else if(document.documentElement && document.documentElement.clientWidth){ // DOCTYPE이 존재할 때의 IE 6
    Geometry.getViewportWidth = function() { return document.documentElement.clientWidth;};
    Geometry.getViewportHeight = function() { return document.documentElement.clientHeight;};
    Geometry.getHorizontalScroll = function() { return document.documentElement.scrollLeft;};
    Geometry.getVerticalScroll = function() { return document.documentElement.scrollTop;};
}else if(document.body.clientWidth){ // IE4, IE5, DOCTYPE이 없는 IE 6
    Geometry.getViewportWidth = function() { return document.body.clientWidth;};
    Geometry.getViewportHeight = function() { return document.body.clientHeight;};
    Geometry.getHorizontalScroll = function() { return document.body.scrollLeft;};
    Geometry.getVerticalScroll = function() { return document.body.scrollTop;};
}

// 이 함수는 문서의 크기를 반환
if(document.documentElement && document.documentElement.scrollWidth){
    Geometry.getDocumentWidth = function() { document.documentElement.scrollWidth;};
    Geometry.getDocumentHeight = function() { document.documentElement.scrollHeight;};
}else if(document.body.scrollWidth){
    Geometry.getDocumentWidth = function() { return document.body.scrollWidth;};
    Geometry.getDocumentHeight = function() { return document.body.scrollHeight;};
}
