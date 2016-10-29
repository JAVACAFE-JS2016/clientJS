/**
 * log.js : 겸손한 로깅 기능
 *
 * 이 모듈은 log라는 단일 전역 심벌을 정의
 * 두세 개의 전달인자를 통해 이함수를 호출
 * 전달된 메시지 로깅
 *
 *      category : 메시지의 타입. 서로 다른 타입의 메시지를 분류하고 각 타입에 따라 다른 방식의 스타일을 적용하는 데 사용
 *
 *      message : 로깅될 텍스트 객체가 전달되었다면 내용이 없을 수도 있다
 *
 *      object : 로깅딜 객체. 이 전달인자는 생략 가능. 만약 이 전달인자가 주어지면 객체의 프로퍼티가 표 형태로 로깅 됨
 *              프로퍼티의 값이 객체라면 재귀적으로 해당 객체를 로깅
 *
 *  유틸리티 함수
 *      log.debug(), log.warn() : debug, warning이라는 카테고리.
 *      log() : 함수를 호출하는 유틸 내장 함수인 alert()를 호출하는 부분을 log()를 호출하도록 변경
 *
 *  로깅 활성화
 *      기본적으로 로그 메시지 출력 안함.
 *      두 가지 방법 중 하나를 통해 주어진 카테고리의 메시지 화면 출력 가능
 *      1. <category>_log라는 id를 사용하여 <div>나 다른 컨테이너 엘리먼트를 생성 카테고리가 debug인 메시지를 출력하기 위해
 *          문서에 다음과 같은 코드 작성
 *          <div id="debug_log"></div>
 *          이 경우 주어진 카테고리에 속하는 모든 메시지가 이 컨테이너에 추가 됨
 *      2. 적당한 로깅 옵션을 설정
 *          debug 카테고리를 활성화하려면 log.options.debugEnabled = true
 *          설정을 하면 <div class = "log">가 생성됨
 *          비활성화 시log.options.debugDisabled = true 설정
 *          해당 카테고리에 속하는 로그 메시지의 출력을 다시 활성화시키려면 위의 옵션을 다시 false
 *
 *  로그 메시지 스타일
 *      로그 컨테이너에 스타일을 지정하는 것
 *      각 로그 메시지는 <div> 태그 내에 위치하고 이 태그의 CSS 클래스는 <category>_message가 된다.
 *
 * 로그 옵션
 *		카테고리의 로깅을 활성화하거나 비활성화하는 것과 같이 log.options 객체의 프로퍼티를 설정하여 출력 형식을 여러 가지 형태로 바꿀 수 있다.
 *			log.options.timestamp: 이 프로퍼티 값이 true이면 각 로그 메시지 뒤에 날짜와 시간에 관한 정보가 추가됨
 *
 *			log.options.maxRecursion : 객체를 로깅할 때 화면에 출력할 표가 최대 몇 개까지 중첩될 수 있는지를 나타내는 정수 값
 *				표 내부에 또다른 표가 나타나는 것을 원하지 않는다면 이 프로퍼티의 값을 0으로 설정
 *
 *			log.options.filter : 객체를 로깅할 때 해당 객체의 프로퍼티를 걸러내는 함수
 *				이 함수는 프로퍼티 이름과 값을 전달받고, 전달받은 프로퍼티가 객체의 로그 테이블에 나타나야 한다면 true를 반환, 아니면 false를 반환
 */
 function log(category, message, object){
	// 카테고리가 비활성화되어 있으면, 아무 작업도 하지 않는다
	 if(log.options[category + "Disabled"]) return;
	 
	 //컨테이너를 찾는다
	var id = category + "_log";
	var c = document.getElementById(id);
	
	// 컨테이너는 없지만 이 카테고리의 로깅이 활성화되어 있으면 컨테이너를 생성
	if(!c && log.options[category + "Enabled"]) {
		c = document.createElement("div");
		c.id = id;
		c.className = "log";
		document.body.appendChild(c);
	}
	
	// 아직까지 컨테이너가 없으면, 이 메시지는 무시
	if(!c) return;
	
	// 타임스탬프 기능이 활성화되어 있으면, 타임스템프 정보를 추가
	if(log.options.timestamp)
		message = new Date() + ": " + (message?message:"");
		
	// 로깅 내용을 채워넣기 위해 <div> 엘리먼트를 생성
	var entry = document.createElement("div");
	entry.className = category + "_message";
	
	if(message){
		// 메시지를 추가
		entry.appendChild(document.createTextNode(message));
	}
	
	if(object && typeof object == "object") {
		entry.appendChild(log.makeTable(object,0));
	}
	
	//마지막으로 로그 내용을 컨테이너에 추가
	c.appendChild(entry);
 }
 
 log.makeTable = function(object,level){
	// 만약 최대 재귀 회수에 이르렀으면 대신 Text 노드를 반환
	if(level> log.options.maxRecursion)
		return document.createTextNode(object.toString());
		
		// 반환할 표를 생성
		var table = document.createElement("table");
		table.border = 1;
		
		// 표에 Name|Type|Value 머리말을 추가
		var header = document.createElement("tr");
		var headerName = document.createElement("th");
		var headerType = document.createElement("th");
		var headerValue = document.createElement("th");
		headerName.appendChild(document.createTextNode("Name"));
		headerType.appendChild(document.createTextNode("Type"));
		headerValue.appendChild(document.createTextNode("Value"));
		header.appendChild(headerName);
		header.appendChild(headerType);
		header.appendChild(headerValue);
		table.appendChild(header);
		
		// 객체의 프로퍼티 이름을 얻은 후 이를 알파벳 순서로 정렬한다.
		var names = [];
		for(var name in object) names.push(name);
		names.sort();
		
		// 이 프로퍼티들을 순회
		for(var i =0; i< names.length; i++){
			var name, value, type;
			name = names[i];
			try{
				value = object[name];
				type = typeof value;
			}catch(e){	// 파이어폭스에서는 발생할 수 있음.
				value = "<unknown value>";
				type = "unknown";
			};
			
			// 필터 함수에 의해 걸러진 프로퍼티는 무시
			if(log.options.filter && !log.options.filter(name,value)) continue;
			
			// 함수의 소스 코드는 절대 출력하지 않는다.
			// 소스 코드를 출력하면 너무 많은 공간 차지
			if(type == "function") value = "{/* 소스 코드는 출력되지 않는다. */}";
			
			// 프로퍼티 이름과 타입, 값을 출력하기 위해 표에 행을 한 개 생성
			 var row = document.createElement("tr");
			 row.vAlign = "top";
			 var rowName = document.createElement("td");
			 var rowType = document.createElement("td");
			 var rowValue = document.createElement("td");
			 
			 rowName.appendChild(document.createTextNode(name));
			 rowType.appendChild(document.createTextNode(type));
			 
			 // 객체가 주어지면, 이것을 표로 출력하기 위해 함수를 재귀적으로 호출
			 if (type == "object")
				rowValue.appendChild(log.makeTable(value,level+1));
			else
				rowValue.appendChild(document.createTextNode(value));
				
			// 행에 칸을 추가하고, 이 행을 표에 추가
			row.appendChild(rowName);
			row.appendChild(rowType);
			row.appendChild(rowValue);
			
			table.appendChild(row);
		}
		// 마지막으로 표를 반환
		return table;
 }

 // 빈 options 객체를 생성
 log.options = {};
 
 // 카테고리를 가진 함수의 유틸리티 버전
 log.debug = function(message, object) { log("debug", message, object); };
 log.warn = function(message, object) {log("warning", message, object); };
 
 // alert() 다이얼로그를 log 메시지로 바꾸려면
 // 주석 처리된 다음 코드에서 주석 마크를 제거
 // function alert(msg) { log("alert", msg); }