const classes = require("../controllers/classes.controller");
module.exports = function (app) {
  app.post("/api/classes/create", classes.createClass);
  app.get("/api/classes/getall", classes.getAllClass);
  app.get("/api/classes/getallclasses", classes.getAllClasses);
  app.post("/api/classes/delete", classes.deleteClass);
  app.post("/api/classes/update", classes.updateClass);
  app.get("/api/classes/getbyid", classes.getClassById);
  app.get("/api/classes/getassignments", classes.getAssignmentsInClass);
  app.get("/api/classes/getscorings", classes.getScoringsInClass);
  app.get("/api/classes/getbyteacherid", classes.getClassByTeacherId);
  app.get("/api/classes/getbystudentid", classes.getClassByStudentId);
  app.post("/api/classes/addStudents", classes.addStudents);
  app.get("/api/classes/invitestudent", classes.inviteStudent);
  app.get("/api/classes/inviteemailteacher", classes.inviteTeacher);
  app.post("/api/classes/acceptInvitation", classes.acceptInvitation);
  app.get("/api/classes/getstudentinclass", classes.getStudentInClass);
  app.get("/api/classes/getteacherinclass", classes.getTeacherInClass);
  app.get("/api/classes/istecher", classes.isTeacher);
  app.get("/api/classes/getlink", classes.generateClassroomLink);
  app.post("/api/classes/updatestudentid", classes.updatemssv);
  app.get("/api/classes/checkmssv", classes.checkmssv);
  app.get("/api/classes/checkhavemssv", classes.checkmssvhaveuserid);
  app.get("/api/classes/filterclass",classes.filterclass);
  app.post("/api/classes/updateactive",classes.updateActive);
  app.get("/api/classes/getactive",classes.getactive);
  app.get("/api/classes/getallstudentinclass",classes.getallstudentinclass);
};
