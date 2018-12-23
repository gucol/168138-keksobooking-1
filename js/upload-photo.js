'use strict';

(function () {
  var avatarInput = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoInput = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = document.querySelector('.ad-form__photo');

  var fileTypes = ['gif', 'jpg', 'jpeg', 'png'];

  var loadingImage = function (input, preview, multiple) {
    if (multiple) {
      var uploaded = false;
      var previewTemplate = preview.cloneNode(true);
    }

    var onUploadInputChange = function () {
      var file = input.files[0];
      var fileName = file.name.toLowerCase();

      var matches = fileTypes.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
          if (multiple) {
            var photo = document.createElement('img');
            photo.src = reader.result;
            photo.style.maxWidth = '100%';
            photo.style.display = 'block';

            if (uploaded) {
              var parent = preview.parentElement;
              var nextPreview = previewTemplate.cloneNode(true);
              nextPreview.appendChild(photo);
              parent.appendChild(nextPreview);
            } else {
              preview.appendChild(photo);
              uploaded = true;
            }
          }
        });
        reader.readAsDataURL(file);
      }
    };

    input.addEventListener('change', onUploadInputChange);
  };

  loadingImage(avatarInput, avatarPreview);
  loadingImage(photoInput, photoPreview, true);

})();
