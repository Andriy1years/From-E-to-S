const checkbox = document.querySelectorAll(".checkbox-wrapper");
const el = document.getElementById('push');
const form = document.querySelector('form');

function loadProgress(id) {
  const el = document.getElementById(id);
  const data = JSON.parse(localStorage.getItem(id));
  if (data) {
    el.textContent = `[${data.value}/${data.max}]`;
    if (data.value >= data.max) {
      el.style = 'text-shadow: 1px 1px 2px pink;';
    }
  }
}

loadProgress('push');
loadProgress('sit');
loadProgress('sq');
loadProgress('run');

form.addEventListener('submit', function (event) {
  event.preventDefault(); 

  const exercise = form.elements['option'].value;
  const number = form.elements['number'].value;
  let el;
function addToProgress(addValue, id) {
  const text = el.textContent;
  const match = text.match(/\[(\d+)\/(\d+)\]/);
  if (match) {
    const current = parseInt(match[1]);
    const max = parseInt(match[2]);

    let newValue = current + parseInt(addValue);
    if (newValue >= max) {
      el.style = 'text-shadow: 1px 1px 2px pink;';
    } else {
      el.style.fontWeight = '';
      el.style.color = 'white';
    }

    // Сохраняем в localStorage
    localStorage.setItem(id, JSON.stringify({ value: newValue, max: max }));

    el.textContent = `[${newValue}/${max}]`;
  }
}
  if (exercise == 1) {
    el = document.getElementById('push')
    
    addToProgress(number, "push");
    if (number >= 100) {
      checkbox[0].classList.toggle("checked");
    }
  }
  else if (exercise == 2) {
    el = document.getElementById('sit')
    addToProgress(number, "sit");
    if (number >= 100) {
      checkbox[1].classList.toggle("checked");
    }
  }
  else if (exercise == 3) {
    el = document.getElementById('sq')
    addToProgress(number, "sq");
    if (number >= 100) {
      checkbox[2].classList.toggle("checked");
    }
  }
  else if (exercise == 4) {
    el = document.getElementById('run')
    addToProgress(number, "run");
    if (number >= 100) {
      checkbox[3].classList.toggle("checked");
    }
  }
  // Всё ок! 
});

function checkAllProgress() {
  const ids = ['push', 'sit', 'sq', 'run'];

  ids.forEach((id, index) => {
    const data = JSON.parse(localStorage.getItem(id));
    if (data && data.value >= data.max) {
      checkbox[index].classList.add("checked");
    }
  });
}



checkAllProgress();
function resetIfNewDay() {
  const today = new Date().toLocaleDateString(); // формат: "dd.mm.yyyy" зависит от браузера

  const lastDate = localStorage.getItem("lastDate");

  if (lastDate !== today) {
    // Новая дата! Сбрасываем всё
    localStorage.setItem("lastDate", today);

    const ids = ['push', 'sit', 'sq', 'run'];

    ids.forEach((id, index) => {
      // Сброс прогресса
      localStorage.setItem(id, JSON.stringify({ value: 0, max: 100 }));

      // Сброс текста
      const el = document.getElementById(id);
      el.textContent = `[0/100]`;
      el.style = '';

      // Сброс чекбокса
      checkbox[index].classList.remove("checked");
    });
  }
}

// Вызываем в самом низу
resetIfNewDay();



