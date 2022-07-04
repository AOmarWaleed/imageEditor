
//inputs--------------------------
//--------------------------------
//--------------------------------
const saturateInput = document.getElementById('saturate');
const contrastInput = document.getElementById('contrast');
const brightnessInput = document.getElementById('brightness');
const sepiaInput = document.getElementById('sepia');
const grayScaleInput = document.getElementById('grayScale');
const blurInput = document.getElementById('blur');
const hueRotateInput = document.getElementById('hueRotate');
const allFilterInputs = document.querySelectorAll('.filters input')
// BUTTONS------------------------
//--------------------------------
//--------------------------------
const uploadInput = document.getElementById('upload');
const resetButton = document.getElementById('reset');
const downloadButton = document.getElementById('download');
//======================img
const img = document.images[0]
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

canvas.style.display = "none";
img.style.display = "none";
downloadButton.style.display = "none";
resetButton.style.display = "none";
// console.log(saturateInput,contrastInput,brightnessInput,sepiaInput,grayScaleInput,blurInput,hueRotateInput,uploadLable,resetButton,downloadButton,img);
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////



uploadInput.addEventListener('change',()=>{

    img.style.display = "inline-block";
    downloadButton.style.display = "inline-block";
    resetButton.style.display = "inline-block";



    // to console info about the upload file
    // u have name + type + .....
    // console.log(uploadInput.files[0]);


    //cheack if its img or not
    if(!uploadInput.files[0].type.startsWith("image/")) { 
        alert("this is not image pls choose an img")
        return;
    }


    //to read the file (FileReader => u should have assert -obj-)
    const reader = new FileReader();
    //then read as  ,, u can read as url , text ,,,,,,
    reader.readAsDataURL(uploadInput.files[0])
    //then when its ready (onload) (he is done from reading the file) >>> now u can have the result
    reader.onload = function () {
        img.src = reader.result;
        //evry time u get new img pls reset all range(s)
        resetFilterValues();
        //and back the filter property to default values
        setFilterValues();


        //when img complately loading lets go draw it as canvas 
        // why ??? ,, because this langusage dosnt support download imgs whith filters 
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            //lets start with get area to draw in it 
            //const ctx = canvas.getContext("2d"); line 22 ,, i needed to make it global value
            //then lets drw in this area 
            ctx.drawImage(img,0,0,canvas.width,canvas.height);
            //and when i have canvas ready lets display (none) the img 
            img.style.display = "none";
            // and show the canvas (block)
            canvas.style.display = "block";
        }

    }
})

allFilterInputs.forEach((el)=>{
    el.addEventListener('input',()=>{
        setFilterValues();
    })
})



resetButton.addEventListener('click' , ()=> {
    resetFilterValues();
    setFilterValues();
})

function setFilterValues() {
    //thsi filter by3ml 3la el cancas el mntka bta3t el rsm fahm - _ -
    ctx.filter = `saturate(${saturateInput.value}%)
    contrast(${contrastInput.value}%)
    brightness(${brightnessInput.value}%)
    sepia(${sepiaInput.value}%)
    grayscale(${grayScaleInput.value})
    blur(${blurInput.value}px)
    hue-rotate(${hueRotateInput.value}deg)
  `
  //u should return to draw the image after all time u change in the filter   
  ctx.drawImage(img,0,0,canvas.width,canvas.height);

}

function resetFilterValues() {
    saturateInput.value = 100;
    contrastInput.value = 100;
    brightnessInput.value = 100;
    sepiaInput.value = 0;
    grayScaleInput.value = 0;
    blurInput.value = 0;
    hueRotateInput.value = 0;
}

downloadButton.addEventListener('click', ()=>{
    //toDataURL its return url of the canvas ,, by defult it will download as png u can change that like send this parameter "image/"
    downloadButton.setAttribute('href' , canvas.toDataURL()) 
})
