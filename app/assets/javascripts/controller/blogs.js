(function() {
  'use strict';

  angular
    .module('docMgmtApp')
    .controller('BlogsListCtrl', ['$rootScope', '$scope', '$auth', '$sce', '$location', 'BlogService', 'FlashService',
      function BlogsListCtrl($rootScope, $scope, $auth, $sce, $location, BlogService, FlashService) {
        BlogService.GetAll()
          .then(function(response) {
            $scope.blogs = response.data;
          }, function(response) {
            $scope.error = response.error;
          });

        $scope.delete = function(blog) {
          var _index = $scope.blogs.indexOf(blog);
          BlogService.Delete(blog.id)
            .then(function(response) {
              $scope.blogs.splice(_index, 1);
              FlashService.Success('Blog deleted successfully', true);
            }, function(response) {
              FlashService.Error(response.errors.toString());
            });
        }

        $scope.renderHtml = function(html_code)
        {
          return $sce.trustAsHtml(html_code);
        }
      }
    ])
    .controller('BlogsShowCtrl', ['$rootScope', '$routeParams', '$scope', '$auth', '$sce', '$location', 'BlogService',
      function BlogsShowCtrl($rootScope, $routeParams, $scope, $auth,  $sce, $location, BlogService) {

        BlogService.GetById($routeParams.id)
          .then(function(response) {
            $scope.blog = response.data;
          }, function(response) {
            $scope.error = response.error;
          });

        $scope.renderHtml = function(html_code)
        {
          return $sce.trustAsHtml(html_code);
        }

      }
    ])

    .controller('BlogsCreateCtrl', ['$rootScope', '$scope', '$auth', '$location', 'BlogService', 'FlashService',
      function BlogsCreateCtrl($rootScope, $scope, $auth, $location, BlogService, FlashService) {
        // Editor options.
        $scope.editorOptions = {
            language: 'ru',
            uiColor: '#000000'
        };
        $scope.submit = function save() {
          var blog = $scope.blog;
          BlogService.Create(blog)
            .then(function(response) {
              FlashService.Success('New Blog created successfully', true);
              $location.path('/blogs');
            }, function(response) {
              FlashService.Error(response.errors.toString());
            });
        }

      }
    ])

    .controller('BlogsEditCtrl', ['$rootScope', '$routeParams', '$scope', '$auth', '$location', 'BlogService', 'FlashService',
      function BlogsEditCtrl($rootScope, $routeParams, $scope, $auth, $location, BlogService, FlashService) {
        // Editor options.
        $scope.editorOptions = {
            language: 'ru',
            uiColor: '#000000'
        };
        BlogService.GetById($routeParams.id)
          .then(function(response) {
            $scope.blog = response.data;
          }, function(response) {
            $scope.error = response.error;
          });

        $scope.submit = function save() {
          var blog = $scope.blog;
          BlogService.Update(blog)
            .then(function(response) {
              FlashService.Success('Blog update successfully', true);
              $location.path('/blogs');
            }, function(response) {
              FlashService.Error(response.errors.toString());
            });
      }
     }
    ])


})();
