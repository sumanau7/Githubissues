var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

$scope.getRepoIssues = function() {
  baseUrl = "https://api.github.com/repos/"
  repoUrl = $scope.repo.url;
  //Break the input url to extract username and reponame
  userName = repoUrl.split('/')[3]
  repoName = repoUrl.split('/')[4]
  //url for the github Api, userName contain organisation or username, repoName contain repository name
  githubUrl = baseUrl + userName + "/" + repoName;
  // Total Issue Count
  $http.get(githubUrl).success(function(response) {
    //Get total no of open issues using the open issues count
    $scope.repo.open_issues_count = response.open_issues_count
  });

  var timeLast24hr = new Date();
  //Date and Time 1 day or 24 hours ago in ISO 8601 Format
  timeLast24hr.setDate(timeLast24hr.getDate() - 1);
  sinceUrl = timeLast24hr.toISOString()
  //url for the github Api with since parameter equal to time of last 24 hrs that return only issues updated at or after this time
  githubUrlLast24 = baseUrl + userName + "/" + repoName + '/issues?state=open&since=' + sinceUrl;
  //call the API and count the result
  $http.get(githubUrlLast24).success(function(response) {
    //Get no of open issues that were opened in last 24 hours
    $scope.repo.open_issues_count_last_24_hr = response.length
  });

  //Date and Time 7 days ago in ISO 8601 Format
  var timeLast7days = new Date();
  timeLast7days.setDate(timeLast7days.getDate() - 7);
  sinceUrl = timeLast7days.toISOString()
  //url for the github Api with since parameter equal to time of 7 days ago that return only issues updated at or after this time
  githubUrl7 = baseUrl + userName + "/" + repoName + '/issues?state=open&since=' + sinceUrl;

  $http.get(githubUrl7).success(function(response) {
    $scope.repo.open_issues_count_last_24_hr_7_days = response.length - $scope.repo.open_issues_count_last_24_hr;
    $scope.repo.open_issues_count_7_days = $scope.repo.open_issues_count - response.length;
  });

};
}]);﻿
