(function () {
    'use strict';

    angular
        .module('docMgmtApp')
        .factory('BlogService', BlogService);

    BlogService.$inject = ['$http'];
    function BlogService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get('/blogs.json');
        }

        function GetById(id) {
            return $http.get('/blogs/' + id) ;
        }

        function Create(blog) {
            return $http.post('/blogs', blog);
        }

        function Update(blog) {
            return $http.put('/blogs/' + blog.id, blog);
        }

        function Delete(id) {
            return $http.delete('/blogs/' + id);
        }
    }

})();
