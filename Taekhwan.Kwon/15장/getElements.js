/**
 * getElements(classname, tagname, root)
 * 주어진 클래스에 속하고 주어진 tagname을 가지고 있고 주어진 최상위 노드(root)의 자손 DOM 엘리먼트들로 구성된 배열을 반환
 *
 * classname이 주어지지 않으면 클래스는 고려하지 않음
 * tagname이 주어지지 않으면 태그 이름을 고려하지 않음
 * root가 주어지지 않으면 document 객체가 사용 만약 주어진 root가 문자열이면
 * 이는 엘리먼트의 id이며 root 엘리먼트는 getElementById()를 사용하여 검색된다
 */
function getElemets(classname, tagname, root){
    // root가 주어지지 않으면 문서 전체를 사용한다
    // 문자열이 주어지면 해당 문자열을 검색한다
    if(!root) root = document;
    else if(typeof  root == "string") root = document.getElementById(root);

    //tagname이 주어지지 않으면 모든 태그를 사용
    if(!tagname) tagname = "*";

    //주어진 tagname을 사용하여 주어진 root의 모든 자손을 찾는다
    var all = root.getElementsByTagName(tagname);

    //classname이 주어지지 않으면 모든 태그를 반환
    if (!classname) return all;

    // 그렇지 않으면 classname을 사용하여 엘리먼트를 걸러낸다
    var elements = [];
    for(var i =0; i< all.length; i++){
        var element = all[i];
        if(isMember(element, classname))
            elements.push(element);
    }

    // 만약 배열이 비어있더라도 배열을 함수의 결과로 반환
    return elements;

    /*  주어진 엘리먼트가 주어진 클래스의 멈베인지 판다ㄴ
        프로퍼티가 단일 classname일 경우에 대해 최적화되었다
        하지만 이 함수는 공백으로 구분된 클래스들의 목록에 대해서도 잘 동작함
    */
    function isMember(element, classname){
        var classes = element.className;
        if(!classes) return false;
        if(classes == classname) return true;d

        // 정확히 일치하지 않았기 때문에 공백이 없다면 이 엘리먼트는 주어진 클래스의 멤버가 아님
		var whitespace = /\s+/;
		
        if(!whitespace.test(classes)) return false;

        // 여기까지 왔다면 이 엘리먼트는 한 개 이상의 클래스에 속하는 멤버
        // 엘리먼트를 각 클래스에 대해 검사

        var c = classes.split(whitespace);
        for(var i=0; i< c.length; i++){
            if(c[i] == classname) return true;
        }
        return false;
    }

}
//getElemets("ddd","div")
//getElemets("kkk","div")
//getElemets(null,"div")
//getElemets("kkk","div",document)
