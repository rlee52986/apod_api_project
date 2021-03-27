const imgContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let ready = false;
let imgsLoaded = 0;
let totalImgs = 0;
let photosArray =  [];

//NASA APOD API
const count = 12;
const apiKey = 'T8LqVIJaeukJxQt6qgBKhaPufR57EK4ZYcnzRujC';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

// Check if all images were loaded 
function imgLoaded() {    
    imgsLoaded++;
    console.log(imgsLoaded);
    if (imgsLoaded >= (totalImgs - 3)) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}



// Adding elements links and photo info to DOM 
function displayPhotos() {
    imgsLoaded = 0;
    totalImgs = photosArray.length;
    console.log('total images', totalImgs);
    //Run for each object in PhotosArray
    photosArray.forEach((photo) => {        
        const item = document.createElement('a');        
        setAttributes(item, {
            href: photo.hdurl, 
            target: '_blank', 
        });

        const img = document.createElement('img');        
        setAttributes(img, {
            src: photo.url,
            alt: photo.title,
            title: photo.title,
        });

        img.addEventListener('load', imgLoaded);

        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imgContainer.appendChild(item);
    });
}

//Fetch photos from APOD API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();        
    } catch (error) {
        console.log(error);
    }
}

// Check if scrolling near bottom of page, Load more photos
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
            ready = false;
            getPhotos();            
        }
    });

getPhotos(); 