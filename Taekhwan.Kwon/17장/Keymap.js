/** 단축키 설정을 위한 Keymap 클래스
 * Keymap.js : 키 이벤트를 처리기 함수와 연결
 *
 * 이 모듈에는 Keymap 클래스가 정의
 * 이 클래스의 인스턴스는 키 식별자와 처리기 함수의 연결을 표현한다
 * keydown과 keypress 이벤트를 처리하기 위해 Keymap을 HTML 엘리먼트에 설치할 수 있다
 * keydown과 keypress 이벤트가 발생하면 Keymap은 매핑 정보를 사용하여 적절한 처리기 함수를 호출
 *
 * Keymap을 생성할 때는 초기 매핑 정보를 표현하는 자바스크립트 객체를 Keymap에 전달
 * 이 객체의 프로퍼티 이름은 키 식별자이고 프로퍼티 값은 처리기 함수이다
 *
 * Keymap이 생성되면 키 식별자와 처리기 함수를 bind() 메서드로 전달하여 새로운 매핑 정보를 추가할 수 있다
 * unbind() 메서드에 키 식별자를 전달하면 매핑 정보를 제거할 수 있다
 *
 * Keymap을 사용하려면 Keymap 클래스의 install() 메서드를 호출하고 문서 객체와 같은 HTML 엘리먼트를 전달해야 한다
 * install()은 주어진 객체에 onkeypress와 onkeydown 이벤트 처리기를 추가하고 이 프로퍼티에 설정되어 있던 예전 처리기는 삭제
 * 이 처리기가 호출되면 키 이벤트에서 키 식별자를 ㅇ라아내고 이것과 연결된 이벤트 처리기가 있으면 이를 호출한다
 * 매핑 정보가 없으면 기본 처리기 함수를 사용
 * Keymap 하나가 여러 개의 HTML 엘리먼트에 대해 설치될 수도 있다
 *
 * 키 식별자
 *
 * 키 식별자는 동시에 누른 변경자 키를 표현하는 대소문자를 구분하지 않는 문자열
 * 키 이름은 누른 키의 이름.
 * 허용된 키 이름에는 A와 7, F2, PageUp, Left, Delete, /, - 등이 포함
 * 출력 가능한 키의 경우 그 이름은 파이어폭스에서 정의한 KeyEvent.DOM_VK에서 유래 한 것이다
 * 즉 키 이름은 DOM_VK_ 부분과 밑줄이 제거된 상수 값이다
 * 예를 들어 KeyEvent 상수 DOM_VK_BACK_SPACE는 BACKSPACE가 된다
 * 이름의 전체 목록은 Keymap.KeyCodeToFunctionKey에서 볼 수 있다
 *
 * 키 식별자는 변경자 키를 접두사로 사용할 수 있다 이런 접두사에는 Alt_와 Ctrl_, Shift_가 있다
 * 이들은 대소문자를 구분하지 않지만 하나 이상이 나타나는 경우에는 알파벳 순서로 정렬되어야 한다
 * 변경자를 포함하는 어떤 키 식별자는 Shift_A와 ALT_F2, alt_ctrl_delete가 될 수 있다
 * ctrl_alt_delete는 알파벳 순서로 정렬되지 않았기 때문에 올바른 형태가 아님
 *
 * Shift와 조합된 구두점 문자는 보통 적절한 문자로 반환된다
 * 예를 들어 Shitf-2는 @이라는 키 식별자를 생성한다
 * 하지만 Alt나 Ctrl도 눌렀다면 Shift를 누르지 않았을 때의 문자가 대신 사용된다
 * 예를 들어 Ctrl_@ 대신 Ctrl_Shitf_2를 키 식별자로 얻게 된다
 *
 *
 * 처리기 함수
 * 처리기 함수가 호출되면 세 개의 전달인자를 전달 받는다
 * 1. 키 이벤트가 발생한 HTML 엘리먼트
 * 2. 눌린 키의 식별자
 * 3. keydown 이벤트에 대한 이벤트 객체
 *
 *
 * 기본 처리기
 * 예약된 키 이름인 default는 처리기 함수에 매핑될 것
 * 이 함수는 키와 연결된 함수가 없는 경우에 호출된다
 *
 *
 * 한계
 * 처리기 함수를 모든 키에 연결시킬 수는 없다. 운영체제가 몇 가지 키 조합을 가로채간다(ex. Alt-F4)
 * 브라우저가 키 조합을 가로채갈 수도 잇다(Ctrl-s)
 * 여기 나온 코드는 브라우저와 OS, 지역에 종속적이다
 * 기능키와 변경된 기능키에 대해서는 잘 작동하고 출력 가능한 키가 변경되었어도 잘 작동한다
 * Ctrl과 Alt가 출력 가능한 문자와 조합된 경우 특히 구두점 문자와 조합된다면 잘 작동하지 않을 수 있다
 *
 */

// 생성자 함수
function Keymap(bindings){
    this.map = {};  // "키 식별자>처리기" 매핑 정보를 정의
    if(bindings){   // 초기 매핑 정보를 복사하고 소문자로 변환한다
        for(name in bindings) this.map[name.toLowerCase()] = bindings[name];
    }
}

// 주어진 키 식별자를 주어진 처리기 함수에 연결
Keymap.prototype.bind = function(key, func){
    this.map[key.toLowerCase()] = func;
};

// 주어진 키 식별자에 대한 매핑 정보를 제거
Keymap.prototype.unbind = function(key){
  delete this.map[key.toLowerCase()];
};

// 주어진 HTML 엘리먼트에 Keymap을 설치한다
Keymap.prototype.install = function(element){
    // 이벤트 처리 함수
    var keymap = this;
    function handler(event){ return keymap.dispatch(event);}

    // 설치
    if(element.addEventListener){
        element.addEventListener("keydown", handler, false);
        element.addEventListener("keypress", handler, false);
    }else if(element.attachEvent){
        element.attachEvent("onkeydown", handler);
        element.attachEvent("onkeypress", handler);
    }else{
        element.onkeydown = element.onkeypress = handler();
    }
};

/**
 * 다음 객체는 출력할 수 없는 기능키를 위해 keyCode 값을 키 이름과 연결한다
 * IE와 파이어폭스는 이런 키들에 대해 대부분 호환 가능한 키코드를 사용
 * 하지만 키보드는 장치에 종속적인 것으로 키보드 배열에 따라 다른 값을 가질 수 있음을 주의
 */
Keymap.keyCodeToFunctionKey = {
    8:"backspace",9:"tab", 13:"return", 19:"pause", 27:"escape", 32:"space",
    33:"pageup", 34:"pagedown", 35:"end", 36:"home", 37:"left", 38:"up",
    39:"right", 40:"down", 44:"printscreen", 45:"insert", 46:"delete",
    112:"f1", 113:"f2", 114:"f3", 115:"f4", 116:"f5", 117:"f6", 118:"f7",
    119:"f8", 120:"f9", 121:"f10", 122:"f11", 123:"f12",
    144:"numlock", 145:"scrolllock"
};

/**
 * 다음 객체는 출력 가능한 문자를 위해 keydown 키보드 값을 키 이름과 연결
 * 알파벳과 숫자가 조합된 문자는 ASCII 코드가 있지만 구두점은 ASCII코드가 없다
 * 익것은 지역에 종속적일 수 있고 국제 키보드에서는 제대로 동작하지 않을 수 있다
 *
 */
Keymap.keyCodeToPrintableChar = {
    48:"0", 49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9",
    59:";", 61:"=", 65:"a", 66:"b", 67:"c", 68:"d", 69:"e", 70:"f", 71:"g", 72:"h",
    73:"i", 74:"j", 75:"k", 76:"l", 77:"m", 78:"n", 79:"o", 80:"p", 81:"q", 82:"r",
    83:"s", 84:"t", 85:"u", 86:"v", 87:"w", 88:"x", 89:"y", 90:"z",
    107:"+", 109:"-", 110:".", 188:",", 190:".", 191:"/", 192:"`", 219:"[", 220:"\\",
    221:"]", 222:"\""
};

// 이 메서드는 키맵 연결 정보에 따라 이벤트를 전달
Keymap.prototype.dispatch = function(event){
  var e = event || window.event;

    // 변경자와 키 이름 없이 시작
    var modifiers = "";
    var keyname = null;

    if(e.type == "keydown"){
        var code = e.keyCode;
		console.log(code);
		console.log("event target :" + e.target);
        // Shift와 Ctrl, Alt에 대해서는 keydown 이벤트를 무시
        if (code ==18 || code ==17 || code==18) return;

        // 매핑 정보에서 키 이름을 얻는다
        keyname = Keymap.keyCodeToFunctionKey[code];
		console.log("event keyname :" + keyname);
        // 기능키는 아니지만 ctrl이나 alt 변경자가 눌렸다면 기능키처럼 취급
        if(!keyname && (e.altKey || e.ctrlKey))
            keyname = Keymap.keyCodeToPrintableChar[code];

        // 키에 대한 이름을 찾았으면 변경자를 찾아낸다. 그렇지 않으면 그냥 반환하고 이번 이벤트는 무시
        if(keyname){
            if(e.altKey) modifiers += "alt_";
            if(e.ctrlKey) modifiers += "ctrl_";
            if(e.shiftKey) modifiers += "shift_";

        }else
            return;
    }else if(e.type== "keypress"){
        // ctrl이나 alt가 눌러 있으면 이미 처리한 것
        if(e.altKey || e.ctrlKey) return;

        // 파이어폭스에서는 출력할 수 없는 키에서도 keypress 이벤트가 발생
        // 이런 경우 아무 것도 일어나지 않는 것처럼 반환
        if(e.charCode != undefined && e.charCode == 0) return 0;

        // 파이어폭스는 e.charCode의 출력 문자를 주고 IE는 e.keyCode의 출력 문자를 준다
        var code = e.charCode || e.keyCode;

        // 코드는 ASCII 코드이기 때문에 그냥 문자열로 변환
        keyname=String.fromCharCode(code);

        /*
            키 이름이 대문자이면 소문자로 변환하고 shift를 추가한다
            이것은 CAPS LOCK을 처리하기 위한 조치
            CAPS LOCK은 shift 변경자 없이 대문자를 전달
         */
        var lowercase = keyname.toLowerCase();
        if(keyname != lowercase){
            keyname = lowercase;    // 소문자로 된 이름을 사용
            modifiers = "shift_";   // shift 변경자를 추가
        }
    }

    // 이제 변경자와 키 이름을 정했으므로 키와 변경자 조합에 대한 처리기 함수를 찾는다
    debugger;
    var func = this.map[modifiers.trim()+keyname.trim()];
    console.log("func " + func);
    // 아무것도 찾지 못했고 기본 처리기가 있다면 이 처리기를 사용
    if(!func) func = this.map["default"];

    if(func){
        // 이벤트가 발생한 엘리먼트를 알아냄
        var target = e.target;
        if(!target) target = e.srcElement;  // IE

        // 처리기 함수르 호출
        func(target, modifiers+keyname, e);

        // 이벤트 전파를 중지시키고 이벤트에 지정되어 있는 기본 행동을 중단
        // preventDefault()는 도움말을 띄우기 위한 F1키 같은 최상위 브라우저 명령을 맞지 않는다
        if(e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;

        if(e.preventDefault) e.preventDefault();    // DOM
        else e.returnValue = false;                 // IE
        return false;                               // 기존 이벤트 모델
    }

};


