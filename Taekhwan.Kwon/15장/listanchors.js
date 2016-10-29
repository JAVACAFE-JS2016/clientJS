/**
	listanchors.js : document.anchors[]를 사용하여 간단한 목차 생성
	
	listanchors() 함수는 문서를 전달인자로 받고, 그 문서의 탐색 창 역할을 하는 새로운 창을 생성. 새로운 창은 문서 내에 있는 모든 앵커의 목록을 출력
	목록에 있는 앵커를 클릭하면 해당 앵커가 있는 곳으로 문서가 스크롤됨
*/
debugger;
function listanchors(d) {
	// 새로운 창을 연다
	var newwin = window.open("", "navwin", "menubar=yes,scrollbars=yes,resizable=yes,width=500,height=300");
	
	// 창의 제목을 정의
	newwin.document.write("<h1>Navigation Window: " + document.title + "</h1>");
	
	// 모든 앵커를 나열
	for(var i = 0; i < document.anchors.length; i++){
		// 각 앵커 객체가 출력할 텍스트를 결정
		// 먼저, 브라우저에 따라 다를지도 모를 프로퍼티를 사용하여
		// <a>와 </a> 사이에 있는 텍스트를 얻는다
		// 이 텍스트가 없으면 대신 name의 값을 사용
		var a = document.anchors[i];
		var text = null;
		if (a.text) text = a.text;
		else if (a.innerText) text = a.innerText;
		if (( text == null) || (text == '')) text = a.name;
		
		// 얻은 텍스트를 링크로 출력. 이 링크의 href 프로퍼티는 사용되지 않는다.
		// onclick 처리기는 화면을 움직여서 이름 붙은 앵커를 출력
		// 기존 창의 location.hash 프로퍼티를 설정하는 작업을 수행
		// Window.opener와 Window.location, Location.hash, Link.onclick을 보라
		newwin.document.write('<a href="#' + a.name + '"' + ' onclick="opener.location.hash=\'' + a.name + '\'; return false;">');
		newwin.document.write(text);
		newwin.document.write('</a><br>');
	}
	newwin.document.close(); //문서를 반드시 닫는다.
}
//listanchors(document)