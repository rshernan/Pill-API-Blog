const backgroundModal = $('<div class="div__modal__background"></div>');
const modal = $('<div class="div__modal"><div>');
const closeButton = $('<button class="button__modal__close">close</button>');
backgroundModal.append(modal);
modal.append(closeButton);

function inspectPost(userId, postId){
    const postTitle = $("<h1 class='title__modal'>Post Title</h1>");
    const postBody = $("<p>Example</p>");
    const userTitle = $("<h2 class='title__modal'>USER</h2>");
    const userName = $("<p>Example</p>");
    const userEmail = $("<p>Example</p>");
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
    modal.append(postTitle);
    modal.append(postBody);
    modal.append(userTitle);
    modal.append(userName);
    modal.append(userEmail);
    modal.append(titleComments);
    modal.append(buttonComments);
}

function editPost(){
    // const postTitle = $("<h1 class='title_modal'>Edit post</h1>");
    // const labelTitle = $("<label>Title</label>");
    // const labelBody = $("<label>Body</label>");
    // const inputTitle = $("<input/>");
    // const inputBody = $("<input/>");
    // const buttonSave = $("<button>Save</button>");

    const editModal = $(`
    <div class="modal_container">
        <div class="modal">
            <h3 class="title_modal">Edit modal</h3>
            <div class="content_modal">
                <form class="form_modal" method="post">

                    <label for="post_title">Title</label>
                    <input class="input" id="post_title" type="text"/>
                    
                    <label for="post_body">Body</label>
                    <input class="input" id="post_body" type="text"/>

                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    </div>`
)


    $("#modal").append(editModal);

    // $.ajax("https://jsonplaceholder.typicode.com/posts", {
    //     method: "PUT",
    //     contentType: "application/json",
    //     data: JSON.stringify({
    //         title: "",
    //         body: "",
    //     })
    // })


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