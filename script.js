// ----------------------
// Переключение вкладок
// ----------------------
function openTab(tab) {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.getElementById(tab).classList.add("active");
}

// ----------------------
// Тёмная тема
// ----------------------
document.getElementById("themeToggle").onclick = () => {
    document.body.classList.toggle("dark");
};

// ----------------------
// Розрахунок інвертора
// ----------------------
function calcInverter() {
    let P = Number(power.value);
    let H = Number(hours.value);
    let A = Number(autonomy.value);
    let bat = Number(batteryType.value);
    let volt = Number(voltage.value);

    if (!P || !H || !A) {
        invResult.innerHTML = "<b>Заповніть усі поля!</b>";
        return;
    }

    let inverter = Math.round(P * 1.35);
    let Wh = P * A;
    let Ah = Math.round((Wh / volt) / bat);
    let kWh = (Wh / 1000).toFixed(2);

    invResult.innerHTML = `
        <b>Рекомендований інвертор:</b> ${inverter} Вт<br>
        <b>Мінімальна ємність АКБ:</b> ${Ah} А·год (${volt}В)<br>
        <b>Загальна енергія:</b> ${kWh} кВт·год
    `;
}

// ----------------------
// Розрахунок АКБ
// ----------------------
function calcBatteries() {
    let Wh = Number(battWh.value);
    let volt = Number(battVolt.value);
    let cap = Number(battAh.value);

    if (!Wh || !volt || !cap) {
        battResult.innerHTML = "Заповніть усі поля!";
        return;
    }

    let needAh = Math.round(Wh / volt);
    let count = Math.ceil(needAh / cap);

    battResult.innerHTML = `
        <b>Потрібно АКБ:</b> ${count} шт<br>
        <b>Загальна ємність:</b> ${needAh} А·год
    `;
}

// ----------------------
// Розрахунок СЕС
// ----------------------
function calcSolar() {
    let need = Number(solarNeed.value);
    let sun = Number(sunHours.value);
    let w = Number(panelW.value);

    if (!need || !sun || !w) {
        solarResult.innerHTML = "Заповніть поля!";
        return;
    }

    let totalW = Math.ceil((need * 1000) / sun);
    let count = Math.ceil(totalW / w);

    solarResult.innerHTML = `
        <b>Потрібна потужність СЕС:</b> ${totalW} Вт<br>
        <b>Кількість панелей:</b> ${count} шт
    `;
}

// ----------------------
// Вартість
// ----------------------
function calcPrice() {
    let b = Number(priceBatt.value);
    let i = Number(priceInv.value);
    let p = Number(pricePanel.value);

    if (!b || !i || !p) {
        priceResult.innerHTML = "Заповніть поля!";
        return;
    }

    let total = b + i + p;

    priceResult.innerHTML = `
        <b>Орієнтовна вартість системи:</b> ${total} грн
    `;
}

// ----------------------
// ГРАФІК
// ----------------------
new Chart(powerChart, {
    type: 'line',
    data: {
        labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
        datasets: [{
            label: "Споживання (Вт)",
            data: [200, 300, 500, 400, 350, 250],
            borderColor: "#2563eb",
            borderWidth: 3
        }]
    }
});
