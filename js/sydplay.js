 $(function() {
                $("ul#rp_playlist").responsiveplaylist({
                    autoPlay: false,
                    autoPlayOnLoad: false,
                    allowFullScreen: true,
                    deepLinks: true,
                    onChange: function(){},
                    start: 1,
                    youtube: {
                        autohide: '2',
                        rel: '1',
                        theme: 'dark',
                        color: 'white',
                        showinfo: '1',
                        vq: 'medium'
                    },
                    vimeo: {
                        title: '1',
                        byline: '1',
                        portrait: '1',
                        color: '00adef'
                    },
                    // youtubeUsername: 'username',
                    // vimeoUsername: 'username',
                    // youtubePlaylist: 'XXXXXXXXXXXXXXXXXX',
                    // vimeoAlbum: 'XXXXXXX',
                    holderId: 'rp_video',
                    secure: 'auto'
                });
            });