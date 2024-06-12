import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetailQuiz } from "../../Services/apiService";
import _ from "lodash";
const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;

    useEffect(() => {
        fetchDetailQuiz();
    }, [quizId])

    const fetchDetailQuiz = async () => {
        let res = await getDetailQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)

                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => ({ questionId: key, data: value }))
                .value()
            console.log(data)
        }

    }

    return (
        <div className="detail-quiz-container">
            DetailQuiz
        </div>
    )
}
export default DetailQuiz;