var momentBiz = {
    ajax : function( options ){
        $.ajax({
            type: 'POST',
            url: 'https://leancloud.cn:443/1.1/functions/'+ options.functions,
            data: JSON.stringify( options.data ),
            contentType: 'application/json',
            headers : {
                'X-AVOSCloud-Application-Id' : 'nddk6udki7vg06j1w2gqli72t0q64hxivnf2zvxdzm8sef55',
                'X-AVOSCloud-Application-Key' : 'qke60ogn5d7vpr4k3he9ykm9sibq6buifwxxrjkl2qytm480'
            },
            success: function(remoteData){
                if( options.success ){
                    options.success( remoteData );
                }
            },
            error: function(xhr, type){
                if( options.error ){
                    options.error(xhr, type);
                }
            }
        });
    },

    getUserName : function(){
        return localStorage.getItem('moment-username');
    },

    saveLocation : function(){
        momentBiz.getLocation(function( location ){
            if( !location ){
                return;
            }
            momentBiz.ajax({
                data : {
                    "username": momentBiz.getUserName(),
                    "latitude":location[0],
                    "longitude":location[1]
                },
                functions : 'saveCurrentAddress',
                success : function( remoteData ){
                    if( remoteData && remoteData.result.code === 200 && remoteData.result.results ){
                        location.href = "index.html";
                    }
                },
                error: function(xhr, type){
                }
            });
        });
    },

    getLocation : function( callback ){
        var boo = false,
            times = setTimeout(function(){
                if( !boo ){
                    boo = true;
                    callback( localStorage.getItem('moment-location') );
                }
            },2000);

        navigator.geolocation.getCurrentPosition(
            function(position){
                if( position ){
                    localStorage.getItem([position.coords.latitude,position.coords.longitude])
                }
                if( !boo ){
                    clearTimeout( times );
                    callback([position.coords.latitude,position.coords.longitude]);
                }
            }
        )
    }
}