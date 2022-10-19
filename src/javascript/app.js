// Start by declaring all of the HTML Elements at the top.
const fileInput = document.querySelector(".resizer__file");
const widthInput = document.querySelector(".resizer__input--width");
const heightInput = document.querySelector(".resizer__input--height");
const aspectToggle = document.querySelector(".resizer__aspect");
const canvas = document.querySelector(".resizer__canvas");

const canvasCtx = canvas.getContext("2d");
// The context used above allows the user to draw different things like images, text, shapes etc on the canvas in 2-D. Here, it also helps the resizing of the images.

let activeImage, originalWidthToHeightRatio;

// activeImage ===> Currently Selected Image
/*
originalWidthToHeightRatio ===> Width To Height Ratio Of The Active Image. This will help us with the "Aspect Ratio Toggle"

EG : Width=150, Height=100 ===> originalWidthToHeightRatio=1.5.
So, incase we don't know one of the above two parameters, we can calculate it with the help of originalWidthToHeightRatio.
*/

// WORKING LOGIC OF THE IMAGE RESIZER
fileInput.addEventListener("change", (e) => {
  // console.log(e); // This will take input the file selected by the user, preview it, and populate all the other properties related to it.

  // CREATING A FILE READER : FileReader allows the browser to read an Input File as a "DATA URL".

  const reader = new FileReader(); /*
  What is a DATA URL ? 
  A Data URL is a string of characters with base 64 that represents the actual data for an image. We can then put that Data URL in the HTML Canvas.
  */

  // After the reader has read the input image, we are adding an event listener to load that read input image. In simple words, this will print the Data URL for the input image in the Browser Console.
  reader.addEventListener("load", () => {
    // Making a call to a function called openImage
    openImage(reader.result);
    // console.log(reader.result);
  });

  reader.readAsDataURL(e.target.files[0]);
});

// MAKING THE INPUT FIELD WORK I.E RESIZING THE IMAGE ACCORDING TO THE NEW SIZE ENTERED IN THE INPUT FIELD BY THE USER

// Whenever the user decides to change the value of the width, the below given function will be executed :

// NOTE : Even if the user is only  passing the value of the width, we are not keeping the value of the height the same anymore. (as we have to keep the aspect ratio, if that button is checked !)

widthInput.addEventListener("change", () => {
  if (!activeImage) return;

  // If the user has decided to maintain the aspect ratio

  const heightValue = aspectToggle.checked
    ? widthInput.value / originalWidthToHeightRatio
    : heightInput.value;

  resize(widthInput.value, heightValue); // Passing the new width and height value to which the image is to be resized to.
});

// NOTE : Even if the user is only  passing the value of the width, we are not keeping the value of the height the same anymore. (as we have to keep the aspect ratio, if that button is checked !)

heightInput.addEventListener("change", () => {
  if (!activeImage) return;

  // If the user has decided to maintain the aspect ratio

  const widthValue = aspectToggle.checked
    ? heightInput.value * originalWidthToHeightRatio
    : widthInput.value;

  resize(widthValue, heightInput.value); // Passing the new width and height value to which the image is to be resized to.
});

function openImage(imageSrc) {
  // Inside this function, We are creating a new image object, much like a standard HTML image tag.

  activeImage = new Image();

  // After the image has been loaded by taking a delay time of some fractional milliseconds
  activeImage.addEventListener("load", () => {
    originalWidthToHeightRatio = activeImage.width / activeImage.height;

    resize(activeImage.width, activeImage.height);
  });
  activeImage.src = imageSrc; // Here, the activeImage.src works just like an HTML Image tag.

  // console.log(activeImage); This will actually print the Data URL of the image chosen by the user inside an HTML Image Tag which can be seen in the browser console.
}

function resize(width, height) {
  // Basically, this resize function is going to take the activeImage and apply its width and height parameters to the HTML File Canvas

  canvas.width = Math.floor(width);
  canvas.height = Math.floor(height);

  // Here, at first, we are taking the width and height parameters by calculating from the original image itself.
  widthInput.value = Math.floor(width);
  heightInput.value = Math.floor(height);

  // Drawing the Image on the canvas
  canvasCtx.drawImage(activeImage, 0, 0, Math.floor(width), Math.floor(height));
}
