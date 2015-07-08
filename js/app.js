//URL de acesso ao servidor RESTful
SERVER_URL = "http://107.191.109.96/SenaiRunner";

//Criação ao $app que é o modulo que representa toda a aplicação
$app = angular.module('wsg4client', ['ngResource']);

$app.config(function ($routeProvider, $httpProvider) {
//Configura o route provider
	$routeProvider.
		when('/corridas', {templateUrl: 'view/corridas/main.html', controller: 'corridasController'}).
		when('/corridas/novo', {templateUrl: 'view/corridas/update.html', controller: 'corridasController'}).
		when('/corridas/:id', {templateUrl: 'view/corridas/update.html', controller: 'corridasController'}).
		when('/corredores', {templateUrl: 'view/corredores/main.html', controller: 'corredoresController'}).
		when('/corredores/novo', {templateUrl: 'view/corredores/update.html', controller: 'corredoresController'}).
		when('/corredores/:id', {templateUrl: 'view/corredores/update.html', controller: 'corredoresController'}).
		when('/inscricoes', {templateUrl: 'view/inscricoes/corridas.html', controller: 'inscricoesController'}).
		when('/inscricoes/:corrida/corredores', {templateUrl: 'view/inscricoes/main.html', controller: 'inscricoesController'}).		
		when('/inscricoes/:corrida/corredores/nova', {templateUrl: 'view/inscricoes/update.html', controller: 'inscricoesController'}).		
		when('/inscricoes/:corrida/corredores/:corredor', {templateUrl: 'view/inscricoes/update.html', controller: 'inscricoesController'}).
		otherwise({redirectTo: '/'});
		
	//configura o RESPONSE interceptor, usado para exibir o ícone de acesso ao servidor
	// e a exibir uma mensagem de erro caso o servidor retorne algum erro
    $httpProvider.responseInterceptors.push(function ($q, $rootScope) {
		return function (promise) {
			//Always disable loader
			$rootScope.hideLoader();
			return promise.then(function (response) {
			// do something on success
				return (response);
			},
			function (response) {
				// do something on error
				$data = response.data;
                $error = $data.error;
                if ($error && $error.text) {
                    alert($error.text);
					return (response);
                } else {
                    if (response.status === 404) {
                        alert("Erro ao acessar servidor. Página não encontrada.");
                    } else {
                        alert("ERROR! See log console");
                    }
                    return $q.reject(response);
                }
            });
		};
	});
});

$app.run(function ($rootScope) {

//Uma flag que define se o ícone de acesso ao servidor deve estar ativado
	$rootScope.showLoaderFlag = false;

//Força que o ícone de acesso ao servidor seja ativado
	$rootScope.showLoader = function () {
		$rootScope.showLoaderFlag = true;
	};
//Força que o ícone de acesso ao servidor seja desativado
	$rootScope.hideLoader = function () {
		$rootScope.showLoaderFlag = false;
	};

//Método que retorna a URL completa de acesso ao servidor.
// Evita usar concatenação no conteroller
	$rootScope.server = function (url) {
		return SERVER_URL + url;
	};

});

$app.filter('startFrom', function () {
	return function (input, start) {
		if (!input || !input.length) { 
			return; 
		}
		start = +start; //parse to int
        return input.slice(start);
	};
});

