/**
		프로퍼티를 통한 이벤트 처리기 설정
		장점
		1. 자바스크립트 코드와 HTML이 서로 섞이지 않음
		2. 이벤트 처리기 함수를 동적으로 만들 수 있음
		단점
		1. 이벤트 처리기를 자신이 속한 엘리먼트에서 분리시킴
*/

function confirmLink(){
	return confirm("Do you really want to visit " + this.href + "?");
}

function confirmAllLinks(){
	for(var i=0; i< document.links.length; i++){
		document.links[i].onclick = confirmLink;
	}
}

// document.links[i].onclick(); // 이벤트 처리기를 직접 호출 가능