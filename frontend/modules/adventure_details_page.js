import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const urlParams = new URLSearchParams(search);
  let res = urlParams.get('adventure');
  return(res)


  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let res = await fetch(`${config.backendEndpoint}/adventures/detail?` + new URLSearchParams({
      adventure: adventureId,
      }));
    let data = await res.json();
    return data;}
    catch(err){return null;}
    
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure)
  addDetails(adventure.name, adventure.subtitle,adventure.images, adventure.content);
  
  function addDetails(name, subtitle, images, content)
  {
  let advName=document.getElementById("adventure-name");
  advName.innerHTML=`${name}`;
  let advSub=document.getElementById("adventure-subtitle");
  advSub.innerHTML=`${subtitle}`;
  
  if (images) {
    images.forEach((img) => {
      addImg(img);
    });
  function addImg(img)
  { 
    let advImg=document.createElement("div");
    advImg.innerHTML=`<img src="${img}" class="activity-card-image">`
    document.getElementById("photo-gallery").append(advImg)
  }
  console.log(document.getElementById("photo-gallery"))
  }

  let advCon=document.getElementById("adventure-content");
  advCon.innerText=`${content}`
}
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let gallery=document.getElementById("photo-gallery");
  gallery.innerHTML=`
  <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`
if (images) {
  images.forEach((img,index) => {
    addImg(img,index);
  });
  
function addImg(img,index){
  
let advImg=document.createElement("div");
    if(!index) {advImg.className="carousel-item active";}
    else {advImg.className="carousel-item";}
    advImg.innerHTML=`<img src="${img}" height=500px class="d-block w-100" alt="...">`
    document.getElementsByClassName("carousel-inner")[0].append(advImg)
}
}
console.log(document.getElementById("photo-gallery"))
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available)
  {
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").innerHTML=`${adventure.costPerHead}`
  }
  else
  {
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    
  }
 /* console.log(`${config.backendEndpoint}/reservations/new`) */
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let person=`${adventure.costPerHead}`
  let cost=`${persons}`
  let total=person*cost;
  document.getElementById("reservation-cost").innerHTML=total;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  fetch(`${config.backendEndpoint}/reservations/new`, {
     
    // Adding method type
    method: "POST",
     
    // Adding body or contents to send
    body: JSON.stringify({
        name: `${adventure.name}`,
        date: `${adventure.date}`,
        person: `${adventure.person}`,
        adventure:`${adventure.id}`
    }),
     
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved)
  { console.log(adventure.reserved)
    document.getElementById("reserved-banner").style.display = "block";
  }
  else{
    document.getElementById("reserved-banner").style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved
};
