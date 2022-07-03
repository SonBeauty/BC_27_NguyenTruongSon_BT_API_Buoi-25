main()

function main() {
    apiGetUser().then(function (result) {
        const users = result.data;

        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            users[i] = new User(
                user.id,
                user.account,
                user.password,
                user.name,
                user.email,
                user.position,
                user.language,
                user.action, user.image
            )
        }
        display(users)
    })
}

function display(users) {
    let html = "";
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        html += `<tr>
        <td>${i + 1}</td>
        <td>${user.account}</td>
        <td>${user.password}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.language}</td>
        <td>${user.position}</td>
        <td>
          <button
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#myModal"
            data-type="update"
            data-id="${user.id}"
          >
            Cập Nhật
          </button>
          <button
            class="btn btn-danger"
            data-type="delete"
            data-id="${user.id}"
          >
            Xoá
          </button>
        </td>
      </tr>
    `;
    }
    document.getElementById("tblDanhSachNguoiDung").innerHTML = html
}

// hàm xử lý gọi API thêm người dùng
function addUser() {
    // B1: DOM lấy value
    const account = document.getElementById("TaiKhoan").value;
    const name = document.getElementById("HoTen").value;
    const password = document.getElementById("MatKhau").value;
    const Email = document.getElementById("Email").value;
    const image = document.getElementById("HinhAnh").value;
    const position = document.getElementById("loaiNguoiDung").value;
    const language = document.getElementById("loaiNgonNgu").value;
    const description = document.getElementById("MoTa").value;
    // B2: Khởi tạo đối tượng Product
    const user = new User(null, account, name, password, Email, image, position, language, description);
    // B3: Gọi API thêm sản phẩm

    apiAddUser(user)
        .then(function (result) {
            // Thêm thành công, tuy nhiên lúc này dữ liệu chỉ mới được thay đổi ở phía server
            // Gọi tới hàm main để call API get products và hiển thị ra giao diện
            main();
            resetForm();
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Hàm xử lý gọi API xoá người dùng
function deleteUser(userId) {
    apiDeleteUser(userId)
        .then(function () {
            // Xoá thành công
            main();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function updateUser() {
    // B1: DOM lấy value
    const account = document.getElementById("TaiKhoan").value;
    const name = document.getElementById("HoTen").value;
    const password = document.getElementById("MatKhau").value;
    const Email = document.getElementById("Email").value;
    const image = document.getElementById("HinhAnh").value;
    const position = document.getElementById("loaiNguoiDung").value;
    const language = document.getElementById("loaiNgonNgu").value;
    const description = document.getElementById("MoTa").value;
  
    // B2: Khởi tạo đối tượng user
    const user = new User(account, name, password, Email, image,position,language,description);
  
    // B3: Gọi API cập nhật sản phẩm
    apiUpdateUser(user)
      .then(function (result) {
        // Cập nhật thành công, dữ liệu chỉ mới thay đổi ở phía server, cần gọi lại API getusers và hiển thị lại giao diện (đã làm trong hàm main)
        main();
        resetForm();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
function resetForm() {
    document.getElementById("TaiKhoan").value = "";
    document.getElementById("HoTen").value = "";
    document.getElementById("MatKhau").value = "";
    document.getElementById("Email").value = "";
    document.getElementById("HinhAnh").value = "";
    document.getElementById("loaiNguoiDung").value = "";
    document.getElementById("loaiNgonNgu").value = "";
    document.getElementById("MoTa").value = "";

    // Đóng modal
    $("#myModal").modal("hide");
}

// DOM
document.getElementById("btnThemNguoiDung").addEventListener("click", showAddModal);
function showAddModal() {
    // Thay đổi text của modal header
    document.querySelector(".modal-header").innerHTML = "Thêm người dùng";
    document.querySelector(".modal-footer").innerHTML = `
    <button
      class="btn btn-primary"
      data-type="add"
    >
      Thêm
    </button>
    <button
      class="btn btn-secondary"
      data-toggle="modal"
      data-target="#myModal"
    >
      Huỷ
    </button>
  `;
}

// Uỷ quyền lắng nghe event của các button từ thẻ .modal-footer
document.querySelector(".modal-footer").addEventListener("click", handleSubmit);
// Các hàm callback được gọi tới khi event được kích hoạt đồng thời nhận được 1 tham số là đối tượng Event
function handleSubmit(event) {
    const type = event.target.getAttribute("data-type");

    switch (type) {
        case "add":
            addUser();
            break;
        case "update":
            updateUser();
            break;
        default:
            break;
    }
}


document
    .getElementById("tblDanhSachNguoiDung")
    .addEventListener("click", handleProductAction);

function handleProductAction(event) {
    // Loại button (delete || update)
    const type = event.target.getAttribute("data-type");
    // Id của sản phẩm
    const id = event.target.getAttribute("data-id");

    switch (type) {
        case "delete":
            deleteUser(id);
            break;
        case "update": {
            // Cập nhật giao diện cho modal và call API get thông tin của sản phẩm và fill lên form
            showUpdateModal(id);
            break;
        }

        default:
            break;
    }
}


function showUpdateModal(userId) {
    // Thay đổi text của modal heading/ modal footer
    document.querySelector(".modal-title").innerHTML = "Cập nhật người dùng";
    document.querySelector(".modal-footer").innerHTML = `
      <button
        class="btn btn-primary"
        data-type="update"
      >
        Cập nhật
      </button>
      <button
        class="btn btn-secondary"
        data-dismiss="modal"
      >
        Huỷ
      </button>
    `;

    // Call API để lấy chi tiết sản phẩm
    apiGetUserDetail(userId)
        .then(function (result) {
            // Thành công, fill data lên form
            const user = result.data;
            document.getElementById("TaiKhoan").value = user.account;
            document.getElementById("HoTen").value = user.name;
            document.getElementById("MatKhau").value = user.password;
            document.getElementById("Email").value = user.Email;
            document.getElementById("HinhAnh").value = user.image;
            document.getElementById("loaiNguoiDung").value = user.position;
            document.getElementById("loaiNgonNgu").value = user.language;
            document.getElementById("MoTa").value = user.description;
        })
        .catch(function (error) {
            console.log(error);
        });
}

// DOM tới input search
//document.getElementById("txtSearch").addEventListener("keypress", handleSearch);
function handleSearch(evt) {
  console.log(evt);
  // Kiểm tra nếu key click vào không phải là Enter thì bỏ qua
  if (evt.key !== "Enter") return;

  // Nếu key click vào là Enter thì bắt đầu lấy value của input và get teachers
  const value = evt.target.value;
  apiGetUser(value).then(function (result) {
    // Tạo biến teachers nhận kết quả trả về từ API
    const user = result.data;
    // Sau khi đã lấy được data từ API thành công
    // Duyệt mảng data và khởi tạo các đối tượng Teacher
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      users[i] = new User(
        user.id,
        user.account,
        user.name,
        user.password,
        user.email,
        user.position,
        user.language,
        user.action,
        user.image
      );
    }
    // Gọi hàm display để hiển thị danh sách sản phẩm ra giao diện
    display(users);
  });
}

// kiểm tra xem input có hợp lệ hay không
function validation() {
  let taiKhoan = document.getElementById("TaiKhoan").value;
  let hoTen = document.getElementById("HoTen").value;
  let matKhau = document.getElementById("MatKhau").value;
  let email = document.getElementById("Email").value;
  let moTa = document.getElementById("MoTa").value;
  let hinhAnh = document.getElementById("HinhAnh").value;

  let isValid = true;

  // kiểm tra tài khoản giáo viên
  if (!isRequired(taiKhoan)) {
    isValid = false;
    document.getElementById("TaiKhoanerror").innerHTML =
      "tài khoản không được để trống";
  } else {
    document.getElementById("TaiKhoanerror").innerHTML = "";
  }

  // kiểm tra họ tên nhân viên
  const letters = new RegExp("^[A-Za-z]+$");
  if (!isRequired(hoTen)) {
    isValid = false;
    document.getElementById("HoTen").innerHTML = "Tên GV không được để trống";
  } else if (!letters.test(hoTen)) {
    isValid = false;
    document.getElementById("HoTen").innerHTML = "Tên GV có kí tự không hợp lệ";
  } else {
    // Đúng
    document.getElementById("HoTen").innerHTML = "";
  }

  // Dùng regex để kiểm tra mật khẩu có đúng định dạng hay không
  const pwPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,8}$/;
  if (!isRequired(matKhau)) {
    isValid = false;
    document.getElementById("MatKhau").innerHTML =
      "Mật khẩu không được để trống";
  } else if (!pwPattern.test(matKhau)) {
    isValid = false;
    document.getElementById("MatKhau").innerHTML =
      "Mật khẩu không đúng định dạng";
  } else {
    // Đúng
    document.getElementById("MatKhau").innerHTML = "";
  }

  // Dùng regex để kiểm tra email có đúng định dạng hay không
  let emailPattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
  if (!isRequired(email)) {
    isValid = false;
    document.getElementById("Email").innerHTML = "Email không được để trống";
  } else if (!emailPattern.test(email)) {
    isValid = false;
    document.getElementById("Email").innerHTML = "Email không đúng định dạng";
  } else {
    // Đúng
    document.getElementById("Email").innerHTML = "";
  }

  // kiểm tra hình ảnh nhân viên
  if (!isRequired(hinhAnh)) {
    isValid = false;
    document.getElementById("HinhAnh").innerHTML =
      "hình ảnh không được để trống";
  } else {
    document.getElementById("HinhAnh").innerHTML = "";
  }

  // kiểm tra loại người dùng
  if (loaiNguoiDung === "Chọn loại người dùng") {
    isValid = false;
    document.getElementById("loaiNguoiDung").innerHTML = "bắt buộc phải chọn";
  } else {
    document.getElementById("loaiNguoiDung").innerHTML = "";
  }

  // kiểm tra loại ngôn ngữ
  if (loaiNgonNgu === "Chọn ngôn ngữ") {
    isValid = false;
    document.getElementById("loaiNgonNgu").innerHTML = "bắt buộc phải chọn";
  } else {
    document.getElementById("loaiNgonNgu").innerHTML = "";
  }

  // kiểm tra mô tả có đúng định dạng hay không
  if (!isRequired(moTa)) {
    isValid = false;
    document.getElementById("MoTa").innerHTML = "mô tả không được để trống";
  } else if (!minLength(moTa, 60)) {
    isValid = false;
    document.getElementById("MoTa").innerHTML = "mô tả có tối đa 60 kí tự";
  } else {
    document.getElementById("MoTa").innerHTML = "";
  }

  return isValid;
}

// Hàm kiểm tra input có rỗng hay không
function isRequired(value) {
  if (!value) {
    return false;
  }
  return true;
}

// Hàm kiểm tra input có đủ độ dài hay không
function minLength(value, limit) {
  if (value.length < limit) {
    return false;
  }

  return true;
}

// hàm kiểm tra xem tài khoản có bị trùng không
function idturn(taiKhoan) {
  apiGetTeacher().then(function (result) {
    let users = result.data;
    const findId = users.find((value) => {
      return value.taiKhoan === taiKhoan;
    });
  });
  if (!findId) {
    display(users);
  } else {
    alert("tài khoản bị trùng");
}
}

