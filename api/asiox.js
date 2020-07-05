import axios from 'axios'

export function getList() {
    var url = "/api/newpneumonia/get?target=trend&isCaseIn=1&stage=publish&callback=jsonp_1593858557695_47658"
    return axios.get(url)
}
