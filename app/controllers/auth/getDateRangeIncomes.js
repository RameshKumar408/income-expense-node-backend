/* eslint-disable max-statements */
const { matchedData } = require('express-validator')
const Income = require('../../models/income')
const { handleError } = require('../../middleware/utils')
const mongoose = require('mongoose')
/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getDateRangeIncomes = async (req, res) => {
    try {
        const { From, To, text, id } = await req?.body
        if (!From) {
            res.status(400).json({
                message: "Please Select From", status: false
            })
            // return NextResponse.json({ message: "Please Select From", status: false }, { status: 400 });
        } else if (!To) {
            res.status(400).json({
                message: "Please Select To", status: false
            })
            // return NextResponse.json({ message: "Please Select To", status: false }, { status: 400 });
        } else {
            // if (user?.email == "admin@admin.com") {
            //     var resp
            //     if (text) {
            //         resp = await Income.find({
            //             User_id: id,
            //             Title: { $regex: text, $options: 'i' },
            //             TimeStamp: {
            //                 $gte: Number(From), // Greater than or equal to 18
            //                 $lte: Number(To)
            //             }
            //         }).sort({ TimeStamp: -1 });
            //     } else {
            //         console.log("logs one")
            //         resp = await Income.find({
            //             User_id: id,
            //             TimeStamp: {
            //                 $gte: From, // Greater than or equal to 18
            //                 $lte: To
            //             }
            //         }).sort({ TimeStamp: -1 });
            //     }
            //     var payloads = [
            //         {
            //             $match: {
            //                 User_id: new mongoose.Types.ObjectId(id),
            //             }
            //         },
            //         {
            //             $match: {
            //                 TimeStamp: {
            //                     $gte: Number(From), // Greater than or equal to 18
            //                     $lte: Number(To)
            //                 }
            //             }
            //         },
            //         {

            //             $group: {
            //                 _id: "$Type",
            //                 totalAmount: { $sum: "$Amount" },
            //                 count: { $sum: 1 }
            //             }
            //         },
            //         {
            //             $project: {
            //                 _id: 0,
            //                 type: "$_id",
            //                 totalAmount: 1,
            //                 count: 1
            //             }
            //         },
            //         {
            //             $group: {
            //                 _id: null,
            //                 income: {
            //                     $sum: {
            //                         $cond: [{ $eq: ["$type", "Income"] }, "$totalAmount", 0]
            //                     }
            //                 },
            //                 expense: {
            //                     $sum: {
            //                         $cond: [{ $eq: ["$type", "Expense"] }, "$totalAmount", 0]
            //                     }
            //                 },
            //                 incomeCount: {
            //                     $sum: {
            //                         $cond: [{ $eq: ["$type", "Income"] }, "$count", 0]
            //                     }
            //                 },
            //                 expenseCount: {
            //                     $sum: {
            //                         $cond: [{ $eq: ["$type", "Expense"] }, "$count", 0]
            //                     }
            //                 }
            //             }
            //         },
            //         {
            //             $project: {
            //                 _id: 0,
            //                 netIncome: { $subtract: ["$income", "$expense"] },
            //                 totalIncome: "$income",
            //                 totalExpense: "$expense",
            //                 totalIncomeCount: "$incomeCount",
            //                 totalExpenseCount: "$expenseCount"
            //             }
            //         }
            //     ]
            //     if (text) {
            //         payloads = [{ $match: { Title: { $regex: text, $options: 'i' } } }, ...payloads]
            //     }
            //     const total = await Income.aggregate(payloads);
            //     return NextResponse.json({ topics: resp, totalCount: total }, { status: 200 });
            // } else {
            var resp
            if (text) {
                resp = await Income.find({
                    User_id: req.user._id,
                    Title: { $regex: text, $options: 'i' },
                    TimeStamp: {
                        $gte: Number(From), // Greater than or equal to 18
                        $lte: Number(To)
                    }
                }).sort({ TimeStamp: -1 });
            } else {
                resp = await Income.find({
                    User_id: req.user._id,
                    TimeStamp: {
                        $gte: From, // Greater than or equal to 18
                        $lte: To
                    }
                }).sort({ TimeStamp: -1 });
            }
            var payloads = [
                {
                    $match: {
                        User_id: new mongoose.Types.ObjectId(req.user._id),
                    }
                },
                {
                    $match: {
                        TimeStamp: {
                            $gte: Number(From), // Greater than or equal to 18
                            $lte: Number(To)
                        }
                    }
                },
                {

                    $group: {
                        _id: "$Type",
                        totalAmount: { $sum: "$Amount" },
                        count: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        type: "$_id",
                        totalAmount: 1,
                        count: 1
                    }
                },
                {
                    $group: {
                        _id: null,
                        income: {
                            $sum: {
                                $cond: [{ $eq: ["$type", "Income"] }, "$totalAmount", 0]
                            }
                        },
                        expense: {
                            $sum: {
                                $cond: [{ $eq: ["$type", "Expense"] }, "$totalAmount", 0]
                            }
                        },
                        incomeCount: {
                            $sum: {
                                $cond: [{ $eq: ["$type", "Income"] }, "$count", 0]
                            }
                        },
                        expenseCount: {
                            $sum: {
                                $cond: [{ $eq: ["$type", "Expense"] }, "$count", 0]
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        netIncome: { $subtract: ["$income", "$expense"] },
                        totalIncome: "$income",
                        totalExpense: "$expense",
                        totalIncomeCount: "$incomeCount",
                        totalExpenseCount: "$expenseCount"
                    }
                }
            ]
            if (text) {
                payloads = [{ $match: { Title: { $regex: text, $options: 'i' } } }, ...payloads]
            }
            const total = await Income.aggregate(payloads);
            res.status(200).json({
                topics: resp, totalCount: total
            })
            // return NextResponse.json({ topics: resp, totalCount: total }, { status: 200 });
            // }
        }
    } catch (error) {
        handleError(res, error)
    }
}
module.exports = { getDateRangeIncomes }
