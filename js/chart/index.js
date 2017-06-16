/**
 * Created by lzy on 17/6/16.
 */
$(function(){
    $("#group_search").click(function(){
        $(this).css("display","none");
        $("#group_search_input").css("display","block");
        $("#group_search_input input").focus();
    });
    $("#group_search_input input").blur(function(){
        var inputval = $(this).val();
        if(!inputval){
            $("#group_search_input").css("display","none");
            $("#group_search").css("display","block");
        }

    });
//查看结果

    function replace_em(str){

        str = str.replace(/\</g,'&lt;');

        str = str.replace(/\>/g,'&gt;');

        str = str.replace(/\n/g,'<br/>');

        str = str.replace(/\[em_([0-9]*)\]/g,'<img src="arclist/$1.gif" border="0" />');

        return str;

    }
    $("textarea").keydown(function(e){

        if(e.keyCode===13){
            //提交
            /**
             *
             * <div class="chatter_convo_left">
             <div class="chatter_convo_img">
             <img src="file/chart/img/meme.jpeg" />
             </div>
             <div class="chatter_convo_content">
             Hello!safmaslfmlksamfklsamkfmaskdf
             </div>
             <div class="clear"></div>
             </div>
             * @type {*|jQuery|HTMLElement}
             */
            if(this.value){
                var contentme = $("#contentmessage");

                var chatter_convo_right = $("<div class='chatter_convo_right'></div>");

                var chatter_convo_img = $("<div class='chatter_convo_img'></div>");
                var imgright =$("<img src='file/chart/img/meme.jpeg' />");
                $(chatter_convo_img).append(imgright);
                $(chatter_convo_right).append(chatter_convo_img);
                var content = $("<div class='chatter_convo_content'>"+replace_em(this.value)+"</div>");
                $(chatter_convo_right).append(content);
                var clear = $("<div class='clear'></div>");
                $(chatter_convo_right).append(clear);
                $(contentme).append(chatter_convo_right);
                $('.contentmessage').scrollTop( $('.contentmessage')[0].scrollHeight );
            }
            e.preventDefault();
            this.value ='';
        }
    })
    $('.contentmessage').scrollTop( $('.contentmessage')[0].scrollHeight );


})
