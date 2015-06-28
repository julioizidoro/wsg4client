$app.controller('corredoresController',function ($scope,$http,$routeParams,$location) {

	//lista de corredores
	$scope.rows = null;

	//uma corredor
	$scope.row = null;

	//Pagination
	$scope.currentPage = 0;
	$scope.pageSize = 10;
	
	$scope.numberOfPages = function(){
		return Math.ceil($scope.rows.length/$scope.pageSize);                
	};

	$scope.loadAll = function(){
		$scope.showLoader();
		$http.get($scope.server("/corredores")).success(function(data){
			$scope.rows = data.corredores;	
			$scope.hideLoader();
		});
	};

	$scope.loadRow = function(){
		if ($routeParams.id!=null){
			$scope.showLoader();
			$http.get($scope.server("/corredores/"+$routeParams.id)).success(function(data){
				$scope.row = data;
				$scope.row.isUpdate = true;
				$scope.hideLoader();
			});
		}
		else {
			$scope.row = {}
			$scope.row.idcorrida = null;
			$scope.row.isUpdate = false;
			$scope.hideLoader();
		}
	}

	//salva ou atualiza um registro
	$scope.save = function(){
		$scope.showLoader();
		if ($routeParams.id==null){//Criando um registro
			$http.post($scope.server("/corredores"),$scope.row).success(function(data){
				alert("Salvo com sucesso");
				$scope.row.isUpdate = true;
				$scope.hideLoader();
			});
		} else {//Atualizando um registro
			$http.put($scope.server("/corredores/"+$routeParams.id),$scope.row).success(function(data){
				alert("Salvo com sucesso");
				$scope.row.isUpdate = true;
				$scope.hideLoader();			
			});
		}
	};
});