
//initializing DOM elements

const hour_field = document.querySelector("#hour")
const minute_field = document.querySelector("#minute")
const second_field = document.querySelector("#second")
const start_btn = document.querySelector("#start")
const stop_btn = document.querySelector("#stop")
let total_seconds = 0;
let clock_interval = 0;
//this will keep the id of interval used to make the clock tick. will be later on to stop the clock
start_btn.onclick = function(){
    let hour_value = hour_field.value;
    let minute_value = minute_field.value;
    let second_value = second_field.value;
    //if hours value is an empty string make it zero
    if(hour_value == ''){hour_value=0};
    if(minute_value == ''){minute_value=0};
    if(second_value == ''){second_value=0};
    //make sure the user entered a number
    if(isNaN(hour_value) || isNaN(minute_value) || isNaN(second_value)){
        alert("You must enter a number in the fields or leave it empty")
    }else{
        //start countdown and disable input fields and start button
        startCountDown(parseInt(hour_value),parseInt(minute_value),parseInt(second_value));
    }
}

function startCountDown(hours,minutes,seconds){
    total_seconds = 0;
    disableFields()
    //convert all to seconds
    if(hours > 0){
        //convert hours to seconds
        total_seconds = total_seconds + (hours * 60 * 60);
    }

    if(minutes > 0){
        //convert minutes to secondss
        total_seconds = total_seconds + (minutes * 60);
    }

    //add seconds to total seconds
    total_seconds = total_seconds + seconds;

    clock_interval = setInterval(function(){
        let seconds = total_seconds % 60;
        let temp_minutes = Math.floor(total_seconds /60);//used by the hour
        let minutes = temp_minutes%60;
        let hours = Math.floor(temp_minutes / 60);
        updateClock(hours,minutes,seconds)
        if(total_seconds <= 0){
            //counter over
            enableFields();
            clearInterval(clock_interval)
        }else{
            //counter not over x
            total_seconds = total_seconds - 1;
        }
    },1000);

}

function updateClock(hour,minute,second){
    hour_field.value = hour;
    minute_field.value = minute;
    second_field.value = second;
}

function disableFields(){
    hour_field.disabled = true;
    minute_field.disabled = true;
    second_field.disabled = true;
    start_btn.disabled = true;
    //stop button is not disabled
}

function enableFields(){
    hour_field.disabled = false;
    minute_field.disabled = false;
    second_field.disabled = false;
    start_btn.disabled = false;
}

stop_btn.onclick = ()=>{
    enableFields()
    clearInterval(clock_interval)
}