const baseUrl = "https://62b9626541bf319d227b2b79.mockapi.io/user"

function apiGetUser(search){
    return axios({
        url: baseUrl,
        method:"GET",
        params: {
            name:search,
        }
    })
}

function apiAddUser(user){
    return axios({
        url: baseUrl,
        method:"POST",
        data: user,
    })
}

// Hàm call API xóa người dùng
function apiDeleteUser(userId){
    return axios({
        url:`${baseUrl}/${userId}`,
        method: "DELETE",
    })
}

function apiGetUserDetail(userId){
    return axios({
        url:`${baseUrl}/${userId}`,
        method:"GET"
    })
}

function apiUpdateUser(user) {
    return axios({
      url: `${baseUrl}/${user.id}`,
      data: user,
      method: "PUT",
    });
  }