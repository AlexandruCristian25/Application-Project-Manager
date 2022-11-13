function doStartupConfig() {
    checkUserLogin();
    getEmpData();
}

function checkUserLogin() {
    const userLoggedIn = sessionStorage.getItem('userLogged');
    if(userLoggedIn !== 'logged') {
        window.location.replace('login.html');
    }
}

const empFromLocalStorage = localStorage.getItem('employeesArr');
let employeesArr = JSON.parse(empFromLocalStorage);

const prjFromLocalStorage = localStorage.getItem('projectsArr');
let projectsArr = prjFromLocalStorage ? JSON.parse(prjFromLocalStorage) : [];

let empIndex;

function getEmpData() {
    const searchArr = window.location.search.split('=');
    empIndex = searchArr[1];
    document.getElementById('emp_name').innerText = employeesArr[empIndex].name;
    createSelect();
}

function saveEmpProject() {
    const project_selected = document.getElementById('select_project').value;

    projectsArr.forEach((project, i) => {
        if (employeesArr[empIndex].project !== null && employeesArr[empIndex].project === project.name) {
            if(projectsArr[i].employees > 0) {
                projectsArr[i].employees--;
            }
        }
        if (project_selected === project.name) {
            projectsArr[i].employees++;
        }
    });
    localStorage.setItem('projectsArr', JSON.stringify(projectsArr));

    employeesArr[empIndex].project = (project_selected === '0') ? null : project_selected;
    localStorage.setItem('employeesArr', JSON.stringify(employeesArr));
}

function createSelect() {
    let selectStr = '<option value="0">No project</option>';
    projectsArr.forEach(project => {
        const flag = (employeesArr[empIndex].project === project.name) ? 'selected' : '';
        selectStr += '<option value="' + project.name + '" ' + flag + '>' + project.name + '</option>'
    });
    document.getElementById('select_project').innerHTML = selectStr;;
}