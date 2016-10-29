/**
 * Created by kwon on 2016. 10. 27..
 */
function sortkids(e){
    // 정렬할 자식을 가진 엘리먼트
    if(typeof e == "string") e = document.getElementById(e);

    // 자식 엘리먼트들을 배열로 이동시킴(텍스트 노드 제외)
    var kids = [];
    for(var x = e.firstChild; x != null; x= x.nextSibling)
        if(x.nodeType == 1 /* Node.ELEMENT_NODE */ ) kids.push(x);

    // 각 자식 노드의 텍스트 내용에 따라 배열을 정렬
    // 각 자식에는 한 개의 자식만 있고 그것이 Text 노드라고 가정
    kids.sort(function(n, m){ // 정렬을 위해 각 노드를 비교하는 함수
        var s = n.firstChild.data;
        var t = m.firstChild.data;
        if( s < t) return -1;
        else if(s > t) return 1;
        else return 0;
    });

    /*
        이제 자식들을 정렬된 순서대로 부모에게 덧붙인다
        이미 문서에 있는 노드를 삽입하면 현재 위치에서 자동으로 제거되고
        새로 삽입하면 이전 위치에서 새 위치로 이동
        하지만 앞에서 무시한 텍스트 노드는 원래 위치에 남아 있다는 점에 주의
     */
    for(var i=0; i< kids.length; i++) e.appendChild(kids[i]);
}

//sortkids("d")