import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDetailQuiz } from "../../Services/apiService";
import './DetailQuiz.scss';
import _ from 'lodash';
import Question from "./Question";

const DetailQuiz = (props) => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    useEffect(() => {
        fetchDetailQuiz();
    }, [quizId])

    const fetchDetailQuiz = async () => {
        let res = await getDetailQuiz(quizId);
        console.log('Check Question: ', res)
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects

                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    })

                    return { questionId: key, answers, questionDescription, image }
                }
                )
                .value()
            // console.log('Check Quiz: ', data)
            setDataQuiz(data)
        }

    }
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1);
    }
    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1);
    }
    const handleFinish = () => {

    }
    const handleCheckBox = (answersId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz)
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question && question.answers) {
            let b = question.answers.map(item => {
                if (+item.id === +answersId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            question.answers = b
            // console.log(question.answers)
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone)
        }
    }
    return (
        <div className="detail-quiz-container">
            <div className="left-detail-quiz">
                <div className="q-title">
                    <div>
                        Quiz {quizId}: {location?.state?.quizTitle}
                    </div>
                </div>
                <div className="q-body">
                    <Question
                        index={index}
                        handleCheckBox={handleCheckBox}
                        data={
                            dataQuiz && dataQuiz.length > 0
                                ?
                                dataQuiz[index]
                                : []
                        }
                    />
                </div>
                <div className="q-footer">
                    <button className="btn btn-secondary"
                        onClick={() => handlePrev()}
                    >
                        Prev
                    </button>
                    <button className="btn btn-primary"
                        onClick={() => handleNext()}
                    >
                        Next
                    </button>
                    <button className="btn btn-warning"
                        onClick={() => handleFinish()}
                    >
                        Finish
                    </button>
                </div>

            </div>
            <div className="right-detail-quiz">
                Countdown
            </div>

        </div >
    )
}
export default DetailQuiz;