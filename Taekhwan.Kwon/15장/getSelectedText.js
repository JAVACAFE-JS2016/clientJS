/**
 * Created by kwon on 2016. 10. 28..
 */

function getSelectedText(){
    if(window.getSelection()){
        /*
            이 기능은 앞으로 표준화가 될 가능성이 가장 높아 보임
            getSelection()은 Selection 객체를 반환
         */
        return window.getSelection().toString();

    }else if(document.getSelection()){
        // 좀더 오래되고 간단한 방법. 문자열을 반환
        return document.getSelection();
    }else if(document.selection){
        // IE에 특화된 기법.
        return document.selection.createRange().text;
    }
}

function getTextFieldSelection(e){
    if(e.selectionStart != undefined && e.selectionEnd != undefined){
        var start = e.selectionStart;
        var end = e.selectionEnd;
        return e.value.substring(start, end);
    }
    else return ""; // 이 브라우저에서 지원되지 않음
}


/*
<a href="javascript:
    var q;
    if(window.getSelection) q = window.getSelection().toString();
    else if(document.getSelection) q = document.getSelection();
    else if(document.selection) q = document.selection.createRange().text;
    void window.open('http://en.wikipedia.org/wiki/' + q);
>
Look Up Selected Text In Wikipedia
</a>

*/