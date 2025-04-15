"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./utils/db");
// import { createUser } from "./models/userModel";
// import {Request, Response } from "express";
var express = require('express');
var cors = require('cors');
var bcrypt = require("bcrypt");
var bodyParser = require("body-parser");
var app = express();
var PORT = 5501;
app.use(cors());
app.use(express.json());
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Routes
// app.post('/api/signup', handleSignup);
db_1.default.query("SELECT NOW()", function (err, res) {
    if (err) {
        console.error("DB connection failed:", err);
    }
    else {
        console.log("DB connected at:", res.rows[0].now); //res.rows[0].now
    }
});
/*************************************Api for login **************************************/
app.post('/api/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, usernameResult, user, isMatch, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                if (!username || !password)
                    return [2 /*return*/, res.status(400).json({ message: "All fields are required" })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, db_1.default.query("SELECT * FROM users WHERE username = $1", [username])];
            case 2:
                usernameResult = _b.sent();
                if (usernameResult.rows.length === 0)
                    return [2 /*return*/, res.status(401).json({ message: "Invalid Username" })];
                user = usernameResult.rows[0];
                return [4 /*yield*/, bcrypt.compare(password, user.password)];
            case 3:
                isMatch = _b.sent();
                if (!isMatch) {
                    return [2 /*return*/, res.status(401).json({ message: "Invalid Password" })];
                }
                // const passwordResult = await pool.query(
                //   "SELECT * FROM users WHERE username = $1 AND password = $2",
                //   [username, password]
                // );
                // if(passwordResult.rows.length === 0)return res.status(401).json({message:"Invalid Password"})
                res.status(200).json({ message: "Login successfully" });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.error("Login error in", error_1);
                res.status(500).json({ message: "Server error" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
/***************************** Api for Signup***************************************/
app.post('/api/signup', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, confirmPassword, saltRounds, hashedPassword, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword;
                if (!username || !email || !password || !confirmPassword) {
                    return [2 /*return*/, res.status(400).json({ message: "All fields are required" })];
                }
                else if (password !== confirmPassword) {
                    return [2 /*return*/, res.status(400).json({ message: "Passwords do not match" })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                saltRounds = 10;
                return [4 /*yield*/, bcrypt.hash(password, saltRounds)];
            case 2:
                hashedPassword = _b.sent();
                return [4 /*yield*/, db_1.default.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword])];
            case 3:
                _b.sent();
                return [2 /*return*/, res.status(200).json({ message: "User created successfully" })];
            case 4:
                err_1 = _b.sent();
                console.error("Error inserting user:", err_1);
                return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
            case 5: return [2 /*return*/];
        }
    });
}); });
/*************************************getting all students from DB(add student form)********************************************/
app.get('/api/students', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.query('SELECT * FROM students ORDER BY id ASC')];
            case 1:
                result = _a.sent();
                res.status(200).json(result.rows);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error("Fetching students error:", error_2);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/*****************************Add student form API ***************************************/
app.post('/api/student', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, studentName, registerNumber, email, phoneNumber, result, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, studentName = _a.studentName, registerNumber = _a.registerNumber, email = _a.email, phoneNumber = _a.phoneNumber;
                if (!studentName || !registerNumber || !email || !phoneNumber) {
                    return [2 /*return*/, res.status(500).json({ message: "Please fill all fields to add students" })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, db_1.default.query('INSERT INTO students (student_name, register_number, email, phone_number) VALUES ($1, $2, $3, $4)', [studentName, registerNumber, email, phoneNumber])];
            case 2:
                result = _b.sent();
                return [4 /*yield*/, db_1.default.query('INSERT INTO attendance(register_number, student_name) VALUES ($1, $2)', [registerNumber, studentName])];
            case 3:
                _b.sent();
                return [4 /*yield*/, db_1.default.query('INSERT INTO marksheet(register_number, student_name) VALUES ($1, $2)', [registerNumber, studentName])];
            case 4:
                _b.sent();
                // const newStudent = result.rows[0];
                res.status(200).json({ message: "Student added successfully" });
                return [3 /*break*/, 6];
            case 5:
                error_3 = _b.sent();
                console.error("Adding student problem :", error_3);
                res.status(500).json({ mesage: "Internal server error" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
/*************************************edit student form API**************************************/
app.put('/api/student/:registerNumber', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var registerNumber, _a, studentName, email, phoneNumber, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                registerNumber = req.params.registerNumber;
                _a = req.body, studentName = _a.studentName, email = _a.email, phoneNumber = _a.phoneNumber;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, db_1.default.query('UPDATE students SET student_name = $1, email = $2, phone_Number = $3 WHERE register_Number = $4', [studentName, email, phoneNumber, registerNumber])];
            case 2:
                _b.sent();
                return [4 /*yield*/, db_1.default.query('UPDATE attendance SET student_name = $1 WHERE register_number = $2', [studentName, registerNumber])];
            case 3:
                _b.sent();
                return [4 /*yield*/, db_1.default.query('UPDATE marksheet SET student_name = $1 WHERE register_number = $2', [studentName, registerNumber])];
            case 4:
                _b.sent();
                res.status(200).json({ message: "Student updated successfully" });
                return [3 /*break*/, 6];
            case 5:
                error_4 = _b.sent();
                res.status(500).json({ message: "Student update Failed" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
/******************************** delete Api for delete student in table****************** */
app.delete('/api/student/:registerNumber', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var registerNumber, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                registerNumber = req.params.registerNumber;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, db_1.default.query('DELETE FROM students WHERE register_Number = $1', [registerNumber])];
            case 2:
                _a.sent();
                return [4 /*yield*/, db_1.default.query('DELETE FROM attendance WHERE register_Number = $1', [registerNumber])];
            case 3:
                _a.sent();
                return [4 /*yield*/, db_1.default.query('DELETE FROM marksheet WHERE register_Number = $1', [registerNumber])];
            case 4:
                _a.sent();
                res.status(200).json({ mesage: "Student deleted successfully" });
                return [3 /*break*/, 6];
            case 5:
                error_5 = _a.sent();
                console.error("Error deleting Students", error_5);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
/*************************************getting students attendance **************************************/
app.get('/api/students/attendance', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.query('SELECT * FROM attendance ORDER BY id ASC')];
            case 1:
                result = _a.sent();
                res.status(200).json(result.rows);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.error("Getting students attendance", error_6);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/*************************************updating student attendanceI**************************************/
app.put('/api/students/attendance/:registerNumber', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var registerNumber, action, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                registerNumber = req.params.registerNumber;
                action = req.body.action;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.default.query('UPDATE attendance SET action = $1 WHERE register_Number = $2', [action, registerNumber])];
            case 2:
                _a.sent();
                res.status(200).json({ message: "Attendance updated" });
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                res.status(500).json({ message: "Failed to update student attendance" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/*****************************Add student name in dropdown***************************************/
app.get('/api/dropdown', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.query('SELECT student_name FROM attendance')];
            case 1:
                result = _a.sent();
                res.status(200).json(result.rows);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                console.error("Error getting Students name", error_8);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/*****************************update mark api***************************************/
app.put('/api/marksheet/:studentName', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var studentName, _a, tamil, english, maths, science, social, total, grade, error_9;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                studentName = req.params.studentName;
                _a = req.body, tamil = _a.tamil, english = _a.english, maths = _a.maths, science = _a.science, social = _a.social, total = _a.total, grade = _a.grade;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.default.query('UPDATE marksheet SET tamil = $1, english = $2, maths = $3, science = $4, social = $5, total = $6, grade = $7 WHERE student_name = $8', [tamil, english, maths, science, social, total, grade, studentName])];
            case 2:
                _b.sent();
                res.status(200).json({ message: "Marks updated successfully" });
                return [3 /*break*/, 4];
            case 3:
                error_9 = _b.sent();
                console.error("Error updating student name", error_9);
                res.status(400).json({ message: "Marks updates failed internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/*****************************get marks***************************************/
app.get('/api/marksheet/:newStudentName', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newStudentName, result, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newStudentName = req.params.newStudentName;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.default.query('SELECT * FROM marksheet WHERE student_name = $1', [newStudentName])];
            case 2:
                result = _a.sent();
                if (result.rows.length === 0) {
                    return [2 /*return*/, res.status(404).json({ message: "No marks found" })];
                }
                res.json(result.rows[0]);
                return [3 /*break*/, 4];
            case 3:
                error_10 = _a.sent();
                console.error("Error fetching marksheet:", error_10);
                res.status(500).json({ message: "Server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen(PORT, function () {
    console.log("\uD83D\uDE80 Server running at http://localhost:".concat(PORT));
});
