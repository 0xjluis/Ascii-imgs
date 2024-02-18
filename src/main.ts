const canvas = document.getElementById('miCanvas') as HTMLCanvasElement;
let ctx:any = undefined;

const img = new Image();
const imgSize = 500  // imgSize must macht img sc 
img.src = 'perro.jpg';

img.onload = function() {
    ctx =  canvas.getContext('2d')
    ctx.drawImage(img, 0, 0);
    run()
}

function getPixelArray() {
    const imageData = ctx.getImageData(0, 0, imgSize, imgSize);
    const data = imageData.data; 
    console.log(data);
    console.log(data.length);
    return data;
}

function calcDarkness(r:number, g:number, b:number) {
    return (r + g + b) / 3 / 255 * 100;
}

function asignAscii(ligth:number){
    const ascii = "$$$$$$$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,,....";
    const charPosition = Math.floor((ligth*ascii.length)/100);
    const oneChar = ascii.slice(charPosition, charPosition+1)
    return oneChar;
}

function populateNewImage(imageArr:any){
    let newArr:string[] = [];
    for (let i = 0; i < imageArr.length; i += 4) {
        const r = imageArr[i];
        const g = imageArr[i + 1];
        const b = imageArr[i + 2];

        const darkness = calcDarkness(r,g,b);
        const ascii = asignAscii(darkness);
        newArr.push(ascii);
    }
    return newArr;
}

function printImg(imgAscii:string[]){
    for (let i = 0; i < imgAscii.length; i++) {
        const ratio = (canvas.width/imgSize)
        const xOffset = 500;
        const yOffset = 0;
        const x = ((i) % imgSize)+xOffset;
        const y = (Math.floor((i) / imgSize)+yOffset);

        if(i % (12*4) === 0){

            ctx.fillText(imgAscii[i], x*ratio/2, y*ratio/2)
        }
    }
}

function printAsTxt(imgAscii) {
    let byLines = [];
    const scale = 8; 
    for (let y = 0; y < imgSize; y += scale) {
        let line = '';
        for (let x = 0; x < imgSize; x += scale) {
            const i = y * imgSize + x;
            if (imgAscii[i]) {
                line += `${imgAscii[i]} `;
            }
        }
        byLines.push(line + "</br>");
    }
    const toPrint = byLines.join('');
    let div = document.getElementById('txtHere');
    div!.innerHTML += toPrint;
}

function run(){
    if(!ctx){return}
    const imageArr = getPixelArray();
    console.log(imageArr)
    const imgAscii = populateNewImage(imageArr);
    console.log(imgAscii)
    printImg(imgAscii);
    printAsTxt(imgAscii)
}
