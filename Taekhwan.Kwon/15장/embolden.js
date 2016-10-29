/**
 * 이 함수는 Node n을 전달인자로 받고 이 노드를 HTML <b> 태그를 표현하는 Element 노드로 교체
 * 기존 노드를 새로 만든 <b> 엘리먼트의 자식으로 만듬
 *
 */
function embolden(n){
    if(typeof n == "string") n = document.getElementById(n); // 노드 조사
    var b = document.createElement("b");    // 새로운 <b> 엘리먼트 생성
    var parent = n.parentNode;              // 주어진 노드의 부모를 얻는다
    parent.replaceChild(b,n);                    // 주어진 노드를 <b> 태그로 교체	. 수정함 relace -> replaceChild
    b.appendChild(n);                       // 주어진 노드를 <b> 엘리먼트의 자식으로 만듬
}


//var a = document.getElementById("bb").childNodes[0]document.getElementById("bb").childNodes[0]