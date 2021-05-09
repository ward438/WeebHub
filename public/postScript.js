review = (event) => {
    if (event.target.className === 'review') {
        // debugger;
        // console.log(event.target.children[0].value);
        // console.log(event.target.dataset.animeid);
        event.preventDefault();
        const animeObj = {
            comment: event.target.children[0].value,
            animeId: event.target.dataset.animeid,
        };

        fetch('/anime/reviews', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.         
            headers: {
                'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: 'follow', // manual, *follow, error

            body: JSON.stringify(animeObj), // body data type must match "Content-Type" header

        });

        console.log(event);
    }


}

const form = document.getElementsByClassName('review');
document.body.addEventListener('submit', review);