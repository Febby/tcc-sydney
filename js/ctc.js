 $('html').addClass('d_none');
            $(document).ready(function() {
            $('html').show();
            $("body").queryLoader2({
            backgroundColor: '#27A9E0',
            barColor: '#fff',
            barHeight: 6,
            percentage: true,
            deepSearch: true,
            minimumTime: 2000
            });
            });

$(".ctc-section").click(function() {
  window.location = $(this).find("a").attr("href"); 
  return false;
});