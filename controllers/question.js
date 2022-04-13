app.controller( "myQuestion" ,  ( $scope ,$routeParams ,$http ) => {
    var url = "https://6212df06f43692c9c6f42e4d.mockapi.io/"
    $scope.questions = [] ;
    $scope.question = {} ;
    $scope.subject = {} ;
    $scope.listQuestion = [] ;
    $scope.tinhDiem = 0 ;
    $scope.index = 0 ;
    $scope.answerStudent = [] ;
    $scope.checkAnswer = false ;
    // $scope.answerChooseOfSt = 0 ;

    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    };
 
    $http.get ( url + $routeParams.Id )
    .then( ( response ) => {
        $scope.questions = response.data ;
        for( i=0 ; i < 10 ; i++ ){
            $scope.listQuestion.push($scope.questions[ getRandomInt( 0 , 77 ) ] ) ; 
        }

        $scope.question = $scope.listQuestion[$scope.index]
    })

    $http.get( url + "Subject"  + "/"+ $routeParams.Id )
    .then( ( response ) => {
        $scope.subject = response.data ;
    })

    $scope.nextQuestion = function ( ){
        $scope.index++ ;
        if( $scope.index >= 10 ){
            $scope.index = 9 ;
        }

        $scope.question = $scope.listQuestion[$scope.index]
        checked() ;
    }

    $scope.saveQuestionST = ( answer  ) => {
        if( $scope.answerStudent[$scope.index] == undefined  ){
            $scope.answerStudent.push(answer) ;
        }else{
            $scope.answerStudent.splice( $scope.index , 1 , answer )
        } 
        console.log( $scope.answerStudent )
    }

    $scope.previousQuestion = function( ){
        $scope.index-- ;
        if( $scope.index <= 0 ){
            $scope.index = 0 ;
        }
        $scope.question = $scope.listQuestion[$scope.index]
        checked() ;
    }

    function checked ( ){
        $scope.checkAnswer = false ; 
        for( var i=0 ; i < 4 ; i++ ){
            if( $scope.answerStudent[$scope.index] == $scope.listQuestion[$scope.index].Answers[i].Id){
                $scope.checkAnswer = true ;
            }
        }
    }

    $scope.tinhDiemST = function ( ){
        Swal.fire({
            title: 'Bạn có muốn hoàn thành bài kiểm tra không?',
            showDenyButton: true,
            confirmButtonText: 'Có',
            denyButtonText: `Không`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              
              for( var i=0 ; i< 10 ; i++ ){
                 if( $scope.answerStudent[i] == $scope.listQuestion[i].AnswerId){
                    $scope.tinhDiem += 1 ;
                }
             }
              if( $scope.tinhDiem >= 5 ){
                  Swal.fire('Chúc mừng bạn đã vượt qua bài thi', 'Điểm của bạn: ' + $scope.tinhDiem , 'success')
              }else{
                 Swal.fire('Tiếc quá! Hãy cố gắng vào lần sau nhé', 'Điểm của bạn: ' + $scope.tinhDiem , 'error')
              }
            } else if (result.isDenied) {
              Swal.fire('Hủy thành công', '', 'info')
            }
          })
    }
})