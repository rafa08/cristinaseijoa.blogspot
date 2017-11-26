window.setTimeout(function () {
    document.body.className = document.body.className.replace('loading', '');
}, 10);

var config = {
    apiKey: "AIzaSyDgWPHbPXFp1VR0wDgoY9l4PATkW-_2nvs",
    authDomain: "produccioncientifica-54e98.firebaseapp.com",
    databaseURL: "https://produccioncientifica-54e98.firebaseio.com",
    projectId: "produccioncientifica-54e98",
    storageBucket: "produccioncientifica-54e98.appspot.com",
    messagingSenderId: "811761058825"
};
firebase.initializeApp(config);

$(document).ready(function () {

    $('.tooltipped').tooltip({ delay: 50 });
    $(document).ready(function () {
        $('ul.tabs').tabs();
    });

    $("#sig").click(function () {
        $("#libro1").hide();
        $("#libro2").fadeIn();
        $("#sig").hide();
        $("#ant").fadeIn();
    });

    $("#ant").click(function () {
        $("#libro2").hide();
        $("#libro1").fadeIn();
        $("#ant").hide();
        $("#sig").fadeIn();
    });
});