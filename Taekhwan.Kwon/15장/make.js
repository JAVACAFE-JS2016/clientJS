/**
 *  make(tagname, attribute, children);
 *      주어진 tagname과 attributes, children을 사용하여 HTML 엘리먼트를 생성
 *
 *  attributes 전달인자는 자바스크립트 객체다 이 객체의 프로퍼티 이름과 같은 이 함수에서 설정할 어트리뷰트의 이름과 값이다
 *  attributes가 null이고 children이 배열이거나 문자열이면 attributes는 생략될 수 있고 children이 두 번째 전달인자가 됨
 *
 *  children 전달인자는 보통 생성된 엘리먼트에 추가할 자식들로 구성된 배열이다
 *  자식이 없다면 이 전달인자는 생략될 수 있다 자식이 한 개라면 자식을 배열에 넣지 않고 직접 전달받는다
 *  (하지만 자식이 문자열이 아니고 attributes가 주어지지 않았다면 배열이 사용되어야 한다)
 *
 *  예 : make("P", ["This is a ", make("b", "bold"), " word."]);
 *
 */
function make(tagname, attributes, children){

    // 두 개의 전달인자를 사용하여 호출했다면 attributes 전달인자는 배열이거나 문자열이다
    // 이 경우 children 전달인자는 attributes가 되어야 함
    if(arguments.length == 2 &&
        (attributes instanceof Array || typeof attributes == "string")){
        children = attributes;
        attributes = null;
    }

    // 엘리먼트를 생성
    var e = document.createElement(tagname);

    // 어트리뷰트를 설정
    if (attributes){
        for(var name in attributes) e.setAttribute(name, attributes[name]);
    }

    // children이 주어졌으면 이를 추가
    if (children != null){
        if(children instanceof Array) { // 만약 배열이라면
            for (var i = 0; i < children.length; i++) {   // 자식들을 순회
                var child = children[i];
                if (typeof child == "string")    // 텍스트 노드를 처리
                    child = document.createTextNode(child);
                e.appendChild(child);   // 다른 것들은 Node가 아니라고 가정
            }
        }else if(typeof children == "string") // 단일 텍스트 자식을 처리
            e.appendChild(document.createTextNode(children));
        else e.appendChild(children);
    }

    // 마지막으로 엘리먼트를 반환
    return e;
}
//make("P", ["This is a ", make("b", "bold"), " word."]);
//make("P", "This is a b word.");
//make("div",document.getElementById("kk"),document.getElementById("yy"));


/**
 *  maker(tagname) : 주어진 태그를 위해 make()를 호출하는 함수를 반환
 *  예 : var table = maker("table"), tr = maker("tr", td = maker("td");
 */
function maker(tag) {
    return function(attrs, kids){
        if(arguments.length == 1) return make(tag, attrs);
        else return make(tag, attrs, kids);
    }
}

//make("table")