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
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var SAVE_URL = 'https://js.dump.academy/keksobooking';

  var load = function (onLoad, onError) {
  	var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Возникла непредвиденная ошибка');
    });

    xhr.open('POST', SAVE_URL);
    xhr.send(data);	
  };

  window.backend = {
  	load: load,
  	save: save
  }
})();
