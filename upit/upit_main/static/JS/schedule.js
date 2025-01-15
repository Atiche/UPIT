//Бургерное и боковое меню
let burger_menu = document.querySelector(".burger_menu");
let side_menu = document.querySelector(".side_menu");
let EN_img = document.querySelector(".EN a img");
let RU_img = document.querySelector(".RU a img");

function click_burger_menu(){
    let aside = document.createElement("div");
    aside.classList.add("aside");
    aside.classList.add("showing");

    let shadow = document.createElement("div");
    shadow.classList.add("shadow");

    let link_1 = document.createElement("a");
    if ((RU_img.getAttribute("src")) == RU_active_img){link_1.textContent = "Главная"; link_1.href = "/";}
    else{link_1.textContent = "Main"; link_1.href = "_EN";}
    link_1.classList.add("showing");

    let link_2 = document.createElement("a");
    if ((RU_img.getAttribute("src")) == RU_active_img){link_2.textContent = "О нас"; link_2.href = "about_us";}
    else{link_2.textContent = "About"; link_2.href = "about_us_EN";}
    link_2.classList.add("showing");

    let link_3 = document.createElement("a");
    if ((RU_img.getAttribute("src")) == RU_active_img){link_3.textContent = "Расписание"; link_3.href = "schedule?";}
    else{link_3.textContent = "Schedule"; link_3.href = "schedule_EN?";}
    link_3.classList.add("showing");


    side_menu.appendChild(aside);
    side_menu.appendChild(shadow);
    
    aside.appendChild(link_1);
    aside.appendChild(link_2);
    aside.appendChild(link_3);
    shadow.style.cursor = "not-allowed";
    setTimeout(() => shadow.style.cursor = "default", 1600);
    function click_shadow(){
        aside.classList.remove("showing");
        link_1.classList.remove("showing");
        link_2.classList.remove("showing");
        link_3.classList.remove("showing");


        aside.classList.add("hiding");
        link_1.classList.add("hiding");
        link_2.classList.add("hiding");
        link_3.classList.add("hiding");


        side_menu.removeChild(shadow);
        setTimeout(() => side_menu.removeChild(aside), 1100);
    }
    setTimeout(() => shadow.addEventListener("click", click_shadow), 1600);
}

burger_menu.addEventListener("click", click_burger_menu);


//Личный кабинет
let profile_enter = document.querySelector(".profile_enter");
profile_enter.classList.add("hidden");
let profile_button = document.querySelector(".profile");
let exit_profile_enter = document.querySelector(".exit_profile_enter");

function click_profile_enter() {
    profile_enter.classList.remove("hidden");
    profile_enter.classList.add("showing");
    let shadow_profile = document.createElement("div");
    shadow_profile.classList.add("shadow_profile");
    profile_enter.appendChild(shadow_profile);
}
function click_exit_profile_enter() {
    profile_enter.classList.remove("showing");
    profile_enter.classList.add("hidden");
    profile_enter.removeChild((document.querySelector(".shadow_profile")));
}
exit_profile_enter.addEventListener("click", click_exit_profile_enter);

profile_button.addEventListener("click", click_profile_enter);



//Окно pop-up
function create_pop_up(){
    let main_pop_up = document.createElement("div");
    main_pop_up.classList.add("main_pop_up");
    document.body.appendChild(main_pop_up);
    
    let icon = document.createElement("img");
    icon.src = tech_support_img;
    main_pop_up.appendChild(icon);

    let text_pop_up = document.createElement("p");
    if ((RU_img.getAttribute("src")) == RU_active_img){text_pop_up.innerHTML = "Возникла проблема?<br>Напишите нам!";}
    else{text_pop_up.innerHTML = "Is there a problem?<br>Write to us!";}
    main_pop_up.appendChild(text_pop_up);

    let form_pop_up = document.createElement("form");
    main_pop_up.appendChild(form_pop_up);

    let input_form_pop_up = document.createElement("input");
    if ((RU_img.getAttribute("src")) == RU_active_img){input_form_pop_up.placeholder = "Введите сообщение";}
    else{input_form_pop_up.placeholder = "Enter a message";}
    input_form_pop_up.type = "text";
    input_form_pop_up.name = "input_form_pop_up"
    input_form_pop_up.required = "true";
    form_pop_up.appendChild(input_form_pop_up);

    let submit_form_pop_up = document.createElement("input");
    submit_form_pop_up.type = "submit";
    if ((RU_img.getAttribute("src")) == RU_active_img){submit_form_pop_up.value = "Отправить";}
    else{submit_form_pop_up.value = "Send";}
    form_pop_up.appendChild(submit_form_pop_up);

    let exit_pop_up = document.createElement("img");
    exit_pop_up.src = exit_img;
    main_pop_up.appendChild(exit_pop_up);
    exit_pop_up.addEventListener("click", () => document.body.removeChild(main_pop_up));
}
setTimeout(create_pop_up, 10000);




//Переключение темы
let switch_theme = document.querySelector(".switch_theme img");
let css_style_link = document.querySelector('link[rel="stylesheet"]');
function switch_theme_click() {
    if ((switch_theme.getAttribute("src")) == moon_img){
        css_style_link.href = css_link_dark;
        switch_theme.src = sun_img;
        if ((RU_img.getAttribute("src")) == RU_active_img){document.querySelector(".logo img").src = logo_dark;}
        else{document.querySelector(".logo img").src = logo_dark_en;}
    }
    else{
        css_style_link.href = css_link_default;
        switch_theme.src = moon_img;
        if ((RU_img.getAttribute("src")) == RU_active_img){document.querySelector(".logo img").src = logo;}
        else{document.querySelector(".logo img").src = logo_en;}
    }
}
switch_theme.addEventListener("click", switch_theme_click);



//Выбор группы и расписание
let group_select = document.querySelector(".choose .group_select");
let week_select = document.querySelector(".choose .week_select");
let form = document.querySelector("form");
if (!localStorage.hasOwnProperty("selected_group")){
    localStorage.setItem("selected_group", "");
}
if (!localStorage.hasOwnProperty("selected_week")){
    localStorage.setItem("selected_week", "");
}
week_select.value = localStorage.getItem("selected_week");
group_select.value = localStorage.getItem("selected_group");

if (localStorage.getItem("selected_group") != ""){
    week_select.removeAttribute("disabled");
}
let list_of_day_names = (RU_img.getAttribute("src")) == RU_active_img ? ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let list_of_days = Object.keys(schedule_dict).slice(Object.keys(schedule_dict).indexOf("monday"));
let day_num = 0;


function group_selected(){
    if (localStorage.getItem("selected_group") != "none" && localStorage.getItem("selected_group") != ""){
        let schedule_block = document.createElement("div");
        schedule_block.classList.add("schedule_block");
        document.querySelector("main").appendChild(schedule_block);

        let schedule_hat_wrapper = document.createElement("div");
        schedule_hat_wrapper.classList.add("schedule_hat_wrapper");
        schedule_block.appendChild(schedule_hat_wrapper);

        let day = document.createElement("h2");
        day.textContent = list_of_day_names[day_num];
        schedule_hat_wrapper.appendChild(day);

        let week_number = document.createElement("p");
        week_number.textContent = (RU_img.getAttribute("src")) == RU_active_img ? schedule_dict["week_number"] + " неделя" : schedule_dict["week_number"] + " week";
        schedule_hat_wrapper.appendChild(week_number);

        let arrow_left = document.createElement("img");
        arrow_left.src = arrow_left_img;
        schedule_hat_wrapper.appendChild(arrow_left);

        let arrow_right = document.createElement("img");
        arrow_right.src = arrow_right_img;
        schedule_hat_wrapper.appendChild(arrow_right);

        let schedule_lessons_wrapper = document.createElement("div");
        schedule_lessons_wrapper.classList.add("schedule_lessons_wrapper");
        schedule_block.appendChild(schedule_lessons_wrapper);
        try{
            let curr_day_schedule = schedule_dict[list_of_days[day_num]].split(",");
            for (i = 0; i < curr_day_schedule.length; i++){

                let value = (curr_day_schedule[i]).trim().split("(");
                value[1] = value[1].replace(")","");

                let day_of_lessons_wrapper = document.createElement("div");
                day_of_lessons_wrapper.classList.add("day_of_lessons_wrapper");
                schedule_lessons_wrapper.appendChild(day_of_lessons_wrapper);

                let num_of_lesson = document.createElement("p");
                num_of_lesson.textContent = String(i+1);
                day_of_lessons_wrapper.appendChild(num_of_lesson);

                let name_of_lesson = document.createElement("p");
                name_of_lesson.textContent = value[0];
                day_of_lessons_wrapper.appendChild(name_of_lesson);

                let type_of_lesson = document.createElement("p");
                type_of_lesson.textContent = value[1];
                day_of_lessons_wrapper.appendChild(type_of_lesson);
        }}
        catch{
            form.submit();
        }
        arrow_left.addEventListener("click", () => {
            if (day_num == 0){
                day_num = 5;
            }
            else{
                day_num --;
            }
            document.querySelector("main").removeChild(schedule_block);
            group_selected();
        });
        arrow_right.addEventListener("click", () => {
            if (day_num < 5){
                day_num++;
            }
            else{
                day_num = 0;
            }
            document.querySelector("main").removeChild(schedule_block);
            group_selected();
        });
    }
}

function change_item() {
    localStorage.setItem("selected_group", group_select.value);
    localStorage.setItem("selected_week", week_select.value);
    form.submit();
}

group_select.addEventListener("change", () => {week_select.removeAttribute("disabled")});
week_select.addEventListener("change", change_item);
group_selected();