const urlParams = new URLSearchParams(window.location.search);
const prompt = urlParams.get("prompt");
console.log("Prompt from query string:", prompt);

async function downloadIMG(url, filename) {
    const response = await fetch(url);
    const blob = await response.blob();

    const uniqueFilename = filename.replace(/\.[^/.]+$/, "") + "-" + Date.now() + filename.match(/\.[^/.]+$/)[0];

    if (window.showSaveFilePicker) {
        const handle = await window.showSaveFilePicker({
            suggestedName: uniqueFilename,
            types: [{ accept: { [blob.type]: ['.' + filename.split('.').pop()] } }]
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
    } else {
        const file = new File([blob], uniqueFilename, { type: blob.type });
        const objectURL = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = objectURL;
        link.download = uniqueFilename;
        link.click();
        URL.revokeObjectURL(objectURL);
    }
}


function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

async function updateImg() {
    let urlParams = new URLSearchParams(document.location.search);
    let prompt = urlParams.get('prompt')
    try {

        //attach img element to document body
        let imgURL = `https://image.pollinations.ai/prompt/${prompt}?seed=${getRandomInt(0, 1000000)}&width=${window.innerWidth}&height=${window.innerHeight}&nologo=true&private=true&enhance=false&safe=true`;
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
        let dataURL = `data:image/png;base64,${base}`
        console.log(dataURL)
        oldImg.src = dataURL;
    } catch (error) {

    }
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        history.back()
    }
});

setInterval(updateImg, (10 * 1000))