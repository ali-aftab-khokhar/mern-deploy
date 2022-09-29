import axios from "axios";
import { toast } from 'react-toastify';
import CONSTANTS from "../constants";

class BaseServiceClass {

    putMethod(payload, success, url) {
        axios.put(`/api/${url}`, payload)
            .then((res) => {
                if (res.status === 200) {
                    toast.success(success)
                }
                else {
                    toast.warning(CONSTANTS.SOMETHING_WENT_WRONG)
                }
            })
    }

    deleteMethod(url) {
        axios.delete(`/api/${url}`)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Deleted')
                }
                else {
                    toast.warning(CONSTANTS.SOMETHING_WENT_WRONG)
                }
            })
    }

    async postMethod(payload, success, url = '') {
        await axios.post(`/api/${url}`, payload)
            .then((res) => {
                console.log(res.status)
                if (res.status === 200) {
                    toast.success(success)
                    return res.data[0]._id
                }
                else {
                    toast.warning(CONSTANTS.SOMETHING_WENT_WRONG)
                }
            })
    }

    async specialPostMethod (credentials) {
        return await(axios.post(`/api/`, credentials))
    }

    async logoutMethod() {
        await axios.get('/api/logout')
    }
}

export default BaseServiceClass