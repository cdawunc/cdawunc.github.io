

//Convert the image to base64 using the canvas tag and then send the image to Gemini
async function convertImageToBase64(imageElementID)
{
    document.getElementById("spinner").style.display = "inline-block";

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
    img.src = detectWhichSlideVisibleAndReturnFilename();
}


//Send image to Google Gemini and display result for user
//Google Gemini was carefully selected for this project
//ChatGPT Image Processing models did not seem to work nearly as well for this purpose
async function callGoogleGemini(base64String) {
    const GEMINI_API_KEY = "AIzaSyCoBUheFs36iCw6mrk7tPHpW1kedonNq-U"
    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    fetch(GEMINI_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            contents: [
                {
                    parts: [{text: document.getElementById("promptTextArea").value}, {
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
            //Extract text from Gemini response JSON and display it for the user
            document.getElementById("geminiResponse").innerText = res.data.candidates[0].content.parts[0].text;
            console.log(res.data.candidates[0].content.parts[0].text)
            //Hide the spinner now that processing is done
            document.getElementById("spinner").style.display = "none";
        }));


}


//Detect which image/slide is currently visible and return the corresponding filename
//Loop and array could be used if there were more slides
function detectWhichSlideVisibleAndReturnFilename()
{
    if(document.getElementById("splide01-slide01").classList.contains("is-visible"))
    {
        return "art_images/spirit_of_ecstasy.jpg";
    }
    else if(document.getElementById("splide01-slide02").classList.contains("is-visible"))
    {
        return "art_images/dog_effigy.jpg";
    }
    else if(document.getElementById("splide01-slide03").classList.contains("is-visible"))
    {
        return "art_images/station_abstract.jpg";
    }
    return false;
}




