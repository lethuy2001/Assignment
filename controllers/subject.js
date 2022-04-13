app.controller( "mySubject" , ( $scope , $rootScope , $http ) => {
    $scope.subjects = [] ;
    $rootScope.subject = {} ;
    $scope.numberOfPageSb = [] ;
    $rootScope.numberOfQuiz = [] ;
    $rootScope.numberOfQuestion = 0 ; 
    $rootScope.question = {} ;
    
    var urll = "https://6212df06f43692c9c6f42e4d.mockapi.io/"

    $http.get( urll + "Subject")
    .then( (reponse) => {
        $scope.subjects = reponse.data ;

        if( $scope.subjects.length % 9 == 0  ){
            $scope.lengthOfPageSb = $scope.subjects.length / 9  ;
          }else{
            $scope.lengthOfPageSb = $scope.subjects.length / 9 + 1;
         }
        for( var i = 0 ; i< $scope.lengthOfPageSb - 1; i++ ){
            $scope.numberOfPageSb.push(i)
        }
    })

    $scope.pagingSubjects = ( index ) => {
        $scope.indexOfPageSb = index ;
      }

})