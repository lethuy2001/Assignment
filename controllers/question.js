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
            title: 'B???n c?? mu???n ho??n th??nh b??i ki???m tra kh??ng?',
            showDenyButton: true,
            confirmButtonText: 'C??',
            denyButtonText: `Kh??ng`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              
              for( var i=0 ; i< 10 ; i++ ){
                 if( $scope.answerStudent[i] == $scope.listQuestion[i].AnswerId){
                    $scope.tinhDiem += 1 ;
                }
             }
              if( $scope.tinhDiem >= 5 ){
                  Swal.fire('Ch??c m???ng b???n ???? v?????t qua b??i thi', '??i???m c???a b???n: ' + $scope.tinhDiem , 'success')
              }else{
                 Swal.fire('Ti???c qu??! H??y c??? g???ng v??o l???n sau nh??', '??i???m c???a b???n: ' + $scope.tinhDiem , 'error')
              }
            } else if (result.isDenied) {
              Swal.fire('H???y th??nh c??ng', '', 'info')
            }
          })
    }
})