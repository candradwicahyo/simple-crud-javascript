window.onload = () => {
  
  const tableContainer = document.querySelector('.table-container');
  
  const inputName = document.querySelector('.name');
  const inputEmail = document.querySelector('.email');
  
  const addButton = document.querySelector('.btn-add');
  const submitButton = document.querySelector('.btn-submit');
  addButton.addEventListener('click', () => {
    submitButton.textContent = 'add';
    deleteValue();
  });
  
  submitButton.addEventListener('click', function() {
    if (this.textContent == 'add') {
      if (validate(inputName.value, inputEmail.value) == true) {
        const data = pushData(inputName.value, inputEmail.value);
        tableContainer.appendChild(data);
        sweetalert('success', 'Success', 'data berhasil ditambahkan');
        deleteValue();
      }
    }
  });
  
  function validate(name, email) {
    if (!name && !email) return sweetalert('error','Error!','isi semua input terlebih dahulu!');
    if (!name) return sweetalert('info','Info','isi input nama terlebih dahulu!');
    if (!email) return sweetalert('info','Info','isi input email terlebih dahulu!');
    if (name.match(/[0-9]/)) return sweetalert('error','Error','input nama hanya boleh berisikan huruf saja!');
    if (!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) return sweetalert('error','Error','input email tidak berisikan format email yang benar!');
    return true;
  }
  
  function sweetalert(icon, title, text) {
    return swal.fire ({
      icon: icon,
      position: 'center',
      title: title,
      text: text
    });
  }
  
  function createElement(target, value, classname) {
    const element = document.createElement(target);
    element.className = (!classname) ? '' : classname;
    const valueElement = document.createTextNode(value);
    element.appendChild(valueElement);
    return element;
  }
  
  function pushData(name, email) {
    const tr = document.createElement('tr');
    
    const tdName = createElement('td', name, 'fw-light p-3 td-name');
    const tdEmail = createElement('td', email, 'fw-light p-3 td-email');
    
    const tdOption = document.createElement('td');
    tdOption.className = 'p-3 td-option';
    const optionWrapper = document.createElement('div');
    optionWrapper.className = 'option-wrapper';
    
    const buttonEdit = createElement('button','edit','btn btn-outline-primary m-2 btn-edit');
    buttonEdit.setAttribute('data-bs-toggle', 'modal');
    buttonEdit.setAttribute('data-bs-target', '#modal');
    buttonEdit.addEventListener('click', function() {
      submitButton.textContent = 'edit';
      editData(this);
    });
    optionWrapper.appendChild(buttonEdit);
    
    const buttonDelete = createElement('button','delete','btn btn-outline-danger btn-delete');
    buttonDelete.addEventListener('click', () => deleteData(tr));
    optionWrapper.appendChild(buttonDelete);
    tdOption.appendChild(optionWrapper);
    
    tr.appendChild(tdName);
    tr.appendChild(tdEmail);
    tr.appendChild(tdOption);
    
    search(tr, name, email);
    
    return tr;
  }
  
  function deleteValue() {
    inputName.value = '';
    inputEmail.value = '';
  }
  
  function editData(param) {
    // dapatkan parentnya, yaitu <tr>
    let parents = param.parentElement.parentElement.parentElement.cells;
    
    inputName.value = parents[0].innerHTML;
    inputEmail.value = parents[1].innerHTML;
    
    submitButton.addEventListener('click', function() {
      if (this.textContent == 'edit') {
        if (validate(inputName.value, inputEmail.value) == true) {
          parents[0].innerHTML = inputName.value;
          parents[1].innerHTML = inputEmail.value;
          parents = null;
          sweetalert('success', 'Success', 'data berhasil diubah');
        }
      }
    });
  }
  
  function deleteData(tr) {
    swal.fire ({
      icon: 'warning',
      title: 'Warning',
      text: 'apakah anda yakin ingin menghapus?',
      showCancelButton: true
    }).then(result => {
      if (result.isConfirmed) {
        tr.remove();
        sweetalert('success', 'Success', 'data berhasil dihapus!');
      }
    });
  }
  
  function search(tr, ...params) {
    let string = '';
    params.forEach(data => string += data);
    const input = document.querySelector('.search');
    input.addEventListener('keyup', function() {
      const inputValue = this.value.toLowerCase();
      tr.style.display = (string.toLowerCase().indexOf(inputValue) != -1) ? '' : 'none';
    });
  }
  
}
