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


class Artwork {
    art;
    selectedTags = ["All"];
    filteredTags = [];

    constructor(artJson) {
        getJSON(artJson,
            (err, data) => {
                if (err !== null) {
                    alert('Something went wrong: ' + err);
                } else {
                    this.art = data.Art;
                    this.findTags();
                    this.renderTags();
                    this.filterArt();
                }
            });
    }

    toggleFilter(selectedTag) {
        if (selectedTag !== null) {
            if (this.selectedTags.includes(selectedTag)) {
                this.selectedTags = this.selectedTags.filter((tag) => {
                    return tag !== selectedTag
                });
            } else {
                this.selectedTags.push(selectedTag);
            }
        }
        this.filterArt();
        this.renderTags();

    }


    filterArt() {
        var artElement = document.getElementById("artSection");
        artElement.innerHTML = "";


        let filteredArt = this.art.filter((artWork) => {
            var allTagsFound = true;
            for (let i = 0; i < this.selectedTags.length; i++) {
                let selectedTag = this.selectedTags[i];
                let tagFound = artWork.Tags.includes(selectedTag);
                allTagsFound = allTagsFound && tagFound;
            }
            return allTagsFound;
        });

        filteredArt.forEach((artWork) => { this.renderArtWork(artWork); });
    }

    renderArtWork(artWork) {
        //get the resized image url
        let str = artWork.Url;
        str = str.slice(8);
        str = str.slice(0, -3);
        str = "/Images/compressed-art/" + str + "png"
        var output = `
        
            <div class="picture-button">
                <div class="picture-container">
                    <a onclick="artRenderer.renderPictureInfo('${artWork}')">
                        <img src="${str}" loading="auto" style="position: relative; top: ${artWork.Top}px;">
                    </a>
                </div>
                 
            </div>
        
        `
        // <h4>${artWork.Name}</h4>
        var myElement = document.createElement('div');
        myElement.innerHTML = output

        var artElement = document.getElementById("artSection");
        artElement.appendChild(myElement);
    }


    findTags() {
        var artElement = document.getElementById("tagSection");
        artElement.innerHTML = "";


        for (let i = 0; i < this.art.length; i++) {
            for (let n = 0; n < this.art[i].Tags.length; n++) {
                if (!this.filteredTags.includes(this.art[i].Tags[n])) {
                    this.filteredTags.push(this.art[i].Tags[n])
                }
            }
        }


    }

    renderTags() {
        var artElement = document.getElementById("tagSection");
        artElement.innerHTML = "";

        this.filteredTags.forEach((tag) => { this.renderTag(tag); });
    }

    renderTag(tag) {

        let style = this.selectedTags.includes(tag) ? "selected-tag" : "tag"

        var output = `
        <div>
            <button onclick="artRenderer.toggleFilter('${tag}')" class="${style}">
                 <h4>${tag}</h4>
            </button>
         </div>
        `
        var myElement = document.createElement('div');
        myElement.innerHTML = output

        var artElement = document.getElementById("tagSection");
        artElement.appendChild(myElement);

    }


    //picture info panel
    renderPictureInfo(Name) {
        var tag = 'hi';
        var output = ` 
        

    <div class="pictureInfo flex-column">
        <h1> ` + Name + `</h1>
        <img class="about-me-image" src="/Images/ivo 19-2-2021.JPG">
        <div class="tag-section flex-rows">
            <div>
                <button onclick="artRenderer.toggleFilter('${tag}')" class="closeButton">
                     <h4>Close</h4>
                </button>
            </div>
            <div>
                <button onclick="artRenderer.toggleFilter('${tag}')" class="tag">
                     <h4>${tag}</h4>
                </button>
            </div>
             <div>
                <button onclick="artRenderer.toggleFilter('${tag}')" class="tag">
                     <h4>${tag}</h4>
                </button>
            </div>
             <div>
                <button onclick="artRenderer.toggleFilter('${tag}')" class="tag">
                     <h4>${tag}</h4>
                </button>
            </div>
             <div>
                <button onclick="artRenderer.toggleFilter('${tag}')" class="tag">
                     <h4>${tag}</h4>
                </button>
            </div>
             
        </div>
        
    </div>
                `
       
       
                var myElement = document.getElementById("pictureInfo");
                console.log(myElement)
                myElement.innerHTML = output
        

    }


    unrenderPictureInfo() {
        var output = `
                
        `

        var myElement = document.getElementById("pictureInfo");
        myElement.innerHTML = output
    }




}