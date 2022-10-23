let ourskills = document.querySelector(".our_skills");
let lines = document.querySelectorAll(".our_skills .skill_wrapper:not(:last-of-type) .skill_line path");
let skills = document.querySelectorAll(".our_skills .skill");
let transitionDur = 500;
let transitionInterval = 1500;
let iterationInterval = 1000;
for (let i = 0; i < skills.length; i++) {
    skills[i].style.animationDelay = i * transitionInterval + "ms";
}
for (let i = 0; i < lines.length; i++) {
    lines[i].style.strokeDasharray = lines[i].getTotalLength() + "px";
    lines[i].style.strokeDashoffset = lines[i].getTotalLength() + "px";
    lines[i].style.animationDelay = i * transitionInterval + "ms";
}


(function zIndexSkills(){
    for(let skill of skills){
        skill.addEventListener('mouseover', ()=>{
            skill.setAttribute('style', `z-index:${3}`);
        })
        skill.addEventListener('mouseleave', ()=>{
            setTimeout(()=>{
                skill.setAttribute('style', `z-index:${1}`);
            }, 200)
        })
    }
})()

function animSkills() {
    for (let i = 0; i < skills.length; i++) {
        skills[i].classList.add("active_skill");
    }
    setTimeout(function () {
        for (let i = 0; i < skills.length; i++) {
            skills[i].classList.remove("active_skill");
        }
        setTimeout(animSkills, iterationInterval);
    }, transitionInterval * skills.length);
}
function animLines() {
    let i = 0;
    (function setSDO() {
        let length = lines[i].getTotalLength();
        lines[i].style.setProperty("stroke-dashoffset", length * 2 + "px", "important");
        (function (el = lines[i]) {
            setTimeout(function () {
                el.style.setProperty("transition", "none");
                el.style.setProperty("stroke-dashoffset", length + "px");
                el.getBoundingClientRect();
                el.style.removeProperty("transition");
            }, transitionInterval);
        })();
        ++i;
        if (i < lines.length)
            setTimeout(setSDO, transitionInterval);
    })();
    setTimeout(animLines, iterationInterval + transitionInterval * skills.length);
}
animSkills();
animLines();
//# sourceMappingURL=ourskills.js.map