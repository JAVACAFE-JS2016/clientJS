/**
 * location : Window 객체의 프로퍼티 Location 객체를 가리키지만
 *            문자열 값을 지정하여 브라우저를 해당 URL로 이동이 가능함
 * history : 브라우저 창에 대한 History 객체를 가리킴
 *          History 객체의 배열 엘리먼트는 스크립트에서 절대로 접근 불가. 사생활 보호와 보완 때문
 *          back(), forward(), go() 지원
 */

function openNewDoc(){
    window.location = "http://www.google.com";

    return window.history;
}

function replaceDoc(){
    window.location.replace('./Basic.html');
    return window.history;
}