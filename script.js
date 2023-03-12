window.onload = () => {
  
  const content = document.querySelector('.content');
  const modal = document.querySelector('.modal-title');
  // input 
  const inputName = document.querySelector('.input-name');
  const inputNumber = document.querySelector('.input-number');
  const inputEmail = document.querySelector('.input-email');
  
  // zet judul modal 
  window.addEventListener('click', event => {
    // jika element yang ditekan memiliki class btn-modal
    if (event.target.classList.contains('btn-modal')) {
      // isi dari data-value element yang ditekan
      const type = event.target.dataset.type.toLowerCase();
      // set judul modal
      modal.textContent = type + ' data';
      // jika judul modal memiliki kata 'add'
      if (modal.textContent.includes('add')) clearInputValue();
    }
  });
  
  function clearInputValue() {
    // bersihkan semua value input
    inputName.value = '';
    inputNumber.value = '';
    inputEmail.value = '';
  }
  
  // tambah data
  const submitButton = document.querySelector('.btn-submit');
  submitButton.addEventListener('click', () => {
    // cek judul modal
    if (modal.textContent.includes('add')) {
      // value input
      const name = inputName.value.trim();
      const number = inputNumber.value.trim();
      const email = inputEmail.value.trim();
      // validasi
      if (validate(name,number,email) == true) {
        // render element
        const result = render(name,number,email);
        // tampilkan hasilnya 
        content.insertAdjacentHTML('afterbegin', result);
        // tampilkan pesan data berhasil ditambahkan
        alerts('success', 'Success', 'data has been added!');
        // bersihkan value input
        clearInputValue();
      }
    }
  });
  
  function validate(name, number, email) {
    // jika semua input
    if (!name && !number && !email) return alerts('error', 'Alert', `field's is empty!`);
    // jika masih ada input yang kosong
    if (!name || !number || !email) return alerts('error', 'Alert', `field is empty!`);
    // jika nama terlalu pendek
    if (name.length < 2) return alerts('error', 'Alert', 'name must be more then 2 character!');
    // jika nama terlalu panjang
    if (name.length > 100) return alerts('error', 'Alert', 'name must be less then 100 character!');
    // jika field nama berisikan angka
    if (name.match(/[0-9]/gmi)) return alerts('error', 'Alert', 'field name can only contain letters!');
    // jika digit angka di field angka kurang dari 10 digit
    if (number.length < 10) return alerts('error', 'Alert', 'field number must be more then 10 character');
    // jika digit angka di field angka lebih dari 13 digit
    if (number.length > 13) return alerts('error', 'Alert', 'field number must be less then 13 character');
    // jika alamat email terlalu pendek
    if (email.length < 6) return alerts('error', 'Alert', 'field email must be more then 6 character!');
    // jika berhasil melewati semua validasi
    return true;
  }
  
  function alerts(icon, title, text, position = 'center') {
    // plugin sweetalert2
    swal.fire ({
      position: position,
      icon: icon,
      title: title,
      text: text
    });
  }
  
  function render(name, number, email) {
    return `
    <tr class="rows">
      <td class="p-3 fw-light">${name}</td>
      <td class="p-3 fw-light">${number}</td>
      <td class="p-3 fw-light">${email}</td>
      <td class="p-3">
        <button class="btn btn-success btn-sm rounded-0 m-1 btn-edit btn-modal" data-type="edit" data-bs-toggle="modal" data-bs-target="#modalBox">edit</button>
        <button class="btn btn-danger btn-sm rounded-0 m-1 btn-delete">delete</button>
      </td>
    </tr>
    `;
  }
  
  // hapus data
  window.addEventListener('click', event => {
    // jika element yang ditekan memiliki class btn-delete
    if (event.target.classList.contains('btn-delete')) {
      // dapatkan element tr dengan class rows
      const tr = event.target.parentElement.parentElement;
      // jalankan fungsi deleteData()
      deleteData(tr);
    }
  });
  
  function deleteData(param) {
    // plugin sweetalert
    swal.fire ({
      icon: 'info',
      title: 'are you sure?',
      text: 'do you want to delete this data?',
      showCancelButton: true
    }).then(result => {
      // jika menekan tombol ok atau yes
      if (result.isConfirmed) {
        // tampilkan pesan
        alerts('success', 'Success', 'data has been deleted!');
        // hapus element
        param.remove();
      }
    });
  }
  
  // edit data
  window.addEventListener('click', event => {
    // jika element yang ditekan memiliki class btn-edit
    if (event.target.classList.contains('btn-edit')) {
      // dapatkan element 
      const element = event.target.parentElement.parentElement;
      // definisikan isi parameter param dan jalankan fungsi setValue()
      let [name, number, email] = element.cells;
      setValue(name, number, email);
      // jalankan fungsi editData()
      editData(name, number, email);
    }
  });
  
  function editData(name, number, email) {
    // ketika tombol submit ditekan
    submitButton.addEventListener('click', () => {
      // cek judul modal 
      if (modal.textContent.includes('edit')) {
        // validasi 
        if (validate(inputName.value, inputNumber.value, inputEmail.value) == true) {
          // masukkan value input kedalam variabel name, number dan email
          name.textContent = inputName.value.trim();
          number.textContent = inputNumber.value.trim();
          email.textContent = inputEmail.value.trim();
          // tampilkan pesan berhasil diubah
          alerts('success', 'Success', 'data has been updated!');
          // bersihkan isi variabel name, number dan email
          name = null;
          number = null;
          email = null;
        }
      }
    });
  }
  
  function setValue(name, number, email) {
    // set value
    inputName.value = name.textContent;
    inputNumber.value = number.textContent;
    inputEmail.value = email.textContent;
  }
  
  // pencarian data
  window.addEventListener('keyup', event => {
    // ketika element tersebut memiliki class search-input
    if (event.target.classList.contains('search-input')) {
      // value
      const value = event.target.value;
      // element 
      const rows = Array.from(content.rows);
      // looping dan jalankan fungsi searchData()
      rows.forEach(row => searchData(row, value, row.textContent));
    }
  });
  
  function searchData(row, value, param) {
    row.style.display = (param.indexOf(value) != -1) ? '' : 'none';
  }
  
}