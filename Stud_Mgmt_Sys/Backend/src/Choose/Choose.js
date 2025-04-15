var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// const add_student = document.getElementById("add_btn");
var student_form = document.getElementById("student-form");
var userTableBody = document.getElementById("userTableBody");
var attendanceTablebody = document.getElementById("attendanceTableBody");
var attendanceWrapper = document.getElementById('Attendance-container');
var studentSection = document.getElementById("studentform-section");
var table_Container = document.getElementById("table-container");
var marksheet_Form = document.getElementById("Marksheet_form");
var savebutton = document.getElementById("save-btn");
var add_student_btn = document.getElementById("ADD");
var attendance_student_btn = document.getElementById("ATTENDANCE");
var marksheet_btn = document.getElementById("MARKSHEET");
var add_studentDetails_DB = document.getElementById("add_stud_DB");
var submitAttendanceBtn = document.getElementById("submitAttendanceBtn");
var isEditMode = false;
var editingRegisterNumber = null;
window.addEventListener('DOMContentLoaded', function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadAllStudents()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
function hideAllSections() {
    studentSection.style.display = "none";
    table_Container.style.display = "none";
    attendanceWrapper.style.display = "none";
    marksheet_Form.style.display = "none";
}
var currentVisible = null;
add_student_btn === null || add_student_btn === void 0 ? void 0 : add_student_btn.addEventListener('click', function () {
    if (currentVisible === studentSection) {
        hideAllSections();
        currentVisible = null;
    }
    else {
        hideAllSections();
        studentSection.style.display = "flex";
        table_Container.style.display = "block";
        currentVisible = studentSection;
    }
});
student_form === null || student_form === void 0 ? void 0 : student_form.addEventListener('submit', function (e) { return __awaiter(_this, void 0, void 0, function () {
    var newStudentName, newStudentID, newStudentMAIL, newStudentPhoneNumber, data, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                newStudentName = document.getElementById('studentName').value;
                newStudentID = document.getElementById('registerNumber').value;
                newStudentMAIL = document.getElementById('studentMail').value.trim();
                newStudentPhoneNumber = document.getElementById('studentNumber').value;
                if (!newStudentName || !newStudentID || !newStudentMAIL || !newStudentPhoneNumber) {
                    alert("Please fill all fields to Add");
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 9, , 10]);
                data = void 0, response = void 0;
                if (!(isEditMode && editingRegisterNumber)) return [3 /*break*/, 4];
                return [4 /*yield*/, fetch("http://localhost:5501/api/student/".concat(editingRegisterNumber), {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            studentName: newStudentName,
                            email: newStudentMAIL,
                            phoneNumber: newStudentPhoneNumber
                        })
                    })];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                data = _a.sent();
                if (response.ok) {
                    alert("Student updated successfully");
                    document.getElementById('table-container').style.display = 'block';
                }
                else {
                    alert(data.mesage || "Failed to update");
                }
                return [3 /*break*/, 7];
            case 4: return [4 /*yield*/, fetch("http://localhost:5501/api/student", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        studentName: newStudentName,
                        registerNumber: newStudentID,
                        email: newStudentMAIL,
                        phoneNumber: newStudentPhoneNumber
                    })
                })];
            case 5:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 6:
                data = _a.sent();
                if (response.ok) {
                    alert("Student added successfully");
                    document.getElementById('table-container').style.display = 'block';
                }
                else {
                    alert(data.message || "Failed to add");
                }
                _a.label = 7;
            case 7:
                student_form.reset();
                isEditMode = false;
                editingRegisterNumber = null;
                return [4 /*yield*/, loadAllStudents()];
            case 8:
                _a.sent();
                return [3 /*break*/, 10];
            case 9:
                error_1 = _a.sent();
                console.error("Submit error:", error_1);
                alert("Something went wrong. Please try again later 😥");
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); });
function loadAllStudents() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:5501/api/students")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (response.ok) {
                        userTableBody.innerHTML = "";
                        data.forEach(function (student) {
                            var row = document.createElement("tr");
                            row.innerHTML = "\n                <td>".concat(student.register_number, "</td>\n                <td>").concat(student.student_name, "</td>\n                <td>").concat(student.email, "</td>\n                <td>").concat(student.phone_number, "</td>\n                <td>\n                    <button class=\"edit-btn\" id = \"button\">Edit</button>\n                    <button class=\"delete-btn\" id = \"button\">Delete</button>\n                </td>\n            ");
                            userTableBody.appendChild(row);
                        });
                        DeleteButton();
                        EditButton();
                    }
                    else {
                        alert("Error loading students");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Loading students error:", error_2);
                    alert("Failed to load students internal");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function DeleteButton() {
    var _this = this;
    var deleteButton = document.querySelectorAll('.delete-btn');
    deleteButton.forEach(function (button) {
        button.addEventListener('click', function (e) { return __awaiter(_this, void 0, void 0, function () {
            var row, registerNumber, confirmed, response, error_3;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        row = e.target.closest('tr');
                        registerNumber = (_a = row === null || row === void 0 ? void 0 : row.cells[0].textContent) === null || _a === void 0 ? void 0 : _a.trim();
                        confirmed = confirm("Are you sure you want to delete student with ".concat(registerNumber));
                        if (!confirmed || !registerNumber)
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, fetch("http://localhost:5501/api/student/".concat(registerNumber), {
                                method: "DELETE"
                            })];
                    case 2:
                        response = _b.sent();
                        if (!response.ok) return [3 /*break*/, 4];
                        // alert("Student deleted successfully");
                        return [4 /*yield*/, loadAllStudents()];
                    case 3:
                        // alert("Student deleted successfully");
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        alert("Failed to delete a student");
                        _b.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_3 = _b.sent();
                        console.error("Error deleting student", error_3);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); });
    });
}
function EditButton() {
    var editButton = document.querySelectorAll('.edit-btn');
    editButton.forEach(function (button) {
        button.addEventListener('click', function (e) {
            var _a, _b, _c, _d;
            var row = e.target.closest('tr');
            var registerNumber = (_a = row === null || row === void 0 ? void 0 : row.cells[0].textContent) === null || _a === void 0 ? void 0 : _a.trim();
            var studentName = (_b = row === null || row === void 0 ? void 0 : row.cells[1].textContent) === null || _b === void 0 ? void 0 : _b.trim();
            var email = (_c = row === null || row === void 0 ? void 0 : row.cells[2].textContent) === null || _c === void 0 ? void 0 : _c.trim();
            var phoneNumber = (_d = row === null || row === void 0 ? void 0 : row.cells[3].textContent) === null || _d === void 0 ? void 0 : _d.trim();
            document.getElementById('registerNumber').value = registerNumber;
            document.getElementById('studentName').value = studentName;
            document.getElementById('studentMail').value = email;
            document.getElementById('studentNumber').value = phoneNumber;
            isEditMode = true;
            editingRegisterNumber = registerNumber;
        });
    });
}
/******************************************** Attendance page ******************************************************/
attendance_student_btn === null || attendance_student_btn === void 0 ? void 0 : attendance_student_btn.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadAllStudentsAttendance()];
            case 1:
                _a.sent();
                if (currentVisible === attendanceWrapper) {
                    hideAllSections();
                    currentVisible = null;
                }
                else {
                    hideAllSections();
                    attendanceWrapper.style.display = "block";
                    currentVisible = attendanceWrapper;
                }
                return [2 /*return*/];
        }
    });
}); });
submitAttendanceBtn === null || submitAttendanceBtn === void 0 ? void 0 : submitAttendanceBtn.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
    var COUNTtable;
    return __generator(this, function (_a) {
        COUNTtable = document.getElementById("countTable");
        COUNTtable.style.display = 'block';
        return [2 /*return*/];
    });
}); });
function loadAllStudentsAttendance() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:5501/api/students/attendance")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (response.ok) {
                        attendanceTablebody.innerHTML = "";
                        data.forEach(function (student) {
                            var row = document.createElement("tr");
                            var uniqueName = "option-".concat(student.register_number);
                            row.innerHTML =
                                "\n                    <td>".concat(student.register_number, "</td>\n                    <td>").concat(student.student_name, "</td>\n                    <td>\n                        <label class = \"radio-button\">\n                            <input type = \"radio\" name = \"").concat(uniqueName, "\" value= \"Present\">\n                            <div class=\"radio-circle\"></div>\n                            <span class=\"radio-label\">Present</span>\n                        </label>\n                        <label class=\"radio-button\">\n                            <input type=\"radio\" name=\"").concat(uniqueName, "\" value=\"Absent\">\n                            <div class=\"radio-circle\"></div>\n                            <span class=\"radio-label\">Absent</span>\n                        </label>\n                    </td>\n                ");
                            attendanceTablebody.appendChild(row);
                        });
                    }
                    else {
                        alert("Error loading attendance table");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.error("Loading students error:", error_4);
                    alert("Failed to load students attendance internal");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
submitAttendanceBtn === null || submitAttendanceBtn === void 0 ? void 0 : submitAttendanceBtn.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
    var attendanceRows, attendanceData, totalStudents, presentCount, absentCount, _i, attendanceData_1, record, response, result, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                attendanceRows = document.querySelectorAll("#attendanceTableBody tr");
                attendanceData = [];
                totalStudents = 0;
                presentCount = 0;
                absentCount = 0;
                attendanceRows.forEach(function (row) {
                    var _a;
                    var registerNumber = ((_a = row.children[0].textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
                    var radios = row.querySelectorAll("input[type='radio']");
                    totalStudents++;
                    var selectedActions = "";
                    radios.forEach(function (radio) {
                        if (radio.checked) {
                            selectedActions = radio.value;
                        }
                    });
                    if (registerNumber && selectedActions) {
                        attendanceData.push({ registerNumber: registerNumber, action: selectedActions });
                        if (selectedActions.toLowerCase() === "present")
                            presentCount++;
                        if (selectedActions.toLowerCase() === "absent")
                            absentCount++;
                    }
                    document.getElementById("studentsCounts").textContent = totalStudents.toString();
                    document.getElementById("presentCounts").textContent = presentCount.toString();
                    document.getElementById("absentCounts").textContent = absentCount.toString();
                });
                if (attendanceData.length === 0) {
                    alert("Mark attendance before submitting");
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                _i = 0, attendanceData_1 = attendanceData;
                _a.label = 2;
            case 2:
                if (!(_i < attendanceData_1.length)) return [3 /*break*/, 6];
                record = attendanceData_1[_i];
                return [4 /*yield*/, fetch("http://localhost:5501/api/students/attendance/".concat(record.registerNumber), {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ action: record.action })
                    })];
            case 3:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 4:
                result = _a.sent();
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 2];
            case 6:
                alert("Attendance updated successfully");
                return [3 /*break*/, 8];
            case 7:
                error_5 = _a.sent();
                console.error("Attendance submission error:", error_5);
                alert("Something went wrong while submitting attendance 😥");
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
// *****************************************Marksheet********************************************************\\
marksheet_btn === null || marksheet_btn === void 0 ? void 0 : marksheet_btn.addEventListener('click', function () {
    // console.log("hii")
    if (currentVisible === marksheet_Form) {
        hideAllSections();
        currentVisible = null;
    }
    else {
        hideAllSections();
        marksheet_Form.style.display = "block";
        currentVisible = marksheet_Form;
    }
});
var dropdown_btn = document.getElementById("dropdown-btn");
var dropdown_container = document.getElementById("dropdown");
savebutton.style.display = 'none';
dropdown_btn === null || dropdown_btn === void 0 ? void 0 : dropdown_btn.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
    var response, data;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                savebutton.style.display = 'none';
                if (dropdown_container.style.display === 'block')
                    dropdown_container.style.display = 'none';
                else
                    dropdown_container.style.display = 'block';
                dropdown_container.innerHTML = "";
                return [4 /*yield*/, fetch('http://localhost:5501/api/dropdown')];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                if (response.ok) {
                    console.log("response is ok");
                    dropdown_container.innerHTML = "";
                    data.forEach(function (student) {
                        var student_option = document.createElement('div');
                        student_option.textContent =
                            "\n                ".concat(student.student_name, "\n            ");
                        dropdown_container.appendChild(student_option);
                        student_option === null || student_option === void 0 ? void 0 : student_option.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                dropdown_btn.textContent = "".concat(student.student_name);
                                dropdown_container.style.display = 'none';
                                generateTable("".concat(student.student_name));
                                return [2 /*return*/];
                            });
                        }); });
                    });
                }
                else {
                    alert("Error on getting students list");
                }
                return [2 /*return*/];
        }
    });
}); });
function generateTable(newStudentName) {
    return __awaiter(this, void 0, void 0, function () {
        var container, tableBody, table, header, row, namecell, Subjects;
        var _this = this;
        return __generator(this, function (_a) {
            console.log("function generate is working");
            container = document.getElementById("marksheet-container");
            tableBody = document.getElementById("UpdateMark");
            tableBody.innerHTML = "";
            table = document.getElementById("marksheet-table");
            header = document.createElement('tr');
            header.className = "markTableHead";
            ["Student Name", "tamil", "english", "maths", "science", "social"].forEach(function (Subject) {
                var th = document.createElement('th');
                // th.className = "markTableHead";
                th.textContent = Subject;
                header.appendChild(th);
            });
            tableBody.appendChild(header);
            row = document.createElement('tr');
            namecell = document.createElement('td');
            namecell.textContent = newStudentName;
            row.appendChild(namecell);
            Subjects = ["tamil", "english", "maths", "science", "social"];
            Subjects.forEach(function (sub) {
                var td = document.createElement("td");
                var input = document.createElement("input");
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
            savebutton === null || savebutton === void 0 ? void 0 : savebutton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                var marks, tamil, english, maths, science, social, sum, GRADE, finalData, response, result, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log("im in save button");
                            marks = {
                                studentName: newStudentName,
                                Tamil: document.querySelector("input[name='tamil']").value,
                                English: document.querySelector("input[name='english']").value,
                                Maths: document.querySelector("input[name='maths']").value,
                                Science: document.querySelector("input[name='science']").value,
                                Social: document.querySelector("input[name='social']").value,
                            };
                            tamil = Number(marks.Tamil);
                            english = Number(marks.English);
                            maths = Number(marks.Maths);
                            science = Number(marks.Science);
                            social = Number(marks.Social);
                            sum = tamil + english + maths + science + social;
                            GRADE = "";
                            if (sum >= 450) {
                                GRADE = "O";
                            }
                            else if (sum >= 400) {
                                GRADE = "A+";
                            }
                            else if (sum >= 350) {
                                GRADE = "A";
                            }
                            else if (sum >= 300) {
                                GRADE = "B+";
                            }
                            else if (sum >= 250) {
                                GRADE = "B";
                            }
                            else if (sum >= 200) {
                                GRADE = "C";
                            }
                            else {
                                GRADE = "U";
                            }
                            finalData = {
                                tamil: tamil,
                                english: english,
                                maths: maths,
                                science: science,
                                social: social,
                                total: sum,
                                grade: GRADE
                            };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            console.log("im trying");
                            return [4 /*yield*/, fetch("http://localhost:5501/api/marksheet/".concat(newStudentName), {
                                    method: "PUT",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(finalData)
                                })];
                        case 2:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 3:
                            result = _a.sent();
                            if (response.ok) {
                                // alert("Marks added succesfully");
                                tableBody.innerHTML = "";
                                // displayContainer.innerHTML = "";
                                savebutton.style.display = 'block';
                                viewMarkSheet("".concat(newStudentName));
                            }
                            else {
                                alert(result.message || "Failed to save marksheet");
                            }
                            return [3 /*break*/, 5];
                        case 4:
                            error_6 = _a.sent();
                            console.error("Marksheet save error:", error_6);
                            alert("Something went wrong while saving marks 😥");
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
            container.appendChild(table);
            container.appendChild(savebutton);
            return [2 /*return*/];
        });
    });
}
function viewMarkSheet(studentName) {
    return __awaiter(this, void 0, void 0, function () {
        var displayContainer, response, data, table, headerRow_1, dataRow_1, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // const newStudentName = studentName;
                    savebutton.style.display = 'none';
                    displayContainer = document.getElementById("student-marks-display");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("http://localhost:5501/api/marksheet/".concat(studentName))];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    table = document.createElement("table");
                    table.className = "marks-table";
                    displayContainer.innerHTML = "";
                    headerRow_1 = document.createElement("tr");
                    ["Student Name", "Tamil", "English", "Maths", "Science", "Social", "Total", "Grade"].forEach(function (label) {
                        var th = document.createElement("th");
                        th.textContent = label;
                        headerRow_1.appendChild(th);
                    });
                    dataRow_1 = document.createElement("tr");
                    [
                        studentName,
                        data.tamil,
                        data.english,
                        data.maths,
                        data.science,
                        data.social,
                        data.total,
                        data.grade
                    ].forEach(function (value) {
                        var td = document.createElement("td");
                        td.textContent = value.toString();
                        dataRow_1.appendChild(td);
                    });
                    table.appendChild(headerRow_1);
                    table.appendChild(dataRow_1);
                    displayContainer.appendChild(table);
                    return [3 /*break*/, 5];
                case 4:
                    error_7 = _a.sent();
                    console.error("Error loading marksheet:", error_7);
                    alert("Error loading marksheet data");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
var logging_out = document.getElementById("logout_btn");
logging_out === null || logging_out === void 0 ? void 0 : logging_out.addEventListener('click', function () {
    window.location.replace('../Login/Login_Index.html');
});
// document?.addEventListener("click",  (event) =>{
//     if (!dropdown_btn.contains(event.target) && !dropdown_container.contains(event.target)) {
//         dropdown_container.style.display = "none";
//     }
// });
