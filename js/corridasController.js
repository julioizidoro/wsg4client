$app.controller('corridasController',function ($scope,$http,$routeParams,$location) {

	var restCorrida = "runs";

	//lista de corridas
	$scope.rows = null;

	//uma corrida
	$scope.row = null;

	//Pagination
	$scope.currentPage = 0;
	$scope.pageSize = 10;

	$scope.numberOfPages = function(){
		return Math.ceil($scope.rows.length/$scope.pageSize);
	};

	//Carrega todas as corridas
	$scope.loadAll = function(){
		$scope.showLoader();
		$http.get($scope.server("/" + restCorrida)).success(function(data){
			$scope.rows = data.wine;
			$scope.hideLoader();
		});
	};

	$scope.loadRow = function(){
		if ($routeParams.id!=null){
			$scope.showLoader();
			$http.get($scope.server("/" + restCorrida + "/" + $routeParams.id)).success(function(data){
				$scope.row = data;
				$scope.row.isUpdate = true;
				$scope.hideLoader();
			});
		}
		else {
			$scope.row = {}
			$scope.row.id = null;
			$scope.row.isUpdate = false;
			$scope.hideLoader();
		}
	}

	//salva ou atualiza um registro
	$scope.save = function(){
		$scope.showLoader();
		console.log("ID: "+$routeParams.id);
		if ($routeParams.id==null){//Criando um registro
			$http.post($scope.server("/" + restCorrida),$scope.row).success(function(data){
				$scope.row.isUpdate = true;
				$scope.hideLoader();
				$location.path("/corridas");
			});
		} else {//Atualizando um registro
			$http.put($scope.server("/" + restCorrida + "/" + $routeParams.id),$scope.row).success(function(data){
				$scope.row.isUpdate = true;
				$scope.hideLoader();
				$location.path("/corridas");
			});
		}
	};

	$scope.del = function(){
		if (confirm("Deseja excluir: " + $scope.row.nome + "?")){
			$http.delete($scope.server("/" + restCorrida + "/" + $routeParams.id)).success(function(s){
				$scope.hideLoader();
				$location.path("/corridas");
			});
		}

	};

});