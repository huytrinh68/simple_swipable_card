import { useEffect, useState } from "react"
import { marketAPI, movementAPI, MOVEMENT_CODE_PRICE_DOWN, MOVEMENT_CODE_PRICE_UP, TAB_TYPE } from "./constant"

const urlBuilder = type => {
    if (type === TAB_TYPE.TopGainer) {
        return movementAPI(MOVEMENT_CODE_PRICE_UP)
    } else if (type === TAB_TYPE.TopLoser) {
        return movementAPI(MOVEMENT_CODE_PRICE_DOWN)
    } else {
        return marketAPI(type)
    }

}

const useGetStock = ({ tabType }) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})
    const fetchData = async () => {
        const url = urlBuilder(tabType)
        setLoading(true)
        const response = await fetch(url)
        setLoading(false)
        const json = await response.json();
        setData(json?.data?.list)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return {
        loading,
        data
    }
}
export default useGetStock