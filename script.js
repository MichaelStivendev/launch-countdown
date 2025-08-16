

function getFlipUnit(unit) {
    const container = document.querySelector(`.flip-unit.${unit}`)
    return{
        top: container.querySelector(".card-face.top"),
        bottom: container.querySelector(".card-face.bottom"),
        front: container.querySelector(".front"),
        back: container.querySelector(".back"),
        flip: container.querySelector(".card-face.back-top")
    }
}


const customDate = "2025-08-20T15:00:00";

let prevDays = 0; 
let prevHours = 0; 
let prevMinutes = 0; 
let prevSeconds = 0; 

function optenerFecha() {
    const newDate = Date.parse(customDate) - Date.now();
    const days = Math.floor(newDate/(1000*60*60*24));
    const hours = Math.floor(newDate/(1000*60*60)%24);
    const minutes = Math.floor(newDate/(1000*60)%60);
    const seconds = Math.floor(newDate/(1000)%60);
    renderTime("days", days);
    renderTime("minutes", minutes);
    renderTime("hours", hours);
    renderTime("seconds", seconds);  
}

const newFlip = [
    {transform: "rotateX(0)" },
    {transform: "rotateX(180deg)" },
]

const newFlipTiming = {
    duration: 1000
}

function  renderTime(unit, time) {
    
    const unidades = {
        days: prevDays,
        hours: prevHours,
        minutes: prevMinutes,
        seconds: prevSeconds,
    }
    const antValue = unidades[unit];
     let render = getFlipUnit(unit);
        render.back.textContent = time < 10 ? `0${time}`: time;
        render.top.textContent =  time < 10 ? `0${time}`: time;
        render.front.textContent = antValue < 10 ? `0${antValue}`: antValue;
        render.bottom.textContent = antValue < 10 ? `0${antValue}`: antValue;
    if (time != antValue) {
      
        
        
        render.flip.animate(newFlip,newFlipTiming);
        switch (unit) {
            case "days":
                prevDays = time
                break;
            case "hours":
                prevHours = time
                break;
            case "minutes":
                prevMinutes = time
                break;
            case "seconds":
                prevSeconds = time
                break;
        
            default:
                break;
        }
    }
}
const correrTiempo = setInterval(optenerFecha,1000);
optenerFecha();


