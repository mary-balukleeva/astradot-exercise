const DEV_SVR = "https://dev.acme.com";
const PROD_SVR = "https://prod.acme.com";
const METRIC_ENDPOINT = "/metrics";

export function genQuery(timeRange: string, componentName: string): string {
    return `SELECT ${timeRange} WHERE c = ${componentName}`;
}

export function fetchData(query: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const api = process.env.NODE_ENV === "production" ? PROD_SVR : DEV_SVR;

        console.log('ENV', process.env);

        fetch(`${api}/${METRIC_ENDPOINT}`)
            .then((data) => resolve(data))
            .catch((err) => resolve(Math.random().toString(20)));
    });
}
