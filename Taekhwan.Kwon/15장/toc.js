/**
 * toc.js : 문서의 목차를 생성
 *
 *  이 모듈은 maketoc()라는 함수 하나를 정의하고 문서의 로딩이 완료되었을 때
 *  이 함수가 자동으로 실행될 수 있게  onload 이벤트 처리기에 등록한다
 *  maketoc() 함수가 실행되면 우선 id가 "toc"인 문서 엘리먼트를 찾는다.
 *  만약 이런 엘리먼트가 없으면 maketoc() 함수는 아무런 작업도 하지 않는다
 *  반대로 이런 엘리먼트를 찾으면 <h1>에서 <h6>에 해당하는 태그를 모두 검색하기 위해 문서를 순회한 후
 *  목차를 생성하여 "toc" 엘리먼트 뒤에 붙여넣는다
 *  maketoc() 함수는 각 절의 제목 앞에 절 번호를 넣으며, 다시 목차로 돌아올 수 있는 링크를 절 제목 앞에 삽입한다
 *  maketoc() 가 생성하는 링크와 앵커들의 이름은 "TOC"로 시작하기 때문에 HTML 내에서 이런 이름은 사용하지 않아야 한다
 *
 *  CSS를 사용하면 생성된 TOC의 내용에 스타일을 지정할 수 있다
 *  TOC의 모든 엘리먼트의 클래스는 "TOCEntry"이다
 *  또한 각 엘리먼트는 절 레벨에 따라 적절한 클래스를 가진다
 *  예를 들어
 *  <h1> 태그는 "TOCLevel1"이라는 클래스의 엘리먼트를 만들고
 *  <h2> 태그는 "TOCLevel2"이라는 엘리먼트를 만든다
 *  제목에 삽입된 절 번호의 클래스는 "TOCSectNum"이고 목차로 돌아가는 링크의 클래스는 "TOCBackLink"이다
 *
 *  기본적으로 목차로 되돌아가는 링크는 "Contents"를 읽어 들인다
 *  하지만 maketoc.backlinkTexst 프로퍼티를 적절한 텍스트로 설정해주면 기본 설정값을 바꿀 수 있다
 */

function maketoc(){
    // 컨테이너를 찾는다 만약 컨테이너가 없으면 그냥 리턴한다
    var container = document.getElementById('toc');
    if(!container) return;

    // 문서를 순회하면서 <h1>..<h6> 태그들을 배열에 집어 넣는다
    var sections = [];
    findSections(document, sections);

    // 컨테이너 엘리먼트 앞에 앵커를 삽입
    var anchor = document.createElement("a");   // <a> 노드를 생성
    anchor.name = "TOCtop"; // 이름을 부여
    anchor.id = "TOCtop";   // id 할당(IE에서는 이 작업이 필요)
    container.parentNode.insertBefore(anchor, container);   // toc 앞에 삽입

    // 절 번호를 관리하는 배열을 초기화
    var sectionNumbers = [0,0,0,0,0,0];

    // 찾은 절 이름에 대해 루프를 돈다
    for(var s = 0; s <sections.length; s++){
        var section = sections[s];

        // 절 제목이 몇 번째 레벨에 해당하는지 알아낸다
        var level = parseInt(section.tagName.charAt(1));
        if (isNaN(level) || level <1 || level >6) continue;

        // 해당 레벨의 절 번호를 증가시킨다
        // 그 이하 레벨의 번호는 0으로 만든다
        sectionNumbers[level -1]++;
        for(var i = level; i < 6 ; i++) sectionNumbers[i] = 0;

        // 2.3.1과 같은 형태를 가지는 절 번호를 만들기 위해 모든 레벨의 절 번호를 합친다
        var sectionNumber = "";
        for(i =0; i < level; i++){
            sectionNumber += sectionNumbers[i];
            if (i < level -1) sectionNumber += ".";
        }

        // 절 번호를 추가하고 절 제목에 공간을 집어넣는다
        // <span>에 스타일을 지정할 수 있게 번호를 부여
        var frag = document.createDocumentFragment();   // span과 공간을 위해
        var span = document.createElement("span");      // 번호를 저장하기 위한 span
        span.className = "TOCSectNum";                  // 스타일을 지정할 수 있게
        span.appendChild(document.createTextNode(sectionNumber));   // 절 번호 삽입
        frag.appendChild(span);     // span 삽입
        frag.appendChild(document.createTextNode(" ")); // 그 후, 공간 삽입
        section.insertBefore(frag, section.firstChild); // 이 둘을 절 제목 앞에 삽입

        // 이 절의 시작을 표시해두기 위한 앵커를 생성
        var anchor = document.createElement("a");
        anchor.name = "TOC" + sectionNumber;    // 링크 연결을 위해 앵커에 이름 할당
        anchor.id = "TOC" + sectionNumber;      // IE에서는 앵커에 id가 필요

        // TOC로 되돌아가는 링크를 앵커로 감싼다
        var link = document.createElement("a");
        link.href = "#TOCtop";
        link.className = "TOCBackLink";
        link.appendChild(document.createTextNode(maketoc.backlinkText));
        anchor.appendChild(link);

        // 절 이름 바로 앞에 앵커와 링크를 삽입
        section.parentNode.insertBefore(anchor, section);
        // 이 절로 연결되는 링크를 생성
        var link = document.createElement("a");
        link.href = "#TOC" + sectionNumber; // 링크의 목적지 설정
        link.innerHTML = section.innerHTML; // 링크의 텍스트를 제목과 똑같이 설정

        // 레벨에 따라 스타일을 지정할 수 있는 div에 링크를 넣는다
        var entry = document.createElement("div");
        entry.className = "TOCEntry TOCLevel" + level;  // CSS스타일 지정을 위해
        entry.appendChild(link);

        // div를 TOC 컨테이너에 넣는다
        container.appendChild(entry);

    }

    // 이 메서드는 n이 루트 노드인 트리를 재귀적으로 순회하고
    // <h1>부터 <h6> 태그를 검색하며 절을 관리하는 배열이 이 태그들을 추가한다

    function findSections(n, sects){
         // n의 모든 자식에 대해 루프를 돈다
        for(var m = n.firstChild; m!= null; m = m.nextSibling){
            // 엘리먼트가 아닌 노드는 건너뛴다
            if(m.nodeType !=1 /* Node.Element_NODE */) continue;
            // 컨테이너 엘리먼트에는 자신만의 제목이 있을 수 있으므로 건너뛴다
            if(m == container) continue;
            /*  최적화를 위해 단락 내에는 제목이 나타날 가능성이 낮으므로
                <p> 태그는 건너뛴다 (리스트나 <pre>태그 등을 건너뛸 수도 있지만 <p> 태그가 가장 보편적으로 나타나는 태그이다)
             */
            if(m.tagName == "P") continue;  // 최적화

            /*
                만약 자식 노드를 건너뛰지 않았다면 그것이 제목인지 확인한다
                제목이 맞다면 배열에 추가
                아니면 자식에 대해 이 작업을 재귀적으로 수행
                DOM은 class 기반이 아닌 interface 기반이기 때문에 (m instanceof HTMLHeadingElement)를 테스트 할 수 없다
             */
            if(m.tagName.length==2 && m.tagName.charAt(0) == "H") sects.push(m);
            else findSections(m, sects);

        }
    }

}

// 이것은 TOC로 돌아가기 위한 링크에 할당되는 기본 텍스트
maketoc.backlinkText = "Contents";

// 문서의 로딩 완료되었을 때
if (window.addEventListener) window.addEventListener("load", maketoc ,false);
else if (window.attachEvent) window.attachEvent("onload", maketoc);

