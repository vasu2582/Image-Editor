let fileinput = document.getElementById('file');
let image = document.getElementById('image');
let downloadbtn = document.getElementById('download');
let aspectRatiobtn = document.querySelector('.aspect_ratio');
const rotaterightbtn = document.getElementById('rotate_right');
const rotateleftbtn = document.getElementById('rotate_left');
const scalextbtn = document.getElementById('scale_x');
const scaleybtn = document.getElementById('scale_y');
const previewbtn = document.getElementById('preview');
const previewimage = document.getElementById('preview_image');
const options = document.querySelector('.optionsbtn');
let scaleXClick=false;
let scaleYClick=false;

let cropper ="";
let filename ="";
let rotateLeftValue =-45;
let rotateRightValue =45;

window.onload = ()=>{
    downloadbtn.classList.add('hide');
    options.classList.add('hide');
    previewbtn.classList.add('hide');
};

fileinput.onchange = ()=>{
    let reader  = new FileReader();
    reader.readAsDataURL(fileinput.files[0]);
    reader.onload =()=>{
        image.setAttribute("src",reader.result);
        if(cropper){
            cropper.destroy();
        }
        cropper = new Cropper(image);
        options.classList.remove('hide');
        previewbtn.classList.remove('hide');
    };
    filename =fileinput.files[0].name.split(".")[0];
};

Array.from(document.getElementsByClassName('aspect_ratio')).forEach((element) => {
    element.addEventListener("click",()=>{
        if(element.innerText == 'Free'){
            cropper.setAspectRatio(NaN);
        }
        else{
            cropper.setAspectRatio(eval(element.innerText.replace(':','/')));
        }
    });
});

rotaterightbtn.addEventListener('click',()=>{
    cropper.rotate(rotateRightValue);
});
rotateleftbtn.addEventListener('click',()=>{
    cropper.rotate(rotateLeftValue);
});

scalextbtn.addEventListener('click',()=>{
    if(scaleXClick){
        cropper.scaleX(1);
        scaleXClick = false;
    }
    else{
        cropper.scaleX(-1);
        scaleXClick = true;
    }
});

scaleybtn.addEventListener('click',()=>{
    if(scaleYClick){
        cropper.scaleY(1);
        scaleYClick = false;
    }
    else{
        cropper.scaleY(-1);
        scaleYClick = true;
    }
});

previewbtn.addEventListener("click",()=>{
    downloadbtn.classList.remove('hide');
    let imgsrc = cropper.getCroppedCanvas({}).toDataURL();
    previewimage.src = imgsrc;
});

downloadbtn.addEventListener('click',(e)=>{
    let imgsrc = cropper.getCroppedCanvas({}).toDataURL();
    downloadbtn.download = `cropped_${filename}.png`;
    downloadbtn.setAttribute("href",imgsrc);
})