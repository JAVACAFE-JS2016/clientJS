/**
 * Node n에 있는 자식의 순서를 반대로 만듬
 *
 */
function reverse(n){
    // 임시 저장소로 활용하기 위해 빈 DocumentFragment를 생성
    var f = document.createDocumentFragment();
    /*
        각 자식을 뒤에서부터 순회하면서 DocumentFragment에 삽입
        즉 n의 마지막 자식은 f의 첫 번째 자식이 된다
        n의 자식을 f에 삽입하면 해당 자식은 n에서 자동으로 삭제됨 주의
     */
    while(n.lastChild) f.appendChild(n.lastChild);

    // 마지막으로 f의 자식을 모두 n으로 한꺼번에 옮김
    n.appendChild(f);
}
//reverse(document.getElementById("d"))