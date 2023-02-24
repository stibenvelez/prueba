import { useEffect, useState } from "react";

const useFetch = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const doFetch = async (fetchApi) => {
        try {
            const result = await fetchApi();
            setData(result.data);
        } catch (error) {
            setIsError(true);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            await doFetch()

            setIsLoading(false);
        };

        fetchData();
    }, []);

    return [{ data, isLoading, isError }, doFetch];
};

export default useFetch;
