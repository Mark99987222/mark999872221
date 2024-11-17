const tg = window.Telegram.WebApp;

tg.expand(); // Разворачиваем приложение на весь экран

document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');
    const saveTaskBtn = document.getElementById('save-task-btn');

    const taskNameInput = document.getElementById('task-name');
    const taskDueDateInput = document.getElementById('task-due-date');
    const taskPrioritySelect = document.getElementById('task-priority');

    const taskList = document.getElementById('task-list');

    let tasks = [];

    // Функция для отображения задач
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';

            const taskTitle = document.createElement('h3');
            taskTitle.textContent = task.name;

            const taskDetails = document.createElement('p');
            taskDetails.textContent = `Срок: ${task.due_date}, Приоритет: ${task.priority}`;

            taskItem.appendChild(taskTitle);
            taskItem.appendChild(taskDetails);

            taskList.appendChild(taskItem);
        });
    }

    // Открытие модального окна
    addTaskBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Закрытие модального окна
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Сохранение новой задачи
    saveTaskBtn.addEventListener('click', () => {
        const newTask = {
            name: taskNameInput.value,
            due_date: taskDueDateInput.value,
            priority: taskPrioritySelect.value
        };

        tasks.push(newTask);
        renderTasks();

        // Отправляем данные боту
        tg.sendData(JSON.stringify({ action: 'add_task', task: newTask }));

        // Очищаем форму и закрываем модальное окно
        taskNameInput.value = '';
        taskDueDateInput.value = '';
        taskPrioritySelect.value = 'Низкий';
        modal.style.display = 'none';
    });
});
