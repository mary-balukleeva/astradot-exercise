import React, {useState, useEffect, useRef} from "react";
import "./App.css";
import { genQuery, fetchData } from "./api/queries";

interface IProps {
    timeRange: string;
    refreshInterval_Secs: number;
    componentName: string;
}

function useInterval(callback: any, delay: number) {
    const savedCallback: any = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

function Loading() {
    return <h2>Loading</h2>;
}

function BaseComponent({timeRange, refreshInterval_Secs, componentName}: IProps) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<string>("");

    const query = genQuery(timeRange, componentName);

    const fetch = () =>
        fetchData(query)
            .then((__data: string) => {
                setIsLoading(false);
                setData(__data);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log("Err:", err);
                setData("");
            });

    useEffect(() => {
        fetch();
    }, []);

    useInterval(() => {
        fetch();
    }, refreshInterval_Secs * 1000);

    return (
        <div>
            {isLoading ? <Loading /> : data}
        </div>
    );
}

function App() {
    return (
        <div>
            <BaseComponent timeRange="250" refreshInterval_Secs={60} componentName="c1" />
            <BaseComponent timeRange="250" refreshInterval_Secs={10} componentName="c2" />
            <BaseComponent timeRange="250" refreshInterval_Secs={15} componentName="c3" />
            <BaseComponent timeRange="250" refreshInterval_Secs={42} componentName="c4" />
            <BaseComponent timeRange="250" refreshInterval_Secs={30} componentName="c5" />
        </div>
    );
}

export default App;
