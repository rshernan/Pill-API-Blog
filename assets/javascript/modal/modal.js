const backgroundModal = $('<div class="div__modal__background"></div>');
const modal = $('<div class="div__modal"><div>');
const closeButton = $('<button class="button__modal__close">close</button>');
backgroundModal.append(modal);
modal.append(closeButton);

function inspectPost(userId, postId){
    const postTitle = $("<h1 class='title_modal'>Post Title</h1>");
    const postBody = $("<p></p>");
    const userTitle = $("<h2 class='title_modal'>USER</h2>");
    const userName = $("<p></p>");
    const userEmail = $("<p></p>");
    const titleComments = $("<h1 class='title__modal'>Comments</h1>");
    const buttonComments = $("<button class='button__modal__load'>Load Comments</button>");
    buttonComments.on("click",function(){
        loadComents(postId);
    })
    $.ajax("https://jsonplaceholder.typicode.com/users/"+userId)
    .then(
        function success(data){
            console.log(data);
        }, function failed(error){

        }
    );
    $('body').append(backgroundModal);
}

function editPost(){
    const postTitle = $("<h1 class='title_modal'>Edit post</h1>");
    const labelTitle = $("<label>Title</label>");
    const labelBody = $("<label>Body</label>");
    const inputTitle = $("<input/>");
    const inputBody = $("<input/>");
    const buttonSave = $("<button>Save</button>");
}

function loadComents(postId){
    $.ajax("https://jsonplaceholder.typicode.com/posts/"+postId+"/comments")
    .then(
        function success(data){
            console.log(data);
        }, function failed(error){

        }
    );
}