$.ajax("https://jsonplaceholder.typicode.com/posts").then(
    function success(data) {

        $(data).each(function (i, element){
            console.log(element.title)

            const postTitle = $(`<h2 class="post_title">${element.title}</h2>`);
        const icons = $(`
            <div>
            <i class="fas fa-edit"></i> 
            <i class="fas fa-trash-alt"></i>
            </div>`)
        const postDiv = $(`<div class="post"></div>`);
        postDiv.append(postTitle);
        postDiv.append(icons);

        $("#posts").append(postDiv);


        })

        

    },
    function failed(err){
        console.log("error:" + err)
    }
)