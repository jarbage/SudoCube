var colorPalette = [0x00ff00,0x800000,0xfabebe,0xf032e6,0xf58231,0x4363d8,0x3cb44b,0xffe119,0xe6194b];
var indexSelected;

$('.sudokuUI').on('click', function() {
    $(this).toggleClass("selected");
    indexSelected = $(this).val();
});

