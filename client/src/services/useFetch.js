import axios from "axios";
import { useState, useEffect } from "react";
import constants from "../constants";
// import API from "../api_config";

const useFetch = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`/api/${url}`)
                .then((response) => {
                    console.log(response.data)
                    setData(response.data)
                })
                .catch(() => console.log(constants.API_Error), [])
        }
        fetchData()
    }, [url, data])

    const refetchData = () => {
        setData([])
    }

    return [data, refetchData];
};

export default useFetch;