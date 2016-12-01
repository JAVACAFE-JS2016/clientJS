/**
 * Tooltip.js : 그림자가 드리워진 간단한 CSS 툴팁
 *
 * 이 모듈은 Tooltip 클래스를 정의한다 Tooltip() 생성자를 사용하여 Tooltip 객체를 생성
 * 그리고 나서 show() 메서드를 사용해 생성된 객체가 화면상에서 보이게 한다
 * 툴팁이 필요 없어지면 hide() 메서드를 사용하여 감춘다
 *
 *      .tooltipShadow{
 *          background: url(shadow.png);        /* 반투명한 그림자 * /
 *      }
 *
 *      .tooltipContext{
 *          left: -4px; top: -4px;  /* 화면에 보여줄 그림자의 크기 * /
 *          background-color: #ff0; /* 노란색 배경 * /
 *          border: solid black 1px;    /* 가느라단 검은색 테두리 * /
 *          padding: 5px;
 *          font: bold 10pt sans-serif; /* 작고 굵은 폰트 * /
 *      }
 *
 *  반투명한 PNG 이미지를 지원하는 브라우저에서는 반투명한 그림자를 표시할 수 있다
 *  그렇지 않은 브라우저에서는 보통의 불투명색을 사용하거나 불투명색 픽셀과 투명 픽셀이 교대로 위치하게 디더링(dithering)된 GIF 이미지를 사용하여
 *  반투명 그림자를 흉내
 */
function Tooltip(){ // Tooltip 클래스를 위한 생성자 함수
	this.tooltip = document.createElement("div");
	this.tooltip.style.position = "absolute";   // 절대 위치로 지정
	this.tooltip.style.visibility = "hidden";   // hidden 상태로 시작
	this.tooltip.className = "tooltipShadow";   // 스타일을 조작할 수 있게 CSS 클래스 이름을 붙임

	this.content = document.createElement("div");   // 내용 부분을 위한 div
	this.content.style.position = "relative";       // 상대 위치로 지정
	this.content.className = "tooltipContent";      // 스타일을 조작할 수 있게 CSS 클래스 이름을 붙임

	this.tooltip.appendChild(this.content);         // 그림자 위에 내용을 추가함

	// 툴팁의 내용과 위치를 설정한 후 화면상에 표시
	Tooltip.prototype.show = function(text, x, y){
		this.content.innerHTML = text;
		this.tooltip.style.left = x + "px"; // 위치 설정
		this.tooltip.style.top = y + "px";
		this.tooltip.style.visibility = "visible";

		// 아직 툴팁이 문서에 추가되지 않았다면 이를 문서에 추가
		if(this.tooltip.parentNode != document.body)
			document.body.appendChild(this.tooltip);
	};

	// 툴팁을 감춘다
	Tooltip.prototype.hide = function(){
		this.tooltip.style.visibility = "hidden"; // 감춘다
	}
}



/**
		마우스 이벤트를 통해 위치가 지정되는 툴팁		
		이 메서드는 현재부터 Tooltip.DELAY 시간 후에, 주어진 대상 엘리먼트 위에 툴립을 표시.
		전달인자 e는 mouseover 이벤트의 이벤트 객체가 되어야 한다.
		이 메서드는 이벤트에서 마우스 좌표를 추출하고, 이 좌표를 창 기반 좌표에서 문서 기반 좌표로 변환 후, 위의 오프셋 좌표를 더한다.
		툴팁에 나타낼 텍스트는 대상 엘리먼트의 tooltip 어트리뷰트에서 얻어온다. 
		이 메서드는 툴팁을 숨기거나 출력 대기 중인 툴팁을 취소하기 위해 onmouseout 이번트 처리기를 자동으로 등록했다가 취소한다.
*/
// 다음 상수들은 schedule() 메서드에서 사용
// 상수처럼 사용되지만, 쓰기도 가능하기 때문에 기본 값을 수정 할 수 있다.
Tooltip.X_OFFSET = 25;	// 마우스 포인터에서 오른쪽으로 떨어진 거리(픽셀 수)
Tooltip.Y_OFFSET = 15;	// 마우스 포인터에서 아래쪽으로 떨어진 거리(픽셀 수)
Tooltip.DELAY = 500;		// mouseover 후의 밀리 초

Tooltip.prototype.schedule = function(target, e) {
	// 화면에 출력할 텍스트를 얻어온다. 만약, 텍스트가 없다면 아무 것도 안함
	var text = target.getAttribute("tooltip");
	
	if(!text) return;
	
	// 이벤트 객체는 창 기반 좌표에서 마우스 위치를 관리한다.
	// Geometry 모듈을 사용하여 이 위치를 문서 기반 좌표로 변환한다.
	var x = e.clientX + Geometry.getHorizontalScroll();
	var y = e.clientY + Geometry.getVerticalScroll();
	
	// 툴팁이 마우스 포인터의 우측 하단에 딱 붙어 나타나지 않게 오프셋을 더한다.
	x += Tooltip.X_OFFSET;
	y += Tooltip.Y_OFFSET;
	
	// 툴팁 출력을 계획
	var self = this; 	// 아래의 중첩된 함수를 위해 이 작업이 필요
	var timer = window.setTimeout(function() { self.show(text, x, y); }, Tooltip.DELAY);
	
	// 툴팁을 숨기거나 출력 대기 중인 툴팁을 취소하기 위해 onmouseout 처리기를 등록
	if (target.addEventListener) target.addEventListener("mouseout", mouseout, false);
	else if(target.attachEvent) target.attachEvent("onmouseout", mouseout);
	else target.onmouseout = mouseout;
	
	// 이번트 리스너의 구현부
	function mouseout(){
		self.hide();	// 툴팁이 화면에 출력되어 있으면 숨긴다.
		window.clearTimeout(timer);	// 출력 대기 중인 툴팁을 취소
		// 이 리스너는 한 번만 호출되면 스스로를 제거
		if(target.removeEventListener)
			target.removeEventListener("mouseout", mouseout, false);
		else if(target.detachEvent) target.detachEvent("onmouseout", mouseout);
		else target.onmouseout = null;	
	}
}

// 범용 단일 전역 Tooltip 객체를 정의
Tooltip.tooltip = new Tooltip();

/**
		schedule() 메서드의 정적인 버전, 전역 툴팁을 사용 
		사용법
		<a href="www.davidflanagan.com" tooltip="good Java/Javascript blog" onmouseover="Tooltip.schedule(this, event)">David Flanagan's blog</a>
*/
Tooltip.schedule = function(target, e) { Tooltip.tooltip.schedule(target, e);}