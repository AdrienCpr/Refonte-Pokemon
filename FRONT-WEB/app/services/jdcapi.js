export default class JdcAPI {
    constructor() {
//         this.baseurl = "http://localhost:3000"
        this.baseurl = "https://api.pokemon.adriencompare.com"
    }
    getUserInfo(id){
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`})
        const myInit= {headers: myHeaders}
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/users/${id}`, myInit)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }
    getUser(data){
        const myHeaders= new Headers({"Content-Type": "application/json"})
        const myInit= {method: 'POST',headers: myHeaders, body : JSON.stringify(data) ,cache: 'default' }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/auth/login`, myInit)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    refreshToken(id_user){
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`})
        const myInit= {headers: myHeaders}
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/auth/refresh/${id_user}`, myInit)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    createUser(data){
        const myHeaders = new Headers({"Content-Type": "application/json"})
        const myInit= {method: 'POST',headers: myHeaders, body : JSON.stringify(data) ,cache: 'default' }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/users`, myInit)
            .then(async res => {
                if (res.status === 201) {
                    resolve()
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    getUserCards(id) {
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`})
        const myInit= {headers: myHeaders}
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-cards/load/${id}`,myInit)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    getCardById(id) {
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`})
        const myInit= {headers: myHeaders}
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/cards/${id}`, myInit)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }
    getCards() {
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`})
        const myInit= {headers: myHeaders}
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/cards`,myInit)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    updateUserChoseCard(user_id, id_card_user, id_card) {
        const myHeaders= new Headers({"Content-Type": "application/json","Authorization":`Bearer ${sessionStorage.getItem("token")}`})
        const myInit= {method: 'PUT', headers: myHeaders }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/users/chose-card/${user_id}/${id_card_user}/${id_card}`,myInit)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    updateUserInfo(data,id_user){
        const myHeaders= new Headers({"Content-Type": "application/json","Authorization":`Bearer ${sessionStorage.getItem("token")}`})
        const myInit= {method: 'PUT',headers: myHeaders, body : JSON.stringify(data) ,cache: 'default' }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/users/update/${id_user}`, myInit)
            .then(res => {
                if (res.status === 200) {
                    resolve()
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    checkPassword(id_user, password) {
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`})
        const myInit= {headers: myHeaders }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/users/check/password/${id_user}/${password}`, myInit)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res)
                } else {
                    reject(await res)
                }
            })
            .catch(err => reject(err)))
    }
    loadUserCardsWithoutDeck(id_user) {
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`})
        const myInit= {headers: myHeaders }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-cards/load/without-deck/${id_user}`, myInit)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    loadUserCardsWithoutOnesHeHas(id_user) {
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`})
        const myInit= {headers: myHeaders }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-cards/load/without-ones-he-has/${id_user}`,myInit)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }
    getCardsUserByUserId(id_user) {
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`})
        const myInit= {headers: myHeaders }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/cards/find-all-user-cards/${id_user}`,myInit)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }
    createUserCard(data){
        const myHeaders = new Headers({"Content-Type":"application/json", "Authorization":`Bearer ${sessionStorage.getItem("token")}`})
        const myInit= {method: 'POST',headers: myHeaders, body : JSON.stringify(data) ,cache: 'default' }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-cards/buyCard`, myInit)
            .then(async res => {
                if (res.status === 200) {
                    resolve()
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    getGameHistory(id_user){
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`})
        const myInit= {headers: myHeaders }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/games-history/${id_user}`, myInit)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    getTrophyById(id_trophy){
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`})
        const myInit= {headers: myHeaders }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/trophys/find/${id_trophy}`, myInit)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    getUserTrophy(id_user){
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`})
        const myInit= {headers: myHeaders }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-trophys/findAll/${id_user}`, myInit)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    getUserTrophyRemaining(id_user){
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`})
        const myInit= {headers: myHeaders }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-trophys/remaining-trophies/${id_user}`, myInit)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }
    createTrophyUser(id_user, name_trophy){
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`})
        const myInit= {method: 'POST', headers: myHeaders}
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-trophys/create/${id_user}/${name_trophy}`, myInit)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }
}
