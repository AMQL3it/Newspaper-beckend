const Teacher_Payment = require("../models/teacherPaymentModel");

exports.createTeacherPayment = async (req, res) => {
    let teacher_payment = new Teacher_Payment({ ...req.body });

    try {
        const result = await teacher_payment.save();
        return res.status(200).json({ message: "Teacher Payment was added successfully", data: teacher_payment });
      
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.updateTeacherPayment = async (req, res) => {
    const { tc_pay_id } = req.params;
    try {
        const teacher_payment = await Teacher_Payment.findOne({ where: { tc_pay_id } });

        if(teacher_payment){
            const updatedRows = await Teacher_Payment.update(req.body, { where: { tc_pay_id }, returning: true, });
            
            updatedRows[0] = await Teacher_Payment.findOne({ where: { tc_pay_id } });
            
            return res.json({ message: 'Teacher payment information updated successfully', data: updatedRows });
        } 
        return res.status(404).json({ message: `Teacher payment with id ${ex_res_id} not found!!!` });  
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.deleteTeacherPayment = async (req, res) => {
    const { tc_pay_id } = req.params;
    try {
        const deletedRowsCount = await Teacher_Payment.destroy({ where: { tc_pay_id } });
        if (deletedRowsCount === 0) {
            return res.status(404).json({ message: `Teacher payment with id ${tc_pay_id} was not found!!!` });
        }
        return res.json({ message: 'Teacher payment information deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.getAllTeacherPayments = async (req, res) => {
    const { tc_pay_id } = req.params;
    try {
        const teacher_payments = await Teacher_Payment.findAll();
        return res.status(200).json({ message: 'All Teacher Payment data fatched successfully', counter: teacher_payments.length, data: teacher_payments });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.getTeacherPaymentById = async (req, res) => {
    const { tc_pay_id } = req.params;
    try {
        const teacher_payment = await Teacher_Payment.findOne({ where: { tc_pay_id } });

        if (teacher_payment) {
            return res.status(200).json({ message: 'Teacher Payment data fatched successfully', data: teacher_payment });
        }
        return res.status(404).json({ message: `Teacher Payment with id ${tc_pay_id} was not found!!!` });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};