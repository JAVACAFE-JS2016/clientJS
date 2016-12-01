/**
*		DataEvent.js : ondataavailable 이벤트를 보내고 받는다.
*
*		이 모듈에서 합성 dataavailable 이벤트를 전달하고 이 이벤트에 대한 이벤트 처리기를 등록하기 위해
*		DataEvent.send()와 DataEvent.receive()라는 두 개의 함수가 정의되어 있다.
*		
*		DOM 이벤트 모델은 모든 타입에 대한 합성 이벤트를 허용하지만, IE 모델은 미리 정의된 타입의 합성 이벤트만 지원한다.
*		dataavailable 이벤트는 IE가 지원하는 합성 이벤트들 중에서 가장 일반적인 것이다.
*
*		실제 이벤트는 큐에 쌓이는 반면 DataEvent.send()를 통해 전송되는 이벤트는 큐에 저장되지 않는다.
*		대신 등록된 처리기가 바로 호출된다.
*/
var DataEvent = {};

/**
*		합성 이벤트인 dataavailable을 주어진 대상에게 보낸다. 
*		이벤트 객체는 datatype과 data라는 프로퍼티를 가지며, 이 프로퍼티들은 주어진 값을 갖는다.
*		datatype은 문자열 또는 이 메시지의 타입을 식별하는 기본값(혹은 null)을 가지며
*		data는 객체나 배열 같은 자바스크립트 값도 될 수 있다.
*/
DataEvent.send = function(target, datatype, data){
	if(typeof target == "string") target = document.getElementById(target);
	
	// 이벤트 객체를 생성. 생성할 수 없으면 그냥 종료한다.
	if(document.createEvent) {		// DOM 이벤트 모델
		// 이벤트 모듈의 이름을 지정하여 이벤트를 생성
		// 마우스 이벤트에 대해 사용할 때는 MouseEvents라고 지정한다.
		var e = document.createEvent("Events");
		// 모듈에 특화된 초기화 함수를 사용하여 이벤트 객체를 초기화한다.
		// 이 때, 이벤트 타입과 거품 가능, 취소 불가를 지정한다.
		// Event.initEvent와 MouseEvent.initMouseEvent, UIEvent.initUIEvent
		e.initEvent("dataavailable", true, false);
	} else if(document.createEventObject)	{	// IE 이벤트 모듈
		var e = document.createEventObject();
	} else return;	// 다른 브라우저에서는 아무 작업도 하지 않음.
	
	// 여기서는 이벤트 객체에 사용자 정의 프로퍼티를 추가
	// 기존 프로퍼티도 설정할 수 있다.
	e.datatype = datatype;
	e.data = data;
	
	// 이벤트를 주어진 대상으로 전송
	if (target.dispatchEvent) target.dispatchEvent(e);	// DOM
	else if (target.fireEvent) target.fireEvent("ondataavailable",e);	// IE
};

/**
*		주어진 엘리먼트에 대해 ondataavailable을 위한 이벤트 처리기를 등록한다.
*/
DataEvent.receive = function(target, handler) {
	if( typeof target == "string" ) target = document.getElementById(target);
	if( target.addEventListener)
		target.addEventListener("dataavailable", handler, false);
	else if (target.attachEvent)
		target.attachEvent("ondataavailable", handler);
};