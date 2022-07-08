main()

function main() {
    apiGetTeacher().then(function (result) {
        const teachers = result.data;
        for (let i = 0; i < teachers.length; i++) {
            const teacher = teachers[i];
            teachers[i] = new Teacher(
                id = teacher.id,
                taiKhoan = teacher.taiKhoan,
                hoTen = teacher.hoTen,
                matKhau = teacher.matKhau,
                email = teacher.email,
                loaiND = teacher.loaiND,
                ngonNgu = teacher.ngonNgu,
                hinhAnh = teacher.hinhAnh
            )
        }
        display(teachers)
    })
}

function display(teachers) {
    let divEl = "";
    for (let i = 0; i < teachers.length; i++) {
        const teacher = teachers[i];
        console.log(teacher.hinhAnh)
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