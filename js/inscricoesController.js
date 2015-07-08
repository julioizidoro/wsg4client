$app.controller('inscricoesController',function ($scope,$http,$routeParams,$location) {

	var restCorrida = "runs";
	var restCorredores = "runners";

	//lista de inscricoes
	$scope.rows = null;

	//uma inscrição
	$scope.row = null;

	$scope.statusCorrida = [
		{id: 0, text: 'Ativa'},
		{id: 1, text: 'Inativa'},
	];
	
	$scope.statusPagamento = [
		{id: 0, text: 'Pago'},
		{id: 1, text: 'Pendente'},
	];
	
	//ids passados no $routeParams
	$scope.corrida = null;
	$scope.corredor = null;

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

	//Carrega todas as inscricões
	$scope.loadInscricoes = function(){
		$scope.showLoader();
		$scope.corrida = $routeParams.corrida;
		$http.get($scope.server("/" + restCorrida + "/" + $routeParams.corrida + "/" + restCorredores))
			.success(function(data){
				$scope.rows = data;
				$scope.hideLoader();
			});
	};

	$scope.loadInscricao = function(){
		if ($routeParams.corredor != null)
		{
			$scope.showLoader();
			$http.get($scope.server("/" + restCorrida + "/" + $routeParams.corrida + "/" + restCorredores + "/" + $routeParams.corredor))
				.success(function(data){
					$scope.row = data;
					$scope.hideLoader();
				});
		}
		else
		{
			$scope.row = {}
			$scope.row.corrida = $routeParams.corrida;
			$scope.hideLoader();
		}
	};

	//salva ou atualiza um registro
	$scope.save = function(){
		$scope.showLoader();
		if ($routeParams.corredor==null){//Criando um registro
			$http.post($scope.server("/" + restCorrida + "/" + $routeParams.corrida + "/" + restCorredores + "/" + $scope.row.corredor),$scope.row)
				.success(function(data){
					$scope.row.isUpdate = false;
					$scope.hideLoader();
					$location.path("/inscricoes/" + $routeParams.corrida + "/corredores");
				});
		} else {//Atualizando um registro
			$http.put($scope.server("/" + restCorrida + "/" + $routeParams.corrida + "/" + restCorredores + "/" + $routeParams.corredor),$scope.row)
				.success(function(data){
					$scope.row.isUpdate = true;
					$scope.hideLoader();
					$location.path("/inscricoes/" + $routeParams.corrida + "/corredores");
				});
		}
	};

	$scope.del = function(){
		if (confirm("Deseja excluir: " + $scope.row.corredor + "?")){
			$http.delete($scope.server("/" + restCorrida + "/" + $routeParams.corrida + "/" + restCorredores + "/" + $routeParams.corredor)).success(function(s){
				$scope.hideLoader();
				$location.path("/inscricoes/" + $routeParams.corrida + "/corredores");
			});
		}

	};
});