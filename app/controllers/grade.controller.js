const db = require("../models");
const config = require("../config/auth.config");
const { where } = require("sequelize");
const Grade = db.assignment;
const scorings = db.scorings;
const Teachers = db.teachers;
const Students = db.enrollment;
const Classes = db.classes;

exports.createGrade = async (req, res) => {
  if (!req.body) {
    res.status(500).send({ message: "Can't find!" });
  } else {
    if (
      !req.body.classId ||
      !req.body.scale ||
      !req.body.position ||
      !req.body.name ||
      !req.body.teacherId
    ) {
      return res.status(400).send({
        message: "Missing some fields!",
      });
    }
    const { name, scale, classId, position, teacherId } = req.body;

    const selectedClass = await Classes.findByPk(classId);

    if (!selectedClass) {
      return res.status(400).send({ message: "Class not found!" });
    }

    const teacher = await Teachers.findOne({
      where: { teacherId: teacherId, classId: classId },
    });

    if (!teacher) {
      return res.status(400).send({ message: "Teacher not found!" });
    }

    const createGrade = await Grade.create({
      name: name,
      scale: scale,
      classId: classId,
      teacherId: teacherId,
      position: position,
      createdAt: new Date(Date.now()),
    });

    return res.status(201).send({
      message: "Created grade structure success!",
      data: {
        id: createGrade.id,
        name: createGrade.name,
        scale: createGrade.scale,
        classId: createGrade.classId,
        position: createGrade.position,
        assignmentId: createGrade.assignmentId,
      },
    });
  }
};

exports.getSingleAssignment = async (req, res) => {
  if (!req.query.id) {
    res.status(500).send({ message: "Can't find!" });
  } else {
    Grade.findByPk(req.query.id)
      .then((data) => {
        res.status(200).send({ message: "Success!", data: data });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
};

exports.getGradeByClassId = async (req, res) => {
  if (!req.query.id) {
    res.status(500).send({ message: "Can't find!" });
  } else {
    const sclass = await Classes.findByPk(req.query.id);

    if (!sclass) {
      return res.status(400).send({ message: "Class not found!" });
    }

    Grade.findAll({
      where: { classId: req.query.id },
    })
      .then((data) => {
        res.status(200).send({ message: "Success!", data: data });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
};

exports.updateGrade = async (req, res) => {
  if (!req.body) {
    res.status(500).send({ message: "Can't find!" });
  } else {
    if (!req.body.gradeId || !req.body.name || !req.body.scale) {
      return res.status(400).send({
        message: "Missing some fields!",
      });
    }

    const { gradeId, name, scale } = req.body;

    const selectedGrade = await Grade.findByPk(gradeId);

    if (!selectedGrade) {
      return res.status(400).send({ message: "Grade not found!" });
    }

    const grade = await Grade.update(
      {
        name: name,
        scale: scale,
      },
      { where: { assignmentId: gradeId } }
    );

    return res.status(201).send({
      message: "Update grade success!",
      data: grade,
    });
  }
};

exports.updateAssignmentGradeOfStudent = async (req, res) => {
  if (!req.body) {
    res.status(500).send({ message: "Can't find!" });
  } else {
    if (
      !req.body.assignmentId ||
      !req.body.mssv ||
      !req.body.grade ||
      !req.body.classId
    ) {
      return res.status(400).send({
        message: "Missing some fields!",
      });
    }

    const { assignmentId, mssv, grade, classId } = req.body;

    await Students.findOne({ where: { mssv: mssv, classId: classId } }).then(
      (data) => {
        if (!data) {
          return res.status(400).send({ message: "Student not found!" });
        } else {
          scorings.update(
            {
              score: grade,
            },
            { where: { studentId: data.studentId, assignmentId: assignmentId } }
          );
        }
      }
    );

    return res.status(201).send({
      message: "Update grade success!",
    });
  }
};

exports.deleteGrade = async (req, res) => {
  if (!req.query.id) {
    res.status(500).send({ message: "Can't find!" });
  } else {
    const { id } = req.query;
    const selectedGrade = await Grade.findByPk(id);

    if (!selectedGrade) {
      return res.status(400).send({ message: "Grade not found!" });
    }

    const grade = await Grade.destroy({
      where: { assignmentId: id },
    });

    return res.status(201).send({
      message: "Delete grade success!",
      data: grade,
    });
  }
};

exports.updateGradePosition = async (req, res) => {
  if (!req.body) {
    res.status(500).send({ message: "Can't find!" });
  } else {
    if (!req.body.gradeId || !req.body.position) {
      return res.status(400).send({
        message: "Missing some fields!",
      });
    }

    const { gradeId, position } = req.body;

    const selectedGrade = await Grade.findByPk(gradeId);

    if (!selectedGrade) {
      return res.status(400).send({ message: "Grade not found!" });
    }

    const grade = await Grade.update(
      {
        position: position,
      },
      { where: { assignmentId: gradeId } }
    );

    return res.status(201).send({
      message: "Update grade position success!",
      data: grade,
    });
  }
};

exports.getGradeByAssignmentId = async (req, res) => {
  if (!req.query.id) {
    res.status(500).send({ message: "Can't find!" });
  } else {
    scorings
      .findAll({
        where: { assignmentId: req.query.id },
      })
      .then((data) => {
        res.status(200).send({ message: "Success!", data: data });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
};
