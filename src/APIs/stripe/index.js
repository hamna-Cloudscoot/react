import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'

const sessionCheckout = async (data) => {
    return await API.postMethod(ENDPOINT.stripe.sessionCheckout, false, data)
}


export default {
    sessionCheckout
}