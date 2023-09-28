console.log("********* script is running");
const api = "KV1PAKA98BMBBJGY0PQA3QDPQ1FB";
// document.querySelector("#pickup-form").addEventListener("submit", (event) => {
//     event.preventDefault();

//     const input = document.querySelector("#pickup-input").value;

//     const headers = new Headers();
//     headers.append("Content-Type", "application/json");

//     const requestOptions = {
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify({
//             address: input,
//         }),
//         redirect: "follow",
//     };

//     fetch("/api/collection-date", requestOptions)
//         .then((response) => response.json())
//         .then((result) => {
//             console.log(result);

//             document.querySelector("#output").innerHTML = (
//                 `<div class="outputs">
//                     <span>Trash pickup date: ${result.trash}</span>
//                     <span>Recycle pickup date: ${result.recycle}</span>
//                 </div>`
//             );
//         })
//         .catch((error) => console.log("error", error));
// });

const getComments = async () => {
    const res = await fetch("/api/comments");
    const data = await res.json();
    console.log(data);

    let template = "";
    //displaying all 10 different comments
    for (let i = 0; i < 10; i++) {
        const datum = data[i];

        // template += `
        //     <div class="comment">
        //         <p class="user"><b>${datum.userId}</b></p>
        //         <p class="comment"><b>${datum.comment}</b></p>
        //     </div>
        // `;
        template += `
    <div class="${datum.userId}">
        <p class="user"><b>${datum.userId}:</b></p>
        <p class="comment">${datum.comment}</p>
    </div>
`;
    }
    document.querySelector("#current").innerHTML = template;
};
getComments();

//make comments shoe
//api for

document.querySelector("#car-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const distance = document.querySelector("#distance").value;


    const headers = new Headers();

    headers.append("Content-Type", "application/json");
    
    

    const Fraw = JSON.stringify({
        emission_factor: {
          activity_id: "passenger_vehicle-vehicle_type_coach-fuel_source_na-distance_na-engine_size_na",
          data_version: "^2"
        },
        parameters: {
          distance: parseFloat(distance),
          distance_unit: "km"
        }
      });

    const Eraw = JSON.stringify({
        emission_factor: {
          activity_id: "passenger_vehicle-vehicle_type_car-fuel_source_bev-engine_size_na-vehicle_age_na-vehicle_weight_na",
          data_version: "^2"
        },
        parameters: {
            distance: parseFloat(distance),
            distance_unit: "km"
        }
      });

    const fres = await fetch("https://beta4.api.climatiq.io/estimate", {
        method: "POST",
        headers: headers,
        body: Fraw,
        redirect: "follow",
    })
    const fdata = await fres.json();

    const eres = await fetch("https://beta4.api.climatiq.io/estimate", {
        method: "POST",
        headers: headers,
        body: Eraw,
        redirect: "follow",
    })
    const edata = await eres.json();

    console.log(fdata,edata);

    let template = `
        <div class="card">
            <div class="card-title">Gas ----???</div>
            <div class="card-body d-flex">
                <p class="co2e"><b>${fdata.co2e}</b></p>
                <p class="activity_unit"><b>${fdata.co2e_unit}</b></p>
            </div>
        </div>
        <div class="card">
            <div class="card-title">Electric Vehicle</div>
            <div class="card-body d-flex">
                <p class="co2e"><b>${edata.co2e}</b></p>
                <p class="activity_unit"><b>${edata.co2e_unit}</b></p>
            </div>
        </div>
    `;
    
    document.querySelector("#carboninfo").innerHTML = template;
});

// document.querySelector("#size-buttonS"), ("#size-buttonM"), ("#size-buttonL").addEventListener("click", () => {
//     const headers = new Headers();
//     headers.append("Content-Type", "application/json");
//     headers.append("Authorization", "Bearer KV1PAKA98BMBBJGY0PQA3QDPQ1FB");

    
//     // const size = document.querySelector("#size").string

//     const raw = JSON.stringify({
//         emission_factor: {
//             activity_id:
//                 "passenger_vehicle-vehicle_type_car-fuel_source_bev-engine_size_na-vehicle_age_na-vehicle_weight_na",
//             data_version: "^2",
//         },
//         parameters: {
//             car_size: parseString(size),
//             distance: parseFloat(distance),
//             distance_unit: "mi",
//         },
//     });

//     const requestOptions = {
//         method: "POST",
//         headers: headers,
//         body: raw,
//         redirect: "follow",
//     };

//     fetch("https://beta4.api.climatiq.io/estimate", requestOptions)
//         .then((response) => response.json())
//         .then((result) => {
//             console.log(result)



//             let template = `
//             <div class="carboninfo">
//             <p class="co2e"><b>${result.co2e}</b></p>
//             <p class="activity_unit"><b>${result.co2e_unit}</b></p>
//             </div>
//             `;
//             document.querySelector("#carboninfo").innerHTML = template;
//         })
//         .catch((error) => console.log("error", error));
// });

//HOW TO CALCULATE 
//questions  
// paramaters size of vehicle
//