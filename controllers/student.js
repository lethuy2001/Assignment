app.controller( "myCtrl" , ( $scope , $rootScope , $http ) => {
    $rootScope.student = {} ;
    $scope.studentForm = {} ;
    $rootScope.password2 = "" ;
    $scope.numberOfPage = [] ;
    $scope.userUsing = [] ;
    $scope.students = [] ;
    $scope.checkLogin = "" ;
    $scope.checkRegister = "" ;
    $scope.checkPassword = true;
    $rootScope.checkAcount = false ;
    $rootScope.checkRole = "" ;
    $scope.index = -1 ; 
    var url = "https://6212df06f43692c9c6f42e4d.mockapi.io/Students"

    $http.get( url)
    .then( (response) => {
        $scope.students = response.data ;
        if( $scope.students.length % 10 == 0 || $scope.students.length < 10 ){
            $scope.lengthOfPage = $scope.students.length / 10  ;
          }else{
            $scope.lengthOfPage = $scope.students.length / 10  + 1;
          }
          for( var i = 0 ; i<$scope.lengthOfPage ; i++ ){
             $scope.numberOfPage.push(i)
          }
    })

    // Phương thức đăng nhập
    $scope.loginStudent = function ( ){
        for( var i= 0  ; i < $scope.students.length ; i++ ){
            if( $rootScope.student.email == $scope.students[i].email && $scope.students[i].password == $rootScope.student.password ){
                $rootScope.student = $scope.students[i] ;
                $scope.checkLogin = "sucess" ;
                $rootScope.checkAcount = true ;
                if( $rootScope.student.role == "true" ){
                    $rootScope.checkRole = "Admin"
                }else{
                    $rootScope.checkRole = "user"
                }
            }
        }

        if( $scope.checkLogin != "sucess"){
            $scope.checkLogin = "error"
        }
    }

    // Phương thức đăng xuất
    $rootScope.exitStudent = ( ) => {
        $rootScope.checkAcount = false ;
        $rootScope.student = {} ;
        $rootScope.checkRole = "" ;
        $scope.checkLogin = "" ;
    }

    // Phương thức phân trang
    $scope.pagingStudent = ( index ) => {
      $scope.indexOfPage = index ;
    }

    // Phương thức đăng ký 
    $scope.registerStudent = ( ) => {
            $rootScope.student.role = "false"
            for( var i=0 ; i < $scope.students.length ; i++ ){
                if( $rootScope.student.email == $scope.students[i].email ){
                    $scope.checkRegister = "error"
                }
            }
            if( $scope.checkRegister != 'error' ){
                $http.post( url , $rootScope.student )
                    .then( ( response ) => {
                    $scope.students.push( response.data)
                    $scope.checkRegister = "sucess"
                })
            }
    }

    // Phương thức thêm
    $scope.addStudent = ( ) => {
        if( $scope.index = -1 ){
            for( var i=0 ; i < $scope.students.length ; i++ ){
                if( $scope.studentForm.email == $scope.students[i].email ){
                   $scope.checkRegister = "error"
                }
           }
            if( $scope.checkRegister != 'error' ){
                $http.post( url , $scope.studentForm )
                    .then( ( response ) => {
                    $scope.students.push( response.data)
                    $scope.checkRegister = "sucess"
                })
            }
        }else{
            $http.put( url + "/" + $scope.studentForm.id , $scope.studentForm )
            .then( (response) => {
                
            })
        }
    }

    $scope.clearForm = function () {
        $scope.index = -1 ;
        $scope.studentForm = {}
    }

    // Phương thức xóa
    $scope.onDelete = function ( index ){
        const id = $scope.students[index].id;
        const apiDelete = url + "/" + id;

        // Gọi API với method DELETE
        $http.delete(apiDelete)
            .then(function (response) { 
                $scope.students.splice(index, 1);
            })
        }
        $scope.clearForm() ;

    $scope.fillOfForm = ( index ) => {
        $scope.index = 1 ;
        $scope.studentForm = $scope.students[index]
        $scope.studentForm.birthday = $scope.students[index].birthday
        console.log( $scope.studentForm.birthday)
    }    
})