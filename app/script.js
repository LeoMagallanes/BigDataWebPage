//Contains JavaScript code that runs in your user's browser.
//It can send requests to the server to list users, add users to the database, and delete users from the database.
var app = angular.module('myApp', []);
app.controller('myCtrl', async function($scope, $http) {
    var getData = async function() {
        return $http( {            
            method: 'GET',
            url: 'http://127.0.0.1:3000/api/users' //Estara correcto el url?
        }).then(function successCallback(response) {
            console.log("Dentro de getdata esperando");
            //$scope permite que los datos esten visibles en el controlador
            //y en la vista asociada al controlador.
            $scope.users = response.data;
            //$scope.verify_user();
            console.log(response.data);
        }, function errorCallback(response) {
            console.log("Error troll en la llamada a get");
            console.log('Error: ' + response);
        });
    };
    await getData();

    $scope.verify_user = function() {
        console.log("Verificando el usuario");
        // Obtener el usuario y contraseña del $scope
        var username = $scope.username;
        var password = $scope.password;

        // Buscar el usuario en la lista de usuarios
        console.log($scope);
        //var userFound = await User.find()
        var userFound = $scope.users.find(function(user) {
            return user.user === username && user.password === password;
        });

        if (userFound) {
            console.log('Usuario encontrado, permitiendo inicio de sesión');
            // Aquí puedes redirigir al usuario a la página de inicio o realizar alguna otra acción
            window.location.href = './index.html';
        } else {
            // Usuario no encontrado, mostrar mensaje de error
            alert('El usuario no ha sido registrado, por favor registrese primero');
            console.log('Usuario no encontrado');
            window.location.href = './login.html';
            // Aquí puedes mostrar un mensaje de error al usuario
        }
    };

    //Ocupamos agarrar User y Password desde la vista
    // <input type="text" ng-model="User" required>
    $scope.add_user = async function() {
        console.log("Entrando a add_user"); 
        var jsonString = '{ "username": "' + $scope.username + ', "password": "' + $scope.password + '}';
        //var body = JSON.parse('{ "user": "huahuis", "password": "2" }');
        //var body = JSON.parse(jsonString);
        var body = {
            username: $scope.username,
            password: $scope.password
        };
        
        try {
            const response = await $http({
                method: 'POST',
                url: 'http://127.0.0.1:3000/api/auth/register',
                data: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if(response.data && response.data.message == 'User already exists') { 
                alert('El1 usuario ya está registrado. Por favor, intente con otro nombre de usuario.');

            }
            console.log(response);
        }catch (error){
            alert('El usuario ya está registrado. Por favor, intente con otro nombre de usuario.');

                // Redirigir a la página de registro
            window.location.href = './signup.html';
            console.log(body);
            console.log("error en add_user");
            console.log('Error: ' + error);
        }
        /*
        $http({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/auth/register',
            data: body
        }).then(function successCallback(response) {
            console.log(response);
            //return getData();
            return response.json();
        }, function errorCallback(response) {
            console.log("error en add_user");
            console.log('Error: ' + response);
        });*/
    };
});