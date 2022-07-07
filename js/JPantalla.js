
    $(window).resize(function () {
        Reacomodar();
    });

    $(document).ready(function () {
        Reacomodar();
    });

    function Reacomodar() {
        $('.DivNovedades').height($(window).height() - 100);
    }
