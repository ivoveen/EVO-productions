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

        var output = `
        
            <div class="picture-button">
                <div class="picture-container">
                    <a href="Website WIP page.html">
                        <img src="${artWork.Url}" style="position: relative; top: ${artWork.Top}px;">
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
 z               
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


}