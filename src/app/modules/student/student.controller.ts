import { Request, Response } from 'express'
import { StudentServices } from './student.service'
import { z } from 'zod'
import studentValdattionSchema from './student.zod.validation'
// import studentVAlidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    //creating a schema validation Zod

    //   const student = req.body.student
    const { student: studentData } = req.body

    // data validation using Joi
    // const { error, value } = studentVAlidationSchema.validate(studentData)

    //data validation using zod
    const zodParsedData = studentValdattionSchema.parse(studentData)

    //will call service fun to send this data
    const result = await StudentServices.createStudentIntoDB(zodParsedData)

    //joy validation error
    // console.log({ error }, { value })
    // if (error) {
    //   return res.status(500).json({
    //     success: false,
    //     message: 'validation error',
    //     error: error.details,
    //   })
    // }

    // send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  } catch (err: any) {
    // console.log(error)
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()

    res.status(200).json({
      success: true,
      message: 'Students are retrived successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    // const studentId = req.params.studentId
    const { studentId } = req.params
    const result = await StudentServices.getSingleStudentFromDB(studentId)

    res.status(200).json({
      success: true,
      message: 'Student is retrived successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
}
