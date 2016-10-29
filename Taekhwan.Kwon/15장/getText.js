/**
			getText(n) : 노드 n아래의 Text 노드나 모든 Text 노드를 찾음
			Text 노드의 내용을 이어 붙이고 이를 문자열로 반환
*/
function getText(n){
	/*
			문자열 이어 붙이기를 반복하는 것은 비효율적일 수 있기 때문에 모든 텍스트 노드의 값을 배열에 저장하고 배열의 각 원소를 한 번에 이어 붙인다
	*/
	
	var strings = [];
	getStrings(n, strings);
	return strings.join("");
	
	function getStrings(n, strings){
		if(n.nodeType ==3 /* Node.TEXT_NODE */ )
			strings.push(n.data);
		else if(n.nodeType ==1 /* Node.ELEMENT_NODE */ ){
			for(var m = n.firstChild; m !=null; m=m.nextSibling) {
				getStrings(m, strings);
			}
		}	
	}
}
//getText(document.getElementById("kk"))
//getText(document.getElementById("yy"))