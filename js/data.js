const countries = [
    { name: "Canada", continent: "North America", cities: ["Calgary","Montreal","Toronto"], photos: ["canada1.jpg","canada2.jpg","canada3.jpg"] },
    { name: "United States", continent: "North America", cities: ["Boston","Chicago","New York","Seattle","Washington"], photos: ["us1.jpg","us2.jpg"] },
    { name: "Italy", continent: "Europe", cities: ["Florence","Milan","Naples","Rome"], photos: ["italy1.jpg","italy2.jpg","italy3.jpg","italy4.jpg","italy5.jpg","italy6.jpg"] },
    { name: "Spain", continent: "Europe", cities: ["Almeria","Barcelona","Madrid"], photos: ["spain1.jpg","spain2.jpg"] }
];

let box = document.getElementsByClassName("justify")[0];

for (let i = 0; i < 4; i++) {
    let item = document.createElement("div");
    item.className = "item";

    let h2 = document.createElement("h2");
    h2.innerHTML = countries[i]["name"];
    item.appendChild(h2);

    let p = document.createElement("p");
    p.innerHTML = countries[i]["continent"];
    item.appendChild(p);

    let innerBox = document.createElement("div");
    innerBox.className = "inner-box"
    ;
    let h3 = document.createElement("h3");
    h3.innerHTML = "Cities";
    innerBox.appendChild(h3);

    let ul = document.createElement("li");
    for (let j = 0; j < countries[i]["cities"].length; j++) {
        let li = document.createElement("li");
        li.innerHTML = countries[i]["cities"][j];
        ul.appendChild(li);
    }

    innerBox.appendChild(ul);
    item.appendChild(innerBox);
    innerBox = document.createElement("div");
    innerBox.className = "inner-box";
    h3 = document.createElement("h3");
    h3.innerHTML = "Popular Photos";
    innerBox.appendChild(h3);

    for (let k = 0; k < countries[i]['photos'].length; k++) {
        let img = document.createElement("img");
        img.className = "photo";
        img.src = "images/" + countries[i]["photos"][k];
        innerBox.appendChild(img);
    }

    item.appendChild(innerBox);

    let bt = document.createElement("button");
    bt.innerHTML = "Visit";
    item.appendChild(bt);
    box.appendChild(item);
}