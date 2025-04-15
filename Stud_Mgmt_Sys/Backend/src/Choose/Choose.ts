// const add_student = document.getElementById("add_btn");
const student_form = document.getElementById("student-form") as HTMLFormElement;

const userTableBody = document.getElementById("userTableBody") as HTMLTableSectionElement;
const attendanceTablebody = document.getElementById("attendanceTableBody") as HTMLTableSectionElement;

const attendanceWrapper = document.getElementById('Attendance-container') as HTMLElement;
const studentSection = document.getElementById("studentform-section") as HTMLElement;
const table_Container = document.getElementById("table-container") as HTMLElement;
const marksheet_Form = document.getElementById("Marksheet_form") as HTMLElement;


const savebutton = document.getElementById("save-btn") as HTMLButtonElement;
const add_student_btn = document.getElementById("ADD") as HTMLButtonElement;
const attendance_student_btn = document.getElementById("ATTENDANCE") as HTMLButtonElement;
const marksheet_btn = document.getElementById("MARKSHEET") as HTMLButtonElement;
const add_studentDetails_DB = document.getElementById("add_stud_DB") as HTMLButtonElement;
const submitAttendanceBtn = document.getElementById("submitAttendanceBtn") as HTMLButtonElement;


let isEditMode = false;
let editingRegisterNumber: string | null | undefined = null;

window.addEventListener('DOMContentLoaded', async () => {
    await loadAllStudents();
    // DeleteButton();
});


function hideAllSections() {
    studentSection.style.display = "none";
    table_Container.style.display = "none";
    attendanceWrapper.style.display = "none";
    marksheet_Form.style.display = "none";
}

let currentVisible: HTMLElement | null = null;

add_student_btn?.addEventListener('click', () => {
    if (currentVisible === studentSection) {
        hideAllSections();
        currentVisible = null;
    } else {
        hideAllSections();
        studentSection.style.display = "flex";
        table_Container.style.display = "block";
        currentVisible = studentSection;
    }
});

student_form?.addEventListener('submit', async (e: Event) => {
    e.preventDefault();

    const newStudentName = (document.getElementById('studentName') as HTMLInputElement).value;
    const newStudentID = (document.getElementById('registerNumber') as HTMLInputElement).value;
    const newStudentMAIL = (document.getElementById('studentMail') as HTMLInputElement).value.trim();
    const newStudentPhoneNumber = (document.getElementById('studentNumber') as HTMLInputElement).value;


    if (!newStudentName || !newStudentID || !newStudentMAIL || !newStudentPhoneNumber) {
        alert("Please fill all fields to Add");
        return;
    }
    try {
        let data, response;

        if (isEditMode && editingRegisterNumber) {
            response = await fetch(`http://localhost:5501/api/student/${editingRegisterNumber}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    studentName: newStudentName,
                    email: newStudentMAIL,
                    phoneNumber: newStudentPhoneNumber
                })
            });
            data = await response.json();
            if (response.ok) {
                alert("Student updated successfully");
                (document.getElementById('table-container') as HTMLElement).style.display = 'block';
            } else {
                alert(data.mesage || "Failed to update");
            }
        } else {
            response = await fetch("http://localhost:5501/api/student", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    studentName: newStudentName,
                    registerNumber: newStudentID,
                    email: newStudentMAIL,
                    phoneNumber: newStudentPhoneNumber
                })
            });
            data = await response.json();
            if (response.ok) {
                alert("Student added successfully");
                (document.getElementById('table-container') as HTMLElement).style.display = 'block';
            } else {
                alert(data.message || "Failed to add");
            }
        }
        student_form.reset();
        isEditMode = false;
        editingRegisterNumber = null;
        await loadAllStudents();
    } catch (error) {
        console.error("Submit error:", error);
        alert("Something went wrong. Please try again later 😥");
    }
});


async function loadAllStudents() {
    try {
        const response = await fetch("http://localhost:5501/api/students");
        const data = await response.json();
        if (response.ok) {
            userTableBody.innerHTML = "";
            data.forEach((student: any) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                <td>${student.register_number}</td>
                <td>${student.student_name}</td>
                <td>${student.email}</td>
                <td>${student.phone_number}</td>
                <td>
                    <button class="edit-btn" id = "button">Edit</button>
                    <button class="delete-btn" id = "button">Delete</button>
                </td>
            `;
                userTableBody.appendChild(row);
            });
            DeleteButton();
            EditButton();
        } else {
            alert("Error loading students");
        }
    } catch (error) {
        console.error("Loading students error:", error);
        alert("Failed to load students internal");
    }
}


function DeleteButton() {
    const deleteButton = document.querySelectorAll('.delete-btn');
    deleteButton.forEach(button => {
        button.addEventListener('click', async (e) => {
            const row = (e.target as HTMLElement).closest('tr');
            const registerNumber = row?.cells[0].textContent?.trim();

            const confirmed = confirm(`Are you sure you want to delete student with ${registerNumber}`);
            if (!confirmed || !registerNumber) return;
            try {
                const response = await fetch(`http://localhost:5501/api/student/${registerNumber}`, {
                    method: "DELETE"
                });
                // const data = await response.json();
                if (response.ok) {
                    // alert("Student deleted successfully");
                    await loadAllStudents();
                } else { alert("Failed to delete a student") }
            } catch (error) {
                console.error("Error deleting student", error)
            }
        });
    });
}


function EditButton() {
    const editButton = document.querySelectorAll('.edit-btn');
    editButton.forEach(button => {
        button.addEventListener('click', (e) => {
            const row = (e.target as HTMLElement).closest('tr');
            const registerNumber = row?.cells[0].textContent?.trim();
            const studentName = row?.cells[1].textContent?.trim();
            const email = row?.cells[2].textContent?.trim();
            const phoneNumber = row?.cells[3].textContent?.trim();

            (document.getElementById('registerNumber') as HTMLInputElement).value = registerNumber!;
            (document.getElementById('studentName') as HTMLInputElement).value = studentName!;
            (document.getElementById('studentMail') as HTMLInputElement).value = email!;
            (document.getElementById('studentNumber') as HTMLInputElement).value = phoneNumber!;

            isEditMode = true;
            editingRegisterNumber = registerNumber;
        });
    });
}
/******************************************** Attendance page ******************************************************/

attendance_student_btn?.addEventListener('click', async () => {
    await loadAllStudentsAttendance();
    if (currentVisible === attendanceWrapper) {
        hideAllSections();
        currentVisible = null;
    } else {
        hideAllSections();
        attendanceWrapper.style.display = "block";
        currentVisible = attendanceWrapper;
    }
});

submitAttendanceBtn?.addEventListener('click', async()=>{
    const COUNTtable = document.getElementById("countTable") as HTMLTableElement;
    COUNTtable.style.display = 'block';
})

async function loadAllStudentsAttendance() {
    try {
        const response = await fetch("http://localhost:5501/api/students/attendance");
        const data = await response.json();
        if (response.ok) {
            attendanceTablebody.innerHTML = "";
            data.forEach((student: any) => {
                const row = document.createElement("tr");
                const uniqueName = `option-${student.register_number}`
                row.innerHTML =
                    `
                    <td>${student.register_number}</td>
                    <td>${student.student_name}</td>
                    <td>
                        <label class = "radio-button">
                            <input type = "radio" name = "${uniqueName}" value= "Present">
                            <div class="radio-circle"></div>
                            <span class="radio-label">Present</span>
                        </label>
                        <label class="radio-button">
                            <input type="radio" name="${uniqueName}" value="Absent">
                            <div class="radio-circle"></div>
                            <span class="radio-label">Absent</span>
                        </label>
                    </td>
                `;
                attendanceTablebody.appendChild(row);
            });
        } else {
            alert("Error loading attendance table");
        }
    } catch (error) {
        console.error("Loading students error:", error);
        alert("Failed to load students attendance internal");
    }
}


submitAttendanceBtn?.addEventListener('click', async () => {
    // console.log("hii");
    const attendanceRows = document.querySelectorAll("#attendanceTableBody tr");
    const attendanceData: { registerNumber: string; action: string }[] = [];
    let totalStudents = 0;
    let presentCount = 0;
    let absentCount = 0;

    attendanceRows.forEach(row => {
        const registerNumber = row.children[0].textContent?.trim() || "";
        const radios = row.querySelectorAll("input[type='radio']");
        totalStudents++;
        let selectedActions = "";
        radios.forEach((radio: any) => {
            if (radio.checked) {
                selectedActions = radio.value;
            }
        });
        
        if (registerNumber && selectedActions) {
            attendanceData.push({ registerNumber, action: selectedActions });
            
            if (selectedActions.toLowerCase() === "present") presentCount++;
            if (selectedActions.toLowerCase() === "absent") absentCount++;
        }
        (document.getElementById("studentsCounts") as HTMLElement).textContent = totalStudents.toString();
        (document.getElementById("presentCounts") as HTMLElement).textContent = presentCount.toString();
        (document.getElementById("absentCounts") as HTMLElement).textContent = absentCount.toString();


    });
    if (attendanceData.length === 0) {
        alert("Mark attendance before submitting");
        return;
    }
    try {
        for (const record of attendanceData) {
            const response = await fetch(`http://localhost:5501/api/students/attendance/${record.registerNumber}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: record.action })
            });
            const result = await response.json();
        }
        alert("Attendance updated successfully");
    } catch (error) {
        console.error("Attendance submission error:", error);
        alert("Something went wrong while submitting attendance 😥");
    }
});

// *****************************************Marksheet********************************************************\\
marksheet_btn?.addEventListener('click', () => {
    // console.log("hii")
    if (currentVisible === marksheet_Form) {
        hideAllSections();
        currentVisible = null;
    } else {
        hideAllSections();
        marksheet_Form.style.display = "block";
        currentVisible = marksheet_Form;
    }

});


const dropdown_btn = document.getElementById("dropdown-btn") as HTMLButtonElement;
const dropdown_container = document.getElementById("dropdown") as HTMLElement;
savebutton.style.display = 'none';

dropdown_btn?.addEventListener('click', async () => {
    savebutton.style.display = 'none';

    if (dropdown_container.style.display === 'block') dropdown_container.style.display = 'none';
    else dropdown_container.style.display = 'block'

    dropdown_container.innerHTML = "";
    const response = await fetch('http://localhost:5501/api/dropdown');
    const data = await response.json();
    if (response.ok) {
        console.log("response is ok")
        dropdown_container.innerHTML = "";
        data.forEach((student: any) => {
            const student_option = document.createElement('div');
            student_option.textContent =
                `
                ${student.student_name}
            `;
            dropdown_container.appendChild(student_option);
            student_option?.addEventListener('click', async () => {
                dropdown_btn.textContent = `${student.student_name}`;
                dropdown_container.style.display = 'none';
                generateTable(`${student.student_name}`);
            });
        });
    } else {
        alert("Error on getting students list");
    }

});

async function generateTable(newStudentName: string) {
    console.log("function generate is working");
    const container = document.getElementById("marksheet-container") as HTMLElement;
    const tableBody = document.getElementById("UpdateMark") as HTMLTableSectionElement;
    tableBody.innerHTML = "";

    const table = document.getElementById("marksheet-table") as HTMLTableElement;
    const header = document.createElement('tr');
    header.className = "markTableHead";
    ["Student Name", "tamil", "english", "maths", "science", "social"].forEach(Subject => {
        const th = document.createElement('th');
        // th.className = "markTableHead";
        th.textContent = Subject;
        header.appendChild(th);
    });
    tableBody.appendChild(header);
    const row = document.createElement('tr');
    const namecell = document.createElement('td');
    namecell.textContent = newStudentName;
    row.appendChild(namecell);

    const Subjects = ["tamil", "english", "maths", "science", "social"];
    Subjects.forEach(sub => {
        const td = document.createElement("td");
        const input = document.createElement("input");
        input.className = "inputData";
        // input.type = "number";
        input.name = sub;
        input.className = "markTableData";
        input.placeholder = sub.charAt(0).toUpperCase() + sub.slice(1);
        td.appendChild(input);
        row.appendChild(td);
    });
    tableBody.appendChild(row);
    savebutton.style.display = 'block';


    savebutton?.addEventListener('click', async () => {
        console.log("im in save button")
        const marks = {
            studentName: newStudentName,
            Tamil: (document.querySelector("input[name='tamil']") as HTMLInputElement).value,
            English: (document.querySelector("input[name='english']") as HTMLInputElement).value,
            Maths: (document.querySelector("input[name='maths']") as HTMLInputElement).value,
            Science: (document.querySelector("input[name='science']") as HTMLInputElement).value,
            Social: (document.querySelector("input[name='social']") as HTMLInputElement).value,
        };
        const tamil = Number(marks.Tamil);
        const english = Number(marks.English);
        const maths = Number(marks.Maths);
        const science = Number(marks.Science);
        const social = Number(marks.Social);
        const sum = tamil + english + maths + science + social;

        let GRADE = "";
        if (sum >= 450) {
            GRADE = "O";
        } else if (sum >= 400) {
            GRADE = "A+";
        } else if (sum >= 350) {
            GRADE = "A";
        } else if (sum >= 300) {
            GRADE = "B+";
        } else if (sum >= 250) {
            GRADE = "B";
        } else if (sum >= 200) {
            GRADE = "C";
        } else {
            GRADE = "U";
        }
        const finalData = {
            tamil,
            english,
            maths,
            science,
            social,
            total: sum,
            grade: GRADE
        };
        try {
            console.log("im trying")
            const response = await fetch(`http://localhost:5501/api/marksheet/${newStudentName}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalData)
            });
            const result = await response.json();
            if (response.ok) {
                // alert("Marks added succesfully");
                tableBody.innerHTML = "";
                // displayContainer.innerHTML = "";
                savebutton.style.display = 'block';
                viewMarkSheet(`${newStudentName}`);
            }
            else {
                alert(result.message || "Failed to save marksheet");
            }
        } catch (error) {
            console.error("Marksheet save error:", error);
            alert("Something went wrong while saving marks 😥");
        }
    });
    container.appendChild(table);
    container.appendChild(savebutton);
}



async function viewMarkSheet(studentName: string) {
    // const newStudentName = studentName;
    savebutton.style.display = 'none';

    const displayContainer = document.getElementById("student-marks-display") as HTMLElement;
    // displayContainer.innerHTML = "";
    try {
        const response = await fetch(`http://localhost:5501/api/marksheet/${studentName}`);
        const data = await response.json();
        const table = document.createElement("table");
        table.className = "marks-table";
        displayContainer.innerHTML = "";

        const headerRow = document.createElement("tr");
        ["Student Name", "Tamil", "English", "Maths", "Science", "Social", "Total", "Grade"].forEach(label => {
            const th = document.createElement("th");
            th.textContent = label;
            headerRow.appendChild(th);
        });
        const dataRow = document.createElement("tr");
        [
            studentName,
            data.tamil,
            data.english,
            data.maths,
            data.science,
            data.social,
            data.total,
            data.grade
        ].forEach(value => {
            const td = document.createElement("td");
            td.textContent = value.toString();
            dataRow.appendChild(td);
        });
        table.appendChild(headerRow);
        table.appendChild(dataRow);
        displayContainer.appendChild(table);

    } catch (error) {
        console.error("Error loading marksheet:", error);
        alert("Error loading marksheet data");
    }
}



const logging_out = document.getElementById("logout_btn");
logging_out?.addEventListener('click', () => {
    window.location.replace('../Login/Login_Index.html');
});
