//  Create a new date object
var today = new Date();
var dateAndTime = today.getMonth() + "/" + today.getDate() + "/" + today.getFullYear() + ", " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds ();
const thisYear = today.getFullYear();
const thisHour = today.getHours();
// select the <footer> element from the DOM and store it in a variable
const footer = document.querySelector('footer');
const copyright = document.createElement('p');
copyright.innerHTML = `&copy; Olga Musteata ${thisYear}`;
// append the copyright element to the footer
footer.appendChild(copyright);
// Add Skills Section
const skills = ["JavaScript", "CSS", "PHP", "Visual Basic", "Python", "Access", "SQL", "50WPM"];
// select the #skills section by id
const skillsSection = document.getElementById("skills");
// query the skillsSection to find the <ul> element
const skillsList = skillsSection.querySelector('ul');
// Create a for loop to iterate over skills array
for (let i = 0; i < skills.length; i++) {
    let skill = document.createElement('li');
    skill.innerHTML = skills[i];
    skillsList.appendChild(skill);
}

// target the form and use an event listener to listen for form submit
const messageForm = document.getElementsByName('leave_message');

messageForm[0].addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const message = event.target.message.value;
    console.log(name + " " + email + " " + message);
    const messageSection = document.getElementById('messages');
    const messageList = messageSection.querySelector('ul');
    const newMessage = document.createElement('li');
    // create the message
    newMessage.innerHTML = `<span>${message}</span><br>
        ${dateAndTime} from <a href="mailto:${email}">${name}</a><br>`;

    //edit button
    const editButton = document.createElement('button');
    editButton.innerText = 'edit';
    editButton.type = 'button';
    editButton.id = 'editButton1';
    editButton.addEventListener('click', (e) => {
        const button = e.target;
        const li = button.parentNode;
        const ul = li.parentNode;
        if (e.target.tagName === 'BUTTON') {
            if (button.textContent === 'remove') {
                ul.removeChild(newMessage);
            } else if (button.textContent === 'edit') {
                const span = newMessage.childNodes[0];
                const input = document.createElement('input');
                input.type = 'text';
                input.value = span.innerText;
                newMessage.insertBefore(input, span);
                newMessage.removeChild(span);
                button.textContent = 'save';
            } else if (button.textContent === 'save') {
                const input = newMessage.childNodes[0];
                const span = document.createElement('span');
                span.textContent = input.value;
                newMessage.insertBefore(span, input);
                newMessage.removeChild(input);
                button.textContent = 'edit';
            }
        }
    }); 
    newMessage.appendChild(editButton);
    const title_messages = document.getElementById('title_h2');
    // remove button
    const removeButton = document.createElement('button');
    removeButton.innerText = 'remove';
    removeButton.type = "button";
    removeButton.id = 'removeButton2';
    removeButton.addEventListener('click', () => {
        const entry = removeButton.parentNode;
        entry.remove();
        // remove 'Messages' title if no messages
        if (messageList.children.length < 1) {
            title_messages.innerText = '';
        }
    });
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);
    // 'Messages' title appears only when there is a message:
    if (newMessage.innerText.length > 1) {
        title_messages.innerText = 'Messages:';
    } 
    messageForm.item(0).reset();
});

fetch('https://api.github.com/users/koral14/repos')
    .then(response => response.json())
    .then(data => generateRepos(data))
    .catch(error => console.log('Looks like there was a problem!!!', error))

function generateRepos(data) {
    var projectSection = document.getElementById('projects');
    var projectList = projectSection.querySelector('ul');
    for (let i=0; i < data.length; i++) {
        var project = document.createElement('li');
        project.innerHTML = `
            <a href="${data[i].html_url}"><b>${data[i].name}</b></a> 
            was created at ${getDate1(data[i].created_at)}. 
            <br> <b>Short description: </b>${data[i].description}
        `;
        projectList.appendChild(project);
    }
}

// extracts date from template: 2022-08-20T02:28:51Z
function getDate1(date_and_time) {
    var arrayDateAndTime = date_and_time.split('T');
    var arrayDateSplitted = arrayDateAndTime[0].split('-');
    year = arrayDateSplitted[0];
    month = arrayDateSplitted[1];
    day = arrayDateSplitted[2];
    var newDate = day + '/' + month + '/' + year;
    return newDate;
}