console.log("********* script is running");

document.querySelector("#pickup-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const input = document.querySelector("#pickup-input").value;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            address: input
        }),
        redirect: 'follow'
    };

    fetch("/api/collection-date", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)

            document.querySelector("#output").innerHTML = `
            <div class="outputs">
                <span>Trash pickup date: ${result.trash}</span>
                <span>Recycle pickup date: ${result.recycle}</span>
            
                
            </div>
        
            `;

        })
        .catch(error => console.log('error', error));
});