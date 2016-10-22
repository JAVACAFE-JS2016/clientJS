/**
 * Created by kwon on 2016. 10. 21..
 */

var bounce = {
    x:0, y:0, w:200, h:200, // 창 위치와 크기
    dx:5, dy:5,             // 창 이동 속도
    interval : 100,         // 밀리 초로 표시된 갱신 주기
    win: null,              // 생성할 창
    timer: null,            // setInterval()의 반환값

    // 애니메이션 시작
    start: function() {
        // 창을 화면의 정중앙에서 시작
        bounce.x = (screen.width - bounce.w) / 2;
        bounce.y = (screen.height - bounce.h) / 2;

        // 앞으로 화면 위를 배회하게 만들 창을 생성
        // javascript: URL은 짧은 문서를 표시하기 위한 방도로 사용
        // 마지막 전달인자가 창 크기를 지정
        bounce.win = window.open('javascript:"<h1>BOUNCE!</h1>"', "",
            "left=" + bounce.x + ",top=" + bounce.y +
            ",width=" + bounce.w + ",height=" + bounce.h +
            ",status=yes");

        // setInterval()을 사용하여 nextFrame() 메소드를 매 주기마다 호출
        // 반환값을 저장해 둠으로써 후에 이를 clearInterval()에 전달하여 애니메이션을 중지
        bounce.timer = setInterval(bounce.nextFrame, bounce.interval);

    },
    // 애니메이션 중지
    stop: function(){
        clearInterval(bounce.timer);
        if(!bounce.win.closed) bounce.win.close();
    },

    // 애니메이션의 다음 프레임을 표시
    nextFrame: function(){
        // 만약 사용자가 창을 닫으면 애니메이션 중지
        if(bounce.win.closed){
            clearInterval(bounce.timer);
            return;
        }

        //화면의 우측 또는 좌측 모서리에 닿으면 반대로 튀어 나옴
        if((bounce.x+bounce.dx > (screen.availWidth - bounce.w)) ||
        (bounce.x+bounce.dx < 0))
            bounce.dx = -bounce.dx;

        // 화면의 바닥 또는 천장 모서리에 닿으면 반대로 뛰어 나옴
        if((bounce.y + bounce.dy > (screen.availHeight - bounce.h)) || (bounce.dy <0))
            bounce.dy = -bounce.dy;

        //창의 현재 위치를 변경
        bounce.x += bounce.dx;
        bounce.y += bounce.dy;

        // 창의 새로운 위치로 이동
        bounce.win.moveTo(bounce.x,bounce.y);

        // 창의 현재 위치를 상태 표시줄에 나타낸다
        bounce.win.defaultStatus = "(" + bounce.x + "," + bounce.y +")";
    }

}