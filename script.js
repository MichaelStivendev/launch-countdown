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

let customDate = `2025-08-25T15:00:00`;
let prevDays = null;  // Cambiado a null
let prevHours = null; 
let prevMinutes = null; 
let prevSeconds = null; 

function optenerFecha() {
    let newDate = Date.parse(customDate) - Date.now();
    const days = Math.floor(newDate/(1000*60*60*24));
    const hours = Math.floor(newDate/(1000*60*60)%24);
    const minutes = Math.floor(newDate/(1000*60)%60);
    const seconds = Math.floor(newDate/(1000)%60);
    
    renderTime("days", days);
    renderTime("hours", hours);
    renderTime("minutes", minutes);
    renderTime("seconds", seconds);  
    
     if (newDate <= 0) {
        const nextDate = new Date(Date.parse(customDate));
        nextDate.setDate(nextDate.getDate() + 8); 
        customDate = nextDate.toISOString();
        newDate = Date.parse(customDate) - Date.now();
    }
}

const newFlip = [
    {transform: "rotateX(0)" },
    {transform: "rotateX(180deg)" },
]

const newFlipTiming = {
    duration: 1000
}

function renderTime(unit, time) {
    const unidades = {
        days: prevDays,
        hours: prevHours,
        minutes: prevMinutes,
        seconds: prevSeconds,
    }
    const antValue = unidades[unit];
    let render = getFlipUnit(unit);
    
    render.back.textContent = time < 10 ? `0${time}`: time;
    render.top.textContent = time < 10 ? `0${time}`: time;
    
    // Solo animar si hay un valor anterior válido Y es diferente
    if (antValue !== null && time !== antValue) {
        render.front.textContent = antValue < 10 ? `0${antValue}`: antValue;
        render.bottom.textContent = antValue < 10 ? `0${antValue}`: antValue;
        render.flip.animate(newFlip, newFlipTiming);
    } else {
        // Primera carga: establecer valores sin animación
        render.front.textContent = time < 10 ? `0${time}`: time;
        render.bottom.textContent = time < 10 ? `0${time}`: time;
    }
    
    // Actualizar el valor anterior
    switch (unit) {
        case "days":
            prevDays = time;
            break;
        case "hours":
            prevHours = time;
            break;
        case "minutes":
            prevMinutes = time;
            break;
        case "seconds":
            prevSeconds = time;
            break;
    }
}

const correrTiempo = setInterval(optenerFecha, 1000);
optenerFecha();


