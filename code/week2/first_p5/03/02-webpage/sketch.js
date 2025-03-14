
function setup(){
    createCanvas(400, 400);
    background(190);

    circle(width/2, height/2);
    const sideNacItems = selectAll('.side-nav-item');
    for (let i = 0; i < sideNacItems.length; i++){
        sideNacItems[i].mousePressed(onMouseClick);
        sideNacItems[i].mouseOver(onMouseOver);
        sideNacItems[i].mouseOut(onMouseOut);
    }
}

function onMouseClick(){
    const id =  this.elt.dataset.id
    const className = "." + id;
    const projects = selectAll('.project');
    for (let i = 0; i < projects.length; i++){
        projects[i].hide();
    }
    const selectedProject = select(className);
    selectedProject.show();
}
  

function onMouseOver(){
    this.style("color", "red");

}

function onMouseOut(){
    this.style("color", "black")
}
