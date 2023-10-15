console.log("********* script is running");
const api = "E61KFTFYBG4R0SHXJZBAA1HE1J0T";

const getComments = async () => {
    const res = await fetch("/api/comments");
    const data = await res.json();
    console.log(data);

    let template = "";
    //displaying all 10 different comments
    for (let i = 0; i < data.length; i++) {
        const { userName, title, date, comment } = data[i];
        console.log("******", { userName, title, date, comment });
        template += `
            <div class="card" >
                <div class="card-body">
                    <p class="card-username">${userName}</p>    
                    <p class="card-date">${new Date(date).toLocaleDateString()}</p>
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${comment}</p>
                </div>
            </div>
        `;
    }
    document.querySelector("#current").innerHTML = template;
};

getComments();

//make comments shoe
//api for

document
    .querySelector("#car-form")
    .addEventListener("submit", async (event) => {
        event.preventDefault();

        const distance = document.querySelector("#distance").value;

        const headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer E61KFTFYBG4R0SHXJZBAA1HE1J0T");

        const Fraw = JSON.stringify({
            emission_factor: {
                activity_id:
                    "passenger_vehicle-vehicle_type_coach-fuel_source_na-distance_na-engine_size_na",
                data_version: "^2",
            },
            parameters: {
                distance: parseFloat(distance),
                distance_unit: "km",
            },
        });

        const Eraw = JSON.stringify({
            emission_factor: {
                activity_id:
                    "passenger_vehicle-vehicle_type_car-fuel_source_bev-engine_size_na-vehicle_age_na-vehicle_weight_na",
                data_version: "^2",
            },
            parameters: {
                distance: parseFloat(distance),
                distance_unit: "km",
            },
        });

        const fres = await fetch("https://beta4.api.climatiq.io/estimate", {
            method: "POST",
            headers: headers,
            body: Fraw,
            redirect: "follow",
        });
        const fdata = await fres.json();

        const eres = await fetch("https://beta4.api.climatiq.io/estimate", {
            method: "POST",
            headers: headers,
            body: Eraw,
            redirect: "follow",
        });
        const edata = await eres.json();

        console.log(fdata, edata);

        let template = `
        <div class="emmisions-card">
            <div class="card-title">Gas Car Emmisions</div>
            <div class="card-body">
                <p class="co2e"><b>${fdata.co2e}</b></p>
                <p class="activity_unit"><b>${fdata.co2e_unit}</b></p>
            </div>
        </div>
        <div class="emmisions-card">
            <div class="card-title">Electric Car Emmisions</div>
            <div class="card-body">
                <p class="co2e"><b>${edata.co2e}</b></p>
                <p class="activity_unit"><b>${edata.co2e_unit}</b></p>
            </div>
        </div>
    `;

        document.querySelector("#carboninfo").innerHTML = template;
    });

const postFormData = async (userName, title, comment, date) => {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userName: userName,
            title: title,
            comment: comment,
            date: date,
        }),
    };

    const res = await fetch("/api/comments", requestOptions);
    const data = await res.json();

    console.log(data);
};

document
    .querySelector("#comment-form")
    .addEventListener("submit", async (e) => {
        console.log("ee");
        e.preventDefault();
        const timestamp = Date.now();

        // Create a JavaScript Date object from the timestamp
        const current = new Date(timestamp);

        // Format the date as "YYYY-MM-DD"
        const date = current.toISOString().split("T")[0];

        const comment = document.querySelector("#comment").value;
        const title = document.querySelector("#title").value;
        const userName = document.querySelector("#userName").value;

        await postFormData(userName, title, comment, date);
        await getComments();
    });
