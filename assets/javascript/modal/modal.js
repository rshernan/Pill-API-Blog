const backgroundModal = $('<div class="div__modal__background"></div>');
const modal = $('<div class="div__modal"><div>');
const closeButton = $('<button class="button__modal__close">close</button>');
backgroundModal.append(modal);
modal.append(closeButton);

function inspectPost(userId, postId) {
  const postTitle = $("<h1 class='title_modal'>Post Title</h1>");
  const postBody = $("<p>Example</p>");
  const userTitle = $("<h2 class='title_modal'>USER</h2>");
  const userName = $("<p>Example</p>");
  const userEmail = $("<p>Example</p>");
  const titleComments = $("<h1 class='title__modal'>Comments</h1>");
  const buttonComments = $(
    "<button class='button__modal__load'>Load Comments</button>"
  );
  buttonComments.on("click", function () {
    loadComents(postId);
  });
  $.ajax("https://jsonplaceholder.typicode.com/users/" + userId).then(
    function success(data) {
      console.log(data);
    },
    function failed(error) {}
  );
  $("body").append(backgroundModal);
  modal.append(postTitle);
  modal.append(postBody);
  modal.append(userTitle);
  modal.append(userName);
  modal.append(userEmail);
  modal.append(titleComments);
  modal.append(buttonComments);
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
      console.log(data);
    },
    function failed(error) {}
  );
}
