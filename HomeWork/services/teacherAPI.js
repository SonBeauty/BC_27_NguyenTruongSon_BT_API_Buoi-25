const baseUrl = "https://62b9626541bf319d227b2b79.mockapi.io/Teacher"

// Hàm call API lấy danh sách
function apiGetTeacher(search){
    return axios({
        url: baseUrl,
        method:"GET",
        params:  {
            name:search,
        }
    })
}