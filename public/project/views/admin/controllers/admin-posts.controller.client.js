(function () {
    angular
        .module('MovieApp')
        .controller('adminPostsProjectController', adminPostsProjectController);

    function adminPostsProjectController(postProjectService, $location, $routeParams) {
        var model = this;
        model.postId = $routeParams['postId'];

        model.deletePost = deletePost;
        model.selectPost = selectPost;
        model.createPost = createPost;
        model.updatePost = updatePost;

        function init() {

            postProjectService
                .findAllPosts()
                .then(function (posts) {
                    console.log('this is the post');
                    console.log(posts);
                    console.log(posts[0]._author);
                    model.posts = posts;
                });
        }

        init();

        // change the number of paramaters passed to delete, update, to match client server
        function deletePost(post) {
            postProjectService
                .deletePost(post._author, post.movieId, post._id, post)
                .then(findAllPosts);
        }

        function createPost(post) {
            postProjectService
                .createPost(post._author, post.movieId, post)
                .then(findAllPosts);
        }

        function selectPost(post) {
            model.post = angular.copy(post);
        }

        function updatePost(post) {
            postProjectService
                .updatePost(post._author, post.movieId, post._id, post)
                .then(findAllPosts);
        }

        // function findAllPosts() {
        //     postProjectService
        //         .findAllPosts()
        //         .then(function (posts) {
        //             console.log('this is the post');
        //             console.log(posts[0]._author);
        //             model.posts = posts;
        //         });
        // }

    }
})();