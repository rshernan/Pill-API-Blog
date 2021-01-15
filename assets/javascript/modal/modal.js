

function initializeModal(){
    const backgroundModal = $('<div class="modal_container"></div>');
    const modal = $('<div class="modal"><div>');
    const closeButton = $('<button class="button__modal__close">close</button>');
    closeButton.on("click",function(){
        $(".modal_container").remove();
    });
    backgroundModal.append(modal);
    modal.append(closeButton);
    $('body').append(backgroundModal);
}

function inspectPost(element){
    initializeModal();
    console.log(element);
    const postTitle = $(`<h1 class='title_modal'>${element.title}</h1>`);
    const postBody = $(`<p>${element.body}</p>`);
    const userTitle = $("<h2 class='title_modal'>USER</h2>");
    const userName = $("<p>Example</p>");
    const userEmail = $("<p>Example</p>");
    const titleComments = $("<h1 class='title_modal'>Comments</h1>");
    const buttonComments = $("<button class='button__modal__load'>Load Comments</button>");
    const commentsContainer = $(`<div class='commentsContainer__div ${element.id}'></div>`);
    buttonComments.on("click",function(){
        loadComents(element.id);
    })
    $.ajax("https://jsonplaceholder.typicode.com/users/"+element.userId)
    .then(
        function success(data){
            console.log(data);
            userName.text(data.username);
            userEmail.text(data.email);
        }, function failed(error){

        }
    );
    $(".modal").append(postTitle);
    $(".modal").append(postBody);
    $(".modal").append(userTitle);
    $(".modal").append(userName);
    $(".modal").append(userEmail);
    $(".modal").append(titleComments);
    $(".modal").append(buttonComments);
    $(".modal").append(commentsContainer);
}

function editPost(postId) {

  const editModal = $(`
    <div class="modal_container">
        <div class="toast_container"></div>
        <div class="modal">
            <h3 class="title_modal">Edit modal</h3>
            <div class="content_modal">
                <form id="edit_form" class="form_modal" method="put">

                    <label for="post_title">Title</label>
                    <input class="input" id="post_title" type="text"/>
                    
                    <label for="post_body">Body</label>
                    <input class="input" id="post_body" type="text"/>

                    <button type="submit" id="submit">Save</button>
                </form>
            </div>
        </div>
    </div>`);

  $("#modal").append(editModal);

  $("#edit_form").on("submit", function (e) {
    e.preventDefault();

    var requestStatus = $(`<h3 class="status"></h3>`);
    requestStatus.text("Submitting...");

    $(".toast_container").append("<div class='toast'></div>");
    $(".toast").append(requestStatus);

    setTimeout(function(){
        $(".toast").fadeOut(1500);
    },1500)

    $.ajax(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify({
        title: $("#post_title").val(),
        body: $("#post_body").val(),
      }),
    }).then(
      function success(data) {
        var submittedData1 = $(`<p>Title: ${data.title}</p>`);
        var submittedData2 = $(`<p>Body: ${data.body}</p>`);
        requestStatus.text(`Successful request!!`);
        $(".toast").append(submittedData1);
        $(".toast").append(submittedData2);
      },
      function failed(err) {
        requestStatus.text("Request failed");
      }
    );
  });
}

function deletePost(postId) {
  var requestStatus = $(`<h3 class="status"></h3>`);
  requestStatus.text("Deleting...");

    setTimeout(function(){
        $(".toast").fadeOut(1500);
    },1000)

  $("body").append("<div class='toast'></div>");
  $(".toast").append(requestStatus);

  $.ajax(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: "DELETE",
    contentType: "application/json",
  }).then(
    function success(data) {
        requestStatus.text(`Post deleted!!`);
    },
    function failed(err) {
        requestStatus.text("Request failed");
    }
  );
}

function loadComents(postId) {
  $.ajax(
    "https://jsonplaceholder.typicode.com/posts/" + postId + "/comments"
  ).then(
    function success(data) {
      console.log(postId);
      $(data).each(function(index, element){
          let commentContainer = $(`<div class="commentContainer__div"></div>`)
          let name=$(`<h1 class="title_modal">${element.name}</h1>`);
          let body=$(`<p>${element.body}<p>`);
          let email=$(`<p>${element.email}<p>`);
          commentContainer.append(name);
          commentContainer.append(body);
          commentContainer.append(email);
          $(`.commentsContainer__div.${postId}`).append(commentContainer);
      });
    },
    function failed(error) {}
  );
}
