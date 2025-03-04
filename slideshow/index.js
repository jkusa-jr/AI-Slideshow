function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }



async function updateImg() {
    let urlParams = new URLSearchParams(document.location.search);


    var prompt = urlParams.get('prompt')
    try {

        //attach img element to document body
        let imgURL = `https://image.pollinations.ai/prompt/${prompt}?seed=${getRandomInt(0,1000000)}&width=${screen.width}&height=${screen.height}&nologo=true&private=true&enhance=false&safe=true`;
        console.log(imgURL)
        await fetch(imgURL)
        .then(response => response.arrayBuffer())
        .then(buffer => {
            let base64String = btoa(
                new Uint8Array(buffer)
                    .reduce((data, byte) =>
                        data + String.fromCharCode(byte), '')
            );
        base = base64String
        });
        let oldImg = document.querySelector("img")
        var dataURL = `data:image/png;base64,${base}`
        console.log(dataURL)
        oldImg.src = dataURL;

        

        } catch (error) {

    }
}


setInterval(updateImg,(10*1000))
//updateImg();

var w = window.innerWidth;
var h = window.innerHeight;
