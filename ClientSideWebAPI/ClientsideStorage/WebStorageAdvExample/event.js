window.addEventListener('storage', function (e) {
    this.document.querySelector('.my-key').textContent = e.key;
    this.document.querySelector('.my-old').textContent = e.oldValue;
    this.document.querySelector('my-new').textContent = e.newValue;
    this.document.querySelector('.my-url').textContent = e.url;
    this.document.querySelector('.my-storage').textContent = e.storageArea;
});