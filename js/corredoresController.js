$app.controller('corredoresController',function ($scope,$http,$routeParams,$location) {

	var restCorredores = "runners";

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
		$http.get($scope.server("/" + restCorredores)).success(function(data){
			$scope.rows = data.reply;	
			$scope.hideLoader();
		});
	};

	$scope.loadRow = function(){
		if ($routeParams.id!=null){
			$scope.showLoader();
			$http.get($scope.server("/" + restCorredores + "/" + $routeParams.id)).success(function(data){
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
		if ($routeParams.id==null){//Criando um registro
			$http.post($scope.server("/" + restCorredores),$scope.row).success(function(data){
				alert("Salvo com sucesso");
				$scope.row.isUpdate = true;
				$scope.hideLoader();
			});
		} else {//Atualizando um registro
			$http.put($scope.server("/" + restCorredores + "/" + $routeParams.id),$scope.row).success(function(data){
				alert("Salvo com sucesso");
				$scope.row.isUpdate = true;
				$scope.hideLoader();			
			});
		}
	};
	
	$scope.del = function(){
		$scope.showLoader();
		if ($routeParams.id!=null){
			$http.delete($scope.server("/" + restCorredores + "/" + $routeParams.id)).success(function(data){
				alert("Excluído com sucesso");
				$scope.hideLoader();
				$location.path("/corridas");
			});
		}
	};
});