async function convertImageToBase64(imageElementID)
{
    // const img = document.getElementById(imageElementID);
    //
    // console.log(img);

    let img = new Image();
    let response = img.onload = function(){
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        console.log(img.width);
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        callGoogleGemini(canvas.toDataURL().split(',')[1]);
    }
    img.src = "art_images/spirit_of_ecstasy.jpg"
}


async function callGoogleGemini(base64String) {
    const GEMINI_API_KEY = "AIzaSyCoBUheFs36iCw6mrk7tPHpW1kedonNq-U"
    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    fetch(GEMINI_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            contents: [
                {
                    parts: [{text: "do a formal art analysis of this image"}, {
                        inline_data: {
                            mime_type: "image/png",
                            data: base64String
                        }
                    }]
                }]
        }),
    }).then(response =>
        response.json().then(data => ({
                data: data,
            })
        ).then(res => {
            document.getElementById("geminiResponse").innerText = res.data.candidates[0].content.parts[0].text;
            console.log(res.data.candidates[0].content.parts[0].text)
        }));


}

document.addEventListener("DOMContentLoaded", function(event){
    convertImageToBase64().then(r => function (){});
});





