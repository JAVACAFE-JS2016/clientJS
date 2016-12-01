/**
*	runOnLoad.js : onload 이벤트 처리기를 위한 호환 가능한 등록
*
*	DOM을 사용할 수 있고 문서가 완전히 로딩된 환경에서 
*	안전하게 호출할 수 있는 함수를 등록하기 위한 호환 가능한 runOnLoad() 함수
*
*	runOnLoad()를 통해 등록된 함수는 호출 시에 아무런 전달이자도 받지 않는다.
* 이러한 함수는 의미 있는 개체의 메서드로 호출되지도 않고, this 키워드도 사용되지 않는다.
*	runOnLoad()를 통해 등록된 함수는 등록된 순서대로 호출된다.
*	runOnLoad()로 한번 넘겨진 함수는 등록을 취소할 수 없다.
*
*	addEventListener()나 attachEvent()를 지원하지 않는 오래된 브라우저에서
*	이 함수는 DOM 레벨 0 window.onload 프로퍼티를 사용하는데, 이렇게 되면 <body>나 <frameset>태그의
*	onload 어트리뷰트가 설정되어 있는 문서에서는 제대로 작동하지 않는다.
*/
function runOnLoad(f){
	if(runOnLoad.loaded) f();		// 이미 로딩되어 있으면, 그냥 f()를 호출
	else runOnLoad.funcs.push(f);	// 그렇지 않으면 나중을 위해 저장
}

runOnLoad.funcs = [];		// 문서가 로딩되었을 때 호출하기 위한 함수의 배열
runOnLoad.loaded = false; 	// 아직 실행되지 않은 함수들

// 등록된 함수들을 등록된 순서대로 실행시킨다. runOnLoad()를 여러 번 호출하는 것이 안전하다.
// 첫 번째 호출 후에는 모두 무시된다. 
// 초기화 함수에서는 다른 함수를 등록하는 데 runOnLoad()를 호출하는 것이 안전한 방법이다.
runOnLoad.run = function(){
	if(runOnLoad.loaded) return; 	// 이미 실행되고 있으면, 아무 작업도 하지 않는다.
	
	for(var i = 0; i < runOnLoad.funcs.length; i++){
		try{ runOnLoad.funcs[i]();}
		catch(e) { /* 함수에서 발생한 예외 상황이 나머지 부분을 멈추게 해서는 안 된다. */ }
	}
	
	runOnLoad.loaded = true;		// 이미 한 번 실행되었따는 사실을 잊어서는 안된다.
	delete runOnLoad.funcs;			// 사용 함수를 지움
	delete runOnLoad.run;			//
};

// runOnLoad.run()을 onload 이벤트 처리기로 등록
if(window.addEventListener)
	window.addEventListener("load", runOnLoad.run, false);
else if (window.attachEvent) window.attachEvent("onload", runOnLoad.run);
else window.load = runOnLoad.run;