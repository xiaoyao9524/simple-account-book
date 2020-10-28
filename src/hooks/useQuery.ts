interface QueryProps {
    [key: string]: string;
}

function useQuery () {
    const location:Location = window.location;
    let search = location.search;
    if (search.length) {
        search = search.slice(1);
    }

    const queryStringList = search.split('&');

    const query:QueryProps = {};

    for (let item of queryStringList) {
        const [key, value] = item.split('=');
        query[key] = value;
    }

    return query;
}

export default useQuery;
