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
// uploadInput------------------------
const uploadInput = document.getElementById('upload');
//====================== parents
const imgParent = document.getElementById('imgParent');
const buttonsParent = document.getElementById('buttons');
//===================================canvs element
const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.style.display = "none";


//make it global variable i need it in two function;
let img;




uploadInput.addEventListener('change',()=>{


    if(document.getElementById('reset') === null && document.getElementById('download') === null) {
        //creat reset Button and appended it to buttonsParent
        let resetButton = document.createElement('button');
        resetButton.classList.add('btn', 'btn-lg', 'btn-outline-danger');
        let resetText = document.createTextNode("Reset")
        resetButton.id = "reset"
        resetButton.append(resetText);

        //creat download Button and appended it to buttonsParent
        let downloadButton = document.createElement('a');
        downloadButton.classList.add('btn', 'btn-lg', 'btn-outline-primary');
        let downloadText = document.createTextNode("Download")
        downloadButton.id = "download"
        downloadButton.append(downloadText)
        //important to allow to download
        downloadButton.setAttribute('download' , 'img');

        buttonsParent.prepend(resetButton);
        buttonsParent.append(downloadButton);

    }

    

    //creat img 
    img = document.createElement('img');
    img.classList.add('w-100', 'pb-3');
    img.style.maxHeight = "500px"
    img.style.maxWidth = "400px"
    imgParent.append(img);



    //{
    // to console info about the upload file
    // u have name + type + .....
    // console.log(uploadInput.files[0]);
    //}

    //cheack if its img or not
    if(!uploadInput.files[0].type.startsWith("image/")) { 
        alert("this is not image pls choose an img")
        return;
    }


    //to read the file (FileReader => u should have instance -obj- from it)
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
            /////////////////////
            canvas.width = img.width;
            canvas.height = img.height;

            //then lets draw the img using (ctx)
            ctx.drawImage(img,0,0,canvas.width,canvas.height);
            img.remove();
            canvas.style.display = "block";
        }

    }
})

allFilterInputs.forEach((el)=>{
    el.addEventListener('input',()=>{
        setFilterValues();
    })
})


document.addEventListener('click' , (e)=>{
  if(e.target.id === 'reset') {
    resetFilterValues();
    setFilterValues();
  }
  if(e.target.id === "download") {
    //toDataURL its return url of the canvas ,, by defult it will download as png u can change that like send this parameter "image/"
    e.target.setAttribute('href' , canvas.toDataURL()) 
  }
})

function setFilterValues() {
    //endta 3ndk for4a btrsm (ctx) ,, 5dt hya el flatr de lazm troh trsmha tane 3la el img
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
