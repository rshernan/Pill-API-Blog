$.ajax("https://jsonplaceholder.typicode.com/posts").then(
  function success(data) {
    $(data).each(function (i, element) {
      const postDiv = $(`<div class="post"></div>`);
      const postTitle = $(`<h2 class="post_title">${element.title}</h2>`);
      const icons = $(`
            <div>
            <i class="fas fa-edit btn btn__edit"></i>
            <i class="fas fa-trash-alt btn btn__delete"></i>
            </div>`);
      postDiv.append(postTitle);
      postDiv.append(icons);

      $("#posts").append(postDiv);

      

      $(".post_title").on("click", function () {
        inspectPost(element.userId, element.id);
      });
    });


    $(".btn__edit").on("click", editPost);

  },
  function failed(err) {
    console.log("error:" + err);
  }
);
