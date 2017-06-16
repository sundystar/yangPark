/**
 * Created by lzy on 17/6/16.
 */
$(function(){

    var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    function generateMixed(n) {
        var res = "";
        for(var i = 0; i < n ; i ++) {
            var id = Math.ceil(Math.random()*35);
            res += chars[id];
        }
        return res;
    }

    var socket = io.connect('http://139.224.13.34:3100');
    socket.on('connect',function(){
        socket.emit('connection',{userName:generateMixed(5)})
    })

    socket.on('init',function(data){
        var name = data.data;
        console.log(name);
    });

    socket.on('message',function(data) {

        var message = data.message;

        var contentme = $("#contentmessage");

        var chatter_convo_left = $("<div class='chatter_convo_left'></div>");

        var chatter_convo_img = $("<div class='chatter_convo_img'></div>");
        var imgright =$("<img src='file/chart/img/meme.jpeg' />");
        $(chatter_convo_img).append(imgright);
        $(chatter_convo_left).append(chatter_convo_img);
        var content = $("<div class='chatter_convo_content'>"+replace_em(message)+"</div>");
        $(chatter_convo_left).append(content);
        var clear = $("<div class='clear'></div>");
        $(chatter_convo_left).append(clear);
        $(contentme).append(chatter_convo_left);
        $('.contentmessage').scrollTop( $('.contentmessage')[0].scrollHeight );

    });

    socket.on('dis',function(data){

    });









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
                socket.emit("message",{message:replace_em(this.value)})
            }
            e.preventDefault();
            this.value ='';
        }
    })
    $('.contentmessage').scrollTop( $('.contentmessage')[0].scrollHeight );


})
