/**
 * 이 함수는 Node n과 자손들을 재귀적으로 순회
 * 모든 Text 노드의 데이터를 대문자로 바꿈
 */
function upcase(n){
    if(n.nodeType ==3 /* Node.TEXT_NODE */){
        // 현재 노드가 Text 노드이면 텍스트를 대문자로 바꿈
        n.data = n.data.toUpperCase();
    }
    else {
        // 현재 노드가 Text 노드가 아니면 각 자식에 대해 재귀호출
        var kids = n.childNodes;
        for(var i=0; i< kids.length; i++) upcase(kids[i]);

    }

}
// upcase(document.body.children[0])