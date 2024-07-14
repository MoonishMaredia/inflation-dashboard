import axios from 'axios'
import _ from 'lodash'

export async function getSeriesData(inputObject) {

    try {
        const data = await axios.post(process.env.REACT_APP_INFLATION_URL + "/api/v1/timeseries", inputObject)
        .then(res => res.data);
        return data
    } catch (error) {
        console.error("Error making API call:", error);
        return {"Error": error}
    }
    
}

export async function getCompareData(inputObject) {

    try {
        console.log(process.env.REACT_APP_INFLATION_URL);
        const data = await axios.post(process.env.REACT_APP_INFLATION_URL + "/api/v1/compare", inputObject)
        .then(res => res.data);
        return data
    } catch (error) {
        console.error("Error making API call:", error);
    }
}

export async function getMaxDate() {

    try {
        const data = await axios.get(process.env.REACT_APP_INFLATION_URL + "/api/v1/maxDate")
        .then(res => res.data);
        return data
    } catch (error) {
        console.error("Error making API call:", error);
    }
}

export async function updateData(inputObject) {

    console.log(inputObject)

    try {
        const data = await axios.post(process.env.REACT_APP_INFLATION_URL + "/api/v1/updateDB", inputObject)
        .then(res => res.data);
        return data
    } catch (error) {
        console.error("Error making API call:", error);
    }
}
      
