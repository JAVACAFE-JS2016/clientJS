/**
 * Created by kwon on 2016. 10. 21..
 */
var WastedTime = {
    start: new Date(),  // 시작한 시간을 기억
    displayElapsedTime: function(){
        var now = new Date();   // 지금 시간
        // 경과 시간
        var elapsed = Math.round((now - WastedTime.start)/60000);
        //상태 표시줄 출력
        window.defaultStatus = "You have wasted " + elapsed + " minutes.";
    }
}
setInterval(WastedTime.displayElapsedTime, 60000);