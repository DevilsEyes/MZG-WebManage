define(function () {

    if (typeof(VM_PageTab)=='undefined'){
        VM_PageTab = avalon.define({
            $id: "PageTab",
            current:0,
            max:0,
            page:[],
            url:"",
            pc:function(index){
                var p = $(this).text();
                if(p=='…'){
                    var p2 = VM_PageTab.page[index-1];
                    if(index==1&&index==VM_PageTab.page.length-2||p2<VM_PageTab.current){
                        //展开index+1向左的页码
                    }
                    else{
                        //展开index-1向右的页码
                    }
                }
                else if(p=='<'){
                    location.hash = url + "?p=" + (VM_PageTab.current-1);
                }
                else if(p=='>'){
                    location.hash = url + "?p=" + (VM_PageTab.current+1);
                }
                else{
                    location.hash = url + "?p=" + p;
                }
            },
            init:function(){
                VM_PageTab.page=[];
                for(var i=1;i<=VM_PageTab.max;i++){VM_PageTab.page.push(i);}

                if(VM_PageTab.current>5){
                    VM_PageTab.page.splice(1,VM_PageTab.current-3,'…');
                }

                if(VM_PageTab.current<(VM_PageTab.max-4)){
                    VM_PageTab.page.splice(VM_PageTab.current+1,VM_PageTab.max-VM_PageTab.current-3,'…');
                }

                avalon.scan();
            }
        });
    }


})