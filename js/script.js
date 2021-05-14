function RenderArt(artJson) {
    getJSON(artJson,
        function (err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {

                art = data.Art;
                art.filter((artWork) => {return artWork.Tags.includes("All")})
                    .forEach((artWork) => {RenderArtWork(artWork);});
            }
        });

}



function RenderArtWork(artWork) {

    var output = `
        <div class="picture-button">
            <div class="picture-container">
                <img src="${artWork.Url}" style="position: relative; top: ${artWork.Top}px;">
            </div>
            <h4>${artWork.Name}</h4>
        </div>
    `
    var myElement = document.createElement('div');
    myElement.innerHTML = output

    var artElement = document.getElementById("artSection");
    artElement.appendChild(myElement);

}



var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

