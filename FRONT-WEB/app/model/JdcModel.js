import JdcAPI from "../services/jdcapi.js";

export default class JdcModel {
    constructor() {
        this.api = new JdcAPI()
    }
    async refreshToken(id_user){
        try {
            return await this.api.refreshToken(id_user)
        } catch(e) {
            if(e === 500) {
                navigate('login');
                sessionStorage.removeItem('token');
                localStorage.setItem('server error', "true")
                throw new Error()
            } else {
                Error(e)
                return e
            }
        }
    }
    async getUserInfo(id){
        try {
            return await this.api.getUserInfo(id)
        } catch(e) {
            if(e === 500) {
                navigate('login');
                sessionStorage.removeItem('token');
                localStorage.setItem('server error', "true")
                throw new Error()
            } else {
                Error(e)
                return e
            }
        }
    }
    async getUser(data){
        try {
            return await this.api.getUser(data)
        } catch(e) {
            if(e === 401){
                return 401
            } else {
                navigate('login');
                sessionStorage.removeItem('token');
                localStorage.setItem('server error', "true")
                throw new Error()
            }
        }
    }

    async createUser(data){
        try {
            return await this.api.createUser(data)
        } catch (e) {
            if (e === 400) {
                throw new Error("pseudo not unique")
            } else if (e === 401) {
                throw new Error("email not unique")
            } else if (e === 403) {
                throw new Error("email and pseudo not unique")
            } else {
                navigate('login');
                sessionStorage.removeItem('token');
                localStorage.setItem('server error', "true")
                throw new Error(e)
            }
        }
    }

    async getUserCards(id){
        try {
            return await this.api.getUserCards(id)
        } catch(e) {
            if(e === 500) {
                navigate('login');
                sessionStorage.removeItem('token');
                localStorage.setItem('server error', "true")
                throw new Error()
            } else {
                Error(e)
                return e
            }
        }
    }
    async getCardById(id){
        try {
            return await this.api.getCardById(id)
        } catch(e) {
            if(e === 500) {
                navigate('login');
                sessionStorage.removeItem('token');
                localStorage.setItem('server error', "true")
                throw new Error()
            } else {
                Error(e)
                return e
            }
        }
    }
    async updateUserChoseCard(user_id, id_card_user, id_card){
        try {
            return await this.api.updateUserChoseCard(user_id, id_card_user, id_card)
        } catch(e) {
            if(e === 500) {
                navigate('login');
                sessionStorage.removeItem('token');
                localStorage.setItem('server error', "true")
                throw new Error()
            } else {
                Error(e)
                return e
            }
        }
    }

    async getCards(){
        try {
            return await this.api.getCards()
        } catch(e) {
            if(e === 500) {
                navigate('login');
                sessionStorage.removeItem('token');
                localStorage.setItem('server error', "true")
                throw new Error()
            } else {
                Error(e)
                return e
            }
        }
    }
    async updateUserInfo(data, id_user){
        try {
            return await this.api.updateUserInfo(data, id_user)
        } catch(e) {
            if (e === 400) {
                throw new Error("pseudo not unique")
            } else if (e === 401) {
                throw new Error("email not unique")
            } else if (e === 403) {
                throw new Error("email and pseudo not unique")
            } else {
                navigate('login');
                sessionStorage.removeItem('token');
                localStorage.setItem('server error', "true")
                throw new Error(e)
            }
        }
    }

    async checkPassword(id_user, password){
        try {
            return await this.api.checkPassword(id_user, password)
        } catch(e) {
            Error(e)
            return e
        }
    }

    async loadUserCardsWithoutDeck(id_user){
        try {
            return await this.api.loadUserCardsWithoutDeck(id_user)
        } catch(e) {
            if (e === 400) {
                throw new Error("400")
            }
            if(e === 500) {
                navigate('login');
                sessionStorage.removeItem('token');
                localStorage.setItem('server error', "true")
                throw new Error()
            } else {
                Error(e)
                return e
            }
        }
    }
    async loadUserCardsWithoutOnesHeHas(id_user){
        try {
            return await this.api.loadUserCardsWithoutOnesHeHas(id_user)
        } catch(e) {
            if(e === 500) {
                navigate('login');
                sessionStorage.removeItem('token');
                localStorage.setItem('server error', "true")
                throw new Error()
            } else {
                Error(e)
                return e
            }
        }
    }
    async getCardsUserByUserId(id_user){
        try {
            return await this.api.getCardsUserByUserId(id_user)
        } catch(e) {
            if(e === 500) {
                navigate('login');
                sessionStorage.removeItem('token');
                localStorage.setItem('server error', "true")
                throw new Error()
            } else {
                Error(e)
                return e
            }
        }
    }
    async createUserCard(data){
        try {
            return await this.api.createUserCard(data)
        } catch(e) {
            // console.log(e)
            if(e === 500) {
                navigate('login');
                sessionStorage.removeItem('token');
                localStorage.setItem('server error', "true")
                throw new Error()
            } else {
                Error(e)
                return e
            }
        }
    }
    async getGameHistory(id_user){
        try {
            return await this.api.getGameHistory(id_user)
        } catch(e) {
            if(e === 500) {
                navigate('login');
                sessionStorage.removeItem('token');
                localStorage.setItem('server error', "true")
                throw new Error()
            } else {
                Error(e)
                return e
            }
        }
    }

    async getTrophyById(id_trophy){
        try {
            return await this.api.getTrophyById(id_trophy)
        } catch(e) {
            if(e === 500) {
                navigate('login');
                sessionStorage.removeItem('token');
                localStorage.setItem('server error', "true")
                throw new Error()
            } else {
                Error(e)
                return e
            }
        }
    }

    async getUserTrophy(id_user){
        try {
            return await this.api.getUserTrophy(id_user)
        } catch(e) {
            if(e === 500) {
                navigate('login');
                sessionStorage.removeItem('token');
                localStorage.setItem('server error', "true")
                throw new Error()
            } else {
                Error(e)
                return e
            }
        }
    }

    async getUserTrophyRemaining(id_user){
        try {
            return await this.api.getUserTrophyRemaining(id_user)
        } catch(e) {
            if(e === 500) {
                navigate('login');
                sessionStorage.removeItem('token');
                localStorage.setItem('server error', "true")
                throw new Error()
            } else {
                Error(e)
                return e
            }
        }
    }
    async createTrophyUser(id_user,name_trophy){
        try {
            return await this.api.createTrophyUser(id_user,name_trophy)
        } catch(e) {
            if(e === 500) {
                navigate('login');
                sessionStorage.removeItem('token');
                localStorage.setItem('server error', "true")
                throw new Error()
            } else {
                Error(e)
                return e
            }
        }
    }
}