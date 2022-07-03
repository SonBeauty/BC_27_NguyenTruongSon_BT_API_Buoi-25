main()

function main() {
    apiGetTeacher().then(function (result) {
        const teachers = result.data;
        for (let i = 0; i < teachers.length; i++) {
            const teacher = teachers[i];
            teachers[i] = new Teacher(
                teacher.id= id,
                teacher.taiKhoan = taiKhoan,
                teacher.hoTen = hoTen,
                teacher.matKhau = matKhau,
                teacher.email = email,
                teacher.loaiND = loaiND,
                teacher.ngonNgu = ngonNgu,
                teacher.hinhAnh = hinhAnh
            )
        }
        display(teachers)
    })
}

function display(teachers) {
    const divEl = "";
    for (let i = 0; i < teachers.length; i++) {
        const teacher = teachers[i];
        divEl += `
        <div class="card">
        <img src="${teacher.hinhAnh}"></img>
        <h6>${teacher.ngonNgu}</h6>
        <h5>${teacher.hoTen}</h5>
        <p>${teacher.moTa}</p>
        </div>
        `
    }
    document.getElementById("cardEl").innerHTML = divEl;
}