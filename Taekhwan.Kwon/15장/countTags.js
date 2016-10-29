/**
		이 함수는 DOM Node 객체를 전달받고, 이 노드가 HTML 태그를 표현하는지 검사
		즉, 이 노드가 Element 객체인지 검사
		이 함수는 노드의 각 자식 노드에 대해 자신을 재귀적으로 호출하고 똑같은 검사를 수행
		트리를  순회하면서 만나는 총 Element 객체의 수를 반환한다
		 이 함수는 전체 DOM 트리를 순회한다
*/
function countTags(n){												// n은 Node
	var numtags = 0;														// 태그 카운터 초기화
	if (n.nodeType ==1 /* Node.ELEMENT_NODE */ )	// n이 Element인지 검사
		numtags++;
	var children = n.childNodes;
	for(var i=0; i< children.length ; i++) {
		numtags += countTags(children[i]);
	}
	return numtags;
}
//countTags(document)