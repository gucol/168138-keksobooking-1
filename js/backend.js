'use strict';

/*
Модуль, который экспортирует в глобальную область видимости функции для взаимодействия с удаленным севером через XHR.
load — функция, которая:
— получает с сервера данные с помощью объекта XMLHttpRequest, 
— обрабатывает полученные запросы,
— передаёт полученную информацию в функцию обратного вызова;
send — функция, которая отправляет данные на сервер.
*/

(function () {
  var load = function (onLoad, onError) {
  	var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    
    xhr.open('GET', URL);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
  	// body...
  };

  window.backend = {
  	load: load,
  	save: save
  }
})();
