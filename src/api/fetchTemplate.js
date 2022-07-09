const fetchTemplate = (address) => {
    return (
        fetch(`${address}`)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                };

                return response.json();
            })
    );
};

export default fetchTemplate;